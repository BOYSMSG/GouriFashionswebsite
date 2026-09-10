import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const imgbbFormData = new FormData();
    imgbbFormData.append("image", file);

    const res = await fetch("https://api.imgbb.com/1/upload?key=3d8883a98c5382710eb649366f4a3189", {
      method: "POST",
      body: imgbbFormData,
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.error?.message || "Failed to upload to ImgBB");
    
    return NextResponse.json({ url: data.data.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
