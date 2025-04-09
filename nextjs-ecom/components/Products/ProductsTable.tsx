'use client'

import { useProductsStore } from '@/context/Store/ProductStore'
import { useSidebarStore } from '@/context/Store/SidebarStore'
import { Product } from '@/interface/ProductInterface'
import { LIMIT, LinksType } from '@/lib/Constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import Swal from 'sweetalert2'
import StarRating from './StarRating'

export default function ProductsTable({ products }: { products: Product[] }) {
    const { currentPage, showAction, actionIndex, setAction } = useProductsStore()
    const { setSelectedLink } = useSidebarStore()

    const paginatedItems = products.slice(
        (currentPage - 1) * LIMIT,
        currentPage * LIMIT
    )

    const queryClient = useQueryClient()
    const router = useRouter()

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`http://localhost:8004/product/${id}`, {
                method: 'DELETE',
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error)
            }

            return data
        },
        onSuccess: (data) => {
            console.log('data', data)

            queryClient.invalidateQueries({ queryKey: ['product'] })

            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });

            window.location.reload()
        },
        onError: (error) => {
            console.log(error.message)
        }
    })

    const handleDeleteProduct = (id: string) => {
        Swal.fire({
            html: `
                <div style="font-size:15px">
                Are you sure you want to delete?
                </div>
                `,
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#3085d6",
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id)
            }
        });
    }

    const handleEditProduct = (id: string) => {
        router.push(`/edit-product/${id}`)
        setSelectedLink(LinksType.EditProduct)
        setAction(-1)
    }

    return (
        <table className='w-full border-collapse'>
            <thead>
                <tr className='border-b-[1px] border-dashed'>
                    <th className='min-w-[200px] text-start font-semibold text-[13px] uppercase py-4 text-gray-400'><span>Product</span></th>
                    <th className='min-w-[100px] text-end font-semibold text-[13px] uppercase py-4 text-gray-400'><span>SKU</span></th>
                    <th className='min-w-[70px] text-end font-semibold text-[13px] uppercase py-4 text-gray-400'><span>Qty</span></th>
                    <th className='min-w-[100px] text-end font-semibold text-[13px] uppercase py-4 text-gray-400'><span>Price</span></th>
                    <th className='min-w-[100px] text-end font-semibold text-[13px] uppercase py-4 text-gray-400'><span>Rating</span></th>
                    <th className='min-w-[100px] text-end font-semibold text-[13px] uppercase py-4 text-gray-400'><span>Status</span></th>
                    <th className='min-w-[70px] text-end font-semibold text-[13px] uppercase py-4 text-gray-400'><span>Actions</span></th>
                </tr>
            </thead>
            <tbody>
                {/* Products */}
                {
                    paginatedItems.map((product, index) => (
                        <tr key={index} className={`${index !== (LIMIT - 1) ? "border-b-[1px] border-dashed" : ""}`}>
                            <td className='py-4 flex items-center space-x-4'>
                                <div className='h-11 w-11 bg-gray-100 rounded-md'>
                                    <Image src={`http://localhost:8004/uploads/${product.thumbnail_name}`} height={100} width={100} alt='Thumbnail' className='h-full w-full rounded-md' />
                                </div>
                                <div className='text-sm font-semibold'>{product.name}</div>
                            </td>
                            <td className='py-4 text-end'>
                                <div className='text-sm font-semibold text-gray-500'>{product.sku_number}</div>
                            </td>
                            <td className='py- text-end'>
                                <div className='text-sm font-semibold text-gray-500'>{product.on_shelf}</div>
                            </td>
                            <td className='py-4 text-end'>
                                <div className='text-sm font-semibold text-gray-500'>{product.price}</div>
                            </td>
                            <td className='py-4'>
                                <StarRating rating={4.5} />
                            </td>
                            <td className='py-4 text-end'>
                                <div className='text-[11px] font-semibold bg-green-100 text-green-500 inline-block p-1 rounded-md'>{product.status}</div>
                            </td>
                            <td className='py-4 text-end'>
                                <button onClick={() => setAction(index)} className={`inline-flex items-center justify-end space-x-2 bg-gray-100 px-3 py-2 rounded-md focus:outline-none transition-opacity focus:ring-0`}>
                                    <span className='text-xs font-medium'>Actions</span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </button>
                                <div className={`absolute z-50 right-[3%] w-28 bg-white rounded-md shadow-lg top-15 py-1 ring-1 ring-opacity-5 ring-black transition-all transform ease-out text-start ${showAction && (actionIndex === index) ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-1/2 opacity-0 pointer-events-none"}`}>
                                    <button onClick={() => handleEditProduct(product.id)} className='block px-4 py-2 text-xs text-start text-gray-700 transition-colors hover:bg-gray-100 w-full focus:outline-none focus:ring-0'>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDeleteProduct(product.id)} className='block px-4 py-2 text-start text-xs text-gray-700 transition-colors hover:bg-gray-100 w-full focus:outline-none focus:ring-0'>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}
