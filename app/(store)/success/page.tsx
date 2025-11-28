"use client"

import { Button } from "@/components/ui/button";
import useBasketStore from "@/store/store";
import { Check } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { useEffect } from "react";

function SuccessPage() {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get("orderNumber");
    const clearBasket = useBasketStore((state) => state.clearBasket);

    useEffect(() => {
        if (orderNumber) {
            clearBasket();
        }
    }, [orderNumber, clearBasket])

    return (
        // Utilisation de bg-background pour le fond principal
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground">
            
            <div className="bg-card p-8 md:p-12 border border-border max-w-2xl flex-1 w-full mx-4">
                
                {/* Icône de confirmation (Couleurs adaptées au thème général) */}
                <div className="flex justify-center mb-8">
                    <div className="h-16 w-16 bg-accent/20 rounded-full flex items-center justify-center">
                        <Check className="h-8 w-8 text-accent" />
                    </div>
                </div>
                
                {/* Titre (Style font-light/tracking-tight) */}
                <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-8 text-center">
                    Thank you for your order!
                </h1>

                {/* Détails de la commande */}
                <div className="border-y border-border py-6 mb-8 space-y-4">
                    <p className="text-base font-light text-foreground">
                        Your order has been confirmed and will be shipped shortly.
                    </p>
                    
                    {orderNumber && (
                        <div className="flex justify-between items-center bg-muted p-3">
                            <span className="text-sm text-muted-foreground font-light">Order Number:</span>
                            {/* Utilisation de text-accent pour le mettre en évidence, en cohérence avec CheckIcon */}
                            <span className="font-mono text-sm font-medium text-accent">
                                {orderNumber}
                            </span>
                        </div>
                    )}
                </div>
                
                {/* Informations supplémentaires et Boutons d'Action */}
                <div className="space-y-6">
                    <p className="text-sm font-light text-muted-foreground text-center">
                        A confirmation email has been sent to your registered email address.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        
                        {/* Bouton Principal (Style bouton Add to Cart : Noir sur Blanc) */}
                        <Button asChild 
                            className="bg-foreground text-background hover:bg-accent hover:text-accent-foreground py-3 font-light text-sm tracking-wide"
                        >
                            <Link href="/orders">View Order Details</Link>
                        </Button>
                        
                        {/* Bouton Secondaire (Style Outline) */}
                        <Button asChild variant="outline" 
                            className="border-border text-foreground hover:bg-secondary py-3 font-light text-sm tracking-wide"
                        >
                            <Link href="/">Continue Shopping</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessPage