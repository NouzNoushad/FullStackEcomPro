import React from 'react'
import ProductsTable from './ProductsTable'
import PageSelection from './PageSelection'
import ProductsHeader from './ProductsHeader'
import { Product, ProductResponse } from '@/interface/ProductInterface'

export default async function ProductsCard() {

    const response = await fetch('http://localhost:8004/product')
    const responseJson: ProductResponse = await response.json()
    const products: Product[] = responseJson.data

    return (
        <div className="px-8 py-9 w-full bg-white rounded-md ring-1 ring-gray-100 space-y-5 shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)] relative">
            {/* Products Header */}
            <ProductsHeader />
            {/* Products Table */}
            <div className="w-full overflow-x-auto">
                <ProductsTable products={products} />
            </div>
            {/* Page & Pagination */}
            <PageSelection products={products} />
        </div>
    )
}
