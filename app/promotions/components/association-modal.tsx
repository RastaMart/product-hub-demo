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

  const isProductSelected = (productKey: string) => {
    if (!selectedPromotion?.product_packages) return false;
    return selectedPromotion.product_packages.some((pkg: any) => pkg.productKey === productKey);
  };

  const isMarketSelected = (marketId: string) => {
    if (!selectedPromotion?.markets) return false;
    return selectedPromotion.markets.includes(marketId);
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
                          
                          return (
                            <div
                              key={productKey}
                              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50"
                            >
                              <Checkbox
                                id={`product-${productKey}`}
                                checked={isChecked}
                                onCheckedChange={() => 
                                  selectedPromotion && onProductAssociation(selectedPromotion, productKey)
                                }
                              />
                              <label
                                htmlFor={`product-${productKey}`}
                                className="text-sm cursor-pointer flex-grow"
                              >
                                {product.name}
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
                  const isChecked = isMarketSelected(market.id);
                  
                  return (
                    <div
                      key={market.id}
                      className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50"
                    >
                      <Checkbox
                        id={`market-${market.id}`}
                        checked={isChecked}
                        onCheckedChange={() => 
                          selectedPromotion && onMarketAssociation(selectedPromotion, market.id)
                        }
                      />
                      <label
                        htmlFor={`market-${market.id}`}
                        className="cursor-pointer flex-grow"
                      >
                        <p className="text-sm font-medium">{market.label}</p>
                        <p className="text-xs text-gray-500">{market.code}</p>
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