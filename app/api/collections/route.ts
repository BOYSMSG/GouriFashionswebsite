import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Collection from "@/models/Collection";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const items = await Collection.find().sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    await connectDB();
    const data = await req.json();
    if (!data.slug) data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const item = await Collection.create(data);
    return NextResponse.json(item);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
