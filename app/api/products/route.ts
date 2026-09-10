import {NextResponse} from "next/server";
import {connectDB} from "@/lib/db"; import Product from "@/models/Product"; import {requireAdmin} from "@/lib/auth"; import {slugify} from "@/lib/content";

export async function GET(){await connectDB();const p=await Product.find({}).sort({createdAt:-1}).lean();return NextResponse.json(p);}
export async function POST(req:Request){try{await requireAdmin();await connectDB();const b=await req.json();if(!b.name)return NextResponse.json({error:"Name required"},{status:400});const slug=slugify(b.name)+"-"+Date.now().toString(36);const p=await Product.create({...b,slug});return NextResponse.json(p,{status:201});}catch(e:any){return NextResponse.json({error:e.message==="UNAUTHORIZED"?"Unauthorized":"Server error"},{status:e.message==="UNAUTHORIZED"?401:500});}}
