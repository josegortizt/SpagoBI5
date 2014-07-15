/** SpagoBI, the Open Source Business Intelligence suite

 * Copyright (C) 2012 Engineering Ingegneria Informatica S.p.A. - SpagoBI Competency Center
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0, without the "Incompatible With Secondary Licenses" notice. 
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. **/
 
  
 
  
 
 Ext.ns("Sbi.locale");
Sbi.locale.ln = Sbi.locale.ln || new Array();


//===================================================================
//MESSAGE BOX BUTTONS
//===================================================================
Ext.Msg.buttonText.yes = 'Oui'; 
Ext.Msg.buttonText.no = 'Non';


//===================================================================
//MESSAGE GENERAL
//===================================================================
Sbi.locale.ln['sbi.qbe.messagewin.yes'] = 'Oui';
Sbi.locale.ln['sbi.qbe.messagewin.no'] = 'Non';
Sbi.locale.ln['sbi.qbe.messagewin.cancel'] = 'Annuler';


//===================================================================
// MESSAGE WINDOW
//===================================================================
Sbi.locale.ln['sbi.qbe.messagewin.warning.title'] = 'Attention!';
Sbi.locale.ln['sbi.qbe.messagewin.error.title'] = 'Message d\'erreur';
Sbi.locale.ln['sbi.qbe.messagewin.info.title'] = 'Information';


//===================================================================
//SESSION EXPIRED
//===================================================================
Sbi.locale.ln['sbi.qbe.sessionexpired.msg'] = 'Votre session a expir\u00E9. Essayer de r\u00E9-ex\u00E9cuter le document';


//===================================================================
//DATASTORE PANEL
//===================================================================
Sbi.locale.ln['sbi.qbe.datastorepanel.title'] = 'R\u00E9sultats';

Sbi.locale.ln['sbi.qbe.datastorepanel.grid.displaymsg'] = 'Affiche {0} - {1} of {2}';
Sbi.locale.ln['sbi.qbe.datastorepanel.grid.emptymsg'] = 'Aucune donn\u00E9e \u00E0 afficher';
Sbi.locale.ln['sbi.qbe.datastorepanel.grid.emptywarningmsg'] = 'La requ�te ne retourne pas de valeurs. V�rifiez s\'il existe des filtres � d�finir';
Sbi.locale.ln['sbi.qbe.datastorepanel.grid.beforeoverflow'] = 'Limite max du nombre d\'enregistrements';
Sbi.locale.ln['sbi.qbe.datastorepanel.grid.afteroverflow'] = 'd\u00E9pass\u00E9e';
Sbi.locale.ln['sbi.qbe.datastorepanel.grid.beforepagetext'] = 'Page';
Sbi.locale.ln['sbi.qbe.datastorepanel.grid.afterpagetext'] = 'de {0}';
Sbi.locale.ln['sbi.qbe.datastorepanel.grid.firsttext'] = 'Premi\u00E8re page';
Sbi.locale.ln['sbi.qbe.datastorepanel.grid.prevtext'] = 'Page pr\u00E9c\u00E9dente';
Sbi.locale.ln['sbi.qbe.datastorepanel.grid.nexttext'] = 'Page suivante';
Sbi.locale.ln['sbi.qbe.datastorepanel.grid.lasttext'] = 'Derni\u00E8re Page';
Sbi.locale.ln['sbi.qbe.datastorepanel.grid.refreshtext'] = 'Actualiser';

Sbi.locale.ln['sbi.qbe.datastorepanel.button.tt.exportto'] = 'Exporter vers';


//===================================================================
//Sbi.worksheet.designer.ChartSeriesPanel
//===================================================================
Sbi.locale.ln['sbi.worksheet.designer.chartseriespanel.title'] = 'S�ries';
Sbi.locale.ln['sbi.worksheet.designer.chartseriespanel.emptymsg'] = 'Glisser-d�poser ici une m�sure de requ�te comme des s�ries';
Sbi.locale.ln['sbi.worksheet.designer.chartseriespanel.columns.queryfield'] = 'Domaine';
Sbi.locale.ln['sbi.worksheet.designer.chartseriespanel.columns.seriename'] = 'Nom';
Sbi.locale.ln['sbi.worksheet.designer.chartseriespanel.columns.color'] = 'Couleur';
Sbi.locale.ln['sbi.worksheet.designer.chartseriespanel.columns.showcomma'] = 'Montrer le s�parateur de groupes';
Sbi.locale.ln['sbi.worksheet.designer.chartseriespanel.columns.precision'] = 'Pr�cision';
Sbi.locale.ln['sbi.worksheet.designer.chartseriespanel.columns.suffix'] = 'Suffixe';
Sbi.locale.ln['sbi.worksheet.designer.chartseriespanel.cannotdrophere.title'] = 'Vous ne pouvez pas d�poser ici';
Sbi.locale.ln['sbi.worksheet.designer.chartseriespanel.cannotdrophere.measurealreadypresent'] = 'Cette m�sure est d�j� pr�sente';
Sbi.locale.ln['sbi.worksheet.designer.chartseriespanel.cannotdrophere.attributes'] = 'Vous ne pouvez pas glisser-d�poser les attributs dans les s�ries des graphiques';
Sbi.locale.ln['sbi.worksheet.designer.chartseriespanel.cannotdrophere.postlinecalculated'] = 'Vous ne pouvez pas utiliser des scripts dans les s�ries des grafiques';
Sbi.locale.ln['sbi.worksheet.designer.chartseriespanel.tools.tt.removeall'] = ['Supprimer tout'];
Sbi.locale.ln['sbi.qbe.selectgridpanel.aggfunc.name.none'] = 'nul';
Sbi.locale.ln['sbi.qbe.selectgridpanel.aggfunc.name.sum'] = 'sum';
Sbi.locale.ln['sbi.qbe.selectgridpanel.aggfunc.name.avg'] = 'average';
Sbi.locale.ln['sbi.qbe.selectgridpanel.aggfunc.name.max'] = 'maximum';
Sbi.locale.ln['sbi.qbe.selectgridpanel.aggfunc.name.min'] = 'minimum';
Sbi.locale.ln['sbi.qbe.selectgridpanel.aggfunc.name.count'] = 'count';
Sbi.locale.ln['sbi.qbe.selectgridpanel.aggfunc.name.countdistinct'] = 'count distinct';
Sbi.locale.ln['sbi.qbe.selectgridpanel.headers.function'] = 'function';


//===================================================================
//Sbi.worksheet.designer.SeriesGroupingPanel
//===================================================================
Sbi.locale.ln['sbi.worksheet.designer.seriesgroupingpanel.title'] = 'S�ries de groupes de variables';


//===================================================================
//Sbi.worksheet.designer.ChartCategoryPanel
//===================================================================
Sbi.locale.ln['sbi.worksheet.designer.chartcategorypanel.title'] = 'Cat�gorie';
Sbi.locale.ln['sbi.worksheet.designer.chartcategorypanel.emptymsg'] = 'Glisser-d�poser ici un attribut de requ�te comme une cat�gorie';
Sbi.locale.ln['sbi.worksheet.designer.chartcategorypanel.cannotdrophere.title'] = 'Vous ne pouvez pas d�poser';
Sbi.locale.ln['sbi.worksheet.designer.chartcategorypanel.cannotdrophere.unknownsource'] = 'Source inconnue';
Sbi.locale.ln['sbi.worksheet.designer.chartcategorypanel.cannotdrophere.measures'] = 'Vous ne pouvez pas glisser des m�sures ici';
Sbi.locale.ln['sbi.worksheet.designer.chartcategorypanel.cannotdrophere.postlinecalculated'] = 'Vous ne pouvez pas d�poser des scripts ici';