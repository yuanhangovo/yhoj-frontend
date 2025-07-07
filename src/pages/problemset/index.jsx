import { Card, List, Tag, Space } from 'antd'
import PageHeaderWrapper from '@/components/pageHeaderWrapper'
import { Link } from 'react-router-dom';
import './problemset.styl'

// 模拟题目数据
const problems = [
  {
    id: '1',
    title: '两数之和',
    difficulty: '简单',
  },
  {
    id: '2',
    title: '反转链表',
    difficulty: '中等',
  },
  {
    id: '3',
    title: '最长回文子串',
    difficulty: '困难',
  },
  {
    id: '4',
    title: '合并两个有序数组',
    difficulty: '简单',
  },
  {
    id: '5',
    title: '二叉树的层序遍历',
    difficulty: '中等',
  },
];

// 根据难度返回对应的颜色
const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case '简单':
      return 'green';
    case '中等':
      return 'orange';
    case '困难':
      return 'red';
    default:
      return 'blue';
  }
};
function Problemset() {
    return (
        <>
          <PageHeaderWrapper title="题目列表" subtitle="" />
          <section className="G-main P-users">
              <Card>
                  <List
                      itemLayout="horizontal"
                      dataSource={problems}
                      renderItem={(item) => (
                      <List.Item
                          actions={[
                          <Tag color={getDifficultyColor(item.difficulty)}>
                              {item.difficulty}
                          </Tag>,
                          ]}
                      >
                          <List.Item.Meta
                          title={
                              <Link to={`/problems/${item.id}`}>
                              {item.title}
                              </Link>
                          }
                          />
                      </List.Item>
                      )}
                  />
              </Card>
          </section>
        </>
    )
}

export default Problemset