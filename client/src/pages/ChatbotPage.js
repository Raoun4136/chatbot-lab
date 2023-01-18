import { useLocation } from 'react-router-dom';
import AiForOceans from '../components/AiForOceans';
import Chatbot from '../components/Chatbot';
import qs from 'qs';
import './ChatbotPage.css';

function ChatbotPage() {
  const location = useLocation();
  const queryData = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  return (
    <div className="chatbotPage">
      <div className="learning">
        <AiForOceans />
      </div>
      <div className="chatbot">
        <Chatbot version={queryData.version} />
      </div>
    </div>
  );
}

export default ChatbotPage;
