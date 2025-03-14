"use client";

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
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface ProductAssociationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPromotion: any | null;
  allProducts: any[];
  onProductAssociation: (promotion: any, productKey: string) => void;
}

export function ProductAssociationModal({
  isOpen,
  onOpenChange,
  selectedPromotion,
  allProducts,
  onProductAssociation,
}: ProductAssociationModalProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});

  const isProductSelected = (productKey: string) => {
    if (!selectedPromotion?.products) return false;
    return selectedPromotion.products.some(
      (p: any) => p.productKey === productKey
    );
  };

  const handleProductToggle = async (
    productKey: string,
    productType: string
  ) => {
    if (!selectedPromotion) return;

    setIsSubmitting((prev) => ({ ...prev, [productKey]: true }));

    try {
      const isCurrentlySelected = isProductSelected(productKey);

      const endpoint = isCurrentlySelected
        ? "/api/promotions/product/disassociate"
        : "/api/promotions/product/associate";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          promotionKey: selectedPromotion.key,
          productKey,
          productType,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update product association");
      }

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
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting((prev) => ({ ...prev, [productKey]: false }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Link Products to {selectedPromotion?.name}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <div className="space-y-6">
                {["Internet", "TV", "Voice", "Equipment"].map((type) => (
                  <div key={type} className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-700">
                      {type}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {allProducts
                        .filter((p) => p.type === type)
                        .map((product) => {
                          const productKey =
                            "key" in product ? product.key : product.id;
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
                                  handleProductToggle(
                                    productKey,
                                    type.toLowerCase()
                                  )
                                }
                              />
                              <label
                                htmlFor={`product-${productKey}`}
                                className={`text-sm cursor-pointer flex-grow ${
                                  isLoading ? "opacity-70" : ""
                                }`}
                              >
                                {product.name}
                                {isLoading && (
                                  <span className="ml-2 text-xs text-gray-500">
                                    (updating...)
                                  </span>
                                )}
                              </label>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
