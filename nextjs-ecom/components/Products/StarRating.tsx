'use client'

import { Star } from 'lucide-react'
import React, { useState } from 'react'

export default function StarRating({rating}: {rating: number}) {
    const [hover, setHover] = useState(0)
    return (
        <div className='flex space-x-[0.4px] justify-end'>
            {
                Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
                    <Star key={star} className={`size-4 cursor-pointer transition-colors duration-200 ${(hover || rating) >= star ? 'fill-yellow-400 stroke-yellow-500' : 'fill-gray-300 stroke-gray-400'}`}  onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)} />
                ))
            }
        </div>
    )
}
