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
        
   return <div className="w-screen h-screen" >
                {deviceLoading && <Loading/> }
                <div className="w-screen h-1/5 flex gap-4 px-4 justify-center" >
                    {remoteUsers.map((remoteUser) =>  {console.log("a uid",remoteUser.uid); return <RemoteStream id={remoteUser.uid} user={remoteUser} playVideo={true} playAudio={true} />})}
                </div>
                {!deviceLoading && <div className="w-full h-3/4 flex items-center justify-center pt-8 ">
                                        <div className="w-3/4 h-full">
                                            <LocalUser videoTrack={VideoTrack.localCameraTrack} audioTrack={AudioTrack.localMicrophoneTrack} playAudio playVideo cameraOn  = {playVideo} micOn = {audioState} />
                                        </div>
                                    </div>
                }
                <StreamControls camFun={setPlayVideo} micFun={setAudioState} />
    </div>
}

function RemoteStream({id, user, playVideo, playAudio}){
    return <div className="w-1/4 h-full" key={id}>
                <RemoteUser user={user} playVideo={playVideo} playAudio={playAudio} />
        </div>
}

function Loading(){
    return <div>loading component</div>
}

function StreamControls({micFun,camFun}){

    function ToggleMic(){
        micFun(initial => !initial)
    }
    function ToggleCam(){
        camFun(initial => !initial)
    }

    return <div className="w-full flex justify-center gap-4">
        <Button onClick={ToggleMic} >Mic</Button>
        <Button onClick={ToggleCam}>Camera</Button>
    </div>
}



function LocalStream({track, play, muted}){
    return <div className="w-full h-3/4 flex items-center justify-center ">
        <div className="w-3/4 h-full">
            {/* <LocalVideoTrack track={track} play = {play} muted = {muted} /> */}
            <LocalVideoTrack track={VideoTrack.localCameraTrack} play ={true} muted = {false}/>
        </div>
    </div>
}





