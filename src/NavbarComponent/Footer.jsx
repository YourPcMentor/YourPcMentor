import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import ".././css/Footer.css"
import { motion } from "framer-motion";


const Footer = () => {
  return (
<div className="footer" id="footer">
  <div className="footer-content">
    <div classname="footer-left">
      <h1>Your PC mentor</h1>
      <p>
        Welcome to Your PC Mentor, where expert PC repair and
        service meets custom PC building excellence. Whether you're
        looking to fix an issue or create your ideal PC setup, our
        team is dedicated to delivering top-notch solutions and
        personalized support.
      </p>
    </div>
    <div className="footer-center">
      <h3>Follow us on social media</h3>
      <ul>
        <motion.li whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="icon"><a href="https://github.com/Vasulkartejas/Your_PC_Mentor/tree/master" target="_blank"><FaGithub/></a></motion.li>
        <motion.li whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="icon"><a href="/" target="_blank"><FaLinkedin /></a></motion.li>
        <motion.li whileHover={{scale:1.1}} whileTap={{scale:0.9}} className="icon"><a href="/" target="_blank"><FaFacebook /></a></motion.li>
      </ul>
    </div>
    <div className="footer-right">
      <h3>Get in Touch</h3>
      <p>Phone: 555-555-5555</p>
      <p>Email: <a className="footLink" href="mailto:info@foodapp.com">info@ypm.com</a></p>
    </div>

  </div>
  <hr />
  <div>
    <p>&copy; 2024 Your PC Mentor. All rights reserved.</p>
  </div>
</div>
  );
};

export default Footer;

