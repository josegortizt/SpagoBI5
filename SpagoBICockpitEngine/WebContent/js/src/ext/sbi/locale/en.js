/** SpagoBI, the Open Source Business Intelligence suite

 * Copyright (C) 2012 Engineering Ingegneria Informatica S.p.A. - SpagoBI Competency Center
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0, without the "Incompatible With Secondary Licenses" notice. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. **/
 
Ext.ns("Sbi.locale");

Sbi.locale.ln = Sbi.locale.ln || new Array();

Sbi.locale.formats = {
		/*
		number: {
			decimalSeparator: '.',
			decimalPrecision: 2,
			groupingSeparator: ',',
			groupingSize: 3,
			//currencySymbol: '$',
			nullValue: ''
		},
		*/
		
		float: {
			decimalSeparator: '.',
			decimalPrecision: 2,
			groupingSeparator: ',',
			groupingSize: 3,
			//currencySymbol: '$',
			nullValue: ''
		},
		int: {
			decimalSeparator: '.',
			decimalPrecision: 0,
			groupingSeparator: ',',
			groupingSize: 3,
			//currencySymbol: '$',
			nullValue: ''
		},
		
		string: {
			trim: true,
    		maxLength: null,
    		ellipsis: true,
    		changeCase: null, // null | 'capitalize' | 'uppercase' | 'lowercase'
    		//prefix: '',
    		//suffix: '',
    		nullValue: ''
		},
		
		date: {
			dateFormat: 'm/Y/d',
    		nullValue: ''
		},
		
		boolean: {
			trueSymbol: 'true',
    		falseSymbol: 'false',
    		nullValue: ''
		}
};

//=====================================================================================================
//GENERIC
//=====================================================================================================

Sbi.locale.ln['sbi.generic.author'] = 'Author';
Sbi.locale.ln['sbi.generic.creationdate'] = 'Creation date';
Sbi.locale.ln['sbi.generic.owner']= 'Autor';
Sbi.locale.ln['sbi.generic.name']= 'Name';
Sbi.locale.ln['sbi.generic.save'] = 'Save ';
Sbi.locale.ln['sbi.generic.saveAndGoBack'] = 'Save and return ';
Sbi.locale.ln['sbi.generic.cancel'] = 'Cancel';
Sbi.locale.ln['sbi.generic.resultMsg'] = 'Operation succeded';

//===================================================================
//WIZARD 
//===================================================================
Sbi.locale.ln['sbi.ds.wizard.general']= 'Save the dataset';
Sbi.locale.ln['sbi.ds.wizard.detail']= 'Load file';
Sbi.locale.ln['sbi.ds.wizard.metadata']= 'Definition data';
Sbi.locale.ln['sbi.ds.wizard.validation']= 'Validation data';
Sbi.locale.ln['sbi.ds.wizard.back']= '< Back';
Sbi.locale.ln['sbi.ds.wizard.next']= 'Next >';
Sbi.locale.ln['sbi.ds.wizard.confirm']= 'Confirm';
Sbi.locale.ln['sbi.ds.wizard.cancel']= 'Cancel';
Sbi.locale.ln['sbi.ds.wizard.close']= 'Close';
Sbi.locale.ln['sbi.ds.wizard.startMsg']= 'Select and load your file XLS or CSV ...';
Sbi.locale.ln['sbi.ds.wizard.file']= 'File';
Sbi.locale.ln['sbi.ds.wizard.successLoad']= ' loaded succesfully!'
Sbi.locale.ln['sbi.ds.wizard.selectedFile']='Selected file ';
Sbi.locale.ln['sbi.ds.wizard.loadedFile']='Loaded file ';
Sbi.locale.ln['sbi.ds.wizard.selectFile']='Select file';

Sbi.locale.ln['sbi.ds.orderComboLabel']= 'Order by...';
Sbi.locale.ln['sbi.ds.filterLabel']= 'Filter by ...';
Sbi.locale.ln['sbi.ds.moreRecent']= 'Recent';


//===================================================================
//BROWSER 
//===================================================================
Sbi.locale.ln['sbi.browser.document.searchDatasets']  = 'Search for datasets';
Sbi.locale.ln['sbi.browser.document.searchKeyword']  = 'Search by keyword...';

//===================================================================
//MYDATA 
//===================================================================
Sbi.locale.ln['sbi.mydata.useddataset'] = "Used Data Set";
Sbi.locale.ln['sbi.mydata.mydataset'] = "My Data Set";
Sbi.locale.ln['sbi.mydata.enterprisedataset'] = "Enterprise Data Set";
Sbi.locale.ln['sbi.mydata.shareddataset'] = "Shared Data Set";
Sbi.locale.ln['sbi.mydata.alldataset'] = "All Data Set";
Sbi.locale.ln['sbi.mydata.sharedataset'] = "Share Data Set";
Sbi.locale.ln['sbi.mydata.unsharedataset'] = "Unshare Data Set";

//===================================================================
//CONTROL PANEL - SAVE WINDOW
//===================================================================
Sbi.locale.ln['sbi.savewin.title'] = 'Insert more details and save your document... ';
Sbi.locale.ln['sbi.savewin.name'] = 'Name';
Sbi.locale.ln['sbi.savewin.description'] = 'Description';
Sbi.locale.ln['sbi.savewin.previewfile'] = 'Preview file';
Sbi.locale.ln['sbi.savewin.saveWarning']  = 'Insert the name before save document';

//===================================================================
//COCKPIT
//===================================================================
Sbi.locale.ln['sbi.cockpit.editor.widget.widgeteditormainpanel.emptymsg'] = 'Drag & drop here a widget from the palette';
Sbi.locale.ln['sbi.cockpit.core.WidgetDesigner.title'] = 'Flat table designer';
Sbi.locale.ln['sbi.cockpit.widgets.table.tabledesignerpanel.fields.emptymsg'] = 'Visible fields';
Sbi.locale.ln['sbi.cockpit.widgets.table.tabledesignerpanel.fields'] = 'Drag & drop here attribute as the series\' that you want view in the table';
Sbi.locale.ln['sbi.cockpit.queryfieldspanel.title'] = 'Selected fields';

