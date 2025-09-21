import { Dispatch, SetStateAction } from "react";

export type EditorProps = { setMarkdown: Dispatch<SetStateAction<string>> };

export type MarkdownViewerProps = { markdown: string };
