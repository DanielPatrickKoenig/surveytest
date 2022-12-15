import os
@auth.requires_login()
def index():
    dir = 'applications/dndsurvey/static/js/home/build/static'
    jsItems = os.listdir(dir+'/js')
    cssItems = os.listdir(dir+'/css')
    jsFiles = [f for f in jsItems if f[-2:] == 'js' and f[:4] == 'main']
    cssFiles = [f for f in cssItems if f[-3:] == 'css' and f[:4] == 'main']
    return dict(
        message=T('you are home'),
        cssFile=cssFiles[0],
        jsFile=jsFiles[0]
    )