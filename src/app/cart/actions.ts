"use server";

import { createCart, getCart } from "@/lib/db/cart";

export async function setProductQuantity(productId:string, quantiy: number) {
    const cart = (await getCart()) ?? await createCart()

    const articleInCart = cart.items.find(items => items.productId === productId)

    
}