"use client";

import Button from "@/components/ui/Button";

import { useDocumentFormContext } from "@/hooks/useDocumentForm";

import { DOCUMENT_TYPE } from "@/types/Document.type";

const TempButton = () => {
  const context = useDocumentFormContext();

  if (context.type === DOCUMENT_TYPE.JOURNAL)
    return (
      <Button
        onClick={() =>
          console.log(
            context.type +
              "\n" +
              context.title +
              "\n" +
              context.date +
              "\n" +
              context.category +
              "\n" +
              context.tags +
              "\n" +
              context.content
          )
        }
      >
        Log Journal Contents
      </Button>
    );
  else if (context.type === DOCUMENT_TYPE.PROJECT)
    return <Button onClick={() => console.log(context.imagePreview) + "\n" + context.content}>Log Project Contents</Button>;
};

export default TempButton;
