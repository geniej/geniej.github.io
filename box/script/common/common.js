/********************************************************************
 * @업무명		: 	공통
 * @설명			:	공통스크립트 작성
 * @파일명		:	common.js
 * @기존명		:
 *********************************************************************
 * 번호	작업자	작업일		변경내용
 *--------------------------------------------------------------------
 * 1    박현일	2018-08-24	최초작성
 *********************************************************************/
// 기존 방식 root 경로 때문에 사용
// exBuilder 는 env.json 의 runtime-lib 에서 패키지를 관리하기에 사용하지 않음
//var contextRoot = "/orchestra_sample"

/**
 * android 에서 백버튼(하드키) 눌렀을 때 호출
 * eXbuilder 특성 상 마직막 스탭은 -2 를 해줘야 해서 따로 만듬
 * 
 * @param history
 */
onHistoryList = function(history) {
	if (history.result.index > 1) {
		OFHistory.go(-1);
	} else {
		OFHistory.go(-2);
	}
};

/**
 * history back 할 시 index 제약 추가
 * step 이 -1인 경우에만 사용
 * 
 * @param history
 */
onHistoryBack = function(history) {
	if (history.result.index > 1) {
		OFHistory.go(-1);
	}
};

/**
 * 웹에서 back 시 호출
 */
function backPressed(step) {
//	
//	   try {
               
  				if (!step) {
					step = -1;
				}
				
				if (getUserAgent() != "else") {
					if (step == -1) {
						OFHistory.list(onHistoryBack);
					} else {
						OFHistory.go(step);
					}
				} else {
					OFHistory.go(step);
				}

	
	         
//    } catch (e) {
//    
//        
//        	alert("***** backPressed  e.message********>"+  e.message);
//    }

	
	
	
	
}

/**
 * native 의 back 키 클릭 시 호출된다.
 * 
 * todo : app 객체 인식 시켜야 함
 */
function ofBackPressed() {
	//	alert("onBackPressed");

	//	OFHistory.listAll(onHistoryListAll);

	OFHistory.list(onHistoryList);

}

/**
 * 페이지 이동시 호출된다.
 * 웹인 경우 orchestra_framework.js 파일에서 호출되고,
 * 앱인 경우 native 를 거쳐 호출된다.
 * 
 * @param param
 */
function ofMovePage(param) {
	
	

   var movePage = param.url;

	    if(movePage.indexOf("html") != -1 ) {
		    
		    
	        movePage = movePage;
	        
	       //alert("html++++"+movePage  );

        //  window.location = movePage;

         window.location = "/index.html";
	
		 
	 }
	 else {

	
	
	 try
	 {
	
	
	
	cpr.core.App.load(param.url, function(loadedApp) {
		if (loadedApp) {
			var disposeApp;

			if (getUserAgent() == "else") {
				//				var history = localStorage.getItem("history");
				//
				//				history = JSON.parse(history)
				//				switch (history.direction) {
				//					case "forward":
				//						disposeApp = cpr.core.Platform.INSTANCE.lookupByUUID(param.parameter.exbuilder_uuid);
				//
				//						break;
				//					case "backward":
				//						var uuid = getLastPage();
				//
				//						if (uuid) {
				//							disposeApp = cpr.core.Platform.INSTANCE.lookupByUUID(uuid);
				//						}
				//
				//						break;
				//				}

				var uuid = getLastPage();

				if (uuid) {
					disposeApp = cpr.core.Platform.INSTANCE.lookupByUUID(uuid);
				}
			} else {
				//				disposeApp = cpr.core.Platform.INSTANCE.lookupByUUID(param.parameter.exbuilder_uuid);

				var uuid = getLastPage();

				if (uuid) {
					disposeApp = cpr.core.Platform.INSTANCE.lookupByUUID(uuid);
				}
			}
			

			if (disposeApp) {
				disposeApp.dispose();
			}

			loadedApp.createNewInstance().run();
		}
	});
	
	
	   } catch (e) {
                  
                  
                  alert( e.message ) ;
       }
	
	}
	
}

/**
 * 현제 페이지의 uuid 를 저장한다.
 * 
 * @param app
 */
function setNowPage(app) {
	if (app) {
		var page = localStorage.getItem("page");

		if (!page) {
			page = {
				"uuid": app.uuid
			}
		} else {
			page = JSON.parse(page)

			page.uuid = app.uuid;
		}

		localStorage.setItem("page", JSON.stringify(page));
	}
}

/**
 * 마지막 페이지의 uuid 를 반환한다.
 */
function getLastPage() {
	var page = localStorage.getItem("page");

	if (!page) {
		return "";
	}

	page = JSON.parse(page)

	return page.uuid;
}