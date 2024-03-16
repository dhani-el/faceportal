
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

    return <motion.div>
                <TextField  onChange={(e)=>handleInputChange(e.currentTarget.value)} value={displayName} placeholder="Enter Display Name"/>
                <Button onClick={JoinMeeting}>Join</Button>
            </motion.div>
}