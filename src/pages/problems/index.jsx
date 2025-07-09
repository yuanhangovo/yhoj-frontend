import React from 'react';
import { useSelector } from 'react-redux'
import { ConfigProvider, theme, Card, Spin, Space, Layout, Flex } from 'antd'
import { Suspense, lazy } from 'react'
import { useParams } from 'react-router-dom';
import './problems.styl'
import ProblemsHeader from '@/components/problemsHeader';
import CodeEditor from '@/components/codeEditor';
import { createStyles } from 'antd-style';

const { darkAlgorithm, defaultAlgorithm } = theme
const { Content } = Layout

const markdownText = `
## 题目描述  
给定一个整数数组 \`nums\` 和一个目标值 \`target\`，请你在该数组中找出和为目标值的两个整数。

### 输入格式  
- 第一行：\`nums = [2, 7, 11, 15]\`  
- 第二行：\`target = 9\`  

### 示例代码  
\`\`\`python
def twoSum(nums, target):
    hashmap = {}
    for i, num in enumerate(nums):
        if target - num in hashmap:
            return [hashmap[target - num], i]
        hashmap[num] = i
\`\`\`
`

// 炫彩按钮
const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.M-Submit {
      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0
      }
    }
  `,
}));

const Problems = () => {
    const { styles } = useStyle();
    const { problemId } = useParams();
    const MarkdownRenderer = lazy(() => import('@/components/markdownRenderer'))

    // 使用useSelector获取store中的theme    
    const globalTheme = useSelector((state) => state.theme)

    // 在body上添加theme-mode属性，标记当前主题模式（便于实现亮暗模式下的CSS差异化）
    globalTheme.dark
        ? document.body.setAttribute('theme-mode', 'dark')
        : document.body.setAttribute('theme-mode', 'light')

    // Ant Design主题
    let antdTheme = {
        algorithm: globalTheme.dark ? darkAlgorithm : defaultAlgorithm,
    }
    // 应用自定义主题色
    if (globalTheme.colorPrimary) {
        antdTheme.token = {
            colorPrimary: globalTheme.colorPrimary,
        }
    }

    return (
        <ConfigProvider theme={antdTheme} button={{
            className: styles.linearGradientButton,
        }}>
            <Layout className='P-problems G-fullpage'>
                <ProblemsHeader />
                <Layout className='M-main'>
                    <Content style={{ minWidth: 800 }}>
                        <Flex style={{height: 'calc(100vh - 64px)', padding: 10}} gap='small'>
                            <Card className='M-description' 
                                style={{
                                    width: '50%',
                                    overflowY: 'auto',            // 垂直滚动
                                    display: 'flex',
                                    flexDirection: 'column'
                                }} 
                                
                            >
                                <Suspense fallback={<Spin />}>
                                    <MarkdownRenderer content={markdownText} theme={globalTheme.dark ? "dark" : "light"}/>
                                </Suspense>
                            </Card>
                            <Card className='M-coding' 
                                style={{width: '50%'}}
                            >
                                <CodeEditor theme={globalTheme.dark ? "dark" : "light"}/>
                            </Card>
                        </Flex>
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    )
}

export default Problems