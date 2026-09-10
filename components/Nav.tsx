import Link from "next/link";

export default function Nav() {
  return <nav className="nav">
    <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <Link href="/" className="brand"><img src="/assets/logo.png" alt="Gouri Fashions logo"/><b>GOURI FASHIONS</b></Link>
      <div className="navlinks">
        <Link href="/#collections">Collections</Link>
        <Link href="/#new">New Arrivals</Link>
        <Link href="/#videos">Videos</Link>
        <Link href="/#contact">Contact</Link>
      </div>
      <a className="btn btnGold" href="tel:9950228745">Call Now</a>
    </div>
  </nav>;
}
