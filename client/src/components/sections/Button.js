import React from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { saveMessage } from './../../_actions/message_actions';
import Axios from 'axios';

function ButtonComponent(props) {
  const dispatch = useDispatch();

  const sendEvent = async (event) => {
    //TODO : event API던지기
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
  const buttonPressHandler = (e) => {
    sendEvent(props.buttonInfo.event.structValue.fields.name.stringValue);
  };
  return (
    <Button
      style={{ margin: '0 0rem 1rem 0' }}
      onClick={buttonPressHandler}
      type="primary"
      block="true"
    >
      {props.buttonInfo.text.stringValue}
    </Button>
  );
}

export default ButtonComponent;
