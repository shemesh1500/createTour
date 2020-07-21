import React, { useState } from 'react'
import './index.css'
import bigLogo from '../../images/bigLogo.png'
import videoImg from '../../images/videoImg.png'
import smallLogo from '../../images/smallLogo.png'
import airballoon from '../../images/air-balloon.svg'
import iphone from '../../images/iphone.svg'
import cityBike from '../../images/bike-city.svg'
import howItWork1 from '../../images/howItWork1.png'
import howItWork2 from '../../images/howItWork2.png'
import howItWork3 from '../../images/howItWork3.png'
import rightCarousel from '../../images/rightCarousel.png'
import guideSection from '../../images/guideSection.png'
import ovalBG from '../../images/ovalBG.png'
import businessLogo from '../../images/businessLogo.png'
import businessImg from '../../images/businessImg.png'
import makeCarousel from 'react-reveal/makeCarousel';
import Slide from 'react-reveal/Slide'
import styled, { css } from 'styled-components';
import Axios from 'axios'
import FAQ from './FAQ'


const Index = ({ setStatus, setSigninStatus }) => {
    const width = '300px', height = '150px';
    const Arrow = styled.div`
  text-shadow: 1px 1px 1px #fff;
  z-index: 100;
  line-height: ${height};
  text-align: center;
  position: absolute;
  top: 0;
  width: 10%;
  font-size: 3em;
  cursor: pointer;
  user-select: none;
  padding-top:280px;
  ${props => props.right ? css`left: 70%;` : css`left: 60%;`}
`;

    const Container = styled.div`
    
  position: relative;
  overflow: hidden;
  width: 1100px;
  height: 900px;
`;

    const CarouselUI = ({ position, handleClick, children }) => (
        <Container>
            {children}
            <Arrow onClick={handleClick} data-position={position - 1}> <img src={rightCarousel} alt='airbaloon' /></Arrow>
            <Arrow right onClick={handleClick} data-position={position + 1}> <img src={rightCarousel} alt='airbaloon' /> </Arrow>
        </Container>
    );
    const Carousell = makeCarousel(CarouselUI);

    const [faqs, setFaq] = useState([
        {
            question: 'qestion1',
            answer: 'answer1',
            open: false
        },
        {
            question: 'qestion2',
            answer: 'answer2',
            open: false
        },
        {
            question: 'qestion3',
            answer: 'answer3',
            open: false
        },
    ]);
   
    const toggleFAQ = (index) => {
        setFaq(faqs.map((faq,i) => {
            if(i === index){
                faq.open = !faq.open
            }else{
                faq.open = false
            }
            return faq
        }))
    }

    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Message, setMessage] = useState("")
    const [buttonText, setbuttonText] = useState("Send message")

    const formSubmit = (e) => {
        e.preventDefault()

        setbuttonText('...sending')

        let data = {
            name: Name,
            email: Email,
            message: Message
        }

        Axios.post('API_URI', data)
            .then(res => {
                setbuttonText('Sent'); 
                resetForm()
            })
            .catch(() => {
                console.log('Message not sent')
            })
    }

    const resetForm = () => {
        setName("")
        setEmail("")
        setMessage("")
        setbuttonText("Send message")

    }

    return (
        <div className='indexPage'>
            <div className="headerIndex">

                <div className='centerNav'>
                    <img src={smallLogo} alt="smallLogo" />
                    <ul>
                        <li><a href="#section1">Who we are?</a></li>
                        <li><a href="#section2">How it works?</a></li>
                        <li><a href="#section3">Guides</a></li>
                        <li><a href="#section4">Business</a></li>
                        <li><a href="#section4">Contact us</a></li>
                    </ul>
                    <button className='loginButton' onClick={() => (setStatus('signin'), setSigninStatus('login'))}>Login</button>
                    <button className='registerButton' onClick={() => (setStatus('signin'), setSigninStatus('register'))}>Register</button>
                </div>
                <div>
                    <img src={bigLogo} alt="Logo" />
                </div>
                <div className='videoArea'>
                    <img src={videoImg} alt="videoImg" />
                </div>
            </div>

            <section id="section1">
                <div className="whoWeAreHeader">
                    <div className='whoWeAreHeaderSmall'>
                        Who we are?
                    </div>
                    <div className='whoWeAreHeaderBig'>
                        The app that gonna change your touring world
                    </div>
                </div>
                <div className='whoWeAre'>
                    <div className='whoWeAreItem'>
                        <div className='whoWeAreItemHeader'>
                            <img src={airballoon} alt='airbaloon' />
                            <div>
                                DGuide Application
                            </div>
                        </div>
                        <div className="whoWeAreItemText">
                            lkjasdlkfmakcmadslckmalsdkm lmasdflkmc aslkdfmlkmasdf lkasmdfe lakmdsf ef laksdf ewlkmasd welkfmlkef asdf  lkweflkasdf ;lkmqewflkasd f;lkme wflkasmdflkjre
                        </div>
                    </div>
                    <div className='whoWeAreItem'>
                        <div className='whoWeAreItemHeader'>
                            <img src={cityBike} alt='airbaloon' />
                            <div>
                                In your rhythm
                            </div>
                        </div>
                        <div className="whoWeAreItemText">
                            lkjasdlkfmakcmadslckmalsdkm lmasdflkmc aslkdfmlkmasdf lkasmdfe lakmdsf ef laksdf ewlkmasd welkfmlkef asdf  lkweflkasdf ;lkmqewflkasd f;lkme wflkasmdflkjre
                        </div>
                    </div>
                    <div className='whoWeAreItem'>
                        <div className='whoWeAreItemHeader'>
                            <img src={iphone} alt='airbaloon' />
                            <div>
                                Route with your app
                            </div>
                        </div>
                        <div className="whoWeAreItemText">
                            lkjasdlkfmakcmadslckmalsdkm lmasdflkmc aslkdfmlkmasdf lkasmdfe lakmdsf ef laksdf ewlkmasd welkfmlkef asdf  lkweflkasdf ;lkmqewflkasd f;lkme wflkasmdflkjre
                        </div>
                    </div>
                </div>
            </section>
            <section id="section2">

                <div className='theCarousel'>
                    <Carousell defaultWait={0} /*wait for 1000 milliseconds*/ >
                        <Slide right>
                            <div className='carouselItem'>
                                <div className='carouselPic'>
                                    <img src={howItWork1} alt='airbaloon' />
                                </div>
                                <div className='caroulelContext'>
                                    <div className='hiwSmallTitle'>
                                        How it works?
                                </div>
                                    <div className='carouselHeder'>
                                        Choose your tour
                                </div>
                                    <div className='carouselText'>
                                        kjasdflkja lkjasdflj jkaslkf aksfm qwepmfqw pqwokqwef okpopomwfeq kml;mlkqef plmqwef kmqfqad fdgsdfgaf  f awekj akfjajkenfakjsdf asofkacs wejakfnasd
                                </div>
                                </div>
                            </div>


                        </Slide>
                        <Slide right>
                            <div className='carouselItem'>
                                <div className='carouselPic'>
                                    <img src={howItWork2} alt='airbaloon' />
                                </div>
                                <div className='caroulelContext'>
                                    <div className='hiwSmallTitle'>
                                        How it works?
                                </div>
                                    <div className='carouselHeder'>
                                        Choose your tour
                                </div>
                                    <div className='carouselText'>
                                        kjasdflkja lkjasdflj jkaslkf aksfm qwepmfqw pqwokqwef okpopomwfeq kml;mlkqef plmqwef kmqfqad fdgsdfgaf  f awekj akfjajkenfakjsdf asofkacs wejakfnasd
                                </div>
                                </div>
                            </div>
                        </Slide>
                        <Slide right>
                            <div className='carouselItem'>
                                <div className='carouselPic'>
                                    <img src={howItWork3} alt='airbaloon' />
                                </div>
                                <div className='caroulelContext'>
                                    <div className='hiwSmallTitle'>
                                        How it works?
                                </div>
                                    <div className='carouselHeder'>
                                        Choose your tour
                                </div>
                                    <div className='carouselText'>
                                        kjasdflkja lkjasdflj jkaslkf aksfm qwepmfqw pqwokqwef okpopomwfeq kml;mlkqef plmqwef kmqfqad fdgsdfgaf  f awekj akfjajkenfakjsdf asofkacs wejakfnasd
                                </div>
                                </div>
                            </div>
                        </Slide>
                    </Carousell>
                </div>

            </section>
            <section id="section3">
                <div className='guideSection'>
                    <div className='guideSectionContext'>
                        <img id='ovalBG' src={guideSection} alt='guideSectionLogo' />
                        <div className='guideSectionText'>
                            jncasdkjcnaerjkncekj lkmvfk qerlvker erfkmerkmjkln hf rd trf ij oiuhoiuhhuihoij kmpoim iuj  ytf ytf guyho lkmfk weqfq qwefolkq qwefokmqc qwefmqwef oierw oiret qefoiqemrf qefomqerf qoeifmwer foerimwer weroigmwer fwerofmwer fwpm
                        </div>
                        <button className='guideSectionButton' onClick={() => (setStatus('signin'), setSigninStatus('login'))}>Join to our guide community </button>
                    </div>
                    <div className='guideSelectionPic'>
                        <img src={ovalBG} alt='ovalBG' />
                        <div>
                            dsfklnasdlfknasdlkn asdlkmasldkvm asdlkmasdlfkmasd asdlkvm
                        </div>
                    </div>
                </div>
            </section>
            <section id="section4">
                <div className='businessSection'>

                    <div className='businessImg'>
                        <img src={businessImg} alt='businessImg' />
                    </div>
                    <div className='businessContext'>
                        <div className='businessLogo'>
                            <img src={businessLogo} alt='businessLogo' />
                        </div>
                        <div className='businessText'>
                            jncasdkjcnaerjkncekj lkmvfk qerlvker erfkmerkmjkln hf rd trf ij oiuhoiuhhuihoij kmpoim iuj  ytf ytf guyho lkmfk weqfq qwefolkq qwefokmqc qwefmqwef oierw oiret qefoiqemrf qefomqerf qoeifmwer foerimwer weroigmwer fwerofmwer fwpm
                        </div>
                        <button className='guideSectionButton' onClick={() => (setStatus('signin'), setSigninStatus('login'))}>Join to our business community </button>
                    </div>
                </div>
            </section>
            <section id="section5">
            
                <div className='faqs'>
                <div className='faqHeader'>
                        FAQ 
                    </div>
                    {faqs.map((faq,i) => 
                    <div>
                        <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
                    </div>
                    )}

                </div>
            </section>

            <footer className='footerIndex'>
                <div className='contactHeader' >
                    CONTACT US
                </div>
                <div className='formFooter'>
                    <form className="contact-form" onSubmit={(e) => formSubmit(e)}>
                        <textarea onChange={e => setMessage( e.target.value )} name="message" class="contactForm" type="text" placeholder="Please write your message here" value={Message} required />

                        
                        <input onChange={e => setName( e.target.value )} name="name" class="contactForm" type="text" placeholder="Your Name" value={Name} />

                  
                        <input onChange={(e) =>  setEmail( e.target.value )} name="email" class="contactForm" type="email" placeholder="your@email.com" required value={Email} />

                        <div className="contactButton">
                            <button type="submit" className='guideSectionButton'>{buttonText}</button>
                        </div>
                    </form>
                </div>
            </footer>
        </div>
    )
}

export default Index
