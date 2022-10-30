import React,{useState} from 'react'
import "../Style/ProductCard.scss"

function ProductCard({data,setCart,cart}) {
    const [total,setTotal] = useState(1)
    const taxTotal = () =>{
        return data.price+(data.price*0.10)
    }
    const addCart = ()=>{
        const added = cart.find((c) => c.title === data.name);
        if(added){
            const newArr = [...cart]
            const idx = newArr.map(e => e.title).indexOf(data.name);
            newArr[idx].quantity += total;
            setCart(newArr)
            setTotal(1)
        }else{
            setCart([...cart,{title:data.name,quantity:total,price:data.price,totalGrand:taxTotal()}])
            setTotal(1)
        }
        
    }
  return (
    <div className='product-card'>
        <div className='image-frame'>
        <img src={data.img} alt={data.name} />
        </div>
        <div className='details-card'>
        <h1>{data.name}</h1>
        <p>{data.desc}</p>
        <span>Rp.{data.price.toLocaleString()}</span>
        </div>
        <div>
        <div className='quantity-container'>
        <button className='minus-btn' onClick={()=>total > 1 && setTotal(total -1)}>l</button>
            <p>{total}</p>
            <button onClick={()=>setTotal(total +1)}>+</button>
        </div>
        <button className='add-btn' onClick={()=> addCart()}>Add to Cart</button>
        </div>
    </div>
  )
}

export default ProductCard