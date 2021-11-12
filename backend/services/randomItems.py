import tornado.web

'''use self.get_arguements'''
class RandomItems(tornado.web.RequestHandler):
    def get(self):
        self.write("...Random Items")