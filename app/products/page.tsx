import Nav from "@/components/Nav";
import ProductCard from "@/components/ProductCard";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";

export default async function Products() {
  await connectDB();
  const products = JSON.parse(JSON.stringify(await Product.find({published:true}).sort({newArrival:-1,featured:-1,createdAt:-1}).lean()));
  return <><Nav/><main className="section"><div className="container"><div className="eyebrow">Gouri Fashions</div><h1 style={{fontSize:"65px",margin:"12px 0 40px"}}>All Collections</h1><div className="grid">{products.map((p:any)=><ProductCard p={p} key={p._id}/>)}</div></div></main></>;
}
