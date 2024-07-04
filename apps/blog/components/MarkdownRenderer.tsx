import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import MarkDownSyntaxHighlighter from "./MarkDownSyntaxHighlighter.client";

interface Props {
  markdownStr: string;
}

export default function MarkdownRenderer({ markdownStr }: Props) {
  const alignRegex = /align="(.*?)"/g;

  const replaced = markdownStr.replace(alignRegex, "");

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1({ children }) {
          return (
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-12">
              {children}
            </h1>
          );
        },
        h2({ children }) {
          return (
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 my-10">
              {children}
            </h2>
          );
        },
        h3({ children }) {
          return (
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight my-8">
              {children}
            </h3>
          );
        },
        h4({ children }) {
          return (
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight my-6">
              {children}
            </h4>
          );
        },
        span({ children }) {
          return <span>{children}</span>;
        },
        p({ children }) {
          return (
            <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
          );
        },
        em({ children }) {
          return (
            <em className="!text-12 block p-4 w-full text-center">
              {children}
            </em>
          );
        },
        blockquote({ children }) {
          return (
            <blockquote className="mt-6 border-l-2 pl-6 italic">
              {children}
            </blockquote>
          );
        },
        a({ children }) {
          return <a>{children}</a>;
        },
        ul({ children }) {
          return (
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
          );
        },
        ol({ children }) {
          return (
            <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
          );
        },
        code({ inline, className, children }) {
          const match = /language-(\w+)/.exec(className || "");

          if (inline) {
            return (
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                {children}
              </code>
            );
          }

          if (match) {
            return (
              <MarkDownSyntaxHighlighter language={match[1] as string}>
                {children}
              </MarkDownSyntaxHighlighter>
            );
          }

          return (
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              {children}
            </code>
          );
        },
      }}
    >
      {replaced}
    </ReactMarkdown>
  );
}
