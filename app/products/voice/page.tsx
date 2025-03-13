"use client";

import { useState } from "react";
import { VoiceProduct } from "@/lib/models/voice";
import { Market } from "@/lib/models/market";
import { useData } from "@/lib/hooks/use-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Link as LinkIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function VoiceProductsPage() {
  const { data: markets = [] } = useData<Market>('/api/markets');
  const { data: products = [], loading } = useData<VoiceProduct>('/api/voice');
  const [isOpen, setIsOpen] = useState(false);
  const [isAssociationOpen, setIsAssociationOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<VoiceProduct | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<VoiceProduct>>({
    type: "VoIP",
    features: [],
    monthlyPrice: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const types = ["Landline", "VoIP"] as const;
  const commonFeatures = [
    "Unlimited Local & Long Distance",
    "Caller ID",
    "Call Waiting",
    "Voicemail",
    "Call Forwarding",
    "Conference Calling",
    "Auto Attendant",
    "Business Voicemail"
  ];

  const handleCreateProduct = () => {
    if (!newProduct.name) return;

    const product: VoiceProduct = {
      id: crypto.randomUUID(),
      name: newProduct.name,
      type: newProduct.type || "VoIP",
      features: newProduct.features || [],
      monthlyPrice: newProduct.monthlyPrice || 0,
      promoBanner: newProduct.promoBanner,
      promoMonths: newProduct.promoMonths
    };

    // TODO: Add API call to create product
    setIsOpen(false);
    setNewProduct({
      type: "VoIP",
      features: [],
      monthlyPrice: 0
    });
  };

  const handleMarketAssociation = (product: VoiceProduct, marketId: string) => {
    // TODO: Add API call to update market-product association
  };

  const openAssociationModal = (product: VoiceProduct) => {
    setSelectedProduct(product);
    setIsAssociationOpen(true);
  };

  const toggleFeature = (feature: string) => {
    const currentFeatures = newProduct.features || [];
    const exists = currentFeatures.includes(feature);
    
    setNewProduct({
      ...newProduct,
      features: exists
        ? currentFeatures.filter(f => f !== feature)
        : [...currentFeatures, feature]
    });
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Voice Products</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#1a237e] hover:bg-[#1a237e]/90">
              <Plus className="h-5 w-5 mr-2" />
              Add Voice Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Voice Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={newProduct.name || ''}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  placeholder="Product name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <Button
                      key={type}
                      variant={newProduct.type === type ? "default" : "outline"}
                      onClick={() => setNewProduct({ ...newProduct, type })}
                      className={newProduct.type === type ? "bg-[#1a237e]" : ""}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Monthly Price ($)</label>
                <Input
                  type="number"
                  value={newProduct.monthlyPrice || ''}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, monthlyPrice: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="24.99"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Features</label>
                <div className="grid grid-cols-2 gap-2">
                  {commonFeatures.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center space-x-2"
                      onClick={() => toggleFeature(feature)}
                    >
                      <Checkbox
                        checked={(newProduct.features || []).includes(feature)}
                        onCheckedChange={() => toggleFeature(feature)}
                      />
                      <label className="text-sm cursor-pointer">{feature}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Promo Banner</label>
                <Input
                  value={newProduct.promoBanner || ''}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, promoBanner: e.target.value })
                  }
                  placeholder="Special offer description"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Promo Duration (months)</label>
                <Input
                  type="number"
                  value={newProduct.promoMonths || ''}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, promoMonths: parseInt(e.target.value) || undefined })
                  }
                  placeholder="3"
                />
              </div>
              <Button
                onClick={handleCreateProduct}
                disabled={!newProduct.name || !newProduct.type}
                className="w-full bg-[#1a237e] hover:bg-[#1a237e]/90"
              >
                Create Voice Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Features</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Promo</TableHead>
              <TableHead className="w-8"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {product.type}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {product.features?.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>${(product.monthlyPrice || 0).toFixed(2)}/mo</TableCell>
                <TableCell>
                  {product.promoBanner && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {product.promoMonths} months
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openAssociationModal(product)}
                    className="h-8 w-8"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(endIndex, products.length)} of{" "}
            {products.length} products
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

      <Dialog open={isAssociationOpen} onOpenChange={setIsAssociationOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Link Markets to {selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[600px] pr-4">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[30px] h-8 text-xs"></TableHead>
                  <TableHead className="h-8 text-xs">Market</TableHead>
                  <TableHead className="h-8 text-xs">Code</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {markets.map((market) => (
                  <TableRow
                    key={market.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => selectedProduct && handleMarketAssociation(selectedProduct, market.id)}
                  >
                    <TableCell className="h-8 py-0">
                      <Checkbox
                        checked={selectedProduct?.marketIds?.includes(market.id)}
                        onCheckedChange={() => selectedProduct && handleMarketAssociation(selectedProduct, market.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell className="h-8 py-0">{market.label}</TableCell>
                    <TableCell className="h-8 py-0">{market.code}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}