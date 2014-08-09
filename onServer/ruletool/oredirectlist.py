[
    {
        "name": "youkuloader",
        "find": "http:\/\/static\.youku\.com(\/v[\d\.]*)?\/v\/swf\/loaders?\.swf",
        "exfind": "(bili|acfun)",
        "replace": "http://127.0.0.1/loader.swf",
        "extra": "crossdomain"
    },
    {
        "name": "youkuplayer",
        "find": "http:\/\/static\.youku\.com(\/v[\d\.]*)?\/v\/swf\/q?player.*\.swf",
        "exfind": "(bili|acfun)",
        "replace": "http://127.0.0.1/player.swf",
        "extra": "crossdomain"
    },
    {
        "name": "ku6",
        "find": "http:\/\/player\.ku6cdn\.com\/default\/loader\/.*\/v\.swf",
        "replace": "http://127.0.0.1/ku6.swf",
        "extra": "adkillrule"
    },
    {
        "name": "tudou",
        "find": "http:\/\/js\.tudouui\.com\/.*PortalPlayer[^\.]*\.swf",
        "exfind": "narutom",
        "replace": "http://127.0.0.1/tudou.swf",
        "extra": "adkillrule"
    },
    {
        "name": "tudou_olc",
        "find": "http:\/\/js\.tudouui\.com\/.*olc[^\.]*\.swf",
        "replace": "http://127.0.0.1/olc_8.swf",
        "extra": "adkillrule"
    },
    {
        "name": "tudou_sp",
        "find": "http:\/\/js\.tudouui\.com\/.*SocialPlayer[^\.]*\.swf",
        "replace": "http://127.0.0.1/sp.swf",
        "extra": "adkillrule"
    },
    {
        "name": "letv",
        "find": "http:\/\/.*letv[\w]*\.com\/.*\/((?!(Live|seed))(S[\w]{2,3})?[\w]{4})Player*\.swf",
        "exfind": "(bili|acfun|com\/zt|duowan)",
        "replace": "http://127.0.0.1/letv.swf",
        "extra": "adkillrule"
    },
    {
        "name": "letvpccs",
        "find": "http:\/\/www.letv.com\/zt\/cmsapi\/playerapi\/pccs_(?!live).*_(\d+)\.xml",
        "replace": "http://www.letv.com/zt/cmsapi/playerapi/pccs_sdk_$1.xml",
        "extra": "adkillrule"
    }, 
    {
        "name": "letvhzpccs",
        "find": "http:\/\/www.letv.com\/.*\/playerapi\/pccs_(?!live).*_(\d+)\.xml",
        "replace": "http://www.letv.com/zt/cmsapi/playerapi/pccs_sdk_2014061610.xml",
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
        "find": "http:\/\/www\.iqiyi\.com\/(player\/(\d+\/Player|[a-z0-9]*)|common\/flashplayer\/\d+\/MainPlayer_.*)\.swf",
        "exfind": "(baidu|61|178)\.iqiyi\.com|weibo|yaku\.tv|bilibili|acfun",
        "replace": "http://127.0.0.1/iqiyi5.swf",
        "extra": "adkillrule"
    },
    {
        "name": "pps",
        "find": "http:\/\/www\.iqiyi\.com\/player\/cupid\/.*\/pps[\w]+.swf",
        "replace": "http://127.0.0.1/pps.swf",
        "extra": "adkillrule"
    },
    {
        "name": "sohu",
        "find": "http:\/\/(tv\.sohu\.com\/upload\/swf\/.*\d+|61\.135\.176\.223\/.*)\/(main|PlayerShell)\.swf",
        "exfind": "(bili|acfun)",
        "replace": "http://127.0.0.1/sohu.swf",
        "extra": "adkillrule"
    },
    {
        "name": "duowan",
        "find": "http:\/\/assets\.dwstatic\.com\/.*\/vppp\.swf",
        "replace": "http://127.0.0.1/duowan.swf",
        "extra": "adkillrule"
    }
]
