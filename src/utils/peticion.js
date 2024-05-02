import { useEffect, useState } from "react";

export function Peticion(url){
    const [product,setProductos]=useState([]);
  useEffect(()=>{ 
  fetch(`${url}`)
    .then(res=>res.json()).then(json=>{console.log(json);
    setProductos(json)});
  },[]);
  return product;
}

export async function  get(url){
  return (
  await fetch(url)
    .then(res=>res.json())
)}