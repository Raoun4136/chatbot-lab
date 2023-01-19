import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { green, blue } from '@mui/material/colors';
import {
  Avatar,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
} from '@mui/material';

function Message(props) {
  const AvatarSrc =
    props.who === 'bot' ? (
      <SmartToyIcon color="white" />
    ) : (
      <PersonIcon color="white" />
    );
  const avatarColor = props.who === 'bot' ? green[300] : blue[300];
  return (
    <>
      {props.who === 'bot' ? (
        <>
          <List disablePadding="true">
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: avatarColor }}>{AvatarSrc}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={props.who} />
            </ListItem>
          </List>
          <List disablePadding="true">
            <ListItem>
              <ListItemText secondary={props.text} />
            </ListItem>
          </List>
        </>
      ) : (
        <>
          <List disablePadding="true">
            <ListItem style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <ListItemText
                style={{ display: 'flex', justifyContent: 'flex-end' }}
                primary={props.who}
              />
              <ListItemAvatar
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <Avatar sx={{ bgcolor: avatarColor }}>{AvatarSrc}</Avatar>
              </ListItemAvatar>
            </ListItem>
          </List>
          <List disablePadding="true">
            <ListItem>
              <ListItemText
                style={{ display: 'flex', justifyContent: 'flex-end' }}
                secondary={props.text}
              />
            </ListItem>
          </List>
        </>
      )}
    </>
  );
}
export default Message;
