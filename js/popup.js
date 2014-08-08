/*
 * This file is part of ADkill Player Offline
 * <http://bbs.kafan.cn/thread-1514537-1-1.html>,
 * Copyright (C) yndoc xplsy 15536900
 * This work is based on:
 * "Switchy! Chrome Proxy Manager and Switcher" (by Mohammad Hejazi)
 * "SwitchyPlus" by @ayanamist (http://twitter.com/ayanamist)
 * ADkill Player Offline is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * GNU General Public License, see <http://www.gnu.org/licenses/>.
 */

var extension = null;

function init() {
    extension = chrome.extension.getBackgroundPage();
    extension.initRules();
}

function closePopup() {
    window.close();
}

function openSupportWebsite() {
    closePopup();
    chrome.tabs.create({
        url:'http://bbs.kafan.cn/thread-1514537-1-1.html'
    });
}

function fetchNewRule() {
    extension.recordlog("Force Update!");
    extension.recordlog(extension.decode64("aGFoYXRlc3Q="));
    extension.fetchAllRule();
    closePopup();
}

$(document).ready(function(){
    init();
    $("#getNewRule").click(fetchNewRule);
    $("#getSupport").click(openSupportWebsite);
});
