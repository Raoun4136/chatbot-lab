import { Image, List } from 'antd';
import { RobotOutlined, SmileOutlined } from '@ant-design/icons';
import React from 'react';
import './Image.css';

function ImageComponent(props) {
  const data = [props.who];
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ padding: '1rem' }}>
          <Image width={'80%'} src={props.imageInfo.rawUrl.stringValue} />
        </List.Item>
      )}
    />
  );
}

export default ImageComponent;
