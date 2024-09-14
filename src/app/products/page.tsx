import { getAllProducts } from "@/actions/product";
import Product from "@/components/Product";

export default async function Page() {

    const products = await getAllProducts();

    return (
        <Product products={products.products!} />
    )
}