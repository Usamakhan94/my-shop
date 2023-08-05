import { useContext } from "react";
import { CategoriesContext } from "../../components/context/categories.context";
import CategoryPreview from "../../components/categories-preview/category-preview.component";

const CategoriesPreview=()=>{
    const { categoriesMap } = useContext(CategoriesContext)
    return(
        <>
        {Object.keys(categoriesMap).map((title)=>(
            <CategoryPreview key={title} title={title} products={categoriesMap[title]}/>
            ))}
        </>
    )
}
export default CategoriesPreview;