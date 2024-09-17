import { getAllProducts } from "@/actions/product";
import Product from "@/components/Product";

export default async function Page() {

    const products = await getAllProducts();

    if(products.success && products.products) {
        return (
            <Product products={products.products} />
        )
    }

    return (
        <div>
            <h1>Products</h1>
            <p>There was an error fetching the products</p>
        </div>
    )

}
