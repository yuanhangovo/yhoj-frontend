import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Typography, Divider } from "antd";
import { solarizedlight, solarizedDarkAtom } from 'react-syntax-highlighter/dist/esm/styles/prism';

const { Title, Text, Paragraph, Link } = Typography;

const MarkdownRenderer = ({ content, theme }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]} // 支持表格、任务列表等
      components={{
        // 替换标题 h1-h6
        h1: ({ node, ...props }) => <Title level={1} {...props} />,
        h2: ({ node, ...props }) => <Title level={2} {...props} />,
        h3: ({ node, ...props }) => <Title level={3} {...props} />,
        h4: ({ node, ...props }) => <Title level={4} {...props} />,
        h5: ({ node, ...props }) => <Title level={5} {...props} />,
        
        // 替换段落
        p: ({ node, ...props }) => <Paragraph {...props} />,
        
        // 替换内联文本
        span: ({ node, ...props }) => <Text {...props} />,
        
        // 替换链接
        a: ({ node, ...props }) => <Link {...props} target="_blank" />,
        
        // 替换代码块
        code({ node, className, children, ...props }) {
          // 手动区分逻辑
          const hasLang = /language-(\w+)/.test(className || '');
          
          if (!hasLang) {
            // 处理内联代码（单反引号）
            return <Text code {...props}>{children}</Text>;
          }
          
          // 处理代码块（三反引号 + 语言标识）
          const language = className.replace('language-', '');
          return (
            <SyntaxHighlighter
              language={language}
              style={theme === "dark" ? solarizedDarkAtom : solarizedlight}
              showLineNumbers
              PreTag="div"
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          );
        },
        
        // 替换分割线
        hr: ({ node, ...props }) => <Divider {...props} />,
        
        // 替换列表
        ul: ({ node, depth, ordered, ...props }) => (
          <ul style={{ marginBottom: 16 }} {...props} />
        ),
        ol: ({ node, depth, ordered, ...props }) => (
          <ol style={{ marginBottom: 16 }} {...props} />
        ),
        li: ({ node, index, ordered, ...props }) => (
          <li style={{ marginLeft: ordered ? 0 : 16 }} {...props} />
        ),
        
        // 替换表格（需要 remark-gfm）
        table: ({ node, ...props }) => (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%' }} {...props} />
          </div>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );

};

export default MarkdownRenderer