import { getHighlighter, type BundledLanguage, type BundledTheme } from "shiki";

interface HighlightedCodeProps {
  language: BundledLanguage;
  snippet: string;
}

export async function HighlightedCode({
  language,
  snippet,
}: HighlightedCodeProps) {
  const highlighter = await getHighlighter({
    themes: ["github-dark"],
    langs: [language],
  });
  const html = highlighter.codeToHtml(snippet, {
    lang: language,
    theme: "github-dark",
  });
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
