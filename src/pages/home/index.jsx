import { Card } from 'antd'
import PageHeaderWrapper from '@/components/pageHeaderWrapper'
import './home.styl'

function Home() {
    return (
        <>
            <PageHeaderWrapper title="首页" subtitle="" />
            <section className="G-main P-home">
                <Card title="欢迎来到YHOJ">
                    <p>
                        YHOJ是一个开源的OJ（Online Judge）系统，旨在为用户提供一个友好、高效的在线编程环境。本系统已在github上开源，欢迎到github上查看和参与贡献。
                    </p>
                </Card>
            </section>
        </>
    )
}

export default Home