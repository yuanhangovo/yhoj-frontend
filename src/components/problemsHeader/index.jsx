import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setDark } from '@/store/slices/theme'
import { Button, Card, Dropdown, Modal, Drawer } from 'antd'
import {
    ExportOutlined,
    CaretDownOutlined,
    SunOutlined,
    MoonOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons'
import { globalConfig } from '@/globalConfig'
import { useNavigate } from 'react-router-dom'
import logoImg from '@/common/images/logo.svg'
import './problemsHeader.styl'

function ProblemsHeader(props) {
    // 获取redux派发钩子
    const dispatch = useDispatch()

    // 路由hook
    const navigate = useNavigate()

    // 主题配置
    const theme = useSelector((state) => state.theme)

    // Antd的Modal组件API
    const [modal, contextHolder] = Modal.useModal()
    
    // 退出登录
    const logout = () => {
        modal.confirm({
            title: '确定要退出系统么？',
            okText: '退出',
            onOk: () => {
                // 清空localStorage
                window.localStorage.removeItem(globalConfig.SESSION_LOGIN_INFO)
                // 跳转至路径地址/login
                navigate('/login')
            },
        })
    }

    const loginInfo = JSON.parse(
        window.localStorage.getItem(globalConfig.SESSION_LOGIN_INFO)
    )

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    const menuItemsUnlogin = [
        {
            label: '登录',
            key: 'loginIn',
            style: {
                'padding-left': 20,
                width: 80,
                height: 40
            },
            onClick: () => {
                navigate('/login')
            },
        },
    ]

    const menuItems = [
        {
            label: '退出登录',
            key: 'exit',
            icon: <ExportOutlined />,
            onClick: logout,
        },
    ]

    return (
        <>
        <Card className="M-header" bordered={false}>
            <div className="header-wrapper">
                <div className="logo-con">
                    <img src={logoImg} alt="" onClick={() => {
                        navigate('/home')
                    }} style={{'cursor': 'pointer'}}/>
                </div>
                <div className='header-list'>
                    <Button 
                        icon={<UnorderedListOutlined />}
                        type='text'
                        onClick={() => setOpen(true)}
                    >题目列表</Button>
                </div>
                <div className="header-con">
                    {theme.dark ? (
                        <Button
                            icon={<SunOutlined />}
                            shape="circle"
                            onClick={() => {
                                dispatch(setDark(false))
                            }}
                        ></Button>
                    ) : (
                        <Button
                            icon={<MoonOutlined />}
                            shape="circle"
                            onClick={() => {
                                dispatch(setDark(true))
                            }}
                        ></Button>
                    )}

                    <Dropdown menu={{ items: loginInfo ? menuItems : menuItemsUnlogin }}>
                        <div className="user-menu">
                            <span>
                                {loginInfo ? loginInfo.nickname : '未登录'}
                            </span>
                            <CaretDownOutlined className="arrow" />
                        </div>
                    </Dropdown>
                </div>
            </div>
            {contextHolder}
        </Card>
        <Drawer 
            closable
            destroyOnHidden
            title="题目列表"
            placement='left'
            open={open}

            onClose={() => setOpen(false)}
        >

        </Drawer>
        </>
    )
}

export default ProblemsHeader