"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Login(){
 const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState(""); const router=useRouter();
 async function submit(e:any){e.preventDefault();setError("");const r=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});if(r.ok)router.push("/admin");else setError((await r.json()).error||"Login failed");}
 return <main className="login"><div className="loginBox"><img src="/assets/logo.png" alt="Gouri Fashions"/><h1 className="serif gold">Admin</h1>{error&&<div className="error">{error}</div>}<form onSubmit={submit}><div className="field"><label>Email</label><input required value={email} onChange={e=>setEmail(e.target.value)}/></div><br/><div className="field"><label>Password</label><input required type="password" value={password} onChange={e=>setPassword(e.target.value)}/></div><br/><button className="adminBtn gold" style={{width:"100%"}}>Login</button></form></div></main>
}
