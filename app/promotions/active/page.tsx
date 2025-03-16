"use client";

import { useState, useEffect } from "react";
import { Promotion } from "@/lib/models/promotion";
import { Market } from "@/lib/models/market";
import { InternetProduct } from "@/lib/models/internet";
import { TVProduct } from "@/lib/models/tv";
import { VoiceProduct } from "@/lib/models/voice";
import { Equipment } from "@/lib/models/equipment";
import { useData } from "@/lib/hooks/use-data";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Link as LinkIcon,
  Settings2,
  GripVertical,
  ChevronDown,
  ChevronRight,
  Package,
  Network,
} from "lucide-react";
import { format } from "date-fns";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CreatePromotionModal } from ".././components/create-promotion-modal";
import { ProductAssociationModal } from ".././components/product-association-modal";
import { MarketAssociationModal } from ".././components/market-association-modal";
import { UIElementModal } from ".././components/ui-element-modal";
import { PromotionRow } from ".././components/promotionRow";
import { UIElement } from "@/lib/models/ui-element";

interface NewUIElementContext {
  promotionId: number;
  productId: number;
  productType: string;
  promoXproductID: number;
}

interface SortableRowProps {
  promotion: Promotion;
  onAssociateProducts: (promotion: any) => void;
  onAssociateMarkets: (promotion: any) => void;
  addUiElement: (newUIElementContext: NewUIElementContext) => void;
  isExpanded: boolean;
  onToggleExpand: (id: number) => void;
  allProducts: any[];
  markets: Market[];
}

function SortableRow({
  promotion,
  onAssociateProducts,
  onAssociateMarkets,
  addUiElement,
  isExpanded,
  onToggleExpand,
  allProducts,
  markets,
}: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: promotion.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    position: isDragging ? "relative" : "static",
    backgroundColor: isDragging ? "white" : undefined,
  } as React.CSSProperties;

  return (
    <PromotionRow
      promotion={promotion}
      isExpanded={isExpanded}
      onToggleExpand={onToggleExpand}
      addUiElement={addUiElement}
      onAssociateProducts={onAssociateProducts}
      onAssociateMarkets={onAssociateMarkets}
      dragHandleProps={{ ...attributes, ...listeners }}
      rowRef={setNodeRef}
      style={style}
      allProducts={allProducts}
      markets={markets}
    />
  );
}

export default function PromotionsPage() {
  const [isClient, setIsClient] = useState(false);
  const { data: fetchedPromotions = [] } = useData<any>("/api/promotions");
  const [promotions, setPromotions] = useState<any[]>([]);
  const { data: markets = [] } = useData<Market>("/api/markets");
  const { data: internetProducts = [] } = useData<InternetProduct>(
    "/api/products/internet"
  );
  const { data: tvProducts = [] } = useData<TVProduct>("/api/products/tv");
  const { data: voiceProducts = [] } = useData<VoiceProduct>(
    "/api/products/voice"
  );
  const { data: equipment = [] } = useData<Equipment>(
    "/api/products/equipment"
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isProductAssociationOpen, setIsProductAssociationOpen] =
    useState(false);
  const [isMarketAssociationOpen, setIsMarketAssociationOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isUIElementOpen, setIsUIElementOpen] = useState(false);
  const [newUIElementContext, setNewUIElementContext] =
    useState<NewUIElementContext>({
      promotionId: 0,
      productId: 0,
      productType: "",
      promoXproductID: 0,
    });
  const [expandedRows, setExpandedRows] = useState<number[]>([]);
  const { toast } = useToast();
  const itemsPerPage = 10;

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Add effect to update promotions state when data is loaded
  useEffect(() => {
    if (fetchedPromotions.length > 0) {
      setPromotions(fetchedPromotions);
    }
  }, [fetchedPromotions]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      // Update local state
      setPromotions((items) => {
        // Find the indexes of the dragged item and the drop target
        const activeIndex = items.findIndex((item) => item.id === active.id);
        const overIndex = items.findIndex((item) => item.id === over.id);

        // Return the reordered array
        return arrayMove(items, activeIndex, overIndex);
      });

      try {
        // Get the updated promotions after state update
        const updatedPromotions = [...promotions];
        const activeIndex = updatedPromotions.findIndex(
          (item) => item.id === active.id
        );
        const overIndex = updatedPromotions.findIndex(
          (item) => item.id === over.id
        );
        const reorderedPromotions = arrayMove(
          updatedPromotions,
          activeIndex,
          overIndex
        );

        // Save to the database
        const response = await fetch("/api/promotions/reorder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            promotions: reorderedPromotions.map((p) => ({ id: p.id })),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update promotion order");
        }

        toast({
          title: "Success",
          description: "Promotion order updated successfully",
        });
      } catch (error) {
        console.error("Failed to update promotion order:", error);
        toast({
          title: "Error",
          description: "Failed to update promotion order",
          variant: "destructive",
        });

        // If API call fails, revert to the original order by refetching
        // Alternatively, you could keep track of the previous order and revert to it
        window.location.reload();
      }
    }
  };

  const handleCreatePromotion = async (newPromotion: Partial<Promotion>) => {
    try {
      const response = await fetch("/api/promotions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newPromotion.name,
          startDate: newPromotion.startDate?.toISOString(),
          endDate: newPromotion.endDate?.toISOString(),
          triggers: newPromotion.triggers || [],
          // products: newPromotion.products || [],
          // markets: newPromotion.markets || [],
          uiElements: newPromotion.uiElements || [],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create promotion");
      }

      toast({
        title: "Success",
        description: "Promotion created successfully",
      });

      // Refresh the page to get updated data
      window.location.reload();
    } catch (error) {
      console.error("Failed to create promotion:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create promotion",
        variant: "destructive",
      });
    }

    setIsOpen(false);
  };

  const handleProductAssociation = async (
    promotion: any,
    productId: number
  ) => {
    const product = allProducts.find((p) => {
      return p.id === productId;
    });

    if (!product) {
      toast({
        title: "Error",
        description: "Product not found",
        variant: "destructive",
      });
      return;
    }

    const productType = product.type.toLowerCase();

    // Check if product is already associated to toggle it
    const isCurrentlyAssociated = promotion.products?.some(
      (p: any) => p.productId === productId
    );

    try {
      // Call the new endpoint
      const response = await fetch(`/api/promotions/${promotion.id}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          productType,
          associate: !isCurrentlyAssociated,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to update product association"
        );
      }

      // Update local state to reflect the toggle
      setPromotions((currentPromotions) => {
        return currentPromotions.map((p) => {
          if (p.id === promotion.id) {
            if (isCurrentlyAssociated) {
              // Remove the product
              return {
                ...p,
                products: p.products.filter(
                  (prod: any) => prod.productId !== productId
                ),
              };
            } else {
              // Add the product
              return {
                ...p,
                products: [
                  ...(p.products || []),
                  { productId, productType, uiElements: [] },
                ],
              };
            }
          }
          return p;
        });
      });

      // Update selectedPromotion if it's the current one
      if (selectedPromotion?.id === promotion.id) {
        if (isCurrentlyAssociated) {
          setSelectedPromotion({
            ...selectedPromotion,
            products: selectedPromotion.products.filter(
              (p: any) => p.productId !== productId
            ),
          });
        } else {
          setSelectedPromotion({
            ...selectedPromotion,
            products: [
              ...(selectedPromotion.products || []),
              { productId, productType, uiElements: [] },
            ],
          });
        }
      }

      toast({
        title: "Success",
        description: isCurrentlyAssociated
          ? "Product disassociated successfully"
          : "Product associated successfully",
      });
    } catch (error) {
      console.error("Failed to update product association:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to update product association",
        variant: "destructive",
      });
    }
  };

  const handleMarketAssociation = async (promotion: any, marketId: number) => {
    // This function now just updates the local state to reflect changes made directly
    // in the AssociationModal component

    // Check if market is already associated to toggle it
    const isCurrentlyAssociated = promotion.markets?.includes(marketId);

    // Update local state to reflect the toggle
    setPromotions((currentPromotions) => {
      return currentPromotions.map((p) => {
        if (p.id === promotion.id) {
          if (isCurrentlyAssociated) {
            // Remove the market
            return {
              ...p,
              markets: p.markets.filter((id: number) => id !== marketId),
            };
          } else {
            // Add the market
            return {
              ...p,
              markets: [...(p.markets || []), marketId],
            };
          }
        }
        return p;
      });
    });

    // Update selectedPromotion if it's the current one
    if (selectedPromotion?.id === promotion.id) {
      if (isCurrentlyAssociated) {
        setSelectedPromotion({
          ...selectedPromotion,
          markets: selectedPromotion.markets.filter(
            (id: number) => id !== marketId
          ),
        });
      } else {
        setSelectedPromotion({
          ...selectedPromotion,
          markets: [...(selectedPromotion.markets || []), marketId],
        });
      }
    }
  };

  const openProductAssociationModal = (promotion: any) => {
    setSelectedPromotion(promotion);
    setIsProductAssociationOpen(true);
  };

  const openMarketAssociationModal = (promotion: any) => {
    setSelectedPromotion(promotion);
    setIsMarketAssociationOpen(true);
  };

  const openUIElementModal = (
    newUIElementContextParam: NewUIElementContext
  ) => {
    console.log("Opening UI element modal for", newUIElementContextParam);
    setNewUIElementContext(newUIElementContextParam);
    setIsUIElementOpen(true);
  };

  const handleAddUIElement = async (newElement: UIElement) => {
    console.log("Adding UI element", newElement, newUIElementContext);
    const { promotionId, productId, productType, promoXproductID } =
      newUIElementContext;
    if (!promotionId) {
      toast({
        title: "Error",
        description: "Missing promotion or product information",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create the UI element and associate it with the product using Prisma transaction
      const result = await fetch("/api/ui-elements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          promotionId,
          element: newElement,
          productType: productType?.toLowerCase(),
          promoXproductID,
        }),
      });

      if (!result.ok) {
        const errorData = await result.json();
        throw new Error(errorData.error || "Failed to create UI element");
      }

      const data = await result.json();

      toast({
        title: "Success",
        description: "UI element created and associated successfully",
      });

      // Update the local state to reflect the new association
      setPromotions((currentPromotions) => {
        return currentPromotions.map((p) => {
          if (p.id === promotionId) {
            return {
              ...p,
              products: p.products.map((prod: any) => {
                if (prod.productId === productId) {
                  return {
                    ...prod,
                    uiElements: [...(prod.uiElements || []), data.element],
                  };
                }
                return prod;
              }),
            };
          }
          return p;
        });
      });

      // Close the modal
      setIsUIElementOpen(false);
    } catch (error) {
      console.error("Failed to associate UI element:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to associate UI element",
        variant: "destructive",
      });
    }
  };

  const handleRemoveUIElement = async (elementId: number) => {
    console.log("Removing UI element", elementId);

    try {
      const response = await fetch(`/api/ui-elements/${elementId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to remove UI element");
      }

      // Update local state to reflect UI element removal
      setPromotions((currentPromotions) => {
        return currentPromotions.map((p) => {
          return {
            ...p,
            products: p.products.map((prod: any) => {
              return {
                ...prod,
                uiElements: (prod.uiElements || []).filter(
                  (elem: any) => elem.id !== elementId
                ),
              };
            }),
          };
        });
      });

      toast({
        title: "Success",
        description: "UI element removed successfully",
      });
    } catch (error) {
      console.error("Failed to remove UI element:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to remove UI element",
        variant: "destructive",
      });
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedRows((current) =>
      current.includes(id)
        ? current.filter((rowId) => rowId !== id)
        : [...current, id]
    );
  };

  const totalPages = Math.ceil(promotions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPromotions = promotions.slice(startIndex, endIndex);

  const allProducts = [
    ...internetProducts.map((p) => ({ ...p, type: "Internet" })),
    ...tvProducts.map((p) => ({ ...p, type: "TV" })),
    ...voiceProducts.map((p) => ({ ...p, type: "Voice" })),
    ...equipment.map((p) => ({ ...p, type: "Equipment" })),
  ];

  if (!isClient) {
    return null;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Promotions</h2>
        <Button
          className="bg-[#1a237e] hover:bg-[#1a237e]/90"
          onClick={() => setIsOpen(true)}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Promotion
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date Range</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Promo Code</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <SortableContext
                items={currentPromotions.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                {currentPromotions.map((promotion) => {
                  const isExpanded = expandedRows.includes(promotion.id);
                  return (
                    <SortableRow
                      key={promotion.id}
                      promotion={promotion}
                      onAssociateProducts={openProductAssociationModal}
                      onAssociateMarkets={openMarketAssociationModal}
                      addUiElement={openUIElementModal}
                      isExpanded={isExpanded}
                      onToggleExpand={toggleExpand}
                      allProducts={allProducts}
                      markets={markets}
                    />
                  );
                })}
              </SortableContext>
            </TableBody>
          </Table>
        </DndContext>

        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(endIndex, promotions.length)}{" "}
            of {promotions.length} promotions
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <CreatePromotionModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onCreatePromotion={handleCreatePromotion}
      />

      <ProductAssociationModal
        isOpen={isProductAssociationOpen}
        onOpenChange={setIsProductAssociationOpen}
        selectedPromotion={selectedPromotion}
        allProducts={allProducts}
        onProductAssociation={handleProductAssociation}
      />

      <MarketAssociationModal
        isOpen={isMarketAssociationOpen}
        onOpenChange={setIsMarketAssociationOpen}
        selectedPromotion={selectedPromotion}
        onMarketAssociation={handleMarketAssociation}
      />

      <UIElementModal
        isOpen={isUIElementOpen}
        onOpenChange={setIsUIElementOpen}
        onAddUIElement={handleAddUIElement}
      />
    </div>
  );
}
