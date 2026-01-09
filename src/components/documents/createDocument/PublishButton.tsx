"use client";

import Button from "@/components/ui/Button";
import { useDocumentFormContext } from "@/hooks/useDocumentForm";
import { DOCUMENT_CONTENT_MIN_LENGTH, DOCUMENT_TITLE_MAX_LENGTH, DOCUMENT_TITLE_MIN_LENGTH } from "@/lib/constants";
import createDocument from "@/services/createDocument.service";
import updateDocument from "@/services/updateDocument.Service";
import uploadImage from "@/services/uploadImage.service";
import { ApiResponse } from "@/types/api/Api.type";
import { UploadDocumentPayload } from "@/types/api/UploadDocumentPayload.type";
import { DocumentPayload, DOCUMENT_TYPE } from "@/types/Document.type";
import { DOCUMENT_MODE } from "@/types/DocumentForm.type";
import { compare } from "fast-json-patch";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdSend } from "react-icons/md";
import { toast } from "react-toastify";

//TODO: CONSIDER MAKING THE IMAGE PREVIEW UPLOAD IN THE BACKEND SO THAT IT DOESN'T UPLOAD FIRST, AND THEN HAVE THE BACKEND RETURN AN ERROR
const PublishButton = () => {
  const [loading, setLoading] = useState(false);

  const context = useDocumentFormContext();

  const router = useRouter();

  const publishDocument = async () => {
    try {
      setLoading(true);

      let message: string = "";

      // client side error handling
      if (context.title.length < DOCUMENT_TITLE_MIN_LENGTH) {
        message = "Title too short";
      } else if (context.title.length > DOCUMENT_TITLE_MAX_LENGTH) {
        message = "Title too long";
      } else if (context.content.length < DOCUMENT_CONTENT_MIN_LENGTH) {
        message = `Please add sufficient content to make this a ${context.type}`;
      }
      if (message) {
        toast.error(message);
        throw new Error(message);
      }

      // image handling
      let imageResData: string = "";
      if (context.type === DOCUMENT_TYPE.PROJECT) {
        const input = context.imageInputPreviewRef.current;

        if (!context.imagePreview) {
          toast.error("Please add an image preview to your project");
          throw new Error("Please add an image preview to your project");
        }
        if (input && input.files && input?.files?.length) {
          const file = input?.files[0];
          const imageRes = await uploadImage(file);

          if (!imageRes.success) {
            toast.error(imageRes.info.message);
            throw new Error(imageRes.info.code + " " + imageRes.info.message);
          }

          imageResData = imageRes.data;
        }
      }

      let res: ApiResponse<null> = {
        success: false,
        info: {
          code: 0,
          message: "",
        },
      };
      if (context.mode === DOCUMENT_MODE.EDIT) {
        const diff = compare(context.original, context.draft);
        for (const op of diff) {
          if (op.op === "replace" && op.path === "/imagePreview") {
            op.value = imageResData;
          }
        }

        const payload: UploadDocumentPayload = {
          diff,
          identifier: {
            type: context.original.type,
            id: context.original.id,
          },
        };

        if (diff.length === 0) {
          toast.error("Edit the document before submitting");
          throw new Error("Edit the document before submitting");
        }
        res = await updateDocument(payload);
      } else if (context.mode === DOCUMENT_MODE.CREATE) {
        const payload: DocumentPayload = {
          ...context.draft,
          ...(context.type === DOCUMENT_TYPE.PROJECT && { imagePreview: imageResData }),
        };
        res = await createDocument(payload);
      }

      if (!res.success) {
        toast.error(res.info.message);
        throw new Error(res.info.code + " " + res.info.message);
      }

      toast.success(res.info.message);
      router.push("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={publishDocument} loading={loading}>
      <MdSend size={18} />
      <span>Publish</span>
    </Button>
  );
};

export default PublishButton;
