"use client";

import { Crepe } from "@milkdown/crepe";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import "@milkdown/crepe/theme/common/style.css";
import uploadImage from "@/services/uploadImage.service";
import { imageBlockConfig } from "@milkdown/kit/component/image-block";
import { useDocumentFormContext } from "@/hooks/useDocumentForm";
import { toast } from "react-toastify";
import { MAX_IMAGE_SIZE } from "@/lib/constants";
import { useEffect, useRef } from "react";
import { replaceAll } from "@milkdown/kit/utils";

const CrepeEditor = () => {
  const { content, setContent } = useDocumentFormContext();
  const crepeRef = useRef<Crepe | null>(null);

  useEditor((root) => {
    const crepe = new Crepe({ root });
    crepeRef.current = crepe;

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
            // client side error handling
            if (!file.type.startsWith("image/")) {
              toast.error("Only image files are allowed");
              throw new Error("Only image files are allowed");
            } else if (file.size > MAX_IMAGE_SIZE) {
              toast.error(`The image size of '${file.name}' exceeds the 2MB limit`);
              throw new Error(`The image size of '${file.name}' exceeds the 2MB limit`);
            }

            const res = await uploadImage(file);

            if (!res.success) {
              toast.error(res.info.message);
              throw new Error(res.info.code + " " + res.info.message);
            }

            toast.success(res.info.message);
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

  // bind crepe editor contents to the state value of content
  useEffect(() => {
    if (crepeRef.current && content !== crepeRef.current.getMarkdown()) {
      crepeRef.current.editor.action(replaceAll(content));
    }
  }, [content]);

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
