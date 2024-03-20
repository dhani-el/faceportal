import {  useEffect, useLayoutEffect, useRef, useState } from "react";
import { AgoraRTCProvider
        , useJoin
        , useLocalCameraTrack
        , useLocalMicrophoneTrack
        ,usePublish
        , useRTCClient
        , useRemoteAudioTracks
        , useRemoteUsers
        , RemoteUser
        , LocalVideoTrack, 
        LocalUser} from "agora-rtc-react";
        import AgoraRTC from "agora-rtc-sdk-ng";
import { io } from "socket.io-client";
import { useMediaQuery } from "react-responsive";
import { Button, TextField } from "@mui/material";
import { motion, useAnimationControls } from "framer-motion";
import {  ChatRounded, LocalPhone, Mic, MicOff, ScreenShare, Send, VideocamOffRounded, VideocamRounded, VolumeOff, VolumeUp } from "@mui/icons-material";
import Tants from "../../constants";
import song from "/src/Mp3/join.mp3"

const backendUrl = "http://localhost:3000";

const Socket  = io(backendUrl);

export default function StreamMain ({channel,uid, upRef, animController, animController2, }){
    const url = `http://localhost:3000/rtc/${channel}/publisher/userAccount/${uid}`
    const [appId,setAppId] = useState("945e0c1e774946de9c2e9a599f8c9c84");
    const [token,setToken] = useState(null);
    const client = useRTCClient(AgoraRTC.createClient({mode:"rtc",codec:"vp8"}));
    async function GetToken(){
        const raw = fetch(url)
        .then(function(resp){
            return resp.json();
        }).then(function(data){
            console.log(data.rtcToken);
            setToken((init)=> data.rtcToken);
        })
    }
    useEffect(function(){
        GetToken()
    },[])
        return <AgoraRTCProvider client={client} >
                   {token && <Streams channel={channel} appId={appId} token={token} uid={uid} upRef = {upRef} animController = {animController} animController2={animController2}  />}
                </AgoraRTCProvider>
}


function Streams({appId, channel, token, uid, animController, animController2 ,}){
    useJoin({appid:appId,  channel:channel,  token:token,uid:uid},true);
    let AudioTrack = useLocalMicrophoneTrack();
    let VideoTrack = useLocalCameraTrack();
    const deviceLoading = VideoTrack.isLoading  ||  AudioTrack.isLoading;
    usePublish([AudioTrack.localMicrophoneTrack, VideoTrack.localCameraTrack]);
    let remoteUsers = useRemoteUsers();
    let {audioTracks} = useRemoteAudioTracks(remoteUsers);
    audioTracks.map(function(track){ return track.play()});


    const [playVideo, setPlayVideo] = useState(true);
    const [audioState, setAudioState] = useState(true);
    const [fullScreen, setFullScreen] = useState(true);
    const subRef = useRef();
    const controlMain = useAnimationControls();
    const streamAnimControl = useAnimationControls();
    const isLandscape = useMediaQuery({query:'(orientation: landscape)'})


    function toggleFullScreen(){
        console.log("clicked");
        if(isLandscape){
            animController.start(fullScreen ?"flex":"initial")
            controlMain.start(fullScreen ?"dec":"initial")
            setFullScreen(init=>!init);
        }
        if(!isLandscape){
            animController2.start(fullScreen ?"slide":"initial");
            setFullScreen(init=>!init);
        }
        exposeRemoteStreamData()

    }
    
    const animationToggle = {
        initial:{
            width:isLandscape?"80%":"100%",
            marginLeft:isLandscape?"10%":"0"
        },
        dec:{
            width:"66.666667%",
            marginLeft:isLandscape?"0%":"0"
        },
        duration:"2s"
    }
    const mainVidAnim = {
        initial:{
            scale:0.9,

        },
        scaleUp:{
            scale:1.0,
            transition:{
                duration:0.2
            }
        }
    }
    useEffect(function(){
        // function playSound(){
        //     const sound = new Audio(song)
        //     sound.play();
        // }
        // playSound();
        streamAnimControl.start("firstAnimation");
    },[]);


   return <motion.div  className={`w-full  absolute h-full flex flex-col  justify-around landscape:z-0 items-center landscape:pl-4 landscape:relative `} initial={"initial"} animate={controlMain} ref={subRef} variants={animationToggle} >
                {deviceLoading && <Loading/> }
                {!fullScreen && <div  className="landscape:hidden absolute right-0 top-0 inline">
                        <Button variant="contained" className="z-20" onClick={toggleFullScreen} >CLOSE</Button>
                </div>}
                <div className="w-full absolute top-4 landscape:top-0 z-10 h-[10%] landscape:relative landscape:h-1/6 flex gap-4 px-2 justify-center" >
                    {
                    remoteUsers.map((remoteUser) =>  {return <RemoteStream id={remoteUser.uid} user={remoteUser} playVideo={true} playAudio={true} />})
                    }
                </div>
                {!deviceLoading && <motion.div className="w-full h-full landscape:h-[82%] flex items-center justify-center " variants={mainVidAnim} initial ={"initial"} animate={"scaleUp"} onClick={()=>{streamAnimControl.start("click"); }}    >
                                        <div className="w-full h-full relative landscape:flex justify-center items-center landscape:pb-2 "   >

                                            <div className="text-yellow-400 hidden landscape:block bg-teal-700 bg-opacity-50 capitalize rounded-md text-xs absolute z-20 p-2 left-4 top-4">you</div>
                                            <LocalUser className=" landscape:rounded-3xl" videoTrack={VideoTrack.localCameraTrack} audioTrack={AudioTrack.localMicrophoneTrack} playAudio playVideo cameraOn  = {playVideo} micOn = {audioState} />
                                        </div>
                                    </motion.div>
                }
                <StreamControls camFun={setPlayVideo} micFun={setAudioState} micState={audioState} camState={playVideo} toggleFullScreen={toggleFullScreen} animController={streamAnimControl} />
    </motion.div>
}

function RemoteStream({id, user, playVideo, playAudio}){
    return <div className="w-32 h-full relative" key={id}>
                <div className="absolute w-full z-20 flex justify-between items-center px-2 bottom-0 pb-2 " >
                    <span className="text-yellow-400 rounded-full " > {user.audioTrack ? <VolumeUp sx={{height:"1rem"}} /> : <VolumeOff sx={{height:"1rem", color:"teal"}} /> }  </span>
                    <span className="text-yellow-400 bg-teal-700 bg-opacity-50 p-1 capitalize rounded-md overflow-hidden text-ellipsis whitespace-nowrap block w-3/5 text-center  " style={{fontSize:"0.5rem"}} > {id}</span>
                </div>
                <RemoteUser user={user} playVideo={playVideo} playAudio={playAudio} className="rounded-xl border-yellow-400 border-2 " />
        </div>
}

function Loading(){
    return <div>loading component</div>
}

function StreamControls({micFun,camFun,micState,camState,toggleFullScreen,animController}){
    const isLandscape = useMediaQuery({query:'(orientation: landscape)'});

    function ToggleMic(){
        micFun(initial => !initial)
    }
    function ToggleCam(){
        camFun(initial => !initial)
    }
    const animation = {
                initial:{
                    opacity:0,
                },
                firstAnimation:{
                    opacity:[1,0],
                    transition:{
                        delay:10,
                        duration:1
                    }
                },
                hover:{
                    opacity:1,
                    transition:{
                        duration:1,
                    }
                },
                click:{
                    opacity:[1,0],
                    transition:{
                        delay:10,
                        duration:1,
                    }
                }


    }

    return <motion.div variants={animation} initial = {"initial"} whileFocus={"hover"} whileHover={"hover"} animate = {animController}  className="w-10/12 z-[2] absolute bottom-4  landscape:bottom-4  flex justify-center items-center gap-8 " style={{height:"10%"}} >
        <Button   onClick={ToggleMic} variant="contained" sx={{boxShadow: "24px 12px 24px -6px rgba(0,0,0,0.75)", backgroundColor:"teal", color:"#FACC14", width:"2rem", height:"2rem", borderRadius:"1rem",padding:"0", minWidth:"0"}} >{micState ? <Mic sx={{height:"1rem"}} /> : <MicOff sx={{height:"1rem"}}/> }</Button>
        <Button   variant="contained" sx={{ boxShadow: "24px 12px 24px -6px rgba(0,0,0,0.75)", backgroundColor:"#FACC14", color:"teal", width:"2rem", height:"2rem", borderRadius:"1rem",padding:"0", minWidth:"0"}} onClick={ToggleCam}>{camState ? <VideocamRounded sx={{height:"1rem"}} /> : <VideocamOffRounded  sx={{height:"1rem"}}/>}</Button>
        <Button   variant="contained" sx={{ boxShadow: "24px 12px 24px -6px rgba(0,0,0,0.75)", backgroundColor:"teal", color:"#FACC14", width:"2.9rem", height:"2.9rem", borderRadius:"1.9rem",padding:"0", minWidth:"0"}}><LocalPhone  sx={{height:"1.8rem",color:"#c30010"}}/></Button>
        <Button   variant="contained" sx={{boxShadow: "24px 12px 24px -6px rgba(0,0,0,0.75)", backgroundColor:"#FACC14", color:"teal", width:"2rem", height:"2rem", borderRadius:"1rem",padding:"0", minWidth:"0"}} onClick={toggleFullScreen} ><ChatRounded  sx={{height:"1rem"}}/></Button>
        <Button   variant="contained" sx={{boxShadow: "24px 12px 24px -6px rgba(0,0,0,0.75)", backgroundColor:"teal", color:"#FACC14", width:"2rem", height:"2rem", borderRadius:"1rem",padding:"0", minWidth:"0"}} ><ScreenShare  sx={{height:"1rem"}}/></Button>
    </motion.div>
}




export function ChatNParticipant({channel,uid}){
        const [displayChat, setDisplayChat] = useState(true);
        const [displayParticipant, setDisplayParticipant] = useState(false);
        const [participants, setParticipants] = useState([]);
        const [text,setText] = useState('');
        const [messages, setMessages] = useState([]);
        const participantRef  = useRef(null);
        const dummyData = ["Gregro Marcus","Penelope Cruz","Demarcus Cousins","Anthony Joushua","Smurf"]
    
        async function handleSendTextClick(){
            return new Promise(function(resolve){
                setMessages(initialMessages =>{
                    const newMessages = initialMessages.concat([{message:text,user:Tants.YOU}]);
                    return newMessages
                })
                return resolve()
            }).then(function(result){
                Socket.emit(Tants.SEND_MESSAGE,{message:text,user:uid},channel);
                return result
            }).then(function(result){
            setText(initial => " ");
                return result
            })
        }
        function handleReceiveMessage(text){
            setMessages(initialMessages =>{
                const newMessages = initialMessages.concat([{message:text.message,user:text.user}]);
                return newMessages
            })
        }
        function handleParticipantClick(){
            setDisplayChat((init)=> false);
            setDisplayParticipant((init)=>true);
            if (participantRef.current != null) {
                    participantRef.current.classList.remove("h-[88%]");
                    participantRef.current.classList.add("h-[100%]"); 
            }
        } 
        function handleChatClick(){
            setDisplayChat((init)=> true);
            setDisplayParticipant((init)=>false);
            if (participantRef.current != null) {
                participantRef.current.classList.remove("h-[100%]");
                participantRef.current.classList.add("h-[88%]"); 
        }
        }
        function handleNewUserJoined(username){
            let names = username.map(function(singleUser){
                return singleUser.name
            })
           
            setParticipants(initial => names );
        }

        useEffect(function(){
            Socket.on("connect",function(){
                Socket.emit(Tants.JOIN_ROOM, channel, uid);
            });
    
            Socket.on(Tants.RECEIVE_MESSAGE,function(text){
                handleReceiveMessage(text)
            })
    
            // @todo handle presentation of new member event 
            Socket.on(Tants.NEW_MEMBER,function(text){
               console.log(`${text.newUser} is now online boyssssss`);
               handleNewUserJoined(text.members);
            })

            Socket.on("member-left",function(text){
               console.log(`${text.former} hasLeft`);
               handleNewUserJoined(text.members);
            })
    
        },[]);

        useEffect(()=>{
           let members =  fetch(`${backendUrl}/members`)
           .then(function(data){
            return data.json()
           }).then(function(info){
            console.log(info);
            handleNewUserJoined(info);
           })
        },[])

        
    return <>
            <div className="w-full h-full  z-[] flex flex-col  "  >
                <div className={`w-full h-full flex flex-col items-center justify-around bg-teal-100 rounded-t-3xl landscape:rounded-none relative`} ref = {participantRef} >
                   <ChatNParticipantToggle displayChat = {displayChat} chatClick = {handleChatClick} participantClick = { handleParticipantClick}  />
                    { displayChat && <ChatDisplayArea messages={messages}/>}
                    { displayParticipant && <Partcipants participantsName={participants} />}
                </div>
                { displayChat && <ChatEntry setTextfunc={setText} handleSendTextClick={handleSendTextClick} text={text} />}
            </div>
            </>
}

function ChatNParticipantToggle({displayChat, chatClick, participantClick}){

    return  <div className="w-[70%]  flex justify-around  font-bebas py-1 relative mt-4 bg-white rounded-lg "  style={{boxShadow: "24px 12px 24px -6px rgba(0,0,0,0.75)"}} >
                <Button id="partTogg" className={`z-${displayChat ? 1 :30} `}  variant="contained" sx={{minWidth:0, width:"52%", backgroundColor:`${displayChat ? "inherit":"#15bab3"}`, boxShadow:`${displayChat ? "none":"#"}`, color:`${displayChat ? "#15bab3":"#fff001"}`, font:"inherit", position:"relative", right:"-0.3rem"}} onClick ={()=> participantClick()} >Participants</Button>
                <Button id="chatTogg" className={`z-${displayChat ? 30 :1}  `} variant="contained" sx={{minWidth:0, width:"52%", backgroundColor:`${displayChat ? "#15bab3":"inherit"}`, boxShadow:`${displayChat ? "#":"none"}`,color:`${displayChat ? "#fff001":"#15bab3"}`, font:"inherit", position:"relative", left:"-0.3rem"}} onClick ={()=> chatClick()} >Chat</Button>
            </div>
}

function ChatDisplayArea({messages}){
    const displayAreaRef = useRef(null); 

    useEffect(function(){
        if (displayAreaRef.current != null) {
            displayAreaRef.current.scrollTo(0,displayAreaRef.current.scrollHeight)
        }
    })

    return <div className="w-full h-[88%] px-2 pt-4 flex flex-col overflow-y-scroll " ref={displayAreaRef}>
                    {
                        messages?.map(function(message,index){
                            return message.user === Tants.YOU ? <YourMessage id={index} message={message.message} /> : <MemberMessage id={index} message={message} />
                        })
                    }
            </div>
}

function YourMessage({id,message}){
    return <div key={id} className="max-w-[65%] self-end" >
                <div className="w-full bg-yellow-500 rounded-lg mb-4 text-sm p-2 " >
                    <p className="break-words">{message}</p>
                </div>
    </div>
}

function MemberMessage({id,message}){
    return <div key={id} className="max-w-[65%] self-start " >
                <p className="text-xs max-w-full ">{message.user}</p>
                <div className="w-full bg-teal-800 rounded-lg mb-4 text-sm p-2 " >
                    <p className="break-words text-white ">{message.message}</p>
                </div>
    </div>
}

function ChatEntry({text , setTextfunc,handleSendTextClick}){
console.log(text);
    function handleTextChange(e){
    setTextfunc(initial => e.target.value)
    }

    return <div className="flex w-full h-[12%] justify-center items-center landscape:py-1 bg-teal-100  ">
                <input className="w-[75%] h-[85%] bg-teal-300 outline-0 rounded-lg px-4 " placeholder="type message..."  onChange={(e) => handleTextChange(e)} value={text} />
                <Button onClick={handleSendTextClick} ><Send/></Button>
            </div>
}

function Partcipants({participantsName}){
    const colors = ["rgba(128,0,128,0.6)","rgba(255,0,0,0.6)","rgba(255,165,0,0.6)","rgba(255,215,0,0.6)","rgba(65,105,225,0.6)","rgba(55,20,147,0.6)","rgba(176,196,222,0.6)","rgba(255,191,0,0.6)","rgba(255,255,0,0.6)","rgba(204,255,0,0.6)","rgba(0,255,255,0.6)","rgba(31,78,47,0.6)","rgba(128,0,128,0.6)","rgba(255,0,0,0.6)","rgba(255,165,0,0.6)","rgba(255,215,0,0.6)","rgba(65,105,225,0.6)","rgba(55,20,147,0.6)","rgba(176,196,222,0.6)","rgba(255,191,0,0.6)","rgba(255,255,0,0.6)","rgba(204,255,0,0.6)","rgba(0,255,255,0.6)","rgba(31,78,47,0.6)"];
    function backgroundColorSelector(){
        const lengthOColors = colors.length;
        console.log(colors[Math.floor(Math.random() * lengthOColors)]);
        return colors[Math.floor(Math.random() * lengthOColors)]
    }
    return <motion.div className="w-full flex flex-col h-full p-4 pt-8 gap-4 overflow-scroll">
                    {participantsName.map(function(user){
                        return <Participant name={user} bgColor={backgroundColorSelector()} />
                    })}
            </motion.div>
}

function Participant({name,bgColor}){
    return <motion.div className="flex gap-6 items-center bg-teal-200 rounded-lg ">
                <Initials nameString={name} bgColor={bgColor}/>
                <ParticipantName name={name} />
            </motion.div>
}

function Initials({nameString,bgColor}){
    function abbreviator(string){
        const stepOne = string.split(" ");
        let initials 
        if (stepOne.length > 1) {
             initials = stepOne[0][0] + stepOne[1][0];
             return initials;
        }
        if (stepOne.length == 1) {
            initials = string[0];
            return initials;
        }
        return "?"
    }

    
    return <motion.div className={`w-12 text-center px-4 py-2 rounded-lg font-bebas text-lg`} style={{backgroundColor:`${bgColor}`}} >
                        {abbreviator(nameString)}
            </motion.div>
}

function ParticipantName({name}){
    return <motion.div className="block w-[90%] pr-[5%] overflow-hidden whitespace-nowrap text-ellipsis  font-montserrat font-semibold" >
                {name}
             </motion.div>
}

function ParticipantMetadata({videoData,audioData}){
    return <motion.div>
                {videoData ? <Mic/> : <MicOff/>}
                {audioData ? <VideocamRounded/> : <VideocamOffRounded/>}
             </motion.div>
}

