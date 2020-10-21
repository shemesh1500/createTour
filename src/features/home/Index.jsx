import React, { useState } from "react";
import "./index.css";
import bigLogo from "../../images/bigLogo.png";
import videoImg from "../../images/videoImg.png";
import smallLogo from "../../images/smallLogo.png";
import airballoon from "../../images/air-balloon.svg";
import iphone from "../../images/iphone.svg";
import cityBike from "../../images/bike-city.svg";
import howItWork1 from "../../images/howItWork1.png";
import howItWork2 from "../../images/howItWork2.png";
import howItWork3 from "../../images/howItWork3.png";
import rightCarousel from "../../images/rightCarousel.png";
import guideSection from "../../images/guideSection.png";
import ovalBG from "../../images/ovalBG.png";
import businessLogo from "../../images/businessLogo.png";
import businessImg from "../../images/businessImg.png";
import makeCarousel from "react-reveal/makeCarousel";
import Slide from "react-reveal/Slide";
import styled, { css } from "styled-components";
import Axios from "axios";
import FAQ from "./FAQ";

const Index = ({ setStatus, setSigninStatus }) => {
  const width = "300px",
    height = "150px";
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
    padding-top: 280px;
    ${(props) =>
      props.right
        ? css`
            left: 70%;
          `
        : css`
            left: 60%;
          `}
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
      <Arrow onClick={handleClick} data-position={position - 1}>
        {" "}
        <img src={rightCarousel} alt="airbaloon" />
      </Arrow>
      <Arrow right onClick={handleClick} data-position={position + 1}>
        {" "}
        <img src={rightCarousel} alt="airbaloon" />{" "}
      </Arrow>
    </Container>
  );
  const Carousell = makeCarousel(CarouselUI);

  const [faqs, setFaq] = useState([
    {
      question: "qestion1",
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
  const [buttonText, setbuttonText] = useState("Send message");

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
        <div className="centerNav">
          <img src={smallLogo} alt="smallLogo" />
          <ul className="press1">
            <li>
              <a href="#section1">Who we are?</a>
            </li>
            <li>
              <a href="#section2">How it works?</a>
            </li>
            <li>
              <a href="#section3">Guides</a>
            </li>
            <li>
              <a href="#section4">Business</a>
            </li>
            <li>
              <a href="#section5">Q & A</a>
            </li>
            <li>
              <a href="#section6">Contact us</a>
            </li>
          </ul>
          <button
            className="loginButton"
            onClick={() => (setStatus("signin"), setSigninStatus("login"))}
          >
            Login
          </button>
          <button
            className="registerButton"
            onClick={() => (setStatus("signin"), setSigninStatus("register"))}
          >
            Register
          </button>
        </div>
        <div>
          <img src={bigLogo} alt="Logo" />
        </div>
        <div className="videoArea">
          <img src={videoImg} alt="videoImg" />
        </div>
      </div>

      <section id="section1">
        <div className="whoWeAreHeader">
          <div className="whoWeAreHeaderSmall">Who we are?</div>
          <div className="whoWeAreHeaderBig">
            The app that gonna change your touring world
          </div>
        </div>
        <div className="whoWeAre">
          <div className="whoWeAreItem">
            <div className="whoWeAreItemHeader">
              <img src={airballoon} alt="airbaloon" />
              <div>Independent tours</div>
            </div>
            <div className="whoWeAreItemText">
              DGuide application gives independent tour services that suit the
              need of the traveler without having a physical guide. Tours with
              the theme of History, Culinary, Religion, Nightlife etc. are set
              up by local guides through the newest and techy platform available
              today for tour guides.
            </div>
          </div>
          <div className="whoWeAreItem">
            <div className="whoWeAreItemHeader">
              <img src={cityBike} alt="airbaloon" />
              <div>Navigate in your own pace</div>
            </div>
            <div className="whoWeAreItemText">
              Between the different touring stations and the app will make sure
              you won’t miss the most popular sites- in your own pace and
              without the physical presence of a tour guide.
            </div>
          </div>
          <div className="whoWeAreItem">
            <div className="whoWeAreItemHeader">
              <img src={iphone} alt="airbaloon" />
              <div>Large variety of content </div>
            </div>
            <div className="whoWeAreItemText">
              In every tour station you can enjoy the content of our best tour
              guides combining audio, text, pictures, video and games for the
              whole family. You can integrate culinary tasting, attractions and
              many other things to build the tour the way you like!
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
                  <img src={howItWork1} alt="airbaloon" />
                </div>
                <div className="caroulelContext">
                  <div className="hiwSmallTitle">How it works?</div>
                  <div className="carouselHeder">Choose your tour</div>
                  <div className="carouselText">
                    Culinary tours, history tours, art tours and many more are
                    waitihng just for You!
                  </div>
                </div>
              </div>
            </Slide>
            <Slide right>
              <div className="carouselItem">
                <div className="carouselPic">
                  <img src={howItWork2} alt="airbaloon" />
                </div>
                <div className="caroulelContext">
                  <div className="hiwSmallTitle">How it works?</div>
                  <div className="carouselHeder">
                    Enjoy challenging and thrilling content
                  </div>
                  <div className="carouselText">
                    Video, sound audio and games for all the family will be
                    waiting for you in each one of the stations
                  </div>
                </div>
              </div>
            </Slide>
            <Slide right>
              <div className="carouselItem">
                <div className="carouselPic">
                  <img src={howItWork3} alt="airbaloon" />
                </div>
                <div className="caroulelContext">
                  <div className="hiwSmallTitle">How it works?</div>
                  <div className="carouselHeder">
                    Tour in your own pace and your own way
                  </div>
                  <div className="carouselText">
                    Dguide will guide you from station to station in the most
                    convenient way for you, whenever you want.
                  </div>
                </div>
              </div>
            </Slide>
          </Carousell>
        </div>
      </section>
      <section id="section3">
        <div className="guideSection">
          <div className="guideSectionContext">
            <img id="ovalBG" src={guideSection} alt="guideSectionLogo" />
            <div className="guideSectionText">
              Do you have experience with tour guiding and is your content
              interesting? Do you think you know your city the best and would
              you like to make money out of it? Join the Dguides community,
              create your own tour through our platform and enjoy maximum
              exposure and an extra income!
            </div>
            <button
              className="guideSectionButton"
              onClick={() => (setStatus("signin"), setSigninStatus("login"))}
            >
              Join to our guide community{" "}
            </button>
          </div>
          <div className="guideSelectionPic">
            <img src={ovalBG} alt="ovalBG" />
          </div>
        </div>
      </section>
      <section id="section4">
        <div className="businessSection">
          <div className="businessImg">
            <img src={businessImg} alt="businessImg" />
          </div>
          <div className="businessContext">
            <div className="businessLogo">
              <img src={businessLogo} alt="businessLogo" />
            </div>
            <div className="businessText">
              If you have a culinary business, or in any other attractive
              tourism field, tell us about your business! Create your business
              exposal and allow tour guide from all over the world to combine
              your business in their tour. It will allow you to enjoy more
              tourist traffic, enlarging your profit and maximum exposal for
              FREE!
            </div>
            <button
              className="guideSectionButton"
              onClick={() => (setStatus("signin"), setSigninStatus("login"))}
            >
              Join to our business community{" "}
            </button>
          </div>
        </div>
      </section>
      <section id="section5">
        <div className="faqs">
          <div className="faqHeader">FAQ</div>
          {faqs.map((faq, i) => (
            <div>
              <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
            </div>
          ))}
        </div>
      </section>

      <footer id="#section5" className="footerIndex">
        <div className="contactHeader">CONTACT US</div>
        <div className="formFooter">
          <form className="contact-form" onSubmit={(e) => formSubmit(e)}>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              name="message"
              class="contactForm"
              type="text"
              placeholder="Please write your message here"
              value={Message}
              required
            />

            <input
              onChange={(e) => setName(e.target.value)}
              name="name"
              class="contactForm"
              type="text"
              placeholder="Your Name"
              value={Name}
            />

            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              class="contactForm"
              type="email"
              placeholder="your@email.com"
              required
              value={Email}
            />

            <div className="contactButton">
              <button type="submit" className="guideSectionButton">
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default Index;
