import { ApiResponse } from "@/types/api/Api.type";
import { DocumentFormContextValue } from "@/types/Document.type";
import { getImagePreviewLink } from "@/utils/getImagePreviewLink";

const createDocument = async <T>(props: DocumentFormContextValue): Promise<ApiResponse<T>> => {
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

  return { ok: res.ok, status: res.status, data };
};

export default createDocument;
