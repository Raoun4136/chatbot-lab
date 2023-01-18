import './Main.css';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <div className="mainDiv">
      <div className="informDiv">
        <div className="beforeInformDiv">
          <a
            href="https://docs.google.com/presentation/d/1zLbmDb6Be2ZvcZzybnsAs_c0dBEFC6JCbwVAQwdXWMY/edit?usp=sharing"
            className="information"
          >
            실험 안내
          </a>
          <a href="https://forms.gle/nJrPPerzaohjopmCA" className="information">
            실험 전 설문
          </a>
        </div>
        <div className="afterInformDiv">
          <a href="https://forms.gle/PjtfoNVU8yNaCWde9" className="information">
            실험 후 테스트
          </a>
          <a href="https://forms.gle/WSwR3j3iuCzRstb69" className="information">
            실험 후 설문
          </a>
        </div>
      </div>
      <div className="linkDivContainer">
        <div className="linkDiv">
          <Link className="link" to="/chatbot?version=1">
            챗봇1
          </Link>
          <img
            src={process.env.PUBLIC_URL + '/image/chatbot1.png'}
            alt="chatbotImage1"
          />
        </div>
        <div className="linkDiv">
          <Link className="link" to="/chatbot?version=2">
            챗봇2
          </Link>
          <img
            src={process.env.PUBLIC_URL + '/image/chatbot2.png'}
            alt="chatbotImage2"
          />
        </div>
        <div className="linkDiv">
          <Link className="link" to="/chatbot?version=3">
            챗봇3
          </Link>
          <img
            src={process.env.PUBLIC_URL + '/image/chatbot3.png'}
            alt="chatbotImage3"
          />
        </div>
        <div className="linkDiv">
          <Link className="link" to="/chatbot?version=4">
            챗봇4
          </Link>
          <img
            src={process.env.PUBLIC_URL + '/image/chatbot4.png'}
            alt="chatbotImage4"
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
