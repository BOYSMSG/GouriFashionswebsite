import Link from "next/link";

export default function ProductCard({ p }: { p: any }) {
  const image = p.images?.[0] || "/assets/store-banner.png";
  return <Link href={`/products/${p.slug}`} className="card">
    <div className="productImg"><img src={image} alt={p.name}/></div>
    <div className="cardBody">
      {p.newArrival && <span className="tag">NEW</span>}
      {p.featured && <span className="tag">FEATURED</span>}
      <div className="meta">{p.category}</div>
      <h3>{p.name}</h3>
      <div className="price">{p.price ? `₹${p.price}` : "Call for Price"}</div>
    </div>
  </Link>;
}
