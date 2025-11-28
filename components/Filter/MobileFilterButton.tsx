"use client";

import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

export default function MobileFilterButton({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 border border-border bg-card hover:bg-muted text-sm font-medium transition-colors rounded-md"
            >
                <Filter className="w-4 h-4" />
                Filters
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            <div
                className={`fixed top-0 right-0 z-50 h-full w-3/4 max-w-sm bg-background border-l border-border shadow-2xl p-6 transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                <div className="flex justify-between items-center border-b border-border pb-4 mb-6">
                    <h2 className="text-lg font-medium tracking-tight">Filter Products</h2>
                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-muted rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="overflow-y-auto h-[calc(100%-60px)]">
                    {children}
                </div>
            </div>
        </>
    );
}