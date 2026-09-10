import Nav from "@/components/Nav";
import ProductCard from "@/components/ProductCard";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import Product from "@/models/Product";
import Content from "@/models/Content";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let collection = null, products: any[] = [], content: any[] = [];
  try {
    await connectDB();
    const Collection = mongoose.models.Collection || mongoose.model("Collection", new mongoose.Schema({name:String, slug:String, hashtag:String, published:Boolean}));
    
    // Check if it's one of the default fallbacks
    collection = await Collection.findOne({ slug, published: true }).lean();
    if (!collection) {
      const defaults = ["Kurta Pajama","Coat Pants & Suits","Shirts & Trousers","Wedding Wear","Formal Wear","Casual Wear"].map(x=>({name:x, slug:x.toLowerCase().replace(/[^a-z0-9]+/g, "-"), hashtag:"#"+x.toLowerCase().replace(/[^a-z0-9]+/g, "")}));
      collection = defaults.find(x => x.slug === slug);
    }
    
    if (!collection) return notFound();

    // Fetch products that match the collection name
    products = JSON.parse(JSON.stringify(await Product.find({ published: true, category: new RegExp((collection as any).name, "i") }).sort({createdAt:-1}).lean()));
    
    // Fetch content (Insta Reels etc) that match the hashtag or collection name
    const query = [
      { category: new RegExp((collection as any).name, "i") },
      { description: new RegExp((collection as any).hashtag || (collection as any).name, "i") }
    ];
    content = JSON.parse(JSON.stringify(await Content.find({ published: true, $or: query }).sort({createdAt:-1}).lean()));

  } catch (e) { console.error(e); }

  if (!collection) return notFound();

  return <>
    <Nav/>
    <main>
      <section className="section" style={{paddingTop: 50}}>
        <div className="container">
          <div className="sectionHead"><div><Link href="/" className="eyebrow">← Back to Home</Link><h1 style={{marginTop: 15, fontSize: "clamp(40px, 6vw, 60px)"}}>{(collection as any).name}</h1></div></div>
          
          {content.length > 0 && <div style={{marginBottom: 60}}>
            <h3 style={{fontFamily:"Cormorant Garamond", fontSize: 32, marginBottom: 20}}>Trending on Instagram</h3>
            <div className="socialGrid">
              {content.map((c:any)=>{
                const isInsta = c.url.includes("instagram.com/p/") || c.url.includes("instagram.com/reel/");
                const embedUrl = isInsta ? (c.url.split("?")[0].replace(/\/$/, "") + "/embed") : "";
                if (isInsta) {
                  return <div key={c._id} className="socialCard" style={{padding:0, overflow:"hidden", background:"#fff"}}>
                    <iframe src={embedUrl} width="100%" height="480" frameBorder="0" scrolling="no" allowTransparency={true} style={{display:"block"}}></iframe>
                  </div>;
                }
                return <a className="socialCard" href={c.url} target="_blank" key={c._id}>
                  <small>{c.platform} • {c.type}</small><h3>{c.title || "Gouri Fashions"}</h3><p>{c.description}</p><span className="gold">View →</span>
                </a>;
              })}
            </div>
          </div>}

          <h3 style={{fontFamily:"Cormorant Garamond", fontSize: 32, marginBottom: 20}}>Collection Pieces</h3>
          <div className="grid">
            {products.length ? products.map(p => <ProductCard key={p._id} p={p}/>) : <p style={{color:"#888"}}>No products found in this collection yet.</p>}
          </div>
        </div>
      </section>
    </main>
  </>;
}
