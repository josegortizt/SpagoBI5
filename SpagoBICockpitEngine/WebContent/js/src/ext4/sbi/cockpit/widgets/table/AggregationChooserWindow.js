/** SpagoBI, the Open Source Business Intelligence suite

 * Copyright (C) 2012 Engineering Ingegneria Informatica S.p.A. - SpagoBI Competency Center
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0, without the "Incompatible With Secondary Licenses" notice.
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. **/







/**
 * Object name
 *
 * [description]
 *
 *
 * Public Properties
 *
 * [list]
 *
 *
 * Public Methods
 *
 * [list]
 *
 *
 * Public Events
 *
 * [list]
 *
 * Authors - Giulio Gavardi
 */
Ext.ns("Sbi.worksheet.designer");

Sbi.cockpit.widgets.table.AggregationChooserWindow = function(defAggregation) {


	var c = {
		title: LN('sbi.cockpit.aggregationwindow.title')
		, width: 500
		, height: 200
		, nameFieldVisible: true
		, descriptionFieldVisible: true
		, hasBuddy: false
		, funct: defAggregation

	};

	Ext.apply(this, c);

	this.initFormPanel(c);

	// constructor
	Sbi.cockpit.widgets.table.AggregationChooserWindow.superclass.constructor.call(this, {
		layout: 'fit',
		width: this.width,
		height: this.height,
		closeAction:'destroy',
		plain: true,
		title: this.title,
		items: [this.formPanel]
    });

	if(c.hasBuddy === 'true') {
		this.buddy = new Sbi.commons.ComponentBuddy({
    		buddy : this
    	});
	}

	this.addEvents('aggregationSave');

};

Ext.extend(Sbi.cockpit.widgets.table.AggregationChooserWindow, Ext.Window, {

    start: 0
    , limit: 20
	, attribute 	: null // the json object representing the attribute: it must be in the constructor input object
	, params : null // the json object with the parameters for store loading: it must be in the constructor input object
	//private methods
	, initFormPanel: function(config) {

		var items = [];


	    	var aggregationComboBoxData = [
                ['NONE',LN('sbi.qbe.selectgridpanel.aggfunc.name.none'), LN('sbi.qbe.selectgridpanel.aggfunc.name.none')],
	    		['SUM',LN('sbi.qbe.selectgridpanel.aggfunc.name.sum'), LN('sbi.qbe.selectgridpanel.aggfunc.name.sum')],
	    		['AVG',LN('sbi.qbe.selectgridpanel.aggfunc.name.avg'), LN('sbi.qbe.selectgridpanel.aggfunc.name.avg')],
	    		['MAX',LN('sbi.qbe.selectgridpanel.aggfunc.name.max'), LN('sbi.qbe.selectgridpanel.aggfunc.name.max')],
	    		['MIN',LN('sbi.qbe.selectgridpanel.aggfunc.name.min'), LN('sbi.qbe.selectgridpanel.aggfunc.name.min')],
	    		['COUNT',LN('sbi.qbe.selectgridpanel.aggfunc.name.count'), LN('sbi.qbe.selectgridpanel.aggfunc.name.count')],
	    		['COUNT DISTINCT',LN('sbi.qbe.selectgridpanel.aggfunc.name.countdistinct'), LN('sbi.qbe.selectgridpanel.aggfunc.name.countdistinct')],
	    	];

	    	var aggregationComboBoxStore = new Ext.data.SimpleStore({
	    		fields: ['value', 'field', 'description'],
	    		data : aggregationComboBoxData
	    	});

	    	this.aggregationField = new Ext.form.ComboBox({
	    	   	tpl: '<tpl for="."><div ext:qtip="{field}: {description}" class="x-combo-list-item">{field}</div></tpl>',
	    	   	editable  : false,
	    	   	fieldLabel : LN('sbi.cockpit.aggregationwindow.selectAggregation'),
	    	   	forceSelection : true,
	    	   	mode : 'local',
	    	   	name : 'aggregation',
	    	   	store : aggregationComboBoxStore,
	    	   	displayField:'field',
	    	    valueField:'value',
	    	    emptyText:LN('sbi.cockpit.aggregationwindow.selectAggregation'),
	    	    typeAhead: true,
	    	    triggerAction: 'all',
	    	    selectOnFocus:true
	    	});

	    	// if a function is already defined select it
	    	if(config.funct != undefined && config.funct != 'NaN'){
	    		this.aggregationField.select(config.funct);
	    	}
	    	else this.aggregationField.select('NONE');

	    	items.push(this.aggregationField);



    	this.formPanel = new Ext.form.FormPanel({
    		frame:true,
    	    bodyStyle:'padding:5px 5px 0',
    	    buttonAlign : 'center',
    	    items: items,
    	    buttons: [{
    			text: LN('sbi.generic.actions.save'),
    		    handler: function(){
    	    		this.fireEvent('aggregationSave', this, this.getFormState());
    	    		//this.hide();
                	this.close();
                	this.destroy();
    		    }
            	, scope: this
    	    },{
    		    text: LN('sbi.qbe.messagewin.cancel'),
    		    handler: function(){
    		    	//this.hide();
                	this.close();
                	this.destroy();
            	}
            	, scope: this
    		}]
    	 });
    }
	// public methods
	,getFormState : function() {
		var formState = {};
		formState.aggregation= this.aggregationField.getValue();
		return formState;
	}
});