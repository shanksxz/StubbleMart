import { getAllProducts } from "@/actions/product";
import Product from "@/components/Product";

export default async function Page() {

    const products = await getAllProducts();

    return (
        // @ts-ignore
        <Product products={products.products!} />
    )
}
