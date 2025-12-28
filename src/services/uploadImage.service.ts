"use server";

import apiRequest from "@/app/api/apiRequest";
import { ApiResponse } from "@/types/api/api.type";

export const uploadImage = async (payload: File): Promise<ApiResponse<string>> => {
  // generate a unique file name
  const fileExt = payload.name.split(".").pop();
  const uniqueID = crypto.randomUUID();
  const uniqueName = `${uniqueID}.${fileExt}`;

  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;
  const token = process.env.GITHUB_TOKEN!;
  const path = `images/${uniqueName}`;
  const endpoint = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  const content = await payload.arrayBuffer();
  const base64 = Buffer.from(content).toString("base64");

  const res = await apiRequest<string>(endpoint, {
    method: "PUT",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Upload ${payload.name}`,
      content: base64,
    }),
  });

  if (!res.success || !res.data) {
    return res;
  }

  return {
    success: true,
    data: endpoint,
    info: {
      code: 200,
      message: "Image uploaded successfully",
    },
  };
};
