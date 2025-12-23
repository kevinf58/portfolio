import { ApiResponse } from "@/types/api/Api.type";
import { Journal, Project } from "@/types/Document.type";

const deleteDocument = async (props: Journal | Project): Promise<ApiResponse<null>> => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${apiURL}/${props.type}/${props.id}`, {
      method: "DELETE",
    });

    try {
      await res.json();
    } catch {}

    if (!res.ok) {
      return {
        ok: res.ok,
        status: res.status,
        error: "Failed to delete journal",
      };
    }

    return {
      ok: res.ok,
      status: res.status,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      error: "Network error. Please try again.",
    };
  }
};

export default deleteDocument;
