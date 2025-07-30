import { use, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { apiReqs } from '@/api'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'antd'
import { KeyOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import imgLogo from '@/common/images/logo.svg'
import './signup.styl'

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

function SignUp() {
    // 创建路由hook
    const navigate = useNavigate()

    // 登录按钮loading状态
    const [loading, setLoading] = useState(false)

    // 提交注册
    const loginSubmit = (values) => {
        setLoading(true)

        let data = {
            username: values.username,
            email: values.account,
            password: values.password,
        }

        apiReqs.signUp({
            data,
            success: (res) => {
                console.log(res)
                Modal.success({
                    title: '注册成功',
                    content: '请登录您的账号',
                    onOk: () => {
                        setLoading(false)
                        navigate('/login')
                    }
                })
            },
            fail: (res) => {
                Modal.error({
                    title: res.message,
                    // 点击OK按钮后，直接跳转至注册界面
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

                <div className="pannel-con">
                    <div className='title-con'>
                        <img src={imgLogo} alt="" className="img-logo" />
                        <p className="title">请注册您的账号</p>
                    </div>
                    <Form 
                        onFinish={loginSubmit}
                        validateMessages={validateMessages}
                        className="form-con"
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入您的昵称' }]}
                        >
                            <Input
                                size="large"
                                placeholder="请输入昵称"
                                prefix={<UserOutlined />}
                                autoComplete="username"
                            />
                        </Form.Item>
                        <Form.Item
                            name="account"
                            rules={[
                                { required: true, message: '请输入您的邮箱' },
                                { type: 'email', message: '请输入正确的邮箱格式' },
                                { min: 5, message: '邮箱长度不能少于5位' },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder="请输入邮箱"
                                prefix={<MailOutlined />}
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
                                { min: 8, message: '密码长度不能少于8位' },
                                { max: 20, message: '密码长度不能超过20位' },
                                { pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[_+=-])[A-Za-z\d_+=-]{8,20}$/, message: '密码必须包含至少一个字母，一个数字和一个特殊字符（_, +, =, -）' },
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

export default SignUp