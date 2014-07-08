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
 * Authors - Alberto Ghedin (alberto.ghedin@eng.it)
 */
Ext.ns("Sbi.cockpit.widgets.table");

Sbi.cockpit.widgets.table.TableWidgetDesigner = function(config) { 

	var defaultSettings = {
		name: 'tableWidgetDesigner',
		title: LN('sbi.cockpit.widgets.table.tableWidgetDesigner.title')
	};
		
	if (Sbi.settings && Sbi.settings.cockpit && Sbi.settings.cockpit.widgets && Sbi.settings.cockpit.widgets.table && Sbi.settings.cockpit.widgets.table.tableWidgetDesigner) {
		defaultSettings = Ext.apply(defaultSettings, Sbi.settings.cockpit.widgets.table.tableWidgetDesigner);
	}
	var c = Ext.apply(defaultSettings, config || {});
	Ext.apply(this, c);
	
	this.addEvents("attributeDblClick", "attributeRemoved");
	
	this.tableDesigner = new Sbi.cockpit.widgets.table.QueryFieldsCardPanel({
		ddGroup: this.ddGroup
	});
	
	// propagate events
	this.tableDesigner.on(
		'attributeDblClick' , 
		function (thePanel, attribute) { 
			this.fireEvent("attributeDblClick", this, attribute); 
		}, 
		this
	);
	this.tableDesigner.on(
		'attributeRemoved' , 
		function (thePanel, attribute) { 
			this.fireEvent("attributeRemoved", this, attribute); 
		}, 
		this
	);
	
	this.tableDesigner.on(
		'render' , 
		function (thePanel, attribute) { 
			if(Sbi.isValorized(this.visibleselectfields)) {
				this.setDesignerState({visibleselectfields: this.visibleselectfields});
			}
		}, 
		this
	);
	
	c = {
		layout: 'fit',
		height: 350,
		items: [
		        new Ext.Panel({
		        	border: false
		        	, bodyStyle: 'width: 100%; height: 100%'
		        	, items:[this.tableDesigner]
		        	//, html: "tableDesigner"
		        })
		]
	};
	
	Sbi.cockpit.widgets.table.TableWidgetDesigner.superclass.constructor.call(this, c);
};

Ext.extend(Sbi.cockpit.widgets.table.TableWidgetDesigner, Sbi.cockpit.core.WidgetDesigner, {
	tableDesigner: null
	
	, getDesignerState: function() {
		Sbi.trace("[TableWidgetDesigner.getDesignerState]: IN");		
		
		var state = Sbi.cockpit.widgets.table.TableWidgetDesigner.superclass.getDesignerState(this);
		state.wtype = 'table';		
		if(this.tableDesigner.rendered === true) {
			state.visibleselectfields = this.tableDesigner.tableDesigner.getContainedValues();
		} else {
			state.visibleselectfields =  this.visibleselectfields;			
		}
		
		Sbi.trace("[TableWidgetDesigner.getDesignerState]: OUT");
		return state;
	}
	
	, setDesignerState: function(state) {
		Sbi.trace("[TableWidgetDesigner.setDesignerState]: IN");
		Sbi.cockpit.widgets.table.TableWidgetDesigner.superclass.setDesignerState(this, state);
		if(state.visibleselectfields!=undefined && state.visibleselectfields!=null){
			Sbi.trace("[TableWidgetDesigner.setDesignerState]: there are [" + state.visibleselectfields.length + "] fields slected");
			this.tableDesigner.tableDesigner.setValues(state.visibleselectfields);
		} else {
			Sbi.trace("[TableWidgetDesigner.setDesignerState]: no fields selected");
		}
		Sbi.trace("[TableWidgetDesigner.setDesignerState]: OUT");
	}
	
	/* tab validity: rules are
	 * - at least one measure or attribute is in
	 */
	, validate: function(validFields){
		
		var valErr = Sbi.cockpit.widgets.table.TableWidgetDesigner.superclass.validate(this, validFields);
		if(valErr!= ''){
			return varErr;
		}
		
		valErr = ''+this.tableDesigner.validate(validFields);

		if(valErr!= ''){
			valErr = valErr.substring(0, valErr.length - 1);
			return LN("sbi.cockpit.widgets.table.validation.invalidFields")+valErr;
		}
		
		var vals = this.tableDesigner.tableDesigner.getContainedValues();
		if (vals && vals.length> 0) {return;} // OK
		else {
				return LN("sbi.designertable.tableValidation.noElement");
		} 
	}
	
	, containsAttribute: function (attributeId) {
		return this.tableDesigner.containsAttribute(attributeId);
	}
	
	
	
});
