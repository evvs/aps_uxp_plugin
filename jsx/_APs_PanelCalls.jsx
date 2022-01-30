
///////////////////////////////

var presetsScrs = Folder(app.path + "/" + localize("$$$/ScriptingSupport/InstalledScripts=Presets/Scripts")).absoluteURI;
var retouchScrPath = presetsScrs + "/APs_Scripts/APs_RETOUCH_set_ru/";
var apsPath = presetsScrs + "/APs_Scripts";
var flPath = retouchScrPath + "_APsRETOUCH_FirmLib_ru.jsm";
var klPath = retouchScrPath + "_APsRETOUCH_KeywordsLib_ru.jsm";
var g_script_name = "APsRETOUCH_Panel";
var g_main_dat_folder_name = "/APs-files/APsRETOUCH_set-files";
var g_main_title_text = "[APsRETOUCH] Panel";
var g_main_folder = new Folder(Folder.userData + g_main_dat_folder_name);
var g_dat_folder = new Folder(g_main_folder + "/" + g_script_name + "-files");
var g_windows_folder = new Folder(g_dat_folder + "/" + g_script_name + "-windows");
var webURL = "https://automate-ps.com";
var look_go = webURL + "/";
var look_go_Tittle="Automate-Ps.com";

H=22;

var hasModules = true;

//function checkAndLoadModules()
{	
if (!Folder(apsPath).exists)
{
	$.evalFile(File($.fileName).parent.absoluteURI + "/_APs_FirmLibLite_ru.jsm");
	NoApsFldAlert_Lite();
	hasModules = false;
}
else
	if (!File(flPath).exists || !File(klPath).exists)
	{
		$.evalFile(File($.fileName).parent.absoluteURI + "/_APs_FirmLibLite_ru.jsm");
		NoFirmLibAlert_Lite();
		hasModules = false;
	}
	else {
		$.evalFile(klPath);
		$.evalFile(flPath);		
        $.evalFile(File($.fileName).parent.absoluteURI + "/_APs_PanelTools_ru.jsm");
			
        hasModules = true;
		}
}

//////////// exported functions: ////////////////////

function aboutProduct()
{
    if (hasModules)
        dlgAboutRETOUCH ();
}

function callMaintenance()
{
	var descS = new ActionDescriptor();
    descS.putString( charIDToTypeID( 'jsNm' ), 'APsRETOUCH_Maintenance_ru' );
    descS.putString( charIDToTypeID( 'jsMs' ), 'true' );
    executeAction( stringIDToTypeID( 'AdobeScriptAutomation Scripts' ), descS, DialogModes.ALL );
}

function show_APsCatFld()
{
	if (hasModules)
        showAPsCatFld();
}

function show_APsPanelFld()
{
	if (hasModules)
        showFld (File($.fileName).parent.parent.fsName);
}

function show_APsScripts()
{
    if (hasModules)
        showAPsScripts();
}

function show_APsActions()
{
	if (hasModules)
        showAPsActions();
}

function show_APsWorkspaces()
{
	if (hasModules)
        showAPsWorkspaces();
}

function executeApsCatPdf( pdfPath)
{
	PathVariables = new PathVariables_Init();
	PathVariables_read(PathVariables);
	PathVariables.pathCat = PathVariables_GetPath1ByName(PathVariables, CatVariable);
	PathVariables.pathCatExist = (PathVariables.pathCat != "") && Folder(PathVariables.pathCat).exists;

	if (PathVariables.pathCatExist || FixMissedApsCatalogDlg(StrErrNoCatalog, 0))
	{
		pdf = File(PathVariables.pathCat +  '/' + pdfPath);
		if (pdf.exists)
				pdf.execute();
	}
}

function openAtn( atnPath)
{
	var atn = File(atnPath);

	if (atnPath[0] == '>')
	{
		PathVariables = new PathVariables_Init();
		PathVariables_read(PathVariables);
		PathVariables.pathCat = PathVariables_GetPath1ByName(PathVariables, CatVariable);
		PathVariables.pathCatExist = (PathVariables.pathCat != "") && Folder(PathVariables.pathCat).exists;

		if (PathVariables.pathCatExist || FixMissedApsCatalogDlg(StrErrNoCatalog, 0))
			atn = File(PathVariables.pathCat +  '/' + atnPath.substr(1));
	}

	if (atn.exists)
		atn.execute();
}

function removeActSet( setname )
{
	try{
		var desc = new ActionDescriptor();
		var ref = new ActionReference();
		ref.putName( charIDToTypeID( "ASet" ), setname );
		desc.putReference( charIDToTypeID( "null" ), ref );
		executeAction( charIDToTypeID( "Dlt " ), desc, DialogModes.NO );
	}catch(__){}
}

// проверка наличия набора в панеи операций
// возвращает true, если набор есть
function checkActSet ( setname )
{
	if (setname == '*')
		return true;

	if (indexOf(Stdlib.getActionSets(), setname) < 0) 
		return false;
	else
		return true;
}
