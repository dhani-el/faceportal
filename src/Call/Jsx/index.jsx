import { useParams } from "react-router-dom";
import StreamMain,{ChatNParticipant} from "./components";
import { motion, useAnimationControls } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import "../../index.css"
import { useRef, useState } from "react";
//import webgazer

export default function Call(){
    const params = useParams();
    const openChatControls = useAnimationControls();
    const chatNParticipantControls = useAnimationControls();
    const isLandscape = useMediaQuery({query:'(orientation: landscape)'});
   const mainRef = useRef(null);

   const animation1 = {
    initial:{
        display:"block"
    },
    flex:{
        display:"flex"
    },
   }

   const animation2 = {
    initial:{
        y:"101%",
        zIndex:0
    },
    slide:{
        y:"0%",
        zIndex:10
    },
    duration:"4s"
   }


    return <motion.div className="w-screen h-screen block bg-teal-100 overflow-hidden relative justify-between "  ref={mainRef} variants={animation1} initial = {"initial"} animate = {openChatControls} >
        <StreamMain  channel={params.channel} uid={params.uid} animController = {openChatControls} animController2 = {chatNParticipantControls} upRef = {mainRef} />

        <motion.div variants={!isLandscape?animation2:null} initial = {"initial"} animate={chatNParticipantControls}  className="w-full h-full absolute top-0 -z-[0] landscape:relative landscape:z-0 landscape:w-[30%] landscape:h-full  landscape:flex landscape:flex-col landscape:items-center landscape:gap-[2%] pt-8 landscape:pt-0 " style={{boxShadow:"-12px 1px 18px 0px rgba(0,0,0,0.75)"}} >
            <ChatNParticipant  channel={params.channel} uid={params.uid}  />
        </motion.div>

    </motion.div>
}
