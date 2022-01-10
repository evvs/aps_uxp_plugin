function beforeAfter(mirror, magic)
{
	if (magic == "0xDEADBEAF"){
		var nam = app.activeDocument.historyStates[0].name;
		if (mirror == true){
			var idslct = charIDToTypeID( "slct" );
			var desc = new ActionDescriptor();
			var idnull = charIDToTypeID( "null" );
			var ref = new ActionReference();
			var idHstS = charIDToTypeID( "HstS" );
			var idOrdn = charIDToTypeID( "Ordn" );
			var idLst = charIDToTypeID( "Lst " );
			ref.putEnumerated( idHstS, idOrdn, idLst );
			desc.putReference( idnull, ref );
			executeAction( idslct, desc, DialogModes.NO );
		}else{
			var idslct = charIDToTypeID( "slct" );
			var desc = new ActionDescriptor();
			var idnull = charIDToTypeID( "null" );
			var ref = new ActionReference();
			var idSnpS = charIDToTypeID( "SnpS" );
			ref.putName( idSnpS, nam );
			desc.putReference( idnull, ref );
			executeAction( idslct, desc, DialogModes.NO );
		};
	};
};