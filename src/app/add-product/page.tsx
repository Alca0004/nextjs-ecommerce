import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma"
import { redirect } from "next/navigation";

export const metadata = {
    title: 'Add Product - Flowmazon'
}

async function AddProduct(formData: FormData) {
    "use server"


    const name = formData.get('name')?.toString();
    const description = formData.get('description')?.toString();
    const imageUrl = formData.get('imageUrl')?.toString();
    const price = Number(formData.get('price') || 0)


    if (!name || !description || !imageUrl || !price) {
        throw Error('Missing required fields');
    }

    await prisma.product.create({
        data:{name, description, price, imageUrl},
    })
    redirect('/')
}

export default function AddProductPage() {
    return (
        <div>
            <h1 className="text-lg mb-3 font-bold">Add Product</h1>
            <form action={AddProduct}>
                <input required
                    name="name"
                    placeholder="Name"
                    className="input input-bordered w-full mb-3" />
                <textarea required name="description" placeholder="Description"
                className="textarea textarea-bordered mb-3 w-full"
                ></textarea>
                                <input required
                    name="imageUrl"
                    placeholder="Image URL"
                    type="url"
                    className="input input-bordered w-full mb-3" />
                                <input required
                    name="price"
                    placeholder="Price"
                    type="number"
                    className="input input-bordered w-full mb-3" />
                <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
            </form>
        </div>
    )
}