/**
 * Created by suyanlong on 2017/4/25.
 */

// use 'static';
// storage node indfomation.

// var abi = require('ethereumjs-abi');


// returns the encoded binary (as a Buffer) data to be sent
// var encoded = abi.rawEncode([ "address" ], [ "0x0000000000000000000000000000000000000000" ]);

// returns the decoded array of arguments
// var decoded = abi.rawDecode([ "address" ], data);

var serverUrl = new Map();
serverUrl.set("http://cn.bing.com/", "http://cn.bing.com/");

// var abi = EthJS.ABI;
// var BufferEX = EthJS.Buffer;

var Web3 = require('web3'); //自己实现的关键字.其实就是函数.
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://192.168.3.109:8540"));
var version = web3.version.api;
console.log(version); // "0.2.0"

function CreatTabStatus(tabId, status) {
    this.id = id;
    this.status = status;
}

var mapTablStatus = new Map();

/**
 * 0,1,2,3,
 * @type {boolean}
 */
var tabStatus = 0;
var curTabid;
var abi = [{"constant":false,"inputs":[{"name":"num","type":"bytes32"},{"name":"name","type":"string"},{"name":"property","type":"string"},{"name":"principle","type":"string"}],"name":"upload_org","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"num","type":"bytes32"}],"name":"get_org","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"org","outputs":[{"name":"num","type":"bytes32"},{"name":"name","type":"string"},{"name":"property","type":"string"},{"name":"principle","type":"string"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"num","type":"bytes32"}],"name":"Upload_org","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"num","type":"bytes32"}],"name":"Get_org","type":"event"}];

function domainURI(str) {
    var durl = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
    domain = str.match(durl);
    return domain[0];
}

// 网站备案/许可证号，主办单位编号，状态（通过、关停、过期），域名，网站名称，首页地址，审核时间。
var querylocateUrl = new Map();
function CreateLocateUrl() {
    this.registerId = ""; //网站备案/许可证号
    this.ownId = ""; //主办单位编号
    this.status = ""; //状态0,1,2
    this.url = ""; //域名
    // this.urlName = "";
    // this.urlOwn = "";
    this.firsAddress = ""; //首页地址
    this.checkTime = ""; //审核时间。
}

function NodeInfo(query, ip) {
    this.queryUrl = query;
    this.ip = ip;
}

var nodeInfo = new NodeInfo("http://127.0.0.1:1377", "127.0.0.1");

var nodeMapInfo = new Map();
nodeMapInfo.set("127.0.0.1", nodeInfo);


function sendTobefore(obj) {

}

//图标不要超过128px * 128px
function setIcon(status) {

    var icon = "";
    if (status == 0) {
        icon = "../images/sucess.png";

    } else if (status == 1) {
        icon = "../images/error.png";

    } else if (status == 2) {
        icon = "../images/waing.png";
    } else {
        //default -1
        icon = "../images/defalut.png";
    }
    console.log(icon);
    // chrome.browserAction.setIcon({path: '../images/'+(status?'icon19.png':'offline.png')});
    chrome.browserAction.setIcon({
        path: icon
    });
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

function queryUrlInfo(serverUrl) {
    if (nodeMapInfo.has(serverUrl)) {
        return;
    }
    // var url = "http://192.168.3.109:8540";
    // var data = '{"jsonrpc":"2.0","method":"getInfo","params":["' + serverUrl + '"],"id":1}';
    // var data = '{"jsonrpc":"2.0","method":"cita_blockHeight","params":[],"id":2}';
    //TODO 向四个节点发数据。
    // var data = '{"method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":1,"jsonrpc":"2.0"}';
    // var param = abi.methodID('get_org', ['string','string','string']).toString('hex') + abi.rawEncode(['bytes32'], [123]).toString('hex');
    // console.log(param);
    // var data = '{"method":"eth_call","params":[{ "to": "0xafbA601690B87C0f2f5296af4860A4E56d32F3C9","data": "0x7aa66e11000000000000000000000000000000000000000000000000000000000000007b"}],"id":1,"jsonrpc":"2.0"}';
    // var data = '{"method":"eth_call","params":[{ "to": "0x8C602c7997ECE23A5e16c6a2e26b549106D9b717","data": "0x' + param + '"}],"id":1,"jsonrpc":"2.0"}';
    // console.log(data);
    // $.post(url, data, function (serv_data, status, xhr) {
    //     console.log(serv_data); // server return data;
    //     switch (status) {
    //         case "success":
    //             {
    //                 console.log("ajax request completed!");
    //                 // data[""] 模拟数据
    //                 // data = '{"registerId": "浙B2-20080224-1", "url": "www.baidu.com", "checkTime": "2017-04-25", "firsAddress": "www.baidu.com", "status": "通过", "ownId": "浙B2-20080224"}';
    //                 setIcon(0);
    //                 // storageReturnInfo(data);
    //                 break;
    //             }
    //         case "notmodified":
    //             {
    //                 break;
    //             }
    //         case "error":
    //             {
    //                 console.log("error");
    //                 break;
    //             }
    //         case "timeout":
    //             {
    //                 console.log("timeout");
    //                 break;
    //             }
    //         case "parsererror":
    //             {
    //                 console.log("parsererror");
    //                 break;
    //             }
    //         default:
    //             {
    //                 console.log("other error!");
    //             }
    //     }
    // },"application/json");
    // $.ajax(
    //     {
    //         url: url,
    //         type: "POST",
    //         contentType: "application/json",
    //         dataType: "json",
    //         data: data,
    //         complete: function (xhr, status) {
    //             console.log("-------------status----");
    //             console.log(status);
    //             // console.log(arguments);
    //
    //         },
    //         error: function (xhr, status, error) {
    //             console.log("-------------error----");
    //             console.log(error);
    //             // console.log(arguments);
    //         },
    //         success: function (result, status, xhr) {
    //             console.log("-------------result-----");
    //             console.log(result);
    //             var str = result.result.toString();
    //             str = str.slice(2);
    //             console.log(str);
    //             // new BufferEX.Buffer
    //             // function get_org(uint num) constant returns(uint,string,uint,string){
    //             var Deresult = abi.rawDecode(['string','string','string'], new BufferEX.Buffer(str, 'hex'));
    //
    //             console.log(Deresult);
    //         }
    //     }
    // );
    // $(document).ajaxError(function(event,xhr,options,exc){
    //     console.log(arguments);
    // });


    // creation of contract object
    var MyContract = web3.eth.contract(abi);

// initiate contract for an address
    var myContractInstance = MyContract.at('0x1ffB8accd6d248f36bD2Fa56821C76b42dEF7B5D');

// call constant function
    var str = web3.toHex("0x01");
    var result = myContractInstance.get_org.call(str);
    console.log(result); // '0x25434534534'
    // TODO
    successBack(result);

}

/**
 * //成功返回数据
 */
function successBack(data) {

    //默认 通过、关停、过期 => -1 0 1 2
    var status = 1;
    mapTablStatus.set(curTabid, status);
    // chrome.tabs.getCurrent(function(tab){
    //     console.log(arguments);
    // });
    // chrome.tabs.query({
    //     currentWindow: true,
    //     active: true
    // }, function (tabs) {
    //     //保存当前页面的状态
    //     mapTablStatus.set(tabs[0],new CreatTabStatus(tabs[0],status,domainURI(tabs[0].url)));
    // });

}

function preCallback(details) {

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
}

(function () {
    chrome.webRequest.onBeforeRequest.addListener(
        preCallback, {
            urls: ["*://*/"]
        }, ["blocking"]
    );
})();

//TODO
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // if (message == 'clickPopup') {
    console.log(message);
    console.log(sender);
    var data = '{"registerId": "浙B2-20080224-1", "url": "www.baidu.com", "checkTime": "2017-04-25", "firsAddress": "www.baidu.com", "status": "通过", "ownId": "浙B2-20080224"}';
    //TODO
    sendResponse(data);
    // }
});


/**
 * 标签页更新时的事件
 */
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    ChangesIcodeTabStatus(tabId);
});

/**
 * 注册新切换标签页与切换已有标签时的事件
 *
 */
chrome.tabs.onSelectionChanged.addListener(function (tabId, selectInfo, tab) {
    curTabid = tabId;
    // mapTablStatus.set(tabs[0],new CreatTabStatus(tabs[0],status,domainURI(tabs[0].url)));
    ChangesIcodeTabStatus(tabId);

});

chrome.tabs.onRemoved.addListener(function (tabid, windwos) {
    console.log(arguments);
    mapTablStatus.remove(tabId);
});

function ChangesIcodeTabStatus(tabId) {
    if (mapTablStatus.get(tabId)) {
        setIcon(mapTablStatus.get(tabId));
    } else {

    }
}

