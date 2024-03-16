
import { useState } from "react";
import { motion } from "framer-motion";
import { TextField, Button } from "@mui/material";
import { Header,Footer } from "../../Home/JSX/component";
import { useNavigate } from "react-router-dom";
import "../Styles/index.css"


const baseUrl = "http://localhost:5173";

export default function Host(){
    const navigate = useNavigate();
    const [autoGenerate, setAutoGenerate] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [customLink, setCustomLink] = useState('');
    const [autoLink, setAutoLink] = useState('');
    const [link, setLink] = useState("");
    const channelIdLength = 6;

    function inputValueChange(setterFunction, text){
        setterFunction((initialText)=>text)
    }
    function generateChannelID(length){
        const charStore ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let channelID = '';
        const charactersLength = charStore.length;
        for ( let i = 0; i < length; i++ ) {
            channelID += charStore.charAt(Math.floor(Math.random() * charactersLength));
        }
        return channelID;
        }    
    function autoGenerateLink(){
        setAutoGenerate(init => true);
        // if (displayName.trim() == "") {
        //     return
        // }
        const channelID = generateChannelID(channelIdLength);
        setAutoLink(`${baseUrl}/call/${channelID}`)
        // navigate(`/call/${channelID}/${displayName}`);
    }
    function autoGenerateLinkNav(){
        setAutoGenerate(init => true);
        if (displayName.trim() == "") {
            return
        }
        const channelID = generateChannelID(channelIdLength);
        setAutoLink(`${baseUrl}/join/${channelID}`)
        setLink(`../call/${channelID}/${displayName}`);
    }
    function GenerateCustomLink(){
        setAutoGenerate(init => false);
        // if (displayName.trim() == "") {
        //     return
        // }
        if (customLink.trim() == "") {
            return
        }
        setAutoLink(`${baseUrl}/call/${customLink}`)
    }
    function GenerateCustomLinkNav(){
        setAutoGenerate(init => false);
        if (displayName.trim() == "") {
            return
        }
        if (customLink.trim() == "") {
            return
        }
        setAutoLink(`${baseUrl}/join/${customLink}`);
        setLink(`../call/${customLink}/${displayName}`);
    }
    function goToMeeting(){
        navigate(link);
    }
    return <motion.div id="container">
                    <p>HOST</p>
                    <motion.div id="hostForm">
                    <TextField  onChange={(e)=>inputValueChange(setDisplayName,e.currentTarget.value)} value={displayName} placeholder="Your Display Name" variant="filled" autoComplete="false" sx={{paddingBottom:"1.5rem",}}/>
                    <TextField   onChange={(e)=>inputValueChange(setCustomLink,e.currentTarget.value)}  value={customLink} placeholder="Enter Custom Link" variant="filled" disabled = {autoGenerate} sx={{paddingBottom:"1.5rem",}}/>
                    <motion.div id="buttonContainers">
                        <Button onClick={GenerateCustomLinkNav} variant="contained" >Generate Custom Link</Button>
                        <Button onClick={autoGenerateLinkNav} variant="contained" >Auto Generate Link</Button>
                    </motion.div>
                    <TextField value={autoLink} placeholder="Copy Link" sx={{paddingTop:"3rem",}}/>
                    <Button onClick={goToMeeting} disabled = {link === "" ? true : false} variant="contained" >Go to Meeting</Button>
                    </motion.div>
            </motion.div>
}


