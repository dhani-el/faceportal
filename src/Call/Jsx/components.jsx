import { useState } from "react";
import { AgoraRTCProvider, useJoin, useLocalCameraTrack, useLocalMicrophoneTrack,usePublish, useRTCClient, useRemoteAudioTracks, useRemoteUsers, RemoteUser, LocalVideoTrack } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { Button } from "@mui/material";


const credentials = {
    app_id :"945e0c1e774946de9c2e9a599f8c9c84",
    token : "007eJxTYChOFj2UvUAh0TOXheetzGH+qQ8Ut298pDxD6gLTMm/9+UsUGCxNTFMNkg1Tzc1NLE3MUlItk41SLRNNLS3TLJItky1MWoM6UhsCGRlSWWKYGRkgEMRnYchNzMxjYAAAj5EcnQ==",
    channelName:"main"
}




function Stream (){
    return <div>

    </div>
}

export default function LocalStream(){
    const client = useRTCClient(AgoraRTC.createClient({mode:"rtc",codec:"vp8"}));
    return  <AgoraRTCProvider client={client} >
                <div>inside provider</div>
                 <VideoStreams/>
          </AgoraRTCProvider>
    
}


function RemoteStreams(){
    const [remoteTrack, setRemoteTrack] = useState({});
    return <div>

    </div>
}

function VideoStreams(){
    useJoin({appid:"945e0c1e774946de9c2e9a599f8c9c84",channel:"main",token:"007eJxTYJicL2ViINRissLL7aXiu/PHvgiuknrDdHXhxTU9k1Y+Yq1TYLA0MU01SDZMNTc3sTQxS0m1TDZKtUw0tbRMs0i2TLYw+crTldoQyMhwc78+KyMDBIL4LAy5iZl5DAwATeMf7g=="})
    const AudioTrack = useLocalMicrophoneTrack();
    const VideoTrack = useLocalCameraTrack();
    const deviceLoading = VideoTrack.isLoading  ||  AudioTrack.isLoading;
    console.log("trackstart",AudioTrack.localMicrophoneTrack, VideoTrack.localCameraTrack, "trackend");
    usePublish([AudioTrack.localMicrophoneTrack, VideoTrack.localCameraTrack],!deviceLoading);
    const remoteUsers = useRemoteUsers();
    const {audioTracks} = useRemoteAudioTracks(remoteUsers);
    audioTracks.map(function(track){ return track.play()});
        
   return <div className="w-screen h-screen" >
                {deviceLoading && <div>loading ...</div>}
                <div>on top video</div>
                {remoteUsers.map((remoteUser) => {
                    console.log(remoteUser.audioTrack);
                    console.log(remoteUser.hasAudio);
                    console.log(remoteUser.hasVideo);
                    console.log(remoteUser.videoTrack);
                    return (
                    <div className="vid" style={{ height: 300, width: 600 }} key={remoteUser.uid}>
                    
                        <RemoteUser user={remoteUser} playVideo={true} playAudio={true} />
                    </div>
                )})}
                {!deviceLoading && <LocalVideoTrack track={VideoTrack.localCameraTrack} play ={true} muted = {false}   className="w-1/2" style={{width:"50%",height:"50%"}} />}


    </div>
}

function StreamControls(){
    return <div>

    </div>
}

function JoinStream(){
    return <Button>Join</Button>
}

function LeaveStream(){
    return <Button>Leave</Button>
}

function Microphone(){
    return <div>
        mic
    </div>
}

function Camera(){
    return <div>
        camera
    </div>
}

