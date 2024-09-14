"use client"

import React, { useState, ChangeEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface NewProduct {
  name: string;
  price: string;
  quantity: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Wheat Stubble', price: 500, quantity: 1000 },
    { id: 2, name: 'Rice Stubble', price: 450, quantity: 800 },
    { id: 3, name: 'Corn Stubble', price: 550, quantity: 1200 },
  ])

  const [newProduct, setNewProduct] = useState<NewProduct>({ name: '', price: '', quantity: '' })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewProduct(prev => ({ ...prev, [name]: value }))
  }

  const handleAddProduct = () => {
    const productToAdd: Product = {
      id: products.length + 1,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      quantity: parseInt(newProduct.quantity, 10)
    }

    setProducts(prev => [...prev, productToAdd])
    setNewProduct({ name: '', price: '', quantity: '' })
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="mb-6 flex gap-4">
        <Input
          placeholder="Product Name"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Price"
          name="price"
          type="number"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Quantity"
          name="quantity"
          type="number"
          value={newProduct.quantity}
          onChange={handleInputChange}
        />
        <Button onClick={handleAddProduct}>Add Product</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}