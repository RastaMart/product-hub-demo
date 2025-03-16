import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  ChevronDown,
  ChevronRight,
  GripVertical,
  Settings2,
  LinkIcon,
  Plus,
} from "lucide-react";
import { ProductAssociation, Promotion } from "@/lib/models/promotion";

interface PromotionRowProps {
  promotion: Promotion;
  isExpanded: boolean;
  onToggleExpand: (id: number) => void;
  addUiElement: (promotion: any) => void;
  onAssociateProducts?: (promotion: any) => void;
  onAssociateMarkets?: (promotion: any) => void;
  dragHandleProps: any;
  rowRef:
    | React.RefObject<HTMLTableRowElement>
    | ((element: HTMLTableRowElement) => void);
  style: React.CSSProperties;
  allProducts?: any[];
  markets?: any[];
}

export function PromotionRow({
  promotion,
  isExpanded,
  onToggleExpand,
  addUiElement,
  onAssociateProducts,
  onAssociateMarkets,
  dragHandleProps,
  rowRef,
  style,
  allProducts = [],
  markets = [],
}: PromotionRowProps) {
  const getProductName = (productId: number) => {
    const product = allProducts.find((p) => p.id === productId);
    return product?.name;
  };

  const getMarketName = (marketId: string) => {
    const market = markets.find((m) => m.id === marketId);
    return market ? market.label : marketId;
  };

  return (
    <>
      <TableRow ref={rowRef} style={style}>
        <TableCell>
          <div className="flex items-center gap-2">
            <button
              {...dragHandleProps}
              className="cursor-grab hover:text-blue-600 touch-none"
            >
              <GripVertical className="h-4 w-4" />
            </button>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 hover:bg-transparent"
              onClick={() => onToggleExpand(promotion.id)}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <span className="font-medium">{promotion.name}</span>
            </Button>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex flex-wrap gap-1">
            {promotion.triggers?.map((type, index) => (
              <div key={index} className="space-y-1">
                {type.siteWide && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    Site Wide
                  </span>
                )}
                {type.cmsBlock && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                    CMS Block
                  </span>
                )}
              </div>
            ))}
          </div>
        </TableCell>
        <TableCell>
          {promotion.triggers?.map((type, index) => (
            <div key={index} className="space-y-1">
              {type.promoCode && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  {type.promoCode}
                </span>
              )}
            </div>
          ))}
        </TableCell>
        <TableCell>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                addUiElement({
                  promotionId: promotion.id,
                  promotionKey: promotion.key,
                })
              }
              className="h-8 w-8"
              title="Configure UI Elements"
            >
              <Settings2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>

      {isExpanded && (
        <TableRow className="bg-gray-50">
          <TableCell colSpan={6} className="p-4">
            <div className="space-y-4 px-8">
              <div>
                <h4 className="text-sm font-medium mb-2">UI Elements</h4>
                <div className="grid grid-cols-2 gap-2"></div>
                {promotion.uiElements?.map((uiElement) => (
                  <span
                    key={uiElement.key}
                    className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    {uiElement.key}
                    {/* <Button
                      onClick={() => handleRemoveUIElement("promotion", key)}
                    >
                      X
                    </Button> */}
                  </span>
                ))}

                <Button
                  title="Add UI Elements"
                  variant="outline"
                  size="sm"
                  className="px-2 py-0 h-6 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                  onClick={() =>
                    addUiElement({
                      promotionId: promotion.id,
                      promotionKey: promotion.key,
                    })
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">
                  Associated Products
                  {onAssociateProducts && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onAssociateProducts(promotion)}
                      className="h-8 w-8"
                      title="Associate Products"
                    >
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  )}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {promotion.products.map((pkg) => {
                    return (
                      <div
                        key={pkg.productId}
                        className="p-2 rounded-lg bg-white border"
                      >
                        <p className="font-medium">
                          {getProductName(pkg.productId)}
                        </p>
                        {pkg.uiElements.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {pkg.uiElements.map((uiElement) => (
                              <span
                                key={uiElement.key}
                                className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                              >
                                {uiElement.key}
                              </span>
                            ))}

                            <Button
                              title="Add UI Elements"
                              variant="outline"
                              size="sm"
                              className="px-2 py-0 h-6 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                              onClick={() =>
                                addUiElement({
                                  promotionId: promotion.id,
                                  promotionKey: promotion.key,
                                  productId: pkg.productId,
                                  productType: pkg.productType,
                                  promoXproductID: pkg.id,
                                })
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        {pkg.uiElements?.length === 0 && (
                          <div className="mt-1">
                            <Button
                              title="Add UI Elements"
                              variant="outline"
                              size="sm"
                              className="px-2 py-0 h-6 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                              onClick={() =>
                                addUiElement({
                                  promotionId: promotion.id,
                                  promotionKey: promotion.key,
                                  productId: pkg.productId,
                                  productType: pkg.productType,
                                  promoXproductID: pkg.id,
                                })
                              }
                            >
                              <Plus className="h-3 w-3 mr-1" /> Add UI Element
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">
                  Associated Markets
                  {onAssociateMarkets && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onAssociateMarkets(promotion)}
                      className="h-8 w-8"
                      title="Associate Markets"
                    >
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  )}
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {promotion.markets?.map((marketId) => (
                    <div
                      key={marketId}
                      className="p-2 rounded-lg bg-white border"
                    >
                      <p className="text-sm">{getMarketName(marketId)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}
