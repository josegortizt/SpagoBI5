/** SpagoBI, the Open Source Business Intelligence suite

 * Copyright (C) 2012 Engineering Ingegneria Informatica S.p.A. - SpagoBI Competency Center
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0, without the "Incompatible With Secondary Licenses" notice. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. **/
 
Ext.ns("Sbi.cockpit.widgets.extjs.barchart");

Sbi.cockpit.widgets.extjs.barchart.BarChartWidgetRuntime = function(config) {	
	Sbi.trace("[BarChartWidgetRuntime.constructor]: IN");
	
	var defaultSettings = {
			
	};
	
	var settings = Sbi.getObjectSettings('Sbi.cockpit.widgets.extjs.barchart.BarChartWidgetRuntime', defaultSettings);
	var c = Ext.apply(settings, config || {});
	Ext.apply(this, c);
	
	var categories = [];
	categories.push(this.wconf.category);
	if(this.wconf.groupingVariable) categories.push(this.wconf.groupingVariable);
	
	this.aggregations = {
		measures: this.wconf.series,
		categories: categories
	};
	
	Sbi.cockpit.widgets.extjs.barchart.BarChartWidgetRuntime.superclass.constructor.call(this, c);
	
	this.boundStore();
	this.reload();
	this.addEvents('selection');
	
	Sbi.trace("[BarChartWidgetRuntime.constructor]: OUT");

};

/**
 * @cfg {Object} config
 * ...
 */
Ext.extend(Sbi.cockpit.widgets.extjs.barchart.BarChartWidgetRuntime, Sbi.cockpit.widgets.extjs.abstractchart.AbstractChartWidgetRuntime, {
	// =================================================================================================================
	// PROPERTIES
	// =================================================================================================================
	
	// no props for the moment

	
    // =================================================================================================================
	// METHODS
	// =================================================================================================================
	
	// -----------------------------------------------------------------------------------------------------------------
	// cartesian chart shared methods
	// -----------------------------------------------------------------------------------------------------------------  
	getSeriesConfig: function() {
	    	
		var store = this.getStore();
	    	
	    var seriesFields = [];
		var seriesTitles = [];
		for(var i = 0; i < this.wconf.series.length; i++) {
			var id = this.wconf.series[i].alias;
			seriesFields.push(store.fieldsMeta[id].name);
			seriesTitles.push(id);
		}
			
		var series = {
			fields: seriesFields,
			titles: seriesTitles,
			position: this.isHorizontallyOriented()? 'bottom' : 'left'
		};
			
		return series;
	}
	    
	, getCategoriesConfig: function() {
	    	
	    	var store = this.getStore();
	    	
	    	var categories = [];
			categories.push(this.wconf.category);
			if(this.wconf.groupingVariable) categories.push(this.wconf.groupingVariable);
			
			var categoriesFields = [];
			var categoriesTitles = [];
			for(var i = 0; i < categories.length; i++) {
				var id = categories[i].alias;
				categoriesFields.push(store.fieldsMeta[id].name);
				categoriesTitles.push(id);
			}
			
			var categories = {
				fields: categoriesFields,
				titles: categoriesTitles, 
				position: this.isHorizontallyOriented()? 'left': 'bottom'
			};
			
			return categories;
	}
	
	, getOrientation: function() {
		return this.wconf? this.wconf.orientation: null;
	}

	, isVerticallyOriented: function() {
		return this.getOrientation() === 'vertical';
	}
	
	, isHorizontallyOriented: function() {
		return this.getOrientation() === 'horizontal';
	}
	
    // -----------------------------------------------------------------------------------------------------------------
    // public methods
	// -----------------------------------------------------------------------------------------------------------------

	
	
	, getChartType: function() {
		return this.isHorizontallyOriented()? 'bar': 'column';
	}
	
	, isStacked: function() {
		return (this.wconf.type == 'stacked-barchart' || this.wconf.type == 'percent-stacked-barchart');
	}
	
	, isPercentStacked: function() {
		return this.wconf.type == 'percent-stacked-barchart';
	}
  
    , refresh:  function() {  
    	Sbi.trace("[BarChartWidgetRuntime.refresh]: IN");
    	
    	Sbi.cockpit.widgets.extjs.barchart.BarChartWidgetRuntime.superclass.refresh.call(this);	
    	
    	this.redraw();
		
    	Sbi.trace("[BarChartWidgetRuntime.refresh]: OUT");
	}
    
	, redraw: function () {
		Sbi.trace("[BarChartWidgetRuntime.redraw]: IN");
		
		Sbi.cockpit.widgets.extjs.barchart.BarChartWidgetRuntime.superclass.redraw.call(this);	

		var seriresConfig = this.getSeriesConfig();
		var categoriesConfig =  this.getCategoriesConfig();
		
		var axes = this.getAxes( categoriesConfig, seriresConfig );
		var series = this.getSeries( categoriesConfig, seriresConfig );
		
		var store = this.getStore();
			
		
		if(this.isPercentStacked()) {
			var data = [];
			if(categoriesConfig.fields.length == 1) {
				var fields = [];
				for(var h in store.fieldsMeta) {
					fields.push(store.fieldsMeta[h].name);
				}
				var newStore =  new Ext.data.JsonStore({
			        fields:fields,
			        data: store.data
			    });
				//store = newStore;
				alert("Impossible to create a percet stacked bar chart");
			} else {
				alert("Impossible to create a percet stacked bar chart with more then on category");
			}
		}
		store.sort(categoriesConfig.fields[0], 'ASC');
		
		this.chartPanel =  Ext.create('Ext.chart.Chart', {
            store: store,
            axes: axes,
            series: series,
            shadow: true,
            animate: true,
            theme: 'CustomBlue',
            background: this.getBackground(),
	        legend: this.isLegendVisible()
        });
		
		this.setContentPanel(this.chartPanel);
        
		Sbi.trace("[BarChartWidgetRuntime.redraw]: OUT");
	}
		
	, getBackground: function() {
		var background = {
		    gradient: {
			    id: 'backgroundGradient',
			    angle: 45,
			    stops: {
				    0: {color: '#ffffff'},
				    100: {color: '#eaf1f8'}
				}
			}
		};
		return background;
	}
	
	, getAxes: function( categoriesConfig, seriesConfig ) {
				
		var seriesAxis = {
		    type: 'Numeric'
		    , position: seriesConfig.position
		    , fields: seriesConfig.fields
		    , minorTickSteps: 1 // The number of small ticks between two major ticks. Default is zero.
		    , label: {
		    	renderer: Ext.util.Format.numberRenderer('0,0')
		    }
			, title: seriesConfig.titles.length == 1? seriesConfig.titles[0]: undefined
		   	, grid: true
		    , minimum: 0
		};
		
		//For the percent type chart set the axes scale maximum to 100
		if(this.isPercentStacked()) {
			seriesAxis.maximum = 100;
		}
		
		var categoryAxis = {
		    type: 'Category'
		    , position: categoriesConfig.position
		    , fields: categoriesConfig.fields
		    , title: categoriesConfig.titles.length == 1? categoriesConfig.titles[0]: undefined       
	    };

		var axes = [seriesAxis, categoryAxis];
		
		return axes;
	}
	
	, getSeries: function( categoriesConfig, seriesConfig ) {
		
		Sbi.trace("[BarChartWidgetRuntime.getSeries]: IN");
		
		var series = [{
			type: this.getChartType(), 
			stacked: this.isStacked(),
			title: seriesConfig.titles,
            highlight: {
            	size: 7,
                radius: 7
            },
            axis: seriesConfig.position,  
            smooth: true,
            tips: this.getSeriesTips(seriesConfig),
            label: this.getSeriesLabel(seriesConfig),
            xField: categoriesConfig.fields,
            yField: seriesConfig.fields,
            listeners: {
    	    	itemmousedown: this.onItemMouseDown,
    	    	scope: this
    	    }
        }];
		
		Sbi.trace("[BarChartWidgetRuntime.getSeries]: OUT");
		
		return series;
	}
	
	, getSeriesTips: function(series) {
		var thisPanel = this;
		
		var tips =  {
			trackMouse: true,
           	minWidth: 140,
           	maxWidth: 300,
           	width: 'auto',
           	minHeight: 28,
           	renderer: function(storeItem, item) {
           		var tooltipContent = thisPanel.getTooltip(storeItem, item);
           		this.setTitle(tooltipContent);
            }
        };
		
		return tips;
	}
	
	, getSeriesLabel: function(seriesConfig) {
		var label = {
            display: 'insideEnd',
            field: seriesConfig.titles.length == 1? seriesConfig.titles[0]: undefined,
            renderer: Ext.util.Format.numberRenderer('0'),
            orientation: 'horizontal',
            color: '#333',
            'text-anchor': 'middle'
		};
		return label;
	}
	
	, getFieldMetaByName: function(fieldName) {
		var store = this.getStore();
		var fieldsMeta = store.fieldsMeta;
    	for(var h in fieldsMeta) {
    		var fieldMeta = fieldsMeta[h];
    		if(fieldMeta.name == fieldName) {
    			return fieldMeta;
    		}
    	}
    	return null;
	}
	
	, getFieldHeaderByName: function(fieldName) {
		var fieldMeta = this.getFieldMetaByName(fieldName);
		Sbi.trace("[BarChartWidgetRuntime.getFieldHeaderByName]: " + Sbi.toSource(fieldMeta));
		return fieldMeta!=null?fieldMeta.header: null;
	}
	
	, getItemMeta: function(item) {
		var itemMeta = {};
		
		Sbi.trace("[BarChartWidgetRuntime.getItemMeta]: IN " + Sbi.toSource(item, true));
		
		// selected categories: names, headers & values
		itemMeta.categoryFieldNames = item.series.xField;
		Sbi.trace("[BarChartWidgetRuntime.getItemMeta]: selected categories names are equal to [" + itemMeta.categoryFieldNames +"]");
		
		itemMeta.categoryFieldHeaders = [];
		for(var i = 0; i < itemMeta.categoryFieldNames.length; i++) {
			itemMeta.categoryFieldHeaders[i] = this.getFieldHeaderByName( itemMeta.categoryFieldNames[i] );
		}
		Sbi.trace("[BarChartWidgetRuntime.getItemMeta]: selected categories headers are equal to [" + itemMeta.categoryFieldHeaders +"]");
		
		itemMeta.categoryValues = [];
		for(var i = 0; i < itemMeta.categoryFieldNames.length; i++) {
			itemMeta.categoryValues.push( item.storeItem.data[itemMeta.categoryFieldNames[i]] );	
		}
		Sbi.trace("[BarChartWidgetRuntime.getItemMeta]: selected categories values are equal to [" + itemMeta.categoryValues +"]");
	
		// selected series: name, header & value
		itemMeta.seriesFieldName = item.yField;
		Sbi.trace("[BarChartWidgetRuntime.getItemMeta]: selected series name is equal to [" + itemMeta.seriesFieldName +"]");
		
		itemMeta.seriesFieldHeader = this.getFieldHeaderByName(itemMeta.seriesFieldName);
		Sbi.trace("[BarChartWidgetRuntime.getItemMeta]: selected series header is equal to [" + itemMeta.seriesFieldHeader +"]");
		
		itemMeta.seriesFieldValue = item.storeItem.data[itemMeta.seriesFieldName];	 
		Sbi.trace("[BarChartWidgetRuntime.getItemMeta]: selected series value is equal to [" + itemMeta.seriesFieldValue +"]");
 
    	
		Sbi.trace("[BarChartWidgetRuntime.getItemMeta]: OUT");
		
		return itemMeta;
	}
	
	, onItemMouseDown: function(item) {
		Sbi.trace("[BarChartWidgetRuntime.onItemMouseDown]: IN");
		var itemMeta = this.getItemMeta(item);
	    var selections = {};
		selections[itemMeta.categoryFieldHeaders[0]] = {values: []};
	    Ext.Array.include(selections[itemMeta.categoryFieldHeaders].values, itemMeta.categoryValues[0]);
	    this.fireEvent('selection', this, selections);
	    Sbi.trace("[BarChartWidgetRuntime.onItemMouseDown]: OUT");
	}
	
	// -----------------------------------------------------------------------------------------------------------------
    // private methods
	// -----------------------------------------------------------------------------------------------------------------

	, getTooltip : function(storeItem, item){
		
		Sbi.trace("[BarChartWidgetRuntime.getTooltip]: IN");
		
		var tooltip;
		
		if (this.wconf.groupingVariable != null) { // first level contains groupingVariable, second level contains series
			
		} else {
			var itemMeta = this.getItemMeta(item);
			tooltip =  itemMeta.seriesFieldHeader + ': ' + itemMeta.seriesFieldValue 
						+ " <p> " + itemMeta.categoryFieldHeaders;
		}
		
		return tooltip;
        
		
		var chartType = this.wconf.designer;
		var allRuntimeSeries = this.getRuntimeSeries();
		var allDesignSeries = this.wconf.series;
		var type = this.wconf.type;
		var colors = this.getColors();
		var series;
		
		var storeObject = this.getJsonStore(percent);
		
		var selectedSerieName = item.yField;
		
		var selectedSerie;
		
		if(this.isHorizontallyOriented()){
			series = this.getChartSeries(storeObject.serieNames, colors, true);
			for (var i =0; i<series.length;i++){
				if (series[i].xField == selectedSerieName){
					selectedSerie = series[i];
					break;
				}
			}

		}else{
			series = this.getChartSeries(storeObject.serieNames, colors);
			
			for (var i =0; i<series.length;i++){
				if (series[i].yField == selectedSerieName){
					selectedSerie = series[i];
					break;
				}
			}
		}

		
		var valueObj = this.getFormattedValue(null, storeItem, selectedSerie, chartType, allRuntimeSeries, allDesignSeries, type, this.isHorizontallyOriented());
		
		if (valueObj.measureName !== valueObj.serieName) {
			tooltip = valueObj.serieName + '<br/>' + storeItem.data.categories + '<br/>';
			// in case the serie name is different from the measure name, put also the measure name
			//tooltip += this.formatTextWithMeasureScaleFactor(valueObj.measureName, valueObj.measureName) + ' : ';
		} else {
			tooltip =  storeItem.data.categories + '<br/>' + selectedSerie.displayName + ' : ' ;
		}
		tooltip += valueObj.value;
		
		Sbi.trace("[BarChartWidgetRuntime.getTooltip]: OUT");
		
		return tooltip;
	}
	
	/**
	 * @method
	 * 
	 * ???
	 */
	, getRuntimeSeries : function () {
		var toReturn = [];
		// rows (of dataContainerObject) can contain 2 level, it depends if a groupingVariable was defined or not
		if (this.wconf.groupingVariable != null) { // first level contains groupingVariable, second level contains series
			
//			var groupingAttributeValues = this.dataContainerObject.rows.node_childs;
//			for(var i = 0; i < groupingAttributeValues.length; i++) {
//				var measureNodes = groupingAttributeValues[i].node_childs;
//				for(var j = 0; j < measureNodes.length; j++) {
//					toReturn.push({
//						name : groupingAttributeValues[i].node_description + 
//								( measureNodes.length > 1 ? ' [' + measureNodes[j].node_description + ']' : '' )
//						, measure : measureNodes[j].node_description
//					});
//				}
//			}
			
			alert("getRuntimeSeries method is unable to manage groupingVariable");
			
		} else { // no grouping variable: series are just first level nodes
			
			var measureNodes = this.dataContainerObject.rows.node_childs;
			for(var i = 0; i < measureNodes.length; i++) {
				toReturn.push({
					name : measureNodes[i].node_description
					, measure : measureNodes[i].node_description
				});
			}
		}
		return toReturn;
	}
	
	//used for tooltip	
	, getFormattedValue: function (chart, record, series, chartType, allRuntimeSeries, allDesignSeries, type){
		var theSerieName  = series.displayName;
		var value ;
		var serieName;  // the serie name without eventual scale factor
		var measureName;  // the measure related to the serie
		var serieDefinition;  // the design-time serie definition (the measure with precision, color, ....)

		if(type != 'percent-stacked-barchart'){
			if(this.isHorizontallyOriented()){
				value =  record.data[series.xField];
			}else{
				value = record.data[series.yField];
			}
		}else{
			//value = Ext.util.Format.number(record.data[series.xField], '0.00');
			if(this.isHorizontallyOriented()){
				value = record.data['seriesflatvalue'+series.xField.substring(series.xField.length-1)];		        
			}else{
				value = record.data['seriesflatvalue'+series.yField.substring(series.yField.length-1)];
			}
		}
		
		// find the measure's name
		var i = 0;
		for (; i < allRuntimeSeries.length; i++) {
			//substring to remove the scale factor
			if (allRuntimeSeries[i].name === theSerieName.substring(0, allRuntimeSeries[i].name.length)) {
				serieName = allRuntimeSeries[i].name;
				measureName = allRuntimeSeries[i].measure;
				break;
			}
		}
		
		i = 0;
		// find the serie's (design-time) definition
		for (; i < allDesignSeries.length; i++) {
			if (allDesignSeries[i].id === measureName) {
				serieDefinition = allDesignSeries[i];
				break;
			}
		}

		// format the value according to serie configuration
		value = Sbi.commons.Format.number(value, {
    		decimalSeparator: Sbi.locale.formats['float'].decimalSeparator,
    		decimalPrecision: serieDefinition.precision,
    		groupingSeparator: (serieDefinition.showcomma) ? Sbi.locale.formats['float'].groupingSeparator : '',
    		groupingSize: 3,
    		currencySymbol: '',
    		nullValue: ''
		});
			
		// add suffix
		if (serieDefinition.suffix !== undefined && serieDefinition.suffix !== null && serieDefinition.suffix !== '') {
			value = value + ' ' + serieDefinition.suffix;
		}

		var toReturn = {};
		toReturn.value = value;
		toReturn.serieName = serieName;
		toReturn.measureName = measureName;
		return toReturn;
	}
	
	
	//------------------------------------------------------------------------------------------------------------------
	// utility methods
	// -----------------------------------------------------------------------------------------------------------------
	, onRender: function(ct, position) {	
		Sbi.trace("[BarChartWidgetRuntime.onRender]: IN");
		
		this.msg = 'Sono un widget di tipo BarChart';
		
		Sbi.cockpit.widgets.extjs.barchart.BarChartWidgetRuntime.superclass.onRender.call(this, ct, position);	
		
		Sbi.trace("[BarChartWidgetRuntime.onRender]: OUT");
	}
});

Sbi.registerWidget('barchart-ext', {
	name: 'Bar Chart (NEW)'
	, icon: 'js/src/ext4/sbi/cockpit/widgets/extjs/barchart/img/barchart_64x64_ico.png'
	, runtimeClass: 'Sbi.cockpit.widgets.extjs.barchart.BarChartWidgetRuntime'
	, designerClass: 'Sbi.cockpit.widgets.barchart.BarChartWidgetDesigner'
	//, designerClass: 'Ext.Panel'
});
