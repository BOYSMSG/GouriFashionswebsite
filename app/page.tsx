import Nav from "@/components/Nav";
import ProductCard from "@/components/ProductCard";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import Product from "@/models/Product";
import Content from "@/models/Content";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  let products:any[] = [], content:any[] = [], collections:any[] = [];
  try {
    await connectDB();
    products = JSON.parse(JSON.stringify(await Product.find({published:true}).sort({newArrival:-1,featured:-1,displayOrder:1,createdAt:-1}).limit(8).lean()));
    content = JSON.parse(JSON.stringify(await Content.find({published:true}).sort({featured:-1,displayOrder:1,createdAt:-1}).limit(6).lean()));
    
    // Fallback if Collection model isn't populated yet
    const Collection = mongoose.models.Collection || mongoose.model("Collection", new mongoose.Schema({name:String, slug:String, hashtag:String, published:Boolean}));
    collections = JSON.parse(JSON.stringify(await Collection.find({published:true}).sort({createdAt:1}).lean()));
    
    if(!collections.length) {
      collections = ["Kurta Pajama","Coat Pants & Suits","Shirts & Trousers","Wedding Wear","Formal Wear","Casual Wear"].map(x=>({name:x, slug:x.toLowerCase().replace(/[^a-z0-9]+/g, "-"), hashtag:"#"+x.toLowerCase().replace(/[^a-z0-9]+/g, "")}));
    }
  } catch {}

  return <>
    <Nav/>
    <main>
      <section className="hero">
        <div className="container heroContent">
          <div className="eyebrow">Gouri Fashions • Men's Collection</div>
          <h1>STYLE<br/><span className="gold">FITS YOU.</span></h1>
          <p>Premium men's fashion for weddings, celebrations, formal moments and everyday style. Explore the latest collection and visit our store for the perfect fit.</p>
          <a className="btn btnGold" href="#new">Explore Collection</a>
          <a className="btn btnGhost" href="https://share.google/emNsExcuhVlXNBSGe" target="_blank">Get Directions</a>
        </div>
      </section>

      <section className="section" id="new">
        <div className="container">
          <div className="sectionHead"><div><div className="eyebrow">Fresh from the store</div><h2>New Arrivals</h2></div><Link className="gold" href="/products">View all →</Link></div>
          <div className="grid">{products.length ? products.map(p=><ProductCard key={p._id} p={p}/>) : <p style={{color:"#888"}}>Products will appear here after you publish them from the admin panel.</p>}</div>
        </div>
      </section>

      <section className="section" id="collections">
        <div className="container">
          <div className="sectionHead"><div><div className="eyebrow">Find your look</div><h2>Collections</h2></div></div>
          <div className="categories">
            {collections.map((x:any)=><Link href={`/collections/${x.slug}`} className="cat" key={x.slug}><h3>{x.name}</h3></Link>)}
          </div>
        </div>
      </section>

      <section className="section" id="videos">
        <div className="container">
          <div className="sectionHead"><div><div className="eyebrow">See it. Feel it. Wear it.</div><h2>Latest Content</h2></div></div>
          <div className="socialGrid">
            {content.length ? content.map((c:any)=>{
              const isInsta = c.url.includes("instagram.com/p/") || c.url.includes("instagram.com/reel/");
              const embedUrl = isInsta ? (c.url.split("?")[0].replace(/\/$/, "") + "/embed") : "";
              
              if (isInsta) {
                return <div key={c._id} className="socialCard" style={{padding:0, overflow:"hidden", background:"#fff"}}>
                  <iframe src={embedUrl} width="100%" height="480" frameBorder="0" scrolling="no" allowTransparency={true} style={{display:"block"}}></iframe>
                </div>;
              }

              return <a className="socialCard" href={c.url} target="_blank" key={c._id}>
                <small>{c.platform} • {c.type}</small><h3>{c.title || "Gouri Fashions Update"}</h3><p>{c.description || "View the latest Gouri Fashions collection and updates."}</p><span className="gold">View content →</span>
              </a>;
            }) : <>
              <a className="socialCard" href="https://www.instagram.com/gourifashions01/" target="_blank"><small>Instagram</small><h3>Latest Reels</h3><p>See new styles, arrivals and store updates.</p></a>
              <a className="socialCard" href="https://www.youtube.com/channel/UCC-N2JvKV_A7YOxLT8yOlaA" target="_blank"><small>YouTube</small><h3>Watch Videos</h3><p>Explore Gouri Fashions videos and collections.</p></a>
              <a className="socialCard" href="https://www.facebook.com/people/Gouri-Fashions/61593929896122/" target="_blank"><small>Facebook</small><h3>Follow Us</h3><p>Stay connected with Gouri Fashions.</p></a>
            </>}
          </div>
        </div>
      </section>

      <section className="cta" id="contact"><div className="container ctaInner"><div><div className="eyebrow">Visit Gouri Fashions</div><h2>Find your perfect fit.</h2><p style={{color:"#999"}}>Call us, WhatsApp us or visit the store.</p></div><div><a className="btn btnGold" href="tel:9950228745">Call 9950228745</a><a className="btn btnGhost" href="https://wa.me/919950228745?text=Hello%20Gouri%20Fashions%2C%20I%20saw%20your%20website." target="_blank">WhatsApp</a><a className="btn btnGhost" href="https://share.google/emNsExcuhVlXNBSGe" target="_blank">Directions</a></div></div></section>
    </main>
    <footer className="footer"><div className="container footerGrid"><div><h3>Gouri Fashions</h3><p>Style Fits You. Men's fashion, ethnic wear, formal wear and custom styling.</p></div><div><h3>Social</h3><a href="https://www.instagram.com/gourifashions01/" target="_blank">Instagram</a><a href="https://www.youtube.com/channel/UCC-N2JvKV_A7YOxLT8yOlaA" target="_blank">YouTube</a><a href="https://www.facebook.com/people/Gouri-Fashions/61593929896122/" target="_blank">Facebook</a></div><div><h3>Contact</h3><a href="tel:9950228745">9950228745</a><a href="https://share.google/emNsExcuhVlXNBSGe" target="_blank">Google Maps</a></div></div></footer>
  </>;
}
