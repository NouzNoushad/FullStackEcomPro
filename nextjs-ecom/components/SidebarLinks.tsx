'use client'

import { LinksType } from '@/lib/Constants'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import SidebarButton from './SidebarButton'
import { useSidebarStore } from '@/context/Store/SidebarStore'

export default function SidebarLinks() {
    const { selectedLink, setSelectedLink, showMenu, setShowMenu } = useSidebarStore()

    const router = useRouter()

    const handleCatalogChange = (catalog: LinksType, path: string) => {
        setShowMenu(showMenu)
        setSelectedLink(catalog)
        router.push(path)
    }

    useEffect(() => {
        router.push('/products')
    }, [router])
    return (
        <nav className='flex-1 overflow-y-hidden hover:overflow-y-auto mt-5'>
            <div className="px-2 py-3 space-y-3">
                {/* Products */}
                <SidebarButton label='Products' onButtonClick={() => handleCatalogChange(LinksType.Products, "/products")} isSelectedLink={selectedLink == LinksType.Products} />
                {/* Categories */}
                <SidebarButton label='Categories' onButtonClick={() => handleCatalogChange(LinksType.Categories, "/products/categories")} isSelectedLink={selectedLink == LinksType.Categories} />
                {/* Add Product */}
                <SidebarButton label='Add Product' onButtonClick={() => handleCatalogChange(LinksType.AddProduct, "/products/add-product")} isSelectedLink={selectedLink == LinksType.AddProduct} />
                {/* Edit Product */}
                <SidebarButton label='Edit Product' onButtonClick={() => handleCatalogChange(LinksType.EditProduct, "/products/edit-product")} isSelectedLink={selectedLink == LinksType.EditProduct} />
                {/* Add Category */}
                <SidebarButton label='Add Category' onButtonClick={() => handleCatalogChange(LinksType.AddCategory, "/products/add-category")} isSelectedLink={selectedLink == LinksType.AddCategory} />
                {/* Edit Category */}
                <SidebarButton label='Edit Category' onButtonClick={() => handleCatalogChange(LinksType.EditCategory, "/products/edit-category")} isSelectedLink={selectedLink == LinksType.EditCategory} />
            </div>
        </nav>
    )
}