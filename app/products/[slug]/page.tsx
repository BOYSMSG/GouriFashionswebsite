import Nav from "@/components/Nav";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProductPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; await connectDB();
  const p:any=JSON.parse(JSON.stringify(await Product.findOne({slug,published:true}).lean()));
  if(!p) return notFound();
  const imgs=p.images?.length?p.images:["/assets/store-banner.png"];
  return <><Nav/><main className="productPage"><div className="container productDetail"><div className="gallery">{imgs.map((x:string,i:number)=><img src={x} alt={`${p.name} ${i+1}`} key={i}/>)}</div><div className="productInfo"><div className="eyebrow">{p.category}</div><h1>{p.name}</h1><div className="price" style={{fontSize:24}}>{p.price?`₹${p.price}`:"Call for Price"}</div><p className="desc">{p.description}</p><div>{p.sizes?.map((x:string)=><span className="pill" key={x}>{x}</span>)}</div><div style={{marginTop:20}}><a className="btn btnGold" href="tel:9950228745">Call Now</a><a className="btn btnGhost" href={`https://wa.me/919950228745?text=${encodeURIComponent(`Hello Gouri Fashions, I am interested in ${p.name}.`)}`} target="_blank">WhatsApp</a><a className="btn btnGhost" href="https://share.google/emNsExcuhVlXNBSGe" target="_blank">Directions</a></div></div></div></main></>;
}
