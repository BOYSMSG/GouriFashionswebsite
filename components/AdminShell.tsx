"use client";
import Link from "next/link";
export default function AdminShell({children}:{children:React.ReactNode}){
 async function logout(){await fetch("/api/auth/logout",{method:"POST"});location.href="/admin/login";}
 return <div className="adminShell"><header className="adminTop"><b>GOURI FASHIONS / ADMIN</b><button className="adminBtn" onClick={logout}>Logout</button></header><div className="adminLayout"><aside className="sidebar"><Link href="/admin">Dashboard</Link><Link href="/admin#products">Products</Link><Link href="/admin#content">Content</Link><Link href="/admin#settings">Settings</Link><Link href="/">View Website</Link></aside><main className="adminMain">{children}</main></div></div>
}
