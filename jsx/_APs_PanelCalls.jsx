
///////////////////////////////

function checkAndLoadModules()
{
    var all_ok = true;

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

if (!Folder(apsPath).exists)
{
	$.evalFile(File($.fileName).parent.absoluteURI + "/_APs_FirmLibLite_ru.jsm");
	NoApsFldAlert_Lite();
	return false;
}
else
	if (!File(flPath).exists || !File(klPath).exists)
	{
		$.evalFile(File($.fileName).parent.absoluteURI + "/_APs_FirmLibLite_ru.jsm");	
		NoFirmLibAlert_Lite();
		return false;
	}
	else {
		$.evalFile(flPath);
		$.evalFile(klPath);
        $.evalFile(File($.fileName).parent.absoluteURI + "/_APs_PanelTools_ru.jsm");

        return true;

		}
}

//////////// exported functions: ////////////////////

function aboutProduct()
{
    if (checkAndLoadModules())
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
	if (checkAndLoadModules())
        showAPsCatFld();
}

function show_APsPanelFld()
{
	if (checkAndLoadModules())
        showFld (File($.fileName).parent.parent.fsName);
}

function show_APsScripts()
{
    if (checkAndLoadModules())
        showAPsScripts();
}

function show_APsActions()
{
	if (checkAndLoadModules())
        showAPsActions();
}

function show_APsWorkspaces()
{
	if (checkAndLoadModules())
        showAPsWorkspaces();
}
