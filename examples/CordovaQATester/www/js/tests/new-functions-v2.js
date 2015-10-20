testManager.addTest({
	label: "AAA V2 New functions ",
	timeout: 50000,
	canRunTest: function(){
		if(!proxyCreated)
			return ["No proxy created"];
		
		if(!proxyConnected)
			return ["No proxy connection"];
		
		if(!initialized)
			return ["Proxy not opt'ed in"];
		
		if(hmiLevel != "FULL") { //SdlCordova.Names.HMILevel.FULL){
			return ["Application must be in HMI Level = FULL"];
		}
		
		return null;
	},
	run: function(){
		/* AddCommand
			new parameters: cmdIcon
		*/
		var cmd = new SdlCordovaFactory.AddCommand();
		cmd.setCorrelationId(++nextCorrelationId);
		cmd.setSuccess(function(){
			prependLog("cmd sent successfully " + cmd.getCorrelationId());
		});
		cmd.setError(function(e){
			prependLogError("cmd send error " + e);
		});
		cmd.setCmdId(101);
		cmd.setMenuName("Test Icon in command");
		cmd.setCmdIcon(new SdlCordova.Image("0x62", SdlCordova.names.imagetype_static));
		//cmd.setCmdIcon(new SdlCordova.Image("action.jpg", SdlCordova.names.imagetype_dynamic));
		cmd.setPosition(0);
		//sendRPC(cmd);
		
		/* Alert
			new parameters: alertText3, softButtons
			new parameters in response: tryAgainTime
		*/
		var alert = new SdlCordovaFactory.Alert();
		alert.setCorrelationId(++nextCorrelationId);
		alert.setSuccess(function(){
			prependLog("alert sent successfully " + alert.getCorrelationId());
		});
		alert.setError(function(e){
			prependLogError("alert send error " + e);
		});
		alert.setAlertText("Testing", "Third", "Line");
		alert.setPlayTone(true);
		alert.addSoftButton(new SdlCordova.SoftButton(false, 1, SdlCordova.names.action_DEFAULT_ACTION, "Alert", SdlCordova.names.softButtonType_TEXT));
		alert.addSoftButton(new SdlCordova.SoftButton(true, 2, SdlCordova.names.action_STEAL_FOCUS, "", SdlCordova.names.softButtonType_IMAGE, new SdlCordova.Image("0x62", SdlCordova.names.imagetype_static)));
		alert.setTTSText("Testing third line");
		alert.setDuration(8000);
		//sendRPC(alert);

		/* SetGlobalProperties
			new parameters: vrHelpTitle, vrHelp, menuTitle, menuIcon, keyboardProperties
		*/
		var globalProps = new SdlCordovaFactory.SetGlobalProperties();
		globalProps.setCorrelationId(++nextCorrelationId);
		globalProps.setSuccess(function(){
			prependLog("globalProps sent successfully " + globalProps.getCorrelationId());
		});
		globalProps.setError(function(e){
			prependLogError("globalProps send error " + e);
		});
		globalProps.setHelpPromptTTSText("This is the global help text");
		globalProps.setTimeoutPromptTTSText("this is the global timeout text");
		globalProps.setVrHelpTitle("This is global VR help");
		globalProps.addVrHelp(new SdlCordova.VrHelpItem(1, "VR Help Item1", new SdlCordova.Image("0x62", SdlCordova.names.imagetype_static)));
		globalProps.setMenuTitle("This is global help menu title");
		globalProps.setMenuIcon(new SdlCordova.Image("0x62", SdlCordova.names.imagetype_static));
		//generate INVALID_DATA error
		//globalProps.setKeyboardProperties(new SdlCordova.KeyboardProperties("SINGLE_KEYPRESS", "QWERTY", ["&", "/"], "Completed", "EN_US")); 
		//sendRPC(globalProps);
		
		/* Show
			new parameters: mainField3, mainField4, graphic, softButtons, customPresets
		*/
		var show = new SdlCordovaFactory.Show();
		show.setCorrelationId(++nextCorrelationId);
		show.setSuccess(function(){
			prependLog("show sent successfully " + show.getCorrelationId());
		});
		show.setError(function(e){
			prependLogError("show send error" + e);
		});		
		show.setDisplayText("Testing in", "Progress", "Thrid line", "Forth line"); 
		show.setTextAlignment(SdlCordova.names.alignment_left);
		show.addSoftButton(new SdlCordova.SoftButton(false, 1, SdlCordova.names.action_DEFAULT_ACTION, "Show", SdlCordova.names.softButtonType_TEXT));
		show.addSoftButton(new SdlCordova.SoftButton(true, 2, SdlCordova.names.action_STEAL_FOCUS, "", SdlCordova.names.softButtonType_IMAGE, new SdlCordova.Image("0x62", SdlCordova.names.imagetype_static)));
		show.setGraphic(new SdlCordova.Image("0x62", SdlCordova.names.imagetype_static));
		show.setCustomPresets(["Show 1", "Show 2"]);
		//sendRPC(show);
		
		/* PerformInteraction
			new parameters: vrHelp, interactionLayout
			new parameters in response: manualTextEntry
		*/
		//choice set
		var choiceSet = new SdlCordovaFactory.CreateInteractionChoiceSet();
		choiceSet.setCorrelationId(++nextCorrelationId);
		choiceSet.setSuccess(function(){
			prependLog("choiceSet sent successfully " + choiceSet.getCorrelationId());
		});
		choiceSet.setError(function(e){
			prependLogError("choiceSet send error " + e);
		});
		choiceSet.setInteractionChoiceSetId(1);
		choiceSet.addChoice(new SdlCordova.Choice(1, "choice 1", ["choice 1"]));
		choiceSet.addChoice(new SdlCordova.Choice(2, "choice 2", ["choice 2"]));
		choiceSet.addChoice(new SdlCordova.Choice(3, "choice 3", ["sandwich", "meatloaf"]));
		//sendRPC(choiceSet);
		
		//perform interaction
		var interaction = new SdlCordovaFactory.PerformInteraction();
		interaction.setCorrelationId(++nextCorrelationId);
		interaction.setSuccess(function(){
			prependLog("interaction sent successfully " + interaction.getCorrelationId());
		});
		interaction.setError(function(e){
			prependLogError("interaction send error " + e);
		});
		interaction.setInitialText("This is an interaction");
		interaction.setInteractionChoiceSetIDList(1);
		interaction.setInteractionMode(SdlCordova.names.interactionMode_BOTH);
		interaction.setHelpPromptTTSText("This is the help text");
		interaction.setTTSText("This is the initial text"); //was added for debug, initialPrompt is required?
		interaction.setTimeoutPromptTTSText("Answer timeout");
		interaction.setTimeout(8000);
		interaction.setInitialText("This is a perform interaction");
		interaction.addVrHelp(new SdlCordova.VrHelpItem(1, "Interaction VR Help Item1", new SdlCordova.Image("0x62", SdlCordova.names.imagetype_static)));
		interaction.setInteractionLayout("LIST_WITH_SEARCH");
		//add interaction after choice set
		SdlCordovaFactory.onCorrelationId(choiceSet.getCorrelationId(), function(){
			//sendRPC(interaction);
		});
		
		/* EndAudioPassThru
			new API
		*/
		var endAudio = new SdlCordovaFactory.EndAudioPassThru();
		endAudio.setCorrelationId(++nextCorrelationId);
		endAudio.setSuccess(function(){
			prependLog("endAudio sent successfully " + endAudio.getCorrelationId());
		});
		endAudio.setError(function(e){
			prependLogError("endAudio send error " + e);
		});
		//sendRPC(endAudio);
		
		/* PerformAudioPassThru
			new API
		*/
		var performAudio = new SdlCordovaFactory.PerformAudioPassThru();
		performAudio.setCorrelationId(++nextCorrelationId);
		performAudio.setSuccess(function(){
			prependLog("performAudio sent successfully " + performAudio.getCorrelationId());
		});
		performAudio.setError(function(e){
			prependLogError("performAudio send error" + e);
		});	
		performAudio.setMaxDuration(30000);
		performAudio.setAudioPassThruDisplayText("Test Audio Pass Through", "Second line");
		performAudio.setInitialText("This is PerformAudio initial text.");
		performAudio.setSamplingRate("16KHZ");
		performAudio.setAudioType("PCM");
		performAudio.setBitsPerSample("8_BIT");
		performAudio.setFilename("/storage/emulated/0/SYNC/myaudio2.pcm");
		SdlCordovaFactory.onCorrelationId(performAudio.getCorrelationId(), function(info){
			prependLog(info);
			//sendRPC(endAudio);
		});	
		sendRPC(performAudio);
		
		/* SubscribeVehicleData
			new API
		*/
		var subscribe = new SdlCordovaFactory.SubscribeVehicleData();
		subscribe.setCorrelationId(++nextCorrelationId);
		subscribe.setSuccess(function(){
			prependLog("subscribe sent successfully " + subscribe.getCorrelationId());
		});
		subscribe.setError(function(e){
			prependLogError("subscribe send error " + e);
		});
		subscribe.setSpeed(true);
		//sendRPC(subscribe);
		
		/* UnsubscribeVehicleData
			new API
		*/
		var unsubscribe = new SdlCordovaFactory.UnsubscribeVehicleData();
		unsubscribe.setCorrelationId(++nextCorrelationId);
		unsubscribe.setSuccess(function(){
			prependLog("unsubscribe sent successfully " + unsubscribe.getCorrelationId());
		});
		unsubscribe.setError(function(e){
			prependLogError("unsubscribe send error " + e);
		});
		unsubscribe.setSpeed(true);
		SdlCordovaFactory.onCorrelationId(subscribe.getCorrelationId(), function(){
			//sendRPC(unsubscribe);
		});	
		//sendRPC(subscribe);
		
		/* GetVehicleData
			new API
		*/
		var getdata = new SdlCordovaFactory.GetVehicleData();
		getdata.setCorrelationId(++nextCorrelationId);
		getdata.setSuccess(function(){
			prependLog("getdata sent successfully " + getdata.getCorrelationId());
		});
		getdata.setError(function(e){
			prependLogError("getdata send error " + e);
		});
		//getdata.setGps(true);  //invalid
		getdata.setSpeed(true); //ok
		getdata.setRpm(true); //ok
		//getdata.setFuelLevel(true); //VEHICLE_DATA_NOT_AVAILABLE
		getdata.setFuelLevel_State(true); //ok
		//getdata.setInstantFuelConsumption(true); //VEHICLE_DATA_NOT_AVAILABLE
		getdata.setExternalTemperature(true); //ok
		getdata.setVin(true); //ok
		getdata.setPrndl(true); //ok
		//getdata.setTirePressure(true); //VEHICLE_DATA_NOT_AVAILABLE
		//getdata.setOdometer(true); //VEHICLE_DATA_NOT_AVAILABLE
		//getdata.setBeltStatus(true); //VEHICLE_DATA_NOT_AVAILABLE
		getdata.setBodyInformation(true); //ok 
		//getdata.setDeviceStatus(true); //VEHICLE_DATA_NOT_AVAILABLE
		//getdata.setECallInfo(true);  disallowed
		//getdata.setAirbagStatus(true);  disallowed
		//getdata.setEmergencyEvent(true);  disallowed
		//getdata.setClusterModeStatus(true);  disallowed
		getdata.setMyKey(true); //ok
		//getdata.setDriverBraking(true); //VEHICLE_DATA_NOT_AVAILABLE
		getdata.setEngineTorque(true); //ok
		//getdata.setWiperStatus(true); //VEHICLE_DATA_NOT_AVAILABLE
		getdata.setHeadLampStatus(true); //ok
		//getdata.setAccPedalPosition(true); //VEHICLE_DATA_NOT_AVAILABLE
		//getdata.setSteeringWheelAngle(true); //VEHICLE_DATA_NOT_AVAILABLE
		//sendRPC(getdata);
		
		/* ReadDID
			new API
		*/
		var readDid = new SdlCordovaFactory.ReadDID();
		readDid.setCorrelationId(++nextCorrelationId);
		readDid.setSuccess(function(){
			prependLog("readDid sent successfully " + readDid.getCorrelationId());
		});
		readDid.setError(function(e){
			prependLogError("readDid send error " + e);
		});
		readDid.setEcuName(2000);
		readDid.setDidLocation([56832]);
		//sendRPC(readDid);
		
		/* GetDTCs
			new API
		*/
		var dtc = new SdlCordovaFactory.GetDTCs();
		dtc.setCorrelationId(++nextCorrelationId);
		dtc.setSuccess(function(){
			prependLog("dtc sent successfully " + dtc.getCorrelationId());
		});
		dtc.setError(function(e){
			prependLogError("dtc send error " + e);
		});
		dtc.setDtcMask(2);
		dtc.setEcuName(2000);
		//sendRPC(dtc);
		
		/* ScrollableMessage
			new API
		*/
		var scroll = new SdlCordovaFactory.ScrollableMessage();
		scroll.setCorrelationId(++nextCorrelationId);
		scroll.setSuccess(function(){
			prependLog("scroll sent successfully " + scroll.getCorrelationId());
		});
		scroll.setError(function(e){
			prependLogError("scroll send error " + e);
		});
		scroll.setScrollableMessageBody("This is a scrollable Message Body!\nThis is a scrollable Message Body!\nThis is a scrollable Message Body! ");
		scroll.setTimeout(30000);
		scroll.addSoftButton(new SdlCordova.SoftButton(false, 1, SdlCordova.names.action_DEFAULT_ACTION, "Reply", SdlCordova.names.softButtonType_TEXT)); 
		//sendRPC(scroll);
		
		/* Slider
			new API
		*/
		var slider = new SdlCordovaFactory.Slider();
		slider.setCorrelationId(++nextCorrelationId);
		slider.setSuccess(function(){
			prependLog("slider sent successfully " + slider.getCorrelationId());
		});
		slider.setError(function(e){
			prependLogError("slider send error " + e);
		});
		slider.setNumTicks(2);
		slider.setPosition(1);
		slider.setSliderHeader("Slider Test Header");
		slider.addSliderFooter("Footer1");
		slider.addSliderFooter("Footer2");
		//sendRPC(slider);
		
		/* ChangeRegistration
			new API
		*/
		var change = new SdlCordovaFactory.ChangeRegistration();
		change.setCorrelationId(++nextCorrelationId);
		change.setSuccess(function(){
			prependLog("change sent successfully " + change.getCorrelationId());
		});
		change.setError(function(e){
			prependLogError("change send error " + e);
		});
		change.setLanguage("FR-CA");
		change.setHmiDisplayLanguage("FR-CA");
		change.setAppName("CordovaTester2");
		//sendRPC(change);
		
		/* DeleteFile
			new API
		*/
		var deleteFile = new SdlCordovaFactory.DeleteFile();
		deleteFile.setCorrelationId(++nextCorrelationId);
		deleteFile.setSuccess(function(){
			prependLog("deleteFile sent successfully " + deleteFile.getCorrelationId());
		});
		deleteFile.setError(function(e){
			prependLogError("deleteFile send error " + e);
		});
		deleteFile.setSdlFileName("action.jpg");
		
		/* ListFiles
			new API
		*/
		var listFiles = new SdlCordovaFactory.ListFiles();
		listFiles.setCorrelationId(++nextCorrelationId);
		listFiles.setSuccess(function(){
			prependLog("listFiles sent successfully " + listFiles.getCorrelationId());
		});
		listFiles.setError(function(e){
			prependLogError("listFiles send error " + e);
		});
		
		/* PutFile
			new API
		*/
		if(deviceType == "Android"){
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
			function gotFS(fileSystem) {
				fileSystem.root.getFile("action.jpg", null, gotFileEntry, failLocalFile);
			}
		}
		else if(deviceType == "iPhone" || deviceType == "iPad"){
			window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "www/img/action.jpg", gotFileEntry, failLocalFile);
		}
		else{ //platform not supported
		}

		function gotFileEntry(fileEntry) {
			fileEntry.file(gotFile, failFileEntry);
		}

		function gotFile(file){
			var reader = new FileReader();

				reader.onloadend = function(evt) {
					try{
						var put = new SdlCordovaFactory.PutFile();
						console.log("new putfile created");
						put.setCorrelationId(++nextCorrelationId);
						put.setSuccess(function(){
							prependLog("put sent successfully " + put.getCorrelationId());
						});
						put.setError(function(e){
							prependLogError("put send error " + e);
						});
						put.setSdlFileName("action.jpg");
						put.setFileType("GRAPHIC_JPEG");
						put.setFileData(evt.target.result);
						SdlCordovaFactory.onCorrelationId(put.getCorrelationId(), function(info){
							prependLog(info);
							//prependLog("send deleteFile");
							//sendRPC(deleteFile);
							//prependLog("send listFiles");
							//sendRPC(listFiles);
							//prependLog("send add command 2");
							//sendRPC(cmd2);
						});
						//sendRPC(put);
					} catch(err){
						console.log("[ERROR]: " + err);
					}
				}
				reader.readAsDataURL(file);
		}

		function fail(evt) {
			console.log(evt.target.error.code);
		}
		function failLocalFile(evt){
			console.log("[ERROR]: Fail Local File");
			console.log(evt.target.error.code);
		}
		function failFileEntry(evt){
			console.log("[ERROR]: Fail File Entry");
			console.log(evt.target.error.code);
		}
		
		/* SetAppIcon
			new API
		*/
		var setAppIcon = new SdlCordovaFactory.SetAppIcon();
		setAppIcon.setCorrelationId(++nextCorrelationId);
		setAppIcon.setSuccess(function(){
			prependLog("setAppIcon sent successfully " + setAppIcon.getCorrelationId());
		});
		setAppIcon.setError(function(e){
			prependLogError("setAppIcon send error " + e);
		});
		setAppIcon.setSdlFileName("action.jpg");
		//sendRPC(setAppIcon);
		
		/* SetDisplayLayout
			new API
		*/
		var layout = new SdlCordovaFactory.SetDisplayLayout();
		layout.setCorrelationId(++nextCorrelationId);
		layout.setSuccess(function(){
			prependLog("layout sent successfully " + layout.getCorrelationId());
		});
		layout.setError(function(e){
			prependLogError("layout send error " + e);
		});
		layout.setDisplayLayout("DEFAULT");
		//sendRPC(layout);
	
		if(rpcSendErrorCount == 0 && responseErrorCount == 0){ // test passed
			var show2 = new SdlCordovaFactory.Show();
			show2.setCorrelationId(++nextCorrelationId);
			show2.setSuccess(function(){
				prependLog("show2 sent successfully " + show2.getCorrelationId());
			});
			show2.setError(function(e){
				prependLogError("show2 send error " + e);
			});			
			show2.setDisplayText("Test", "Complete", "", "");
			show2.setTextAlignment(SdlCordova.names.alignment_center);		
			sendRPC(show2);
			
			testManager.pass();
		}
	}
});