/** SpagoBI, the Open Source Business Intelligence suite

 * Copyright (C) 2012 Engineering Ingegneria Informatica S.p.A. - SpagoBI Competency Center
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0, without the "Incompatible With Secondary Licenses" notice. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. **/

Ext.ns("Sbi.cockpit.widgets.table");

Sbi.cockpit.widgets.table.TableWidget = function(config) {	
	Sbi.trace("[TableWidget.constructor]: IN");
	
	var defaultSettings = {
		displayInfo: false,
		pageSize: 50,
		sortable: true,
		//sortMode: 'local', // remote | local | auto
		layout: 'fit',
		timeout: 300000,
		split: true,
		collapsible: false,
		padding: '0 0 0 0',
		autoScroll: false,
		frame: false, 
		border: false,		
		gridConfig: {
			height: 400,
			clicksToEdit:1,
		    frame: false,
		    border:false,
		    autoScroll: true,
		    collapsible: false,
		    loadMask: true,		    
		    viewConfig: {
		    	forceFit:false,
		        autoFill: true,
		        enableRowBody:true,
		        showPreview:true
		    },
		    layout: "fit"
		},
		queryLimit: {
			maxRecords: 1000
			, isBlocking: false
		}
	};
			
	var settings = Sbi.getObjectSettings('Sbi.cockpit.widgets.table.TableWidget', defaultSettings);
	var c = Ext.apply(settings, config || {});
	Ext.apply(this, c);
	
	this.initServices();
	this.init();
	
	this.addEvents('contentloaded');
	
	c = Ext.apply(c, {
		items: [this.grid]
	});

	
	Sbi.cockpit.widgets.table.TableWidget.superclass.constructor.call(this, c);
	
	this.on("afterRender", function(){
		this.reload();
		Sbi.trace("[TableWidget.onRender]: store loaded");
	}, this);

	this.addEvents('selection');
	
	Sbi.trace("[TableWidget.constructor]: OUT");
};

/**
 * @cfg {Object} config
 * ...
 */
Ext.extend(Sbi.cockpit.widgets.table.TableWidget, Sbi.cockpit.core.WidgetRuntime, {
    
	// =================================================================================================================
	// PROPERTIES
	// =================================================================================================================
	
	/**
     * @property {Array} services
     * This array contains all the services invoked by this class
     */
	services: null
	
	, grid: null
	, enablePaging: false
	, enableExport: false
	, fireSelectionEvent: true
    
    // =================================================================================================================
	// METHODS
	// =================================================================================================================
	
    // -----------------------------------------------------------------------------------------------------------------
    // public methods
	// -----------------------------------------------------------------------------------------------------------------
    
	, boundStore: function() {
		Sbi.trace("[TableWidget.boundStore]: IN");		
		Sbi.cockpit.widgets.table.TableWidget.superclass.boundStore.call(this);
		
		if(this.grid !== null) { // only if the grid has been already initialized reconfigure it properly
			Sbi.trace("[TableWidget.boundStore]: reconfiguring the grid...");
			var columns = this.initColumns();
			this.grid.reconfigure(this.getStore(), columns);
			Sbi.trace("[TableWidget.boundStore]: the grid has been reconfigured succesfully");
		} else {
			Sbi.trace("[TableWidget.boundStore]: the grid is not yet initialized.");
		}
		                   		
		Sbi.trace("[TableWidget.boundStore]: OUT");
	}

	, refresh:  function() {  
		Sbi.trace("[TableWidget.refresh]: IN");
		Sbi.cockpit.widgets.table.TableWidget.superclass.refresh.call(this);	
		Sbi.trace("[TableWidget.refresh]: OUT");
	}
	
	, redraw: function() {
		Sbi.trace("[TableWidget.refresh]: IN");
		Sbi.cockpit.widgets.table.TableWidget.superclass.redraw.call(this);	
		this.doLayout();
		Sbi.trace("[TableWidget.refresh]: OUT");
	}
	
	

	// -----------------------------------------------------------------------------------------------------------------
    // private methods
	// -----------------------------------------------------------------------------------------------------------------

	//------------------------------------------------------------------------------------------------------------------
	// utility methods
	// -----------------------------------------------------------------------------------------------------------------
	, onRender: function(ct, position) {	
		Sbi.trace("[TableWidget.onRender][" + this.getId() + "]: IN");
	
		this.msg = 'Sono un widget di tipo TABLE';
		
		Sbi.cockpit.widgets.table.TableWidget.superclass.onRender.call(this, ct, position);	
		
		Sbi.trace("[TableWidget.onRender][" + this.getId() + "]: OUT");
	}
	
	, onStoreMetaChange: function(store, meta) {
		Sbi.trace("[TableWidget.onStoreMetaChange][" + this.getId() + "]: IN");	
		
		Sbi.cockpit.widgets.table.TableWidget.superclass.onStoreMetaChange.call(this, store, meta);	
		
		var fields = new Array();
		
		var columns = [];
				
		for(var j = 0; j < this.wconf.visibleselectfields.length; j++) {			
			for(var i = 0; i < meta.fields.length; i++) {
				if(meta.fields[i].header === this.wconf.visibleselectfields[j].id) {
					this.applyRendererOnField(meta.fields[i]);
					this.applySortableOnField(meta.fields[i]);					
					
					if (this.wconf.visibleselectfields[j].width) {
						meta.fields[i].width = this.wconf.visibleselectfields[j].width; 
					}
					
					fields.push(meta.fields[i]);
					columns.push(meta.fields[i].header);
					break;
				} else {
					Sbi.trace("[TableWidget.onStoreMetaChange]: field [" + this.wconf.visibleselectfields[j].id + "] is not equal to [" + meta.fields[i].header + "]");	
				}
			}
		}
		Sbi.trace("[TableWidget.onStoreMetaChange]: visible fields are [" + columns.join(",") + "]");		
		
		this.grid.reconfigure(this.getStore(), fields);
		
		Sbi.trace("[TableWidget.onStoreMetaChange][" + this.getId() + "]: OUT");	
	}
	
	, onDataChanged: function(store, eOpts) {
		Sbi.trace("[TableWidget.onDataChanged][" + this.getId() + "]: IN");
		this.fireSelectionEvent = false;
		Sbi.trace("[TableWidget.onDataChanged][" + this.getId() + "]: OUT");
	}
	
	, onStoreLoad: function() {
		Sbi.trace("[TableWidget.onStoreLoad][" + this.getId() + "]: IN");
		Sbi.cockpit.widgets.table.TableWidget.superclass.onStoreLoad.call(this, this.getStore());	
     	this.refreshWarningMessage();
     	Sbi.trace("[TableWidget.onStoreLoad]: OUT");		
	}
	
	, onAfterLayout: function() {
		Sbi.trace("[TableWidget.onAfterLayout][" + this.getId() + "]: IN");
		var selections = this.getWidgetManager().getWidgetSelections(this.getId());
		// TODO: reselect rows in a selective way
		this.fireSelectionEvent = true;
		Sbi.trace("[TableWidget.onAfterLayout][" + this.getId() + "]: OUT");
	}
	
		
	, refreshWarningMessage: function() {
		if(this.enablePaging === false) return;
		
		var recordsNumber = this.getStore().getTotalCount();
		
		if (this.queryLimit.maxRecords !== undefined && recordsNumber > this.queryLimit.maxRecords) {
     		if (this.queryLimit.isBlocking) {
     			Sbi.exception.ExceptionHandler.showErrorMessage(this.warningMessageItem, LN('sbi.qbe.messagewin.error.title'));
     		} else {
     			this.warningMessageItem.show();
     		}
     	} else {
     		this.warningMessageItem.hide();
     	}
	}
	
	, applyRendererOnField: function(field) {
		Sbi.trace("[TableWidget.applyRendererOnField]: IN");	
		if(field.type) {
			var t = field.type;
			if (field.format) { // format is applied only to numbers
				var format = Sbi.commons.Format.getFormatFromJavaPattern(field.format);
				var formatDataSet = field.format;
				if((typeof formatDataSet == "string") || (typeof formatDataSet == "String")){
					try {
						formatDataSet =  Ext.decode(field.format);
					} catch(e) {
						formatDataSet = field.format;
					}
				}
				var f = Ext.apply( {}, Sbi.locale.formats[t]);
				f = Ext.apply( f, formatDataSet);
	
				numberFormatterFunction = Sbi.qbe.commons.Format.numberRenderer(f);
			} else {
				numberFormatterFunction = Sbi.locale.formatters[t];
			}	
			
			if (field.measureScaleFactor && (t === 'float' || t ==='int')) { // format is applied only to numbers
			   this.applyScaleRendererOnField(numberFormatterFunction,field);
			} else {
			   field.renderer = numberFormatterFunction;
			}
		}
		
		if(field.subtype && field.subtype === 'html') {
		   field.renderer  =  Sbi.locale.formatters['html'];
		}
		
		if(field.subtype && field.subtype === 'timestamp') {
		   field.renderer  =  Sbi.locale.formatters['timestamp'];
		}
		
		Sbi.trace("[TableWidget.applyRendererOnField]: OUT");	
	}
	
	, applyScaleRendererOnField: function(numberFormatterFunction, field) {
		
		Sbi.trace("[TableWidget.applyScaleRendererOnField]: IN");	
		
		var scaleFactor = field.measureScaleFactor;
		
		if(scaleFactor!=null && scaleFactor!=null && scaleFactor!='NONE'){
			var scaleFactorNumber;
			switch (scaleFactor){
				case 'K':
					scaleFactorNumber=1000;
					break;
				case 'M':
					scaleFactorNumber=1000000;
					break;
				case 'G':
					scaleFactorNumber=1000000000;
					break;
				default:
					scaleFactorNumber=1;
			}
		
			field.renderer = function(v){
				 var scaledValue = v/scaleFactorNumber;
				 return numberFormatterFunction.call(this,scaledValue);	
			};
			
			field.header = field.header +' '+ LN('sbi.worksheet.config.options.measurepresentation.'+scaleFactor);
		} else {
			field.renderer =numberFormatterFunction;
		}
		
		Sbi.trace("[TableWidget.applyScaleRendererOnField]: OUT");	
	}
	
	, applySortableOnField: function(field) {
		Sbi.trace("[TableWidget.applySortableOnField]: IN");	
		if(this.sortable === false) {
		   field.sortable = false;
		} else {
		   if(field.sortable === undefined) { // keep server value if defined
			   field.sortable = true;
		   }
		}
		Sbi.trace("[TableWidget.applySortableOnField]: OUT");	
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
		this.services = this.services || new Array();	
	}

	/**
	 * @method 
	 * 
	 * Initialize the GUI
	 */
	, init: function() {
		Sbi.trace("[TableWidget.init]: IN");
		this.boundStore();
		this.initGridPanel();
		Sbi.trace("[TableWidget.init]: OUT");
	}
	
	/**
	 * @method 
	 * 
	 * Initialize the grid
	 */
	, initGridPanel: function() {
		Sbi.trace("[TableWidget.initGridPanel]: IN");
		
		var columns = this.initColumns();

		var gridConf = {
			store: this.getStore(),
		    columns: columns,
//		    sm : new Ext.grid.RowSelectionModel( {
//				singleSelect : true
//			})
		    selModel: {selType: 'rowmodel', mode: 'MULTI', allowDeselect: true}	    
		};
		if(this.enableExport === true) {
			this.initExportToolbar();
			gridConf.tbar=this.exportTBar;
		}
		if(this.enablePaging === true) {
			this.initFilteringToolbar();
			gridConf.bbar=this.pagingTBar;
		}
		if(this.gridConfig!=null){
			gridConf = Ext.apply(gridConf, this.gridConfig);
		}
		
		// create the Grid
	    this.grid = new Ext.grid.GridPanel(gridConf);   
	    this.grid.on('selectionchange', this.onSelectionChange, this);
	    this.grid.on('columnresize', this.onColumnResize, this);
	    this.grid.on('columnmove', this.onColumnMove, this);
	    this.grid.on('afterlayout', this.onAfterLayout, this);
	    
	    Sbi.trace("[TableWidget.initGridPanel]: OUT");
	}
	
	, onColumnResize: function (ct, column, width, eOpts){		
		this.wconf.visibleselectfields[column.getIndex()].width = column.width;
	}
	
	, onColumnMove: function (ct, column, fromIdx, toIdx, eOpts){
		Sbi.trace("[TableWidget.onColumnMove]: IN");			
		
		Sbi.trace("[TableWidget.onColumnMove]: fromIdx= " + fromIdx + " - toIdx= " + toIdx);
		
		var toIndex = toIdx;
		
		/* 
		 * Moving a column forward, columnresize method count also the moving column itself
		 * so the right toIndex base 0 is (toIdx - 1)
		 */
		if (fromIdx < toIdx){
			toIndex = toIdx - 1;
		}					
		
		var columnArray = this.wconf.visibleselectfields;		
		var mixedArray = [];
		
		Sbi.trace("[TableWidget.onColumnMove]: ColumnArray " + Sbi.toSource(columnArray));			
		
		Ext.each(columnArray, function (val,index){
			if (index == toIndex){
				/* Perform the move of the selected column */ 
				Sbi.trace("[TableWidget.onColumnMove]: index(" + index + ") equals toIdx - pushing " + columnArray[fromIdx].id);
								
				mixedArray.push(columnArray[fromIdx]);	
				
			} else if (index == fromIdx) {
				Sbi.trace("[TableWidget.onColumnMove]: index(" + index + ") equals fromIdx");
				
				if (fromIdx > toIdx){
					/* Column have been pushed to the right */
					Sbi.trace("[TableWidget.onColumnMove]: fromIdx > toIdx - pushing " + columnArray[index - 1].id);
					mixedArray.push(columnArray[index - 1]);
				} else {
					/* Column have been pushed to the left */
					Sbi.trace("[TableWidget.onColumnMove]: fromIdx < toIdx - pushing " + columnArray[index + 1].id);
					mixedArray.push(columnArray[index + 1]);
				}	
				
			} else {								
				if ((index > toIndex) && (index < fromIdx)){
					/* Column between a move from right to left */
					Sbi.trace("[TableWidget.onColumnMove]: " + index + "=" + index + " ( index > toIdx) - pushing " + columnArray[index - 1].id);
					mixedArray.push(columnArray[index - 1]);
				} else if ((index < toIndex) && (index > fromIdx)){
					/* Column between a move from left to right */
					Sbi.trace("[TableWidget.onColumnMove]: " + index + "=" + index + " ( index < toIdx) - pushing " + columnArray[index + 1].id);
					mixedArray.push(columnArray[index + 1]);
				} else {
					/* Column not influenced by the move */
					Sbi.trace("[TableWidget.onColumnMove]: " + index + "=" + index + " - pushing " + columnArray[index].id);
					mixedArray.push(columnArray[index]);
				}																			
			}
		});			
		
		this.wconf.visibleselectfields = mixedArray;
		
		Sbi.trace("[TableWidget.onColumnMove]: MixedArray " + Sbi.toSource(mixedArray));
		
		Sbi.trace("[TableWidget.onColumnMove]: OUT");
	}
	
	, onSelectionChange: function( sm,selected,opt){
		
		if(this.fireSelectionEvent === false) {
			//alert("onSelectionChange disabled");
			return; 
		} else {
			//alert("onSelectionChange enabled");
		}
        var records = sm.getSelection();
        
        var selections = {};
        
        for (var i=0; i< records.length; i++){
    		var s = this.extractSelectionsFromRecord(records[i]);
    		for(var fieldHeader in s) {
    			selections[fieldHeader] = selections[fieldHeader] || {values: []};
    			// Push the selected value into the selections only if the selection doesn't contain it yet
    			Ext.Array.include(selections[fieldHeader].values, s[fieldHeader]);
    		}
        }
		this.fireEvent('selection', this, selections);
	} 
	
	, extractSelectionsFromRecord: function(record) {
    	var selections = {};
    	
    	var meta = Sbi.storeManager.getRecordMeta(record);
    	
    	var fields = record.data;
    	
    	for (fieldName in fields){    			    	    	
    		if (fieldName === 'id' || fieldName === 'recNo') continue;
    		
    		var fieldHeader = Sbi.storeManager.getFieldHeaderByName(meta, fieldName);
    		var fieldValue = fields[fieldName];
    		
    		selections[fieldHeader] = fieldValue;
    	}
    	
    	return selections;
    }
	
	, initColumns: function() {
		var columns = [
			//new Ext.grid.RowNumberer(),
			{
				header: "Data",
	   			dataIndex: 'data',
	   			width: 75	   			
	   		}
		];
		return columns;
	}
	
	, initExportToolbar: function() {
		this.exportTBar = new Ext.Toolbar({
			items: [
			    new Ext.Button({
		            tooltip: LN('sbi.qbe.datastorepanel.button.tt.exportto') + ' pdf',
		            iconCls:'pdf',
		            //handler: this.exportResult.createDelegate(this, ['application/pdf']),
		            handler: function(){Ext.Msg.alert('Message', 'Export to pdf');},
		            scope: this
			    }),
			    new Ext.Button({
		            tooltip:LN('sbi.qbe.datastorepanel.button.tt.exportto') + ' rtf',
		            iconCls:'rtf',
		            //handler: this.exportResult.createDelegate(this, ['application/rtf']),
		            handler: function(){Ext.Msg.alert('Message', 'Export to rtf');},
		            scope: this
			    }),
			    new Ext.Button({
		            tooltip:LN('sbi.qbe.datastorepanel.button.tt.exportto') + ' xls',
		            iconCls:'xls',
		            //handler: this.exportResult.createDelegate(this, ['application/vnd.ms-excel']),
		            handler: function(){Ext.Msg.alert('Message', 'Export to xls');},
		            scope: this
			    }),
			    new Ext.Button({
		            tooltip:LN('sbi.qbe.datastorepanel.button.tt.exportto') + ' csv',
		            iconCls:'csv',
		            //handler: this.exportResult.createDelegate(this, ['text/csv']),
		            handler: function(){Ext.Msg.alert('Message', 'Export to csv');},
		            scope: this
			    }),
			    new Ext.Button({
		            tooltip:LN('sbi.qbe.datastorepanel.button.tt.exportto') + ' jrxml',
		            iconCls:'jrxml',
		            //handler: this.exportResult.createDelegate(this, ['text/jrxml']),
		            handler: function(){Ext.Msg.alert('Message', 'Export to jrxml');},
		            scope: this
			    })
			]
		});
		return this.exportTBar;
	}
	
	, initFilteringToolbar: function() {
		this.warningMessageItem = new Ext.Toolbar.TextItem('<font color="red">' 
				+ LN('sbi.qbe.datastorepanel.grid.beforeoverflow') 
				+ ' [' + this.queryLimit.maxRecords + '] '
				+ LN('sbi.qbe.datastorepanel.grid.afteroverflow') 
				+ '</font>');
		
		
		this.pagingTBar = new Ext.PagingToolbar({
            pageSize: this.pageSize,
            store: this.getStore(),
            displayInfo: this.displayInfo,
            displayMsg: LN('sbi.qbe.datastorepanel.grid.displaymsg'),
            emptyMsg: LN('sbi.qbe.datastorepanel.grid.emptymsg'),
            beforePageText: LN('sbi.qbe.datastorepanel.grid.beforepagetext'),
            afterPageText: LN('sbi.qbe.datastorepanel.grid.afterpagetext'),
            firstText: LN('sbi.qbe.datastorepanel.grid.firsttext'),
            prevText: LN('sbi.qbe.datastorepanel.grid.prevtext'),
            nextText: LN('sbi.qbe.datastorepanel.grid.nexttext'),
            lastText: LN('sbi.qbe.datastorepanel.grid.lasttext'),
            refreshText: LN('sbi.qbe.datastorepanel.grid.refreshtext')
        });
		this.pagingTBar.on('render', function() {
			this.pagingTBar.addItem(this.warningMessageItem);
			this.warningMessageItem.setVisible(false);
		}, this);
		
		return this.pagingTBar;
	}
});


Sbi.registerWidget('table', {
	name: 'Table'
	, icon: 'js/src/ext/sbi/cockpit/widgets/table/table_64x64_ico.png'
	, runtimeClass: 'Sbi.cockpit.widgets.table.TableWidget'
	, designerClass: 'Sbi.cockpit.widgets.table.TableWidgetDesigner'
	//, designerClass: 'Ext.Panel'
});