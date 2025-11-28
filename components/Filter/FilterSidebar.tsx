"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Star } from 'lucide-react';

const CATEGORIES = [
    { key: 'men-s-clothing', label: "Men's Clothing" },
    { key: 'women-s-clothing', label: "Women's Clothing" },
    { key: 'electronics', label: "Electronics" },
    { key: 'jewelery', label: "Jewelery" },
];

export default function FilterSidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');

    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

    const [minRating, setMinRating] = useState(searchParams.get('minRating') || '');

    const updateUrl = useCallback((name: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (value && value !== '0') {
            params.set(name, value);
        } else {
            params.delete(name);
        }
        
        router.push(`?${params.toString()}`);
    }, [searchParams, router]);

    const handleCategoryChange = (categoryKey: string) => {
        const newValue = categoryKey === selectedCategory ? '' : categoryKey;
        setSelectedCategory(newValue);
        updateUrl('category', newValue || null); 
    };

    const handleRatingChange = (rating: string) => {
        const newValue = rating === minRating ? '' : rating;
        setMinRating(newValue);
        updateUrl('minRating', newValue || null);
    };

    const handlePriceChange = (name: 'minPrice' | 'maxPrice', value: string) => {
        if (name === 'minPrice') {
            setMinPrice(value);
            updateUrl('minPrice', value || null);
        } else {
            setMaxPrice(value);
            updateUrl('maxPrice', value || null);
        }
    };

    return (
        <div className="space-y-8 font-light text-sm">
            <h3 className="text-xl font-medium tracking-tight mb-4 border-b border-border pb-2">Filters</h3>

            <div className="space-y-2 border border-border p-4 bg-card">
                <h4 className="font-medium text-foreground pb-1">Category</h4>
                <div className="space-y-1">
                    {CATEGORIES.map((category) => (
                        <button 
                            key={category.key}
                            onClick={() => handleCategoryChange(category.key)} 
                            className={`flex justify-between w-full p-2 text-sm transition-colors rounded-sm 
                                ${selectedCategory === category.key 
                                    ? 'bg-secondary text-secondary-foreground font-medium' 
                                    : 'hover:bg-muted text-foreground'}
                            `}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2 border border-border p-4 bg-card">
                <h4 className="font-medium text-foreground pb-1">Minimum Rating</h4>
                <div className="space-y-1">
                    {[4, 3].map((rating) => (
                        <button 
                            key={rating}
                            onClick={() => handleRatingChange(String(rating))} 
                            className={`flex justify-between w-full p-2 text-sm transition-colors rounded-sm 
                                ${minRating === String(rating)
                                    ? 'bg-secondary text-secondary-foreground font-medium' 
                                    : 'hover:bg-muted text-foreground'}
                            `}
                        >
                            <div className="flex items-center space-x-1">
                                {Array.from({ length: rating }).map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                ))}
                                <span className="text-xs text-muted-foreground"> & Up</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4 border border-border p-4 bg-card">
                <h4 className="font-medium text-foreground pb-1">Price Range</h4>
                <div className="flex items-center space-x-3">

                    <input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                        className="w-1/2 p-2 border border-border bg-background text-foreground focus:border-accent focus:outline-none transition-colors rounded-sm"
                        min="0"
                    />
                    <span className="text-muted-foreground">-</span>

                    <input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                        className="w-1/2 p-2 border border-border bg-background text-foreground focus:border-accent focus:outline-none transition-colors rounded-sm"
                        min="0"
                    />
                </div>
            </div>
            
        </div>
    );
}