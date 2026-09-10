import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Collection from "@/models/Collection";
import { requireAdmin } from "@/lib/auth";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    await connectDB();
    const { id } = await params;
    await Collection.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
