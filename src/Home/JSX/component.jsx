import "../../index.css"
import { Button, TextField } from "@mui/material";
import smallLogo from "../../assets/logo/small2.png"
import mediumLogo from "../../assets/logo/medium.png"
import largeLogo from "../../assets/logo/large2.png"
import xlargeLogo from "../../assets/logo/xlarge.png"
import { MenuRounded } from "@mui/icons-material";
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
    return <div id="menuContainer" className="landscape:lg:hidden" >
        <MenuRounded/>
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
    return <div  className=" bg-lime-700 text-white flex w-full justify-between px-6 pt-4 lg:px-12 items-center " >
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

export function Entrance(){
    return <div className=" mt-16 w-screen  relative grid grid-cols-1 landscape:grid-cols-2 mb-5 px-4 " >
        <Words/>
        <div className="w-full h-full absolute landscape:relative ">
            <CatchyImage/>
        </div>
    </div>
}

export function Words(){
    return <div className="flex flex-col items-center w-full pt-9 z-10 justify-center ">
        <h2 className="font-extrabold text-lg text-center " >CONNECT WITH THOSE THAT MATTER</h2>
        <p className="text-sm text-center pt-6 w-11/12 landscape:w-9/12 " >Portal To Those That Matter Be It Family, Friends, Students, Investors...And Maybe Your Pets</p>
        <div className="flex gap-x-6 pt-4 w-full justify-center "  >
            <span className="w-1/4 text-center" ><p>300+ million users</p></span>
            <span className="w-1/4 text-center" ><p>39 companies worldwide</p></span>
        </div>
    </div>
}

export function CatchyImage(){
    return <div className="h-full w-full px-3 ">
        <img src={hero} alt="hero" className="h-auto w-full landscape:h-full landscape:w-auto " />
    </div>
}

export function Join({modalTriggerFunc, setChannel}){

    function handleTextChange(text,setter){
        setter(function(initial){ return text});
    }
    return <div className="pt-4 flex w-full justify-center landscape:justify-start landscape:ps-24 relative -top-12 ">
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
    return  <div className="flex flex-wrap w-3/4 gap-4  items-center justify-center " >
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
    return <div className=" px-4 flex flex-col items-center gap-3 w-full md:w-2/5 ">
        <div className="flex gap-2 items-center w-11/12 justify-around " >
            <span className="w-20 h-20"> <img src={testimony.image} alt="user" className="w-full h-auto" /> </span>
            <p className="text-center overflow-hidden text-ellipsis">{testimony.name}</p>
        </div>
        <p className="w-full text-center">{testimony.words}</p>
    </div>
}

export function Pitch({cases}){
    return <div className="flex flex-col gap-12 px-6 mt-12 mb-12 mx-auto lg:w-10/12 lg:gap-28 "   >
        {
            cases.map(function(singleCase,index){
                return index % 2 == 0  ? <Case1 caseData={singleCase}/> : <Case2 caseData={singleCase}/>
            })
        }
    </div>
}

function Case1({caseData}){
    return <div className="flex flex-col lg:flex-row w-full lg:w-10/12 lg:self-end ">
        <ImageSection image={caseData.image} alt={caseData.alt}/>
        <TextSection header={caseData.header} body={caseData.body} />
    </div>
}

function Case2({caseData}){
    return <div className="flex w-full flex-col-reverse lg:flex-row lg:w-11/12 ">
        <TextSection header={caseData.header} body={caseData.body} />
        <ImageSection image={caseData.image} alt={caseData.alt}/>
    </div>
}

function TextSection({header,body}){
    return <div className="text-justify lg:w-3/5" >
        <h3 className="font-extrabold pb-4 text-center lg:pb-8 "  >{header}</h3>
        <p>{body}</p>
    </div>
}

function ImageSection({image,alt}){
    return <div  className="w-full h-48 mb-4 lg:h-full lg:w-2/5" >
        <img src={image} alt={alt} className="w-full h-full object-contain object-center " />
    </div>
}

export function Footer(){
    
}