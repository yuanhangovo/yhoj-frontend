import { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { apiReqs } from '@/api'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'antd'
import { KeyOutlined, UserOutlined } from '@ant-design/icons'
import imgLogo from '@/common/images/logo.svg'
import imgCover from './cover.png'
import './login.styl'

function Login() {
    // 创建路由hook
    const navigate = useNavigate()

    // 登录按钮loading状态
    const [loading, setLoading] = useState(false)

    // 提交登录
    const loginSubmit = (values) => {
        setLoading(true)

        let data = {
            account: values.account,
            password: values.password,
        }

        apiReqs.signIn({
            data,
            success: (res) => {
                console.log(res)
                navigate('/home')
            },
            fail: (res) => {
                Modal.error({
                    title: res.message,
                    // 点击OK按钮后，直接跳转至登录界面
                    onOk: () => {
                        setLoading(false)
                    },
                })
            }
        })
    }

    return (
        <div className="P-login">
            <div className="login-con">
                <div className="cover-con">
                    <img src={imgCover} alt="" className="img-cover" />
                </div>
                <div className="pannel-con">
                    <img src={imgLogo} alt="" className="img-logo" />
                    <h3>YHOJ - Welcome!</h3>
                    <p className="subtext">请登录您的账号</p>
                    <Form onFinish={loginSubmit}>
                        <Form.Item
                            name="account"
                            rules={[
                                { required: true, message: '请输入您的账号' },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder="请输入账号"
                                prefix={<UserOutlined />}
                                autoComplete="account"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的密码',
                                },
                            ]}
                        >
                            <Input.Password
                                size="large"
                                placeholder="请输入密码"
                                prefix={<KeyOutlined />}
                                autoComplete="password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                block={true}
                                loading={loading}
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login