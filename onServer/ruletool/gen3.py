'''
Created on 2014-8-9
Modified on 2014-11-28
@author: Realz
'''

import json
import base64
import time
import os
import sys
import ohostsite as t

path = os.path.split(os.path.realpath(sys.argv[0]))[0] + os.path.sep
def genrules(datalist):
    tmpdate = ''
    for line in datalist.readlines():
        tmpdate = tmpdate + line.strip('\n')
    tmpdate = tmpdate.replace('\\','\\\\')
    tmpjson = json.loads(tmpdate)
    if (datalist.name[-16:] == 'oredirectlist.py'):
        for obj in tmpjson:
#            print(obj['replace'])
            obj['replace'] = obj['replace'].replace(u'hostsite',t.hostsite.strip())
#            print(obj['replace'])
    tmpdate = json.dumps(tmpjson)
#    print(type(tmpdate))
    return base64.b64encode(tmpdate.encode()).decode()


oredirectlist = open(path + 'oredirectlist.py','r')
orefererslist = open(path + 'orefererslist.py','r')
oproxylist = open(path + 'oproxylist.py','r')
oconfiglist = open(path + 'oconfiglist.py','r')

redirectlist = open(path + 'redirectlist','w')
refererslist = open(path + 'refererslist','w')
proxylist = open(path + 'proxylist','w')
configlist = open(path + 'configlist','w')
update = open(path + 'update','w')

redirectlist.write(genrules(oredirectlist))
refererslist.write(genrules(orefererslist))
proxylist.write(genrules(oproxylist))
configlist.write(genrules(oconfiglist))

ttime = str(time.time()).split('.')
timestamp = ttime[0] + ttime[1]
timestamp =timestamp[0:13]
update.write(timestamp)

oredirectlist.close()
orefererslist.close()
oproxylist.close()
oconfiglist.close()

redirectlist.close()
refererslist.close()
proxylist.close()
configlist.close()
update.close()
