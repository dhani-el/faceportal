import { useParams } from "react-router-dom";
import StreamMain,{ChatNParticipant} from "./components";
import "../../index.css"


export default function Call(){
    const params = useParams();
   
    return <div className="w-screen h-screen overflow-hidden landscape:flex landscape:justify-around " >
        <StreamMain channel={params.channel} uid={params.uid} />
        <ChatNParticipant  channel={params.channel} uid={params.uid} />
    </div>
}