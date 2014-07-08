/** SpagoBI, the Open Source Business Intelligence suite

 * Copyright (C) 2012 Engineering Ingegneria Informatica S.p.A. - SpagoBI Competency Center
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0, without the "Incompatible With Secondary Licenses" notice. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. **/
 
  
 
  
 
  
 
/**
  * 
  * Authors
  * 
  * - Alberto Ghedin (alberto.ghedin@eng.it), Davide Zerbetto (davide.zerbetto@eng.it)
  */

Ext.ns("Sbi.cockpit.widgets.table");

Sbi.cockpit.widgets.table.QueryFieldsContainerPanel = function(config) {
	
	var defaultSettings = {
		title: LN('sbi.cockpit.widgets.table.tabledesignerpanel.fields')
	};
	
	if (Sbi.settings && Sbi.settings.worksheet && Sbi.settings.worksheet.designer && Sbi.settings.worksheet.designer.queryFieldsContainerPanel) {
		defaultSettings = Ext.apply(defaultSettings, Sbi.settings.worksheet.designer.queryFieldsContainerPanel);
	}
	
	var c = Ext.apply(defaultSettings, config || {});
	
	Ext.apply(this, c); // this operation should overwrite this.initialData content, that is initial grid's content
	
	//this.addEvents('storeChanged', 'attributeDblClick', 'attributeRemoved');
	
	this.init(c);
	
	Ext.apply(c, {
        store: this.store
        , width: 250
        , height: 280
        , cls : 'table'
        , hideHeaders: true
	    , layout: 'fit'
	    , viewConfig: {
	    	plugins: {
				ptype: 'gridviewdragdrop',
	            ddGroup : this.ddGroup || 'crosstabDesignerDDGroup'
	        },
	    	forceFit: true
	    }
		, tools: [
	          {
	        	  type: 'close'
	        	, handler: this.removeAllValues
	          	, scope: this
	          	, qtip: LN('sbi.crosstab.attributescontainerpanel.tools.tt.removeall')
	          }
		]
        , listeners: {
			render: function(grid) { // hide the grid header
				//grid.getView().el.select('.x-grid3-header').setStyle('display', 'none');
    		}
        	, keydown: function(e) { 
        		if (e.keyCode === 46) {
        			this.removeSelectedValues();
      	      	}      
      	    }
        	, mouseover: function(e, t) {
        		this.targetRow = t; // for Drag&Drop
        	}
        	, mouseout: function(e, t) {
        		this.targetRow = undefined;
        	}
        	, scope: this
		}
        , scope: this
        , type: 'queryFieldsContainerPanel'
	});	

	// constructor
	Sbi.cockpit.widgets.table.QueryFieldsContainerPanel.superclass.constructor.call(this, c);
	
	this.on('rowdblclick', this.rowDblClickHandler, this);
};

Ext.extend(Sbi.cockpit.widgets.table.QueryFieldsContainerPanel, Ext.grid.GridPanel, {
	
	initialData: undefined
	
	, targetRow: null
	
	, calculateTotalsCheckbox: null
	, calculateSubtotalsCheckbox: null
	
	, validFields: null
	
	, Record: Ext.data.Record.create([
	      {name: 'id', type: 'string'}
	      , {name: 'alias', type: 'string'}
	      , {name: 'funct', type: 'string'}
	      , {name: 'iconCls', type: 'string'}
	      , {name: 'nature', type: 'string'}
	      , {name: 'values', type: 'string'}
	      , {name: 'sortable', type: 'boolean'}
	      , {name: 'width', type: 'int'}
	])
	
		 , renderTpl1: [
	                '<a id="button-{id}" class="x-btn x-unselectable x-btn-default-medium x-icon-text-left x-btn-icon-text-left x-btn-default-medium-icon-text-left" tabindex="0" unselectable="on" hidefocus="on" role="button">',
	                '<span id="{id}-btnWrap" class="{baseCls}-wrap',
	                     '<tpl if="splitCls"> {splitCls}</tpl>',
	                     '{childElCls}" unselectable="on">',
	                     '<span id="{id}-btnEl" class="{baseCls}-button">',
	                         '<span id="{id}-btnInnerEl" class="{baseCls}-inner {innerCls}',
	                             '{childElCls}" unselectable="on">',
	                             '{text}',
	                         '</span>',
	                         '<span role="img" id="{id}-btnIconEl" class="{baseCls}-icon-el {iconCls}',
	                             '{childElCls} {glyphCls}" unselectable="on" style="',
	                             '<tpl if="iconUrl">background-image:url({iconUrl});</tpl>',
	                             '<tpl if="glyph && glyphFontFamily">font-family:{glyphFontFamily};</tpl>">',
	                             '<tpl if="glyph">&#{glyph};</tpl><tpl if="iconCls || iconUrl">&#160;</tpl>',
	                         '</span>',
	                     '</span>',
	                 '</span>',
	                 // if "closable" (tab) add a close element icon
	                 '<tpl if="closable">',
	                     '<span id="{id}-closeEl" class="{baseCls}-close-btn" title="{closeText}" tabIndex="0"></span>',
	                 '</tpl>'
	                 , '</a>'
	           
	    ]
	  
	  	, renderTpl2: ['<table id="{id}" cellspacing="0" class="x-btn x-btn-text-icon"><tbody class="x-btn-small x-btn-icon-small-left">',
	  	                '<tr><td class="x-btn-tl"><i>&#160;</i></td><td class="x-btn-tc"></td><td class="x-btn-tr"><i>&#160;</i></td></tr>',
	  	                '<tr><td class="x-btn-ml"><i>&#160;</i></td><td class="x-btn-mc"><button type="button" class=" x-btn-text {iconCls}"></button>{text}</td><td class="x-btn-mr"><i>&#160;</i></td></tr>',
	  	                '<tr><td class="x-btn-bl"><i>&#160;</i></td><td class="x-btn-bc"></td><td class="x-btn-br"><i>&#160;</i></td></tr>',
	  	                '</tbody></table>']

	 	, templateArgs: {
	         innerCls : '',
	         splitCls : '',
	         baseCls : Ext.baseCSSPrefix + 'btn',
	         //iconUrl  : me.icon,
	         iconCls  : '',//me.iconCls,
	         //glyph: glyph,
	         glyphCls: '', 
	         glyphFontFamily: Ext._glyphFontFamily,
	         text     : '&#160;'
	     } 
	
	, init: function(c) {
		this.initStore(c);
		this.initColumnModel(c);
	}
	
	, initStore: function(c) {
		this.store =  new Ext.data.ArrayStore({
	        fields: ['id', 'alias', 'funct', 'iconCls', 'nature', 'values', 'valid', 'sortable', 'width']
		});
		// if there are initialData, load them into the store
		if (this.initialData !== undefined) {
			for (i = 0; i < this.initialData.length; i++) {
				this.addField(this.initialData[i]);
			}
		}
		this.store.on('remove', function (theStore, theRecord, index ) {
			this.fireEvent('attributeRemoved', this, theRecord.data);
		}, this);
		/*
		 * unfortunately, when removing all record with removeAll method, the event remove is not raised
		 */
		this.store.on('bulkremove', function (theStore, theRecords ) {
			for (var i = 0 ; i < theRecords.length; i++) {
				var aRecord = theRecords[i];
				this.fireEvent('attributeRemoved', this, aRecord.data);
			}
		}, this);
	}
	
	, initColumnModel: function(c) {
		this.template = new Ext.XTemplate(this.renderTpl1);
        this.template.compile();
        
	    var fieldColumn = {
	    	header:  ''
	    	, dataIndex: 'alias'
	    	, flex: 1
	    	, hideable: false
	    	, hidden: false	
	    	, sortable: false
	   	    , renderer : function(value, metaData, record, rowIndex, colIndex, store){
	   	    	Sbi.trace("[WidgetEditorFieldPalette.renderGridRow]: IN");
        		
        		var templateData = Ext.apply({}, {
            		id: Ext.id()
            		, text:  record.get("alias")
            		, iconCls: (record.data.valid != undefined && !record.data.valid)? 'x-btn-invalid': record.get("iconCls")
            	}, this.templateArgs);
        		var htmlFragment = this.template.apply(templateData);
        		
        		//Sbi.trace("[WidgetEditorFieldPalette.renderGridRow]: htmlFragment ["  + htmlFragment + "]");
        		Sbi.trace("[WidgetEditorFieldPalette.renderGridRow]: OUT");
        		return htmlFragment;  
	    	}
	        , scope: this
	    };
	    //this.cm = new Ext.grid.ColumnModel([fieldColumn]);
	    this.columns =[fieldColumn];
	}
	
	, notifyDropFromQueryFieldsPanel: function(ddSource) {
		Sbi.trace("[QueryFieldsContainerPanel.notifyDropFromQueryFieldsPanel]: IN");
		var rows = ddSource.dragData.records;
		var i = 0;
		for (; i < rows.length; i++) {
			var aRow = rows[i];
			// if the attribute is already present show a warning
			if (this.store.findExact('id', aRow.data.id) !== -1) {
				Ext.Msg.show({
					   title: LN('sbi.crosstab.attributescontainerpanel.cannotdrophere.title'),
					   msg: LN('sbi.crosstab.attributescontainerpanel.cannotdrophere.attributealreadypresent'),
					   buttons: Ext.Msg.OK,
					   icon: Ext.MessageBox.WARNING
				});
				return;
			}
			Sbi.trace("[QueryFieldsContainerPanel.notifyDropFromQueryFieldsPanel]: 1");
			
			// if the field is a postLineCalculated show an error
			if (aRow.data.nature === 'postLineCalculated') {
				Ext.Msg.show({
					   title: LN('sbi.crosstab.attributescontainerpanel.cannotdrophere.title'),
					   msg: LN('sbi.crosstab.attributescontainerpanel.cannotdrophere.postlinecalculated'),
					   buttons: Ext.Msg.OK,
					   icon: Ext.MessageBox.ERROR
				});
				return;
			}
			Sbi.trace("[QueryFieldsContainerPanel.notifyDropFromQueryFieldsPanel]: 2");
			
			this.addField(aRow.data);
			this.fireEvent('storeChanged', this.store.getCount());
		}
		Sbi.trace("[QueryFieldsContainerPanel.notifyDropFromQueryFieldsPanel]: OUT");
	}
	
	
	, rowDblClickHandler: function(grid, rowIndex, event) {
		var record = grid.store.getAt(rowIndex);
		if (record.data.nature == 'attribute' || record.data.nature == 'segment_attribute') {
	     	this.fireEvent("attributeDblClick", this, record.data);
		}
	}
	
	, getContainedValues: function () {
		var attributes = [];
		for(i = 0; i < this.store.getCount(); i++) {
			var record = this.store.getAt(i);
			attributes.push(record.data);
		}
		return attributes;
	}
	
	, setValues: function (attributes) {
		Sbi.trace("[QueryFieldsContainerPanel.setValues]: IN");
		this.removeAllValues();
		var i = 0;
		for (; i < attributes.length; i++) {
  			var attribute = attributes[i];
  			this.addField(attribute); 
  		}
		this.fireEvent('storeChanged', this.store.getCount());
		Sbi.trace("[QueryFieldsContainerPanel.setValues]: OUT");
	}
	
	, addField : function (field) {
		//Default values
		field.sortable = true;
		field.width = 150;
		
		Sbi.trace("[QueryFieldsContainerPanel.addField]: IN");
		var data = Ext.apply({}, field); // making a clone			
		var record = new this.Record(data);
		this.store.add(record); 
		Sbi.trace("[QueryFieldsContainerPanel.addField]: field [" + Sbi.toSource(field)+ "] succesfully added");
		Sbi.trace("[QueryFieldsContainerPanel.addField]: OUT");
	}

	, removeSelectedValues: function() {
		Sbi.trace("[QueryFieldsContainerPanel.removeSelectedValues]: IN");
        var sm = this.getSelectionModel();
        var rows = sm.getSelections();
        this.store.remove(rows);
        this.fireEvent('storeChanged', this.store.getCount());
        Sbi.trace("[QueryFieldsContainerPanel.removeSelectedValues]: OUT");
	}
	
	, removeAllValues: function() {
		Sbi.trace("[QueryFieldsContainerPanel.removeAllValues]: IN");
		this.store.removeAll(false); // CANNOT BE SILENT!!! it must throw the clear event for attributeRemoved event
		this.fireEvent('storeChanged',0);
		Sbi.trace("[QueryFieldsContainerPanel.removeAllValues]: OUT");
	}

	, containsAttribute: function (attributeId) {
		if (this.store.findExact('id', attributeId) !== -1) {
			return true;
		}
		return false;
	}
	, validate: function (validFields) {
		
		this.validFields = validFields;

		var invalidFields = this.modifyStore(validFields);
		if(this.rendered){
			this.store.fireEvent("datachanged", this, null); 
		}
		return invalidFields;
			
	}
	, modifyStore: function (validFields) {
		var invalidFields = '';
		var num = this.store.getCount();
		for(var i = 0; i < num; i++) {
			var record = this.store.getAt(i);
			var isValid = this.validateRecord(record,validFields);
			record.data.valid = isValid;
			if(isValid == false){
				invalidFields+=''+record.data.alias+',';
			}
		}
		return invalidFields;
	}
	, validateRecord: function (record, validFields) {
		var isValid = false;
		var i = 0;
		for(; i<validFields.length && isValid == false; i++){
			if(validFields[i].id == record.data.id){
			isValid = true;	
			}
		}
		return isValid;
	}

	

});