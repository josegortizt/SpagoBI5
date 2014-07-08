/* SpagoBI, the Open Source Business Intelligence suite

 * Copyright (C) 2012 Engineering Ingegneria Informatica S.p.A. - SpagoBI Competency Center
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0, without the "Incompatible With Secondary Licenses" notice. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. */
/**
 * @author Alberto Ghedin (alberto.ghedin@eng.it)
 * 
 * @class HierarchyResource
 * 
 * Services that manage the hierarchies of the model:
 * 
 */
package it.eng.spagobi.engines.whatif.api;

import it.eng.spagobi.engines.whatif.WhatIfEngineInstance;
import it.eng.spagobi.engines.whatif.common.AbstractWhatIfEngineService;
import it.eng.spagobi.engines.whatif.cube.CubeUtilities;
import it.eng.spagobi.engines.whatif.member.SbiMember;
import it.eng.spagobi.utilities.engines.SpagoBIEngineRuntimeException;
import it.eng.spagobi.utilities.exceptions.SpagoBIRuntimeException;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import org.apache.log4j.Logger;
import org.olap4j.OlapException;
import org.olap4j.metadata.Hierarchy;
import org.olap4j.metadata.Level;
import org.olap4j.metadata.Member;
import org.olap4j.metadata.NamedList;
import org.olap4j.metadata.Property.StandardMemberProperty;

import com.eyeq.pivot4j.PivotModel;
import com.eyeq.pivot4j.transform.ChangeSlicer;
import com.eyeq.pivot4j.transform.PlaceMembersOnAxes;


@Path("/1.0/hierarchy")
public class HierarchyResource extends AbstractWhatIfEngineService {
	
	private static final String NODE_PARM = "node";
	public static transient Logger logger = Logger.getLogger(HierarchyResource.class);
	
	@GET
	@Path("{hierarchy}/slice/{member}/{multi}")
	@Produces("text/html; charset=UTF-8")
	public String addSlicer(@javax.ws.rs.core.Context HttpServletRequest req, @PathParam("hierarchy") String hierarchyName, @PathParam("member") String memberName, @PathParam("multi") boolean multiSelection){

		WhatIfEngineInstance ei = getWhatIfEngineInstance();
		PivotModel model = ei.getPivotModel();
		Hierarchy hierarchy =null;
		Member member =null;

		ChangeSlicer ph =  model.getTransform(ChangeSlicer.class);
	

		try {
			hierarchy = CubeUtilities.getHierarchy(model.getCube(), hierarchyName);
			member = CubeUtilities.getMember(hierarchy, memberName);
		} catch (OlapException e) {
			logger.debug("Error getting the member "+memberName+" from the hierarchy "+hierarchyName,e);
			throw new SpagoBIEngineRuntimeException("Error getting the member "+memberName+" from the hierarchy "+hierarchyName,e);
		}
		
		
		List<org.olap4j.metadata.Member> slicers = ph.getSlicer(hierarchy);
		
		if(!multiSelection){
			slicers.clear();
		}
		
		slicers.add(member);
		ph.setSlicer(hierarchy,slicers);

		return renderModel(model);
	}
	
	@GET
	@Path("/{hierarchy}/filtertree/{axis}")
	@Produces("text/html; charset=UTF-8")
	public String getMemberValue(@javax.ws.rs.core.Context HttpServletRequest req, @PathParam("hierarchy") String hierarchyUniqueName, @PathParam("axis") int axis){
		Hierarchy hierarchy= null;
		String node;
		List<Member> list = new ArrayList<Member>(); 
		List<Member> visibleMembers = null;
		
		WhatIfEngineInstance ei = getWhatIfEngineInstance();
		PivotModel model = ei.getPivotModel();
		
		//if not a filter axis
		if(axis>=0){
			PlaceMembersOnAxes pm = model.getTransform(PlaceMembersOnAxes.class);
			visibleMembers = pm.findVisibleMembers(CubeUtilities.getAxis(axis));
		}

		
		
		logger.debug("Getting the node path from the request");
		//getting the node path from request
		node = req.getParameter(NODE_PARM);
		if(node==null){
			logger.debug("no node path found in the request");
			return null;
		}	
		logger.debug("The node path is "+node);
		
		logger.debug("Getting the hierarchy "+hierarchyUniqueName+" from the cube");
		try {
			NamedList<Hierarchy> hierarchies = model.getCube().getHierarchies();
			for(int i=0; i<hierarchies.size(); i++){
				String hName = hierarchies.get(i).getUniqueName();
				if(hName.equals(hierarchyUniqueName)){
					hierarchy = hierarchies.get(i);
					break;
				}
			}
		} catch (Exception e) {
			logger.debug("Error getting the hierarchy "+hierarchy,e);
			throw new SpagoBIEngineRuntimeException("Error getting the hierarchy "+hierarchy,e);
		}
		
		try {

			if(CubeUtilities.isRoot(node)){
				logger.debug("Getting the members of the first level of the hierarchy");
				Level l = hierarchy.getLevels().get(0);
				logger.debug("This is the root.. Returning the members of the first level of the hierarchy");
				logger.debug("OUT");
				list = l.getMembers();
			}else{
				logger.debug("getting the child members");
				Member m = CubeUtilities.getMember(hierarchy, node);
				if(m!=null){
					list = (List<Member>)m.getChildMembers();
				}
				
			}
		} catch (Exception e) {
			logger.debug("Error getting the member tree "+node,e);
			throw new SpagoBIEngineRuntimeException("Error getting the member tree "+node,e);
		}

		List<SbiMember> members = new ArrayList<SbiMember>();
		

			for (int i = 0; i < list.size(); i++) {
				Member aMember = list.get(i);
				Boolean memberVisibleInTheSchema = true;
				try {
					memberVisibleInTheSchema = (Boolean)aMember.getPropertyValue(StandardMemberProperty.$visible);
				} catch (Throwable e) {
					logger.error("impossible to load the property visible for the member "+aMember.getUniqueName());
				}
				if(memberVisibleInTheSchema== null || memberVisibleInTheSchema){
					//check the visible members
					if(visibleMembers!=null && axis>=0){
						members.add(new SbiMember(aMember, visibleMembers.contains(list.get(i))));
					}else{
						members.add(new SbiMember(list.get(i), true));
					}
					
				}

			}

		

		try {
			return (String) serialize(members);
		} catch (Exception e) {
			logger.error("Error serializing the MemberEntry",e);
			throw new SpagoBIRuntimeException("Error serializing the MemberEntry",e);
		}

	}


}
