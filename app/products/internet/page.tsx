"use client";

import { useState } from "react";
import { InternetProduct } from "@/lib/models/internet";
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

export default function InternetProductsPage() {
  const { data: markets = [] } = useData<Market>('/api/markets');
  const { data: products = [], loading } = useData<InternetProduct>('/api/products/internet');
  const [isOpen, setIsOpen] = useState(false);
  const [isAssociationOpen, setIsAssociationOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<InternetProduct | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<InternetProduct>>({
    technology: [],
    download_speed: 0,
    upload_speed: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const technologies = ["coax", "Fiber G", "Fiber P"] as const;

  const handleCreateProduct = () => {
    if (!newProduct.key || !newProduct.name) return;

    const product: InternetProduct = {
      id: crypto.randomUUID(),
      key: newProduct.key,
      name: newProduct.name,
      download_speed: newProduct.download_speed || 0,
      upload_speed: newProduct.upload_speed || 0,
      technology: newProduct.technology || [],
      idealFor: newProduct.idealFor || "Up to 3 devices",
      promoBanner: newProduct.promoBanner,
      promoMonths: newProduct.promoMonths,
      banner: newProduct.banner
    };

    // TODO: Add API call to create product
    setIsOpen(false);
    setNewProduct({
      technology: [],
      download_speed: 0,
      upload_speed: 0
    });
  };

  const handleMarketAssociation = (product: InternetProduct, marketId: string) => {
    // TODO: Add API call to update market-product association
  };

  const openAssociationModal = (product: InternetProduct) => {
    setSelectedProduct(product);
    setIsAssociationOpen(true);
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
        <h2 className="text-3xl font-bold text-gray-900">Internet Products</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#1a237e] hover:bg-[#1a237e]/90">
              <Plus className="h-5 w-5 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Internet Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Product Key</label>
                <Input
                  value={newProduct.key || ''}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, key: e.target.value })
                  }
                  placeholder="P100"
                />
              </div>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Download Speed (Mbps)</label>
                  <Input
                    type="number"
                    value={newProduct.download_speed || ''}
                    onChange={(e) => setNewProduct({
                      ...newProduct,
                      download_speed: parseInt(e.target.value) || 0
                    })}
                    placeholder="100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Upload Speed (Mbps)</label>
                  <Input
                    type="number"
                    value={newProduct.upload_speed || ''}
                    onChange={(e) => setNewProduct({
                      ...newProduct,
                      upload_speed: parseInt(e.target.value) || 0
                    })}
                    placeholder="10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Technologies</label>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <Button
                      key={tech}
                      variant={newProduct.technology?.includes(tech) ? "default" : "outline"}
                      onClick={() => {
                        const currentTech = newProduct.technology || [];
                        setNewProduct({
                          ...newProduct,
                          technology: currentTech.includes(tech)
                            ? currentTech.filter(t => t !== tech)
                            : [...currentTech, tech]
                        });
                      }}
                      className={newProduct.technology?.includes(tech) ? "bg-[#1a237e]" : ""}
                    >
                      {tech}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Ideal For</label>
                <Input
                  value={newProduct.idealFor || ''}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, idealFor: e.target.value })
                  }
                  placeholder="Up to X devices"
                />
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
              <Button
                onClick={handleCreateProduct}
                disabled={!newProduct.key || !newProduct.name || !newProduct.technology?.length}
                className="w-full bg-[#1a237e] hover:bg-[#1a237e]/90"
              >
                Create Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Speed (Down/Up)</TableHead>
              <TableHead>Technology</TableHead>
              <TableHead>Ideal For</TableHead>
              <TableHead>Promo</TableHead>
              <TableHead className="w-8"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.key}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.download_speed || 0}/{product.upload_speed || 0} Mbps</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {product.technology?.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{product.idealFor}</TableCell>
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