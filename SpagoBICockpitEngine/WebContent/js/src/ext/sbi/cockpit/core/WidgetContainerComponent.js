/** SpagoBI, the Open Source Business Intelligence suite

 * Copyright (C) 2012 Engineering Ingegneria Informatica S.p.A. - SpagoBI Competency Center
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0, without the "Incompatible With Secondary Licenses" notice. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. **/
 
 
Ext.ns("Sbi.cockpit.core");

/**
 * @class Sbi.cockpit.core.WidgetContainerComponent
 * @extends Ext.Window
 * 
 * bla bla bla bla bla ...
 */

/**
 * @cfg {Object} config
 * ...
 */
Sbi.cockpit.core.WidgetContainerComponent = function(config) {
	
	Sbi.trace("[WidgetContainerComponent.costructor]: IN");
	
	this.adjustConfigObject(config);
	this.validateConfigObject(config);
	
	// init properties...
	var defaultSettings = {
		title : config.widget? 'Widget [' + config.widget.id + ']': 'Widget'
	    , bodyBorder: true
	    , frame: true
	    , shadow: false
	    , plain : true
	    , constrain: true
	    , layout : 'fit'
	    , width:653
	    , height:332
	    , x: 100
	    , y: 100
	};
	
	var settings = Sbi.getObjectSettings('Sbi.cockpit.core.WidgetContainerComponent', defaultSettings);
	
	var c = Ext.apply(settings, config || {});
	Ext.apply(this, c);
	Sbi.trace("[WidgetContainerComponent.costructor]: region is equal to [" + Sbi.toSource(this.region) + "]");
	
	Ext.apply(c, this.region);
	delete this.region;
	
	// init events...
	this.addEvents('performaction', 'move', 'resize');
	
	this.initServices();
	this.init();
	
	if(this.widget) {
		this.items = [this.widget];
		this.widget.setParentComponent(this);
	} else {
		this.html = "Please configure the widget";
	}
	
	// constructor
	Sbi.cockpit.core.WidgetContainerComponent.superclass.constructor.call(this, c);
	
	Sbi.trace("[WidgetContainerComponent.costructor]: OUT");
};

Ext.extend(Sbi.cockpit.core.WidgetContainerComponent, Ext.Window, {
    
	// =================================================================================================================
	// PROPERTIES
	// =================================================================================================================
	
	/**
     * @property {Array} services
     * This array contains all the services invoked by this class
     */
	services: null
	
	/**
     * @property {Sbi.cockpit.core.WidgetContainer} parentContainer
     * The parent container
     */
	, parentContainer: null
	
	/**
     * @property {Sbi.cockpit.core.Widget} widget
     * The wrapped widget object
     */
	, widget: null
   
	// =================================================================================================================
	// METHODS
	// =================================================================================================================
	
	/**
	 * @method 
	 * 
	 * Controls that the configuration object passed in to the class constructor contains all the compulsory properties. 
	 * If it is not the case an exception is thrown. Use it when there are properties necessary for the object
	 * construction for whom is not possible to find out a valid default value.
	 * 
	 * @param {Object} the configuration object passed in to the class constructor
	 * 
	 * @return {Object} the config object received as input
	 */
	, validateConfigObject: function(config) {
		return config;
	}

	/**
	 * @method 
	 * 
	 * Modify the configuration object passed in to the class constructor adding/removing properties. Use it for example to 
	 * rename a property or to filter out not necessary properties.
	 * 
	 * @param {Object} the configuration object passed in to the class constructor
	 * 
	 * @return {Object} the modified version config object received as input
	 * 
	 */
	, adjustConfigObject: function(config) {
		return config;
	}
	
	// -----------------------------------------------------------------------------------------------------------------
    // public methods
	// -----------------------------------------------------------------------------------------------------------------
	
	/**
	 * @method
	 * 
	 * @return {boolean} false if there is a wrapped widget; true otherwise
	 */
	, isEmpty: function() {
		return (this.getWidget() === null);
	}
	
	, isNotEmpty: function() {
		return (this.isEmpty() === false);
	}
	
	/**
	 * @method
	 * 
	 * Replace the old embedded widget with the new one passed as argument
	 * @param {Object} the configuration object passed in to the class constructor
	 */
	, setWidget: function(widget) {
		Sbi.trace("[WidgetContainerComponent.setWidget]: IN");
		this.removeAll(true);
		Sbi.trace("[WidgetContainerComponent.setWidget]: removed component content");
		if(Sbi.isValorized(widget)) {
			// TODO check if widget is an instance of widget
			this.add(widget);
			this.widget = widget;
			this.widget.setParentComponent(this);
			Sbi.trace("[WidgetContainerComponent.setWidget]: widget added");
		} else {
			this.widget = widget;
		}
		this.doLayout();
		Sbi.trace("[WidgetContainerComponent.setWidget]: layout refreshed");
		
		Sbi.trace("[WidgetContainerComponent.setWidget]: OUT");
	}
	
	/**
	 * @method
	 * 
	 * @return {Sbi.cockpit.core.Widget} the wrapped widget. null if there is widget wrapped
	 */
	, getWidget: function() {
		var w = null;
		if(Sbi.isValorized(this.widget)) {
			w = this.widget;
		} 
		return w;
	}
	
	, getWidgetId: function(){
		var id = null;
		if(Sbi.isValorized(this.widget)) {
			id = this.widget.getId();
		} 
		return id;
	}
	
	
	
	, setWidgetConfiguration: function(widgetConf) {
		Sbi.trace("[WidgetContainerComponent.setWidgetConfiguration]: IN");
		var widget;
		if(this.isEmpty()) {
			widget = Sbi.cockpit.core.WidgetExtensionPointManager.getWidgetRuntime(widgetConf);
			this.setWidget(widget);
		} else {
			widget = this.getWidget();
			widget.setConfiguration(widgetConf);
		}
		Sbi.trace("[WidgetContainerComponent.setWidgetConfiguration]: widgetConf is equal to [" + Sbi.toSource(widgetConf) + "]");
	
		Sbi.trace("[WidgetContainerComponent.setWidgetConfiguration]: OUT");
	}
	
	, getWidgetConfiguration: function(widgetConf) {
		var widgetConf = null;
		if(Sbi.isValorized(this.widget)) {
			widgetConf = this.widget.getConfiguration();
		}
		return widgetConf;
	}
	
	, getParentContainer: function() {	
		return this.parentContainer;	
	}

    , setParentContainer: function(container) {	
    	Sbi.trace("[WidgetContainerComponent.setParentContainer]: IN");
		this.parentContainer = container;	
		Sbi.trace("[WidgetContainerComponent.setParentContainer]: OUT");
	}
	// -----------------------------------------------------------------------------------------------------------------
    // private methods
	// -----------------------------------------------------------------------------------------------------------------
	, onShowWidgetConfiguration: function() {
		this.fireEvent('performaction', this, 'showConfiguration');
    } 
    
    , onShowWidgetEditor: function() {
    	this.fireEvent('performaction', this, 'showEditor');
    } 
    
    , onWidgetRefresh: function() {
    	if(this.isNotEmpty()) {
    		var widget = this.getWidget();
    		widget.refresh();
    	} else {
    		Ext.Msg.alert('Message', 'No widget to refresh.');
    	}
    }
	
	// -----------------------------------------------------------------------------------------------------------------
    // init methods
	// -----------------------------------------------------------------------------------------------------------------
	
	/**
	 * @method 
	 * 
	 * Initialize the following services exploited by this component:
	 * 
	 *    - none
	 */
	, initServices: function() {
//		var params = {LIGHT_NAVIGATOR_DISABLED: 'TRUE'};
//		
//		this.services = this.services || new Array();
//		
//		this.services['exampleService'] = this.services['exampleService'] || Sbi.config.serviceRegistry.getServiceUrl({
//			serviceName: 'EXAMPLE_ACTION'
//			, baseParams: params
//		});	
	}


	/**
	 * @method 
	 * 
	 * Initialize the GUI
	 */
	, init: function() {
		this.tools =  [{
    		id:'gear',
    		handler: this.onShowWidgetEditor,
    		scope: this
    	}, {
        	id:'help',
            handler: this.onShowWidgetConfiguration,
    		scope: this
        }, {
        	id:'refresh',
        	handler: this.onWidgetRefresh,
//     	   	handler: function(){
//     	   		Ext.Msg.alert('Message', 'The REFRESH tool was clicked.');
//     	    },
    		scope: this
        }];
	}
	
	// =================================================================================================================
	// EVENTS
	// =================================================================================================================
	
//	, this.addEvents(
//		/**
//	     * @event performaction
//	     * Fired when the user trigger the execution of a specific action doing something on this widget 
//	     * @param {Sbi.xxx.Xxxx} this
//	     * @param {Ext.Toolbar} the contained widget
//	     * @param {Sring} action
//	     */
//		'performaction'
//	);	
});