import { ApiResponse } from "@/types/api/Api.type";
import { DocumentFormContextValue } from "@/types/Document.type";
import { getImagePreviewLink } from "@/utils/getImagePreviewLink";

const createDocument = async <T>(props: DocumentFormContextValue): Promise<ApiResponse<T>> => {
  try {
    const { fileInputRef, documentType, markdown, title, tags, date, category } = props;

    const imagePreviewLink = await getImagePreviewLink(fileInputRef);

    const res = await fetch(`/api/${documentType}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        markdown,
        title,
        tags,
        date,
        type: documentType,
        ...(imagePreviewLink && { imagePreviewLink }),
        ...(category && { category }),
      }),
    });

    const data: T = await res.json();

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: "Failed to create document",
      };
    }

    return {
      ok: true,
      status: res.status,
      data: data,
    };
  } catch (err) {
    console.error("createDocument error:", err);
    return {
      ok: false,
      status: 0,
      error: "Network error. Please try again.",
    };
  }
};

export default createDocument;
