import React, { useEffect, useState } from "react";
import "./index.css";
import "./index.scss";
import bigLogo from "../../images/bigLogo.png";
//import videoImg from "../../images/videoImg.png";
import smallLogo from "../../images/smallLogo.png";
import airballoon from "../../images/air-balloon.svg";
import iphone from "../../images/iphone.svg";
import cityBike from "../../images/bike-city.svg";
import howItWork1 from "../../images/howItWork1.png";
import howItWork2 from "../../images/howItWork2.png";
import howItWork3 from "../../images/howItWork3.png";
import rightCarousel from "../../images/rightCarousel.png";
import leftCarousel from "../../images/leftCarusel.png";
import guideSection from "../../images/guideSection.png";
import playStore from "../../images/playStore.png";
import appStore from "../../images/appStore.png";
import ovalBG from "../../images/ovalBG.png";
import businessLogo from "../../images/businessLogo.png";
import businessImg from "../../images/businessImg.png";
import makeCarousel from "react-reveal/makeCarousel";
import Slide from "react-reveal/Slide";
import styled, { css } from "styled-components";
import Axios from "axios";
import FAQ from "./FAQ";
import DGvideo from '../../images/DguideV7.mp4'
import {navBar, section1, section2, section3, section4, section5, section6} from './language.js'
import facebookIcon from '../../images/facebook.svg'
import instagramIcon from '../../images/instagram.svg'
import whatsappIcon from '../../images/whatsapp.svg'
import youtubeIcon from '../../images/youtube.svg'
import linkedinIcon from '../../images/linkedin.svg'

const Index = ({ setStatus, setSigninStatus }) => {
  const /*width = "300px",*/
    height = "150px";
  const Arrow = styled.div`
    text-shadow: 1px 1px 1px #fff;
    z-index: 1000;
    line-height: ${height};
    text-align: center;
    position: absolute;
    top: 0;
    width: 10%;
    font-size: 3em;
    cursor: pointer;
    user-select: none;
    padding-top: 280px;
    ${(props) =>
      props.right
        ? css`
            left: 70%;
          `
        : css`
            left: 60%;
          `}
     @media (max-width: 600px){
      ${(props) =>
        props.right
          ? css`
              left: 80%;
              padding-top: 510px;
              opacity: 0.5;
              
            `
          : css`
              left: 0%;
              padding-top: 510px;
              opacity: 0.5;
            `}
    } 
  `;

  const Container = styled.div`
    position: relative;
    overflow: hidden;
    /* width: 1100px; */
    width : 50%;
    height: 1000px;
    @media (max-width: 600px){
      width:100%
    }
  `;

  const CarouselUI = ({ position, handleClick, children }) => (
    <Container>
      {children}
      <Arrow onClick={handleClick} data-position={position - 1}>
        {" "}
        <img src={leftCarousel} alt="airbaloon" />
      </Arrow>
      <Arrow right onClick={handleClick} data-position={position + 1}>
        {" "}
        <img src={rightCarousel} alt="airbaloon" style={{marginTop:'28px'}} />{" "}
      </Arrow>
    </Container>
  );
  const Carousell = makeCarousel(CarouselUI);

  const [lang, setLang] = useState('en')
  const [faqs, setFaq] = useState([
    {
      question: section5['question1'][lang],
      answer: "answer1",
      open: false,
    },
    {
      question: "qestion2",
      answer: "answer2",
      open: false,
    },
    {
      question: "qestion3",
      answer: "answer3",
      open: false,
    },
  ]);

  useEffect(() => {
    setFaq([
      {
          question: section5['question1'][lang],
          answer: section5['answer1'][lang],
          open: false,
      },
      {
        question: section5['question2'][lang],
        answer: section5['answer2'][lang],
        open: false,
      },
      {
        question: section5['question3'][lang],
        answer: section5['answer3'][lang],
        open: false,
      },
      {
        question: section5['question4'][lang],
        answer: section5['answer4'][lang],
        open: false,
      },
    ])
  }, [lang])

  const toggleFAQ = (index) => {
    setFaq(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }
        return faq;
      })
    );
  };

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");
  const [buttonText, setbuttonText] = useState(section6['submit'][lang]);
  useEffect(() => {
    setbuttonText(section6['submit'][lang])
  }, [buttonText])
  const formSubmit = (e) => {
    e.preventDefault();

    setbuttonText("...sending");

    let data = {
      name: Name,
      email: Email,
      message: Message,
    };

    Axios.post("API_URI", data)
      .then((res) => {
        setbuttonText("Sent");
        resetForm();
      })
      .catch(() => {
        console.log("Message not sent");
      });
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setbuttonText("Send message");
  };

  return (
    <div className="indexPage">
      <div className="headerIndex">
      <div class="icon-bar">
          <a href='https://www.facebook.com/Dguide-680137719024299'>
            <img className='socialIcon' src={facebookIcon} alt='facebook' />
          </a>
          <a href='#'>
            <img className='socialIcon' src={whatsappIcon} alt='whatsapp' />
          </a>
          <a href='#'>
            <img className='socialIcon' src={youtubeIcon} alt='youtube' />
          </a>
          <a href='#'>
            <img className='socialIcon' src={instagramIcon} alt='instagram' />
          </a>
          <a href='https://www.linkedin.com/company/73908978'>
            <img className='socialIcon' src={linkedinIcon} alt='linkedin' />
          </a>
          </div>
        <div className={navBar['style'][lang]}>
        <img className='smallLogo' src={smallLogo} alt="smallLogo" style={{width:'111px', hight:'82px'}} />    
          <nav role="custom-dropdown">
            <input type="checkbox" id="button" />
            <label for="button" onclick></label>

 
            <ul className={navBar['menuStyle'][lang]}>
              <li>
                <a href="#section1">{navBar['section1'][lang]}</a>
              </li>
              <li>
                <a href="#section2">{navBar['section2'][lang]}</a>
              </li>
              <li>
                <a href="#section3">{navBar['section3'][lang]}</a>
              </li>
              <li>
                <a href="#section4">{navBar['section4'][lang]}</a>
              </li>
              <li>
                <a href="#section5">{navBar['section5'][lang]}</a>
              </li>
              <li>
                <a href="#section6">{navBar['section6'][lang]}</a>
              </li>
            </ul>

    
          </nav>
          <div className='langSelection'>
          <a
              onClick={() => setLang('he')}
              style={{ cursor: "pointer" }}
              className='Lang'
              href="#"
            >
              HE
            </a>
            <hiv className='Lang'> | </hiv>
            <a
              onClick={() => setLang('en')}
              style={{ cursor: "pointer" }}
              className='Lang'
              href="#"
            >
              EN
            </a>
          </div>
          
          {/* <button
            className="loginButton"
            onClick={() => (setStatus("signin") && setSigninStatus("login"))}
          >
            Login
          </button>
          <button
            className="registerButton"
            onClick={() => (setStatus("signin") && setSigninStatus("register"))}
          >
            Register
          </button> */}
        </div>
        <div>
          <img src={bigLogo} alt="Logo" className='bigLogo'/>
        </div>
        <div className="videoArea">
          {/* {<img src={videoImg} alt="videoImg" />} */}
          <video  loop autoplay muted
                    width="60%"
                    hight="100%"
                    controls
                    style={{borderRadius: '10px'}}>
           <source src= { DGvideo } type="video/mp4"  />
          </video>
        </div>
       
        
      </div>

      <section id="section1">
      <div className='appLinks'>
      <a href="https://play.google.com/store/apps/details?id=com.tours.guide">
          <img  className="getAppButton" src={playStore} alt="playStoreLink" />
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.tours.guide">
          <img className="getAppButton" src={appStore} alt='appStoreLink' />
          </a>
          
          </div>
        <div className="whoWeAreHeader">
          <div className="whoWeAreHeaderSmall">{section1['smallTitle'][lang]}</div>
          <div className="whoWeAreHeaderBig">
           {section1['bigTitle'][lang]}
          </div>
        </div>
        <div className="whoWeAre">
          <div className="whoWeAreItem">
            <div className={section1['headerStyle'][lang]}>
              <img src={airballoon} alt="airbaloon" />
              <div>{section1['area1Title'][lang]}</div>
            </div>
            <div className={section1['textStyle'][lang]}>
            {section1['area1Text'][lang]}
            </div>
          </div>
          <div className="whoWeAreItem">
            <div className={section1['headerStyle'][lang]}>
              <img src={cityBike} alt="airbaloon" />
              <div>{section1['area2Title'][lang]}</div>
            </div>
            <div className={section1['textStyle'][lang]}>
            {section1['area2Text'][lang]}
            </div>
          </div>
          <div className="whoWeAreItem">
            <div className={section1['headerStyle'][lang]}>
              <img src={iphone} alt="airbaloon" />
              <div>{section1['area3Title'][lang]}</div>
            </div>
            <div className={section1['textStyle'][lang]}>
            {section1['area3Text'][lang]}
            </div>
          </div>
        </div>
      </section>
      <section id="section2">
        <div className="theCarousel">
          <Carousell defaultWait={0} /*wait for 1000 milliseconds*/>
            <Slide right>
              <div className="carouselItem">
                <div className="carouselPic">
                  <img src={howItWork1} alt="airbaloon" class='carouselImg'/>
                </div>
                <div className={section2['textStyle'][lang]}>
                  <div className="hiwSmallTitle">{section2['smallTitle'][lang]}</div>
                  <div className="carouselHeder">{section2['bigTitle1'][lang]}</div>
                  <div className="carouselText">
                  {section2['text1'][lang]}
                  </div>
                </div>
              </div>
            </Slide>
            <Slide right>
              <div className="carouselItem">
                <div className="carouselPic">
                  <img src={howItWork2} alt="airbaloon" class='carouselImg'/>
                </div>
                <div className={section2['textStyle'][lang]}>
                  <div className="hiwSmallTitle">{section2['smallTitle'][lang]}</div>
                  <div className="carouselHeder">
                  {section2['bigTitle2'][lang]}
                  </div>
                  <div className="carouselText">
                  {section2['text1'][lang]}
                  </div>
                </div>
              </div>
            </Slide>
            <Slide right>
              <div className="carouselItem">
                <div className="carouselPic">
                  <img src={howItWork3} alt="airbaloon" class='carouselImg'/>
                </div>
                <div className={section2['textStyle'][lang]}>
                  <div className="hiwSmallTitle">{section2['smallTitle'][lang]}</div>
                  <div className="carouselHeder">
                  {section2['bigTitle3'][lang]}
                  </div>
                  <div className="carouselText">
                  {section2['text1'][lang]}
                  </div>
                </div>
              </div>
            </Slide>
          </Carousell>
        </div>
      </section>
      <section id="section3">
        <div className={section3['objStyle'][lang]}>
          <div className="guideSectionContext">
            <img className="guideLogo" src={guideSection} alt="guideSectionLogo" />
            <div className='guideSectionText'>
              {section3['text'][lang]}
            </div>
            <button
              className="guideSectionButton"
              onClick={() => (setStatus("signin") && setSigninStatus("login"))}
            >
              {section3['buttonText'][lang]} 
            </button>
          </div>
          <div className="guideSelectionPic">
            <img src={ovalBG} alt="ovalBG" />
          </div>
        </div>
      </section>
      <section id="section4">
        <div className= {section4['objStyle'][lang]}>
          <div className="businessImg">
            <img className='businessImg' src={businessImg} alt="businessImg" />
          </div>
          <div className="businessContext">
            <div className="businessLogo">
              <img className='businessLogo' src={businessLogo} alt="businessLogo" />
            </div>
            <div className="businessText">
              {section4['text'][lang]}
            </div>
            <button
              className="guideSectionButton"
              onClick={() => (setStatus("signin") && setSigninStatus("login"))}
            >
              {section4['buttonText'][lang]}
            </button>
          </div>
        </div>
      </section>
      <section id="section5">
        <div className={section5['faqStyle'][lang]}>
          <div className="faqHeader">{section5['title'][lang]}</div>
          {faqs.map((faq, i) => (
            <div key={i}>
              <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
            </div>
          ))}
        </div>
      </section>

      <footer id="#section5" className="footerIndex">
        <div className="contactHeader">{section6['title'][lang]}</div>
        <div className="formFooter">
          <form className="contact-form" onSubmit={(e) => formSubmit(e)}>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              name="message"
              className="contactForm"
              type="text"
              placeholder={section6['massage'][lang]}
              value={Message}
              required
            />

            <input
              onChange={(e) => setName(e.target.value)}
              name="name"
              className="contactForm"
              type="text"
              placeholder={section6['name'][lang]}
              value={Name}
            />

            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              className="contactForm"
              type="email"
              placeholder={section6['email'][lang]}
              required
              value={Email}
            />

            <div className="contactButton">
              <button type="submit" className="guideSectionButton">
              {section6['submit'][lang]}
              </button>
            </div>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default Index;
