import { useParams } from "react-router-dom";
import StreamMain,{ChatNParticipant} from "./components";




export default function Call(){
    const params = useParams();
    console.log(params);
    return <div className="w-screen h-screen overflow-hidden landscape:flex landscape:justify-around " >
        {/* <StreamMain channel={params.channel} uid={params.uid} /> */}
        <div className="w-full landscape:w-8/12 relative h-full flex flex-col justify-around items-center landscape:px-6 border-yellow-200 border-solid border-2 ">
            dummy video call replacement
        </div>
        <ChatNParticipant/>
    </div>
}