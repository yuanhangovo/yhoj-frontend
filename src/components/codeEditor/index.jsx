import { React, useState, useEffect } from 'react';
import { Button, Splitter, Tabs, Layout, Select, Input } from 'antd';
import AceEditor from 'react-ace';
import { FlagFilled, CaretRightFilled } from '@ant-design/icons';

import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-python';

import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/ext-language_tools'; // 代码提示

const { TextArea } = Input;

const supportLan = [
    { value: 'cpp', label: 'C++' },
    { value: 'python', label: 'python' },
    { value: 'c', label: 'C' },
    { value: 'golang', label: 'Golang' },
]

const CodeEditor = ({theme}) => {

    const [code, setCode] = useState(`#include<iostream>\nusing namespace std;\n\nint main(){\n\tcout << "Hello! World!";\n\n\treturn 0\n}`);

    const [codeHeight, setCodeHeight] = useState('calc(0.7 * (100vh - 178px))')

    const [lan, Setlan] = useState('c_cpp')

    const onResize = (size) => {
        setCodeHeight((size[0] - 35) + 'px')
        // console.log(size)
    }

    return (
            <Layout >
            <Splitter 
                layout="vertical" 
                style={{height: 'calc(100vh - 130px)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}}
                onResize={onResize}
            >
                <Splitter.Panel defaultSize="70%" min="40%" >
                    <div className='M-EditorOptions' style={{width: '100%', position: 'relative'}}>
                        <Select 
                            defaultValue="C++"
                            onChange={(lan) => {
                                if(lan === 'c' || lan === 'cpp'){
                                    Setlan('c_cpp')
                                }else{
                                    Setlan(lan)
                                }
                                // console.log(lan)
                            }}
                            options={supportLan}
                            style={{width: '100px', height: '30px'}}
                        />
                            <Button className='M-Submit' type="primary" style={{position: 'absolute', right: '0', height: '30px', color: "white"}} icon={<FlagFilled />}>提交代码</Button>
                        
                    </div>
                    <AceEditor
                        mode={lan}
                        theme={theme === "dark" ? "solarized_dark" : "solarized_light"}
                        fontSize={17}
                        name="UNIQUE_ID_OF_DIV"
                        onChange={setCode}
                        value={code}
                        setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 4,
                        }}
                        style={{ width: '100%', height: codeHeight }} 
                    />
                </Splitter.Panel>
                <Splitter.Panel defaultSize="30%" collapsible max="30%">
                    <Tabs 
                        defaultActiveKey='std'
                        items={[
                            {
                                key: 'stdin',
                                label: 'stdin',
                                children: <Stdin />
                            },
                            {
                                key: 'stdout',
                                label: 'stdout',
                                children: 'stdout'
                            }
                        ]}
                    />
                </Splitter.Panel>
            </Splitter>
        </Layout>
    );
}

const Stdin = () => {
    return (
        <Layout>
            <TextArea rows={6} autoSize={{ minRows: 5, maxRows: 6 }}/>
            <div style={{position: 'absolute', bottom: 0, width: '100%'}}>
                <Button style={{position: 'absolute', right: 0, width: '100px'}} icon={<CaretRightFilled />}>运行</Button>
            </div>
        </Layout>
    )
}

export default CodeEditor;