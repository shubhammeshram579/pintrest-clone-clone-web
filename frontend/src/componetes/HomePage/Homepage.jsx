import React, { useEffect, useRef } from "react";
import img2 from "..//../assets/img.png";
import RegisterPage from "..//../componetes/pages/signup/RegisterPage";
import FlickityCarousel from "../HomePage/LendingPage.jsx";
import Footer from "../Footer/Footer.jsx";
import "..//../App.css";
import "..//../Responsive.css";
import { gsap } from "gsap";

function Homepage() {
  const downbtn = useRef(null);

  // gsap animation effect
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(downbtn.current, {
      y: 40,
      duration: 2,
      opacity: 1,
      ease: "power1.inOut",
      transition: "linear 0.5s",
    });
  });

  return (
    <>
      <div id="homePageContainer" className="relative z-50">
        <div>
          <FlickityCarousel />
        </div>
        <a href="#registerPage">
          <i
            ref={downbtn}
            class="ri-arrow-down-wide-line bg-green-600 py-3 px-4 absolute z-50 rounded-full mt-[-100px]"
          ></i>
        </a>
        <div
          id="hpHeading"
          className="butn bg-yellow-200 relative z-40 pb-6 pt-2"
        >
          <h1 className="font-semibold">
            Here's how it works <i class="ri-arrow-down-wide-line"></i>
          </h1>
        </div>

        {/* home page 2 */}
        <div
          id="hpage2"
          className="page2 flex items-center justify-between h-[100vh] w-full bg-yellow-200 px-20"
        >
          <div id="hpagecard">
            <div className="card1 absolute z-10">
              <div className="images flex items-center justify-evenly gap-[12vw] mt-[-50%]">
                <img
                  id="img1"
                  className="h-[35vh] rounded-3xl"
                  src="https://images.unsplash.com/photo-1543312658-214f2f39c28b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGVhc3klMjBjaGluZSUyMGRpbmVyfGVufDB8fDB8fHww"
                  alt=""
                />
                <div className="flex items-end justify-between flex-col gap-[100px]">
                  <img
                    id="img1"
                    className="h-[35vh] rounded-3xl"
                    src="https://images.unsplash.com/photo-1520715293529-bbc0a2793fea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZWFzeSUyMGNoaW5lJTIwZGluZXJ8ZW58MHx8MHx8fDA%3D"
                    alt=""
                  />
                  <img
                    id="img1"
                    className="h-[35vh] rounded-3xl"
                    src="https://images.unsplash.com/photo-1555992338-d0bacb780a2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVhc3klMjBjaGluZSUyMGRpbmVyfGVufDB8fDB8fHww"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="card2 absolute z-40 ml-52 mt-[-200px]">
              <img
                id="img2"
                className="rounded-3xl h-[55vh]"
                src="https://plus.unsplash.com/premium_photo-1664284045594-0ad29690b41e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpa2FuJTIwZGluZXJ8ZW58MHx8MHx8fDA%3D"
                alt=""
              />
            </div>
            <div
              id="Dinertext"
              className="absolute z-50 bg-white text-black font-bold py-8 px-20 text-2xl rounded-full ml-28"
            >
              <h1>
                <i class="ri-search-line font-bold"></i> Easy chine dinner
              </h1>
            </div>
          </div>

          <div id="hpagecard2" className="card2 relative z-20 ml-[50%]">
            <h1 className="font-bold text-red-700 text-6xl pb-5">
              Search for an idea
            </h1>
            <p className="text-[3.5vh] text-center px-20">
              What do you want to try next? Think of something you’re into –
              such as 'easy chicken dinner' – and see what you find.
            </p>
            <button className="bg-red-600 py-6 px-14 rounded-full mt-5">
              Explore
            </button>
          </div>
        </div>

        {/* home page 3 */}

        <div
          id="hpage3"
          className="page2 flex items-center justify-around h-[100vh] w-full pt-32 bg-teal-200"
        >
          <div className="card1">
            <h1 id="hp3text" className="font-bold text-red-700 text-6xl pb-5">
              Save ideas you like
            </h1>
            <p id="hp3text2" className="text-[3.5vh] text-center px-20">
              Collect your favourites so you can get back to them leter
            </p>
            <button className="bg-red-600 py-6 px-14 rounded-full mt-5">
              Explore
            </button>
          </div>
          <div
            id="imgCard"
            className="card2 flex items-center justify-center gap-20"
          >
            <div className="card1 flex items-center justify-between gap-[140px] flex-col ">
              <h1
                id="bgimg1"
                className="bg-[url(https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZXxlbnwwfHwwfHx8MA%3D%3D)] h-[500px] w-[500px] rounded-3xl bg-center bg-cover font-semibold text-6xl pt-[40%] text-white text-center brightness-90"
              >
                Fern future home vibes{" "}
              </h1>
              <h1 className="bg-[url(https://plus.unsplash.com/premium_photo-1674406481284-43eba097a291?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVhfGVufDB8fDB8fHww)] h-[300px] w-[300px] rounded-3xl bg-center bg-cover font-semibold text-4xl pt-24 text-white ml-28 brightness-90">
                Serve my drinks in style
              </h1>
            </div>
            <div className="card2 flex items-center justify-between gap-20 flex-col">
              <h1 className="bg-[url(https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D)] h-[300px] w-[300px] rounded-3xl bg-center bg-cover font-semibold text-2xl pt-[50%] text-white brightness-90">
                My scadivation bedroom
              </h1>
              <h1
                id="bgimg2"
                className="bg-[url(https://images.unsplash.com/photo-1534196511436-921a4e99f297?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bXklMjBkcmVhbXN8ZW58MHx8MHx8fDA%3D)] h-[200px] w-[200px] mr-32 rounded-3xl bg-center bg-cover font-semibold text-xl pt-24 text-white brightness-90"
              >
                The decking of my dreams
              </h1>
              <h1 className="bg-[url(https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmF0aHJvb218ZW58MHx8MHx8fDA%3D)] h-[300px] w-[300px] mt-16 rounded-3xl bg-center bg-cover font-semibold text-2xl pt-24 text-white brightness-90">
                Our bathroom
              </h1>
            </div>
          </div>
        </div>

        {/* home page 4 */}
        <div
          id="hpage4"
          className="page3 h-[100vh]  w-full flex justify-between gap-20"
        >
          <div id="hp4card" className="card1 w-[68%]">
            <div className="card">
              <img
                id="hp4img1"
                className="h-[100vh] absolute z-10"
                src="https://s.pinimg.com/webapp/shop-de8ddf10.png"
                alt=""
              />
            </div>
            <div className="card2 relative z-20 flex items-start justify-center flex-col">
              <img
                id="hp4img2"
                className="h-[500px] w-[300px] mt-[20%] ml-40 rounded-3xl"
                src="https://s.pinimg.com/webapp/creator-pin-img-3bed5463.png"
                alt=""
              />
              <h1 className="ml-44 text-white text-2xl font-semibold px-10 ">
                scout the city
              </h1>
              <h1 className="ml-44 text-white text-2xl font-semibold px-10 ">
                57.6k followers
              </h1>
            </div>
            <div className="card2 relative z-30">
              <img
                className="mt-[-100px] ml-20"
                src="https://s.pinimg.com/webapp/creator-avatar-262dfeba.png"
                alt=""
              />
            </div>
          </div>
          <div id="hp4card2" className="card2 relative z-50 bg-pink-200">
            <h1 className="font-bold text-red-700 text-6xl pt-[40vh] px-64 pb-5">
              See it, make it, try it, do it
            </h1>
            <p className="text-[3.5vh] text-center px-40">
              The best part of Pinterest is discovering new things and ideas
              from people around the world.
            </p>
            <button className="bg-red-600 py-6 px-14 rounded-full mt-5">
              Explore
            </button>
          </div>
        </div>


        {/* home page 5 */}
        <div id="hpage5" className="page4 pb-10">
          <img
            id="hp5img"
            className="w-full min-h-[100vh] absolute z-10"
            src={img2}
            alt=""
          />
          <div
            id="bghpage5Card"
            className="absolute z-20 bg-gray-950 opacity-75 h-[100vh] w-full"
          ></div>
          <div
            id="hpage5Card"
            className="relative z-50 flex items-center justify-between px-80"
          >
            <div id="hp5text" className="card ">
              <h1 className="font-semibold text-6xl text-white pt-[100%]=== text-start pb-5">
                Sign up to
              </h1>
              <h1 className="font-semibold text-6xl text-white text-start pb-5">
                get your
              </h1>
              <h1
                id="Ideatext"
                className="font-semibold text-6xl text-white text-start"
              >
                ideas
              </h1>
            </div>
            <div className="registerPage text-start" id="registerPage">
              <RegisterPage />
            </div>
          </div>
        </div>
        {/* footer */}
        <div
          id="HomepageFooter"
          className="w-full mt-24 flex items-center justify-center"
        >
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Homepage;
