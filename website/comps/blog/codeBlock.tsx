export default function CodeBlock({ language, value }:any) {
    return (
        <div className="mockup-code">
            {/* <SyntaxHighlighter language={language}>
                {value}
            </SyntaxHighlighter> */}
            {value}
        </div>
    )
}