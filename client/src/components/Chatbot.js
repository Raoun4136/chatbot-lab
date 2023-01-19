import React, { useEffect, useRef } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../_actions/message_actions';
import Message from './sections/Message';
import ButtonComponent from './sections/Button';
import './Chatbot.css';
import ImageComponent from './sections/Image';
import { TextField } from '@mui/material';

function Chatbot() {
  const dispatch = useDispatch();
  const messagesFromRedux = useSelector((state) => state.message.messages);
  const messageEndRef = useRef(null);

  useEffect(() => {
    eventQuery('question');
  }, []);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({
        block: 'center',
        inline: 'center',
        behavior: 'smooth',
      });
    }
  });

  //TODO : API 폴더 분리하기
  const textQuery = async (text) => {
    let conversation = {
      who: 'user',
      content: {
        text: {
          text: text,
        },
      },
    };

    dispatch(saveMessage(conversation));

    const textQueryVariables = {
      text,
    };
    try {
      const response = await Axios.post(
        '/api/dialogflow/textQuery',
        textQueryVariables
      );

      for (let content of response.data.fulfillmentMessages) {
        conversation = {
          who: 'bot',
          content: content,
        };

        dispatch(saveMessage(conversation));
      }
    } catch (error) {
      conversation = {
        who: 'bot',
        content: {
          text: {
            text: ' 서버 오류입니다. 레벨에 맞는 버튼을 다시 눌러주세요.',
          },
        },
      };

      dispatch(saveMessage(conversation));
    }
  };

  const eventQuery = async (event) => {
    const eventQueryVariables = {
      event,
    };
    try {
      const response = await Axios.post(
        '/api/dialogflow/eventQuery',
        eventQueryVariables
      );
      for (let content of response.data.fulfillmentMessages) {
        let conversation = {
          who: 'bot',
          content: content,
        };

        dispatch(saveMessage(conversation));
      }
    } catch (error) {
      let conversation = {
        who: 'bot',
        content: {
          text: {
            text: ' 서버 오류입니다. 레벨에 맞는 버튼을 다시 눌러주세요.',
          },
        },
      };
      dispatch(saveMessage(conversation));
    }
  };

  const keyPressHanlder = (e) => {
    if (e.key === 'Enter') {
      if (!e.target.value) {
        return alert('you need to type somthing first');
      }

      textQuery(e.target.value);

      e.target.value = '';
    }
  };

  const renderOneMessage = (message, i) => {
    //console.log('message', message);

    // template for normal text
    if (message.content && message.content.text && message.content.text.text) {
      return (
        <Message key={i} who={message.who} text={message.content.text.text} />
      );
    } else {
      // TODO : expand to all richContents
      // now only for richContents 'buttons', 'images'
      const messages =
        message.content.payload.fields.richContent.listValue.values[0].listValue
          .values;

      return messages.map((el, index) => {
        switch (messages[index].structValue.fields.type.stringValue) {
          case 'button':
            return (
              <ButtonComponent
                key={index}
                who={message.who}
                buttonInfo={messages[index].structValue.fields}
              />
            );
          case 'image':
            return (
              <ImageComponent
                key={index}
                who={message.who}
                imageInfo={messages[index].structValue.fields}
              />
            );
          default:
            break;
        }
      });
    }

    /**
    // TEMPLATE FOR CARDS
      const renderCards = (cards) => {
        return cards.map((card, i) => (
          <CardComponent key={i} cardInfo={card.structValue} />
        ));
      };

      else if (message.content && message.content.payload.fields.card) {
        //template for card
        const AvatarSrc =
          message.who === 'bot' ? <RobotOutlined /> : <SmileOutlined />;

        return (
          <div>
            <List.Item style={{ padding: '1rem' }}>
              <List.Item.Meta
                avatar={<Avatar icon={AvatarSrc} />}
                title={message.who}
                description={renderCards(
                  message.content.payload.fields.card.listValue.values
                )}
              />
            </List.Item>
          </div>
        );
      } else if (message.content && message.content.payload.fields.button) {
        return <Button />;
      }
    */
  };

  const renderMessage = (returnedMessages) => {
    //TODO: 하나하나의 메세지에 delay걸기
    if (returnedMessages) {
      return returnedMessages.map((message, i) => {
        return renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        backgroundColor: '#fafafa',
      }}
    >
      <div
        style={{
          height: '8vh',
          width: '100%',
          textAlign: 'center',
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#41a6f6',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        챗봇
      </div>
      <div
        style={{
          height: '85vh',
          width: '100%',
          overflow: 'auto',
          overflowX: 'hidden',
        }}
      >
        {renderMessage(messagesFromRedux)}
        <div ref={messageEndRef} />
      </div>
      <TextField
        style={{
          width: '100%',
        }}
        id="filled-basic"
        label="정답을 입력하세요"
        variant="filled"
        onKeyPress={keyPressHanlder}
        type="text"
      />
    </div>
  );
}

export default Chatbot;
