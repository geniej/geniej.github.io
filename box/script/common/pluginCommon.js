var OFPlugin;
if (!OFPlugin) OFPlugin = {};

/**
 * native app 의 실행, 검색, 종료기능등을 담는다.
 */
OFPlugin.app = {};

/**
 * 앱 실행시키기
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.app.start = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, 'OFAppManager', 'startApp', callerID, singleton, params);
};

/**
 * 앱 설치유무
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.app.search = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, 'OFAppManager', 'searchApp', callerID, singleton, params);
};

/**
 * 앱 종료
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.app.close = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, 'OFAppManager', 'appClose', callerID, singleton, params);
};

/**
 * 웹 실행시키기
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.app.startWeb = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, 'OFAppManager', 'startWeb', callerID, singleton, params);
};

/**
 * 전역 데이타를 관리한다.
 */
OFPlugin.global = {};

/**
 * 전역 데이타의 일반 데이타(휘발유성) 관리한다.
 */
OFPlugin.global.variable = {};

/**
 * 전역데이터 저장
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.global.variable.setValue = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFGlobalVariables", "setValue", callerID, singleton, params);
}

/**
 * 전역데이터 관련 값 가져오기
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.global.variable.get = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFGlobalVariables", "getValue", callerID, singleton, params);
}

/**
 * 전역데이터 해당 키에 대한 값 가져오기
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.global.variable.getValue = function(callback, params, singleton, callerID) {
	var sendParam = {
		"type": "value",
		"params": params
	}

	OFPlugin.global.variable.get(callback, sendParam, singleton, callerID);
}

/**
 * 전역데이터 키 목록 가져오기
 * 
 * @param callback
 * @param singleton
 * @param callerID
 */
OFPlugin.global.variable.getKeys = function(callback, singleton, callerID) {
	var sendParam = {
		"type": "key"
	}

	OFPlugin.global.variable.get(callback, sendParam, singleton, callerID);
}

/**
 * 전역데이터 데이타 가져오기
 * 
 * @param callback
 * @param singleton
 * @param callerID
 */
OFPlugin.global.variable.getAll = function(callback, singleton, callerID) {
	var sendParam = {
		"type": "all"
	}

	OFPlugin.global.variable.get(callback, sendParam, singleton, callerID);
}

/**
 * 전역데이터 삭제
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.global.variable.remove = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFGlobalVariables", "remove", callerID, singleton, params);
}

/**
 * 전역 데이타의 Preference or KeyChain을 관리한다.
 */
OFPlugin.global.pref = {};

/**
 * Preference or KeyChain 저장
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.global.pref.setValue = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFUserPreference", "setValue", callerID, singleton, params);
}

/**
 * Preference or KeyChain 관련 값 가져오기
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.global.pref.get = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFUserPreference", "getValue", callerID, singleton, params);
}

/**
 * Preference or KeyChain 가져오기
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.global.pref.getValue = function(callback, params, singleton, callerID) {
	var sendParam = {
		"type": "value",
		"params": params
	}

	OFPlugin.global.pref.get(callback, sendParam, singleton, callerID);
}

/**
 * Preference or KeyChain 키 목록 가져오기
 * 
 * @param callback
 * @param singleton
 * @param callerID
 */
OFPlugin.global.pref.getKeys = function(callback, singleton, callerID) {
	var sendParam = {
		"type": "key"
	}

	OFPlugin.global.pref.get(callback, sendParam, singleton, callerID);
}

/**
 * Preference or KeyChain 데이타 가져오기
 * 
 * @param callback
 * @param singleton
 * @param callerID
 */
OFPlugin.global.pref.getAll = function(callback, singleton, callerID) {
	var sendParam = {
		"type": "all"
	}

	OFPlugin.global.pref.get(callback, sendParam, singleton, callerID);
}

/**
 * Preference or KeyChain 삭제
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.global.pref.remove = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFUserPreference", "remove", callerID, singleton, params);
}

/**
 * native device 정보들을 관리한다.
 */
OFPlugin.device = {};

/**
 * Get Device Info
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.device.getInfo = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	params = {};

	OF.exec(callback, "OFSystemInfoManager", "getSystemInfo", callerID, singleton, params);
}

/**
 * Clipboard 정보들을 관리한다.
 */
OFPlugin.clipboard = {};

/**
 * 클립보드 데이터 저장하기
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.clipboard.setText = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFClipboard", "setText", callerID, singleton, params);
}

/**
 * 클립보드 데이터 가져오기
 * 
 * @param callback
 * @param singleton
 * @param callerID
 */
OFPlugin.clipboard.getText = function(callback, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFClipboard", "getText", callerID, singleton, []);
}

/**
 * sms 정보들을 관리한다.
 */
OFPlugin.sms = {};

/**
 * SMS 검색하기
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.sms.search = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFSMS", "search", callerID, singleton, params);
}

/**
 * SMS 보내기
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.sms.send = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFSMS", "sendSMS", callerID, singleton, params);
}

/**
 * SMS 보내기
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.sms.sendUI = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFSMS", "sendSMSUI", callerID, singleton, params);
}

/**
 * SMS startReceiver
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.sms.startReceiver = function(callback, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFSMS", "startSMSReceiver", callerID, singleton, {});
}

/**
 * SMS stopReceiver
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.sms.stopReceiver = function(callback, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFSMS", "stopSMSReceiver", callerID, singleton, {});
}

/**
 * camera 에 관련된 기능들을 담당한다.
 */
OFPlugin.camera = {};

/**
 * Get Picture
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.camera.getPicture = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFCamera", "getPicture", callerID, singleton, params);
}

/**
 * Get Business Card Info
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.camera.getBusinessCardInfo = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}
	if (isEmptyValue(params)) {
		params = {};
	}

	OF.exec(callback, "OFBusinessCard", "getInfo", callerID, singleton, params);
}

/**
 * 이미지업로드(N)
 * 
 * @param callback
 * @param params
 * @param singleton
 * @param callerID
 */
OFPlugin.camera.getImages = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFAlbums", "getImages", callerID, singleton, params);
}

/**
 * qrcode 에 관련된 기능들을 담당한다.
 */
OFPlugin.qrcode = {};

OFPlugin.qrcode.scan = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFQrCode", "scan", callerID, singleton, params);
}

/**
 * bcr 에 관련된 기능들을 담당한다.
 */
OFPlugin.bcr = {};

OFPlugin.bcr.scan = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFBcr", "scan", callerID, singleton, params);
}

/**
 * 로그인
 */
OFPlugin.auth = {};

OFPlugin.auth.login = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFIBKLogin", "startBoxLogin", callerID, singleton, params);
}

/**
 * 공인인증서
 */
OFPlugin.cert = {};

OFPlugin.cert.startCertCenter = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFCertCenter", "startCertCenter", callerID, singleton, {});
}

OFPlugin.cert.getSign = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFCertCenter", "getSign", callerID, singleton, params);
}

OFPlugin.cert.getSignDetached = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFCertCenter", "getSignDetached", callerID, singleton, params);
}

OFPlugin.cert.getVIDCheck = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFCertCenter", "getVIDCheck", callerID, singleton, params);
}


OFPlugin.cert.getList = function(callback, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFCertCenter", "getList", callerID, singleton, {});
}

OFPlugin.cert.getData = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFCertCenter", "getData", callerID, singleton, params);
}


/**
 * 키패드
 */
OFPlugin.keypad = {};

OFPlugin.keypad.getSecPad = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFKeySec", "getSecPad", callerID, singleton, params);
}

/**
 * 네비게이터, 툴바, 전체메뉴호출 유틸리티
 */
OFPlugin.menu = {};

OFPlugin.menu.callNavigator = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFIBKNavigator", "callNavigator", callerID, singleton, params);
}

OFPlugin.menu.callGNB = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFIBKNavigator", "callGNB", callerID, singleton, params);
}

OFPlugin.menu.callToolbar = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFIBKToolbar", "callToolbar", callerID, singleton, params);
}

OFPlugin.menu.setToolbar = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFIBKToolbar", "setToolbar", callerID, singleton, params);
}








/**
 * sign detached
 */
OFPlugin.cert.getSignDetached = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFCertCenter", "getSignDetached", callerID, singleton, params);
}

/**
 * status bar 칼라 지정
 */
OFPlugin.menu.setStatusBarColor = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFIBKNavigator", "setStatusBarColor", callerID, singleton, params);
}

/**
 * ibk util
 */
OFPlugin.Utils = {};

/**
 * 카드 리스트
 */
OFPlugin.Utils.callCardList = function(callback, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFIBKUtil", "callCardList", callerID, singleton, {});
}

/**
 * 비밀번호 변경
 */
OFPlugin.Utils.resetPassword = function(callback, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFIBKUtil", "resetPassword", callerID, singleton, {});
}

/**
 * 회원 가입
 */
OFPlugin.Utils.joinMember = function(callback, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFIBKUtil", "joinMember", callerID, singleton, {});
}

/**
 * 아이디 찾기
 */
OFPlugin.Utils.findId = function(callback, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFIBKUtil", "findId", callerID, singleton, {});
}

/**
 * 파일 다운로드
 */
OFPlugin.Utils.fileDownload = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFIBKUtil", "fileDownload", callerID, singleton, params);
}

/**
 * 핸드폰 본인인증 성공여부 
 */
OFPlugin.Utils.callbackHpAuthorize = function(callback, params, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFIBKUtil", "CallbackHpAuthorize", callerID, singleton, params);
}


OFPlugin.auth.getLoaded = function(callback, singleton, callerID) {
	if (isEmptyValue(callerID)) {
		callerID = 0;
	}
	if (isEmptyValue(singleton)) {
		singleton = false;
	}

	OF.exec(callback, "OFIBKLogin", "getLoaded", callerID, singleton, {});
}