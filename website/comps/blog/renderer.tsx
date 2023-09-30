import ReactMarkdown from 'react-markdown';
import CodeBlock from './codeBlock';

export default function PostMarkdownRenderer(props:any) {
    return (
        <ReactMarkdown
            components={{
                code: CodeBlock,
            }}
            >
            {props.markdown}
        </ReactMarkdown>
    )
}