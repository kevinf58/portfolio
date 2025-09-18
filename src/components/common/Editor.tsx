"use client";

import { Crepe } from "@milkdown/crepe";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";

import "@milkdown/crepe/theme/common/style.css";

const CrepeEditor: React.FC = () => {
  useEditor((root) => {
    const crepe = new Crepe({
      root,
    });
    return crepe;
  }, []);

  return <Milkdown />;
};

const Editor: React.FC = () => {
  return (
    <MilkdownProvider>
      <CrepeEditor />
    </MilkdownProvider>
  );
};

export default Editor;
