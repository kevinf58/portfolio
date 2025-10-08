// helper func to remove all markdown from a given string
export const stripMarkdown = (markdown: string): string => {
  if (!markdown) return "";

  let text = markdown;

  // code blocks
  text = text.replace(/```[\s\S]*?```/g, "");

  // inline code
  text = text.replace(/`[^`]*`/g, "");

  // images ![alt](url)
  text = text.replace(/!\[.*?\]\(.*?\)/g, "");

  // links [text](url)
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  // headings (# Heading)
  text = text.replace(/^#+\s*(.*)/gm, "$1");

  // bold/italic
  text = text.replace(/(\*\*|__)(.*?)\1/g, "$2"); // bold
  text = text.replace(/(\*|_)(.*?)\1/g, "$2"); // italic

  // blockquotes
  text = text.replace(/^>\s?/gm, "");

  // horizontal rules
  text = text.replace(/^(-{3,}|\*{3,}|_{3,})$/gm, "");

  // unordered list bullets
  text = text.replace(/^\s*[-*+]\s+/gm, "");

  // ordered list numbers
  text = text.replace(/^\s*\d+\.\s+/gm, "");

  // dividers
  text = text.replace(/(\*\*\*|___)(.*?)\1/g, "$2");

  // collapse multiple newlines into one
  text = text.replace(/\n{2,}/g, "\n");

  return text.trim();
};
