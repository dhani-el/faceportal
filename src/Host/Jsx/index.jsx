
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { TextField, Button, InputAdornment } from "@mui/material";
import { CopyAllRounded } from "@mui/icons-material";
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
    const CopyFieldRef = useRef(null);
    const copyContainerRef = useRef(null);
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
    function handleCopyClicked(){
        if (autoLink == "") {
            return
        }
        navigator.clipboard.writeText(autoLink);
        CopyFieldRef.current.value = "Copied ! ! !";
        copyContainerRef.current.classList.add("copied");
        if(CopyFieldRef != null){
            setTimeout(function(){
                copyContainerRef.current.classList.remove("copied");
                CopyFieldRef.current.value = autoLink;
            },1000)
        }
    }

    return <motion.div id="container">
                    <p className="pt-16 text-2xl font-montserrat font-semibold" >HOST</p>
                    <motion.div id="hostForm">
                    <TextField  onChange={(e)=>inputValueChange(setDisplayName,e.currentTarget.value)} value={displayName} placeholder="Your Display Name" variant="filled" autoComplete="false" sx={{paddingBottom:"1.5rem",}}/>
                    <TextField   onChange={(e)=>inputValueChange(setCustomLink,e.currentTarget.value)}  value={customLink} placeholder="Enter Custom ID" variant="filled" disabled = {autoGenerate} sx={{paddingBottom:"1.5rem",}}/>
                    <motion.div id="buttonContainers">
                        <Button onClick={GenerateCustomLinkNav} variant="contained" sx={{backgroundColor:"darkcyan",color:"white",fontFamily:"montserrat",fontWeight:"600"}} className="hover:bg-cyan-800"  >Generate Custom ID</Button>
                        <Button onClick={autoGenerateLinkNav} variant="contained" sx={{backgroundColor:"darkcyan",color:"white",fontFamily:"montserrat",fontWeight:"600"}}  >Auto Generate ID</Button>
                    </motion.div>
                    <motion.div id="copyNGo" className="w-Screen landscape:flex landscape:items-center landscape:flex-col landscape:gap-6 " >
                        <TextField ref={copyContainerRef} inputRef={CopyFieldRef} value={autoLink} placeholder="Copy Link" sx={{paddingTop:"3rem"}} className="p-0 font-montserrat" InputProps={{endAdornment:(<InputAdornment  position="start" sx={{height:"100%"}} ><Button variant="text"  onClick = {handleCopyClicked} sx={{color:"black", borderColor:"black",}} ><CopyAllRounded  className="hover:cursor-pointer focus:bg-transparent" /></Button></InputAdornment>)}} inputProps={{readOnly:"true"}} />
                        <Button  onClick={goToMeeting} disabled = {link === "" ? true : false} variant="contained" className="w-fit" sx={{backgroundColor:"darkcyan",color:"white",fontFamily:"montserrat",fontWeight:"600"}} >Go to Meeting</Button>
                    </motion.div>
                    </motion.div>
            </motion.div>
}


