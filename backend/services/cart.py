import tornado.ioloop
import tornado.web

'''use self.get_arguements'''
class Cart(tornado.web.RequestHandler):
    def get(self):
        self.write("...items in cart")
    def post(self):
        self.write("...post")

def make_app():
    return tornado.web.Application([
        (r"/app/cart", Cart)])


if __name__ == "__main__":
    app = make_app()
    port = 8083
    app.listen(port)
    print("Bitches! App listening on port: ",port)
    tornado.ioloop.IOLoop.current().start()