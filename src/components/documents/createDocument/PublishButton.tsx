"use client";

import Button from "@/components/ui/Button";
import { useDocumentFormContext } from "@/hooks/useDocumentForm";
import { DOCUMENT_CONTENT_MIN_LENGTH, DOCUMENT_TITLE_MAX_LENGTH, DOCUMENT_TITLE_MIN_LENGTH } from "@/lib/constants";
import createDocument from "@/services/createDocument.Service";
import updateDocument from "@/services/updateDocument.Service";
import uploadImage from "@/services/uploadImage.service";
import { ApiResponse } from "@/types/api/api.type";
import { DocumentPayload, DOCUMENT_TYPE } from "@/types/Document.type";
import { getLocalDate } from "@/utils/dateUtils";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { MdSend } from "react-icons/md";
import { toast } from "react-toastify";

//TODO: CONSIDER MAKING THE IMAGE PREVIEW UPLOAD IN THE BACKEND SO THAT IT DOESN'T UPLOAD FIRST, AND THEN HAVE THE BACKEND RETURN AN ERROR
const PublishButton = () => {
  const [loading, setLoading] = useState(false);

  const context = useDocumentFormContext();

  const router = useRouter();

  // the same form is used for editing and document creation functionality. One makes a post req, the other makes a patch req
  // the url path is used to distinguish between the functionalities
  const pathName = usePathname();
  const segments = pathName.split("/").filter(Boolean);
  const isEditing = !!segments[2];

  const publishDocument = async () => {
    try {
      setLoading(true);

      if (context.type === DOCUMENT_TYPE.JOURNAL) {
        const { type, title, date, category, tags, content } = context;
        let message: string = "";

        // client side error handling
        if (title.length < DOCUMENT_TITLE_MIN_LENGTH) {
          message = "Title too short";
        } else if (title.length > DOCUMENT_TITLE_MAX_LENGTH) {
          message = "Title too long";
        } else if (content.length < DOCUMENT_CONTENT_MIN_LENGTH) {
          message = `Please add sufficient content to make this a ${type}`;
        }
        if (message) {
          toast.error(message);
          throw new Error(message);
        }

        let res: ApiResponse<null> = {
          success: false,
          info: {
            code: 0,
            message: "",
          },
        };

        //TODO: KEEP TRACK OF THE FIELDS THAT THE USER HAS UPDATED FOR THE PATCH REQ
        if (isEditing) {
          const payload: DocumentPayload = { type, title, createdAt: date, updatedAt: getLocalDate(), category, tags, content };
          res = await updateDocument(payload);
        } else {
          const payload: DocumentPayload = { type, title, createdAt: date, updatedAt: date, category, tags, content };
          res = await createDocument(payload);
        }

        if (!res.success) {
          toast.error(res.info.message);
          throw new Error(res.info.code + " " + res.info.message);
        }

        toast.success(res.info.message);
        router.push("/");

        return res.data;
      } else if (context.type === DOCUMENT_TYPE.PROJECT) {
        const { type, title, date, imageInputPreviewRef, tags, content } = context;
        let message: string = "";

        // client side error handling
        if (title.length < DOCUMENT_TITLE_MIN_LENGTH) {
          message = "Title too short";
        } else if (title.length > DOCUMENT_TITLE_MAX_LENGTH) {
          message = "Title too long";
        } else if (content.length < DOCUMENT_CONTENT_MIN_LENGTH) {
          message = `Please add sufficient content to make this a ${type}`;
        }
        if (message) {
          toast.error(message);
          throw new Error(message);
        }

        const input = imageInputPreviewRef.current;

        // image error handling
        if (!input || !input.files || !input?.files?.length) {
          throw new Error("Please add an image preview to your project");
        }

        // handling errors for uploadImage don't have to be done as they are already handled in imagePreviewInput itself
        const file = input?.files[0];
        const imageRes = await uploadImage(file);

        if (!imageRes.success) {
          toast.error(imageRes.info.message);
          throw new Error(imageRes.info.code + " " + imageRes.info.message);
        }

        const imageResData = imageRes.data;

        const payload: DocumentPayload = { type, title, createdAt: date, updatedAt: date, imagePreview: imageResData, tags, content };
        const res = await createDocument(payload);

        if (!res.success) {
          toast.error(res.info.message);
          throw new Error(res.info.code + " " + res.info.message);
        }

        toast.success(res.info.message);
        router.push("/");

        return res.data;
      }
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
