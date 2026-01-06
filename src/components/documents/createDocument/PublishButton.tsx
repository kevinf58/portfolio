"use client";

import Button from "@/components/ui/Button";
import { useDocumentFormContext } from "@/hooks/useDocumentForm";
import { DOCUMENT_CONTENT_MIN_LENGTH, DOCUMENT_TITLE_MAX_LENGTH, DOCUMENT_TITLE_MIN_LENGTH } from "@/lib/constants";
import createDocument from "@/services/createDocument.Service";
import updateDocument from "@/services/updateDocument.Service";
import uploadImage from "@/services/uploadImage.service";
import { ApiResponse } from "@/types/api/api.type";
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

      if (context.type === DOCUMENT_TYPE.JOURNAL) {
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

        let res: ApiResponse<null> = {
          success: false,
          info: {
            code: 0,
            message: "",
          },
        };

        //TODO: KEEP TRACK OF THE FIELDS THAT THE USER HAS UPDATED FOR THE PATCH REQ
        /**
         * currently I rely on the routing segments to determine whether or not the EditDocument component is editing
         * a document or creating a new document.
         * i need to keep a state of the original document when in editing functionality so that I can make a patch request
         * with only the fields that were mutated from the original document. To do this, I see 3 options: 1) make a get req to
         * the backend with the document's id and type and return the original journal data and continue relying on routing segments
         * to determine whether I'm editing/creating a document. 2) Adding an additional layer of abstraction to my context to hold a type
         * of either edit | create and adding a conditional "original" prop to accomodate original document states for the editing
         * functionality. 3) Constructing the new states in their own pages before passing them as a prop to ManageDocument.tsx to be handled.
         * At that file, it can either be passed to my context, while will require me to create a new wrapper component as one level upwards for
         * ManageDocument.tsx would be the page.tsx level (not ideal), OR to the publish button, in which case, I won't need the context change
         * at all. The first option offers less extra code and can be less expensive, but seems like a temporary fix as route segments should
         * represent routing and, navigation and not state, I will likely need to deal with race conditions if I'm refetching just to make a
         * patch. Option 2 looks to be the more scalable solution that I will most likely end up going with.
         */

        if (context.mode === DOCUMENT_MODE.EDIT) {
          const diff = compare(context.original, context.draft);

          const payload: UploadDocumentPayload = {
            diff,
            identifier: {
              type: context.original.type,
              id: context.original.id,
            },
          };

          if (diff.length === 0) {
            toast.error("Edit the document before submitting");
            return;
          }
          res = await updateDocument(payload);

          if (!res.success) {
            toast.error(res.info.message);
            throw new Error(res.info.code + " " + res.info.message);
          }

          toast.success(res.info.message);
          router.push("/");
        } else {
          const payload: DocumentPayload = context.draft;
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
        const { type, title, date, imageInputPreviewRef, tags, content, imagePreview } = context;
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
          toast.error("Please add an image preview to your project");
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
        console.log(imageResData);
        console.log(imagePreview);

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
