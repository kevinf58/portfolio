"use client";

import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { Crepe } from "@milkdown/crepe";
import "@milkdown/crepe/theme/common/style.css";

// read only crepe editor component to be used to display markdown
const ReadOnlyCrepeEditor = ({ markdown }: { markdown: string }) => {
  useEditor(
    (root) => {
      const crepe = new Crepe({ root, defaultValue: markdown });
      crepe.setReadonly(true);
      return crepe;
    },
    [markdown]
  );
  return <Milkdown />;
};

const ReadOnlyCrepe = ({ markdown }: { markdown: string }) => {
  return (
    <MilkdownProvider>
      <ReadOnlyCrepeEditor markdown={markdown} />
    </MilkdownProvider>
  );
};

export default ReadOnlyCrepe;
