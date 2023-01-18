import React from 'react';
import { List, Avatar } from 'antd';
import { RobotOutlined, SmileOutlined } from '@ant-design/icons';

function Message(props) {
  const AvatarSrc = props.who === 'bot' ? <RobotOutlined /> : <SmileOutlined />;
  const data = [props.who];
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ padding: '1rem' }}>
          <List.Item.Meta
            avatar={<Avatar size="large" icon={AvatarSrc} />}
            title={props.who}
            description={props.text}
          />
        </List.Item>
      )}
    />
  );
}

export default Message;
