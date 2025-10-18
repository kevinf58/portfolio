import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // generate a unique file name
  const fileExt = file.name.split(".").pop();
  const uniqueID = crypto.randomUUID();
  const uniqueName = `${uniqueID}.${fileExt}`;

  const owner = process.env.GITHUB_OWNER!;
  const repo = process.env.GITHUB_REPO!;
  const token = process.env.GITHUB_TOKEN!;
  const path = `images/${uniqueName}`;

  const content = await file.arrayBuffer();
  const base64 = Buffer.from(content).toString("base64");

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Upload ${file.name}`,
      content: base64,
    }),
  });

  const data = await res.json();

  if (res.ok) {
    const url = data.content?.download_url || `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`;
    return NextResponse.json({ url });
  } else {
    return NextResponse.json({ error: data }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json("This endpoint is healthy!");
}
