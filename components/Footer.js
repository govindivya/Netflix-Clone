import { useRouter } from "next/router";
import { BsFacebook, BsLinkedin, BsInstagram } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
/********************************************************************************************** */
const Footer = () => {
  const router = useRouter();
  const [email,setEmail] = useState("")
  return (
    <>
      <div
        className="bg-cover max-w-full overflow-x-hidden box-border relative bg-center"
        style={{
          backgroundImage:
            'url("https://image.freepik.com/free-photo/abstract-black-white-bokeh-background_1962-1324.jpg")',
        }}
      >
        <div style={{ backgroundColor: "#040714" }}>
          <div className="container mx-auto px-6 lg:px-20 py-12">
            <div className="lg:flex">
              <div className="w-full lg:w-2/3">
                <div className="md:flex">
                  <div className="w-full mb-12 lg:mb-0 lg:w-1/2">
                    <h2
                      style={{ fontFamily: '"Baloo Tamma 2", cursive' }}
                      className="font-bold text-xl text-gray-100 mb-4"
                    >
                      GDisnep+HotVideos
                    </h2>
                    <p className="text-gray-400">
                      It is a place where you spend your time with your
                      favourite movie character and feel happy. We are always
                      working hard to make people happy.
                    </p>
                    <div className="flex mt-6">
                      <i
                        style={{ backgroundColor: "#3B5998" }}
                        className="flex items-center justify-center h-12 w-12 mr-1 rounded-full fab fill-current text-white text-xl fa-facebook-f"
                      >
                        <a
                          href="https://www.facebook.com/profile.php?id=100017806238756"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <BsFacebook />
                        </a>
                      </i>
                      <i
                        style={{ backgroundColor: "#dd4b39" }}
                        className="flex items-center justify-center h-12 w-12 mx-1 rounded-full fas fill-current text-white text-xl fa-envelope"
                      >
                        <a
                          href="https://www.instagram.com/govindkushwaha827/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <BsInstagram />
                        </a>
                      </i>
                      <i
                        style={{ backgroundColor: "#125688" }}
                        className="flex items-center justify-center h-12 w-12 mx-1 rounded-full fab fill-current text-white text-xl fa-instagram"
                      >
                        <a href="mailto:govindivya8081@gmail.com">
                          <MdEmail />
                        </a>
                      </i>
                      <i
                        style={{ backgroundColor: "#55ACEE" }}
                        className="flex items-center justify-center h-12 w-12 mx-1 rounded-full fab fill-current text-white text-xl fa-twitter"
                      >
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href="https://www.linkedin.com/in/govind-kumar-kushwaha-121433208/"
                        >
                          <BsLinkedin />
                        </a>
                      </i>
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 md:flex lg:px-6 ">
                    <div className="w-full mb-6 lg:mb-0 lg:w-1/2">
                      <h2
                        style={{ fontFamily: '"Baloo Tamma 2", cursive' }}
                        className="font-bold text-gray-100 mb-4"
                      >
                        Useful Links
                      </h2>
                      <ul className="text-gray-500 text-sm">
                        <li
                          className="pt-1 pb-2 cursor-pointer  hover:text-gray-100"
                          onClick={(e) => router.push("/")}
                        >
                          Home
                        </li>
                        <li
                          className="pt-1 pb-2 cursor-pointer  hover:text-gray-100"
                          onClick={(e) => router.push("/movie")}
                        >
                          Movie
                        </li>
                        <li
                          className="pt-1 pb-2 cursor-pointer  hover:text-gray-100"
                          onClick={(e) => router.push("/search")}
                        >
                          Search
                        </li>
                        <li
                          className="pt-1 pb-2 cursor-pointer  hover:text-gray-100"
                          onClick={(e) => router.push("/watchlist")}
                        >
                          Watchlist
                        </li>
                      </ul>
                    </div>
                    <div className="w-full mb-6 lg:mb-0 lg:w-1/2">
                      <h2
                        style={{ fontFamily: '"Baloo Tamma 2", cursive' }}
                        className="font-bold text-gray-100 mb-4"
                      >
                        Our sevices
                      </h2>
                      <ul className="text-gray-500 text-sm">
                        <li className="pt-1 pb-2">Video Streaming</li>
                        <li className="pt-1 pb-2">3D Character Design</li>
                        <li className="pt-1 pb-2">Film Production</li>
                        <li className="pt-1 pb-2">Marketing</li>
                        <li className="pt-1 pb-2">Graphics Design</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/3">
                <h2
                  style={{ fontFamily: '"Baloo Tamma 2", cursive' }}
                  className=" font-bold text-gray-100 mb-4"
                >
                  Our Newsletter
                </h2>
                <div className="text-gray-300 mb-8">
                  Subscribe our weely Newsletter to get regular updates about
                  our blogs.
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="rounded-l max-w-[70vw] text-gray-600 px-2 focus:outline-none"
                  />
                  <button
                    onClick={e=>{
                      setEmail("");
                      window.alert("Subscribed successfully");
                    }}
                    className="text-gray-200 rounded-r hover:bg-blue-500 px-4 py-2 focus:outline-none"
                    style={{ backgroundColor: "#dc0900" }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            fontFamily: '"Baloo Tamma 2", cursive',
            backgroundColor: "#040714",
          }}
        >
          <div className="container mx-auto px-2 lg:px-20 py-6">
            <div className="flex justify-center text-gray-300 mb-1">
              © 2020 &nbsp;<span className="font-bold">Govind.</span>&nbsp;2020
              All right reserved.
            </div>
            <div className="flex font-light justify-center text-gray-500 text-sm">
              <p>
                Designed by <span className="font-bold">govindivya.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
