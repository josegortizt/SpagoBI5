/** SpagoBI, the Open Source Business Intelligence suite

 * Copyright (C) 2012 Engineering Ingegneria Informatica S.p.A. - SpagoBI Competency Center
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0, without the "Incompatible With Secondary Licenses" notice. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. **/

 
/**

  * Authors
  * 
  * - Antonella Giachino (antonella.giachino@eng.it)
  */

Ext.ns("Sbi.cockpit.editor.widget");

Sbi.cockpit.editor.widget.WidgetEditorFieldPalette = function(config) {
	
	var defaultSettings = {
		title: LN('sbi.cockpit.queryfieldspanel.title')
		, displayRefreshButton : false
		, border: true,
		//bodyStyle:'background:green',
		bodyStyle:'padding:3px',
      	layout: 'fit'
	};
	var settings = Sbi.getObjectSettings('Sbi.cockpit.editor.widget.WidgetEditorFieldPalette', defaultSettings);

	var c = Ext.apply(settings, config || {});
	Ext.apply(this, c);
		
	this.initServices();
	this.init();
	
	c.items = [this.grid];
	if(this.displayRefreshButton === true) {
		c.tools = [{ 
		    id:'refresh',
		    qtip: LN('sbi.formbuilder.queryfieldspanel.tools.refresh'),
		    handler: function(){
      			this.refreshFieldsList(null);
		    }
		    , scope: this
      	}];
	}
	
	// constructor
	Sbi.cockpit.editor.widget.WidgetEditorFieldPalette.superclass.constructor.call(this, c);
	
	this.addEvents("validateInvalidFieldsAfterLoad");
};

Ext.extend(Sbi.cockpit.editor.widget.WidgetEditorFieldPalette, Ext.Panel, {
    
	// =================================================================================================================
	// PROPERTIES
	// =================================================================================================================
	
	/**
     * @property {Array} services
     * This array contains all the services invoked by this class
     */
    services: null
    , grid: null
    , store: null
    , displayRefreshButton: null  // if true, display the refresh button
    
   
    
    // =================================================================================================================
	// METHODS
	// =================================================================================================================
	
    
    , refreshFieldsList: function(datasetLabel) {
    	Sbi.trace("[WidgetEditorFieldPalette.refreshFieldsList]: IN");
    	
    	Sbi.trace("[WidgetEditorFieldPalette.refreshFieldsList]: input parameter datasetLabel is equal to [" + datasetLabel + "]");
    	
		if (datasetLabel) {	
			this.dataset = datasetLabel;
			this.store.proxy.setUrl(Sbi.config.serviceRegistry.getRestServiceUrl({
				serviceName : 'dataset/' + this.dataset + '/fields'
			}), true);
			Sbi.trace("[WidgetEditorFieldPalette.refreshFieldsList]: url: " + this.store.url);
		} 
		this.store.load();
		
		Sbi.trace("[WidgetEditorFieldPalette.refreshFieldsList]: OUT");
	}

	

    // -----------------------------------------------------------------------------------------------------------------
    // init methods
	// -----------------------------------------------------------------------------------------------------------------
	
	/**
	 * @method 
	 * 
	 * Initialize the following services exploited by this component:
	 * 
	 *    - getQueryFields
	 */
    , initServices: function(){
    	var baseParams = {};
    	if (this.dataset) baseParams.dataset = this.dataset;
    	
    	this.services = this.services || new Array();	
    	this.services["getQueryFields"] = Sbi.config.serviceRegistry.getRestServiceUrl({
    		serviceName : 'dataset/{label}/fields'
    	  , baseParams:	baseParams
    	});	
    }
	
	/**
	 * @method 
	 * 
	 * Initialize the GUI
	 */
	, init: function() {
		this.initGrid();
	}
    
	, initStore: function() {
		Sbi.trace("[WidgetEditorFieldPalette.initStore]: IN");

		this.store = new Ext.data.JsonStore({
			autoLoad : (this.dataset)?true:false
			, idProperty : 'alias'
			, root: 'results'
			, fields: ['id', 'alias', 'funct', 'iconCls', 'nature', 'values', 'precision', 'options']
			, url: Sbi.config.serviceRegistry.getRestServiceUrl({
				serviceName : 'dataset/' + this.dataset + '/fields'
			})
		}); 
    	
		this.store.on('loadexception', function(store, options, response, e){
			Sbi.exception.ExceptionHandler.handleFailure(response, options);
		}, this);
		
		this.store.on('load', function(){
			Sbi.trace("[WidgetEditorFieldPalette.onLoad]: XXX");
			this.fireEvent("validateInvalidFieldsAfterLoad", this); 		
		}, this);
		
		Sbi.trace("[WidgetEditorFieldPalette.initStore]: OUT");
	}
	
    , initGrid: function() {
    	var c = this.gridConfig;
		
    	this.initStore();
    	
        this.template = new Ext.Template( // see Ext.Button.buttonTemplate and Button's onRender method
        		// margin auto in order to have button center alignment
                '<table id="{4}" cellspacing="0" class="x-btn {3} {6}"><tbody class="{1}">',
                '<tr><td class="x-btn-tl"><i>&#160;</i></td><td class="x-btn-tc"></td><td class="x-btn-tr"><i>&#160;</i></td></tr>',
                '<tr><td class="x-btn-ml"><i>&#160;</i></td><td class="x-btn-mc"><button type="{0}" class=" x-btn-text {5}"></button>{7}</td><td class="x-btn-mr"><i>&#160;</i></td></tr>',
                '<tr><td class="x-btn-bl"><i>&#160;</i></td><td class="x-btn-bc"></td><td class="x-btn-br"><i>&#160;</i></td></tr>',
                '</tbody></table>');
        this.template.compile();
		
		this.grid = new Ext.grid.GridPanel(Ext.apply(c || {}, {
	        store: this.store,
	        hideHeaders: true,
	        columns: [
	            {id:'alias' 
            	, header: LN('sbi.formbuilder.queryfieldspanel.fieldname')
            	, width: 160
            	, sortable: true
            	, dataIndex: 'alias'
            	, renderer : function(value, metaData, record, rowIndex, colIndex, store) {
		        	return this.template.apply(
		        			// by now cssborder is defined only for segment_attribute
		        			['button', 'x-btn-small x-btn-icon-small-left', '', 'x-btn-text-icon', Ext.id(), record.data.iconCls, record.data.iconCls+'_text', record.data.alias]		
		        	);
		    	}
	            , scope: this
            	}
	        ],
	        stripeRows: false,
	        autoExpandColumn: 'alias',
	        enableDragDrop: true
	        //ddGroup: c.ddGroup //'formbuilderDDGroup'
	    }));
    }
    
    
    // public methods 
    
	

    , getFields : function () {
    	var fields = [];
    	var count = this.store.getCount();
    	for (var i = 0; i < count; i++) {
    		fields.push(this.store.getAt(i).data);
    	}
    	return fields;
    }

});