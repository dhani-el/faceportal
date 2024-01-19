import "../../index.css"
import { Button, TextField } from "@mui/material";
import {motion} from "framer-motion";

import smallLogo from "../../assets/logo/smallge.png"
import mediumLogo from "../../assets/logo/mediumge.png"
import largeLogo from "../../assets/logo/largege.png"
import xlargeLogo from "../../assets/logo/xlargege.png"

import smallMenu  from "../../assets/menu/menuIcon.png"
import largeMenu  from "../../assets/menu/largeMenu.png"
import mediumMenu  from "../../assets/menu/mediumMenu.png"
import xlargeMenu  from "../../assets/menu/xLargeMenu.png"
import hero from "../../assets/hero/conf3.png";


 function Logo(){
    return <div id="logoContainer" className=" w-4/6 md:w-1/2 lg:w-full landscape:w-11/12">
                <picture className="w-full h-auto" >
                    <source srcSet={xlargeLogo} media="(min-width: 1500px)" />
                    <source srcSet={largeLogo} media="(min-width: 950px)" />
                    <source srcSet={mediumLogo} media="(min-width: 650px)" />
                    <source srcSet={smallLogo} media="(min-width: 250px)" />
                    <img src={mediumLogo} alt="face portal logo" />
                </picture>
    </div>
}

 function Menu(){
    return <div id="menuContainer"  className=" w-4 md:w-8 portrait:lg:hidden landscape:lg:hidden" >
                <picture className="w-full h-auto" >
                    <source srcSet={xlargeMenu} media="(min-width: 1500px)" />
                    <source srcSet={largeMenu} media="(min-width: 950px)" />
                    <source srcSet={mediumMenu} media="(min-width: 650px)" />
                    <source srcSet={smallMenu} media="(min-width: 250px)" />
                    <img src={smallMenu} alt="Menu Icon" />
                </picture>
    </div>
}

function NavItems(){
    return <div className="hidden lg:flex landscape:lg:flex w-3/12 justify-between " >
        <p>HOST</p>
        <p>JOIN</p>
        <p>SCHEDULE</p>
    </div>
}
export function Header(){
    return <div  className=" flex w-full justify-between px-6 py-2  landscape:px-12 items-center font-bebas bg-yellow-00 " >
        <div className="flex gap-2 md:gap-4 w-2/4 portrait:lg:w-2/12 landscape:w-32 items-center " >
            <Menu/>
            <Logo/>
        </div>
        <NavItems/>
        <Auth/>
    </div>
}

function Auth(){
    return <Button variant="contained" className="text-xs font-bebas" sx={{backgroundColor:"#fff001", color:"black",  fontFamily:"inherit"}} >Sign in</Button>
}

export function Entrance({modalTriggerFunc, setChannel}){
    return <div className=" mt-16 md:mt-0 lg:mt-10 landscape:mt-10 w-screen  relative grid grid-cols-1 lg:grid-cols-2 landscape:grid-cols-2 mb-5 px-4" >
        <Words  modalTriggerFunc={modalTriggerFunc} setChannel={setChannel} />
        <motion.div className="w-full h-full absolute lg:relative landscape:relative landscape:overflow-hidden ">
            <CatchyImage/>
        </motion.div>
    </div>
}

export function Words({modalTriggerFunc, setChannel}){
    return <div className="  flex flex-col items-center w-full pt-9 z-10 justify-center">
            <div className="w-1/2 absolute -z-10 hidden lg:block landscape:block" >
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#15bab3" d="M48.4,-50.4C54.4,-42.4,45.3,-21.2,39.1,-6.2C32.9,8.8,29.7,17.6,23.7,21.8C17.6,26,8.8,25.6,-4.5,30.1C-17.9,34.6,-35.7,44.1,-52.3,39.9C-68.9,35.7,-84.2,17.9,-83.4,0.8C-82.6,-16.3,-65.8,-32.6,-49.2,-40.6C-32.6,-48.6,-16.3,-48.4,2.4,-50.8C21.2,-53.3,42.4,-58.4,48.4,-50.4Z" transform="translate(100 100)" />
                </svg>
            </div>
            <div className="bg-teal-700 bg-opacity-40 p-2 lg:bg-transparent landscape:bg-transparent rounded-lg md:rounded-2xl " >
                <h2 className=" text-3xl md:text-5xl font-extrabold lg:text-4xl landscape:text-5xl text-center font-bebas " >CONNECT WITH THOSE THAT MATTER</h2>
                <div className="flex justify-center w-full"  >
                    <p className=" text-center pt-1 text-sm md:text-2xl lg:text-lg landscape:text-base landscape:w-9/12 font-bebas landscape:text-gray-600 " >Portal To Those That Matter Be It Family, Friends, Students, Investors...And Maybe Your Pets</p>
                </div>
                <div className="flex gap-x-12 pt-4 w-full justify-center font-montserrat text-xs font-bold landscape:font-semibold landscape:text-sm "  >
            <span className="flex flex-col items-center md:text-xl lg:text-lg landscape:text-sm ">
                <p >300+</p>
                <p > MILLION USERS</p>
            </span>
            <span className="flex flex-col items-center md:text-xl landscape:text-sm " >
                <p>39 COMPANIES </p>
                <p>WORLDWIDE</p>
            </span>
                </div>
            </div>
        <Join modalTriggerFunc={modalTriggerFunc} setChannel={setChannel} />
    </div>
}

export function CatchyImage(){
    const imageAnimation = {
        initial:{
            scale:1.4
        },
        animate:{
            scale:1,
            transition:{
                duration:1.2,
            }
        }
    }
    return <div className="h-full w-full  ">
        <motion.img src={hero}  variants = {imageAnimation} initial ="initial" animate= "animate" alt="hero" className="h-auto w-full md:h-full md:object-cover lg:h-full lg:w-auto landscape:h-full landscape:w-auto lg:rounded-xl landscape:rounded-lg " />
    </div>
}

export function Join({modalTriggerFunc, setChannel}){

    function handleTextChange(text,setter){
        setter(function(initial){ return text});
    }
    return <div className="  pt-24 md:top-20 lg:top-0 landscape:pt-12 flex w-full justify-center relative top-12 landscape:static font-montserrat ">
                <TextField className="bg-white landscape:bg-transparent" sx={{fontFamily:"montserrat",fontWeight:"700"}} onChange={function(e){handleTextChange(e.target.value,setChannel)}} />
                <Button variant="contained" className="relative -left-3  " onClick={modalTriggerFunc} sx={{backgroundColor:"#fff001", color:"black", fontWeight:"700", fontFamily:"inherit"}}  >JOIN</Button>
    </div>
}

export function NameModal({setNameFunc,handleSubmit, handleCancel}){

    function handleTextChange(text){
        setNameFunc(init=>text);
    }
    return <div className="flex w-full h-full justify-center items-center font-bebas z-20" >

                <div className="p-4 flex flex-col bg-yellow-200 justify-center items-center gap-4 text-black rounded-xl w-3/4 landscape:w-2/5 z-20 ">
                    <Button className="self-end" sx={{fontFamily:"inherit",color:'black', }} onClick={handleCancel} >x</Button>
                    <p>Set A Name To Use</p>
                    <TextField onChange={function(e){handleTextChange(e.target.value)}} />
                    <Button variant="contained" onClick={handleSubmit} sx={{background:"black", color:"white", fontFamily:"inherit"}} >USE</Button>
                </div>
            </div>
}

export function FirstSocialProof({evidences}){
    return  <div className="flex flex-wrap w-3/4 gap-4  items-center justify-center  " >
        {evidences.map(function(evidence){
            return <AsocialProof image={evidence.image} alt={evidence.alt} />
        })}
    </div>
}

function AsocialProof({image , alt}){
    return <div className="w-20" >
        <img src={image} alt={alt} />
    </div>
}

export function SecondSocialProof({testimonials}){
    return <div className="flex flex-wrap justify-center gap-6 w-full " >
        {
            testimonials.map(function(testimony){
                return <Testimonial testimony={testimony} />
            })
        }
    </div>
}

function Testimonial({testimony}){
    return <div className=" mt-16 px-4 flex flex-col items-center w-full md:w-2/5 landscape:w-1/4 ">
        <div className="flex gap-16 items-center w-11/12  " >
            <span className="w-20 h-20 flex justify-center "> <img src={testimony.image} alt="user" className="w-full h-auto " style={{borderRadius:"2.5rem"}} /> </span>
            <p className="text-center overflow-hidden text-ellipsis font-bebas ">{testimony.name}</p>
        </div>
        <p className="w-full text-center font-montserrat font-medium ">{testimony.words}</p>
    </div>
}

export function Pitch({cases}){
    return <div className="flex flex-col gap-12 px-6 mt-20 m-12 mx-auto landscape:w-10/12 landscape:gap-28  "   >
        {
            cases.map(function(singleCase,index){
                return index % 2 == 0  ? <Case1 caseData={singleCase}/> : <Case2 caseData={singleCase}/>
            })
        }
    </div>
}

function Case1({caseData}){

    const animations={
            main:{
                initial :{
                    x:"5%"
                },
                animate:{
                    x:0,
                    transition:{
                        duration:1.5
                    }
                }
            }
    }

    return <motion.div variants={animations.main} initial="initial" whileInView={"animate"} className="flex flex-col lg:flex-row landscape:flex-row w-full lg:w-10/12 landscape:w-10/12 lg:self-end landscape:self-end justify-around items-center">
        <ImageSection image={caseData.image} alt={caseData.alt}/>
        <TextSection header={caseData.header} body={caseData.body} />
    </motion.div>
}

function Case2({caseData}){
    const animations={
        main:{
            initial :{
                x:"-5%"
            },
            animate:{
                x:0,
                transition:{
                    duration:1.5
                }
            }
        }
}
    return <motion.div variants={animations.main} initial="initial" whileInView={"animate"}  className="flex w-full flex-col-reverse lg:flex-row landscape:flex-row lg:w-10/12 landscape:w-10/12 justify-around items-center ">
        <TextSection header={caseData.header} body={caseData.body} />
        <ImageSection image={caseData.image} alt={caseData.alt}/>
    </motion.div>
}

function TextSection({header,body}){
    return <div className="text-justify landscape:w-6/12" >
                <div className="relative flex justify-center items-center">
                    <svg className="absolute -z-10 w-24 " viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#000000" d="M48.4,-50.4C54.4,-42.4,45.3,-21.2,39.1,-6.2C32.9,8.8,29.7,17.6,23.7,21.8C17.6,26,8.8,25.6,-4.5,30.1C-17.9,34.6,-35.7,44.1,-52.3,39.9C-68.9,35.7,-84.2,17.9,-83.4,0.8C-82.6,-16.3,-65.8,-32.6,-49.2,-40.6C-32.6,-48.6,-16.3,-48.4,2.4,-50.8C21.2,-53.3,42.4,-58.4,48.4,-50.4Z" transform="translate(100 100)" />
                    </svg>
                    <h3 className="font-extrabold pb-4 text-center landscape:pb-6 font-bebas text-xl text-teal-600 "  >{header}</h3>
                </div>
                <p className="font-montserrat font-medium md:px-14 landscape:px-0 ">{body}</p>
    </div>
}

function ImageSection({image,alt}){
    return <div  className="w-full h-48 mb-4 landscape:h-full landscape:w-2/5" >
        <img src={image} alt={alt} className="w-full h-full object-contain object-center rounded-lg " />
    </div>
}

export function Footer(){
        return <div className="  relative flex gap-4 flex-col items-center landscape:flex-row landscape:gap-0 landscape:justify-around landscape:items-center w-screen mt-24 bg-yellow-200 landscape:p-10 font-bebas " >
            <div className="flex justify-around w-11/12 landscape:w-1/3" >
                <div>Home</div>
                <div>About</div>
                <div>Contact</div>
                <div>Pricing</div>
            </div>
            <div className="w-5/6 flex justify-center lg:w-1/3 landscape:w-1/5 ">
                <Logo/>
            </div>
            <div className="flex justify-center" >CopyRight  2024  Faceportal  All  rights  reserved</div>

        </div>
    }