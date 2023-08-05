import { CartContext } from '../context/cart.context';
import { useContext } from 'react';
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';


const CartIcon=()=>{

    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)
        // e.stopPropagation();
        const toggleIsCartOpen = ()=> setIsCartOpen(!isCartOpen)
    

    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon/>
            <ItemCount className='item-count'>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;