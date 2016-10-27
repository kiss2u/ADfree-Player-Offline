[
    {
        "name": "youkujson",
        "find": "https?:\/\/val[fcopb]\.atm\.youku\.com\/v[fcopb]",
        "replace": "about:blank",
        "extra": "adkillrule"
    },
    {
        "name": "youkuloader",
        "find": "https?:\/\/static\.youku\.com(\/v[\d\.]*)?\/v\/swf\/loaders?\.swf",
        "exfind": "(bili|acfun)",
        "replace": "hostsite/loader.swf",
        "extra": "adkillrule"
    },
    {
        "name": "youkuplayer",
        "find": "https?:\/\/static\.youku\.com(\/v[\d\.]*)?\/v\/swf\/q?player.*\.swf",
        "exfind": "(bili|acfun)",
        "replace": "hostsite/player.swf",
        "extra": "adkillrule"
    },
    {
        "name": "ku6",
        "find": "https?:\/\/player\.ku6cdn\.com\/default\/.*\/(v|player)\.swf",
        "replace": "hostsite/ku6.swf",
        "extra": "adkillrule"
    },
    {
        "name": "tudou",
        "find": "https?:\/\/js\.tudouui\.com\/.*PortalPlayer[^\.]*\.swf",
        "exfind": "narutom",
        "replace": "hostsite/tudou.swf",
        "css": ".player {height: inherit !important;}",
        "extra": "adkillrule"
    },
    {
        "name": "tudou_olc",
        "find": "https?:\/\/js\.tudouui\.com\/.*olc[^\.]*\.swf",
        "replace": "hostsite/olc_8.swf",
        "extra": "adkillrule"
    },
    {
        "name": "tudou_sp",
        "find": "https?:\/\/js\.tudouui\.com\/.*SocialPlayer[^\.]*\.swf",
        "replace": "hostsite/sp.swf",
        "extra": "adkillrule"
    },
    {
        "name": "letv",
        "find": "https?:\/\/.*letv[\w]*\.com\/.*\/((?!(Live|seed|Disk))(S[\w]{2,3})?(?!Live)[\w]{4}|swf)Player*\.swf",
        "exfind": "(bili|acfun|com\/zt|duowan)",
        "replace": "hostsite/letv.swf",
        "extra": "adkillrule"
    },
    {
        "name": "letvpccs",
        "find": "https?:\/\/www\.le(tv)?\.com\/.*\/playerapi\/pccs_(?!(.*live|sdk)).*_?(\d+)\.xml",
        "replace": "https?://www.le.com/cmsdata/playerapi/pccs_sdk_20141113.xml",
        "extra": "adkillrule"
    },
    {
        "name": "pplive",
        "find": "https?:\/\/player\.pplive\.cn\/ikan\/.*\/player4player2\.swf",
        "replace": "hostsite/player4player2.swf",
        "extra": "adkillrule"
    },
    {
        "name": "iqiyi",
        "find": "https?:\/\/www\.iqiyi\.com\/(player\/(\d+\/Player|[a-z0-9]*)|common\/flashplayer\/\d+\/((Main|Share|Enjon)?Player.*_(.|\w{1,3}\d+)|[\d]{4}[\w]{4}[\w]{2}(?!aa)[\w]{2}))\.swf",
        "exfind": "(baidu|61|178)\.iqiyi\.com|weibo|bilibili|acfun|(music|tieba)\.baidu",
        "replace": "hostsite/iqiyi5.swf",
        "extra": "adkillrule"
    },
    {
        "name": "pps",
        "find": "https?:\/\/www\.iqiyi\.com\/common\/.*\/pps[\w]+.swf",
        "replace": "hostsite/iqiyi_out.swf",
        "extra": "adkillrule"
    },
    {
        "name": "sohu_live",
        "find": "https?:\/\/(tv\.sohu\.com\/upload\/swf\/(p2p\/)?\d+|(\d+\.){3}\d+\/webplayer)\/Main\.swf",
        "exfind": "(bili|acfun)",
        "replace": "hostsite/sohu_live.swf",
        "extra": "adkillrule"
    },
    {
        "name": "duowan",
        "find": "https?:\/\/untitled\.dwstatic\.com\/.*",
        "replace": "about:blank",
        "extra": "adkillrule"
    }
]
