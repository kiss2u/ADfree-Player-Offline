[
    {
        "name": "youkuloader",
        "find": "http:\/\/static\.youku\.com(\/v[\d\.]*)?\/v\/swf\/loaders?\.swf",
        "exfind": "(bili|acfun)",
        "replace": "hostsite/loader.swf",
        "extra": "crossdomain"
    },
    {
        "name": "youkuplayer",
        "find": "http:\/\/static\.youku\.com(\/v[\d\.]*)?\/v\/swf\/q?player.*\.swf",
        "exfind": "(bili|acfun)",
        "replace": "hostsite/player.swf",
        "extra": "crossdomain"
    },
    {
        "name": "ku6",
        "find": "http:\/\/player\.ku6cdn\.com\/default\/.*\/(v|player)\.swf",
        "replace": "hostsite/ku6.swf",
        "extra": "adkillrule"
    },
    {
        "name": "tudou",
        "find": "http:\/\/js\.tudouui\.com\/.*PortalPlayer[^\.]*\.swf",
        "exfind": "narutom",
        "replace": "hostsite/tudou.swf",
        "extra": "adkillrule"
    },
    {
        "name": "tudou_olc",
        "find": "http:\/\/js\.tudouui\.com\/.*olc[^\.]*\.swf",
        "replace": "hostsite/olc_8.swf",
        "extra": "adkillrule"
    },
    {
        "name": "tudou_sp",
        "find": "http:\/\/js\.tudouui\.com\/.*SocialPlayer[^\.]*\.swf",
        "replace": "hostsite/sp.swf",
        "extra": "adkillrule"
    },
    {
        "name": "letv",
        "find": "http:\/\/.*letv[\w]*\.com\/.*\/((?!(Live|seed))((C|S)[\w]{2,3})?(?!Live)[\w]{4}|swf)Player*\.swf",
        "exfind": "(bili|acfun|com\/zt|duowan)",
        "replace": "hostsite/letv.swf",
        "extra": "adkillrule"
    },
    {
        "name": "letvpccs",
        "find": "http:\/\/www.letv.com\/.*\/playerapi\/pccs_(?!live).*_(\d+)\.xml",
        "replace": "http://www.letv.com/cmsdata/playerapi/pccs_sdk_$1.xml",
        "extra": "adkillrule"
    },
    {
        "name": "pplive",
        "find": "(\/\/|\.)player\.pplive\.cn.*\/PPLivePlugin\.swf",
        "replace": "about:blank",
        "extra": "adkillrule"
    },
    {
        "name": "iqiyi",
        "find": "https?:\/\/www\.iqiyi\.com\/(player\/(\d+\/Player|[a-z0-9]*)|common\/flashplayer\/\d+\/(Main|Share)?Player_.*)\.swf",
        "exfind": "(baidu|61|178)\.iqiyi\.com|weibo|yaku\.tv|bilibili|acfun",
        "replace": "hostsite/iqiyi5.swf",
        "extra": "adkillrule"
    },
    {
        "name": "iqiyip2p",
        "find": "https?:\/\/www\.iqiyi\.com\/common\/flashplayer\/\d+\/\d[a-z0-9]*.swf",
        "replace": "http://www.iqiyi.com/player/20140709110406/20088.swf",
        "extra": "adkillrule"
    },
    {
        "name": "pps",
        "find": "https?:\/\/www\.iqiyi\.com\/player\/cupid\/.*\/pps[\w]+.swf",
        "replace": "hostsite/pps.swf",
        "extra": "adkillrule"
    },
    {
        "name": "sohu",
        "find": "http:\/\/tv\.sohu\.com\/upload\/swf\/(?!(live|\d+)).*\d+\/(main|PlayerShell)\.swf",
        "exfind": "(bili|acfun)",
        "replace": "hostsite/sohu.swf",
        "extra": "adkillrule"
    },
    {
        "name": "sohu_live",
        "find": "http:\/\/(tv\.sohu\.com\/upload\/swf\/(live\/|)\d+|61\.135\.176\.223.*\/.*)\/(main|PlayerShell)\.swf",
        "exfind": "(bili|acfun)",
        "replace": "hostsite/sohu_live.swf",
        "extra": "adkillrule"
    },
    {
        "name": "duowan",
        "find": "http:\/\/untitled\.dwstatic\.com\/.*",
        "replace": "about:blank",
        "extra": "adkillrule"
    }
]
