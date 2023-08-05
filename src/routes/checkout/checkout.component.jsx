import { CartContext } from '../../components/context/cart.context';
import { useContext } from 'react';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CheckoutContainer, CheckoutHeader, CheckoutHeaderBlock, Total } from './checkout.styles';

const Checkout =()=>{
    const { cartItems, cartTotal } = useContext(CartContext);
    
    return(
        <CheckoutContainer>
            <CheckoutHeader>
                <CheckoutHeaderBlock><span>Product</span></CheckoutHeaderBlock>
                <CheckoutHeaderBlock><span>Description</span></CheckoutHeaderBlock>
                <CheckoutHeaderBlock><span>Quantity</span></CheckoutHeaderBlock>
                <CheckoutHeaderBlock><span>Price</span></CheckoutHeaderBlock>
                <CheckoutHeaderBlock><span>Remove</span></CheckoutHeaderBlock>
            </CheckoutHeader>
            {
            cartItems.map((cartItem)=>{
                return(
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                )})
                }
            <Total>Total = ${cartTotal}</Total>
        </CheckoutContainer>
    );
};

export default Checkout;