import { authOptions } from "@/auth";
import { MAX_IMAGE_SIZE } from "@/lib/constants";
import { ApiResponse } from "@/types/api/api.type";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    const session = getServerSession(authOptions);

    // auth check
    if (!session) {
      return NextResponse.json({ success: false, info: { code: 401, message: "Unauthorized" } });
    }

    // error handling
    if (!file) {
      return NextResponse.json<ApiResponse<null>>({ success: false, info: { code: 400, message: "No file provided" } });
    } else if (!file.type.startsWith("image/")) {
      return NextResponse.json<ApiResponse<null>>({ success: false, info: { code: 400, message: "Only image files are allowed" } });
    } else if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json<ApiResponse<null>>({
        success: false,
        info: { code: 400, message: `The image size of '${file.name}' exceeds the 2MB limit` },
      });
    }

    // renaming file to a UUID
    const fileExtension = file.name.split(".").pop();
    const uuid = crypto.randomUUID();
    const uniqueFileName = `${uuid}.${fileExtension}`;

    // constructing git repo API endpoint
    const owner = process.env.GITHUB_OWNER!;
    const repo = process.env.GITHUB_REPO!;
    const token = process.env.GITHUB_TOKEN!;
    const path = `images/${uniqueFileName}`;
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    const content = await file.arrayBuffer();
    const imageData = Buffer.from(content).toString("base64");

    // uploading to git repo
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Uploading ${file.name} to remote repo`,
        content: imageData,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ success: false, info: { code: 401, message: "Failed to upload image" } });
    }

    const data = await res.json();
    const dataURL = data.content?.download_url;
    return NextResponse.json({ success: true, data: dataURL, info: { code: 201, message: "Image upload successful" } });
  } catch (err) {
    console.log(err);
    return NextResponse.json<ApiResponse<null>>({ success: false, info: { code: 500, message: "Server failure. Please try again later" } });
  }
}
