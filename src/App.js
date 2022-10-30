import {useState,useEffect} from "react"
import productlist from './component/productlist';
import ProductCard from './component/ProductCard';
import CartDetails from './component/CartDetails';
import "./Style/Main.scss"
import Cart from "./Img/cart.png"

function App() {
  const [cart,setCart] = useState([])
  const [window,setWindow] = useState(null)
  const [added,setAdded] = useState (false)

  const printProduct = () =>{
    return productlist.map((l,i)=>{
      return <ProductCard data={l} setCart={setCart} cart={cart}  />
    })
  }
  const printCart = () =>{
    return cart.map((c,i)=>{
      return <CartDetails data={c} cart={cart} setCart={setCart} index={i} />
    })
  }
  const GrandTotal = cart.reduce((a,c)=> a+c.totalGrand,0)
  const ItemTotal = cart.reduce((a,c)=> a+c.quantity,0)

  const addAnimation = () =>{
    setAdded(1)
    setTimeout(()=>{
      setAdded(0)
  },1000)
  }
  useEffect(()=>{
    addAnimation()
  },[cart])

  return (
    <div className="App">
      <div className="header">
        <h1>All Products</h1>
      </div>
      <div className={`cart-btn ${added === 1 ? "popping" : ""}`}>
        <img className={added ? "popping" : ""} src={Cart} alt="" onClick={()=>setWindow(1)} />
        <span>{ItemTotal}</span>
        {cart.length > 0 && <p>Item Added</p>}
      </div>
      <div className='product-container'>
        {printProduct()}
      </div>
      <div className={`cart-container ${window === 1 ? "cart-open" : window === 0 ? "cart-close" : ""}`}>
        <h1 className="cart-header">Your Cart</h1>
        <img className="cart-ico" src={Cart} alt="" onClick={()=>setWindow(0)} />
      {printCart()}
      <div className="grand-container">
        <h4>Grand Total {GrandTotal !== 0 ? GrandTotal.toLocaleString() : " - "}</h4>
      </div>
      </div>

    </div>
  );
}

export default App;
