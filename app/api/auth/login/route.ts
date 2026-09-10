import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { createSession } from "@/lib/auth";

export async function POST(req:Request){
 try {
  const {email,password}=await req.json();
  if(!email||!password) return NextResponse.json({error:"Email and password are required"},{status:400});
  await connectDB(); const admin=await Admin.findOne({email:email.toLowerCase().trim()});
  if(!admin || !(await bcrypt.compare(password,admin.passwordHash))) return NextResponse.json({error:"Invalid credentials (Did you run seed-admin?)"},{status:401});
  await createSession(admin.email); return NextResponse.json({ok:true});
 } catch (err: any) {
  return NextResponse.json({error: "Database error: " + err.message},{status:500});
 }
}
