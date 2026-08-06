"use client"
export default function Home() {
  
  const handleClick=async()=>{
 await fetch(process.env.NEXT_PUBLIC_URL_BACKEND,{
 method:"POST", 
 headers:{
    "Content-Type":"application/json"

  },
  
  body:JSON.stringify({
    name:"Nguyen Van A",
    age:20
  })
  
 })
  }

  return (
    <> 
    <button id="btn" onClick={handleClick}>Click do</button>
    <div> Xin chào</div>
    </>
  );
}
