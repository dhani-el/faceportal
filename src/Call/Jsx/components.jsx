import { useEffect, useState } from "react";
import { AgoraRTCProvider
        , useJoin
        , useLocalCameraTrack
        , useLocalMicrophoneTrack
        ,usePublish
        , useRTCClient
        , useRemoteAudioTracks
        , useRemoteUsers
        , RemoteUser
        , LocalVideoTrack, 
        LocalUser} from "agora-rtc-react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { Button } from "@mui/material";
import {  ChatRounded, LocalPhone, Mic, MicOff, ScreenShare, VideocamOffRounded, VideocamRounded, VolumeOff, VolumeUp } from "@mui/icons-material";



export default function StreamMain ({channel,uid}){
    const url = `http://localhost:3000/rtc/${channel}/publisher/userAccount/${uid}`
    const [appId,setAppId] = useState("945e0c1e774946de9c2e9a599f8c9c84");
    const [token,setToken] = useState(null);
    const client = useRTCClient(AgoraRTC.createClient({mode:"rtc",codec:"vp8"}));
    async function GetToken(){
        const raw = fetch(url)
        .then(function(resp){
            return resp.json();
        }).then(function(data){
            console.log(data.rtcToken);
            setToken((init)=> data.rtcToken);
        })
    }
    useEffect(function(){
        GetToken()
    },[])
        return <AgoraRTCProvider client={client} >
                   {token && <Streams channel={channel} appId={appId} token={token} uid={uid} />}
                </AgoraRTCProvider>
}

function Streams({appId, channel, token,uid}){
    console.log("inside streams = ",token);
    useJoin({appid:appId,  channel:channel,  token:token,uid:uid},true)
    const AudioTrack = useLocalMicrophoneTrack();
    const VideoTrack = useLocalCameraTrack();
    const deviceLoading = VideoTrack.isLoading  ||  AudioTrack.isLoading;
    usePublish([AudioTrack.localMicrophoneTrack, VideoTrack.localCameraTrack]);
    const remoteUsers = useRemoteUsers();
    const {audioTracks} = useRemoteAudioTracks(remoteUsers);
    audioTracks.map(function(track){ return track.play()});

    const [playVideo, setPlayVideo] = useState(true);
    const [audioState, setAudioState] = useState(true);
        
   return <div className="w-8/12 h-full flex flex-col justify-around items-center px-6 " >
                {deviceLoading && <Loading/> }
                <div className="w-full h-1/6 flex gap-4 px-2 justify-center" >
                    {remoteUsers.map((remoteUser) =>  {console.log("a uid",remoteUser.uid);  return <RemoteStream id={remoteUser.uid} user={remoteUser} playVideo={true} playAudio={true} />})}
                </div>
                {!deviceLoading && <div className="w-full h-4/6 flex items-center justify-center ">
                                        <div className="w-full h-full relative ">
                                            <div className="text-yellow-400 bg-teal-700 bg-opacity-50 capitalize rounded-md text-xs absolute z-20 p-2 left-4 top-4">you</div>
                                            <LocalUser className="border-yellow-400 border-2 rounded-3xl" videoTrack={VideoTrack.localCameraTrack} audioTrack={AudioTrack.localMicrophoneTrack} playAudio playVideo cameraOn  = {playVideo} micOn = {audioState} />
                                        </div>
                                    </div>
                }
                <StreamControls camFun={setPlayVideo} micFun={setAudioState} micState={audioState} camState={playVideo} />
    </div>
}

function RemoteStream({id, user, playVideo, playAudio}){
    return <div className="w-32 h-full relative" key={id}>
                <div className="absolute w-full z-20 flex justify-between items-center px-2 bottom-0 pb-2 " >
                    <span className="text-yellow-400 rounded-full " > {user.audioTrack ? <VolumeUp sx={{height:"1rem"}} /> : <VolumeOff sx={{height:"1rem", color:"teal"}} /> }  </span>
                    <span className="text-yellow-400 bg-teal-700 bg-opacity-50 p-1 capitalize rounded-md overflow-hidden text-ellipsis whitespace-nowrap block w-3/5 text-center  " style={{fontSize:"0.5rem"}} > {id}</span>
                </div>
                <RemoteUser user={user} playVideo={playVideo} playAudio={playAudio} className="rounded-xl border-yellow-400 border-2 " />
        </div>
}

function Loading(){
    return <div>loading component</div>
}

function StreamControls({micFun,camFun,micState,camState}){

    function ToggleMic(){
        micFun(initial => !initial)
    }
    function ToggleCam(){
        camFun(initial => !initial)
    }

    return <div className="w-10/12 flex justify-center items-center gap-8 " style={{height:"10%"}} >
        <Button   onClick={ToggleMic} variant="contained" sx={{boxShadow: "24px 12px 24px -6px rgba(0,0,0,0.75)", backgroundColor:"teal", color:"#FACC14", width:"2rem", height:"2rem", borderRadius:"1rem",padding:"0", minWidth:"0"}} >{micState ? <Mic sx={{height:"1rem"}} /> : <MicOff sx={{height:"1rem"}}/> }</Button>
        <Button   variant="contained" sx={{ boxShadow: "24px 12px 24px -6px rgba(0,0,0,0.75)", backgroundColor:"#FACC14", color:"teal", width:"2rem", height:"2rem", borderRadius:"1rem",padding:"0", minWidth:"0"}} onClick={ToggleCam}>{camState ? <VideocamRounded sx={{height:"1rem"}} /> : <VideocamOffRounded  sx={{height:"1rem"}}/>}</Button>
        <Button   variant="contained" sx={{ boxShadow: "24px 12px 24px -6px rgba(0,0,0,0.75)", backgroundColor:"teal", color:"#FACC14", width:"2.9rem", height:"2.9rem", borderRadius:"1.9rem",padding:"0", minWidth:"0"}}><LocalPhone  sx={{height:"1.8rem",color:"#c30010"}}/></Button>
        <Button   variant="contained" sx={{boxShadow: "24px 12px 24px -6px rgba(0,0,0,0.75)", backgroundColor:"#FACC14", color:"teal", width:"2rem", height:"2rem", borderRadius:"1rem",padding:"0", minWidth:"0"}} ><ChatRounded  sx={{height:"1rem"}}/></Button>
        <Button   variant="contained" sx={{boxShadow: "24px 12px 24px -6px rgba(0,0,0,0.75)", backgroundColor:"teal", color:"#FACC14", width:"2rem", height:"2rem", borderRadius:"1rem",padding:"0", minWidth:"0"}} ><ScreenShare  sx={{height:"1rem"}}/></Button>
    </div>
}







