"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Link as LinkIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function MarketsPage() {
  const {
    data: markets = [],
    loading,
    error,
  } = useData<Market>("/api/markets");
  const { data: internetProducts = [] } = useData("/api/products/internet");
  const { data: tvProducts = [] } = useData("/api/products/tv");
  const { data: voiceProducts = [] } = useData("/api/products/voice");
  const { data: equipment = [] } = useData("/api/products/equipment");

  const [isOpen, setIsOpen] = useState(false);
  const [isAssociationOpen, setIsAssociationOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [newMarket, setNewMarket] = useState({
    label: "",
    key: "",
    csgCode: "",
    active: true,
    snapshotId: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const mockSnapshots = [
    { id: "1", description: "Spring Launch" },
    { id: "2", description: "Summer Update" },
  ];

  const handleCreateMarket = () => {
    const market: Market = {
      // id: (markets.length + 1),
      ...newMarket,
    };
    // TODO: Add API call to create market
    setIsOpen(false);
    setNewMarket({
      label: "",
      key: "",
      csgCode: "",
      active: true,
      snapshotId: "",
    });
  };

  const handleProductAssociation = (market: Market, productKey: string) => {
    // TODO: Add API call to update market-product association
  };

  const openAssociationModal = (market: Market) => {
    setSelectedMarket(market);
    setIsAssociationOpen(true);
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  const totalPages = Math.ceil(markets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMarkets = markets.slice(startIndex, endIndex);

  const ProductSection = ({
    title,
    products,
    keyExtractor,
  }: {
    title: string;
    products: any[];
    keyExtractor: (product: any) => string;
  }) => (
    <div className="space-y-4">
      <div className="sticky top-0 bg-white z-10 py-2">
        <h3 className="text-lg font-semibold text-[#1a237e]">{title}</h3>
        <Separator className="mt-2" />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[30px] h-8 text-xs"></TableHead>
            <TableHead className="h-8 text-xs">Name</TableHead>
            <TableHead className="h-8 text-xs">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={keyExtractor(product)}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() =>
                selectedMarket &&
                handleProductAssociation(selectedMarket, keyExtractor(product))
              }
            >
              <TableCell className="h-8 py-0">
                <Checkbox
                  checked={selectedMarket?.productKeys?.includes(
                    keyExtractor(product)
                  )}
                  onCheckedChange={() =>
                    selectedMarket &&
                    handleProductAssociation(
                      selectedMarket,
                      keyExtractor(product)
                    )
                  }
                  onClick={(e) => e.stopPropagation()}
                />
              </TableCell>
              <TableCell className="h-8 py-0">{product.name}</TableCell>
              <TableCell className="h-8 py-0">
                {"download_speed" in product && (
                  <span className="text-xs text-gray-500">
                    {product.download_speed}/{product.upload_speed} Mbps
                  </span>
                )}
                {"type" in product && "features" in product && (
                  <span className="text-xs text-gray-500">
                    {product.type} - {product.features.length} features
                  </span>
                )}
                {"monthly_price" in product && (
                  <span className="text-xs text-gray-500">
                    ${product.monthly_price}/mo
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Markets</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#1a237e] hover:bg-[#1a237e]/90">
              <Plus className="h-5 w-5 mr-2" />
              Add Market
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Market</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Label</label>
                <Input
                  value={newMarket.label}
                  onChange={(e) =>
                    setNewMarket({ ...newMarket, label: e.target.value })
                  }
                  placeholder="Market label"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Key</label>
                <Input
                  value={
                    newMarket.key ||
                    newMarket.label.toLowerCase().replace(/\s/g, "-")
                  }
                  onChange={(e) =>
                    setNewMarket({ ...newMarket, key: e.target.value })
                  }
                  placeholder="Market key"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  CSG Code (4 digits)
                </label>
                <Input
                  value={newMarket.csgCode}
                  onChange={(e) =>
                    setNewMarket({ ...newMarket, csgCode: e.target.value })
                  }
                  placeholder="1234"
                  maxLength={4}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Associated Snapshot
                </label>
                <Select
                  value={newMarket.snapshotId}
                  onValueChange={(value) =>
                    setNewMarket({ ...newMarket, snapshotId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a snapshot" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSnapshots.map((snapshot) => (
                      <SelectItem key={snapshot.id} value={snapshot.id}>
                        {snapshot.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleCreateMarket}
                disabled={
                  !newMarket.label || !newMarket.key || !newMarket.csgCode
                }
                className="w-full bg-[#1a237e] hover:bg-[#1a237e]/90"
              >
                Create Market
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
              <TableHead>Label</TableHead>
              <TableHead>CSG Code</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-8"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentMarkets.map((market) => (
              <TableRow key={market.id}>
                <TableCell>{market.key}</TableCell>
                <TableCell className="font-medium">{market.label}</TableCell>
                <TableCell>{market.csgCode}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      market.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {market.active ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openAssociationModal(market)}
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
            Showing {startIndex + 1} to {Math.min(endIndex, markets.length)} of{" "}
            {markets.length} markets
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
            <DialogTitle>Link Products to {selectedMarket?.label}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-8">
              <ProductSection
                title="Internet Products"
                products={internetProducts}
                keyExtractor={(product) => product.key}
              />
              <ProductSection
                title="TV Products"
                products={tvProducts}
                keyExtractor={(product) => product.id}
              />
              <ProductSection
                title="Voice Products"
                products={voiceProducts}
                keyExtractor={(product) => product.id}
              />
              <ProductSection
                title="Equipment"
                products={equipment}
                keyExtractor={(product) => product.id}
              />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
