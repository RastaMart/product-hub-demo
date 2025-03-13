"use client";

import { useState } from "react";
import { Equipment } from "@/lib/models/equipment";
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

export default function EquipmentPage() {
  const { data: markets = [] } = useData<Market>('/api/markets');
  const { data: equipment = [], loading } = useData<Equipment>('/api/equipment');
  const [isOpen, setIsOpen] = useState(false);
  const [isAssociationOpen, setIsAssociationOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [newEquipment, setNewEquipment] = useState<Partial<Equipment>>({
    type: "Router",
    features: [],
    compatibility: {},
    monthlyPrice: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const types = ["Router", "Modem", "TV Box", "Phone"] as const;
  const commonFeatures = {
    Router: [
      "WiFi 6 Technology",
      "Dual-Band",
      "4x4 MIMO",
      "Remote Management",
      "Parental Controls",
      "Guest Network"
    ],
    Modem: [
      "DOCSIS 3.1",
      "Gigabit Ethernet",
      "IPv6 Support",
      "QoS Management"
    ],
    "TV Box": [
      "4K HDR",
      "Voice Remote",
      "Bluetooth",
      "WiFi 6",
      "DVR Capability",
      "Smart Home Integration"
    ],
    Phone: [
      "HD Voice",
      "LCD Display",
      "Conference Calling",
      "Power over Ethernet",
      "Call Forwarding",
      "Voicemail"
    ]
  };

  const handleCreateEquipment = () => {
    if (!newEquipment.name || !newEquipment.type) return;

    const equipment: Equipment = {
      id: crypto.randomUUID(),
      name: newEquipment.name,
      type: newEquipment.type,
      features: newEquipment.features || [],
      compatibility: newEquipment.compatibility || {},
      monthlyPrice: newEquipment.monthlyPrice || 0,
      promoBanner: newEquipment.promoBanner,
      promoMonths: newEquipment.promoMonths
    };

    // TODO: Add API call to create equipment
    setIsOpen(false);
    setNewEquipment({
      type: "Router",
      features: [],
      compatibility: {},
      monthlyPrice: 0
    });
  };

  const handleMarketAssociation = (equipment: Equipment, marketId: string) => {
    // TODO: Add API call to update market-equipment association
  };

  const openAssociationModal = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setIsAssociationOpen(true);
  };

  const toggleFeature = (feature: string) => {
    const currentFeatures = newEquipment.features || [];
    const exists = currentFeatures.includes(feature);
    
    setNewEquipment({
      ...newEquipment,
      features: exists
        ? currentFeatures.filter(f => f !== feature)
        : [...currentFeatures, feature]
    });
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  const totalPages = Math.ceil(equipment.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEquipment = equipment.slice(startIndex, endIndex);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Equipment</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#1a237e] hover:bg-[#1a237e]/90">
              <Plus className="h-5 w-5 mr-2" />
              Add Equipment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Equipment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={newEquipment.name || ''}
                  onChange={(e) =>
                    setNewEquipment({ ...newEquipment, name: e.target.value })
                  }
                  placeholder="Equipment name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <div className="flex flex-wrap gap-2">
                  {types.map((type) => (
                    <Button
                      key={type}
                      variant={newEquipment.type === type ? "default" : "outline"}
                      onClick={() => setNewEquipment({ ...newEquipment, type, features: [] })}
                      className={newEquipment.type === type ? "bg-[#1a237e]" : ""}
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
                  value={newEquipment.monthlyPrice || ''}
                  onChange={(e) =>
                    setNewEquipment({ ...newEquipment, monthlyPrice: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="9.99"
                  step="0.01"
                />
              </div>
              {newEquipment.type && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Features</label>
                  <div className="grid grid-cols-2 gap-2">
                    {commonFeatures[newEquipment.type].map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center space-x-2"
                        onClick={() => toggleFeature(feature)}
                      >
                        <Checkbox
                          checked={(newEquipment.features || []).includes(feature)}
                          onCheckedChange={() => toggleFeature(feature)}
                        />
                        <label className="text-sm cursor-pointer">{feature}</label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium">Promo Banner</label>
                <Input
                  value={newEquipment.promoBanner || ''}
                  onChange={(e) =>
                    setNewEquipment({ ...newEquipment, promoBanner: e.target.value })
                  }
                  placeholder="Special offer description"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Promo Duration (months)</label>
                <Input
                  type="number"
                  value={newEquipment.promoMonths || ''}
                  onChange={(e) =>
                    setNewEquipment({ ...newEquipment, promoMonths: parseInt(e.target.value) || undefined })
                  }
                  placeholder="12"
                />
              </div>
              <Button
                onClick={handleCreateEquipment}
                disabled={!newEquipment.name || !newEquipment.type}
                className="w-full bg-[#1a237e] hover:bg-[#1a237e]/90"
              >
                Add Equipment
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
            {currentEquipment.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {item.type}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {item.features?.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>${(item.monthlyPrice || 0).toFixed(2)}/mo</TableCell>
                <TableCell>
                  {item.promoBanner && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {item.promoMonths} months
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openAssociationModal(item)}
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
            Showing {startIndex + 1} to {Math.min(endIndex, equipment.length)} of{" "}
            {equipment.length} equipment
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
            <DialogTitle>Link Markets to {selectedEquipment?.name}</DialogTitle>
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
                    onClick={() => selectedEquipment && handleMarketAssociation(selectedEquipment, market.id)}
                  >
                    <TableCell className="h-8 py-0">
                      <Checkbox
                        checked={selectedEquipment?.marketIds?.includes(market.id)}
                        onCheckedChange={() => selectedEquipment && handleMarketAssociation(selectedEquipment, market.id)}
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