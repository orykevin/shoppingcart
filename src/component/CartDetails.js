import React,{useState,useEffect} from 'react'
import "../Style/CartDetails.scss"
import productlist from './productlist'

function CartDetails({data,setCart,index,cart}) {
    const [total,setTotal] = useState(data.quantity)
    let GrandItem = total*data.price+((total*data.price)*0.10);
    const updateTotal = () =>{
        const newArr = [...cart]
        newArr[index].totalGrand = GrandItem
        newArr[index].quantity = total
        setCart(newArr)
    }
    const pos = productlist.map(e => e.name).indexOf(data.title);

    useEffect(()=>{
        updateTotal()
    },[total])

    useEffect(()=>{
        setTotal(data.quantity)
    },[cart])

    const deleteCart = () =>{
        const delArr = [...cart]
        const idx = delArr.map(e => e.title).indexOf(data.name);
        delArr.splice(idx,1)
        setCart(delArr)
    }

    const clickHandler = (type) =>{
        if(type === "+"){
            setTotal(total+1)
            updateTotal()
        }else{
            if(total>1){
                setTotal(total-1)
                updateTotal()
            }else if(total === 1){
                console.log("delete")
                deleteCart()
            }
        }
    }
  return (
    <div className='cart-details-container'>
        <div className='image-frame'>
        <img src={productlist[pos].img} alt={data.title} />
        </div>
        <div className='cart-details'>
        <h1>{data.title}</h1>
        <h3>Total inc Tax <span>{`Rp. ${GrandItem.toLocaleString()}`} </span></h3>
        </div>
        <div className='quantity-container'>
            <button className='minus-btn' onClick={()=>clickHandler("-")}>l</button>
            <p>{total}</p>
            <button onClick={()=>clickHandler("+")}>+</button>
        </div>
    </div>
  )
}

export default CartDetails