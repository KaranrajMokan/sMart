import tornado.web

'''use self.get_arguements'''
class Transaction(tornado.web.RequestHandler):
    def get(self):
        self.write("...Items bought")