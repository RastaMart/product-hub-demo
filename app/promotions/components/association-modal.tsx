"use client";

import { Promotion } from "@/lib/models/promotion";
import { Market } from "@/lib/models/market";
import { useData } from "@/lib/hooks/use-data";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface AssociationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPromotion: any | null;
  allProducts: any[];
  onProductAssociation: (promotion: any, productKey: string) => void;
  onMarketAssociation: (promotion: any, marketId: string) => void;
}

export function AssociationModal({
  isOpen,
  onOpenChange,
  selectedPromotion,
  allProducts,
  onProductAssociation,
  onMarketAssociation,
}: AssociationModalProps) {
  const { data: markets = [] } = useData<Market>('/api/markets');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});

  const isProductSelected = (productKey: string) => {
    if (!selectedPromotion?.products) return false;
    return selectedPromotion.products.some((p: any) => p.productKey === productKey);
  };

  const isMarketSelected = (marketId: string) => {
    if (!selectedPromotion?.markets) return false;
    return selectedPromotion.markets.includes(marketId);
  };
  
  const handleProductToggle = async (productKey: string, productType: string) => {
    if (!selectedPromotion) return;
    
    // Set loading state for this specific product
    setIsSubmitting(prev => ({ ...prev, [productKey]: true }));
    
    try {
      const isCurrentlySelected = isProductSelected(productKey);
      
      // Determine endpoint based on current state
      const endpoint = isCurrentlySelected
        ? '/api/promotions/product/disassociate'
        : '/api/promotions/product/associate';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          promotionKey: selectedPromotion.key,
          productKey,
          productType
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update product association');
      }
      
      // Call the parent handler to update state
      onProductAssociation(selectedPromotion, productKey);
      
      toast({
        title: "Success",
        description: isCurrentlySelected 
          ? "Product removed from promotion" 
          : "Product added to promotion",
      });
    } catch (error) {
      console.error("Failed to update product association:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(prev => ({ ...prev, [productKey]: false }));
    }
  };
  
  const handleMarketToggle = async (marketId: string) => {
    if (!selectedPromotion) return;
    
    setIsSubmitting(prev => ({ ...prev, [marketId]: true }));
    
    try {
      const isCurrentlySelected = isMarketSelected(marketId);
      
      const endpoint = isCurrentlySelected
        ? '/api/promotions/market/disassociate'
        : '/api/promotions/market/associate';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          promotionKey: selectedPromotion.key,
          marketKey: marketId,
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update market association');
      }
      
      onMarketAssociation(selectedPromotion, marketId);
      
      toast({
        title: "Success",
        description: isCurrentlySelected 
          ? "Market removed from promotion" 
          : "Market added to promotion",
      });
    } catch (error) {
      console.error("Failed to update market association:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(prev => ({ ...prev, [marketId]: false }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Link Products and Markets to {selectedPromotion?.name}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <div className="space-y-6">
                {['Internet', 'TV', 'Voice', 'Equipment'].map(type => (
                  <div key={type} className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-700">{type}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {allProducts
                        .filter(p => p.type === type)
                        .map(product => {
                          const productKey = 'key' in product ? product.key : product.id;
                          const isChecked = isProductSelected(productKey);
                          const isLoading = isSubmitting[productKey] || false;
                          
                          return (
                            <div
                              key={productKey}
                              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50"
                            >
                              <Checkbox
                                id={`product-${productKey}`}
                                checked={isChecked}
                                disabled={isLoading}
                                onCheckedChange={() => 
                                  handleProductToggle(productKey, type.toLowerCase())
                                }
                              />
                              <label
                                htmlFor={`product-${productKey}`}
                                className={`text-sm cursor-pointer flex-grow ${isLoading ? 'opacity-70' : ''}`}
                              >
                                {product.name}
                                {isLoading && <span className="ml-2 text-xs text-gray-500">(updating...)</span>}
                              </label>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Markets</h3>
              <div className="grid grid-cols-2 gap-4">
                {markets.map((market) => {
                  const marketId = market.key || market.id;
                  const isChecked = isMarketSelected(marketId);
                  const isLoading = isSubmitting[marketId] || false;
                  
                  return (
                    <div
                      key={marketId}
                      className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50"
                    >
                      <Checkbox
                        id={`market-${marketId}`}
                        checked={isChecked}
                        disabled={isLoading}
                        onCheckedChange={() => handleMarketToggle(marketId)}
                      />
                      <label
                        htmlFor={`market-${marketId}`}
                        className={`cursor-pointer flex-grow ${isLoading ? 'opacity-70' : ''}`}
                      >
                        <p className="text-sm font-medium">{market.label}</p>
                        <p className="text-xs text-gray-500">{market.code}</p>
                        {isLoading && <span className="text-xs text-gray-500">(updating...)</span>}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}