[
    {
        "name": "youkujson",
        "find": "https?:\/\/val[fcopb]\.atm\.youku\.com\/v[fcopb]",
        "replace": "about:blank",
        "extra": "adkillrule"
    },
    {
        "name": "youkuloader",
        "find": "https?:\/\/static\.youku\.com(\/v[\d\.]*)?\/v\/swf\/loaders?[^\.]*\.swf",
        "exfind": "(bili|acfun)",
        "replace": "hostsite/loader.swf",
        "extra": "adkillrule"
    },
    {
        "name": "youkuplayer",
        "find": "https?:\/\/static\.youku\.com(\/v[\d\.]*)?\/v\/swf\/(q?player[^\.]*|\w{13})\.swf",
        "exfind": "(bili|acfun)",
        "replace": "hostsite/player.swf",
        "extra": "adkillrule"
    },
    {
        "name": "tudou",
        "find": "https?:\/\/js\.tudouui\.com\/.*PortalPlayer[^\.]*\.swf",
        "exfind": "narutom",
        "replace": "hostsite/tudou.swf",
        "extra": "adkillrule"
    },
    {
        "name": "letv",
        "find": "https?:\/\/.*letv[\w]*\.com\/.*\/((?!(Live|seed|Disk|SSDK))(S[\w]{2,3})?(?!Live)[\w]{4}|swf|(!(\d+)\/)VLetv)Player[^\.]*\.swf",
        "exfind": "(bili|acfun|(comic|hz)\.letv|duowan)",
        "replace": "hostsite/letv.swf",
        "extra": "adkillrule"
    },
    {
        "name": "letvpccs",
        "find": "https?:\/\/www.le(tv)?.com\/.*\/playerapi\/pccs_(?!(.*live|sdk)).*_?(\d+)\.xml",
        "replace": "http://www.le.com/cmsdata/playerapi/pccs_sdk_20141113.xml",
        "extra": "adkillrule"
    },
    {
        "name": "pplive",
        "find": "https?:\/\/player\.pplive\.cn\/ikan\/.*\/player4player2\.swf",
        "replace": "hostsite/player4player2.swf",
        "extra": "adkillrule"
    },
    {
        "name": "pplive_live",
        "find": "https?:\/\/player\.pplive\.cn\/live\/.*\/player4live2\.swf",
        "replace": "hostsite/pptv.in.Live.swf",
        "extra": "adkillrule"
    },
    {
        "name": "iqiyi",
        "find": "https?:\/\/www\.iqiyi\.com\/(player\/\d+\/Player|common\/flashplayer\/\d+\/(Main|Coop|share|Enjoy)?(Player[^\.]*|\d+(f98c2359|5b45a8bb)))\.swf",
        "exfind": "https?:\/\/(baidu|61|178)\.iqiyi\.com|weibo|bilibili|acfun|(music|tieba)\.baidu",
        "replace": "hostsite/iqiyi5.swf",
        "extra": "adkillrule"
    },
    {
        "name": "pps",
        "find": "https?:\/\/www\.iqiyi\.com\/player\/cupid\/.*\/pps[\w]+.swf",
        "replace": "hostsite/pps.swf",
        "extra": "adkillrule"
    },
    {
        "name": "pps_live",
        "find": "https?:\/\/www\.iqiyi\.com\/common\/.*\/am[^\.]*.swf",
        "replace": "about:blank",
        "extra": "adkillrule"
    },
    {
        "name": "sohu_live",
        "find": "https?:\/\/(tv\.sohu\.com\/upload\/swf\/(?!(ap|56|qianfan)).*\d+|(\d+\.){3}\d+(:\d+)?\/(web|wp8|test)player)\/(Main|PlayerShell)[^\.]*\.swf",
        "exfind": "(bili|acfun)",
        "replace": "hostsite/sohu_live.swf",
        "extra": "adkillrule"
    }
]
