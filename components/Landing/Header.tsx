"use client"

import { ClerkLoaded, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { Menu, Search, ShoppingBasket, ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import Form from "next/form"
import useBasketStore from '@/store/store';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser();
    const itemCount = useBasketStore((state) =>
        state.items.reduce((total, item) => total + item.quantity, 0)
    );

    return (
        <header className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">

            <div className='flex md:grid md:grid-cols-3 items-center justify-between px-6 py-4 md:px-12'>
                
                <div className='font-semibold text-xl tracking-tighter flex items-center'>
                    <Link href="/">ELARA</Link>
                </div>

                <nav className='hidden md:flex gap-8 font-medium text-sm uppercase tracking-wide justify-self-center text-gray-600'>
                    <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
                    <Link href="/#categories" className="hover:text-accent transition-colors">Categories</Link>
                    <Link href="/#featured" className="hover:text-accent transition-colors">Featured</Link>
                    {user && (<Link href="/orders" className="hover:text-accent transition-colors">Orders</Link>)}
                </nav>


                <div className='hidden md:flex items-center gap-4 justify-self-end'>

                    <Form action="/search" className="relative group">
                        <input
                            type="text"
                            name="query"
                            placeholder="Search..."
                            className="w-32 focus:w-64 transition-all duration-300 pl-9 pr-4 py-2 bg-gray-100/50 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-accent/10"
                        />
                        <Search className='w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors pointer-events-none' />
                    </Form>

                    <Link href="/basket" className='flex-1 relative flex justify-center items-center space-x-2'>
                        <button className="p-2 text-foreground hover:text-accent transition-colors duration-200 relative">
                            <ShoppingCart className="w-5 h-5" />
                            <span className="absolute top-1 right-1 bg-accent text-accent-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                                {itemCount}
                            </span>
                        </button>
                    </Link>

                    <ClerkLoaded>
                        {user ? (
                            <UserButton/>
                        ) : (
                            <SignInButton mode="modal">
                                <button className='bg-accent text-white text-sm py-2 px-5 rounded-full font-medium hover:bg-accent/80 transition-all cursor-pointer'>
                                    Sign In
                                </button>
                            </SignInButton>
                        )}
                    </ClerkLoaded>
                </div>

                <div className='flex items-center gap-3'>
                <Link href="/basket" className='flex-1 relative flex justify-center items-center space-x-2 md:hidden'>
                    <button className="p-2 text-foreground hover:text-accent transition-colors duration-200 relative">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="absolute top-1 right-1 bg-accent text-accent-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                            {itemCount}
                        </span>
                    </button>
                </Link>
                <button
                    className="md:hidden p-2 text-gray-600"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X width={24} /> : <Menu width={24} />}
                </button>
                </div>
            </div>

            {isOpen && (
                <div className='absolute top-full left-0 w-full bg-white border-b shadow-2xl flex flex-col px-6 py-8 md:hidden animate-in slide-in-from-top-5 duration-200 h-[calc(100vh-60px)] z-50'>
                    
                    <Form action="/search" className="relative w-full mb-8">
                        <input 
                            type="text" 
                            name="query" 
                            placeholder="Search..." 
                            className="w-full pl-10 py-3 bg-gray-50 border border-gray-200 rounded-full text-lg focus:outline-none focus:border-black transition-colors" 
                        />
                        <Search className='w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                    </Form>

                    <nav className="flex flex-col gap-6 text-2xl font-medium tracking-tight">
                        <Link 
                            href="/shop" 
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between group"
                        >
                            Shop
                            <span className="text-gray-300 group-hover:text-black transition-colors">→</span>
                        </Link>
                        <Link href="/#categories" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-black transition-colors">
                            Categories
                        </Link>
                        <Link href="/#featured" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-black transition-colors">
                            Featured
                        </Link>
                        {user && (
                            <Link href="/orders" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-black transition-colors">
                                Orders
                            </Link>
                        )}
                        
                    </nav>
                    
                    <hr className="my-8 border-gray-100" />

                    <div className="mt-auto pb-8"> 
                        <ClerkLoaded>
                            {user ? (
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                    <UserButton />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-900">My account</span>
                                        <span className="text-xs text-gray-500">{user.firstName || user.username}</span>
                                    </div>
                                </div>
                            ) : (
                                <SignInButton mode="modal">
                                    <button className='bg-accent text-white text-xl py-4 w-full px-5 rounded-full font-semibold hover:bg-accent/80 transition-all cursor-pointer'>
                                        Sign In
                                    </button>
                                </SignInButton>
                            )}
                        </ClerkLoaded>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;