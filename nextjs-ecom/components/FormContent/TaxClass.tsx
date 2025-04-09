'use client'

import { useGlobalStore } from '@/context/Store/GlobalStore'
import React from 'react'

export default function TaxClass() {
    const { selectedTaxClass, setSelectedTaxClass, errors } = useGlobalStore()

    const handleTaxClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTaxClass(e.target.value)
    }

    return (
        <div className="">
            <select name="taxClass" id="taxClass" value={selectedTaxClass} onChange={handleTaxClassChange} className={`select-arrow w-full px-2 py-3 rounded-md border focus:outline-none focus:ring-0 text-sm ${errors.tax_class ? 'border-red-500' : 'border-inherit'}`}>
                <option value="" className='hidden'>Select an option</option>
                <option value="tax free">Tax Free</option>
                <option value="taxable goods">Taxable Goods</option>
                <option value="downloadable product">Downloadable Product</option>
            </select>
            {errors?.tax_class && <p className='text-xs text-red-500 mt-2'>{errors.tax_class}</p>}
        </div>
    )
}
