

export function Logo(){
    return <div id="logoContainer">

    </div>
}

export function Menu(){
    return <div id="menuContainer">

    </div>
}

export function Header(){

}

export function Entrance(){
    return <div>
        <div>
            <Words/>
            <CatchyImage/>
        </div>
        <Join/>
    </div>
}

export function Words(){
    return <div>
        <h2>CONNECT WITH THOSE THAT MATTER</h2>
        <p>PORTAL TO THOSE THAT MATTER BE IT FAMILY, STUDENTS, INVESTORS...AND MAYBE YOUR PETS</p>
        <div>
            <span><p>300+ million users</p></span>
            <span><p>39 companies worldwide</p></span>
        </div>
    </div>
}

export function CatchyImage(){
    return <div>
        <img src="" alt=""/>
    </div>
}

export function Join(){
    return <div>

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