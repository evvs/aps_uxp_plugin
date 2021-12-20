/*
<javascriptresource>
<about>Photoshop-Script | https://automate-ps.com</about>
<category>APsRETOUCH_ru</category>
<eventid>B82A4402-2148-42EC-80E7-5A3B9C0D2E26</eventid>
<terminology><![CDATA[<< /Version 2
                         /Events <<
                         /B82A4402-2148-42EC-80E7-5A3B9C0D2E26 [($$$/nonparel/recordableAPsRETOUCHSelectPanelSettings=APsRETOUCH SelectPanelSettings) <<
                          >>]
                         ]>>
                      >> ]]>
</terminology>
</javascriptresource>
*/

#target photoshop
#script "APsRETOUCH_SelectPanelSettings"
#strict on

///локализация

var StrSetList = [];
var StrDefSetName = "Проект по-умолчанию";
var StrHelpAddoTittle = ": Помощь";

var OpenFldHelpTip = "Перейти в папку с настройками проектов панели";
var EditButHelpTip = "Редактировать настройки кнопок текущего проекта";

var StrEditButHlp = "текст текст текст текст текст текст текст текст текст текст\r"+ 
					"текст текст текст текст текст текст текст текст текст текст";

var StrSaveBut = "Cохранить";

var StrButtonsRowHelpTip = 	"текст текст текст текст текст текст текст текст текст текст\r"+ 
							"текст текст текст текст текст текст текст текст текст текст";

var SetsPath = 'APs_RETOUCH_ru/__Technical/APsRETOUCH_Buttons_Settings';

//var DstFileName = "/Adobe/UXP/Plugins/External/aps.retouch.uxp/buttons_settings_modified.txt";
//var DefFileName = "/Adobe/UXP/Plugins/External/aps.retouch.uxp/buttons_settings_.txt";
var DstFileName = "buttons_settings_modified.txt";
var DefFileName = "buttons_settings_.txt";

var storFileName = "lastSel.txt";

var StrErrNoCatalogSelPanSet =  "ОШИБКА!\r"+ 
								"Не найдена папка «APs_CATALOG», в которой\r"+ 
								"находятся файлы проектов с настройками кнопок.";

var StrErrPrjNotFound = "Файл проекта %1 не найден.\r"+ 
			"Настройки сброшены на «Проект по-умолчанию";

////////////////////////

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
	all_ok = false;
}
else
	if (!File(flPath).exists || !File(klPath).exists)
	{
		$.evalFile(File($.fileName).parent.absoluteURI + "/_APs_FirmLibLite_ru.jsm");	
		NoFirmLibAlert_Lite();
		all_ok = false;;
	}
	else {
		$.evalFile(flPath);
		$.evalFile(klPath);

		//actname = "%1";
		//setname = "%2";
		//do_Action(setname, actname, false);
		}

///---------------- Дополнительные переменные для запоминания настроек и др. ------------------

// Общие переменные для работы скрипта и модулей APs_Install
// Имя скрипта для именования папок с файлами
var g_script_name 	= 'APsRETOUCH_SelectPanelSettings';
// Относительный путь размещения скрипта (обязательно начинается со слэша). Считается от  паки ../Presets/Scripts в директории Photoshop
var g_subplace		= '/APs_Scripts/APs_RETOUCH_set_ru';
// Системная папка, в директории которой скрипт создёт свою именную папку для технических файлов (если нет - будет создана)
var g_main_dat_folder_name = '/APs-files/APsRETOUCH_set-files';
// "Имя программы", которое отображается в заголовке главного окна скрипта и всех подчинённых окон
var g_main_title_text      = '[APsRETOUCH] Выбрать файл настроек';

// Путь к текущей папке со скриптом
var g_script_fileName      = new File($.fileName);
// Путь к папке пользователя /Automate-Ps-files
var g_main_folder          = new Folder(Folder.userData + g_main_dat_folder_name);
// Путь к папке пользователя /Automate-Ps-files/<Имя скрипта>-files
var g_dat_folder           = new Folder(g_main_folder + '/' + g_script_name + '-files');
// Путь к папке пользователя /Automate-Ps-files/<Имя скрипта>-files/windows
var g_windows_folder       = new Folder(g_dat_folder + '/' + g_script_name + '-windows');
// Время (в секундах) до автоматического закрытия окон с сообщениями об окончании работы модулей APs_Install
var g_time_install_step_ok = 5;
//URL логотипа для соцсетей
var logo_url = "http://automate-ps.com/img/logo.png";

//--------------------------------------------------------------------------------------------------

if (all_ok)
{

try //для возможности выхода из скрипта в случае ошибки в любом месте
{
	//внутренние настройки
	var g_use_FirmLibVersion = '6.8';
	/////////////////////////////////

	var CatVariable="APs_CATALOG";
	var PathVariables = new PathVariables_Init();
	PathVariables_read(PathVariables);

	//путь к APs-каталогу
	PathVariables.pathCat = PathVariables_GetPath1ByName(PathVariables, CatVariable);
	//существование папки каталога
	PathVariables.pathCatExist = (PathVariables.pathCat != "") && Folder(PathVariables.pathCat).exists;

    var EnableLog=false;//false; //Включение логирования в APs...log
	var RealTimeLog=true; //Включение логирования в реальном времени (иначе однократная запись лога на выходе)
	var sLog="";		
        
	var fromAction = !!app.playbackParameters.count;
	var noInterfaced = (app.playbackDisplayDialogs != DialogModes.ALL);

	LogStr('fromAction = ' + fromAction);
	LogStr('noInterfaced = ' + noInterfaced);

	var IsCC2015 = (app.version.split('.')[0] > 15); //флажок, указывающий на версию CC 2015
	var IsMacOs = ($.os.slice(0, 7) != 'Windows');

	LogStr('IsCC2015 = ' + IsCC2015);
	LogStr('IsMacOs = ' + IsMacOs);

	var H = (IsCC2015) ? 22 : 20; //высота элементов
	var BR = (IsCC2015) ? 8 : 10; //ширина элементов

	STRBADSYMS = /[\/\\:\*\?"<>\|]/g;
	STRBADSYMS2 = /[\*\?"<>\|]/;
	STRBADSYMS3 = /[\/\\:\?"<>\|]/g; //STRBADSYMS без *

	STRBADSYMS4 = /[\\:\*\?"<>\|]/g; //STRBADSYMS без /
	STRBADSYMS5 = /[\\:\?"<>\|]/g; //STRBADSYMS без / и *
	STRBADSYMS6 = /[\\\?"<>\|]/g; //STRBADSYMS без /, * и :

	var strhistoryState = g_main_title_text;

	var HideAllWarnings = false;
    var psource = new File($.fileName).path;

    var logFilePath = g_dat_folder + '/' + g_script_name + '_' + ((noInterfaced) ?  'no' : '') + 'Interfaced.log';
	if (EnableLog && RealTimeLog)
	{
		var logf=File(logFilePath);
		logf.encoding = 'UTF-8';
		logf.lineFeed = 'windows';
		logf.open('w');
		logf.write("");
		logf.close();
	}

	var myfont;
	var QuestionImg;
	var QuestionDisableImg;
	var OpenFldImg;
	var OpenFldDisableImg;
	var PresetControlImg;
	
	var webURL     = 'automate-ps.com';
	// логотип в окне "О продукте"
	var about_addr = webURL + '/';

	var webURL     = 'https://automate-ps.com';
	var webURLh    = webURL + '/';

	var look_tip   = webURL + '';	
	// вконтакте
	var vk_addr    = webURLh + '/';
	var vk_title   = '';

	// facebook
	var fb_addr    = webURLh + '/';
	// twitter
	var tw_addr    = webURLh + '/';
	// google+
	var gp_addr    = webURLh + '/';
	// mail
	var mail_to    = 'a@m.com';
	var mail_subj  = '';

	//Адрес по кнопке "Сайт проекта"
	var look_go    = "https://automate-ps.com/";//'http://allaps.com/3';
	var look_go_Tittle = "Automate-Ps.com";
	// Адрес по кнопке "Уроки по программе" - если пустой ("") - кнопка не показывается
	var lessons_addr = "https://automate-ps.com/ru/lessons/aps-retouch-uroki";//"http://allaps.com/9";
	
	var linePen;

/////////// /основное окно /////////////////////
	APs_Install_windows();

	//проверка  версии
	var flags = CheckPsVersion(protection_PsVerString);
	//вывод окна (если нужно) про несоответствие минимума версии
	if (AlertMinMaxPSVersionIfItsNeed(flags, true))
		throw 'Bad version'; //вываливаемся в нижний catch
	//вывод окна (если нужно) про несоответствие максимума
	if (AlertMinMaxPSVersionIfItsNeed(flags, false))
		throw 'Bad version'; //вываливаемся в нижний catch

	//if (!APs_Install_Check ()) throw 'APsInstall failed'; //вываливаемся в нижний catch
	
	var goof_fl=false;
	try{
		var fln = g_use_FirmLibVersion.split(".");
		var flMajorVer = Number(fln[0]);
		var flMinorVer = Number(fln[1]);

		var flnCur = FirmLibVersion.split(".");
		var flMajorVerCur = Number(flnCur[0]);
		var flMinorVerCur = Number(flnCur[1]);

		//if (g_use_FirmLibVersion == FirmLibVersion)
		if ((flMajorVerCur > flMajorVer) || ((flMajorVerCur == flMajorVer) && (flMinorVerCur >= flMinorVer)))
				goof_fl=true;
	}catch(_r_){};

	if (!goof_fl)
	{
		FirmAlert(StrBadFirmLibStr, "bad_firmlib_err.pos");
		throw 'Bad FirmLib';
	}

	myfont = ScriptUI.newFont('Arial:12');

	HideAllWarnings = true;
	var paramHolder = new ParamsPut("");
    if (fromAction) 
	{
		LogStr('Preparing reading from Action - start');		
		descriptorToObject(paramHolder, app.playbackParameters, g_main_title_text);
        			
		LogStr('Preparing reading from Action - end');
	}

	mainWnd( paramHolder, "alert_welcome.pos" );

	var paramHolder2 = new ParamsPut("");
    if (paramHolder2["id"] === undefined || paramHolder2["id"] === '') 
 			paramHolder2["id"] = 'APsSelPanSet' + generateUUID();

	var id = paramHolder2["id"];
	var paramHolder3 = new ParamsPut(id);
	// + set paramHolder params to paramHolder3 if it's need
	app.playbackParameters = objectToDescriptor(paramHolder3, g_main_title_text);
////////////////////////////////////////////////   Под-функции 

function ParamsPut(id)
{
	this.id = id;
}

///////////////////// GUI /////////////

//function warn_about(){ dlgAboutEx_Retouch(); }

/*
Функция добавления кнопки подсказки в правую часть строки
	(Требует инициализированных QuestionImg, QuestionDisableImg и StrHelpAddoTittle)
 */
	function addHelpBut(row, hlpText, posFName, vertAlign)
	{
		try	{ if ((QuestionImg == undefined) || (QuestionDisableImg == undefined) || (StrHelpAddoTittle == undefined))	return {};	}catch(_){ return {}}
	
		var resBut = row.add ("image", [0,0,21, (IsMacOs) ? 22 : 20], ScriptUI.newImage(QuestionImg,QuestionDisableImg,QuestionImg,QuestionImg));
		resBut.alignment = ["right", (vertAlign == undefined) ? "middle" : vertAlign];
		resBut.minimumSize = resBut.maximumSize = [21,(IsMacOs) ? 22 : 20];
		resBut.hlpMess = hlpText;
		resBut.wndposfname = posFName;
		resBut.onClick = function() {
										if (!this.enabled) return;
	
										FirmAlert(	this.hlpMess, this.wndposfname, StrHelpAddoTittle);
									};
		return resBut;
	}
	
	function getNearestFolderPath(fldPath) //or desktop
	{
		var fld = Folder(fldPath);
		//ищем ближайшую, если папки нет							
		while ((fld != undefined) && !fld.exists)
			fld = fld.parent;
			                                   
		return (fld != undefined) ? fld.absoluteURI : Folder.desktop.absoluteURI;
	}

function mainWnd( paramHolder, strparam, tittle )
{
	if (!PathVariables.pathCatExist && !FixMissedApsCatalogDlg(StrErrNoCatalogSelPanSet))
		return;

	var setPath;

	var ph = paramHolder;
	
	var fw = CreateFirmWindow (FirmLogoImg, (tittle == undefined) ? g_main_title_text : tittle, ""/* text */, false, undefined, strparam, "no"/*addrow*/);
	
	var redPen = CreateSolidPen (fw.rg, 255, 41, 6);
	
	var idTheme = GetColorThemeWndIndex (fw);

	if (QuestionImg == undefined)
		QuestionImg = getPicByTheme (idTheme, "GetQuestionImg_v3", "tmp_questionimg");
	
	if (QuestionDisableImg == undefined)
		QuestionDisableImg = getPicByTheme (idTheme, "GetQuestionDisableImg_v3", "tmp_questiondisableimg");
	
	if (OpenFldImg == undefined)
		OpenFldImg = getPicByTheme (idTheme, "GetOpenFldImg_v3", "tmp_openfldimg");
		
	if (OpenFldDisableImg == undefined)
		OpenFldDisableImg = getPicByTheme (idTheme, "GetOpenFldImg_Disable_v3", "tmp_openfldimgdis");
	
	if (PresetControlImg == undefined)
		PresetControlImg = getPicByTheme (idTheme, "GetPresetControlImg", "tmp_PresetControlImg");
	
	//fw.lg.children[0].onClick = function(){warn_about()};
		
	fw.rg.setgroup = fw.rg.add('group  {orientation: "row", alignment: ["fill", "top"], margins: [3,8,0,2]}');

	fw.showDiskBut = fw.rg.setgroup.add ("image", [0,0,30,(IsMacOs) ? 22 : 20], ScriptUI.newImage(OpenFldImg, OpenFldImg, OpenFldImg, OpenFldImg));
	fw.showDiskBut.alignment = ["left","top"];
	fw.showDiskBut.helpTip = OpenFldHelpTip;
	fw.showDiskBut.visible = true;
	fw.showDiskBut.minimumSize = fw.showDiskBut.maximumSize = [30,(IsMacOs) ? 22 : 20];
	fw.showDiskBut.onClick =  function()	{
												if (setPath != undefined)
													ShowFileOnDisk(getNearestFolderPath(setPath));
											};

	//if (!PathVariables.pathCatExist && !FixMissedApsCatalogDlg(StrErrNoCatalogSelPanSet))
	//	return;
	//else
	{	
		setPath = PathVariables.pathCat +  '/' + SetsPath;
		var fld = new Folder(setPath);

		var fls = fld.getFiles();
		for (var el in fls)
			if (fls[el] instanceof File)
			{
				var nm = decodeURI(fls[el].name);
				if (nm.slice(-3).toLowerCase() == "txt")
					StrSetList.push(nm.substr(0, nm.length-4));
			}
	}

	fw.rg.setgroup.showRedFrame1 = (setPath == undefined) || !Folder(setPath).exists;

	StrSetList.push(StrDefSetName);

	var storSelInd=StrSetList.length-1;
	
	var storf = File(g_dat_folder.absoluteURI + '/' + storFileName);

	var lastname = "";

	if (storf.exists)
	{
		var found = false;
		storf.encoding = 'UTF-8';
		storf.lineFeed = 'windows';
		storf.open('r');
		lastname = storf.read();
		storf.close();

		for (var i=0; i<StrSetList.length; i++)
			if (StrSetList[i] == lastname)
			{
				storSelInd = i;
				found = true;
				break;
			}

		if (!found)
			fw.rg.setgroup.showRedFrame3 = true;
	}

	fw.setList = fw.rg.setgroup.add("dropdownlist", undefined, StrSetList);
	fw.setList.alignment= ["fill", "top"];
	fw.setList.minimumSize[0] = 336
	fw.setList.minimumSize[1] = fw.setList.maximumSize[1] = (IsMacOs) ? 22 :20;
	fw.setList.justify = 'center';
	fw.setList.selection = storSelInd;

	fw.rg.setgroup.showRedFrame2 = false;

	/*fw.setList.items[0].enabled = false;
	fw.setList.onChange = function()
	{
		fw.rg.setgroup.showRedFrame = (fw.setList.selection.index == 0);
		try
		{
			fw.butSave.enabled = !fw.rg.setgroup.showRedFrame;	
		}catch(_){}

		RedrawGroup(fw.rg.setgroup);
	}
	*/
	
	fw.editBut = fw.rg.setgroup.add ("image", [0,0,30,(IsMacOs) ? 22 : 20], ScriptUI.newImage(PresetControlImg,PresetControlImg,PresetControlImg,PresetControlImg));
	fw.editBut.alignment = ["right","top"];
	fw.editBut.minimumSize = fw.editBut.maximumSize = [30,(IsMacOs) ? 22 : 20];
	fw.editBut.onClick = function() {
										if (!this.enabled) return;

										if (fw.rg.setgroup.showRedFrame3)
											FirmAlert(StrErrPrjNotFound.replace("%1", lastname), 'ErrPrjNotFound.pos');
										else
										if ((setPath != undefined) && (fw.setList.selection.index != (StrSetList.length-1)))
										{
											File(setPath + '/' + fw.setList.items[fw.setList.selection.index].text + '.txt').execute();
										}
									};
						
	fw.editBut.helpTip = EditButHelpTip;

	if (!fw.rg.setgroup.showRedFrame3)
		fw.rg.setgroup.showRedFrame3 = fw.rg.setgroup.showRedFrame1;
	
	fw.HelpImgEdit = fw.rg.setgroup.add ("image", [0,0,21,(IsMacOs) ? 22 : 20], ScriptUI.newImage(QuestionImg,QuestionDisableImg,QuestionImg,QuestionImg));
	fw.HelpImgEdit.alignment = ["right","top"];
	fw.HelpImgEdit.minimumSize = fw.HelpImgEdit.maximumSize = [21,(IsMacOs) ? 22 : 20];
	fw.HelpImgEdit.onClick = function() {
							if (!this.enabled) return;

							FirmAlert(StrEditButHlp, '/HelpImgEditBut.pos', StrHelpAddoTittle);
						};
	
	fw.rg.setgroup.onDraw = function()
				{
					if (this.showRedFrame1)
						DrawChildRedFrame(this, fw.showDiskBut, redPen);
				
					if (this.showRedFrame2)
						DrawChildRedFrame(this, fw.setList, redPen);
				
					if (this.showRedFrame3)
						DrawChildRedFrame(this, fw.editBut, redPen);
					
					if (!this.showRedFrame1 && !this.showRedFrame2 && !this.showRedFrame3)
						this.graphics.drawOSControl();
				};

	fw.StaticAdd = fw.rg.add ("statictext", undefined, " ");
	fw.StaticAdd.alignment = ["left","bottom"];
	fw.StaticAdd.minimumSize = fw.StaticAdd.maximumSize = [24,15];

	fw.rg.botgroup = fw.rg.add('group {orientation: "row", alignment: ["fill", "bottom"], margins: [3, 0, 0, 0], spacing : 10}');
	
	fw.butCancel = fw.rg.botgroup.add("button", undefined, StrBut_Cancel);
	fw.butCancel.alignment= ["left", "top"];
	fw.butCancel.justify = 'center';
	fw.butCancel.minimumSize = fw.butCancel.maximumSize = [114,(IsMacOs) ? 22 :20];
	fw.butCancel.onClick = function() 	{
							return fw.close(0);
						};

	fw.butSave = fw.rg.botgroup.add("button", undefined, StrSaveBut);
	fw.butSave.alignment= ["fill", "top"];
	fw.butSave.justify = 'center';
	fw.butSave.minimumSize[1] = fw.butSave.maximumSize[1] = (IsMacOs) ? 22 :20;
	//fw.butSave.enabled = false;
	fw.butSave.onClick = function()
						{
							//var fdst = File(Folder.userData.absoluteURI + DstFileName);
							var fdst = File(File($.fileName).parent.parent.absoluteURI + '/' + DstFileName);
							if (fdst.exists)
								fdst.remove();

								var fsrc;
								if (fw.setList.selection.index == (StrSetList.length-1))
									//fsrc = File(Folder.userData.absoluteURI + DefFileName);
									fsrc = File(File($.fileName).parent.parent.absoluteURI + '/' + DefFileName);
								else 
									fsrc = File(setPath + '/' + fw.setList.items[fw.setList.selection.index].text + '.txt');

								if (fsrc.exists)
								{
									fsrc.copy(fdst.absoluteURI);

									var storf = File(g_dat_folder.absoluteURI + '/' + storFileName);
									storf.encoding = 'UTF-8';
									storf.lineFeed = 'windows';
									storf.open('w');
									storf.write(fw.setList.items[fw.setList.selection.index].text);
									storf.close();
								}

								paramHolder = ph;
								return fw.close(11);
						};

	fw.HelpImgButs = addHelpBut(fw.rg.botgroup, StrButtonsRowHelpTip, 'HelpImgButs.pos', "top");
	fw.HelpImgButs.minimumSize[1] = fw.HelpImgButs.maximumSize[1] = (IsMacOs)? 22: 20;
	
	fw.onShow = function () 
	{
		fw.setList.size.height = (IsMacOs) ? 22 :20;
		fw.butCancel.size.height = (IsMacOs) ? 22 :20;
		fw.butSave.size.height = (IsMacOs) ? 22 :20;		
	}

	return fw.show();
}

//////////////////////////////////////////////////////////////////////////

//// картинки ////////////////

} catch(e) {} // конец глобального try

if (FirmLogoImg != undefined) FirmLogoImg.remove();
if (QuestionImg != undefined) QuestionImg.remove();
if (QuestionDisableImg != undefined) QuestionDisableImg.remove();
if (OpenFldImg != undefined) OpenFldImg.remove();
if (OpenFldDisableImg != undefined) OpenFldDisableImg.remove();
if (PresetControlImg != undefined) PresetControlImg.remove();

}// endif (all_ok)

//////////////////////////////// images //////////////////////////////

function GetPresetControlImg_1()
{
	return "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x1E\x00\x00\x00\x14\b\x06\x00\x00\x00\u009A\u00AB\u008D\u00C4\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x00\x05\u00CEiTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 6.0-c006 79.164648, 2021/01/12-15:52:29        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:photoshop=\"http://ns.adobe.com/photoshop/1.0/\" xmp:CreatorTool=\"Adobe Photoshop 22.2 (Macintosh)\" xmp:CreateDate=\"2021-02-26T15:30:22+03:00\" xmp:MetadataDate=\"2021-02-26T15:30:22+03:00\" xmp:ModifyDate=\"2021-02-26T15:30:22+03:00\" xmpMM:InstanceID=\"xmp.iid:25cc3da1-d3da-4f80-b040-c5c307b6f928\" xmpMM:DocumentID=\"adobe:docid:photoshop:d23a2b64-4ad3-fb40-8da0-99c7b6abf3de\" xmpMM:OriginalDocumentID=\"xmp.did:c98f34fb-40e0-4fe7-92e0-8c142ba745dd\" dc:format=\"image/png\" photoshop:ColorMode=\"3\"> <xmpMM:History> <rdf:Seq> <rdf:li stEvt:action=\"created\" stEvt:instanceID=\"xmp.iid:c98f34fb-40e0-4fe7-92e0-8c142ba745dd\" stEvt:when=\"2021-02-26T15:30:22+03:00\" stEvt:softwareAgent=\"Adobe Photoshop 22.2 (Macintosh)\"/> <rdf:li stEvt:action=\"saved\" stEvt:instanceID=\"xmp.iid:25cc3da1-d3da-4f80-b040-c5c307b6f928\" stEvt:when=\"2021-02-26T15:30:22+03:00\" stEvt:softwareAgent=\"Adobe Photoshop 22.2 (Macintosh)\" stEvt:changed=\"/\"/> </rdf:Seq> </xmpMM:History> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u00FB\u00E9\u00F95\x00\x00\x00gIDATH\rc\u00F8\u00FF\u00FF?\x03\x10\u00A8\u00D1\x19\u0083\u0081\x1A\u00D0\u00F2e@\u00BC\u0084Nx\x19\u00CC\u00F2Q\u008B1\u00B0\u00A3\u00A3\u00E3}|\x18\u00A6\u00EE\u00C4\u0089\x13\u00DB\u0090\u00F9T\u00B1\u0098\u0090O`\u0096\u0082h\u00BAYL\u0082\u00A5\u00D4\u00B3\u0098DK\u00A9c16Ki\x1E\u00C7\u00B8|Js\u008Bq\x05/\u00DDS\u00F5\u00A8\u00C5C\u00DFbR\u00F0h\u00ED4\u00E8,\x1E\u0090\u00A6\x0F\x00\u0096f\u00D7\u0088\u0084\u0092\x15\u00DA\x00\x00\x00\x00IEND\u00AEB`\u0082";
}

function GetPresetControlImg_2()
{
	return "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x1E\x00\x00\x00\x14\b\x06\x00\x00\x00\u009A\u00AB\u008D\u00C4\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x00\x05\u00CEiTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 6.0-c006 79.164648, 2021/01/12-15:52:29        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:photoshop=\"http://ns.adobe.com/photoshop/1.0/\" xmp:CreatorTool=\"Adobe Photoshop 22.2 (Macintosh)\" xmp:CreateDate=\"2021-02-26T15:33:42+03:00\" xmp:MetadataDate=\"2021-02-26T15:33:42+03:00\" xmp:ModifyDate=\"2021-02-26T15:33:42+03:00\" xmpMM:InstanceID=\"xmp.iid:29ef4dc5-fedc-4dbc-8561-12319a607d38\" xmpMM:DocumentID=\"adobe:docid:photoshop:c8ea44d8-db07-7d43-a651-c135753f73e4\" xmpMM:OriginalDocumentID=\"xmp.did:8e110f2c-b296-44cc-9d18-ef3b1b4f4a27\" dc:format=\"image/png\" photoshop:ColorMode=\"3\"> <xmpMM:History> <rdf:Seq> <rdf:li stEvt:action=\"created\" stEvt:instanceID=\"xmp.iid:8e110f2c-b296-44cc-9d18-ef3b1b4f4a27\" stEvt:when=\"2021-02-26T15:33:42+03:00\" stEvt:softwareAgent=\"Adobe Photoshop 22.2 (Macintosh)\"/> <rdf:li stEvt:action=\"saved\" stEvt:instanceID=\"xmp.iid:29ef4dc5-fedc-4dbc-8561-12319a607d38\" stEvt:when=\"2021-02-26T15:33:42+03:00\" stEvt:softwareAgent=\"Adobe Photoshop 22.2 (Macintosh)\" stEvt:changed=\"/\"/> </rdf:Seq> </xmpMM:History> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u00C8(s!\x00\x00\x00gIDATH\rc\u00F8\u00FF\u00FF?\x03\x10\x18\u00D3\x19\u0083\u00811\u00D0\u00F2H \u008E\u00A0\x13\u008E\u0084Y>j1\x06\x16\x15\x15\u00BD\u0087\x0F\u00C3\u00D4\u00CD\u009F?\u00BF\x11\u0099O\x15\u008B\t\u00F9\x04f)\u0088\u00A6\u009B\u00C5$XJ=\u008BI\u00B4\u0094:\x16c\u00B3\u0094\u00E6q\u008C\u00CB\u00A74\u00B7\x18W\u00F0\u00D2=U\u008FZ<\u00F4-&\x05\u008F\u00D6N\u0083\u00CE\u00E2\x01i\u00FA\x00\x00\n\u00A47\u00F4\u009B\u00DE\u00B9C\x00\x00\x00\x00IEND\u00AEB`\u0082";
}

function GetPresetControlImg_3()
{
	return "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x1E\x00\x00\x00\x14\b\x06\x00\x00\x00\u009A\u00AB\u008D\u00C4\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x00\x05\u00CEiTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 6.0-c006 79.164648, 2021/01/12-15:52:29        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:photoshop=\"http://ns.adobe.com/photoshop/1.0/\" xmp:CreatorTool=\"Adobe Photoshop 22.2 (Macintosh)\" xmp:CreateDate=\"2021-02-26T15:36:38+03:00\" xmp:MetadataDate=\"2021-02-26T15:36:38+03:00\" xmp:ModifyDate=\"2021-02-26T15:36:38+03:00\" xmpMM:InstanceID=\"xmp.iid:56f8cd86-7713-491f-b044-5464efe86197\" xmpMM:DocumentID=\"adobe:docid:photoshop:aca99811-d846-444c-90dd-1aa56548653c\" xmpMM:OriginalDocumentID=\"xmp.did:63d0009a-7eb3-43b3-be4a-d48d7fa54025\" dc:format=\"image/png\" photoshop:ColorMode=\"3\"> <xmpMM:History> <rdf:Seq> <rdf:li stEvt:action=\"created\" stEvt:instanceID=\"xmp.iid:63d0009a-7eb3-43b3-be4a-d48d7fa54025\" stEvt:when=\"2021-02-26T15:36:38+03:00\" stEvt:softwareAgent=\"Adobe Photoshop 22.2 (Macintosh)\"/> <rdf:li stEvt:action=\"saved\" stEvt:instanceID=\"xmp.iid:56f8cd86-7713-491f-b044-5464efe86197\" stEvt:when=\"2021-02-26T15:36:38+03:00\" stEvt:softwareAgent=\"Adobe Photoshop 22.2 (Macintosh)\" stEvt:changed=\"/\"/> </rdf:Seq> </xmpMM:History> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\x1F\u00F4|K\x00\x00\x00cIDATH\rc`\x00\u0082\u00FF\u00FF\u00FFK\u00D1\x19C,\x05\u00DA\u00ADFO\f\u00B6s\u00D4bl\u00F8\u00EB\u00D7\u00AFW\u00F0a\u0098\u00BA\u008E\u008E\u008Ehd>U,&\u00A4\x06f)\u0088\u00A6\u009B\u00C5\u00A4XJ5\u008BI\u00B5\u0094*\x16c\u00B3\u0094\u00E6q\u008C\u00CB\u00A74\u00B7\x18W\u00F0\u00D2=U\u008FZ<\u00F4-&\x05\u008F\u00D6N\u0083\u00CE\u00E2\x01i\u00FA\x00\x003j\"\x02\x04\f\u00FC\u008C\x00\x00\x00\x00IEND\u00AEB`\u0082";
}

function GetPresetControlImg_4()
{
	return "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x1E\x00\x00\x00\x14\b\x06\x00\x00\x00\u009A\u00AB\u008D\u00C4\x00\x00\x00\tpHYs\x00\x00\x0B\x13\x00\x00\x0B\x13\x01\x00\u009A\u009C\x18\x00\x00\x05\u00CEiTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 6.0-c006 79.164648, 2021/01/12-15:52:29        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stEvt=\"http://ns.adobe.com/xap/1.0/sType/ResourceEvent#\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:photoshop=\"http://ns.adobe.com/photoshop/1.0/\" xmp:CreatorTool=\"Adobe Photoshop 22.2 (Macintosh)\" xmp:CreateDate=\"2021-02-26T15:39:33+03:00\" xmp:MetadataDate=\"2021-02-26T15:39:33+03:00\" xmp:ModifyDate=\"2021-02-26T15:39:33+03:00\" xmpMM:InstanceID=\"xmp.iid:ad1c583a-fcec-4909-a816-42b4960c2420\" xmpMM:DocumentID=\"adobe:docid:photoshop:709e4731-0156-974a-8b46-1cd7efb02418\" xmpMM:OriginalDocumentID=\"xmp.did:25a7feb4-7ca6-4673-9806-f305bacef6fc\" dc:format=\"image/png\" photoshop:ColorMode=\"3\"> <xmpMM:History> <rdf:Seq> <rdf:li stEvt:action=\"created\" stEvt:instanceID=\"xmp.iid:25a7feb4-7ca6-4673-9806-f305bacef6fc\" stEvt:when=\"2021-02-26T15:39:33+03:00\" stEvt:softwareAgent=\"Adobe Photoshop 22.2 (Macintosh)\"/> <rdf:li stEvt:action=\"saved\" stEvt:instanceID=\"xmp.iid:ad1c583a-fcec-4909-a816-42b4960c2420\" stEvt:when=\"2021-02-26T15:39:33+03:00\" stEvt:softwareAgent=\"Adobe Photoshop 22.2 (Macintosh)\" stEvt:changed=\"/\"/> </rdf:Seq> </xmpMM:History> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>(H\x7FH\x00\x00\x00cIDATH\rc`\x00\u0082\u00FF\u00FF\u00FFK\u00D1\x19C,\x05\u00DA\u00ADFO\f\u00B6s\u00D4bl\u00F8\u00EB\u00D7\u00AFW\u00F0a\u0098\u00BA\u008E\u008E\u008Ehd>U,&\u00A4\x06f)\u0088\u00A6\u009B\u00C5\u00A4XJ5\u008BI\u00B5\u0094*\x16c\u00B3\u0094\u00E6q\u008C\u00CB\u00A74\u00B7\x18W\u00F0\u00D2=U\u008FZ<\u00F4-&\x05\u008F\u00D6N\u0083\u00CE\u00E2\x01i\u00FA\x00\x003j\"\x02\x04\f\u00FC\u008C\x00\x00\x00\x00IEND\u00AEB`\u0082";
}
