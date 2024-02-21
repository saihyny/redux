import React,{useEffect,useState}from "react";
import './Description.css'
import { useSelector,useDispatch } from "react-redux";
import { addProductToDis } from "../../Features/AddToDiscription/DiscriptionSlice";
import { addToCart } from "../../Features/AddToCart/CartSlice";

function Description() {

  const dispatch = useDispatch()
  
    
 
  const products = useSelector((state) => state.products.products);
 
  console.log(products)
  const clickEvent =(size,id,item,index)=>{
    
    const payload = {
      size,
      id,
      products,
      item,
      index
    }
        dispatch(addProductToDis(payload))
        dispatch(addToCart(payload))
  }
  let items = (
    <ul>
      {Array.isArray(products) && products.map((item, index) => (
        <div>
          <li key={item.id}>
            <h5 className="item">{item.Name}</h5>
            <h5 className="item">{item.Discription}</h5>
            <h5 className="item">{item.Price}</h5>
            <button onClick={()=>clickEvent('Size_M' ,item.id,item,index)}>M={item.Size_M}</button>
            <button onClick={ ()=>clickEvent('Size_L',item.id,item,index)}>L={item.Size_L}</button>
            <button onClick={ ()=>clickEvent('Size_XL',item.id,item,index)}>XL={item.Size_XL}</button>
          </li>
        </div>
      ))}
    </ul>
  );

  const getData= async () => {
    const Data = await fetch('https://65d63d75f6967ba8e3bdc476.mockapi.io/cartcart',{
      method:'GET',
          headers: {
            "Content-Type": "application/json",
          }
  })
  const result = await Data.json()
  dispatch(addToCart([...result]))
}
getData()
  return (
    <div>
      <form className="form2">
        <h3 className="item">Name</h3>
        <h3 className="item">Descreption</h3>
        <h3 className="item">Price</h3>
        <h3 className="item">Size</h3>
      </form>
      {items}
    </div>
  );
}

export default Description;
