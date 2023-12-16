import "../../index.css"

 function Logo(){
    return <div id="logoContainer">
                <h3>FACEPORTAL</h3>
    </div>
}

 function Menu(){
    return <div id="menuContainer" className="landscape:lg:hidden" >
        <p>menu</p>
    </div>
}

function NavItems(){
    return <div className="hidden landscape:lg:flex w-3/12 justify-between " >
        <p>ITEM ONE</p>
        <p>ITEM TWO</p>
        <p>ITEM THREE</p>
    </div>
}
export function Header(){
    return <div  className="flex w-full justify-between px-6 pt-4 lg:px-12 " >
        <div className="flex gap-2" >
            <Menu/>
            <Logo/>
        </div>
        <NavItems/>
        <Auth/>
    </div>
}

function Auth(){
    return <div>
        <p>Sign Up</p>
    </div>
}

export function Entrance(){
    return <div className=" mt-28 w-screen h-1/3 relative grid grid-cols-1 landscape:grid-cols-2 " >
        <Words/>
        <div className="w-full h-full absolute landscape:relative ">
            <CatchyImage/>
        </div>
    </div>
}

export function Words(){
    return <div className="flex flex-col items-center w-full pt-9 ">
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
        <img src="" alt="" className="h-full w-full" />
    </div>
}

export function Join(){
    return <div>
        <p>join</p>
    </div>
}

export function FirstSocialProof({evidences}){
    return  <div>
        {evidences.map(function(evidence){
            return <AsocialProof image={evidence.image} alt={evidence.alt} />
        })}
    </div>
}

function AsocialProof({image , alt}){
    return <div>
        <img src={image} alt={alt} />
    </div>
}

export function SecondSocialProof({testimonials}){
    return <div>
        {
            testimonials.map(function(testimony){
                return <Testimonial testimony={testimony} />
            })
        }
    </div>
}

export function Testimonial({testimony}){
    return <div>
        <div>
            <span> <img src={testimony.image}/> </span>
            <p>{testimony.name}</p>
        </div>
        <p>{testimony.words}</p>
    </div>
}

export function Pitch({cases}){
    return <div>
        {
            cases.map(function(singleCase,index){
                if((index % 2) === 0 ){
                    return <Case2 caseData={singleCase}/>
                } else {
                    return <Case1 caseData={singleCase}/>
                }
            })
        }
    </div>
}

function Case1({caseData}){
    return <div>
        <ImageSection image={caseData.image} alt={caseData.alt}/>
        <TextSection header={caseData.header} body={caseData.body} />
    </div>
}

function Case2(){
    return <div>
        <TextSection  image={caseData.image} alt={caseData.alt} />
        <ImageSection  header={caseData.header} body={caseData.body} />
    </div>
}

function TextSection({header,body}){
    return <div>
        <h3>{header}</h3>
        <p>{body}</p>
    </div>
}

function ImageSection({image,alt}){
    return <div>
        <img src={image} alt={alt}/>
    </div>
}

export function Footer(){
    
}