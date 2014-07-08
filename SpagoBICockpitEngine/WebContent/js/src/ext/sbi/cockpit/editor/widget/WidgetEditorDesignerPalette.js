/** SpagoBI, the Open Source Business Intelligence suite

 * Copyright (C) 2012 Engineering Ingegneria Informatica S.p.A. - SpagoBI Competency Center
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0, without the "Incompatible With Secondary Licenses" notice. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. **/

Ext.ns("Sbi.cockpit.editor.widget");

Sbi.cockpit.editor.widget.WidgetEditorDesignerPalette = function(config) { 

	var defaultSettings = {
		border: false,
		layout: "fit"
	};
	
	var settings = Sbi.getObjectSettings('Sbi.cockpit.editor.widget.WidgetEditorDesignerPalette', defaultSettings);
	
	var c = Ext.apply(settings, config || {});
	Ext.apply(this, c);

	c = this.initPanel();
	Sbi.cockpit.editor.widget.WidgetEditorDesignerPalette.superclass.constructor.call(this, c);	 		

};

Ext.extend(Sbi.cockpit.editor.widget.WidgetEditorDesignerPalette, Ext.Panel, {
	
	initPanel:function(){

		var store = new Ext.data.ArrayStore({
			fields: ['type', 'name', 'description', 'icon'],
			data   : this.getAvailablePallettes()
		});

		this.tpl = new Ext.Template(
				'<tpl for=".">',

				'<div  style="float: left; clear: left; padding-bottom: 10px;">',
					'<div style="float: left;"><img src="{3}" title="{1}" width="40"></div>',
					'<div style="float: left; padding-top:10px; padding-left:10px;">{1}</div>',
				'</div>',
	
				'</tpl>'
		);
		this.tpl.compile();
	    var fieldColumn = new Ext.grid.Column({
	    	width: 300
	    	, dataIndex: 'name'
	    	, hideable: false
	    	, hidden: false	
	    	, sortable: false
	   	    , renderer : function(value, metaData, record, rowIndex, colIndex, store){
	        	return this.tpl.apply(	
	        			[record.json.type, record.json.name
	        			 , record.json.description, record.json.icon]	
	        	);
	    	}
	        , scope: this
	    });
	    this.cm = new Ext.grid.ColumnModel([fieldColumn]);

		var conf = {
			title : 'Visualization',
			autoScroll : true,
			border : false,
			items : [ new Ext.Panel({
					//height : 342,
					layout: "fit",
					border : false,
					style : 'padding-top: 0px; padding-left: 0px',
					items : [ new Ext.grid.GridPanel({
						ddGroup : 'paleteDDGroup',
						type : 'palette',
						header : false,
						hideHeaders : true,
						enableDragDrop : true,
						cm : this.cm,
						store : store,
						autoHeight : true
					}) ]
				}) ]
		};
	    
		return conf;

	},
	
	
	getAvailablePallettes:function(){
		Sbi.trace("[WidgetEditorDesignerPalette.getAvailablePallettes]: IN");
		
		var pallette = new Array();
		
		Sbi.cockpit.core.WidgetExtensionPointManager.forEachWidget(function(wtype, wdescriptor) {
			pallette.push({
				type: wtype
				, name: wdescriptor.name
				, description:wdescriptor.description
				, icon: wdescriptor.icon
			});
		}, this);
		
		//alert("Palete length: " + pallette.length);
		
//		var widgetDescriptors = Sbi.cockpit.core.WidgetExtensionPoint.getWidgetDescriptors();
//		for(var i = 0; i < widgetDescriptors.length; i++) {
//			pallette.push({
//				type: 
//				, name: widgetDescriptors[i].name
//				, description: widgetDescriptors[i].description
//				, icon: widgetDescriptors[i].icon
//			});
//			Sbi.debug("[WidgetEditorDesignerPalette.getAvailablePallettes]: added widget [" + widgetDescriptors[i].name + "] to the palette");
//		}
//		pallette.push({name: 'Bar Chart', url:'img/widgets/palette_bar_chart.png'});
//		pallette.push({name: 'Pie Chart', url:'img/widgets/palette_pie_chart.png'});
//		pallette.push({name: 'Line Chart', url:'img/widgets/palette_line_chart.png'});
//		pallette.push({name: 'Table', url:'img/widgets/palette_table.png'});
//		pallette.push({name: 'Pivot Table', url:'img/widgets/palette_crosstab.png'});	
//		pallette.push({name: 'Static Pivot Table', url:'img/widgets/palette_crosstab.png'});
		
		Sbi.trace("[WidgetEditorDesignerPalette.getAvailablePallettes]: IN");
		
		return pallette;
	}

	
});