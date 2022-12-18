import os
from os.path import exists
def get_base_path(req):
    return 'applications/'+req.application

@auth.requires_login()
def index():
    dir = get_base_path(request) + '/static/js/home/build/static'
    jsItems = os.listdir(dir+'/js')
    cssItems = os.listdir(dir+'/css')
    jsFiles = [f for f in jsItems if f[-2:] == 'js' and f[:4] == 'main']
    cssFiles = [f for f in cssItems if f[-3:] == 'css' and f[:4] == 'main']
    return dict(
        message=T('you are home'),
        cssFile=cssFiles[0],
        jsFile=jsFiles[0],
        appName=request.application
    )

def get_file_path(req):
    user_id = auth.user.id
    return get_base_path(req) + '/static/state_' + str(user_id) + '.txt'

def default_user_content():
    return 'this is test data'

@auth.requires_login()
def load_data():
    user_id = auth.user.id
    if exists(get_file_path(request)):
        f = open(get_file_path(request), "r")
        return response.json(dict(content=f.read()))
    else:
        return response.json(dict(content=default_user_content()))

@auth.requires_login()
def save_data():
    data_to_save = request.vars['content']
    f = open(get_file_path(request), "w")
    f.write(data_to_save)
    f.close()
    