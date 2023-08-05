import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../context/cart.context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart-dropdown.styles.jsx'
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles.jsx';
import Button from '../button/button.component';

const CartDropdown=()=>{
    const navigate = useNavigate();
    const goToCheckoutHandler = ()=> navigate('./checkout')

    const { cartItems } = useContext(CartContext)
    
    return(
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? 
                (cartItems.map(item=> (<CartItem key={item.id} cartItem={item}/>))) :
                (<EmptyMessage> Your cart is empty</EmptyMessage>)}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>Go To Checkout</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;