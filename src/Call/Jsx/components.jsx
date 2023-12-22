import { useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { Button } from "@mui/material";


const credentials = {
    app_id :"945e0c1e774946de9c2e9a599f8c9c84",
    token : "007eJxTYDgs9+3kjYNqa1eECETvsvTP+Px9aZ0eG4PhmnN1rn57P9xQYLA0MU01SDZMNTc3sTQxS0m1TDZKtUw0tbRMs0i2TLYw6X7QktoQyMhg8t+FkZEBAkF8FobcxMw8BgYAqqgguA==",
    channelName:"main"
}

const client = AgoraRTC.createClient({mode:"rtc", codec:"vp8"})


function Stream (){
    return <div>

    </div>
}

export default function LocalStream(){
    const [localTrack, setLocalTrack] = useState([]);
    const [reload,setReload] = useState(false);
    const videoDivRef = useRef(null);
    async function JoinAndDisplayLocalStream(){
        let UID = await client.join(credentials.app_id, credentials.channelName, credentials.token, null)
        .then(function(uid){
            setLocalTrack(async(init)=>{
                 await AgoraRTC.createMicrophoneAndCameraTracks();
            })
        }).then(function(uid){
            localTrack[1].play("video-player");
        }).then(function(uid){
            setReload(true);
        })
        .then(function(uid){
            client.publish(localTrack[0],localTrack[1])

        })

    }
    return <div id={`user-container`}  > 
                <div id={`video-player`} ref={videoDivRef} className="w-40 h-40" >
                <video controls>
                    <source src={localTrack[1]}  />
                    </video>
                </div>
                <Button onClick={function(){JoinAndDisplayLocalStream()}} >Join Stream</Button>
    </div>
}

function RemoteStreams(){
    const [remoteTrack, setRemoteTrack] = useState({});
    return <div>

    </div>
}

function VideoStreams(){


   return <div>

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

