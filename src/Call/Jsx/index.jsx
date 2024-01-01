import { useParams } from "react-router-dom";
import StreamMain from "./components";




export default function Call(){
    const params = useParams();
    console.log(params);
    return <div>
        <div>Face Portal</div>
        <StreamMain channel={params.channel} uid={params.uid} />
    </div>
}