import { useParams } from "react-router-dom";
import StreamMain,{ChatNParticipant} from "./components";
import { useAnimationControls } from "framer-motion";
import "../../index.css"
import { useRef } from "react";


export default function Call(){
    const params = useParams();
    const openChatControls = useAnimationControls()
   const mainRef = useRef(null);
    return <div className="w-screen h-screen overflow-hidden relative "  ref={mainRef} >
        <StreamMain channel={params.channel} uid={params.uid} animController upRef = {mainRef} />
        <ChatNParticipant  channel={params.channel} uid={params.uid} />
    </div>
}