import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { CartContext } from '../context/cart.context';
import { useContext } from 'react';
import { AddToCartButton, ProductCardContainer, ProductCardFooter, ProductImage, ProductName, ProductPrice } from './product-card.styles';

const ProductCard=({product})=>{
    const {price, name, imageUrl} = product;
    const { addItemToCart } = useContext(CartContext)
    const addProductToCart = ()=> addItemToCart(product)
    return(
        <ProductCardContainer className='product-card-container'>
            <ProductImage src={imageUrl} alt={`${name}`}/>
            <ProductCardFooter className="footer">
                <ProductName className='name'>{name}</ProductName>
                <ProductPrice className='price'>{price}</ProductPrice>
            </ProductCardFooter>
            <AddToCartButton onClick={addProductToCart} buttonType={BUTTON_TYPE_CLASSES.inverted}>Add to cart</AddToCartButton>
        </ProductCardContainer>
    )
}

export default ProductCard;