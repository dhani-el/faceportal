import { useState } from "react";
import { useNavigate } from "react-router-dom";


import { Header,Entrance, Join, NameModal, FirstSocialProof, Pitch, SecondSocialProof } from "./component";

import mlb from "../../assets/mlb.png";
import parks from "../../assets/parks.png";
import capital from "../../assets/capital.png";
import mofitt from "../../assets/mofitt.png";
import nasadaq from "../../assets/nasadaq.png";
import times from "../../assets/times.png";
import rakuten from "../../assets/rakuten.png";
import service from "../../assets/service.png";
import texas from "../../assets/texas.png";
import walmart from "../../assets/walmart.png";
import wff from "../../assets/wwf.png";


export default function Home(){
    const navigate = useNavigate();
    const [displayModal, setDisplayModal] = useState(false);
    const [channel, setChannel] = useState('');
    const [uid, setUid] = useState('');

    function handleSubmit(){
        navigate(`/call/${channel}/${uid}`);
    }
    return <div id="homeContainer" className=" h-screen min-h-screen w-screen overflow-x-hidden box-border  " >
                    <Header/>
                    <Entrance/>
                    <Join modalTriggerFunc={function(){setDisplayModal(init=>true)}} setChannel={setChannel} />
                    <div className="w-full flex justify-center mt-12 font-extrabold" >
                        <h3>OUR CUSTOMERS</h3>
                    </div>
                    <div className="w-full flex justify-center ">
                        <FirstSocialProof evidences={[{image:mlb,alt:""},{image:wff,alt:""},{image:nasadaq,alt:""},{image:times,alt:""},{image:rakuten,alt:""},{image:texas,alt:""},{image:service,alt:""},{image:walmart,alt:""},{image:parks,alt:""},{image:capital,alt:""},{image:mofitt,alt:""}]} />
                    </div>
                    <Pitch cases={pitchDataSet} />
                    <SecondSocialProof testimonials = {testimonials} />
                    {displayModal && <div>
                                        <NameModal setNameFunc={setUid} handleSubmit={handleSubmit} />
                                    </div>}
            </div>
}


const pitchDataSet = [
    {
        image:"",
        alt:"this is ______",
        header:"BOILER PLATE HEADER TO SHOWCASE SOMETHING",
        body:`Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Nostrum nihil labore asperiores consequuntur perspiciatis 
        praesentium eligendi vero necessitatibus eos distinctio, 
        deserunt quas atque aspernatur iste neque, fugit qui
        quasi amet beatae similique, quia maxime recusandae
        doloribus! Deleniti earum rerum numquam mollitia itaque 
        dolore beatae voluptatem ratione neque sit? Ratione doloribus
        amet ipsa atque ullam! Nam fugiat nulla sapiente laboriosam 
        sequi tempora, nihil, officia quasi quidem id iste culpa`,
    },
    {
        image:"",
        alt:"ffe",
        header:"THE SECOND BOILERPLATE HEADER",
        body:`voluptatibus accusantium obcaecati, exercitationem eius nequ
        animi voluptates. Recusandae ipsum earum praesentium! Ex liber
        non, eius modi illum sunt nisi, veritatis aliquid quis ducimus
        est dolorem odio odit omnis saepe quod natus explicabo nam architecto
        inventore impedit et! Veniam expedita est eos hic corporis sed minus totam 
        sit impedit doloribus aliquam accusamus voluptas facere amet nisi molestiae 
        eveniet porro ut laudantium id ea, veritatis quas voluptatum dolor? Quisquam 
        necessitatibus neque iure deleniti aliquam nostrum modi. Laboriosam consequatur `,
    },
    {
        image:"",
        alt:"veve",
        header:"THE THIRD BOILERPLATE HEADER",
        body: ` itaque fugit, repellat officiis soluta modi rem dolorum hic harum, sed totam nobis, 
        aut repudiandae expedita quia vitae illum molestiae? A aliquam vel, esse consequuntur 
        nisi tempore. Sed nam labore nesciunt temporibus consectetur illo magni 
        excepturi voluptas vero enim ab blanditiis inventore in nihil beatae debitis 
        dolor porro, repudiandae quas aliquam exercitationem officiis minus. Deserunt 
        dolor beatae quae necessitatibus sequi animi voluptates totam debitis magni! 
        Architecto tenetur reprehenderit ab deserunt atque mollitia beatae, eos suscipit 
        iure. Sunt, deleniti. Omnis facere odit quas consequuntur aliquam repudiandae `,
    },
    {
        image:"",
        alt:"wjke",
        header:"THE FOURTH SUPPOSEDLY UNIQUE HEADER",
        body:`autem consectetur nostrum asperiores. Itaque voluptatum aliquam magni praesentium 
        obcaecati incidunt dolor autem, saepe unde dolores at accusantium. Deleniti numquam 
        et, molestias rem laudantium alias neque nostrum libero nulla suscipit inventore 
        vitae ut facilis? Saepe sit delectus suscipit nulla pariatur! Fugiat consequatur 
        harum, sint omnis debitis autem placeat cumque itaque cupiditate non ut doloremque, 
        maiores recusandae! Ipsa, mollitia, obcaecati tenetur amet corporis repellat cupiditate 
        perferendis, debitis modi nisi molestias suscipit.`,
    },

]

const testimonials = [
    {
        image :"",
        name:"Levi Ackerman",
        words:`One of the best apps i have used totally recommend 5 stars all the way`
    },
    {
        image :"",
        name:"Mikasa Jules",
        words:`One of the best apps i have used totally recommend 5 stars all the way`
    },
    {
        image :"",
        name:"Eren Yeager",
        words:`One of the best apps i have used totally recommend 5 stars all the way`
    },
    {
        image :"",
        name:"Erwin Smith",
        words:`One of the best apps i have used totally recommend 5 stars all the way`
    },
    {
        image :"",
        name:"Hinata Shoyou",
        words:`One of the best apps i have used totally recommend 5 stars all the way`
    },
]