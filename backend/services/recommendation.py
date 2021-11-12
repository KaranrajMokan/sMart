import tornado.web

'''use self.get_arguements'''
class Recommender(tornado.web.RequestHandler):
    def get(self):
        self.write("...Recommended Items")