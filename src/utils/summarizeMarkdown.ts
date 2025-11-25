import removeMd from "remove-markdown";

const summarizeMarkdown = (md: string): string => {
  const text = removeMd(md);
  const truncatedText = text.length > 60 ? text.slice(0, 200) + "…" : text;
  return truncatedText;
};

export default summarizeMarkdown;
