import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion"


import { Header,Entrance, NameModal, FirstSocialProof, Pitch, SecondSocialProof, Footer } from "./component";

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

import hero1 from "../../assets/hero/conf3.png";
import hero2 from "../../assets/hero/conf4.png";
import hero3 from "../../assets/hero/conf5.png";
import hero4 from "../../assets/hero/conf6.png";


export default function Home(){
    const navigate = useNavigate();
    const [displayModal, setDisplayModal] = useState(false);
    const [channel, setChannel] = useState('');
    const [uid, setUid] = useState('');

    function handleSubmit(){
        navigate(`/call/${channel}/${uid}`);
    }

    function handleCancel(){
        setDisplayModal(init => !init)
    }

    const socialProofAnimation = {
            header:{
                initial:{
                    x:"-4%",
                    y:"-8%",
                    opacity:0.2
                },
                animate:{
                    x:0,
                    y:0,
                    opacity:1,
                    transition:{
                        duration:1.4,
                        repeat:0
                    }
                    }
        },
        proof:{
            initial:{
                x:"-4%",
                y:"-8%",
                opacity:0.2
            },
            animate:{
                x:0,
                y:0,
                opacity:1,
                transition:{
                    delay:0.5,
                    duration:1.5,
                    repeat:0
                }
        }
    }
}

    return <div id="homeContainer" className=" relative h-screen min-h-screen w-screen overflow-x-hidden box-border  " >
                    <Header/>
                    <Entrance modalTriggerFunc={function(){setDisplayModal(init=>true)}} setChannel={setChannel}/>
                    <motion.div variants={socialProofAnimation.header} initial = "initial" whileInView={"animate"} className="w-full flex justify-center mt-12 md:mt-24 lg:mt:12 font-extrabold" >
                        <div className="relative">
                            <svg className="absolute -z-10"  viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#141213" d="M48.4,-50.4C54.4,-42.4,45.3,-21.2,39.1,-6.2C32.9,8.8,29.7,17.6,23.7,21.8C17.6,26,8.8,25.6,-4.5,30.1C-17.9,34.6,-35.7,44.1,-52.3,39.9C-68.9,35.7,-84.2,17.9,-83.4,0.8C-82.6,-16.3,-65.8,-32.6,-49.2,-40.6C-32.6,-48.6,-16.3,-48.4,2.4,-50.8C21.2,-53.3,42.4,-58.4,48.4,-50.4Z" transform="translate(100 100)" />
                        </svg>
                        <h3 className="font-bebas text-3xl py-10 text-yellow-400 ">OUR CUSTOMERS</h3>
                        </div>
                    </motion.div>
                    <motion.div  variants={socialProofAnimation.proof} initial = "initial" whileInView={"animate"} className="w-full flex justify-center ">
                        <FirstSocialProof evidences={[{image:mlb,alt:""},{image:wff,alt:""},{image:nasadaq,alt:""},{image:times,alt:""},{image:rakuten,alt:""},{image:texas,alt:""},{image:service,alt:""},{image:walmart,alt:""},{image:parks,alt:""},{image:capital,alt:""},{image:mofitt,alt:""}]} />
                    </motion.div>
                    <Pitch cases={pitchDataSet} />
                    <SecondSocialProof testimonials = {testimonials} />
                    {displayModal && <div className="absolute w-screen h-screen top-0 bg-teal-100 z-20 bg-opacity-80" >
                                        <NameModal setNameFunc={setUid} handleSubmit={handleSubmit} handleCancel = {handleCancel} />
                                    </div>}
                    <Footer/>
            </div>
}




const pitchDataSet = [
    {
        image:hero1,
        alt:"this is ______",
        header:"1V1 OR CONFERENCE? it's YOUR CHOICE",
        body:`Faceportal gives you our user the seamless choice of a one on one 
        call or a group call, without the extra steps, baggage or pricing and is a 
        feature that works over a wide variety of devices ranging from PC'S to Mobile devices and even Alexa`,
    },
    {
        image:hero2,
        alt:"ffe",
        header:"HD VIDEO AND VOICE CALLS",
        body:`Faceportal is made for you our user as a portal to those that matter
        and so obviousely we want you to hear and see those that matter as clear as possible connecting you to
        them as seamslessly as possible. so here is our team offering to you HD Voice and Video calls to share 
        experiences with those that matter  `,
    },
    {
        image:hero3,
        alt:"veve",
        header:"USER INTERFACE MINUS THE HASSLE ",
        body: ` We want you to fully relish the experience of talking to those that matter so we once again offer 
        you a portal to them without the clutter and hassle of of a complicated UI. That is why our team has put in 
        the effort to give you a simple and intuitive user interface without taking away those features that you love `,
    },
    {
        image:hero4,
        alt:"wjke",
        header:"WE ARE FRIENDS OF BUSINESSES",
        body:`Clients, Investors, Employees and Employers matter a lot too which is why we made sure to give you 
        unparalled call connections. With facePortal connecting to 50 people is a piece of cake if that is not enough 
        we have made sure you always have a seamless 100 minutes of call time to hold your virtual business meeting down.`,
    },

]

const testimonials = [
    {
        image :hero2,
        name:"Levi Ackerman",
        words:`One of the best apps i have used totally recommend 5 stars all the way`
    },
    {
        image :hero3,
        name:"Mikasa Jules",
        words:`One of the best apps i have used totally recommend 5 stars all the way`
    },
    {
        image :hero1,
        name:"Eren Yeager",
        words:`One of the best apps i have used totally recommend 5 stars all the way`
    },
    {
        image :hero4,
        name:"Erwin Smith",
        words:`One of the best apps i have used totally recommend 5 stars all the way`
    },
    {
        image :hero2,
        name:"Hinata Shoyou",
        words:`One of the best apps i have used totally recommend 5 stars all the way`
    },
]