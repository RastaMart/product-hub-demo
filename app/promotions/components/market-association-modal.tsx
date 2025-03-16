"use client";

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
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface MarketAssociationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPromotion: any | null;
  onMarketAssociation: (promotion: any, marketId: number) => void;
}

export function MarketAssociationModal({
  isOpen,
  onOpenChange,
  selectedPromotion,
  onMarketAssociation,
}: MarketAssociationModalProps) {
  const { data: markets = [] } = useData<Market>("/api/markets");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});

  const isMarketSelected = (marketId: number) => {
    if (!selectedPromotion?.markets) return false;
    return selectedPromotion.markets.includes(marketId);
  };

  const handleMarketToggle = async (marketId: number) => {
    if (!selectedPromotion) return;

    setIsSubmitting((prev) => ({ ...prev, [marketId]: true }));

    try {
      const isCurrentlySelected = isMarketSelected(marketId);

      const endpoint = isCurrentlySelected
        ? "/api/promotions/market/disassociate"
        : "/api/promotions/market/associate";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          promotionId: selectedPromotion.id,
          marketId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update market association");
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
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting((prev) => ({ ...prev, [marketId]: false }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Link Markets to {selectedPromotion?.name}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Markets</h3>
              <div className="grid grid-cols-2 gap-4">
                {markets.map((market) => {
                  const isChecked = isMarketSelected(market.id);
                  const isLoading = isSubmitting[market.id] || false;

                  return (
                    <div
                      key={market.id}
                      className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50"
                    >
                      <Checkbox
                        id={`market-${market.id}`}
                        checked={isChecked}
                        disabled={isLoading}
                        onCheckedChange={() => handleMarketToggle(market.id)}
                      />
                      <label
                        htmlFor={`market-${market.id}`}
                        className={`cursor-pointer flex-grow ${
                          isLoading ? "opacity-70" : ""
                        }`}
                      >
                        <p className="text-sm font-medium">{market.label}</p>
                        <p className="text-xs text-gray-500">
                          {market.csgCode}
                        </p>
                        {isLoading && (
                          <span className="text-xs text-gray-500">
                            (updating...)
                          </span>
                        )}
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
