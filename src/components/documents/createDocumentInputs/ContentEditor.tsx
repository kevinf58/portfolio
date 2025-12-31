"use client";

import { Crepe } from "@milkdown/crepe";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import "@milkdown/crepe/theme/common/style.css";
import uploadImage from "@/services/uploadImage.service";
import { imageBlockConfig } from "@milkdown/kit/component/image-block";
import { useDocumentFormContext } from "@/hooks/useDocumentForm";
import { toast } from "react-toastify";

const CrepeEditor = () => {
  const { setContent } = useDocumentFormContext();

  useEditor((root) => {
    const crepe = new Crepe({ root });

    // listen for updates in crepe to invoke setMarkdown and send it back up the tree
    crepe.on((listener) => {
      listener.updated(() => {
        if (crepe) {
          const markdown = crepe.getMarkdown();

          setContent(markdown);
        }
      });

      listener.mounted(() => {
        crepe.editor.ctx.update(imageBlockConfig.key, (defaultConfig) => ({
          ...defaultConfig,
          onUpload: async (file: File) => {
            const res = await uploadImage(file);

            if (!res.success) {
              toast.error(res.info.message);
              throw new Error(res.info.code + " " + res.info.message);
            }

            toast.success("Image upload successful");
            return res.data;
          },
        }));
      });

      listener.updated(() => {
        const markdown = crepe.getMarkdown();
        setContent(markdown);
      });
    });

    return crepe;
  }, []);

  return <Milkdown />;
};

const ContentEditor = () => {
  return (
    <div className="rounded-sm cursor-text px-4 py-3 input-base">
      <MilkdownProvider>
        <CrepeEditor />
      </MilkdownProvider>
    </div>
  );
};

export default ContentEditor;
