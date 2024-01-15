import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import StreamMain,{ChatNParticipant} from "./components";
import { useEffect, useState } from "react";
import Tants from "../../constants";
import "../../index.css"


const backendUrl = "http://localhost:3000"

const Socket  = io(backendUrl);

export default function Call(){
    const params = useParams();
    const [youText,setYouText] = useState('');
    const [messages, setMessages] = useState([]);

    async function handleSendTextClick(){
        return new Promise(function(resolve){
            setMessages(initialMessages =>{
                const newMessages = initialMessages.concat([{message:youText,user:Tants.YOU}]);
                return newMessages
            })
            return resolve()
        }).then(function(result){
            Socket.emit(Tants.SEND_MESSAGE,{message:youText,user:params.uid},params.channel);
            return result
        }).then(function(result){
            setYouText(initial => " ");
            return result
        })
    }
    
    function handleReceiveMessage(text){
        setMessages(initialMessages =>{
            const newMessages = initialMessages.concat([{message:text.message,user:text.user}]);
            return newMessages
        })
    }

    useEffect(function(){
        Socket.on("connect",function(){
            Socket.emit(Tants.JOIN_ROOM, params.channel, params.uid);
        });


        Socket.on(Tants.RECEIVE_MESSAGE,function(text){
            handleReceiveMessage(text)
        })

        // @todo handle presentation of new member event 
        Socket.on(Tants.NEW_MEMBER,function(text){
           console.log(text);
        })

    },[]);



    return <div className="w-screen h-screen overflow-hidden landscape:flex landscape:justify-around " >
        {/* <StreamMain channel={params.channel} uid={params.uid} /> */}
        <div className="w-full landscape:w-8/12 relative h-full flex flex-col justify-around items-center landscape:px-6 border-yellow-200 border-solid border-2 ">
            dummy video call replacement
        </div>
        <ChatNParticipant text={youText} setTextfunc={setYouText} handleSendTextClick={handleSendTextClick} messages={messages} />
    </div>
}