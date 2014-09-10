/** SpagoBI, the Open Source Business Intelligence suite

 * Copyright (C) 2012 Engineering Ingegneria Informatica S.p.A. - SpagoBI Competency Center
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0, without the "Incompatible With Secondary Licenses" notice.
 * If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. **/

Ext.ns("Sbi.locale");

Sbi.locale.ln = Sbi.locale.ln || new Array();

//===================================================================
//CROSSTAB DESIGNER
//===================================================================
Sbi.locale.ln['sbi.crosstab.crosstabdesignerpanel.title'] = 'dise�ador Crosstab';
Sbi.locale.ln['sbi.crosstab.crosstabdefinitionpanel.title'] = 'Definici�n de la Crosstab';
Sbi.locale.ln['sbi.crosstab.crosstabdefinitionpanel.tools.preview'] = 'Ver vista previa de la Crosstab';
Sbi.locale.ln['sbi.crosstab.crosstabdefinitionpanel.rows'] = 'Filas';
Sbi.locale.ln['sbi.crosstab.crosstabdefinitionpanel.columns'] = 'Columnas';
Sbi.locale.ln['sbi.crosstab.crosstabdefinitionpanel.measures'] = 'Medidas';
Sbi.locale.ln['sbi.crosstab.attributescontainerpanel.cannotdrophere.title'] = 'Drop no permitido';
Sbi.locale.ln['sbi.crosstab.attributescontainerpanel.cannotdrophere.attributealreadypresent'] = 'El campo ya est� presente ';
//Sbi.locale.ln['sbi.crosstab.attributescontainerpanel.cannotdrophere.attributealreadypresentfilters'] = 'El campo est� ya presente en los filtros ';
Sbi.locale.ln['sbi.crosstab.attributescontainerpanel.cannotdrophere.measures'] = 'No se puede insertar medidas en las filas o columnas: se debe insertar en la parte central de la crosstab';
Sbi.locale.ln['sbi.crosstab.attributescontainerpanel.tools.tt.removeall'] = ['Eliminar todo'];


Sbi.locale.ln['sbi.crosstab.measurescontainerpanel.cannotdrophere.title'] = 'Drop no permitido';
Sbi.locale.ln['sbi.crosstab.measurescontainerpanel.cannotdrophere.measurealreadypresent'] = 'La medida ya est� presente';
Sbi.locale.ln['sbi.crosstab.measurescontainerpanel.cannotdrophere.attributes'] = 'No se puede insertar atributos en la parte central de la crosstab: se debe insertar en las filas o columnas';
Sbi.locale.ln['sbi.crosstab.measurescontainerpanel.cannotdrophere.postlinecalculated'] = 'No se puede utilizar los campos calculados basados en script al interno de la crosstab';

Sbi.locale.ln['sbi.crosstab.measurescontainerpanel.tools.tt.showdetailswizard'] = 'Visualizar detalles';
Sbi.locale.ln['sbi.crosstab.measurescontainerpanel.tools.tt.removeall'] = ['Eliminar todos'];

Sbi.locale.ln['sbi.crosstab.crosstabdetailswizard.title'] = 'Detalles crosstab';

Sbi.locale.ln['sbi.crosstab.crosstabdetailswizard.measureson'] = 'Medidas en';
Sbi.locale.ln['sbi.crosstab.crosstabdetailswizard.rows'] = 'filas';
Sbi.locale.ln['sbi.crosstab.crosstabdetailswizard.columns'] = 'columnas';
Sbi.locale.ln['sbi.crosstab.crosstabdetailswizard.onrows'] = 'En las filas';
Sbi.locale.ln['sbi.crosstab.crosstabdetailswizard.oncolumns'] = 'En las columnas';
Sbi.locale.ln['sbi.crosstab.crosstabdetailswizard.calculatetotalsonrows'] = 'Visualizar totales';
Sbi.locale.ln['sbi.crosstab.crosstabdetailswizard.calculatesubtotalsonrows'] = 'Visualizar sub-totales';
Sbi.locale.ln['sbi.crosstab.crosstabdetailswizard.calculatetotalsoncolumns'] = 'Visualizar totales';
Sbi.locale.ln['sbi.crosstab.crosstabdetailswizard.calculatesubtotalsoncolumns'] = 'Visualizar sub-totales';
Sbi.locale.ln['sbi.crosstab.crosstabdetailswizard.buttons.apply'] = 'Aplicar';
Sbi.locale.ln['sbi.crosstab.crosstabdetailswizard.buttons.cancel'] = 'Eliminar';
Sbi.locale.ln['sbi.crosstab.crosstabdetailswizard.percenton'] = 'Porcentajes respecto del total de';
Sbi.locale.ln['sbi.crosstab.crosstabdetailswizard.column'] = 'columna';
Sbi.locale.ln['sbi.crosstab.crosstabdetailswizard.row'] = 'fila';
Sbi.locale.ln['sbi.crosstab.crosstabdetailswizard.nopercent'] = 'ninguno';
Sbi.locale.ln['sbi.crosstab.crosstabdetailswizard.maxcellnumber'] = 'N�mero m�ximo de celdas';


Sbi.locale.ln['sbi.crosstab.chooseaggregationfunctionwindow.title'] = 'Elija la funci�n de agregaci�n para la medida ';
Sbi.locale.ln['sbi.crosstab.chooseaggregationfunctionwindow.buttons.apply'] = 'Aplicar';
Sbi.locale.ln['sbi.crosstab.chooseaggregationfunctionwindow.buttons.cancel'] = 'Eliminar';

Sbi.locale.ln['sbi.crosstab.crosstabpreviewpanel.title'] = 'Vista previa Crosstab';
Sbi.locale.ln['sbi.crosstab.crosstabpreviewpanel.overflow.warning'] = 'El n�mero de celdas excede el limite impuesto. Para tener la crosstab completa exportar el documento en formato XLS.';


Sbi.locale.ln['sbi.crosstab.crossTabValidation.title'] = 'Validaci�n de la crosstab fallida';
Sbi.locale.ln['sbi.crosstab.crossTabValidation.noMeasure'] = 'No ha sido incluida ninguna medida en la tabla pivot';
Sbi.locale.ln['sbi.crosstab.crossTabValidation.noAttribute'] = 'No ha sido incluida alg�n atributo en la tabla pivot';
Sbi.locale.ln['sbi.crosstab.crossTabValidation.noSegmentAttribute'] = 'El atributo de segmentaci�n debe ser utilizado';
Sbi.locale.ln['sbi.crosstab.crossTabValidation.noMandatoryMeasure'] = 'La medida obligatoria debe ser utilizada';

//===================================================================
//CROSSTAB 
//===================================================================

Sbi.locale.ln['sbi.crosstab.header.total.text'] = 'Total';

Sbi.locale.ln['sbi.crosstab.menu.addcalculatedfield'] = 'A�adir campo calculado';
Sbi.locale.ln['sbi.crosstab.menu.removecalculatedfield'] = 'Eliminar campo calculado';
Sbi.locale.ln['sbi.crosstab.menu.modifycalculatedfield'] = 'Modificar campo calculado';
Sbi.locale.ln['sbi.crosstab.menu.hideheader'] = 'Esconder este encabezado';
Sbi.locale.ln['sbi.crosstab.menu.hideheadertype'] = 'Esconder todos los encabezados de este tipo';
Sbi.locale.ln['sbi.crosstab.menu.hidemeasure'] = 'Medidas visibles';
Sbi.locale.ln['sbi.crosstab.menu.hiddenheader'] = 'Encabezados escondidos';

//===================================================================
//CROSSTAB CALCULATED FIELDS WIZARD
//===================================================================
Sbi.locale.ln['sbi.crosstab.calculatefieldwizard.title'] = 'Campos calculados';
Sbi.locale.ln['sbi.crosstab.calculatefieldwizard.validate'] = 'V�lida';
Sbi.locale.ln['sbi.crosstab.calculatefieldwizard.clear'] = 'Limpiar';
Sbi.locale.ln['sbi.crosstab.calculatefieldwizard.ok'] = 'OK';
Sbi.locale.ln['sbi.crosstab.calculatefieldwizard.info'] = 'Un campo calculado se compone de operadores matem�ticos, constantes y variables. Las variables son identificadores de las columnas. Para insertar una columna, haga clic en el encabezado de la expresi�n correspondiente. Tenga en cuenta que s�lo se puede insertar columnas o grupos de columnas en el nivel en el que desea definir el campo calculado';
