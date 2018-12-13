/************************************************
 * webview1.js
 * Created at 2018. 10. 19. 오전 10:06:09.
 *
 * @author ljy
 ************************************************/
function ofReady(params, direction) {
	console.log("ofReady param = " + JSON.stringify(params, null, 4) + " / direction = " + direction);

}

/*
 * "webview_1" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	backPressed();
}

/*
 * Body에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit( /* cpr.events.CEvent */ e) {
	setNowPage(app);
}

/*
 * "history 3 호출" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick2( /* cpr.events.CMouseEvent */ e) {
	/** 
	 * @type cpr.controls.Button
	 */
	var button = e.control;

	var param = {
		url: "app/example/History3",
		parameter: {
			"exbuilder_uuid": app.uuid
		}
	};

	OFHistory.go(param);
}