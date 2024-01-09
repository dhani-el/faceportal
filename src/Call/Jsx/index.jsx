import { useParams } from "react-router-dom";
import StreamMain from "./components";




export default function Call(){
    const params = useParams();
    console.log(params);
    return <div className="w-screen h-screen overflow-hidden grid grid-cols-4 " >
        <StreamMain channel={params.channel} uid={params.uid} />
    </div>
}