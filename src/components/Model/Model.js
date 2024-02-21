import React from "react";
import './Model.css'
import {  useSelector } from "react-redux";
function Model(props) {
    let products =  useSelector((state)=>state.cart.cart)
    let Total = useSelector((state)=>state.cart.totalPrice)
    // let Cart = useSelector((state)=>state.cart)
    console.log(Total)

    let items = (
        <ul>
          { products.map((item, index) => (
            <div>
              <li key={index}>
                <h5 className="item">{item.Name}</h5>
                <h5 className="item">{item.Discription}</h5>
                <h5 className="item">{item.Price}</h5>
                <button className="size">{item.Size_M}</button>
                <button className="size">{item.Size_L}</button>
                <button className="size">{item.Size_XL}</button>
              </li>
            </div>
          ))}
        </ul>
      );
  return (
    <div className="model-out" onClick={()=>{props.toggle(false)}}>
        <button onClick={()=>{props.toggle(false)}} className="exit">X</button>
    <div className="model-in">
      <form className="form3">
        <h3 className="item">Name</h3>
        <h3 className="item">Descreption</h3>
        <h3 className="item">Price</h3>
        <h3 className="item">M</h3>
        <h3 className="item">L</h3>
        <h3 className="item">XL</h3>
      </form>
      {items}
      <h2 >Total = {Total}</h2>
      <button>Place order</button>
    </div>
    </div>
  );
}

export default Model;
