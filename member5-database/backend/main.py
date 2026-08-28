import socketio
from fastapi import FastAPI
import uvicorn
from twilio.rest import Client

# Create Socket.IO server configured for local connections
sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
app = FastAPI()
socket_app = socketio.ASGIApp(sio, app)

@app.get("/")
def read_root():
    return {"status": "Telemedicine Backend Server Running"}

# WebRTC signaling events
@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")

@sio.event
async def join_room(sid, data):
    room = data.get('room')
    sio.enter_room(sid, room)
    print(f"Client {sid} joined room: {room}")

@sio.event
async def signal(sid, data):
    room = data.get('room')
    await sio.emit('signal', data, room=room, skip_sid=sid)

@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")
# Twilio endpoint for non-smartphone users
@app.post("/send-sms")
def send_prescription_sms(phone_number: str, message_text: str):
    account_sid = 'YOUR_TWILIO_ACCOUNT_SID'
    auth_token = 'YOUR_TWILIO_AUTH_TOKEN'
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        from_='+1234567890',
        body=message_text,
        to=phone_number
    )
    return {"status": "SMS Sent", "sid": message.sid}

if __name__ == "__main__":
    uvicorn.run(socket_app, host="127.0.0.1", port=8000)