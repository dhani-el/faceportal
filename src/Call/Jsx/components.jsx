import { useState } from "react";
import { AgoraRTCProvider
        , useJoin
        , useLocalCameraTrack
        , useLocalMicrophoneTrack
        ,usePublish
        , useRTCClient
        , useRemoteAudioTracks
        , useRemoteUsers
        , RemoteUser
        , LocalVideoTrack } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { Button } from "@mui/material";



export default function StreamMain ({channel}){
    const [appId,setAppId] = useState("945e0c1e774946de9c2e9a599f8c9c84");
    const [token,setToken] = useState("007eJxTYLh7Xz9syrnKtosTLHyu/qh5pjCX98Zeya2X1kkcmfQ1wYpbgcHSxDTVINkw1dzcxNLELCXVMtko1TLR1NIyzSLZMtnC5Elxd2pDICPDlV4fRkYGCATxWRhyEzPzGBgA+xohrQ==");
    const client = useRTCClient(AgoraRTC.createClient({mode:"rtc",codec:"vp8"}));
        return <AgoraRTCProvider client={client} >
                    <Streams channel={channel} appId={appId} token={token} />
                </AgoraRTCProvider>
}

function Streams({appId, channel, token}){
    useJoin({appid:appId,  channel:channel,  token:token})
    const AudioTrack = useLocalMicrophoneTrack();
    const VideoTrack = useLocalCameraTrack();
    const deviceLoading = VideoTrack.isLoading  ||  AudioTrack.isLoading;
    usePublish([AudioTrack.localMicrophoneTrack, VideoTrack.localCameraTrack]);
    const remoteUsers = useRemoteUsers();
    const {audioTracks} = useRemoteAudioTracks(remoteUsers);
    audioTracks.map(function(track){ return track.play()});
        
   return <div className="w-screen h-screen" >
                {deviceLoading && <Loading/> }
                {remoteUsers.map((remoteUser) =>  <RemoteStream id={remoteUser.uid} user={remoteUser} playVideo={true} playAudio={true} />)}
                {!deviceLoading && <LocalStream track={VideoTrack.localCameraTrack} play ={true} muted = {true}/>}
                <StreamControls/>
    </div>
}

function RemoteStream({id, user, playVideo, playAudio}){
    return <div style={{ height: 300, width: 600 }} key={id}>
                <RemoteUser user={user} playVideo={playVideo} playAudio={true} />
        </div>
}

function LocalStream({track, play, muted}){
    return <div className="w-full h-3/4 flex items-center justify-center ">
        <div className="w-3/4 h-full">
            <LocalVideoTrack track={track} play = {play} muted = {muted} />
        </div>
    </div>
}

function Loading(){
    return <div>loading component</div>
}
function StreamControls(){
    return <div>

    </div>
}


