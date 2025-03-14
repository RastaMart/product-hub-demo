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
import { ProductAssociation } from "@/lib/models/promotion";

interface PromotionRowProps {
  promotion: {
    key: string;
    name: string;
    start_date: string;
    end_date: string;
    triggers: any[];
    ui_elements: any[];
    products: ProductAssociation[];
    markets: string[];
  };
  isExpanded: boolean;
  onToggleExpand: (key: string) => void;
  onConfigureUI: (promotion: any) => void;
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
  onConfigureUI,
  onAssociateProducts,
  onAssociateMarkets,
  dragHandleProps,
  rowRef,
  style,
  allProducts = [],
  markets = [],
}: PromotionRowProps) {
  // Convert string dates to Date objects for formatting
  const startDate = new Date(promotion.start_date);
  const endDate = new Date(promotion.end_date);

  const getProductName = (productKey: string) => {
    const product = allProducts.find((p) =>
      "key" in p ? p.key === productKey : p.key === productKey
    );
    return product ? product.name : productKey;
  };

  const getMarketName = (marketId: string) => {
    const market = markets.find((m) => m.key === marketId);
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
              onClick={() => onToggleExpand(promotion.key)}
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
          <div className="text-sm">
            <div>{format(startDate, "MMM d, yyyy")}</div>
            <div className="text-gray-500">
              {format(endDate, "MMM d, yyyy")}
            </div>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex flex-wrap gap-1">
            {promotion.triggers.map((type, index) => (
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
          {promotion.triggers.map((type, index) => (
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
          <div className="flex flex-wrap gap-1">
            {promotion.ui_elements?.map(({ key }) => (
              <span
                key={key}
                className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700"
              >
                {key}
                {/* <Button onClick={() => handleRemoveUIElement("promotion", key)}>
                  X
                </Button> */}
              </span>
            ))}
          </div>
        </TableCell>
        <TableCell>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onConfigureUI(promotion)}
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
                  {promotion.products.map((pkg) => (
                    <div
                      key={pkg.productKey}
                      className="p-2 rounded-lg bg-white border"
                    >
                      <p className="font-medium">
                        {getProductName(pkg.productKey)}
                      </p>
                      {pkg.ui_elements.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {pkg.ui_elements.map(({ key }) => (
                            <span
                              key={key}
                              className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                            >
                              {key}
                            </span>
                          ))}

                          <Button
                            variant="outline"
                            size="sm"
                            className="px-2 py-0 h-6 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                            onClick={() =>
                              onConfigureUI({
                                promotionKey: promotion.key,
                                productKey: pkg.productKey,
                                productType: pkg.productType,
                                promoXproductID: pkg.relation_id,
                              })
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      {pkg.ui_elements.length === 0 && (
                        <div className="mt-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="px-2 py-0 h-6 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                            onClick={() =>
                              onConfigureUI({
                                promotionKey: promotion.key,
                                productKey: pkg.productKey,
                                productType: pkg.productType,
                                promoXproductID: pkg.relation_id,
                              })
                            }
                          >
                            <Plus className="h-3 w-3 mr-1" /> Add UI Element
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
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
