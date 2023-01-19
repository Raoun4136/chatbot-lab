import React from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { saveMessage } from './../../_actions/message_actions';
import Axios from 'axios';
import { List, ListItem } from '@mui/material';

function ButtonComponent(props) {
  const dispatch = useDispatch();

  const sendEvent = async (event) => {
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
            text: ' 서버 오류입니다. 레벨에 맞는 버튼을 다시 눌러주세요.',
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
    <List disablePadding="true">
      <ListItem>
        {props.buttonInfo.text.stringValue === '수정' ? (
          <Button
            variant="outlined"
            fullWidth="true"
            color="primary"
            onClick={buttonPressHandler}
          >
            {props.buttonInfo.text.stringValue}
          </Button>
        ) : (
          <Button
            variant="contained"
            fullWidth="true"
            color="primary"
            onClick={buttonPressHandler}
          >
            {props.buttonInfo.text.stringValue}
          </Button>
        )}
      </ListItem>
    </List>
  );
}

export default ButtonComponent;
