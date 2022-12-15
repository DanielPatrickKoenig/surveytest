@auth.requires_login()
def index():
    return dict(message=T('you are home'))