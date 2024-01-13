require("dotenv").config();
const express  = require('express');
const http  = require('http');
const {RtcTokenBuilder, RtcRole } = require("agora-token")
const app = express();
const socket = require('socket.io');
const server = http.createServer(app);

const tants = {
  JOIN_ROOM:"join-room",
  SEND_MESSAGE:"send-message",
  RECEIVE_MESSAGE:"receive-message",
  NEW_MEMBER:"new-member",

}

const remote  = "http://localhost:5173"
const io = socket(server,{cors:{origin:[remote]}})

const nocache = (req, res, next) =>{
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}
const generateRTCToken = (req, res)=>{
    res.header('Access-Control-Allow-Origin', '*');

    const channelName = req.params.channel;
    let uid = req.params.uid;
    const expireTime  = 3600;
    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTime + expireTime;
    let role;
    let token;

    if (!channelName) {
      return res.status(500).json({ 'error': 'channel is required' });
    }

    if(!uid || uid === '') {
      return res.status(500).json({ 'error': 'uid is required' });
    }
    
    if (req.params.role === 'publisher') {
      role = RtcRole.PUBLISHER;
    } else if (req.params.role === 'subscriber') {
      role = RtcRole.SUBSCRIBER
    } else {
      return res.status(500).json({ 'error': 'role is incorrect' });
    }

    if (req.params.tokentype === 'userAccount') {
        token = RtcTokenBuilder.buildTokenWithUserAccount(process.env.APP_ID, process.env.APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);
      } else if (req.params.tokentype === 'uid') {
        token = RtcTokenBuilder.buildTokenWithUid(process.env.APP_ID, process.env.APP_CERTIFICATE, channelName, uid, role, privilegeExpireTime);
      } else {
        return res.status(500).json({ 'error': 'token type is invalid' });
      }

    return res.json({ 'rtcToken': token});

}


app.get("/",function(req,res){
    res.send("upcoming token generator")
});
app.get('/rtc/:channel/:role/:tokentype/:uid', nocache , generateRTCToken)

io.on("connection", function(packet){

        packet.on("join-room",function(room,user){
              if(room === ""){
                console.log("room value should not be empty ");
                return
              }
              packet.join(room);
              packet.to(room).emit("new-member",`${user} Has Joined This Call`);
        });

        packet.on("send-message",function(text,room){
            if(room === ""){
                  return
            }
            if(!text.user){
              console.log("message id is missing");
            }
            packet.to(room).emit("receive-message",text)
        });

        packet.on("offer", function(offer,room){

          packet.to(room).emit("offer",offer);
  
        });
  
        packet.on("answer",function(answer,room){
  
          packet.to(room).emit("answer",answer);
  
        });
  
        packet.on("ice-candidate",function(candidate,room){
  
          packet.to(room).emit("ice-candidate",candidate);
  
        });
})

server.listen(3000,()=> console.log('server is alive'));