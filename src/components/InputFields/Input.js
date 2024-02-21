import React,{useRef,useEffect,useState} from 'react'
import Model from '../Model/Model';
import './Input.css'
import { useDispatch } from 'react-redux'
import { addProductToDis } from '../../Features/AddToDiscription/DiscriptionSlice';
import { addToCart } from "../../Features/AddToCart/CartSlice";
function Input() {
  const [toggle,setToggle] = useState(false);
  useEffect(() => {
       getProduct()
       getData()
    });
const ChangeToggle = (prop)=>{
    if(prop===true){
      setToggle(true)
    }else{
      setToggle(false)
    }
}
    const ShirtNameInput = useRef()
    const ShirtDiscInput = useRef()
    const ShirtPricInput = useRef()
    const MsizeInput = useRef()
    const LsizeInput = useRef()
    const xlsizeInput = useRef()

    const dispatch = useDispatch()

  async function addProduct(product) {
    const data = await fetch('https://65d63d75f6967ba8e3bdc476.mockapi.io/productproduct',{
      method: "POST",
      body: JSON.stringify({
      ...product ,
      }),
      headers: {
        "Content-Type": "application/json",
      }
    })
    const result = await data.json()
  }
  async function getProduct(product) {
    const data = await fetch('https://65d63d75f6967ba8e3bdc476.mockapi.io/productproduct',{
      method:'GET',
      headers:{
        "Content-Type": "application/json",
      }
    })
    const result = await data.json()
    dispatch(addProductToDis(result))
    console.log(result)
  }
  async function getData  () {
    const Data = await fetch('https://65d63d75f6967ba8e3bdc476.mockapi.io/cartcart',{
      method:'GET',
          headers: {
            "Content-Type": "application/json",
          }
  })
  const result = await Data.json()
  console.log(result)
  // dispatch(addToCart([...result]))
}


    const SubmitFun = (event)=>{
        event.preventDefault()
        const Values = {
            Name:ShirtNameInput.current.value,
            Discription:ShirtDiscInput.current.value,
            Price:ShirtPricInput.current.value,
            Size_M:MsizeInput.current.value,
            Size_L:LsizeInput.current.value,
            Size_XL:xlsizeInput.current.value,
        }
        addProduct(Values)
        getProduct()

    }
  return (
    <>
  { toggle ? ( 
    <Model toggle={ChangeToggle} />
    ) : (
    <form  className='form'>
    <button className='Cart' onClick={()=>{ChangeToggle(true)}}>Cart</button>
      <label>Tshirt Name</label>
      <input type='name' ref={ShirtNameInput}></input>
      <label>Discreption</label>
      <input type='name' ref={ShirtDiscInput}></input>
      <label>Price</label>
      <input type='name' ref={ShirtPricInput}></input>
      <label>M</label>
      <input type='number' ref={MsizeInput}></input>
      <label>L</label>
      <input type='number' ref={LsizeInput}></input>
      <label>XL</label>
      <input type='number' ref={xlsizeInput}></input>
      <button onClick={SubmitFun}>submit</button>
  </form>)
  }
  </>
    
  )
}

export default Input