import "../../index.css"
import { Button, TextField } from "@mui/material";

import smallLogo from "../../assets/logo/small3.png"
import mediumLogo from "../../assets/logo/medium3.png"
import largeLogo from "../../assets/logo/large3.png"
import xlargeLogo from "../../assets/logo/xlarge3.png"

import smallMenu  from "../../assets/menu/menuIcon.png"
import largeMenu  from "../../assets/menu/largeMenu.png"
import mediumMenu  from "../../assets/menu/mediumMenu.png"
import xlargeMenu  from "../../assets/menu/xLargeMenu.png"
import hero from "../../assets/hero/conf3.png";

 function Logo(){
    return <div id="logoContainer" className=" w-4/6 landscape:w-11/12">
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
    return <div id="menuContainer"  className=" w-4 landscape:lg:hidden" >
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
    return <div className="hidden landscape:lg:flex w-3/12 justify-between " >
        <p>HOST</p>
        <p>JOIN</p>
        <p>SCHEDULE</p>
    </div>
}
export function Header(){
    return <div  className=" flex w-full justify-between px-6 py-2 lg:px-12 items-center font-bebas bg-sky-400 " >
        <div className="flex gap-2 w-2/4 landscape:w-32 items-center " >
            <Menu/>
            <Logo/>
        </div>
        <NavItems/>
        <Auth/>
    </div>
}

function Auth(){
    return <Button variant="outlined" className="text-xs" >Sign in</Button>
}

export function Entrance({modalTriggerFunc, setChannel}){
    return <div className=" mt-16  landscape:mt-10 w-screen  relative grid grid-cols-1 landscape:grid-cols-2 mb-5 px-4" >
        <Words  modalTriggerFunc={modalTriggerFunc} setChannel={setChannel} />
        <div className="w-full h-full absolute landscape:relative ">
            <CatchyImage/>
        </div>
    </div>
}

export function Words({modalTriggerFunc, setChannel}){
    return <div className="flex flex-col items-center w-full pt-9 z-10 justify-center ">
        <h2 className=" text-3xl font-extrabold landscape:text-5xl text-center font-bebas " >CONNECT WITH THOSE THAT MATTER</h2>
        <div className="flex justify-center w-full"  >
            <p className=" text-center pt-1 text-sm landscape:text-base landscape:w-9/12 font-bebas landscape:text-gray-600 " >Portal To Those That Matter Be It Family, Friends, Students, Investors...And Maybe Your Pets</p>
        </div>
        <div className="flex gap-x-12 pt-4 w-full justify-center font-montserrat text-xs font-bold landscape:font-semibold landscape:text-sm "  >
            <span className="flex flex-col items-center">
                <p >300+</p>
                <p > MILLION USERS</p>
            </span>
            <span className="flex flex-col items-center" >
                <p>39 COMPANIES </p>
                <p>WORLDWIDE</p>
            </span>
        </div>
        <Join modalTriggerFunc={modalTriggerFunc} setChannel={setChannel} />
    </div>
}

export function CatchyImage(){
    return <div className="h-full w-full  ">
        <img src={hero} alt="hero" className="h-auto w-full landscape:h-full landscape:w-auto landscape:rounded-lg " />
    </div>
}

export function Join({modalTriggerFunc, setChannel}){

    function handleTextChange(text,setter){
        setter(function(initial){ return text});
    }
    return <div className="  pt-24 landscape:pt-12 flex w-full justify-center relative top-12 landscape:static  ">
                <TextField onChange={function(e){handleTextChange(e.target.value,setChannel)}} />
                <Button variant="contained" className="relative -left-3" onClick={modalTriggerFunc} >JOIN</Button>
    </div>
}

export function NameModal({setNameFunc,handleSubmit}){

    function handleTextChange(text){
        setNameFunc(init=>text);
    }
    return <div>
                <p>Set A Name To Use</p>
                <TextField onChange={function(e){handleTextChange(e.target.value)}} />
                <Button onClick={handleSubmit} >USE</Button>
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
    return <div className=" mt-16 px-4 flex flex-col items-center w-full landscape:w-1/4 ">
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
    return <div className="flex flex-col landscape:flex-row w-full landscape:w-10/12 lg:self-end justify-around items-center">
        <ImageSection image={caseData.image} alt={caseData.alt}/>
        <TextSection header={caseData.header} body={caseData.body} />
    </div>
}

function Case2({caseData}){
    return <div className="flex w-full flex-col-reverse landscape:flex-row landscape:w-10/12 justify-around items-center ">
        <TextSection header={caseData.header} body={caseData.body} />
        <ImageSection image={caseData.image} alt={caseData.alt}/>
    </div>
}

function TextSection({header,body}){
    return <div className="text-justify landscape:w-6/12" >
        <h3 className="font-extrabold pb-4 text-center landscape:pb-6 font-bebas text-xl "  >{header}</h3>
        <p className="font-montserrat font-medium ">{body}</p>
    </div>
}

function ImageSection({image,alt}){
    return <div  className="w-full h-48 mb-4 landscape:h-full landscape:w-2/5" >
        <img src={image} alt={alt} className="w-full h-full object-contain object-center rounded-lg " />
    </div>
}

export function Footer(){
        return <div className=" flex gap-4 flex-col items-center landscape:flex-row landscape:gap-0 landscape:justify-around landscape:items-center w-screen mt-24  p-6 landscape:p-10  bg-sky-400 font-bebas ">
    
            <div className="flex justify-around w-11/12 landscape:w-1/3" >
                <div>Home</div>
                <div>About</div>
                <div>Contact</div>
                <div>Pricing</div>
            </div>
            <div className="w-5/6 flex justify-center landscape:w-1/5 ">
                <Logo/>
            </div>
            <div className="flex justify-center" >CopyRight  2024  Faceportal  All  rights  reserved</div>
        </div>
    }