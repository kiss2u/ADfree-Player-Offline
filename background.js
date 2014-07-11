/*
 * This file is part of ADkill Player Offline
 * <http://bbs.kafan.cn/thread-1514537-1-1.html>,
 * Copyright (C) yndoc xplsy 15536900
 *
 * ADkill Player Offline is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * GNU General Public License, see <http://www.gnu.org/licenses/>.
 */

var taburls = []; //存放tab的url与flag，用作判断重定向
var baesite = ['','','http://127.0.0.1/']; //在线播放器地址.因lovejiani拥有大量免费流量,后面将较多的使用baesite[2].如果拥有自己的服务器也可在此修改
var localflag = 1; //本地模式开启标示,1为本地,0为在线.在特殊网址即使开启本地模式仍会需要使用在线服务器,程序将会自行替换
var proxyflag = 0;	//proxy调试标记
var cacheflag = false;	//用于确定是否需要清理缓存,注意由于隐身窗口的cookie与缓存都独立与普通窗口,因此使用API无法清理隐身窗口的缓存与cookie.
//var xhr = new XMLHttpRequest();	

//====================================Crossdomin Spoofer Test
//pac script
var pac = {
  mode: "pac_script",
  pacScript: {
    data: "function FindProxyForURL(url, host) {\n" +
    	"	var regexpr = /.*\\/crossdomain\\.xml/;\n" +	//使用过程中\\将被解析成\,所以在正常正则表达式中的\/需要改写成\\/
    	"	if(regexpr.test(url)){\n " +
    	"		return 'PROXY yk.pp.navi.youku.com:80';\n" +
    	"	}\n" +
    	"	return 'DIRECT';\n" +
    	"}"
  }
};
//Permission Check + Proxy Control
function ProxyControl(pram) {
	chrome.proxy.settings.get({incognito: false}, function(config){
		//console.log(config.levelOfControl);
		//console.log(config);
		//console.log(pac);

		switch(config.levelOfControl) {
			case "controllable_by_this_extension":
			// 可获得proxy控制权限，显示信息
			console.log("Have Proxy Permission");
			proxyflag = 1;
			if(pram == "set"){
				console.log("Setup Proxy");
				chrome.proxy.settings.set({value: pac, scope: "regular"}, function(details) {});
			}
			break;

			case "controlled_by_this_extension":
			// 已控制proxy，显示信息
			console.log("Already controlled");
			proxyflag = 2;
			if(pram == "unset"){
				console.log("Release Proxy");
				chrome.proxy.settings.clear({scope: "regular"});
				FlushCache();
			}
			break;

			default:
			// 未获得proxy控制权限，显示信息
			console.log("No Proxy Permission");
			console.log("Skip Proxy Control");
			proxyflag = 0;
			break;

		}
	});
}
function FlushCache() {
	if(cacheflag) {
		chrome.browsingData.remove(
			{},{
			"cache": true,
			"fileSystems": true,
		},
		function() {
			console.log('Now flushing Cache!');
		});
	}
}
//Listeners
chrome.webRequest.onBeforeRequest.addListener(function(details) {
	for (var i = 0; i < proxylist.length; i++) {
		if (proxylist[i].find.test(details.url) && proxylist[i].extra == "crossdomain") {
			//console.log(details.url);
			console.log('Crossdomin Spoofer Rule : ' + proxylist[i].name);
			switch (proxylist[i].name) {

				default:
				//console.log("In Proxy Set");
				ProxyControl("set");
				break;

			}
			
		}
	}
	//return {cancel: false};
},
{urls: ["http://*/*", "https://*/*"]},
["blocking"]);

chrome.webRequest.onCompleted.addListener(function(details) {
	for (var i = 0; i < proxylist.length; i++) {
		if (proxylist[i].monitor.test(details.url) && proxylist[i].extra == "crossdomain") {
			//console.log(details);
			cacheflag = false;
			cacheflag = details.fromCache;
			console.log("Capture Moniter Url :" + details.url + " fromCache :" + details.fromCache + " ip :" + details.ip);
			switch (proxylist[i].name) {

				default:
				console.log("Now Release Proxy ");
				ProxyControl("unset");
				break;

			}
			
			break;
		}
	}
	
},
{urls:  ["http://*/*", "https://*/*"]});
//标签开启
chrome.tabs.onCreated.addListener(function(tab) {
	ProxyControl("unset");
});
///标签关闭
chrome.tabs.onRemoved.addListener(function(tabId) {
	ProxyControl("unset");
});
//====================================Headers Modifier Test
chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
	//console.log(details);
	for (var i = 0; i < refererslist.length; i++) {
		if (refererslist[i].find.test(details.url)) {
			//console.log(details);
			console.log('Referer Modifier Rule : ' + refererslist[i].name);
			for (var j = 0; j < details.requestHeaders.length; ++j) {
				if (details.requestHeaders[j].name === 'Referer') {
				//console.log(details.requestHeaders[j]);
					switch (refererslist[i].name) {
						case "referer_youku":
						if (/(youku|tudou)/i.test(details.requestHeaders[j].value)) {
							console.log("Referer Modifier : No need to change");
							break;
						}

						case "referer_iqiyi":
						if (/qiyi\.com/i.test(details.requestHeaders[j].value)) {
							console.log("Referer Modifier : No need to change");
							break;
						}

						default:
						console.log("Referer Modifier : Switch Default");
						if (refererslist[i].extra === "remove"){
							console.log('Referer Modifier Action : Remove');
							details.requestHeaders.splice(j, 1);
						} else {
							console.log('Referer Modifier Action : Modify');
							details.requestHeaders[j].value = refererslist[i].replace;
						}
						break;
					}

				//console.log(details.requestHeaders[j]);
					break;
				}
				/*if (details.requestHeaders[i].name === 'User-Agent') {
					//details.requestHeaders.splice(i, 1);
					details.requestHeaders[i].value = "Mozilla/5.0 (LETVC1;iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/535.35 (KHTML, like Gecko)";
					//console.log(details.requestHeaders[i]);
				}*/
			}
		}
	}
	//Add Cache Controler
/*	for (var i = 0; i < proxylist.length; i++){
			if (proxylist[i].realurl.test(details.url)) {
				console.log('Cache-Control Modifier');
				for (var j = 0; j < details.requestHeaders.length; ++j) {
					if (details.requestHeaders[j].name === 'Cache-Control') {

						details.requestHeaders[j].value = "no-cache";
				}
				break;
			}
		}
	}
*/
	return {requestHeaders: details.requestHeaders};
},{urls: ["http://*/*", "https://*/*"]},
["blocking", "requestHeaders"]);

//====================================

///阻挡广告及重定向
chrome.webRequest.onBeforeRequest.addListener(function(details) {
	var url = details.url;
	var id = "tabid" + details.tabId; //记录当前请求所属标签的id
	var type = details.type;

	if (details.tabId == -1) //不是标签的请求直接放过
		return;

	if (type == "main_frame") { //是标签主框架的url请求
		console.log(id);
		//console.log(url);
		taburls[id] = []; //二维数组
		taburls[id][0] = url;
//		console.log(url);
		taburls[id][1] = 1; //默认值,对于iqiyi来说是载入v5播放器,对于letv来说是载入普通LETV播放器可本地(但在线调用letv播放器如:AB站 Letvcloud LetvViKi,不能使用本地地址)http://www.letv.com/ptv/pplay/90558/2.html
		//=======================
		if (/.*\.iqiyi\.com/i.test(url)) { //消耗流量与资源对iqiyi和letv的进一步判断,不过现在只有iqiyi的有作用letv不需要这样判断了
//		if (/(^((?!(baidu|61)).)*\.iqiyi\.com)|(letv.*\..*htm)/i.test(url)) {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {	
//					console.log(/iqiyi|letv/i.exec(url));
					switch (/iqiyi|letv/i.exec(url)[0]) {
						case "iqiyi":
						console.log("XHR Switch : iqiyi|pps");
						taburls[id][1] = /data-flashplayerparam-flashurl/i.test(xhr.responseText);
						break;

						case "letv":
						console.log("XHR Switch : letv");
						taburls[id][1] = !/VLetvPlayer/.test(xhr.responseText);
						break;

						default:
						console.log("XHR Switch : default");
						break;
					}					
					console.log("Url : " + taburls[id][0]);
					console.log("Flag State : " + taburls[id][1]);
					//console.log(xhr.responseText);
				}
			}
			xhr.send();
		}
		//=======================
	} else {
//		console.log(id);
	}

	try {//在此运行代码

		var testUrl = taburls[id][0]; //该请求所属标签的url
	} catch(err) {

		return;//在此处理异常
	}
	
	//console.log(testUrl);
	//URL重定向列表
	for (var i = 0; i < redirectlist.length; i++) {
		if (type == "main_frame") //是主框架请求则规则失效
			continue;
		if (redirectlist[i].find.test(url)) {
			console.log(url);
			var newUrl = url.replace(redirectlist[i].find, redirectlist[i].replace);
			//重定向细化规则部分开始
			//console.log(redirectlist[i].name);
			console.log("Switch : " + redirectlist[i].name);

			switch (redirectlist[i].name)
			{
				case "letvcore":
				//console.log("Switch : letvcore");
				console.log("Is OnlinePlayer : " + !letvflag);
				if (/(bili|acfun|com\/zt)/i.test(testUrl) || !letvflag || !localflag) { //特殊网址的Flash内部调用特例,同时在线播放器不可调用本地核心
					newUrl = url; //不支持重定向,返回原值,服务器未同步letv核心
					//newUrl = url.replace(redirectlist[i].find, baesite[2] + 'kernelletv.swf');
				}
				break;

				case "letv":
				//console.log("Switch : letv");
				letvflag = taburls[id][1];
				if (/(bili|acfun|com\/zt|duowan)/i.test(testUrl) || !letvflag && localflag) { //特殊网址的Flash内部调用特例,只处理设置为本地模式的情况
					newUrl = url.replace(redirectlist[i].find, baesite[2] + 'letv.swf'); //转换成在线
				}
				break;
/*
				case "letvpccs":
				//console.log("Switch : letvpccs");
				
				break;
*/
				case "iqiyi":
				//console.log("Switch : iqiyi");	
				if(/v\..*iqiyi\.com/i.test(testUrl)){	//强制v5名单 无法使用v5flag进行判断的特殊类型
					console.log("Force to iqiyi5");
				} else {
					if (/(baidu|61|178)\.iqiyi\.com|weibo|yaku\.tv/.test(testUrl)) { //外链名单
						console.log("Out Side");
						if (/(bili|acfun)/i.test(testUrl)) { //特殊网址Flash内部调用切换到非本地模式
							//							newUrl = url.replace(redirectlist[i].find,baesite[ getRandom(3) ] + 'iqiyi_out.swf');	//多服务器均衡,因服务器原因暂未开启
							newUrl = url.replace(redirectlist[i].find, baesite[2] + 'iqiyi_out.swf');
						} else {
							newUrl = newUrl.replace(/iqiyi5/i, 'iqiyi_out');
						}
					} else { //iqiyi本站v4 v5
						//newUrl = newUrl.replace(/iqiyi5/i,'iqiyi');	//先行替换成v4
						console.log("Judge Flag");
						v5flag = taburls[id][1]; //读取flag存储
						if (!v5flag || /pps\.tv/i.test(testUrl)) {	//不满足v5条件换成v4,或者在pps.tv域名下强制改变
							newUrl = newUrl.replace(/iqiyi5/i, 'iqiyi');
						} 
					}
				}
				break;
/*				
				case "iqiyicore4":
				case "iqiyicore5":
				//console.log("Switch : iqiyicore");
				if (/(bili|acfun)/i.test(testUrl)) { //特殊网址Flash内部调用切换到非本地模式
					//							newUrl = url.replace(redirectlist[i].find,baesite[ getRandom(3) ] + 'iqiyi_out.swf');	//多服务器均衡,因服务器原因暂未开启
					newUrl = url.replace(redirectlist[i].find, baesite[2] + 'iqiyicore5.swf');
				}
				v5flag = taburls[id][1]; //读取flag存储
				if (!v5flag) newUrl = newUrl.replace(/iqiyicore5/i, 'iqiyicore4'); //不满足v5条件换成v4
				break;
*/
				case "youku":
				//console.log("Switch : youku");
				if (/(bilibili)/i.test(testUrl)) { //特殊网址Flash内部调用切换到非本地模式
				//		newUrl = url.replace(redirectlist[i].find,baesite[ getRandom(3) ] + 'loader.swf' + "?showAd=0&VideoIDS=$2");	//多服务器均衡,因服务器原因暂未开启
						newUrl = url.replace(redirectlist[i].find, baesite[2] + 'loader.swf');
					}
				break;

				//case "tudou_sp":
				case "tudou":
				//console.log("Switch : tudou");
				if (/narutom/i.test(testUrl)) { //特殊网址由于网页本身参数不全无法替换tudou
						console.log("Can not redirect Player!");
						newUrl = url;
					}
				break;

				case "sohu":
				//console.log("Switch : sohu");
				letvflag = taburls[id][1];
				if (/bili|acfun/i.test(testUrl)) { //特殊网址的Flash内部调用特例,只处理设置为本地模式的情况
					newUrl = url.replace(redirectlist[i].find, baesite[2] + 'sohu.swf'); //转换成在线
				}
				break;

				default:
				console.log("Switch : Default");
				break;
			}

			//重定向细化规则部分结束
			console.log(newUrl);
			newUrl = decodeURIComponent(newUrl);
			return {
				redirectUrl: newUrl
			};
		}
	}

	return {
		cancel: false
	};
}, {
	urls: ["http://*/*", "https://*/*"]
}, ["blocking"]);

function getUrl(path) {
	return chrome.extension.getURL(path);
}

function getRandom(num) //生成0到num-1的伪随机数
{
	return Math.floor(Math.random() * num);
}

///标签关闭
chrome.tabs.onRemoved.addListener(function(tabId) {
	var id = "tabid" + tabId; //记录当前请求所属标签的id
	if (taburls[id])
		delete taburls[id];
});

//URL重定向规则(用于替换播放器)
/*格式：
	name:规则名称
	find:匹配(正则)表达式
	replace:替换(正则)表达式,注意此处有多种方式,可看后续说明并按需选择
	extra:额外的属性,如adkillrule代表是去广告规则
*/
var redirectlist = [{
		name: "youku",
		find: /^http:\/\/static\.youku\.com\/.*?q?(player|loaders?)(_[^.]+)?\.swf/,
		//		replace: getUrl('swf/loader.swf'),	//纯本地
		//		replace: localflag ? getUrl('swf/loader.swf') : baesite[ getRandom(3) ] + 'loader.swf',	//多服务器流量一样的时候,进行均衡.目前由于流量不一致,不启用.下方语句同理
		replace: localflag ? getUrl('swf/loader.swf') : baesite[2] + 'loader.swf',
		extra: "crossdomain"
	}, /*{
		name: "youku_out",
		find: /http:\/\/player\.youku\.com\/player\.php\/(.*\/)?sid\/([\w=]+)\/v\.swf/,
		//		replace: getUrl('swf/loader.swf') + "?showAd=0&VideoIDS=$2",
		//		replace: ( localflag ? getUrl('swf/loader.swf') : baesite[ getRandom(3) ] + 'loader.swf' ) + "?showAd=0&VideoIDS=$2",
		replace: (localflag ? getUrl('swf/loader.swf') : baesite[2] + 'loader.swf') + "?showAd=0&VideoIDS=$2",
		extra: "adkillrule"
	}, */{
		name: "ku6",
		//find: /http:\/\/player\.ku6cdn\.com\/default\/common\/player\/\d*\/player\.swf/,
		find: /http:\/\/player\.ku6cdn\.com\/default\/loader\/.*\/v\.swf/,
		//		replace: getUrl('swf/ku6.swf'),
		//		replace: localflag ? getUrl('swf/ku6.swf') : baesite[ getRandom(3) ] + 'ku6.swf',
		replace: localflag ? getUrl('swf/ku6.swf') : baesite[2] + 'ku6.swf',
		extra: "adkillrule"
	}, {
		name: "tudou",
		find: /http:\/\/js\.tudouui\.com\/.*PortalPlayer[^\.]*\.swf/i,
		//		replace: getUrl('swf/tudou.swf'),
		//		replace: localflag ? getUrl('swf/tudou.swf') : baesite[ getRandom(3) ] + 'tudou.swf',
		replace: localflag ? getUrl('swf/tudou.swf') : baesite[2] + 'tudou.swf',
		extra: "adkillrule"
	}, {
		name: "tudou_olc",
		find: /http:\/\/js\.tudouui\.com\/.*olc[^\.]*\.swf/i,
		//		replace: getUrl('swf/olc_8.swf'),
		//		replace: baesite[ getRandom(3) ] + 'olc_8.swf',
		replace: baesite[0] + 'olc_8.swf',
		extra: "adkillrule"
	}, {
		name: "tudou_sp",
		find: /http:\/\/js\.tudouui\.com\/.*SocialPlayer[^\.]*\.swf/i,
		//		replace: getUrl('swf/sp.swf'),
		//		replace: baesite[ getRandom(3) ] + 'sp.swf',
		replace: baesite[2] + 'sp.swf',
		extra: "adkillrule"
}, {
		name: "letv",
		find: /http:\/\/.*letv[\w]*\.com\/(hz|.*\/(?!(Live|seed))(S[\w]{2,3})?(?!Live)[\w]{4})Player[^\.]*\.swf/i,
		//		replace: getUrl('swf/letv.swf'),
		//		replace: localflag ? getUrl('swf/letv.swf') : baesite[ getRandom(3) ] + 'letv.swf',
		replace: localflag ? getUrl('swf/letv.swf') : baesite[2] + 'letv.swf',
		extra: "adkillrule"
	},
	//letv本地版特有部分,某些情况下本地加载不可使用,同时在线服务器未同步对应swf文件,如后续同步可开启
	/*
	{
		name: "letvcore",
		find: /http:\/\/.*letv[\w]*\.com\/.*\/k.*\.swf/i,
		replace: getUrl('swf/kernelletv.swf'),
		//		replace: localflag ? getUrl('swf/kernelletv.swf') : baesite[ getRandom(3) ] + 'kernelletv.swf',
		extra: "adkillrule"
	},
	*/
	//letv本地版特有部分结束
	{
		name: "letvpccs",
		find: /http:\/\/www.letv.com\/zt\/cmsapi\/playerapi\/pccs_(?!live).*_(\d+)\.xml/i,
		replace: "http://www.letv.com/zt/cmsapi/playerapi/pccs_sdk_$1.xml",
		extra: "adkillrule"
	},/*{
		name: "letvskin",
		find: /http:\/\/.*letv[\w]*\.com\/p\/\d+\/\d+\/(?!1456)\d*\/newplayer\/\d+\/SLetvPlayer\.swf/i,
		replace: "http://player.letvcdn.com/p/201403/05/1456/newplayer/1/SLetvPlayer.swf",
		extra: "adkillrule"
	},*/ {
		name: "pplive",
		find: /(\/\/|\.)player\.pplive\.cn.*\/PPLivePlugin\.swf/i,
		replace: "about:blank",
		extra: "adkillrule"
	}, {
		name: "iqiyi",
		find: /^http:\/\/www\.iqiyi\.com\/player\/(\d+\/Player|[a-z0-9]*)\.swf/,
		//		replace: getUrl('swf/iqiyi5.swf'),
		//		replace: localflag ? getUrl('swf/iqiyi5.swf') : baesite[ getRandom(3) ] + 'iqiyi5.swf',
		replace: localflag ? getUrl('swf/iqiyi5.swf') : baesite[2] + 'iqiyi5.swf',
		extra: "adkillrule"
	}, {
		name: "pps",
		find: /http:\/\/www\.iqiyi\.com\/player\/cupid\/.*\/pps[\w]+.swf/i,
		replace: localflag ? getUrl('swf/pps.swf') : baesite[2] + 'pps.swf',
		extra: "adkillrule"
	},
	/*{
		name: "iqiyicore4",
		find: /^http:\/\/www\.qiyipic\.com\/.*\/fix\/cp20.*\.jpg/,
		//		replace: getUrl('swf/iqiyi5.swf'),
		//		replace: localflag ? getUrl('swf/iqiyi5.swf') : baesite[ getRandom(3) ] + 'iqiyi5.swf',
		replace: localflag ? getUrl('swf/iqiyicore4.swf') : baesite[2] + 'iqiyicore4.swf',
		extra: "adkillrule"
	}, {
		name: "iqiyicore5",
		find: /^http:\/\/www\.qiyipic\.com\/.*\/fix\/cp21.*\.jpg/,
		//		replace: getUrl('swf/iqiyi5.swf'),
		//		replace: localflag ? getUrl('swf/iqiyi5.swf') : baesite[ getRandom(3) ] + 'iqiyi5.swf',
		replace: localflag ? getUrl('swf/iqiyicore5.swf') : baesite[2] + 'iqiyicore5.swf',
		extra: "adkillrule"
	},*/ {
		name: "sohu",
		find: /http:\/\/tv\.sohu\.com\/upload\/swf\/.*\d+\/(main|PlayerShell)\.swf/i,
		//		replace: getUrl('swf/iqiyi5.swf'),
		//		replace: localflag ? getUrl('swf/iqiyi5.swf') : baesite[ getRandom(3) ] + 'iqiyi5.swf',
		//replace: localflag ? getUrl('swf/sohu.swf') : baesite[2] + 'sohu.swf',
		replace: baesite[2] + 'sohu.swf',
		extra: "adkillrule"
	}
];
//Referer修改规则
/*格式：
	name:规则名称
	find:匹配(正则)表达式
	replace:替换(正则)表达式,注意此处有多种方式,可看后续说明并按需选择
	extra:额外的属性,remove表示去除Referer参数
*/
var refererslist = [{
		name: "referer_youku",
		find: /f\.youku\.com/i,
		replace: "http://player.youku.com/player.php",
		extra: ""	//use "remove" is also acceptable
	},{
		name: "referer_56",
		find: /\.56\.com/i,
		replace: "",
		extra: "remove"
	},{
		name: "referer_iqiyi",
		find: /cache\.video\.qiyi\.com/i,
		replace: "",
		extra: "remove"
	}
	]
//Crossdomain修改规则
/*格式：
	name:规则名称
	find:匹配(正则)表达式,当出现匹配地址时,启动crossdomain代理修改
	monitor:匹配(正则)表达式,当出现匹配地址时,释放crossdomain代理(接收完成后)
	extra:额外的属性,crossdomain表示启动修改
*/
var proxylist = [{
		name: "crossdomain_youku",
		find: /http:\/\/static\.youku\.com\/.*?q?(player|loaders?)(_[^.]+)?\.swf/i,	//播放器载入地址
		monitor: /http:\/\/v\.youku\.com\/crossdomain\.xml/i,	//youku tudou实际访问的均是这个地址
		extra: "crossdomain"
	},{
		name: "crossdomain_tudou",
		find: /.*PortalPlayer[^\.]*\.swf/i,
		monitor: /http:\/\/v\.youku\.com\/crossdomain\.xml/i,
		extra: "crossdomain"
	},{
		name: "crossdomain_tudou_sp",
		find: /.*olc[^\.]*\.swf/i,
		monitor: /http:\/\/v\.youku\.com\/crossdomain\.xml/i,
		extra: "crossdomain"
	},{
		name: "crossdomain_sohu",
		find: /http:\/\/tv\.sohu\.com\/upload\/swf\/.*\d+\/(main|PlayerShell)\.swf/i,
		//monitor: /.*skins\/s[\d]+\.swf/i,
		monitor: /http:\/\/live\.tv\.sohu\.com\/crossdomain\.xml/i,
		extra: "crossdomain"
	},{
		name: "crossdomain_iqiyi|pps-1",
		find: /http:\/\/www\.iqiyi\.com\/player\/(\d+\/Player|[a-z0-9]*|cupid\/.*\/(pps[\w]+|clear))\.swf/i,
		//monitor: /.*skins\/s[\d]+\.swf/i,
		monitor: /http:\/\/data\.video\.qiyi\.com\/crossdomain\.xml/i,
		extra: "crossdomain"
	},{
		name: "crossdomain_iqiyi|pps-2",
		find: /http:\/\/www\.iqiyi\.com\/player\/cupid\/common\/icon\.swf/i,
		//monitor: /.*skins\/s[\d]+\.swf/i,
		monitor: /http:\/\/sf\.video\.qiyi\.com\/crossdomain\.xml/,
		//monitor: /http:\/\/\d+.\d+.\d+.\d+\/crossdomain\.xml/i,
		extra: "crossdomain"
	}
	]