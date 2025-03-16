"use client";

import { useState } from "react";
import { Promotion, PromoType } from "@/lib/models/promotion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";

interface CreatePromotionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreatePromotion: (promotion: Partial<Promotion>) => void;
}

export function CreatePromotionModal({
  isOpen,
  onOpenChange,
  onCreatePromotion,
}: CreatePromotionModalProps) {
  const [newPromotion, setNewPromotion] = useState<Partial<Promotion>>({
    triggers: [
      {
        siteWide: false,
      },
    ],
    uiElements: [],
  });

  const handleCreatePromotion = () => {
    if (!newPromotion.name || !newPromotion.startDate || !newPromotion.endDate)
      return;
    onCreatePromotion(newPromotion);
    setNewPromotion({
      triggers: [
        {
          siteWide: false,
        },
      ],
      uiElements: [],
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Promotion</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <Input
              value={newPromotion.name || ""}
              onChange={(e) =>
                setNewPromotion({ ...newPromotion, name: e.target.value })
              }
              placeholder="Promotion name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-gray-500" />
                <Input
                  type="date"
                  value={
                    newPromotion.startDate
                      ? format(newPromotion.startDate, "yyyy-MM-dd")
                      : ""
                  }
                  onChange={(e) =>
                    setNewPromotion({
                      ...newPromotion,
                      startDate: new Date(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">End Date</label>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-gray-500" />
                <Input
                  type="date"
                  value={
                    newPromotion.endDate
                      ? format(newPromotion.endDate, "yyyy-MM-dd")
                      : ""
                  }
                  onChange={(e) =>
                    setNewPromotion({
                      ...newPromotion,
                      endDate: new Date(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Promotion Type</label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={newPromotion.triggers?.[0]?.siteWide}
                  onCheckedChange={(checked) =>
                    setNewPromotion({
                      ...newPromotion,
                      triggers: [
                        {
                          ...newPromotion.triggers![0],
                          siteWide: checked as boolean,
                        },
                      ],
                    })
                  }
                />
                <label className="text-sm">Site Wide</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={newPromotion.triggers?.[0]?.cmsBlock}
                  onCheckedChange={(checked) =>
                    setNewPromotion({
                      ...newPromotion,
                      triggers: [
                        {
                          ...newPromotion.triggers![0],
                          cmsBlock: checked as boolean,
                        },
                      ],
                    })
                  }
                />
                <label className="text-sm">CMS Block</label>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Promo Code</label>
            <Input
              value={newPromotion.types?.[0]?.promoCode || ""}
              onChange={(e) =>
                setNewPromotion({
                  ...newPromotion,
                  types: [
                    {
                      ...newPromotion.types![0],
                      promoCode: e.target.value,
                    },
                  ],
                })
              }
              placeholder="SUMMER24"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Abandoned Cart Code</label>
            <Input
              value={newPromotion.types?.[0]?.abandonedCartCode || ""}
              onChange={(e) =>
                setNewPromotion({
                  ...newPromotion,
                  types: [
                    {
                      ...newPromotion.types![0],
                      abandonedCartCode: e.target.value,
                    },
                  ],
                })
              }
              placeholder="COMEBACK25"
            />
          </div>
          <Button
            onClick={handleCreatePromotion}
            disabled={
              !newPromotion.name ||
              !newPromotion.startDate ||
              !newPromotion.endDate
            }
            className="w-full bg-[#1a237e] hover:bg-[#1a237e]/90"
          >
            Create Promotion
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
