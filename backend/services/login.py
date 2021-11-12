import tornado.web

'''use self.get_arguements'''
class Login(tornado.web.RequestHandler):
    def get(self):
        self.write("...Login Page")