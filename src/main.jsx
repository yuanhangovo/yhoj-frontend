import ReactDOM from 'react-dom/client'
import Routers from '@/router'
// 全局样式
import '@/common/styles/frame.styl'
import { ConfigProvider } from 'antd'
import { store } from '@/store'
import { Provider } from 'react-redux'
// 引入Ant Design中文语言包
import zhCN from 'antd/locale/zh_CN'
// 引入Ant Design兼容包兼容React19
import '@ant-design/v5-patch-for-react-19'
// mock.js模拟数据
// import './mock'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <Routers />
        </ConfigProvider>
    </Provider>
)