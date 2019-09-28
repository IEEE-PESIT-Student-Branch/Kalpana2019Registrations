from aiohttp import web
import socketio

sio = socketio.AsyncServer()
app = web.Application()
sio.attach(app)

async def index(request):
#enter homepage html
    with open('.html') as f:
        return web.Response(text=f.read(), content_type='text/html')

@sio.on('message')
#prints at server terminal
async def print_message(sid, message):
    print("Socket ID: " , sid)
    print(message)

#codes for what is to be done to barcode


#attach to app
app.router.add_get('/', index)
#start server
if __name__ == '__main__':
    web.run_app(app)
