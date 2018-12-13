/*
****************************************************************************
* project       : STAX_Mobile
* descript      : javascript for http Connection
* filename      : httpClient.js
****************************************************************************
*/

function SendHttpData(callback, type,  path, params) {

    var serverDomain = wscommon.getDomain();
    if (serverDomain) {

        var formData = {
            dataType    : type,
            params      : encodeURIComponent( JSON.stringify(params))
            //encodeURIComponent( dataType == 0 ? params:JSON.stringify(params))
        };

        //alert(serverDomain+path+ JSON.stringify(formData) );

        jQuery.ajax({
            url: serverDomain+path,
            type: 'POST',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function(res) {
                // instanceId, sequenceId, cookie setting
//          wscommon.setInstanceID(res.instanceId);
//          wscommon.setSequenceId(res.sequenceId);
//          wscommon.setCookie(res.cookie);
                if (callback) callback(res);
            },
            error: function(xhr,status,error) {
                if (callback) callback('error', xhr.status);
                else {
                    alert("code:"+xhr.status+"\n"+"message:"+xhr.responseText+"\n"+"error:"+error);
                }
            }
        });
    } else {
        if (callback) callback('SecureGateway 서버 경로가 없습니다.');
    }

}