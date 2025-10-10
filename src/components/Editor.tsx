"use client";

import { Crepe } from "@milkdown/crepe";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { EditorProps } from "@/types/components/Editor.type";
import "@milkdown/crepe/theme/common/style.css";

const CrepeEditor = (props: EditorProps) => {
  useEditor((root) => {
    const crepe = new Crepe({ root, defaultValue: "# \n\n***\n" });

    // listen for updates in crepe to invoke setMarkdown and send it back up the tree
    crepe.on((listener) => {
      listener.updated(() => {
        if (crepe) {
          const markdown = crepe.getMarkdown();

          props.setMarkdown(markdown);
        }
      });
    });

    return crepe;
  }, []);

  return <Milkdown />;
};

const Editor = (props: EditorProps) => {
  return (
    <MilkdownProvider>
      <CrepeEditor setMarkdown={props.setMarkdown} />
    </MilkdownProvider>
  );
};

export default Editor;
