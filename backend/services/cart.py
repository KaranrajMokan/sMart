import tornado.web

'''use self.get_arguements'''
class Cart(tornado.web.RequestHandler):
    def get(self):
        self.write("...Items in Cart")