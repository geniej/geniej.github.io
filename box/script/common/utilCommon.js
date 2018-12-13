if (typeof utilComm == "undefined") utilComm = {};


// TODO : 공통 정보 (임시로 하드코딩, 추후 앱에서는 최초 로드시에 셋팅 예정)
utilComm.BASE_CCY        = "VND";		// 기본통화
utilComm.DATE_FORMAT     = "YYYYMMDD";	// 기본 날짜 형식
utilComm.DATE_SEPARATE   = "/";			// 날짜 구분자
utilComm.NUMBER_SEPARATE = ",";			// 금액 구분자
utilComm.TIME_SEPARATE   = ":";			// 시간 구분자
utilComm.DECIMAL_POINT   = ".";			// 소수점 구분자
utilComm.DEFAULT_LOCALE  = "";
utilComm.LANG_GBN        = "ko";			// 언어구분
utilComm.CURRENT_DATE    = "";	// 현재날짜


/**
 * @class 전화번호 마스킹
 *
 * @desciption
 * 전화번호(휴대폰, 일반전화) : 뒤 4자리 마스킹
 *
 * @param {string} str - 마스킹할 문자열
 * @returns 마스킹이 적용된 전화번호
 */
utilComm.maskingPhone = function(str) {
    if (!str || str.length < 5)
        return str;
    return str.substring(0, str.length - 4) + "●●●●";
};

/**
 * @class 카드번호 마스킹
 *
 * @desciption
 * 카드번호마스킹 : 5번째~10번째 + 마지막 자리
 *
 * @param {string} str - 마스킹할 문자열
 * @returns 마스킹이 적용된 카드번호
 */
utilComm.maskingCardNo = function(str) {
    if (!str) return str;

    if(str.length == 16) {
        return str.substr(0, 4) + "-" + str.substr(4, 4)  + "-●●●●-" + str.substr(12, 4);
    }

    return str;
};

/**
 * @class 계좌번호 마스킹
 *
 * @description
 * 계좌번호 마스킹 : 4번째~7번째
 *
 * @param {string} str - 마스킹할 문자열
 * @returns 마스킹이 적용된 계좌번호
 */
utilComm.maskingAccountNo = function(str) {
    if (!str) return str;

    if(str.indexOf("-") > -1){
        if (str.length == 14) {
            return str.substr(0, 3) + "-●●●-●" + str.substr(9, 5);
        }else if (str.length == 13) {
            return str.substr(0, 3) + "-●●-●●" + str.substr(9, 4);
        }
    }else{
        if(str.length < 7) return str;
        str = str.substring(0, 3) + "●●●●" + str.substring(7, str.length);
        return str;
    }

    return str;
};

/**
 * @class 국문성명 마스킹
 *
 * @description
 * 국문성명 마스킹 리턴한다.
 *
 * @param {string} str - 마스킹할 문자열
 * @returns 마스킹이 적용된 국문성명
 */
utilComm.maskingKorName = function(str) {

    if(str == "")
        return "";

    //공백 제거
    str = str.replaceAll(" ", "");

    //국문성명 최대 20Byte
    if(utilComm.getByteLength(str) <= 20){
        if(str.length == 2) {
            return str.substring(0, 1) + "●";
        } else if(str.length >= 3) {
            var maskingStr = "";
            for(var i=0 ; i<str.length-2 ; i++){
                maskingStr += "●";
            }
            return str.substring(0, 1) + maskingStr + str.substring(str.length-1, str.length);
        }
    }

    return str;
};

/**
 * @class 영문성명 마스킹
 *
 * @description
 * 영문성명 마스킹 리턴한다.
 *
 * @param {string} str - 마스킹할 문자열
 * @returns 마스킹이 적용된 영문성명
 */
utilComm.maskingEngName = function(str) {

    if(str == "")
        return "";

    var cnt = 0;
    var nameArr = str.split(" ");

    //영문성명 최대 20Byte
    if(utilComm.getByteLength(str) <= 20){

        for(var i=0 ; i<str.length ; i++){
            if(str.charAt(i) == " ") cnt++;
        }

        if(cnt == 0){ // 공백 없는 경우 : 뒷4자리 마스킹
            return str.substring(0, str.length-4) + "●●●●";
        }else if(cnt == 1){ // 공백 1개 : 공백이후 마스킹
            var masking = "";
            for(var i=0 ; i<nameArr[1].length ; i++){
                masking += "●";
            }
            return nameArr[0] + " " + masking;
        }else{ // 공백 2개 이상 : 맨 앞,뒤 제외한 가운데 마스킹
            var masking = "";
            var maskingLength = str.length - nameArr[0].length - nameArr[cnt].length;
            for(var i=nameArr[0].length ; i<nameArr[0].length+maskingLength ; i++){
                if(str.charAt(i) == " "){
                    masking += " ";
                }else{
                    masking += "●";
                }
            }
            return nameArr[0] + " " + masking + " " + nameArr[cnt];
        }
    }

    return str;
};

/**
 * @class 주소 마스킹
 *
 * @description
 * 주소 마스킹 리턴한다.
 *
 * @param {string} str - 마스킹할 문자열
 * @returns 마스킹이 적용된 주소
 */
utilComm.maskingAddress = function(str) {

    if(str == "")
        return "";

    var addrArr = [];
    for(var i=0 ; i<str.length ; i++){
        if(str.charAt(i) == "동"){
            if(str.charAt(i+1) == " "){
                addrArr = str.split("동");
                addrArr[0] += "동";
            }
        }
        else if(str.charAt(i) == "로"){
            if(str.charAt(i+1) == " "){
                addrArr = str.split("로");
                addrArr[0] += "로";
            }
        }
    }

    var masking = "";
    for(var i=0 ; i<addrArr[1].length ; i++){
        if(addrArr[1].charAt(i) == " "){
            masking += " ";
        }else{
            masking += "●";
        }
    }

    return addrArr[0] + " " + masking;
};

/**
 * @class 주민등록번호 마스킹
 *
 * @description
 * 주민등록번호 마스킹 리턴한다.
 *
 * @param {string} str - 마스킹할 문자열
 * @returns 마스킹이 적용된 주민등록번호
 */
utilComm.maskingJuminNo = function(p_str){

    var str = utilComm.transAcctNo(p_str);

    var juminNo01 = "";
    var juminNo02 = "";

    juminNo01 = str.substring(0, 6);
    juminNo02 = str.substring(6, 7) + "●●●●●●";

    return juminNo01 + "-" + juminNo02;
};

/**
 * @class 이메일 마스킹
 *
 * @description
 * 이메일 마스킹 리턴한다.
 *
 * @param {string} str - 마스킹할 문자열
 * @returns 마스킹이 적용된 이메일
 */
utilComm.maskingEmail = function(str) {

    if(str == "")
        return "";

    //공백 제거
    str = str.replaceAll(" ", "");

    var strArr = str.split("@");
    var rtnStr = "";
    //이메일패턴체크
    if(utilComm.isValidEMail(str)){
        for(var i=0 ; i<strArr[0].length ; i++){
            if(i == 0 || i == 1 || i == strArr[0].length-1 || i == strArr[0].length-2){
                rtnStr += "●";
            }else{
                rtnStr += strArr[0].charAt(i);
            }
        }
    }

    return rtnStr + "@" + strArr[1];
};

/**
 * @class 계좌번호 마스킹
 *
 * @description
 * 계좌번호 마스킹 리턴한다.
 *
 * @param {string} str - 마스킹할 문자열
 * @returns 마스킹이 적용된 계좌번호
 */
utilComm.formatAccountNo = function(str) {

    str = utilComm.transAcctNo(str);

    if(str == "")
        return "";

    if(str.length == 12) {
        return str.substring(0, 3) + "-" + str.substring(3, 6) + "-" + str.substring(6, 12);
    } else if(str.length == 11) {
        return str.substring(0, 3) + "-" + str.substring(3, 5) + "-" + str.substring(5, 11);
    }

    return str;
};

/**
 * @class 전화번호 포맷
 *
 * @description
 * 전화번호 포맷 리턴한다.
 *
 * @param {string} p_str - 포맷이 적용되지 않은 전화번호(10자리 이상 16자리 이하)
 *
 * @returns 포맷이 적용된 전화번호
 */
utilComm.formatTelNo = function(p_str) {

    var str = utilComm.transAcctNo(p_str);

    if(str == "")
        return "";

    // 전화번호는 10자리 이상 16자리 이하
    if(str.length < 9 || str.length > 16)
        return p_str;

    var telNoHead_02 = "02";  // 지역번호 2자리
    var telNoHead_03 = "031,032,033,041,042,043,044,051,052,053,054,055,061,062,063,064,070,080,010,011,016,017,018,019";  // 지역번호 3자리
    var telNoHead_04 = "0130,0303,0502,0504,0505,0506";  // 지역번호 4자리

    var telNo01 = "";
    var telNo02 = "";
    var telNo03 = "";

    // 1. 뒷자리 4자리는 고정
    telNo03 = str.substring(str.length - 4, str.length);

    // 2. 첫자리 4자리는 telNoHead 값중 하나
    if(telNoHead_02.indexOf(str.substring(0, 2)) > -1){
        telNo01 = str.substring(0, 2);

    }else if(telNoHead_03.indexOf(str.substring(0, 3)) > -1){
        telNo01 = str.substring(0, 3);

    }else if(telNoHead_04.indexOf(str.substring(0, 4)) > -1){
        telNo01 = str.substring(0, 4);
    }

    // 지역번호 검색안됨 -> 받은 데이터 리턴
    if(telNo01 == "")
        return p_str;

    // 3. 중간자리는 나머지 값으로 채운다.
    telNo02 = str.substring(telNo01.length, str.length - 4);

    return telNo01 + "-" + telNo02 + "-" + telNo03;
};

/**
 * @class 주민등록번호 포맷
 *
 * @description
 * 주민등록번호 포맷 리턴한다.
 *
 * @param {string} p_str - 포맷이 적용되지 않은 주민등록번호(13자리)
 *
 * @returns 포맷이 적용된 주민등록번호
 */
utilComm.formatJuminNo = function(p_str) {

    var str = utilComm.transAcctNo(p_str);

    if(str == "")
        return "";

    // 주민등록번호 13자리
    if(str.length != 13)
        return p_str;

    var juminNo01 = "";
    var juminNo02 = "";

    juminNo01 = str.substring(0, 6);
    juminNo02 = str.substring(6,13)

    return juminNo01 + "-" + juminNo02;
};

/**
 * @class 전화번호 첫번째 자리 체크
 *
 * @description
 * 전화번호 첫번째 자리가 유효하면 true, 아니면 false
 *
 * @param {string} str - 전화번호
 * @param {string} chkType - Type (0,1,2)
 *            0: 전체, Type 1: 휴대폰, 2: 일반지역번호
 *
 * @returns 포맷이 적용된 전화번호
 */
utilComm.isTelNoHead = function(str, chkType) {

    var head = utilComm.getStrValue(str);

    // 일반지역번호중 02 는 예외처리
    if (chkType == "0" || chkType == "2") {
        if (head == "02") {
            return true;
        }
    }

    if (head.length < 3)
        return false;

    var telNoHead_00 = "010,011,016,017,018,019,02,031,032,033,041,042,043,044,051,052,053,054,055,061,062,063,064,070,080,0130,0303,0502,0504,0505,0506"; // 전체
    var telNoHead_01 = "010,011,016,017,018,019"; // 휴대폰
    var telNoHead_02 = "031,032,033,041,042,043,044,051,052,053,054,055,061,062,063,064,070,080,0130,0303,0502,0504,0505,0506"; // 지역번호

    if (chkType == "0") {
        if (telNoHead_00.indexOf(head) == -1) {
            return false;
        } else {
            return true;
        }

    } else if (chkType == "1") {
        if (telNoHead_01.indexOf(head) == -1) {
            return false;
        } else {
            return true;
        }

    } else if (chkType == "2") {
        if (telNoHead_02.indexOf(head) == -1) {
            return false;
        } else {
            return true;
        }
    }

    return false;
};


/**
 * @class 전화번호 유효성 검증
 *
 * @description
 * 유효한 전화번호면 true, 아니면 false
 *
 * @param {string} str -전화번호
 * @param {string} chkType - Type (0,1,2)
 *            0: 전체, Type 1: 휴대폰, 2: 일반지역번호
 *
 * @returns 전화번호 여부
 */
utilComm.isTelNo = function(str, chkType){

    var sTelNo = utilComm.getStrValue(str);

    sTelNo = utilComm.replaceAll(sTelNo, "-");

    if (!(/^[0-9]*$/.test(sTelNo))) {
        return false;
    }

    // 지역번호 02 처리
    if(chkType == "0" || chkType == "2"){
        if(sTelNo.length < 9)
            return false;

        if(sTelNo.indexOf("02") == 0)
            return true;
    }

    if(sTelNo.length < 10)
        return false;

    if(utilComm.isTelNoHead(sTelNo.substring(0, 3), chkType))
        return true;
    else if(utilComm.isTelNoHead(sTelNo.substring(0, 4), chkType))
        return true;
    else
        return false;
};

/**
 *	@class 알파벳 포함 여부 리턴
 *
 * @description
 * 알파벳만 포함되어 있으면 true, 아니면 false
 *
 * @param {string} str - Check할 문자열
 * @returns 알파벳만 포함되어 있는지 여부
 */
utilComm.isAlphabet = function(str){
    for(var i=0; i < str.length; i++) {
        var ch= str.charAt(i);
        if( ( ch < "a" || ch > "z" ) && ( ch < "A" || ch > "Z" ) ) {
            return false;
        }
    }
    return true;
};

/**
 * @class 알파벳, 숫자로만 이루어졌는지 여부 리턴
 *
 *	@description
 * 알파벳과 숫자만 포함되어 있으면 true, 아니면 false
 *
 * @param {string} str - Check할 문자열
 * @returns 알파벳과 숫자만 포함되어 있는지 여부
 */
utilComm.isAlphanumeric = function(str){
    for(var i=0; i < str.length; i++) {
        var ch= str.charAt(i);
        if( ( ch < "0" || ch > "9" ) && ( ch < "a" || ch > "z" ) && ( ch < "A" || ch > "Z" ) ) {
            return false;
        }
    }
    return true;
};

/**
 * @class 숫자 포함 여부 리턴
 *
 *	@description
 * 숫자가 포함되어 있으면 true, 아니면 false
 *
 * @param {string} str -Check할 문자열
 * @returns 숫자가 포함되어 있는지 여부
 */
utilComm.isDigit = function(str){
    for(var i=0; i < str.length; i++) {
        var ch= str.charAt(i);
        if( ch < "0" || ch > "9" ) {
            return false;
        }
    }
    return true;
};

/**
 * @class 마지막 음절의 종성 존재 여부 리턴
 *
 *	@description
 * 종성이 존재하면 true 그 이외 (영문, 한글, 초성+중성)은 false
 *
 * @param {string} str - Check할 문자열
 * @returns 종성 존재 여부
 */
utilComm.isFinalConsonant = function(str){
    var code = str.charCodeAt(str.length - 1);
    if (code < 44032 || code > 55197) {
        return false;
    }
    if ( (code - 16)%28 == 0 ) {
        return false;
    }
    return true;
};

/**
 *	@class 숫자, 쉼표(,), 마침표(.)가 포함되어있는지 Check
 *
 * @description
 * 숫자, 쉼표(,), 마침표(.)가 포함되어있으면 true, 아니면 false
 *
 * @param {string} str - Check할 문자열
 * @returns 숫자, 쉼표(,), 마침표(.)가 포함되어 있는지 여부
 */
utilComm.isForeignMoney = function(str){
    for(var i=0; i < str.length; i++) {
        var ch= str.charAt(i);
        if( ( ch < "0" || ch > "9" ) && ch != ',' && ch != '.') {
            return false;
        }
    }
    return true;
};

/**
 *	@class 숫자 및 쉼표(,)가 포함되어있는지 Check
 *
 * @description
 * 숫자 및 쉼표(,)가 포함되어있으면 true, 아니면 false
 *
 * @param {string} str -Check할 문자열
 * @returns 숫자 및 쉼표(,)가 포함되어 있는지 여부
 */
utilComm.isMoney = function(str){
    for(var i=0; i < str.length; i++) {
        var ch= str.charAt(i);
        if( ( ch < "0" || ch > "9" ) && ch != ',' ) {
            return false;
        }
    }
    return true;
};

/**
 * @class 이메일 패턴 체크
 *
 * @param {string} eMail - 이메일 str
 * @returns boolean
 */
utilComm.isValidEMail = function(eMail) {

    var EMAIL_PATTERN = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}/;
    eMail = utilComm.getStrValue(eMail);

    if (eMail.match(EMAIL_PATTERN) == null) {
        return false;

    } else {
        return true;
    }
};

/**
 * @class 주민등록번호 유효성 체크
 *
 * @param {string} juminNo - 주민등록번호
 * @returns boolean
 */
utilComm.isValidJuminNo = function(juminNo) {

    /**
     * 1. 주민등록번호의 앞 6자리의 수에 처음부터 차례대로 2, 3, 4, 5, 6, 7 을 곱한다. 2. 그 다음 뒤 7자리의 수에
     * 마지막 자리만 제외하고 체례대로 8, 9, 2, 3, 4, 5 를 곱한다. 3. 이렇게 곱한 각 자리의 수들을 모두 더한다. 4.
     * 모두 더한수를 11로 나눈 나머지를 구한다. 5. 이 나머지를 11에서 뺀다. 6. 이렇게 뺀수가 두자릿수이면, 즉 10보다 크면
     * 다시 11로 나누어 나머지 값을 구한다. 7. 최종값을 주민등록번호의 마지막 자리수와 비교하여 같으면 유효한번호이고 다르면 잘못된
     * 번호이다.
     */

    juminNo = utilComm.transAcctNo(juminNo);
    if (juminNo.length != 13) {
        return false;
    }

    var jumin1 = juminNo.substring(0, 6);
    var jumin2 = juminNo.substring(6, 13);

    var sum = 0;
    sum += utilComm.getIntValue(jumin1.substring(0, 1)) * 2;
    sum += utilComm.getIntValue(jumin1.substring(1, 2)) * 3;
    sum += utilComm.getIntValue(jumin1.substring(2, 3)) * 4;
    sum += utilComm.getIntValue(jumin1.substring(3, 4)) * 5;
    sum += utilComm.getIntValue(jumin1.substring(4, 5)) * 6;
    sum += utilComm.getIntValue(jumin1.substring(5, 6)) * 7;

    sum += utilComm.getIntValue(jumin2.substring(0, 1)) * 8;
    sum += utilComm.getIntValue(jumin2.substring(1, 2)) * 9;
    sum += utilComm.getIntValue(jumin2.substring(2, 3)) * 2;
    sum += utilComm.getIntValue(jumin2.substring(3, 4)) * 3;
    sum += utilComm.getIntValue(jumin2.substring(4, 5)) * 4;
    sum += utilComm.getIntValue(jumin2.substring(5, 6)) * 5;

    sum = sum % 11;
    sum = 11 - sum;

    if (sum > 10) {
        sum = sum % 11;
    }

    sum = utilComm.getStrValue(sum);
    var checkSum = jumin2.substring(6, 7);

    if (sum == checkSum) {
        return true;
    } else {
        return false;
    }
};

/**
 * @class 특수문자 포함여부 리턴
 *
 * @description
 * str에 특수문자가 포함되어 있으면 true반환 참고 : 천지인 키보드에서 아래아등 입력안되는 오류로 인해 추가함 :
 * |\u318D\u119E\u11A2\u2002\u2025a\u00B7\uFE55
 *
 * @param str
 * @returns
 */
utilComm.isSpecialChar = function(str) {
    return !(/^[ㄱ-ㅎㅏ-ㅣ가-힝a-zA-Z0-9\u318D\u119E\u11A2\u2002\u2025a\u00B7\uFE55]*$/
        .test(str));
};

/**
 * @class 금액을 원래 숫자형태로 리턴
 *
 * @param {stinrg} number1 - 통화(string)
 * @returns 정상 형태의 통화(1234567.89)
 */
utilComm.changeMoney = function(amt) {
    var amount;
    amount = amt.replaceAll(utilComm.NUMBER_SEPARATE, "");
    amount = amount.replaceAll(utilComm.DECIMAL_POINT, ".");
    return amount;
};

/**
 *	@class 전화번호 유효성 검증
 *
 * @description
 *  숫자 , '-', '(', ')', ' '만 포함되어있으면 true, 아니면 false
 *
 * @param {string} str -Check할 문자열
 * @returns 숫자 , '-', '(', ')', ' '만 포함되어 있는지 여부
 */
utilComm.isTelNumber = function(str){
    for(var i=0; i < str.length; i++) {
        var ch= str.charAt(i);
        if( ( ch < "0" || ch > "9" ) && ( ch !='-') && ( ch != '(') && ( ch != ')' ) && ( ch != ' ' ) ) {
            return false;
        }
    }
    return true;
};

/** 허용 할 문자
 * onkeyup="utilComm.allowChar1(this,'0-9');"
 * ex) 0-9,a-z,A-Z, 0-9a-z
 **/
utilComm.allowChar = function(obj, filter) {
    if(filter){
        var objval = $(obj).val();
        var filter = "[^"+filter+"]";
        var reg = new RegExp(filter,"gi");
        $(obj).val(objval.replace(reg,''));
    }
};


//================================================== 날짜 관련 함수 start ==================================================

/**
 * @class 기본 형태로 날짜 포멧 변경
 *
 * @description
 * 'yyyyMMdd' 포맷으로 날짜 포맷을 변경한다.
 *
 * @param {string} date - 변경할 날짜
 * @param {string} format - 변경할 날짜의 현재 포맷
 * @returns 변경된 포맷의 일자
 */
utilComm.getDefaultDateFormat = function(date, format) {
    if (utilComm.isNull(date)) {
        date = utilComm.CURRENT_DATE;
    }
    if (utilComm.isNull(format)) {
        format = utilComm.DATE_FORMAT;
    }

    return utilComm.changeDatePtn(utilComm.getOnlyNumber(date), format, "yyyyMMdd");
};

/**
 * @class 날짜 포맷 변경
 *
 * @param {string} strDate   - 변경할 날짜
 * @param {string} curFormat - 현재 날짜 포멧
 * @param {string} chgFormat - 변경할 날짜 포멧
 * @returns 변경된 포멧의 일자
 */
utilComm.changeDatePtn = function(strDate, curFormat, chgFormat) {
    if (utilComm.isNull(strDate)) {
        strDate = utilComm.CURRENT_DATE;
    }
    if (utilComm.isNull(curFormat)) {
        curFormat = utilComm.DATE_FORMAT;
    }
    if (utilComm.isNull(chgFormat)) {
        chgFormat = "yyyyMMdd";
    }

    try {
        if (strDate.length != 0 && strDate.length < 8) {
            strDate = "";
        } else {
            if(strDate.length == 8 && curFormat != chgFormat) {
                var strDateCurrYYYY	=	"";
                var strDateCurrMM	=	"";
                var strDateCurrDD	=	"";

                if(curFormat.toLowerCase() == "mmddyyyy" ) {
                    strDateCurrYYYY = strDate.substr(4,4);
                    strDateCurrMM	= strDate.substr(0,2);
                    strDateCurrDD	= strDate.substr(2,2);
                } else if(curFormat.toLowerCase() =="ddmmyyyy") {
                    strDateCurrYYYY = strDate.substr(4,4);
                    strDateCurrMM	= strDate.substr(2,2);
                    strDateCurrDD	= strDate.substr(0,2);
                } else {
                    strDateCurrYYYY = strDate.substr(0,4);
                    strDateCurrMM	= strDate.substr(4,2);
                    strDateCurrDD	= strDate.substr(6,2);
                }

                if (chgFormat.toLowerCase() =="mmddyyyy") {
                    strDate = strDateCurrMM + strDateCurrDD + strDateCurrYYYY;
                } else if(chgFormat.toLowerCase() =="ddmmyyyy") {
                    strDate = strDateCurrDD + strDateCurrMM + strDateCurrYYYY;
                } else {
                    strDate = strDateCurrYYYY + strDateCurrMM + strDateCurrDD;
                }
            }
            return strDate;
        }
    } catch(e) {
        console.log(e);
    }
};

/**
 * @class calendar에 현재 날짜를 셋팅해준다
 *
 * @description
 *
 * @param {object} calendar - 세팅할 폼
 */
utilComm.setNowDate = function(calendar) {
    $(calendar).val(utilComm.getFormatDate());
};

/**
 * @class 현재일자 기준으로 일자구분에 맞는 캘린더의 일자를 셋팅해준다 [테스트완료]
 *
 * @description
 * - 최근1주일로 캘린더를 셋팅하는경우
 * utilComm.selectDay(2, inq_st_dt, inq_close_dt);
 *
 * 일자구분
 * 1 : today ~ today
 * 2 : today-6day ~ today
 * 3 : today-13day ~ today
 * 4 : today-1month ~ today
 * 5 : today-3month ~ today
 * 6 : today ~ today+6month
 * 7 : today ~ today+1year
 * 8 : today ~ today+3year
 * 9 : today ~ today+5year
 * 10 : today ~ today+10year
 * 11 : today-6month ~ today
 * 12 : today-1year ~ today
 * 13 : today-3year ~ today
 * 14 : today-5year ~ today
 * 15 : today-10year ~ today
 * 16 : today+2month ~ today --(수정)--> today ~ today+2month
 * 17 : today-2month ~ today
 * 18 : today ~ today+6day
 * 19 : today ~ today+13day
 * 20 : today ~ today+1month
 * 21 : today ~ today+3month
 * 30 : today-30day ~ today
 *
 * @param {string} branch - 일자구분
 * @param {object} from - 조회시작일 폼
 * @param {object} to - 조회종료일 폼
 */
utilComm.selectDay = function(branch, from, to) {
    var nowdate  = utilComm.getDefaultDateFormat(utilComm.CURRENT_DATE, utilComm.DATE_FORMAT);
    var fromDate = new Date(utilComm.getFormatDate(nowdate, "yyyyMMdd", "/"));
    var toDate   = new Date(utilComm.getFormatDate(nowdate, "yyyyMMdd", "/"));
    var fromObj  = $("#" + from.id + "");
    var toObj 	 = $("#" + to.id + "");

    if (branch == "1") {
        // 현재일자 ~ 현재일자
    } else if(branch == "2") {
        // 6일전 ~ 현재일자
        fromDate.setDate(fromDate.getDate() - 6);
    } else if(branch == "3") {
        // 13일전 ~ 현재일자
        fromDate.setDate(fromDate.getDate() - 13);
    } else if(branch == "4") {
        // 1개월전 ~ 현재일자
        fromDate.setMonth(fromDate.getMonth() - 1);
    } else if(branch == "5") {
        // 3개월전 ~ 현재일자
        fromDate.setMonth(fromDate.getMonth() - 3);
    } else if(branch == "6") {
        // 현재일자 ~ 6개월후
        toDate.setMonth(toDate.getMonth() + 6);
    } else if(branch == "7") {
        // 현재일자 ~ 1년후
        toDate.setYear(toDate.getFullYear() + 1);
    } else if(branch == "8") {
        // 현재일자 ~ 3년후
        toDate.setYear(toDate.getFullYear() + 3);
    } else if(branch == "9") {
        // 현재일자 ~ 5년후
        toDate.setYear(toDate.getFullYear() + 5);
    } else if(branch == "10") {
        // 현재일자 ~ 10년후
        toDate.setYear(toDate.getFullYear() + 10);
    } else if(branch == "11") {
        // 6개월전 ~ 현재일자
        fromDate.setMonth(fromDate.getMonth() - 6);
    } else if(branch == "12") {
        // 1년전 ~ 현재일자
        fromDate.setYear(fromDate.getFullYear() - 1);
    } else if(branch == "13") {
        // 3년전 ~ 현재일자
        fromDate.setYear(fromDate.getFullYear() - 3);
    } else if(branch == "14") {
        // 5년전 ~ 현재일자
        fromDate.setYear(fromDate.getFullYear() - 5);
    } else if(branch == "15") {
        // 10년전 ~ 현재일자
        fromDate.setYear(fromDate.getFullYear() - 10);
    } else if(branch == "16") {
        // 현재일자 ~ 2개월후
        toDate.setMonth(toDate.getMonth() + 2);
    } else if(branch == "17") {
        // 2개월전 ~ 현재일자
        fromDate.setMonth(fromDate.getMonth() - 2);
    } else if(branch == "18") {
        // 현재일자 ~ (현재일자 기준) 미래 1주
        toDate.setDate(toDate.getDate() + 6);
    } else if(branch == "19") {
        // 현재일자 ~ (현재일자 기준) 미래 2주
        toDate.setDate(toDate.getDate() + 13);
    } else if(branch == "20") {
        // 현재일자 ~ (현재일자 기준) 미래 1개월
        toDate.setMonth(toDate.getMonth() + 1);
    } else if(branch == "21") {
        // 현재일자 ~ (현재일자 기준) 미래 3개월
        toDate.setMonth(toDate.getMonth() + 3);
    } else if(branch == "30") {
        // 30일전 ~ 현재일자
        fromDate.setDate(fromDate.getDate() - 30);
    } else if(branch == "29") {
        // 29일전 ~ 현재일자
        fromDate.setDate(fromDate.getDate() - 29);
    }

    // 날짜 셋팅
    fromObj.val(utilComm.getFormatDate(utilComm.changeDatePtn(fromDate.getFullYear() + utilComm.formatMonthDay("M", fromDate.getMonth()) + utilComm.formatMonthDay("D", fromDate.getDate()), "yyyyMMdd", utilComm.DATE_FORMAT)));
    toObj.val(utilComm.getFormatDate(utilComm.changeDatePtn(toDate.getFullYear() + utilComm.formatMonthDay("M", toDate.getMonth()) + utilComm.formatMonthDay("D", toDate.getDate()), "yyyyMMdd", utilComm.DATE_FORMAT)));
};

/**
 * @class 월, 일 구분에 따라 값 변경
 *
 * @description
 *
 * @param {string} type - 구분(M, D)
 * @param {string} val - 월, 일
 */
utilComm.formatMonthDay = function(type, val) {
    try {
        if(type == "M") {
            val = val + 1;
        }
        if(val < 10) {
            val = "0" + val;
        }
        return String(val);
    } catch(e) {
        console.log(e);
    }
};

/**
 * @class 두날짜 사이의 차이일수 리턴
 *
 * @description
 *
 * @param {string} fromDate - 시작일자 (yyyyMMdd)
 * @param {string} toDate - 종료일자 (yyyyMMdd)
 * @returns 차이일수
 */
utilComm.getDiffDay = function(fromDate, toDate) {
    var from_dt = new Date(utilComm.getFormatDate(fromDate, "yyyyMMdd", "/"));
    var to_dt   = new Date(utilComm.getFormatDate(toDate, "yyyyMMdd", "/"));

    return (to_dt.getTime() - from_dt.getTime()) / 1000 / 60 / 60 / 24;
};

/**
 * @class 입력받은 날짜에서 +- day 값을 계산해서 날짜 값으로 리턴한다.
 *
 * @description
 *
 * @param {string} strDate - 입력받은 날짜(yyyyMMdd 형식)
 * @param {stinrg} flag - y, m, w, d 값중 하나(년도, 월, 주, 날짜)
 * @param {string} num - 세팅할 값
 * @returns yyyyMMdd 형식의 날짜
 */
utilComm.getCalcDate = function(strDate, flag, num) {

    strDate = utilComm.transDate(strDate);

    var year, month, day;
    year  = strDate.substring(0, 4);
    month = parseFloat(strDate.substring(4, 6)) - 1;
    day   = strDate.substring(6, 8);

    var date = new Date(year, month, day);

    num = parseFloat(num);
    flag = flag.toLowerCase();

    // Date객체에서 2010.05.31의 한달후는 2010.07.01이 됨으로 계산을 다르게 한다.
    if (flag == "m") {
        date.setDate(1);
        date.setMonth(date.getMonth() + num);

        year = date.getFullYear();
        month = date.getMonth();

        var monthLastday = utilComm.getMonthLastDay(year, month+1);
        if (parseFloat(day) > parseFloat(monthLastday)) {
            date.setDate(monthLastday);
        } else {
            date.setDate(day);
        }

    } else {
        if (flag == "y") {
            date.setDate(1);
            date.setYear(date.getFullYear() + num);

            year = date.getFullYear();
            month = date.getMonth();

            var monthLastday = utilComm.getMonthLastDay(year, month+1);

            if(parseFloat(day) > parseFloat(monthLastday)){
                date.setDate(monthLastday);
            }else{
                date.setDate(day);
            }

        } else if (flag == "w") {
            num = num * 7; // week 함수가 없기때문에 7을 곱하여 구현한다.
            date.setDate(date.getDate() + num);
        } else if (flag == "d") {
            date.setDate(date.getDate() + num);
        }
    }

    year  = utilComm.getFillStrZero(date.getFullYear(), 4);
    month = utilComm.getFillStrZero(date.getMonth() + 1, 2);
    day   = utilComm.getFillStrZero(date.getDate(), 2);

    return year + month + day;
};

/**
 * @class 말일을 구한다.
 *
 * @description
 *
 * @param {string} year - 년
 * @param {string} month - 월
 * @returns 입력한 년, 월의 말일값을 리턴한다.
 */
utilComm.getMonthLastDay = function(year, month) {

    month = parseFloat(month) - 1;

    var lastDay = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // 윤년일때 2월을 29일로 바꾼다.
    if (utilComm.isLeapYear(year) == true) {
        lastDay[1] = 29;
    }

    return lastDay[month];
};

/**
 * @class 윤년인지 체크한다.
 *
 * @description
 * 윤년이면 true, 아니면 false
 *
 * @param {string} year - 년
 * @returns {boolean} 윤년인지 여부
 */
utilComm.isLeapYear = function(year) {

    if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) {
        return true;
    } else {
        return false;
    }
};

///**
// * @class 해당 날짜의 마지막 날 구하기
// * 
// * @description
// * 
// * @param {string} date
// * 					yyyy.mm.dd
// * @returns String
// */
//utilComm.lastday = function(date) {
//
//	var rtnDate = "";
//	var getDate = null;
//	var dateArray = null;
//
//	if (date == null || date == "") {
//		return;
//	}
//
//	dateArray = date.split(".");
//
//	getDate = new Date(parseInt(dateArray[0], 10), parseInt(dateArray[1], 10),
//			0);
//
//	rtnDate = String(utilComm.numberCheck(getDate.getDate()));
//	console.log("rtnDate : " + rtnDate);
//	return rtnDate;
//
//};
//
///**
// * @class 해당 날짜의 요일 구하기
// * 
// * @description
// * 
// * @param {string} date
// *            yyyy.mm.dd
// * @returns {string} (0:일,1:월,2:화,3:수,4:목,5:금,6:토)
// */
//utilComm.weekDay = function(date) {
//
//	var rtnDate = "";
//	var getDate = null;
//	var dateArray = null;
//
//	// var week = new Array('일','월','화','수','목','금','토');
//
//	if (date == null || date == "") {
//		return;
//	}
//
//	dateArray = date.split(".");
//
//	getDate = new Date(parseInt(dateArray[0], 10),
//			parseInt(dateArray[1], 10) - 1, parseInt(dateArray[2], 10));
//
//	rtnDate = String(getDate.getDay()); // week[getDate.getDay()];
//	console.log("rtnDate : " + rtnDate);
//	return rtnDate;
//};

/**
 * @class 날짜에 구분자 적용하여 리턴
 *
 * @description
 * 넘겨준 날짜와 포멧에 맞게 구분자를 넣어 리턴한다.
 *
 * @param [string] str - 날짜 String (ex - "20180611" / "11062018" / "110618")
 * @param [string] sFormat   - 날짜 포멧 (ex - "yyyyMMdd" / "ddMMyyyy" / "ddMMyy")
 * @param [string] sSeparate - 적용할 구분자 (주지않으면 기본 구분자)
 * @returns [string] 포멧 적용된 문자열 리턴 (ex - "2018/06/11" / "11/06/2018" / "11/06/18")
 */
utilComm.getFormatDate = function(str, sFormat, sSeparate) {
    var strTemp		    = utilComm.isNull(str) ? utilComm.CURRENT_DATE : utilComm.transDate(str);
    var strFormatTemp   = utilComm.isNull(sFormat) ? utilComm.DATE_FORMAT : sFormat;
    strFormatTemp 	    = strFormatTemp.toUpperCase();
    var strSeparateTemp = utilComm.isNull(sSeparate) ? utilComm.DATE_SEPARATE : sSeparate;

    var nYStart = strFormatTemp.indexOf("Y");
    var nYEnd   = strFormatTemp.lastIndexOf("Y");
    var nMStart = strFormatTemp.indexOf("M");
    var nMEnd   = strFormatTemp.lastIndexOf("M");
    var nDStart = strFormatTemp.indexOf("D");
    var nDEnd   = strFormatTemp.lastIndexOf("D");

    var arrTmp = [nYStart, nYEnd, nMStart, nMEnd, nDStart, nDEnd];
    arrTmp.sort();

    return strTemp.substring(arrTmp.shift(), (arrTmp.shift())+1) + strSeparateTemp +
        strTemp.substring(arrTmp.shift(), (arrTmp.shift())+1) + strSeparateTemp +
        strTemp.substring(arrTmp.shift(), (arrTmp.shift())+1);
};

/**
 * @class 조회시작일, 조회종료일을 비교 [테스트완료]
 *
 * @param {String} calSta - 조회시작일
 * @param {String} calEnd - 조회종료일
 * @returns 조회시작일이 조회종료일보다 큰경우 false, 작으면 true
 */
utilComm.compareDate = function(calSta, calEnd) {
    try {
        if (parseInt(utilComm.transDate(calSta)) > parseInt(utilComm.transDate(calEnd))) {
            return false;
        } else {
            return true;
        }
    } catch(e) {
        console.log(e);
    }
};

/**
 * @class 영업일 조회
 *
 * @param day - 일자 yyyyMMdd
 * @param resultCallBack
 *            의 리턴값이 영업일 여부 true / false
 */
utilComm.isOpDate = function(successCallback, date, pattern) {
    var tmpDate    = date;
    var tmpPattern = pattern;

    if (utilComm.isNull(tmpDate)) {
        tmpDate = utilComm.CURRENT_DATE;

    }
    if (utilComm.isNull(tmpPattern)) {
        tmpPattern = utilComm.DATE_FORMAT;
    }

    tmpDate = utilComm.changeDatePtn(tmpDate, tmpPattern, "yyyyMMdd");

    var dataBody = {
        "date"    : tmpDate,
        "pattern" : "yyyyMMdd",
        "c_time"  : utilComm.makeIDX()
    };

    spCommHTTP.doRequest(function(retS){
        utilComm.log(eval(retS.isOPDate), "utilComm.isOpDate success");
        successCallback(eval(retS.isOPDate));
    }, function(retF){
        utilComm.log(retF, "utilComm.isOpDate fail");
    }, dataBody, {}, "/common/jsp/callIsGibSolOPDate.jsp", true);
};

/**
 * @class 이전 영업일 조회
 *
 * @description
 * (기준일이 영업일이면 영업일 리턴, 기준일이 영업일이 아니면 이전 영업일 리턴)
 *
 * @param [function] successCallback : 콜백
 * @param [string] date : 날짜 (ex : "20180525")
 * @param [string] pattern : 날짜 패턴 (ex : "yyyyMMdd")
 */
utilComm.getPreBizDay = function(successCallback, date, pattern) {
    utilComm.getOPDate(successCallback, date, pattern, -1);
};

/**
 * @class 다음 영업일 조회
 *
 * @description
 * (기준일이 영업일이면 영업일 리턴, 기준일이 영업일이 아니면 다음 영업일 리턴)
 *
 * @param [function] successCallback : 콜백
 * @param [string] date : 날짜 (ex : "20180525")
 * @param [string] pattern : 날짜 패턴 (ex : "yyyyMMdd")
 */
utilComm.getNextBizDay = function(successCallback, date, pattern) {
    utilComm.getOPDate(successCallback, date, pattern, 1);
};

/**
 * @class 지정날짜 전 후 영업일을 가져온다.
 *
 * @description
 *  0이면 최종영업일 즉, 현재일이 영업일이면 현재일을, 아니면 바로 이전 영업일을 반환한다.
 *
 * @param [function] successCallback : 콜백
 * @param [string] date : 날짜 (ex : "20180525")
 * @param [string] pattern : 날짜 패턴 (ex : "yyyyMMdd")
 * @param [number] days : 일자 증감 (..., -1, 0, 1, ...)
 */
utilComm.getOPDate = function(successCallback, date, pattern, days) {
    var tmpDate    = date;
    var tmpPattern = pattern;
    var tmpDays    = days;

    if (utilComm.isNull(tmpDate)) {
        tmpDate = utilComm.CURRENT_DATE;

    }
    if (utilComm.isNull(tmpPattern)) {
        tmpPattern = utilComm.DATE_FORMAT;
    }
    if (utilComm.isNull(tmpDays)) {
        tmpDays = 0;
    }

    tmpDate = utilComm.changeDatePtn(tmpDate, tmpPattern, "yyyyMMdd");

    var dataBody = {
        "date"    : tmpDate,
        "pattern" : "yyyyMMdd",
        "days"    : String(tmpDays),
        "c_time"  : utilComm.makeIDX()
    };

    spCommHTTP.doRequest(function(retS){
        utilComm.log(retS.date, "utilComm.getOPDate success");
        successCallback(utilComm.changeDatePtn(retS.date, "yyyyMMdd", tmpPattern));
    }, function(retF){
        utilComm.log(retF, "utilComm.getOPDate fail");
    }, dataBody, {}, "/common/jsp/callGibSolOPDate.jsp", true);
};

//================================================== 날짜 관련 함수 end ==================================================

/**
 * @class 문자열의 byte수를 리턴
 *
 * @description
 *
 * @param {stinrg} str - 대상 문자열
 * @returns 문자열의 byte수
 */
utilComm.getByteLen = function(str) {
    try {
        var temp;
        var real_byte = 0;
        for (ii=0; ii<str.length; ii++) {
            temp = str.substr(ii,1).charCodeAt(0);
            if (temp > 65535) {
                real_byte = real_byte + 4;
            } else if (temp > 2047) {
                real_byte = real_byte + 3;
            } else if (temp > 127) {
                real_byte = real_byte + 2;
            } else {
                real_byte = real_byte + 1;
            }
        }
        return real_byte;
    } catch(e) {
        console.log(e);
    }
};

/**
 * @class 문자열의 byte수만큼 자른뒤 리턴
 *
 * @description
 *
 * @param {stinrg} str - 대상 문자열
 * @returns byte수만큼 잘린 문자열
 */
utilComm.getCutStr = function(str, cutMaxByte) {
    try {
        if(utilComm.isNull(str)) {
            return str;
        }

        var temp;
        var real_byte = 0;
        for (ii=0; ii < str.length; ii++) {
            temp = str.substr(ii,1).charCodeAt(0);
            if (temp > 65535) {
                real_byte = real_byte + 4;
            } else if (temp > 2047) {
                real_byte = real_byte + 3;
            } else if (temp > 127) {
                real_byte = real_byte + 2;
            } else {
                real_byte = real_byte + 1;
            }

            if(real_byte > cutMaxByte) {
                break;
            }
        }

        rStr = str.substring(0, ii);
        return rStr;
    } catch(e) {
        console.log(e);
    }
};

/**
 * @class 한글 byte수를 리턴
 *
 * @description
 *
 * @param {stinrg} str - 대상 문자열
 * @returns 한글 byte수
 */
utilComm.getByteHanLen = function(str) {
    return(str.length+(escape(str)+"%u").match(/%u/g).length-1);
};

/**
 * @class 전문수신 데이타가 vector형인 경우. 결과가 단건, 다건 이던지 항상 배열로 값 얻기.
 *
 * @description
 *
 * @param {JSON} data - 전문의 vector.data
 * @returns {array}
 */
utilComm.getJsonArray = function(data) {
    var list = [];
    if ($.isArray(data)) {
        list = data;
    } else {
        list[0] = data;
    }

    return list;
};

/**
 * @class 전문수신 데이타에서 해당 key 데이타를 배열로 리턴.
 *
 * @description
 *
 * @param {JSON} obj - 전문수신 JSON 객체
 * @param {string} key
 * @returns {array}
 */
utilComm.findJsonArray = function(obj, key) {
    var list = [];
    for ( var i in obj) {
        if (!obj.hasOwnProperty(i))
            continue;
        if (i === key) {
            list.push(obj[i]);
        } else if (typeof obj[i] === "object") {
            list = list.concat(utilComm.findJsonArray(obj[i], key));
        }
    }
    return list;
};


/**
 * @class Null 값 제거(String)
 *
 * @description
 *
 * @param {string} strTemp
 * @param {string} defaulttext
 * @returns {string}
 */
utilComm.getStrValue = function(strTemp, defaulttext) {
    if (!strTemp) {
        if (typeof defaulttext != "undefined") {
            return defaulttext;
        } else {
            return "";
        }
    }

    return $.trim(strTemp);
};

/**
 * @class Null 체크함수
 *
 * @description
 *
 * @param {any} value
 *            체크할 파라미터(숫자, 문자열, object 등) 단, 0은 not null 처리
 * @return {boolean}
 */
utilComm.isNull = function(value) {
    if(typeof value == 'undefined'){
        return true;
    }
    if (value == ""
        || value == null
        || value == undefined
        || (value != null && typeof value == "object" && !Object
            .keys(value).length))
    {
        if (String(value) == String(0)) {
            return false;
        }
        return true;
    } else {
        return false;
    }
};

/**
 * @class JSON 오브젝트 값 NULL 체크 [구현완료][테스트완료]
 *
 * @param {object} obj - JSON 오브젝트
 * @return JSON 오브젝트 값이 있는경우 false, 아니면 true
 */
utilComm.isNullJson = function(json) {
    try {
        if (typeof json != "undefined" && json != null && json != "") {
            return false;
        } else {
            return true;
        }
    } catch(e) {
        utilComm.log(e);
    }
};

/**
 * @class Null 값 제거(Float)
 *
 * @description
 *
 * @param {string} floatTemp
 * @returns {float} (null 인경우 0 리턴)
 */
utilComm.getFloatValue = function(floatTemp) {
    if (floatTemp == null)
        return 0;

    if ($.trim(floatTemp) == "")
        return 0;

    floatTemp = utilComm.transMoney(floatTemp);

    return parseFloat(floatTemp);
};

/**
 * @class Null 값 제거(Int)
 *
 * @description
 *
 * @param {string} intTemp
 * @returns {float} (null 인경우 0 리턴)
 */
utilComm.getIntValue = function(intTemp) {
    if (intTemp == null)
        return 0;

    if ($.trim(intTemp) == "")
        return 0;

    intTemp = utilComm.transMoney(intTemp);

    return parseInt(intTemp, 10);
};

/**
 * @class Null 값 제거 후 값이 존재하면 뒤에 데이터 붙임(ex 00 원, 00 개월)
 *
 * @description
 *
 * @param {string} strTemp
 * @param {string} addion
 * @param {string} procZero 0 처리 여부(Y/N) (Y: 공백, N: 0 으로 리턴) 디폴트 값은 Y 임 - 필수값 아님
 * @returns {string} 데이터 리턴
 */
utilComm.getStrValueAddion = function(strTemp, addion, procZero) {
    if (addion == null)
        addion = "";

    if (procZero == null)
        procZero = "Y"

    strTemp = utilComm.getStrValue(strTemp);

    if (strTemp == "")
        return strTemp;

    if (procZero == "Y") {

        // 공백값이거나 0 값이면 "" 을 리턴함.
        if (strTemp == "" || strTemp == "0") {
            return "";
        }
    }

    return strTemp + " " + addion;
};

/**
 * @class 금리포맷
 *
 * @description
 * 금리포맷(소숫점 2 째자리 버림)
 * @param {string} 금리값
 * @param {number} 소수점 자리(Default: 2) - 필수값 아님
 * @returns {string} 금리포맷
 */
utilComm.getFmtInterestRate = function(p_rate, p_point) {
    if (p_rate == null) {
        rate = 0;
    } else {
        rate = p_rate;
    }

    rate = utilComm.transMoney(rate);

    if (p_point == null) {
        p_point = 2; // default 2 자리
    }

    var pow = Math.pow(10, p_point);

    rate = parseFloat(rate * pow).toFixed(p_point);
    rate = Math.floor(rate) /  parseInt(pow);

    //rate = rate.toFixed(p_point);
    return rate;
};

/**
 * @class 금리포맷
 *
 * @description
 * 금리포맷(소숫점 p_point 째자리 반올림(4사5입))
 *
 * @param {string}금리값
 * @param {number} 소수점 자리(Default: 2)
 * @returns {float}
 */
utilComm.getRoundInterestRate = function(p_rate, p_point) {
    var rate;
    p_rate = utilComm.transMoney(p_rate);

    if (p_rate == null) {
        rate = 0;
    } else {
        rate = p_rate;
    }

    if (p_point == null) {
        p_point = 2; // default 2 자리
    }

    var newNum = new Number(rate);
    rate = newNum.toFixed(p_point);

    return rate;
};

/**
 * @class float 숫자의 소수점 자리수 설정후 리턴
 *
 * @description
 * var fnum =  2.199999999;
 * roundXL(fnum, 2) ==> 2.20
 *
 * @param {string} fnum - 숫자(float)
 * @param {number} digits - 소수점 자리수(파라메터로 들어오지 않은경우 해당 국가의 기본 통화자리수값을 가져와서 처리해준다.)
 * @returns {JSON} 오브젝트 값이 있는경우 false, 아니면 true
 */
utilComm.roundXL = function(fnum, digits) {
    try {
        if (typeof fnum == "string") fnum = Number(fnum);
        if (typeof digits != "undefined") {
            if(digits >= 0) {
                return parseFloat(fnum.toFixed(digits)); // 소수부 반올림
            }

            digits = Math.pow(10, digits); // 정수부 반올림
            var rnum = Math.round(fnum * digits) / digits;

            return parseFloat(rnum.toFixed(0));
            // digits 가 파라메터로 들어오지 않은경우 해당 국가의 기본 통화자리수값을 가져와서 처리해준다.
        } else {
            var ndigits = utilComm.getCDecLength(utilComm.BASE_CCY);
            return utilComm.roundXL(fnum, ndigits);
        }
    } catch(e) {
        console.log(e);
    }
};

/**
 * @class Key 입력제한
 *
 * @description
 * Key 입력제한 (자릿수 및 특수문자)
 *
 * @param {object} objItem - 폼
 * @param {number} limit - 입력제한 글자 수
 * @param {string} showAlert - 표시여부
 */
utilComm.keyInputLimit = function(objItem, limit, showAlert) {

    var chars = objItem.value.length;
    var value = objItem.value;

    // 특수문자 관리
    var re = /[₩$£¥•]/gi;
    objItem.value = value.replace(re, "");

    if (chars > limit) {
        if (showAlert == 'Y')
            alert(limit + "자 이상 입력이 제한됩니다.");
        objItem.value = objItem.value.substr(0, limit);
    }
};

/**
 * @class Key 입력제한
 *
 * @description
 * Key 입력제한 (자릿수 및 특수문자)
 *
 * @param {object} objItem - 폼
 * @param {number} limit - 입력제한 글자 수
 * @param {string} showAlert - 표시여부
 */
utilComm.keyInputByteLimit = function(objItem, limit, showAlert) {

    var str = utilComm.getStrValue(objItem.value);
    var strlen = 0; // 문자열 길이
    var temp;
    var real_byte = 0;
    for (ii=0; ii < str.length; ii++) {
        temp = str.substr(ii,1).charCodeAt(0);
        if (temp > 65535) {
            real_byte = real_byte + 4;
        } else if (temp > 2047) {
            real_byte = real_byte + 3;
        } else if (temp > 127) {
            real_byte = real_byte + 2;
        } else {
            real_byte = real_byte + 1;
        }

        if(real_byte > limit) {
            break;
        }

        strlen = strlen + 1;
    }

    if (real_byte > limit) {
        if (showAlert == 'Y')
            alert(limit + "자 이상 입력이 제한됩니다.\n(한글은 1자당 3bytes)");

        objItem.value = str.substring(0, strlen - 1);
    }
};

/**
 * @class 특수문자 제거
 *
 * @descirption
 *
 * @param {string} sWord - 특수문자를 제거할 문자열
 * @returns {string}
 */
utilComm.removeSpecialChar = function(sWord){
    var re = /^[ㄱ-ㅎㅏ-ㅣ가-힝a-zA-Z0-9-|\u318D\u119E\u11A2\u2002\u2025a\u00B7\uFE55]*$/;

    return sWord.replace(re,"");
};

/**
 * @class 특수기호 처리  : 송금거래시 특수기호 치환.
 *
 * @description
 * 				치환가능한 문자 :
 *  			& -> AND
 *  			% -> PCT.
 *  			$ -> DOLLARS
 *  			# -> NO.
 *  			@ -> AT
 *
 * @param {string} sInvalid - 체크할 문자열
 */
utilComm.replaceSpecialChar = function(sInvalid) {
    if (sInvalid == null || sInvalid == "") {
        return "";
    }
    var sValid = sInvalid.trim();
    sValid = sValid.replaceAll("&AMP;", "&");
    sValid = sValid.replaceAll("&amp;", "&");
    sValid = sValid.replaceAll("&", " AND ");
    sValid = sValid.replaceAll("%", " PCT. ");
    sValid = sValid.replaceAll("$", " DOLLARS ");
    sValid = sValid.replaceAll("#", " NO. ");
    sValid = sValid.replaceAll("@", " AT ");
    return sValid;
};

/**
 * @class 특수기호 처리
 *
 * @description
 * 특수기호 처리  : 송금거래시 특수기호 치환.
 *
 * @param {string} sInvalid - 체크할 문자열
 */
utilComm.replaceSpecialChar2 = function(sInvalid) {
    if (sInvalid == null || sInvalid == "") {
        return "";
    }
    var sValid = sInvalid.trim();
    sValid = sValid.replaceAll("&AMP;", "&");
    sValid = sValid.replaceAll("&amp;", "&");
    return sValid;
};

/**
 * @class 허용문자만 사용하는지 체크하는 함수
 *
 * @desccription
 * 허용문자만 사용하는지 체크하는 함수(송금 업무외에 다른업무에서 사용하지 마세요)
 *
 * @param {object} input - 체크할 폼
 * @return 허용문자만 있는경우 true, 아니면 false
 */
utilComm.checkSpecialChar4Foreign = function(input) {
    try {
        var regex = /^[ 0-9A-Z\(\)\+,\.\/:\?\-\'\"\\\s]+$/;
        var text = $(input).val();
        if(text != '' && !regex.test(text)) {
            return false;
        }
        return true;
    } catch(e) {
        utilComm.log(e);
    }
};

/**
 * @class 허용문자만 사용하는지 체크하는 함수
 *
 * @desccription
 * 허용문자만 사용하는지 체크하는 함수(송금 업무외에 다른업무에서 사용하지 마세요)
 *
 * @param {object} input - 체크할 폼
 * @return 허용문자만 있는경우 true, 아니면 false
 */
utilComm.checkSpecialChar4Foreign100 = function(input, label) {
    try {
        var regex = /^[ 0-9A-Z\(\)\+,\.\/:\-\'\"\\\s]+$/;
        var text = $(input).val();
        if(text != '' && !regex.test(text)) {

            var props = {};
            props.msgType = "1";
            props.msgStr = gibLangObj.getGIBMessage("lbl_FRM098_1", label); //%1 을/를 확인해주세요. 특수문자는 사용하실 수 없습니다.
            utilComm.alertError(props);
            $(input).focus();

            return false;
        }
        return true;
    } catch(e) {
        utilComm.log(e);
    }
};

/**
 * @class 허용문자만 사용하는지 체크하는 함수
 *
 * @desccription
 * 허용문자만 사용하는지 체크하는 함수(송금 업무외에 다른업무에서 사용하지 마세요)
 *
 * @param {object} input - 체크할 폼
 * @return 허용문자만 있는경우 true, 아니면 false
 */
utilComm.checkSpecialChar4Foreign2 = function(input, label) {
    try {
        var regex = /^[ 0-9A-Z\(\)\+,\.\/:\?\-\'\"\\]+$/;
        var text = $(input).val();
        if(text != '' && !regex.test(text)) {

            var props = {};
            props.msgType = "1";
            props.msgStr = gibLangObj.getGIBMessage("lbl_FRM098_1", label); //%1 을/를 확인해주세요. 특수문자는 사용하실 수 없습니다.
            utilComm.alertError(props);
            $(input).focus();

            return false;
        }
        return true;
    } catch(e) {
        utilComm.log(e);
    }
};

/**
 * @class 허용문자만 사용하는지 체크하는 함수
 *
 * @desccription
 * 허용문자만 사용하는지 체크하는 함수(송금 업무외에 다른업무에서 사용하지 마세요)
 *
 * @param {object} input - 체크할 폼
 * @return 허용문자만 있는경우 true, 아니면 false
 */
utilComm.checkSpecialChar4Foreign3 = function(input, label) {
    try {
        var regex = /^[0-9A-Za-z\-]*$/;
        var text = $(input).val();
        if(text != '' && !regex.test(text)) {

            var props = {};
            props.msgType = "1";
            props.msgStr = gibLangObj.getGIBMessage("lbl_FRM040", label); //%1 은/는 숫자와 영문자만 입력해야 합니다.
            utilComm.alertError(props);
            $(input).focus();

            return false;
        }
        return true;
    } catch(e) {
        utilComm.log(e);
    }
};

/**
 * @class 허용문자만 사용하는지 체크하는 함수
 *
 * @desccription
 * 허용문자만 사용하는지 체크하는 함수(송금 업무외에 다른업무에서 사용하지 마세요)
 *
 * @param {object} input - 체크할 폼
 * @return 허용문자만 있는경우 true, 아니면 false
 */
utilComm.checkSpecialChar4Foreign4 = function(input, label) {
    try {
        var regex = /^[ 0-9A-Z\',\.\(\)\*\-\&amp;\/:\#]+$/;
        var text = $(input).val();
        if(text != '' && !regex.test(text)) {

            var props = {};
            props.msgType = "1";
            props.msgStr = gibLangObj.getGIBMessage("lbl_FRM098_1", label); //%1 을/를 확인해주세요. 특수문자는 사용하실 수 없습니다.
            utilComm.alertError(props);
            $(input).focus();

            return false;
        }
        return true;
    } catch(e) {
        console.log(e);
    }
};

/**
 * @class MaxLength 이상 Key 입력시 Focus 이동
 *
 * @description
 *
 * @param {string} -포커스이동 대상 Object
 * @param {string} - 다음 포커스이동 Object
 * @param {function} callbackFunc
 */
utilComm.keyLimitToTarget = function(sOrign, sTarget, callbackFunc) {

    var maxLength = $("#" + sOrign + "").attr('maxlength');
    var length = $("#" + sOrign + "").val().length;

    var keyCode = event.keyCode;
    if (length >= maxLength) {

        if ("readonly" == $("#" + sTarget + "").attr("readonly")) {
            $("#" + sTarget + "").trigger("click");
        } else {
            $("#" + sTarget + "").focus();
        }
    }

    if (keyCode == 13) {

        if ("readonly" == $("#" + sTarget + "").attr("readonly")) {
            $("#" + sTarget + "").trigger("click");
        } else {
            $("#" + sTarget + "").focus();
        }

        if (callbackFunc != null) {
            if (typeof (callbackFunc) == "string") {
                eval("" + callbackFunc + ""); // 콜백함수가 존재하는경우 실행
            } else {
                callbackFunc();
            }
        }
    }
};

/**
 * @class Key Enter 입력시 Focus 이동
 *
 * @description
 *
 * @param {string} 포커스이동 대상 Object
 * @param {string} 이전 포커스이동 Object (현재 지원안함)
 * @param {string} 다음 포커스이동 Object
 * @param callbackFunc (필수값 아님)
 *
 * @returns void
 */
utilComm.keyToTarget = function(sOrign, sPrevTarget, sTarget, callbackFunc) {

    var length = $("#" + sOrign + "").val().length;

    var keyCode = event.keyCode;
    if (keyCode == 13) {

        if ("readonly" == $("#" + sTarget + "").attr("readonly")) {
            $("#" + sTarget + "").trigger("click");
        } else {
            $("#" + sTarget + "").focus();
        }

        if (callbackFunc != null) {
            if (typeof (callbackFunc) == "string") {
                eval("" + callbackFunc + ""); // 콜백함수가 존재하는경우 실행
            } else {
                callbackFunc();
            }
        }
    }
};

/**
 * @class 문자 Replace All
 *
 * @description
 *
 * @param {string} strTemp - 원본 String
 * @param {string} strOld - 교체대상 String
 * @param {string} strNew - 교체이후 String
 * @returns 교체된 문자열 리턴
 */
utilComm.replaceAll = function(strTemp, strOld, strNew) {

    var rtnValue = "";
    strTemp = utilComm.getStrValue(strTemp);

    if (strNew == null) {
        rtnValue = strTemp.replace(eval("/" + strOld + "/g"), "");
    } else {
        rtnValue = strTemp.replace(eval("/" + strOld + "/g"), strNew);
    }

    return rtnValue;
};

/**
 * @class 날짜 하이픈 및 세미콜론 제거
 *
 * @description
 *
 * @param {string} strDate - 원본 String
 * @returns 변환된 문자열 리턴
 */
utilComm.transDate = function(strDate) {
    strDate = utilComm.getStrValue(strDate);

    var rtnValue = strDate.replaceAll(utilComm.DATE_SEPARATE, "");

    return rtnValue;
};

/**
 * @class 날짜 하이픈 및 세미콜론 제거 후 숫자 전환
 *
 * @description
 *
 * @param {string} strDate - 원본 String
 * @returns 변환된 문자열 리턴
 */
utilComm.transDateNumber = function(strDate) {
    return Number(utilComm.transDate(strDate));
};

/**
 * @class 계좌번호 하이픈 제거
 *
 * @description
 *
 * @param {string} strDate - 원본 String
 * @returns 변환된 문자열 리턴
 */
utilComm.transAcctNo = function(strAcctNo) {

    return utilComm.replaceAll(strAcctNo, "-");
};

/**
 * @class 금액 콤마 제거
 *
 * @description
 *
 * @param {string} strMoney - 원본 String
 * @returns 변환된 문자열 리턴
 */
utilComm.transMoney = function(strMoney) {

    var money;
    strMoney = utilComm.getStrValue(strMoney);
    if (strMoney == "") {
        money = "0";
    } else {
//		money = utilComm.replaceAll(strMoney, ",");
        money = utilComm.replaceAll(strMoney, utilComm.NUMBER_SEPARATE);
    }

    return money;
};

/**
 * @class 금액 콤마 제거 후 숫자 리턴
 *
 * @description
 *
 * @param {string} strMoney - 원본 String
 * @returns 변환된 문자열 리턴
 */
utilComm.transNumber = function(strMoney) {
    return Number(utilComm.transMoney(strMoney));
};

/**
 * @class 금액 콤마 삽입 (3자리마다 콤마를 삽입한다.)
 *
 * @description
 *
 * @param {string} strTemp - 원본 String
 * @param {string} procZero 0 처리 여부(Y/N) (Y: 공백, N: 0 으로 리턴) 디폴트 값은 Y 임 (필수값 아님)
 * @returns 변환된 문자열 리턴
 */
utilComm.getFormatAmt = function(strTemp, procZero, sIptId, sUnit) {

    if (strTemp == "")
        return strTemp;

    if (procZero == null)
        procZero = "Y"; // default 값

    strTemp = strTemp + "";
    strTemp = utilComm.transMoney(strTemp);

    var arrTemp = strTemp.split(".");
    var str = arrTemp[0].replace(/[^0123456789]/g, "");
    var i;
    var result = "";
    var cnt = 0;

    // 소숫점 앞자리 처리
    for (i = str.length - 1; i >= 0; i--, cnt++) {
        if (cnt > 0 && (cnt % 3) == 0)
            result = ',' + result;

        result = str.substring(i, i + 1) + result;
    }

    // 소숫점 뒷자리 처리
    if (arrTemp.length > 1) {
        result += "." + arrTemp[1].replace(/[^0123456789]/g, "");
    }

    if (result != '0') {
        /* 금액 앞에 숫자 0이 먼저 시작되는것을 삭제함(단, 소수점 처리는 제외) */
        if (result.substring(0, 1) == '0' && result.indexOf('.') == '-1') {
            result = result.replace(/[^1-9]+/, "");
            if (procZero == "N" && result == '')
                result = 0;
        }
    }

    if (procZero == "Y") {
        if (result == 0) {
            result = "";
        }
    }

    // 마이너스 처리 (최초에 들어온값이 마이너스라면 부호 붙여준다.
    if (utilComm.getFloatValue(strTemp) < 0)
        result = "-" + result;

    if(utilComm.isNull(sIptId)){
        return result;
    }else{
        var nFocusLen = result.length;
        if(nFocusLen > 0){
            if(utilComm.isNull(sUnit)){
                $("#"+sIptId).val(result + "원");
                var thisObj = $("#"+sIptId);
                thisObj.focus();
                thisObj.selRange(nFocusLen,nFocusLen);
            }else{
                $("#"+sIptId).val(result + sUnit);
                var thisObj = $("#"+sIptId);
                thisObj.focus();
                thisObj.selRange(nFocusLen,nFocusLen);
            }

        }else{
            $("#"+sIptId).val('');
        }
    }
};

/**
 * @class 국가별 금액 소수점 표기 및 소수점 아래 자릿수 표기 여부
 *
 * @param {string} pCurrency - 국가코드
 */
utilComm.getCDecLength = function(pCurrency){
//	if (typeof window.top.numberFormat != "undefined") {
//		var result = window.top.numberFormat["currency"][pCurrency];
//		if (typeof result == "undefined") {
//			return 0;
//		} else {
//			return result;
//		}
//	} else {
//		shbJComm.printStackTrace("numberformat이 존재하지 않음");
//		return 0;
//	}

    //TODO: 추후 변경 예정
    var decLength = (pCurrency=="INR" || pCurrency=="KZT" || pCurrency=="SGD"
        || pCurrency=="CHF" || pCurrency=="CNY" || pCurrency=="HKD"
        || pCurrency=="AUD" || pCurrency=="USD" || pCurrency=="KHR"
        || pCurrency=="EXR" || pCurrency=="EUR" || pCurrency=="GBP" || pCurrency=="CAD") ? "2" : "0"; //shbJComm.getCDecLength(currencyCD);
    return decLength;
};

/**
 * @class input에 통화에 따른 format을 적용한다.
 * @param props : Object태그
 * 			{object} ccy_c - 통화코드 tag
 * 			{object} pObj1 - 소수점 앞자리 tag
 *  		{object} pDecPoint - 소수점 구분자 tag
 *  		{object} pObj2 - 소수점 뒷자리 tag
 *    		{object} pSpanObj2 - 소수점 뒷자리 span tag
 */
utilComm.changeCcyCurrency = function(userProps){
    var defaultOpt = {
        "ccy_c"      : ""
        ,"pObj1"      : ""
        ,"pDecPoint"  : ""
        ,"pObj2"      : ""
        ,"pSpanObj1"  : ""
        ,"pSpanObj2"  : ""
    }
    var props = $.extend({}, defaultOpt, userProps);
    var ccy_c			= props.ccy_c;
    var pObj1			= props.pObj1;
    var pDecPoint 	    = props.pDecPoint;
    var pObj2 			= props.pObj2;
    var pSpanObj1 		= props.pSpanObj1;
    var pSpanObj2 		= props.pSpanObj2;

    var currencyCD		= $(ccy_c).val() || $(ccy_c).html(); //통화코드
    var decLength		= utilComm.getCDecLength(currencyCD); //현재 통화코드의 소수점 아래 자릿수
    var pObj1Val		= $(pObj1).val().replace(/[^0123456789]/g, ""); //소수점 앞자리의 값
    var pObj2Val		= "";
    if( !utilComm.isNull( $(pObj2) ) ){
        $(pObj2).val().replace(/[^0123456789]/g, ""); //소수점 뒷자리의 값
    }
    var numSeparate	= utilComm.NUMBER_SEPARATE; //금액 구분자
    var decPoint		= ""; //소수점구분자
    var result = ""; //출력값

    if( utilComm.isNull($(pDecPoint).val()) ){
        decPoint = utilComm.DECIMAL_POINT;
    }else{
        decPoint = $(pDecPoint).text();
    }

    //소수점 앞자리 처리
    if (currencyCD == "INR" ) {
        var lastThree = pObj1Val.substring(pObj1Val.length - 3);
        var otherNumbers = pObj1Val.substring(0, pObj1Val.length - 3);

        if(otherNumbers != "") lastThree = numSeparate + lastThree;
        result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, numSeparate) + lastThree;

    } else {
        var cnt = 0;

        for (var i = pObj1Val.length - 1; i >= 0; i--, cnt++) {
            if (cnt > 0 && (cnt % 3) == 0)
                result = numSeparate + result;

            result = pObj1Val.substring(i, i + 1) + result;
        }
    }
    $(pObj1).val(result);

    //소수점 뒷자리 처리
    if(!utilComm.isNull(pObj2)){
        if(decLength == 0){
            $(pObj2).val("");
            //$(pObj2).attr("disabled", true);
            $(pSpanObj2).hide();
            if ($(pSpanObj1).hasClass("pr0") == true) {
                $(pSpanObj1).removeClass("pr0");
            }
            $(pDecPoint).hide();
        }else{
            if(utilComm.isNull(pObj2Val)){
                $(pObj2).val("00");
                $(pDecPoint).text(decPoint);
            }else{
                $(pObj2).val(pObj2Val.substr(0, decLength));
            }
            //$(pObj2).attr("disabled", false);
            $(pSpanObj2).show();
            if ($(pSpanObj1).hasClass("pr0") == false) {
                $(pSpanObj1).addClass("pr0");
            }
            $(pDecPoint).show();
        }
    }else{
        if(typeof pObj2 != "undefined" ){
            $(pObj2).val("");
            $(pSpanObj2).hide();
            if ($(pSpanObj1).hasClass("pr0") == true) {
                $(pSpanObj1).removeClass("pr0");
            }
            $(pDecPoint).hide();
        }
    }

    if(getUserAgent() != "else"){		// Android, 아이폰의 경우 소수점 문제로 일반 쿼티키패드 사용
        $(pObj1).attr("type", "tel"); 	//금액입력 input에 대해서 type을 tel로 변경
        $(pObj2).attr("type", "tel"); 	//금액입력 input에 대해서 type을 tel로 변경
    }
};

/**
 * @class input에 통화에 따른 format을 적용한 값을 string형태로 리턴한다.
 * @param props : Object태그
 * 			{object} ccy_c - 통화코드 tag
 * 			{object} pObj1 - 소수점 앞자리 tag
 *  		{object} pDecPoint - 소수점 구분자 tag
 *  		{object} pObj2 - 소수점 뒷자리 tag
 *  @returns 포맷이 적용된 통화
 */
utilComm.getCcyCurrency = function(userProps){
    var defaultOpt = {
        "ccy_c"      : ""
        ,"pObj1"      : ""
        ,"pDecPoint"  : ""
        ,"pObj2"      : ""
    }
    var props = $.extend({}, defaultOpt, userProps);
    var ccy_c			= props.ccy_c;
    var pObj1			= props.pObj1;
    var pDecPoint 		= props.pDecPoint;
    var pObj2 			= props.pObj2;

    var currencyCD	    = $(ccy_c).val() || $(ccy_c).html() ; //통화코드
    var decLength		= utilComm.getCDecLength(currencyCD); //현재 통화코드의 소수점 아래 자릿수
    var pObj1Val		= $(pObj1).val().replace(/[^0123456789]/g, ""); //소수점 앞자리의 값
    var pObj2Val		= "";
    if( !utilComm.isNull( $(pObj2) ) ){
        pObj2Val		= $(pObj2).val().replace(/[^0123456789]/g, ""); //소수점 뒷자리의 값
    }
    var numSeparate	= utilComm.NUMBER_SEPARATE; //금액 구분자
    var decPoint		= ""; //소수점구분자
    var result = ""; //출력값

    if( utilComm.isNull($(pDecPoint).val()) ){
        decPoint = utilComm.DECIMAL_POINT;
    }else{
        decPoint = $(pDecPoint).text();
    }

    //소수점 앞자리 처리
    if (currencyCD == "INR" ) {
        var lastThree = pObj1Val.substring(pObj1Val.length - 3);
        var otherNumbers = pObj1Val.substring(0, pObj1Val.length - 3);

        if(otherNumbers != "") lastThree = numSeparate + lastThree;
        result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, numSeparate) + lastThree;

    } else {
        var cnt = 0;

        for (var i = pObj1Val.length - 1; i >= 0; i--, cnt++) {
            if (cnt > 0 && (cnt % 3) == 0)
                result = numSeparate + result;

            result = pObj1Val.substring(i, i + 1) + result;
        }
    }

    //소수점 뒷자리 처리
    if(decLength != 0){
        if(utilComm.isNull(pObj2Val)){
            result = result + decPoint + "00";
        }else{
            result = result + decPoint + pObj2Val.substr(0, decLength);
        }
    }

    return result;

    if(getUserAgent() != "else"){		// Android, 아이폰의 경우 소수점 문제로 일반 쿼티키패드 사용
        $(pObj1).attr("type", "tel"); 	//금액입력 input에 대해서 type을 tel로 변경
        $(pObj2).attr("type", "tel"); 	//금액입력 input에 대해서 type을 tel로 변경
    }
};

/**
 * @class 통화 숫자형태에 콤마(,)찍어서 리턴 (asis) formatComma(currency, currencyCode)
 *
 * @param {string} currency - 금액
 * @param {string} currencyCode - 통화코드
 * @param {string} pNumSeparate - 금액 구분자
 * @param {string} pDecPoint - 소수점 구분자
 * @return JSON 오브젝트 값이 있는경우 false, 아니면 true
 */
utilComm.getFormattedCurrency = function(currency, currencyCode, pNumSeparate , pDecPoint) {
    try {
        var numberSeparate;
        var decimalPoint;
        currency = currency.toString();
        var reserveNum = currency;

        if(utilComm.isNull(pNumSeparate)) {
            numberSeparate = utilComm.NUMBER_SEPARATE;
        }else{
            numberSeparate = pNumSeparate;
        }

        if(typeof pDecPoint == "undefined" || pDecPoint == "") {
            decimalPoint = utilComm.DECIMAL_POINT;
        }else{
            decimalPoint = pDecPoint;
        }

        if(currency.indexOf("-") > -1) {
            currency = currency.replace("-", "");
        }

        currency = currency.replace(".", decimalPoint);

        if(currency.indexOf(numberSeparate) > -1) {
            return currency;
        }

        var num_float = '';
        if(currency.indexOf(utilComm.DECIMAL_POINT) > -1) {
            num_float = currency.substring(currency.indexOf(decimalPoint));
            currency = currency.substring(0, currency.indexOf(decimalPoint));
        }

        if(currencyCode == "INR") {
            var indfmt = [3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2, 2];
            var i = 0;
            idx = currency.length - indfmt[i];
            while(idx > 0) {
                i++;
                currency = currency.substr(0, idx) + numberSeparate + currency.substr(idx);
                idx -= indfmt[i];
            }
        } else {
            idx = currency.length-3;
            while(idx > 0) {
                currency = currency.substr(0, idx) + numberSeparate + currency.substr(idx);
                idx -= 3;
            }
        }

        var currencyCodeLength = 0;

        if(typeof currencyCode == "undefined") {
            if(num_float.length == 0) {
                num_float = decimalPoint + "00";
            } else if(num_float.length == 2) {
                num_float = num_float+"0";
            } else {
                num_float = num_float;
            }
        } else {
            currencyCodeLength = utilComm.getCDecLength(currencyCode);

            if(currencyCodeLength == 0) {
                num_float = num_float;
            } else {
                var addZero = parseInt(currencyCodeLength - num_float.length, 10);

                // 소수점이 지정된소수점자리수(예)2자리) 이상 들어오는경우 지정된자리수 이하는 잘라버리도록 수정(2015/10/09 백영범)
                if(addZero >= 0) {
                    for(var a = 0; a < addZero; a++) {
                        num_float = num_float + "0";
                    }

                    if(num_float.indexOf(decimalPoint) <= -1) {
                        num_float = decimalPoint + num_float;
                    }
                } else {
                    if(currencyCodeLength > 0) {
                        num_float = num_float.substring(0, currencyCodeLength+1);
                    }
                }
            }
        }

        //공백인 경우 .00형식으로 리턴되고 있어서 추가함(2015/10/10 윤경선)
        if(currency == "") {
            currency = "0";
        }
        if(reserveNum.indexOf("-") > -1) {
            return "-" + currency + num_float;
        } else {
            return currency + num_float;
        }
    } catch(e) {
        utilComm.log(e);
    }
};

/**
 * @class 금액값을 입력
 *
 * @description
 * 금액값을 입력합니다. onKeyUp 이벤트에서 사용 (소숫점 미표시)
 *
 * @param {object} objItem - 해당 Input Tag Item
 * @param {string} procZero - 0 처리 여부(Y/N) (Y: 공백, N: 0 으로 리턴) 디폴트 값은 Y 임 (필수값 아님)
 */
// 콤마처리를 위해 $(document).ready()에서 호출하니 수정 금지
utilComm.inputAmount = function(strObjId, procZero) {
    if (strObjId == "") {
        return;
    }

    if (procZero == null)
        procZero = "Y"; // default 값

    var objItem = $(strObjId); // jquery selector인 경우
    if (objItem.length == 0)
        objItem = $("#" + strObjId + "");

    if (objItem.hasClass("utilComm.inputAmount") == false) {
        objItem.addClass("utilComm.inputAmount endInputAmount").attr("procZero",
            procZero);
        objItem.attr("myid", strObjId);
        objItem.trigger("focus");
    } else if (objItem.hasClass("utilComm.inputAmount") == true) {
        return;
    }

};

/**
 * @class 금액값을 입력합니다.
 *
 * @description
 *  onKeyUp 이벤트에서 사용 (소숫점 표시가능)
 *
 * @param {object/string} objItem - 금액입력 tag
 * @param {object/string} ccy_c - 통화코드 tag
 *
 * @return 없음
 */
utilComm.inputAmountDecimal = function(strObjId, ccy_c) {

    if (strObjId == "") {
        return;
    }

    var objItem = $(strObjId); // jquery selector인 경우
    if (objItem.length == 0)
        objItem = $("#" + strObjId + "");
    var strObjIdVal		= objItem.val().replace(/[^0123456789]/g, "");

    var currencyCD = "";
    if(!utilComm.isNull(ccy_c)){
        if(typeof ccy_c == "object"){
            currencyCD	= $(ccy_c).val() || $(ccy_c).html(); //통화코드
        }else{	//string
            currencyCD	= $("#" + ccy_c + "").val() || $("#" + ccy_c + "").html(); //통화코드
        }
    }else{
        currencyCD		= utilComm.BASE_CCY;
    }

    var result = ""; //출력값

    // 통화코드에 따른 구분자 처리
    if(currencyCD == "INR" ) {
        var lastThree = strObjIdVal.substring(strObjIdVal.length - 3);
        var otherNumbers = strObjIdVal.substring(0, strObjIdVal.length - 3);

        if(otherNumbers != "") lastThree = utilComm.NUMBER_SEPARATE + lastThree;
        result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, utilComm.NUMBER_SEPARATE) + lastThree;
    } else {
        var cnt = 0;

        for (var i = strObjIdVal.length - 1; i >= 0; i--, cnt++) {
            if (cnt > 0 && (cnt % 3) == 0)
                result = utilComm.NUMBER_SEPARATE + result;

            result = strObjIdVal.substring(i, i + 1) + result;
        }
    }

    objItem.val(result);
};

/**
 * @class 숫자값을 입력합니다.
 *
 * @description
 * onKeyUp 이벤트에서 사용
 *
 * @param {object} objItem - 해당 Input Tag Item
 * @param {string} procZero - 0 처리 여부(Y/N) (Y: 공백, N: 0 으로 리턴) 디폴트 값은 Y 임 (필수값 아님)
 */
utilComm.inputNumber = function(strObjId, procZero) {

    if (strObjId == "") {
        return;
    }

    if (procZero == null)
        procZero = "Y"; // default 값

    var objItem = $("#" + strObjId + "");
    var number = utilComm.getOnlyNumber(objItem.val(), procZero);

    if (procZero == "Y") {
        number = utilComm.getIntValue(number);
        if (number == "0")
            number = "";
    }

    objItem.val(number);
};

/**
 * @class 전화번호값을 입력합니다.
 *
 * @description
 * onKeyUp 이벤트에서 사용
 *
 * @param {object} objItem - 해당 Input Tag Item
 * @param {string} procZero - 0 처리 여부(Y/N) (Y: 공백, N: 0 으로 리턴) 디폴트 값은 Y 임 (필수값 아님)
 *
 * @return 없음.
 */
utilComm.inputTel = function(sOrign, sTarget) {

    if (sOrign == "") {
        return;
    }

    var procZero = "N";

    var objItem = $("#" + sOrign + "");
    var number = utilComm.getOnlyNumber(objItem.val(), procZero);

    if (procZero == "Y") {
        number = utilComm.getIntValue(number);
        if (number == "0")
            number = "";
    }

    objItem.val(number);

    if (sTarget != null)
        utilComm.keyLimitToTarget(sOrign, sTarget);
};

/**
 * @class 한글 문자열만 입력 처리
 *
 * @description
 * (onKeyUp 이벤트에서 사용 or 한글만 필터링한 문자열 리턴)
 *
 * @param {string} sInputVal - 입력한 문자열
 * @param {string} sInputId  - 대상 태그ID (문자열만 리턴받을 경우 입력x)
 */
utilComm.inputKorean = function(sInputVal, sInputId){
    if (sInputVal == "") {
        return "";
    }

    var retVal = sInputVal;

    // 한글을 제외한 문자는 입력 불가 - 천지인 키보드에서 아래아등 입력안되는 오류로 인해 추가함 : |\u318D\u119E\u11A2\u2002\u2025a\u00B7\uFE55
    var filter  = /[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣\u318D\u119E\u11A2\u2002\u2025a\u00B7\uFE55]/g;

    utilComm.log(sInputVal, "utilComm.inputKorean orgin value");

    if (filter.test(sInputVal) == true) {
        retVal = sInputVal.replace(filter, "");
    }

    utilComm.log(retVal, "utilComm.inputKorean retVal value");

    if (utilComm.isNull(sInputId)) {
        return retVal;
    } else {
        var nFocusLen = retVal.length;
        if (nFocusLen > 0) {
            $("#"+sInputId).val(retVal);
            var thisObj = $("#"+sInputId);
            thisObj.focus();
            thisObj.selRange(nFocusLen,nFocusLen);
        } else {
            $("#"+sInputId).val('');
        }
    }
};

/**
 * @class 숫자값만 얻어온다.
 *
 * @description
 * (숫자값 이외는 모두 필터링)
 *
 * @param {string} strTemp - 원본문자열
 * @param {string} procZero - 0 처리 여부(Y/N) (Y: 공백, N: 0 으로 리턴) 디폴트 값은 Y 임 (필수값 아님)
 * @returns 필터링된 문자열
 */

utilComm.getOnlyNumber = function(strTemp, procZero) {

    if (procZero == null)
        procZero = "Y"; // default 값

    var filter = /[^0-9]/g;
    var number = strTemp.replace(filter, "");

    if (procZero == "Y") {
        if (number == "0") {
            number = "";
        }
    }

    return number;
};



/**
 * @class 문자열 앞에 "0" 을 채워서 리턴한다.
 *
 * @description
 *
 * @param {string} strTemp - 원본 String
 * @param {number} len - 문자 전체길이
 * @returns 변환된 문자열 리턴
 */
utilComm.getFillStrZero = function(strTemp, len) {

    return utilComm.getFillStr(strTemp, "0", len);
};

/**
 * @class 문자열 앞에 특정한 문자를 채워서 리턴한다.
 *
 * @description
 *
 * @param {string} strTemp - 원본 String
 * @param {string} strFill - 앞에 채워질 문자
 * @param {number} len - 문자 전체길이
 * @returns 변환된 문자열 리턴
 */
utilComm.getFillStr = function(strTemp, strFill, len) {

    strTemp = utilComm.getStrValue(strTemp);

    if (strTemp.length >= len)
        return strTemp;

    var rtnValue = "";
    var i;
    len = len - strTemp.length;
    for (i = 0; i < len; i++) {
        rtnValue += strFill;
    }

    rtnValue += strTemp;

    return rtnValue;
};

/**
 * @class 문자열 뒤에 "0" 을 채워서 리턴한다.
 *
 * @description
 *
 * @param {string} strTemp - 원본 String
 * @param {number} len - 문자 전체길이
 * @returns 변환된 문자열 리턴
 */
utilComm.getFillStrZeroAfter = function(strTemp, len) {

    return utilComm.getFillStrAfter(strTemp, "0", len);
};

/**
 * @class 문자열 뒤에 특정한 문자를 채워서 리턴한다.
 *
 * @description
 *
 * @param {string} strTemp - 원본 String
 * @param {string} strFill -앞에 채워질 문자
 * @param {number} len - 문자 전체길이
 * @returns 변환된 문자열 리턴
 */
utilComm.getFillStrAfter = function(strTemp, strFill, len) {

    strTemp = utilComm.getStrValue(strTemp);

    if (strTemp.length >= len)
        return strTemp;

    var rtnValue = "";
    var i;
    len = len - strTemp.length;
    rtnValue += strTemp;

    for (i = 0; i < len; i++) {
        rtnValue += strFill;
    }

    return rtnValue;
};

//================================================== 달력 관련 함수 start ==================================================


/**
 * @class 입력받은 날짜를 .구분자를 넣어 리턴
 *
 * @param [string] date : 년월일 날짜 (ex - "20180601")
 * @return [string] result : (ex - "2018.06.01")
 */
utilComm.checkDate = function(date){
    var tmp_date = "";
    var nowdate  = utilComm.getDefaultDateFormat(utilComm.CURRENT_DATE, utilComm.DATE_FORMAT);

    if (utilComm.isNull(date)) {
//		tmp_date = utilComm.CURRENT_DATE;
        tmp_date = new Date(utilComm.getFormatDate(nowdate, "yyyyMMdd", "/"));
    }else{
        tmp_date = new Date(utilComm.getFormatDate(date.replace(/[^0-9]/gi,''), "yyyyMMdd", "/"));
    }

//	return tmp_date.substring(0, 4) + "." +
//		   tmp_date.substring(4, 6) + "." +
//		   tmp_date.substring(6);

    return utilComm.getDefaultDateFormat(utilComm.changeDatePtn(tmp_date.getFullYear() + utilComm.formatMonthDay("M", tmp_date.getMonth()) + utilComm.formatMonthDay("D", tmp_date.getDate()), "yyyyMMdd", utilComm.DATE_FORMAT));
}

/**
 * 조회기간달력UI생성
 *
 * @description
 * 조회기간달력UI생성
 *
 * @param {function} successCallback - 성공 콜백
 * @param divOpt : Object 태그 옵션
 * 			 {string}iptDateterm		- 기간선택 ObjectID
 * 			 {string}termType	- 기간종류
 * 			 {string}termDefaultType		- 기간종류 기본값
 * @param popupOpt	: popup 옵션
 * 			 {string}layerId	-기간선택팝업 ID
 * 			 {object}selectCallback	- 팝업에서 선택후 콜백함수
 * @param calOpt : Object 태그 옵션
 * 			 {string}calStartId		- 시작일자id
 * 			 {string}calEndId	- 종료일자id
 */
utilComm.getCalendarDiv = function(successCallback, divOpt, popupOpt, calOpt){

    // 기간선택
    var termBtnId = divOpt.termBtnId;
    var termType = divOpt.termType;
    var termDefaultType = divOpt.termDefaultType;

    var layerId = popupOpt.layerId;
    var fncSelectCallback = popupOpt.selectCallback;

    var calStartId = calOpt.calStartId;
    var calEndId = calOpt.calEndId;

    var termTypeList = [];

    // 기간선택 팝업
    var layerId = popupOpt.layerId;
    var fncSelectCallback = utilComm.isNull(popupOpt.selectCallback) ? "" : popupOpt.selectCallback;

    // code : utilComm.selectDay 참고, 필요시 추가
    var termTypeAllList = [];
    termTypeAllList.push({code : "1",	text : "1일", 	termType : "1D"}); // 1일
    termTypeAllList.push({code : "2",	text : "1주", 	termType : "1W"}); // 1주
    termTypeAllList.push({code : "3",	text : "2주", 	termType : "2W"}); // 2주
    termTypeAllList.push({code : "4",	text : "1개월", termType : "1M"}); // 1개월
    termTypeAllList.push({code : "5",	text : "3개월", termType : "3M"}); // 3개월
    termTypeAllList.push({code : "29",	text : "30일", 	termType : "30D"}); // 30일


    for(var i=0; i< termType.length; i++){
        for(var j=0; j< termTypeAllList.length; j++){
            if(termTypeAllList[j].termType == termType[i]){
                termTypeList.push(termTypeAllList[j]);
            }
        }
    }
    // 기간선택 기본값
    var termDefaultTypeMap = utilComm.getMatchedJSON(termTypeList, "termType", termDefaultType)[0];
    $("#"+divOpt.iptDateterm).val(termDefaultTypeMap.text);
    $("#"+divOpt.iptDateterm).data("code", termDefaultTypeMap.code);

    // 기간선택 팝업창
    utilComm.selectLayerPop(layerId
        , function(result){
            // 캘린더 값 셋팅
            utilComm.selectDay(result.code, eval(calStartId), eval(calEndId));
            if(!utilComm.isNull(fncSelectCallback)){
                fncSelectCallback(result);
            }
        }
        , "기간선택"
        , termTypeList
        , divOpt.iptDateterm);


    // 캘린더 값 셋팅
    utilComm.selectDay(termDefaultTypeMap.code, eval(calStartId), eval(calEndId));

    // 네이티브 캘린더 바인드
    $("#btn_"+calStartId).bind("click", function(e){
        utilComm.callCommCalendarStartCal(calOpt);
    });
    $("#btn_"+calEndId).bind("click", function(e){
        utilComm.callCommCalendarEndCal(calOpt);
    });

    //TODO : 개발시 캘린더 readonly 제거
    if(getUserAgent() == "else"){
        $("#"+calStartId).removeAttr("readonly");
        $("#"+calEndId).removeAttr("readonly");
        $("#btn_"+calStartId).css("display", "none");
        $("#btn_"+calEndId).css("display", "none");
    }

    if(successCallback != undefined){
        successCallback(true);
    }
};

utilComm.callCommCalendarStartCal  = function(calOpt){
    var calStartId = calOpt.calStartId;
    var date = utilComm.transDate($("#"+calStartId).val());
    var showToday = true;
    var min = utilComm.isNull(calOpt.calStartMin) ? "19000101": calOpt.calStartMin;
    var max = utilComm.isNull(calOpt.calStartMax) ? "21001231": calOpt.calStartMax;

    utilComm.commCalendar(utilComm.changeDatePtn(date), showToday
        , function(result){
            $("#" + calStartId).val(utilComm.getFormatDate(utilComm.changeDatePtn(result, "yyyyMMdd", utilComm.DATE_FORMAT)));
        }
        , min
        , max);


};
utilComm.callCommCalendarEndCal  = function(calOpt){
    var calEndId = calOpt.calEndId;
    var date = utilComm.transDate($("#"+calEndId).val());
    var showToday = true;
    var min = utilComm.isNull(calOpt.calEndMin) ? "19000101": calOpt.calEndMin;
    var max = utilComm.isNull(calOpt.calEndMax) ? "21001231": calOpt.calEndMax;

    utilComm.commCalendar(utilComm.changeDatePtn(date), showToday
        , function(result){
            $("#" + calEndId).val(utilComm.getFormatDate(utilComm.changeDatePtn(result, "yyyyMMdd", utilComm.DATE_FORMAT)));
        }
        , min
        , max);

};

//================================================== 달력 관련 함수 end ==================================================


/**
 * @class 입력된 숫자를 가지고 한글금액으로 변환한다.
 *
 * @param strWon - 입력숫자
 * @return 변환된 문자열 리턴
 */
utilComm.wonToHan = function(strWon) {

    var strHan = "";

    if (strWon == "" || strWon == "0")
        return "영원";

    var len = strWon.length;
    if (len == 0)
        return "영원";

    strWon = utilComm.transMoney(strWon); // 콤마 제거

    var arrNum = new Array("", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"); // 숫자
    var arrSmallUnit = new Array("", "십", "백", "천"); // 작은단위
    var arrBigUnit = new Array("", "만", "억", "조", "경", "해", "자", "양", "구", "간",
        "정", "재", "극"); // 큰단위

    var strLen = strWon.length;
    var smallUnit, bigUnit;
    var nowNum, nowUnit; // 현재숫자, 현재 단위

    var i;
    var num = "";
    var nowHan = "";
    for (i = 0; i < strLen; i++) {

        nowNum = strWon.substring(i, i + 1);
        nowUnit = strLen - i;

        smallUnit = parseInt((nowUnit - 1) % 4, 10);
        bigUnit = parseInt((nowUnit - 1) / 4, 10);

        strHan += arrNum[parseInt(nowNum, 10)]; // 숫자

        if (nowNum != "0") {
            strHan += arrSmallUnit[smallUnit]; // 작은단위
        }

        if ((nowUnit - 1) % 4 == 0) {
            num += nowNum;
            if (parseInt(num, 10) > 0) {
                strHan += arrBigUnit[bigUnit]; // 큰단위는 값이 존재할때 삽입한다.
            }
            num = "";
        } else {
            num += nowNum;
        }
    }

    strHan = strHan + "원";

    return strHan;
};

/**
 * @class 입력된 숫자를 가지고 한글금액으로 변환한다.
 *
 * @param strWon - 입력숫자
 * @return 변환된 문자열 리턴
 */
utilComm.wonToHanUnit = function(strWon) {

    var strHan = "";

    if (strWon == "" || strWon == "0")
        return "0원";

    var len = strWon.length;
    if (len == 0)
        return "0원";

    strWon = utilComm.transMoney(strWon); // 콤마 제거

    if(Number(strWon) == 0){
        return "0원";
    }

    var arrBigUnit = new Array("", "만", "억", "조", "경", "해", "자", "양", "구", "간", "정", "재", "극"); // 큰단위

    var nWonLen = strWon.length;
    var aWonfour = [];
    var nCnt = 0;

    if(nWonLen > 4){

        var iModWonLen = parseInt(nWonLen % 4 ,10);

        var iModWonLen2 = parseInt(nWonLen / 4 ,10);


        var sRemoveWon = strWon;
        for(var i=1; i<iModWonLen2+1; i++){
            var nRemoveWonLen = sRemoveWon.length;
            var sFourWon = sRemoveWon.substr(nRemoveWonLen - 4 ,nRemoveWonLen);
            sRemoveWon = sRemoveWon.substr(0,nRemoveWonLen - 4);
            aWonfour[nCnt] = sFourWon;
            nCnt++;
        }

        if(iModWonLen > 0){
            aWonfour[nCnt] = strWon.substr(0,iModWonLen);
        }
    }else{
        aWonfour[nCnt] = strWon;
    }

    var sTotalWonAmt = "";
    if(aWonfour.length > 1){
        for(var i=0; i<aWonfour.length; i++){
            var sFourModWon = String(Number(aWonfour[i]));

            if(sFourModWon.length > 3){
                sFourModWon = sFourModWon.substr(0,1) +","+ sFourModWon.substr(1,4);
            }

            if(i<1){
                if(Number(aWonfour[i]) > 0){
                    sTotalWonAmt += sFourModWon;
                }
                //alert("sTotalWonAmt0>>>>>>>"+sTotalWonAmt);
            }else{
                if(Number(aWonfour[i]) > 0){
                    if(utilComm.isNull(sTotalWonAmt)){
                        sTotalWonAmt = sFourModWon + arrBigUnit[i];
                    }else{
                        sTotalWonAmt = sFourModWon + arrBigUnit[i] +" "+ sTotalWonAmt;
                    }

                }
            }
        }
    }else{
        var sFourModWon = String(Number(aWonfour[0]));

        if(sFourModWon.length > 3){
            sFourModWon = sFourModWon.substr(0,1) +","+ sFourModWon.substr(1,4);
        }

        sTotalWonAmt += sFourModWon;
    }


    sTotalWonAmt += "원";


    return sTotalWonAmt;

    //alert("sTotalWonAmtEnd>>>>>>>"+sTotalWonAmt);
};

/**
 * @class Byte 수를 구한다. (한글 2 Byte, 영문 1 Byte)
 *
 * @param {string} p_str - Byte 수를 구할 String
 * @return byte length
 */
utilComm.getCharLength = function(p_str) {

    p_str = utilComm.getStrValue(p_str);

    var strlen = 0;
    for (var i = 0; i < p_str.length; i++) {

        var c = p_str.charCodeAt(i);
        if (c > 128) {
            strlen = strlen + 2;
        } else {
            strlen = strlen + 1;
        }
    }

    return strlen;
};

/**
 * @class index 생성
 *
 * @returns [string] _idx
 */
utilComm.makeIDX = function() {
    var _idx = "idx" + (new Date()).getTime() + Math.random() * 10000;
    return _idx;
};

/**
 * @class 전화하기로 바로가기
 *
 * @param telNo 전화번호
 */
utilComm.linkTel = function(telNo) {

    telNo = utilComm.transAcctNo(telNo);
    location.href = "tel:" + telNo + "";
};

/**
 * @class URL 에서 File ID 를 얻어온다.
 *
 * @returns File ID
 */
utilComm.getFileUrlId = function() {

    var url = location.href;
    var s1 = url.lastIndexOf("/");
    var s2 = url.lastIndexOf(".");

    var fileUrlId = url.substring(s1 + 1, s2);

    return fileUrlId;
};


/**
 * @class replaceAll 기능 구현
 *
 * @description
 *  replaceAll 기능 구현 - replace 대신 사용하면 모든 해당값이 replace 된다. ex) var 내용 =
 * "성명||영문고객명||실명번호||국적||자택주소"; 내용.replaceAll("||", "."); =>
 * 성명.영문고객명.실명번호.국적.자택주소
 */

if (typeof String.prototype.replaceAll !== "function") {
    String.prototype.replaceAll = function(target, replacement) {
        return this.split(target).join(replacement);
    };
};

/**
 * @class startsWith 기능 구현
 */
if (typeof String.prototype.startsWith !== "function") {
    String.prototype.startsWith = function(sCompare) {
        var sStart = this.substring(0, 1);
        if (sStart == sCompare) {
            return true;
        } else {
            return false;
        }
    };
};


/**
 * @class HTML 문자열 처리
 *
 * @param html - 변환할 HTML
 * @returns 변환된 HTML
 */
utilComm.htmlConvertor = function(html) {

    html = utilComm.getStrValue(html);

    if (html.indexOf("&#x0a;") > -1)
        html = utilComm.replaceAll(html, "&#x0a;", "\n");

    if (html.indexOf("&#xa;") > -1)
        html = utilComm.replaceAll(html, "&#xa;", "\n");

    html = utilComm.htmlUnescape(html);

    return html;
};

/**
 * @class 구분자 존재하는 문자열을 배열로 변환
 *
 * @param html - 변환할 HTML
 * @returns 변환된 HTML
 */
utilComm.getArraySplit = function(str, splitStr) {

    var array = new Array();

    var arrSplit = str.split(splitStr);
    for (var i = 0; i < arrSplit.length; i++) {

        var c = utilComm.getStrValue(arrSplit[i]);
        array.push(c);
    }

    return array;
};

/**
 * @class 화면에 html 태그가 그대로 보이는 경우 사용.
 */
utilComm.htmlUnescape = function(html_str) {

    var ret = "";
    ret = html_str.replace(/&lt;/g, "<").replace(/&quot;/g, "\"").replace(
        /&gt;/g, ">").replace(/&amp;/g, ";");
    return ret;
};

/**
 * @class str html 태그를 제거(", ' 제거)
 */
utilComm.htmlRemove = function(html_str) {

    var ret = "";
    ret = html_str.replace("\"", '').replace("'", '');
    return ret;
};

/**
 * @class문자열 s의 바이트수가 len 보다 크면 마지막 문자열(깨진문자)을 잘라서 리턴.
 */
utilComm.safeStr = function(s, len) {
    if (s && len && utilComm.getByteLength(s) > len)
        return s.substring(0, s.length - 2);
    else
        return s;
};

/**
 * @class 바이트 수로 문자열 컷팅
 *
 * @param oristr
 * @param len
 * @returns
 */
utilComm.cutByte = function(oristr, len) {
    var str = oristr;
    var count = 0;
    for (var i = 0; i < str.length; i++) {
        if (escape(str.charAt(i)).length >= 4) {
            count += 2;
        } else {
            if (escape(str.charAt(i)).length != "%0D") {
                count++;
            }
        }

        if (count > len) {
            if (escape(str.charAt(i)).length == "%0A") {
                i--;
            }
            break;
        }
    }
    return str.substring(0, i)
};

/**
 * @class 바이트 수로 문자열 컷팅 후 말줄임표 표시
 *
 * @param oristr
 * @param len
 * @returns
 */
utilComm.cutWord = function(oristr, len) {
    var sCutWord = utilComm.cutByte(oristr, len);

    var sComplite = sCutWord + "...";

    return sComplite;
};


/**
 * @class body 를 기준으로 스크롤을 최상위로 올린다.
 */
utilComm.scrollTop = function() {
    $("#wrap").scrollTop(0);
};

/**
 * @description
 * 자바스크립트는 부동소수점 방식(floating point)으로 계산을 하며 IEEE Standard 754규격을 따릅니다.
 * 그리고 실수의 변환을 위해 53 bit의 연산을 합니다. 정수인 경우에는 해당 기억공간에 범위안에서 정확한 결과를 나타내는데
 * 실수인 경우에는 기억공간의 범위를 벗어나는 결과가 나타나면 나머지수를 버립니다.
 * ==> 자바스크립트는 정수인경우 16자리 이상 소숫점포함 17자리 이상은 정상계산이 안됨
 * 0.3+0.6 = 0.8999999999999999
 * 1.26+1.13 = 2.3899999999999997
 * 1.265 + 1.133 = 2.3979999999999997
 * 1.2654+1.1335 = 2.3989000000000003
 * 72*0.0055 = 0.39599999999999996
 * 네이버 웹 계산기의 경우 하단에 안내 문구가 있음
 * 13번째 유효숫자에서 반올림하며, 15자리 이상의 계산은 오차가 있을수 있습니다.
 * 다음계산기도 동일
 * 간단한 웹 계산기 입니다. 14자리 이상 계산에서는 오차가 있을 수 있습니다.
 */

/**
 * @class 2개의 실수를 연산한다.
 *
 * @description
 * 연산자 = "+","-","*","/"
 * utilComm.floatCal(실수1, 실수2, 연산자);
 */
utilComm.floatCal = function(a,b,cal){
    a = a || 0;
    b = b || 0;

    var a_l = (a+"").split(".");
    var b_l = (b+"").split(".");

    if(a_l.length != 1){
        a_l = a_l[1].length;
    }else{
        a_l = 0;
    }

    if(b_l.length != 1){
        b_l = b_l[1].length;
    }else{
        b_l = 0;
    }

    var base_l = (a_l >= b_l) ? a_l : b_l;

    var c = base_l;

    var d = Number('1e' + c);
    var ret = 0;

    if(cal == "+"){
        ret = (Math.round(a*d) + Math.round(b*d)) / d;
    }else if(cal == "-"){
        ret = (Math.round(a*d) - Math.round(b*d)) / d;
    }else if(cal == "*"){
        ret = (Math.round(a*d) * Math.round(b*d)) / (d*d);
    }else if(cal == "/"){
        ret = (Math.round(a*d) / Math.round(b*d)) / (d/d);
    }
    console.log(ret);
    return ret;
};

/**
 * @class 2터치 이벤트 방지를 위한 DIM 레이어 생성
 *
 * @description
 * 파라미터 주지 않으면 생성후 0.5초뒤에 사라진다.
 * utilComm.dimviewShow(); - dim show후 0.5초후 hide
 * utilComm.dimviewShow(true); - dim show
 * utilComm.dimviewShow(true, 1000); - dim show후 1초후 hide
 * utilComm.dimviewShow(false); - dim hide
 *
 * @param bShow - show/hide 여부
 * @param nTime - 얼마후 hide 시킬지 시간(밀리초)
 */
utilComm.dimviewShow = function(bShow, nTime) {
    // 딤뷰 생성
    var dim_css = {
        "display" : "none",
        "position" : "fixed",
        "z-index" : 2002,
        "top" : 0,
        "bottom" : 0,
        "right" : 0,
        "left" : 0,
        "background-color" : "rgba(0,0,0,0)",
        "-webkit-box-pack" : "center",
        "-moz-box-pack" : "center",
        "-ms-flex-pack" : "center",
        "-webkit-justify-content" : "center",
        "justify-content" : "center",
        "-webkit-box-align" : "center",
        "-moz-box-align" : "center",
        "-ms-flex-align" : "center",
        "-webkit-align-items" : "center",
        "align-items" : "center"
    };
    var dim_active_css = {
        "display" : "-webkit-box",
        "display" : "-webkit-flex",
        "display" : "-ms-flexbox",
        "display" : "-moz-box",
        "display" : "flex"
    };

    if (bShow == true || bShow == undefined) {
        if ($('.layer-bg').length < 1) {
            var dim = $("<div>").addClass("layer-bg").css(dim_css);
            $('body').append(dim);
            utilComm.log("dim append");
        }
        $('.layer-bg').css("display", "");
        $('.layer-bg').css(dim_active_css);
        utilComm.log("dim show");

        if (bShow == undefined || utilComm.isNull(nTime) == false) {
            setTimeout(function() {
                // 딤뷰생성 0.5초뒤 제거
                $('.layer-bg').css(dim_css);
                utilComm.log("timeout dim hide");
            }, (utilComm.isNull(nTime) ? 500 : nTime));
        }
    } else {
        $('.layer-bg').css(dim_css);
        utilComm.log("dim hide");
    }
};

/**
 * @class URL이 존재하는지 확인 ()
 */
utilComm.isAccess = function(fncSuccessCallback, fncFailureCallback, sUrl) {
    $.ajax({
        type    : 'HEAD',
        url     : sUrl,
        cache   : false,
        success : function(result) {
            utilComm.log(result, sUrl + "is true");
            fncSuccessCallback();
        },
        error   : function(result) {
            utilComm.log(result , sUrl + "is false");
            fncFailureCallback(result);
        }
    });
};

/**
 * @class Text 글자수 체크 onKeyup 이벤트 사용
 *
 * @param sText - 입력 텍스트
 * @param sMaxLen - 최대 입력글자 수
 */
utilComm.textLenCheck = function(sId, sConts, sTxtlen, sMaxLen){
    var conts 		= sConts;
    var contsLen	= conts.length;

    $("#" + sTxtlen).html(contsLen);
    if(contsLen >= sMaxLen){
        $("#"+sId).val(conts.substring(0, sMaxLen-1));
        $("#" + sTxtlen).html(contsLen);
    }
    return false;
};

/**
 * @class Text 글자수 Byte 체크 onKeyup 이벤트 사용
 *
 * @param sText - 입력 텍스트
 * @param sMaxLen - 최대 입력글자 수
 */
utilComm.textLenByteCheck = function(sId, sConts, sTxtlen, sMaxLen){
    var len 		= 0;
    var minByte 	= 0;

    for(var i=0; i<sConts.length; i++){
        var ch = escape(sConts.charAt(i));

        if(ch.length == 1) len++;
        else if(ch.indexOf("%u") != -1) len += 2;
        else if(ch.indexOf("%") != -1) len++;

        if(len <= sMaxLen){
            minByte = i + 1;
        }
    }

    if(len >= sMaxLen){
        $("#"+sId).val(sConts.substring(0, minByte -1));
        $("#" + sTxtlen).html(len + "/" + sMaxLen);
        alert(sMaxLen + " Byte이상은 입력 할 수 없습니다.");
    }else{
        $("#" + sTxtlen).html(len + "/" + sMaxLen);
    }

};

/**
 * @class 만나이 계산
 *
 * @param jumin - 실명번호 (7자리 or 13자리)
 * @param callback
 */
utilComm.getManAge = function(jumin, callback){
    var age = 0;

    jumin = utilComm.getOnlyNumber(jumin);

    var s1 = jumin.substring(0, 6);
    var s2 = jumin.length == 13 ? jumin.substring(6, 13) : jumin.substring(6, 7);

//	utilComm.currentDate(null, function(ret){
    utilComm.currentDate(function(result){
        var birthDay 	 = utilComm.getBirthByVal(s1, s2);
        var extend_today = utilComm.getOnlyNumber(result);
        var currDate 	 = parseInt(extend_today, 10);
        var birthDay1 	 = parseInt(birthDay, 10);

        age = parseInt((currDate - birthDay1) / 10000 , 10);

        callback(age);
    }, "yyyy.MM.dd");

};

/**
 * @class 생년월일 구하기
 *
 * @param sJumin1 - 실명번호 앞자리
 * @param sJumin2 - 실명번호 뒷자리 (1자리 or 7자리)
 * @returns {string} 생년월일
 */
utilComm.getBirthByVal = function(sJumin1, sJumin2){
    var sYearPreCode = "";
    var sYearBase 	 = "";
    var sBirth 		 = "";

    if (sJumin1.length != 6 || sJumin1 == null || sJumin2 == null || sJumin2.length < 1)
    {
        return "0";
    }

    sYearPreCode = sJumin2.substring(0, 1);
    if ("9" == sYearPreCode || "0" == sYearPreCode) {
        sYearBase = "18";
    } else if ("1" == sYearPreCode || "2" == sYearPreCode) {
        sYearBase = "19";
    } else if ("3" == sYearPreCode || "4" == sYearPreCode) {
        sYearBase = "20";
    } else {
        return "0";
    }

    sBirth = sYearBase + sJumin1;

    return sBirth;
};
