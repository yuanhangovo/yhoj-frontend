import { React, useState, useEffect } from 'react';
import { Flex, Splitter, Typography, Layout } from 'antd';

const Desc = props => (
  <Flex justify="center" align="center" >
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);
const CodeEditor = ({ initialCode = '', onCodeChange }) => {

    return (<Layout >
            <Splitter layout="vertical" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}}>
                <Splitter.Panel >
                
                </Splitter.Panel>
                <Splitter.Panel >
                <Desc text="Second" style={{height: 'calc(0.3 * (100vh - 70px))'}}/>
                </Splitter.Panel>
            </Splitter>
        </Layout>
    );
}
export default CodeEditor;