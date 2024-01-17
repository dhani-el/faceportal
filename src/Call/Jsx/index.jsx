import { useParams } from "react-router-dom";
import StreamMain,{ChatNParticipant} from "./components";
import { motion, useAnimationControls } from "framer-motion";
import "../../index.css"
import { useRef } from "react";


export default function Call(){
    const params = useParams();
    const openChatControls = useAnimationControls()
   const mainRef = useRef(null);

   const animation = {
    initial:{
        display:"block"
    },
    flex:{
        display:"flex"
    },
    duration:"2s"
   }

    return <motion.div className="w-screen h-screen overflow-hidden relative "  ref={mainRef} variants={animation} initial = {"initial"} animate = {openChatControls} >
        <StreamMain channel={params.channel} uid={params.uid} animController = {openChatControls} upRef = {mainRef} />
        <ChatNParticipant  channel={params.channel} uid={params.uid} />
    </motion.div>
}