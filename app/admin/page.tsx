import { redirect } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import { getSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Content from "@/models/Content";
import AdminProductManager from "@/components/AdminProductManager";

export const dynamic="force-dynamic";

export default async function Admin(){
 if(!(await getSession())) redirect("/admin/login");
 await connectDB();
 const pc=await Product.countDocuments(); const cc=await Content.countDocuments(); const pub=await Product.countDocuments({published:true}); const drafts=await Product.countDocuments({published:false});
 return <AdminShell><div className="stats"><div className="stat"><small>Products</small><b>{pc}</b></div><div className="stat"><small>Published</small><b>{pub}</b></div><div className="stat"><small>Drafts</small><b>{drafts}</b></div><div className="stat"><small>Content</small><b>{cc}</b></div></div><br/><AdminProductManager/></AdminShell>;
}
