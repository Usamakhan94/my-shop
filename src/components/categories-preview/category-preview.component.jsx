import { Link } from 'react-router-dom'
import ProductCard from '../product-card/product-card.component'
import { CategoryPreviewContainer } from './category-preview.style'

const CategoryPreview=({ title, products})=> {
  return (
    <CategoryPreviewContainer key={title}>
        <h2>
            <Link to={title} className='title'>{title.toUpperCase()}</Link>
        </h2>
        <div className='preview'>
            {
                products.map((product, idx) => {
                    if(idx < 4){    
                    return <ProductCard key={product.id} product={product}/>}
                    return null;
                }
                )
            }
        </div>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview;