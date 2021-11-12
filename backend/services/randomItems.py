import tornado.ioloop
import tornado.web

'''use self.get_arguements'''
class RandomItems(tornado.web.RequestHandler):
    def get(self):
        self.write("...random items")
    def post(self):
        self.write("...post")

def make_app():
    return tornado.web.Application([
        (r"/app/random", RandomItems)])


if __name__ == "__main__":
    app = make_app()
    port = 8081
    app.listen(port)
    print("Bitches! App listening on port: ",port)
    tornado.ioloop.IOLoop.current().start()