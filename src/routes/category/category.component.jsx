import { useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../components/context/categories.context';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.component';
import { CategoryContainer, CategoryTitle } from './category.style';

const Category = () => {

    const { categoriesMap } = useContext(CategoriesContext)
    const [ products, setProducts ] = useState([]);
    const { category } = useParams();
    useEffect(()=>{
      setProducts(categoriesMap[category]);
    },[categoriesMap, category])

  return (
    <>
     <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
    <CategoryContainer>
      {products && products.map((product)=> <ProductCard product={product} key={product.id} />)}
    </CategoryContainer>
    </>
  )
}

export default Category;