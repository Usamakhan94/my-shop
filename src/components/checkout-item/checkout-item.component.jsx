import { useContext } from 'react';
import { CartContext } from '../context/cart.context';
import { CheckoutItemContainer, ImageContainer, ProductImage, QuantityVariable, RemoveButton } from './checkout-item.styles';
const CheckoutItem = ({cartItem})=>{
    const { addItemToCart, removeItemToCart, clearItemFromCart }= useContext(CartContext);

    const clearItemHandler = ()=> clearItemFromCart(cartItem);
    const addItemHandler=()=> addItemToCart(cartItem);
    const removeItemHandler=()=> removeItemToCart(cartItem);

    const {name, imageUrl, price, quantity, } = cartItem;
    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <ProductImage src={imageUrl} alt={name} />
            </ImageContainer>
            <span className='name'>{name}</span>
            <QuantityVariable>
                <div className="arrow" onClick={removeItemHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className="arrow" onClick={addItemHandler}>&#10095;</div>
                </QuantityVariable>
            <span className='price'>{price}</span>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>  
    )
}
export default CheckoutItem;