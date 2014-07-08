/** SpagoBI, the Open Source Business Intelligence suite

 * Copyright (C) 2012 Engineering Ingegneria Informatica S.p.A. - SpagoBI Competency Center
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0, without the "Incompatible With Secondary Licenses" notice. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. **/
 
Ext.ns("Sbi.locale");

Sbi.locale.ln = Sbi.locale.ln || new Array();

//once all the labels have been translated remove the following block

//< block START
Sbi.locale.unsupportedmsg = 'Sorry, french localization is not yet supported by SpagoBIGeoReportEngine.'
	+ 'In order to add fench localization you can modify properly the file ' 
	+ 'SpagoBIGeoReportEngine/js/spagobi/locale/fr.js translating text from english to french.'
	+ 'Once done please contribute it back to the project.';

Ext.Msg.show({
	   title:'Unimplemented functionality',
	   msg: Sbi.locale.unsupportedmsg,
	   buttons: Ext.Msg.OK,
	   icon: Ext.MessageBox.INFO
});
//block END >

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
//Example
//=====================================================================================================

//=====================================================================================================
//GENERIC
//=====================================================================================================

Sbi.locale.ln['sbi.generic.author'] = 'Auteur';
Sbi.locale.ln['sbi.generic.creationdate'] = 'Cr�ation de donn�es';
Sbi.locale.ln['sbi.generic.owner']= 'Auteur';
Sbi.locale.ln['sbi.generic.name']= 'Nom';
Sbi.locale.ln['sbi.generic.save'] = ' Enregistrer';
Sbi.locale.ln['sbi.generic.saveAndGoBack'] = 'Enregistrer et retourner';
Sbi.locale.ln['sbi.generic.cancel'] = 'Annuler';
Sbi.locale.ln['sbi.generic.resultMsg'] = 'Op�ration r�ussie';

//===================================================================
//WIZARD 
//===================================================================
Sbi.locale.ln['sbi.ds.wizard.general']= ' Enregistrer le jeu de donn�es';
Sbi.locale.ln['sbi.ds.wizard.detail']= 'D�poser un ficher';
Sbi.locale.ln['sbi.ds.wizard.metadata']= 'D�finition de donn�es';
Sbi.locale.ln['sbi.ds.wizard.validation']= 'Validation de donn�es';
Sbi.locale.ln['sbi.ds.wizard.back']= '< Avant';
Sbi.locale.ln['sbi.ds.wizard.next']= 'Suivant >';
Sbi.locale.ln['sbi.ds.wizard.confirm']= 'Confirmer';
Sbi.locale.ln['sbi.ds.wizard.cancel']= 'Annuler';
Sbi.locale.ln['sbi.ds.wizard.close']= 'Fermer';
Sbi.locale.ln['sbi.ds.wizard.startMsg']= 'S�lectionner et d�poser votre ficher en XLS ou CSV ...';
Sbi.locale.ln['sbi.ds.wizard.file']= 'File';
Sbi.locale.ln['sbi.ds.wizard.successLoad']= 'Charg� avec succ�s!'
Sbi.locale.ln['sbi.ds.wizard.selectedFile']='File s�lectionn�';
Sbi.locale.ln['sbi.ds.wizard.loadedFile']='File charg� ';
Sbi.locale.ln['sbi.ds.wizard.selectFile']='S�lectionner File';

Sbi.locale.ln['sbi.ds.orderComboLabel']= 'Ordonner par...';
Sbi.locale.ln['sbi.ds.filterLabel']= 'Filtrer par ...';
Sbi.locale.ln['sbi.ds.moreRecent']= 'R�cent';


//===================================================================
//BROWSER 
//===================================================================
Sbi.locale.ln['sbi.browser.document.searchDatasets']  = 'Chercher jeu de donn�es';
Sbi.locale.ln['sbi.browser.document.searchKeyword']  = 'Chercher mot cl�...';

//===================================================================
//MYDATA 
//===================================================================
Sbi.locale.ln['sbi.mydata.useddataset'] = "Jeu de donn�es utilis�";
Sbi.locale.ln['sbi.mydata.mydataset'] = "Mon jeu de donn�es";
Sbi.locale.ln['sbi.mydata.enterprisedataset'] = "Jeu de donn�es Entreprise";
Sbi.locale.ln['sbi.mydata.shareddataset'] = "Jeu de donn�es Partag�";
Sbi.locale.ln['sbi.mydata.alldataset'] = "Jeu de donn�es Tous";
Sbi.locale.ln['sbi.mydata.sharedataset'] = "Partager le jeu de donn�es";
Sbi.locale.ln['sbi.mydata.unsharedataset'] = "Ne pas partager le jeu de donn�es";

//===================================================================
//CONTROL PANEL - SAVE WINDOW
//===================================================================
Sbi.locale.ln['sbi.savewin.title'] = 'Ins�rer plus de d�tails et enregistrer le document... ';
Sbi.locale.ln['sbi.savewin.name'] = 'Nom';
Sbi.locale.ln['sbi.savewin.description'] = 'D�scription';
Sbi.locale.ln['sbi.savewin.previewfile'] = 'Aper�u du file';
Sbi.locale.ln['sbi.savewin.saveWarning']  = 'Ins�rer le nom avant d\'enregistrer le document';

//===================================================================
//COCKPIT
//===================================================================
Sbi.locale.ln['sbi.cockpit.editor.widget.widgeteditormainpanel.emptymsg'] = 'Glisser-d�poser ici un widget de la palette';
Sbi.locale.ln['sbi.cockpit.core.WidgetDesigner.title'] = 'Designer de table � plat';
Sbi.locale.ln['sbi.cockpit.widgets.table.tabledesignerpanel.fields.emptymsg'] = 'Champs Visibiles';
Sbi.locale.ln['sbi.cockpit.widgets.table.tabledesignerpanel.fields'] = 'Glisser-d�poser un attribut comme s�rie que vous d�sirez voir dans la table';
Sbi.locale.ln['sbi.cockpit.queryfieldspanel.title'] = 'Champs s�lectionn�s';


Sbi.locale.ln['sbi.qbe.savedatasetwindow.title'] = "Remplissez les d�tails du jeu de donn�es et cliquez sur Enregistrer ";
