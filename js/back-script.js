/**
 * Created by suyanlong on 2017/4/25.
 */

// use 'static';
//storage node indfomation。

var serverUrl = new Map();
serverUrl.set("http://cn.bing.com/", "http://cn.bing.com/");

// 网站备案/许可证号，主办单位编号，状态（通过、关停、过期），域名，网站名称，首页地址，审核时间。
var querylocateUrl = new Map();

function CreateLocateUrl() {
    this.registerId = "";//网站备案/许可证号
    this.ownId = "";//主办单位编号
    this.status = "";//状态0,1,2
    this.url = "";//域名
    // this.urlName = "";
    // this.urlOwn = "";
    this.firsAddress = "";//首页地址
    this.checkTime = "";//审核时间。
}


var nodeInfo = {
    queryUrl: "",//query url
    ip: "127.0.0.1"
};


function sendTobefore(obj) {

}

function setIcon(status) {
    var icon = "";
    if (status == 0) {
        icon = "0.png";

    } else if (status == 1) {
        icon = "1.png";

    } else if (status == 2) {
        icon = "3.png";
    } else {
        //default
        icon = "default.png";
    }
    chrome.browserAction.setIcon({path: './img/' + icon});
}

function storageReturnInfo(data) {
    console.log(data);
    var local = new CreateLocateUrl();
    local.registerId = data.registerId;
    local.url = data.url;
    local.checkTime = data.checkTime;
    local.firsAddress = data.firsAddress;
    local.status = data.status;
    local.ownId = data.ownId;
    querylocateUrl.set(local.url, local);
}

function queryUrlInfo(url) {
    $.get(serverUrl, function (data, status, xhr) {
        console.log(data);// server return data;
        switch (status) {
            case "success": {
                console.log("ajax request completed!");
                // data[""] 模拟数据
                // data = '{"registerId": "浙B2-20080224-1", "url": "www.baidu.com", "checkTime": "2017-04-25", "firsAddress": "www.baidu.com", "status": "通过", "ownId": "浙B2-20080224"}';
                storageReturnInfo(data);
                break;
            }
            case "notmodified": {
                break;
            }
            case "error": {
                console.log("error");
                break;
            }
            case "timeout": {
                console.log("timeout");
                break;
            }
            case "parsererror": {
                console.log("parsererror");
                break;
            }
            default: {
                console.log("other error!");
            }
        }
    });
}

function callback(details) {
    console.log("-------------------------");
    console.log(details);
    if (querylocateUrl.has(details.url)) {
        //exist url infomation
        // querylocateUrl.get(details.url)
        //TODO

    } else {
        for (let vaule of serverUrl.values()) {
            console.log(vaule);
            if (serverUrl.has(details.url)) {
                return;
            } else {
                queryUrlInfo(vaule);
            }

        }
    }

    //TODO
    var status = 0;
    setIcon(status);

}

(function () {
    chrome.webRequest.onBeforeRequest.addListener(
        callback,
        {
            urls: ["*://*/"]
        },
        ["blocking"]
    );
})();

//TODO
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // if (message == 'clickPopup') {
    console.log(message);
    console.log(sender);
    var data = '{"registerId": "浙B2-20080224-1", "url": "www.baidu.com", "checkTime": "2017-04-25", "firsAddress": "www.baidu.com", "status": "通过", "ownId": "浙B2-20080224"}';
    sendResponse(data);
    // }
});

