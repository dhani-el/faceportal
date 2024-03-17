
import { motion } from "framer-motion";
import { TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";




export default function Join(){
    const navigate  = useNavigate();
    const [displayName , setDisplayName] = useState('');
    const path  = useParams();
    const channelId = path.channelid;

    function JoinMeeting(){
        if (displayName.trim() === "") {
            return
        }
        navigate(`../call/${channelId}/${displayName}`)
    }
    function handleInputChange(text){
        setDisplayName(init => text)
    }

    return <motion.div >
                <motion.p className="block text-center pt-12">JOIN</motion.p>
                <motion.div className=" w-screen h-screen flex flex-col px-8 py-[25vh] gap-4 items-center ">
                    <TextField variant="filled" className="text-center" onChange={(e)=>handleInputChange(e.currentTarget.value)} value={displayName} placeholder="Enter Display Name"/>
                    <Button onClick={JoinMeeting} variant="contained" className="w-fit" >Join</Button>
                </motion.div>
            </motion.div>
}