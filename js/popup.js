/**
 * Created by suyanlong on 2017/4/25.
 */


//1、点击弹出信息。向后台脚本发送当前域名的信息。
//2、错误信心。
//3、后台页面与popup页面要双向交互，才行。

$(function () {
        //得到当前活动页面的url
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
            console.log(tabs[0]);
            console.log(domainURI(tabs[0].url));
            chrome.runtime.sendMessage(tabs[0].url, callbackServer);
        })
    }
);

//TODO
function callbackServer(data) {
    console.log("-------------" + data);
    var objdata = JSON.parse(data);
    // document.getElementById(registerId).nodeValue = objdata[registerId];
    $("#registerId").text(objdata.registerId);
    $("#ownId").text(objdata.ownId);
    $("#firsAddress").text(objdata.firsAddress);
    $("#checkTime").text(objdata.checkTime);
    $("#url").text(objdata.url);
    $("#status").text(objdata.status);
}

function domainURI(str) {
    var durl = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
    domain = str.match(durl);
    return domain[0];
}
