import React, { useEffect, useRef } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { initMessage, saveMessage } from '../_actions/message_actions';
import Message from './sections/Message';
import ButtonComponent from './sections/Button';
import './Chatbot.css';
import ImageComponent from './sections/Image';

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
    //  First  Need to  take care of the message I sent
    let conversation = {
      who: 'user',
      content: {
        text: {
          text: text,
        },
      },
    };

    dispatch(saveMessage(conversation));
    // console.log('text I sent', conversation)

    // We need to take care of the message Chatbot sent
    const textQueryVariables = {
      text,
    };
    try {
      //I will send request to the textQuery ROUTE
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
            text: ' Error just occured, please check the problem',
          },
        },
      };

      dispatch(saveMessage(conversation));
    }
  };

  const eventQuery = async (event) => {
    // We need to take care of the message Chatbot sent
    const eventQueryVariables = {
      event,
    };
    try {
      //I will send request to the eventQuery ROUTE
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
            text: ' Error just occured, please check the problem',
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

      //we will send request to text query route
      textQuery(e.target.value);

      e.target.value = '';
    }
  };

  const renderOneMessage = (message, i) => {
    console.log('message', message);
    // we need to give some condition here to separate message kinds

    // template for normal text
    if (message.content && message.content.text && message.content.text.text) {
      return (
        <Message key={i} who={message.who} text={message.content.text.text} />
      );
    } else {
      // TODO : expand to all richContents
      // only for richContents 'buttons', 'images'
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
        // if (messages[index].structValue.fields.type.stringValue === 'button') {
        //   return (
        //     <ButtonComponent
        //       key={index}
        //       who={message.who}
        //       buttonInfo={messages[index].structValue.fields}
        //     />
        //   );
        // }
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
      }}
    >
      <div
        style={{
          height: '93vh',
          width: '100%',
          overflow: 'auto',
          overflowX: 'hidden',
        }}
      >
        {renderMessage(messagesFromRedux)}
        <div ref={messageEndRef} />
      </div>
      <input
        style={{
          margin: 0,
          width: '100%',
          height: '7vh',
          padding: '1rem 0 1rem 1rem',
          fontSize: '1rem',
          backgroundColor: '#dedede',
        }}
        placeholder="메세지를 입력하세요"
        onKeyPress={keyPressHanlder}
        type="text"
      />
    </div>
  );
}

export default Chatbot;
