/* SpagoBI, the Open Source Business Intelligence suite

 * Copyright (C) 2012 Engineering Ingegneria Informatica S.p.A. - SpagoBI Competency Center
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0, without the "Incompatible With Secondary Licenses" notice. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. */

package it.eng.spagobi.engines.whatif;

import it.eng.spago.security.IEngUserProfile;
import it.eng.spagobi.commons.constants.SpagoBIConstants;
import it.eng.spagobi.commons.utilities.StringUtilities;
import it.eng.spagobi.engines.whatif.model.ModelConfig;
import it.eng.spagobi.engines.whatif.model.SpagoBIPivotModel;
import it.eng.spagobi.engines.whatif.parameters.MDXParametersUtilities;
import it.eng.spagobi.engines.whatif.schema.MondrianSchemaManager;
import it.eng.spagobi.engines.whatif.template.WhatIfTemplate;
import it.eng.spagobi.engines.whatif.template.WhatIfTemplateParser;
import it.eng.spagobi.engines.whatif.version.VersionManager;
import it.eng.spagobi.services.proxy.ArtifactServiceProxy;
import it.eng.spagobi.services.proxy.EventServiceProxy;
import it.eng.spagobi.tools.dataset.bo.IDataSet;
import it.eng.spagobi.tools.datasource.bo.IDataSource;
import it.eng.spagobi.utilities.engines.AuditServiceProxy;
import it.eng.spagobi.utilities.engines.EngineConstants;
import it.eng.spagobi.utilities.engines.ExtendedAbstractEngineInstance;
import it.eng.spagobi.utilities.engines.IEngineAnalysisState;
import it.eng.spagobi.utilities.engines.SpagoBIEngineException;
import it.eng.spagobi.utilities.engines.SpagoBIEngineRuntimeException;
import it.eng.spagobi.utilities.exceptions.SpagoBIEngineRestServiceRuntimeException;
import it.eng.spagobi.writeback4j.WriteBackEditConfig;
import it.eng.spagobi.writeback4j.WriteBackManager;
import it.eng.spagobi.writeback4j.mondrian.MondrianDriver;

import java.io.Serializable;
import java.sql.SQLException;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.apache.log4j.Logger;
import org.olap4j.OlapConnection;
import org.olap4j.OlapDataSource;

import com.eyeq.pivot4j.PivotModel;

/**
 * @author ...
 */
public class WhatIfEngineInstance extends ExtendedAbstractEngineInstance implements Serializable {
	
	private static final long serialVersionUID = 1329486982941461093L;

	public static transient Logger logger = Logger.getLogger(WhatIfEngineInstance.class);
	
	//private JSONObject guiSettings;
	private List<String> includes;
	private OlapDataSource olapDataSource;
	private PivotModel pivotModel;
	private ModelConfig modelConfig;
	private String mondrianSchemaFilePath;
	private WriteBackManager writeBackManager;
	private boolean standalone = false;
	private IDataSource dataSourceForWriting;
	
	protected WhatIfEngineInstance(Object template, Map env) {
		this( WhatIfTemplateParser.getInstance() != null ? WhatIfTemplateParser.getInstance().parse(template) : null, env );
	}
	
	public WhatIfEngineInstance(WhatIfTemplate template, Map env) {
		super( env );	
		
		includes = WhatIfEngine.getConfig().getIncludes();
		
		try {
			Class.forName("mondrian.olap4j.MondrianOlap4jDriver");
			Class.forName("org.olap4j.OlapWrapper");
			
		} catch (ClassNotFoundException e) {
			throw new RuntimeException("Cannot load Mondrian Olap4j Driver", e);
		}

		String reference;
		
		if(template.isStandAlone()){			
			String schema = (String)this.getEnv().get(EngineConstants.ENV_OLAP_SCHEMA);
					
			if(schema!=null ){
				//gets the schema from env. Used by the test cases.
				reference = schema;
			}else{
				//gets the schema path the template. Used in the stand alone modality.
				String resourcesPath = WhatIfEngineConfig.getInstance().getEngineResourcePath();
				reference = resourcesPath + template.getMondrianSchema();
			}
			
		}else{
			//gets the schema path the template. Used when the engine is executed in SpagoBI
			reference = initMondrianSchema(env);
		}

		this.setMondrianSchemaFilePath(reference);
		
		IDataSource ds = (IDataSource) env.get(EngineConstants.ENV_DATASOURCE);
		IEngUserProfile profile = (IEngUserProfile) env.get(EngineConstants.ENV_USER_PROFILE);
		
		if(ds==null && template.getStandAloneConnection()!=null){
			ds = template.getStandAloneConnection();
			 this.getEnv().put(EngineConstants.ENV_DATASOURCE, ds);
		}
		
		olapDataSource = WhatIfEngineConfig.getInstance().getOlapDataSource( ds, reference, template, profile, this.getLocale() );
		
		//pivotModel = new PivotModelImpl(olapDataSource);
		pivotModel = new SpagoBIPivotModel(olapDataSource);
		pivotModel.setLocale( this.getLocale() );
		String initialMDX = this.getInitialMDX( template, env );
		logger.debug("Initial MDX is [" + initialMDX + "]");
		pivotModel.setMdx( initialMDX );
		pivotModel.initialize();
		// execute the MDX now
		try {
			pivotModel.getCellSet();
		} catch (Throwable t) {
			Throwable rootException = t;
			while (rootException.getCause() != null) {
				rootException = rootException.getCause();
			}
			throw new SpagoBIEngineRuntimeException("Error while executing MDX statement: " + rootException.getMessage(), t);
		}
		
		//init configs 
		modelConfig = new ModelConfig();
		modelConfig.setScenario(template.getScenario());
		modelConfig.setAliases(template.getAliases());

		
		// init artifact informations
		if(!template.isStandAlone()){
			Integer artifactID = getArtifactId(getEnv());
			modelConfig.setArtifactID(artifactID);
			logger.debug("Artifact ID is "+artifactID);
			String status = getArtifactStatus(getEnv());
			logger.debug("Artifact status is "+status);
			modelConfig.setStatus(status);
			
			String locker = getArtifactLocker(getEnv());
			logger.debug("Artifact locker is "+locker);
			modelConfig.setLocker(locker);	
			logger.debug("Init the datatsource fro writing");
			dataSourceForWriting = initDataSourceForWriting();
		}
		

		
		
		//init toolbar
		modelConfig.setToolbarMenuButtons(template.getToolbarMenuButtons());
		modelConfig.setToolbarVisibleButtons(template.getToolbarVisibleButtons());

		WriteBackEditConfig writeBackConfig = modelConfig.getWriteBackConf();
		if(writeBackConfig!= null ){
			try {
				writeBackManager = new WriteBackManager(getEditCubeName(), new MondrianDriver(getMondrianSchemaFilePath()));
			} catch (SpagoBIEngineException e) {
				logger.debug("Exception creating the whatif component", e);
				throw new SpagoBIEngineRestServiceRuntimeException("whatif.engine.instance.writeback.exception", getLocale(), "Exception creating the whatif component", e);
				
			}
		}
		
		standalone = template.isStandAlone();
		
		logger.debug("OUT");
	}
	
	private String getInitialMDX(WhatIfTemplate template, Map env) {
		String query = null;
		
		logger.debug("IN");
		
		query = template.getMdxQuery();
		logger.debug("MDX query found in template is [" + query + "]");
		
		// substitute query parameters
		query = MDXParametersUtilities.substituteParametersInMDXQuery(query, template.getParameters(), env);
		logger.debug("MDX query after parameters substitution is [" + query + "]");
		
		// substitute user profile attributes
		if(!template.isStandAlone()){
			IEngUserProfile profile = (IEngUserProfile) env.get(EngineConstants.ENV_USER_PROFILE);
			try {
				query = StringUtilities.substituteProfileAttributesInString(query, profile);
			} catch (Exception e) {
				throw new SpagoBIEngineRuntimeException("Error while substituting user profile attributes in MDX query", e);
			}
		}

		logger.debug("MDX query after user profile attributes substitution is [" + query + "]");
		
		logger.debug("OUT");
		return query;
	}


	private String initMondrianSchema(Map env) {
        ArtifactServiceProxy artifactProxy = (ArtifactServiceProxy) env.get( EngineConstants.ENV_ARTIFACT_PROXY );
        MondrianSchemaManager schemaManager = new MondrianSchemaManager(artifactProxy);
        Integer artifactVersionId = getArtifactVersionId( env );
        logger.debug("Artifact version id :" + artifactVersionId);
        String reference = schemaManager.getMondrianSchemaURI(artifactVersionId);
        logger.debug("Reference :" + reference);
        return reference;
	}
	
	private IDataSource initDataSourceForWriting(){
		return super.getDataSourceForWriting();
	}
	
	
    public Integer getArtifactVersionId(Map env) {
        try {
            if (!env.containsKey( SpagoBIConstants.SBI_ARTIFACT_VERSION_ID )) {
            	logger.error("Missing artifact version id");
                throw new SpagoBIEngineRuntimeException("Missing artifact version id");
            }
            String str = (String) env.get( SpagoBIConstants.SBI_ARTIFACT_VERSION_ID );
            Integer id = new Integer(str);
            return id;
        } catch (Exception e) {
            logger.error("Error while getting artifact version id", e);
            throw new SpagoBIEngineRuntimeException("Error while getting artifact version id", e);
        }
    }
    
    public Integer getArtifactId(Map env) {
        try {
            if (!env.containsKey( SpagoBIConstants.SBI_ARTIFACT_ID)) {
            	logger.error("Missing artifact id");
                throw new SpagoBIEngineRuntimeException("Missing artifact id");
            }
            String str = (String) env.get( SpagoBIConstants.SBI_ARTIFACT_ID );
            Integer id = new Integer(str);
            return id;
        } catch (Exception e) {
            logger.error("Error while getting artifact  id", e);
            throw new SpagoBIEngineRuntimeException("Error while getting artifact id", e);
        }
    }
    
    public String getArtifactStatus(Map env) {
        try {
            if (!env.containsKey( SpagoBIConstants.SBI_ARTIFACT_STATUS )) {
            	logger.error("Missing artifact status");
                throw new SpagoBIEngineRuntimeException("Missing artifact statu");
            }
            String str = (String) env.get( SpagoBIConstants.SBI_ARTIFACT_STATUS);
            return str;
        } catch (Exception e) {
            logger.error("Error while getting artifact status", e);
            throw new SpagoBIEngineRuntimeException("Error while getting artifact status", e);
        }
    }
    
    public String getArtifactLocker(Map env) {
        try {
            if (!env.containsKey( SpagoBIConstants.SBI_ARTIFACT_LOCKER )) {
            	logger.error("Missing artifact locker");
                throw new SpagoBIEngineRuntimeException("Missing artifact locker");
            }
            String str = (String) env.get( SpagoBIConstants.SBI_ARTIFACT_LOCKER);
            return str;
        } catch (Exception e) {
            logger.error("Error while getting artifact locker", e);
            throw new SpagoBIEngineRuntimeException("Error while getting artifact locker", e);
        }
    }
    
    public Integer getActualVersion(){
    	return VersionManager.getActualVersion(getPivotModel(), getModelConfig());
    }
    
	public OlapConnection getOlapConnection () {
		OlapConnection connection;
		try {
			connection = getOlapDataSource().getConnection();
		} catch (SQLException e) {
			logger.error("Error getting the connection", e);
			throw new SpagoBIEngineRuntimeException("Error getting the connection", e);
		}
		return connection;
	}

	public ModelConfig getModelConfig() {
		return modelConfig;
	}

	public OlapDataSource getOlapDataSource () {
		return olapDataSource;
	}
	
	public List getIncludes() {
		return includes;
	}
	
	public PivotModel getPivotModel() {
		return pivotModel;
	}

	public IDataSource getDataSource() {
		return (IDataSource)this.getEnv().get(EngineConstants.ENV_DATASOURCE);
	}
	
	public String getEditCubeName() {
		return getModelConfig().getWriteBackConf().getEditCubeName();
	}
	
	public IDataSet getDataSet() {
		return (IDataSet)this.getEnv().get(EngineConstants.ENV_DATASET);
	}
	
	public Locale getLocale() {
		return (Locale)this.getEnv().get(EngineConstants.ENV_LOCALE);
	}
	
	public AuditServiceProxy getAuditServiceProxy() {
		return (AuditServiceProxy)this.getEnv().get(EngineConstants.ENV_AUDIT_SERVICE_PROXY);
	}
	
	public EventServiceProxy getEventServiceProxy() {
		return (EventServiceProxy)this.getEnv().get(EngineConstants.ENV_EVENT_SERVICE_PROXY);
	}

	
	// -- unimplemented methods ------------------------------------------------------------

	public IEngineAnalysisState getAnalysisState() {
		throw new WhatIfEngineRuntimeException("Unsupported method [getAnalysisState]");
	}


	public void setAnalysisState(IEngineAnalysisState analysisState) {
		throw new WhatIfEngineRuntimeException("Unsupported method [setAnalysisState]");		
	}


	public void validate() throws SpagoBIEngineException {
		throw new WhatIfEngineRuntimeException("Unsupported method [validate]");		
	}

	public WriteBackManager getWriteBackManager() {
		return writeBackManager;
	}
	
	public String getMondrianSchemaFilePath() {
		return mondrianSchemaFilePath;
	}

	private void setMondrianSchemaFilePath(String mondrianSchemaFilePath) {
		this.mondrianSchemaFilePath = mondrianSchemaFilePath;
	}
	
	public Object getVariableValue(String variableName) {
		return modelConfig.getVariableValue(variableName);
	}

	public boolean isStandalone() {
		return standalone;
	}

	public void setStandalone(boolean standalone) {
		this.standalone = standalone;
	}

	public IDataSource getDataSourceForWriting() {
		if(dataSourceForWriting==null){
			logger.debug("The datasource for writing is null so we write in the same data source of the cube");
			return getDataSource();
		}
		return dataSourceForWriting;
	}
	
	

}
