"use client";

import { useState } from "react";
import { Channel, CategoryType, DeliveryType, IPTVType } from "@/lib/models/channel";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChannelsPage() {
  const { data: channels = [], loading } = useData<Channel>('/api/channels');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const categories = ["Variety+", "Family+", "Locals+", "Add-ons"] as const;
  const subCategories = ["HBO", "Starz encore", "Movieplex", "cinemax"] as const;
  const types: DeliveryType[] = ["resi", "smb-private", "smb-public"];
  const iptvTypes: IPTVType[] = ["non-iptv", "iptv"];

  const startEdit = (channel: Channel, field: string) => {
    setEditingId(channel.id);
    setEditingField(field);
    setEditValue(channel[field as keyof Channel]);
  };

  const handleSave = async () => {
    if (!editingId || !editingField) return;

    try {
      // TODO: Add API call to update channel
      
      // Clear editing state
      cancelEdit();
    } catch (error) {
      console.error('Failed to update channel:', error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingField(null);
    setEditValue(null);
  };

  const handleCreateChannel = async () => {
    const newChannel: Channel = {
      id: crypto.randomUUID(),
      name: `New Channel ${channels.length + 1}`,
      channelNumber: channels.length + 1,
      isActive: true,
      icon: "📺",
      categories: ["Variety+"],
      types: ["resi"],
      iptvTypes: ["non-iptv"]
    };

    try {
      // TODO: Add API call to create channel
      
      setEditingId(newChannel.id);
      setEditingField("name");
      setEditValue(newChannel.name);
    } catch (error) {
      console.error('Failed to create channel:', error);
    }
  };

  const toggleCategory = async (channel: Channel, category: CategoryType) => {
    if (!channel.categories) return;

    const currentCategories = channel.categories;
    const exists = currentCategories.includes(category);
    
    let updatedCategories: CategoryType[];
    if (exists) {
      updatedCategories = currentCategories.filter(c => c !== category);
    } else {
      updatedCategories = [...currentCategories, category];
    }

    try {
      // TODO: Add API call to update channel categories
    } catch (error) {
      console.error('Failed to update channel categories:', error);
    }
  };

  const toggleType = async (channel: Channel, type: DeliveryType) => {
    if (!channel.types) return;

    const currentTypes = channel.types;
    const exists = currentTypes.includes(type);
    
    let updatedTypes: DeliveryType[];
    if (exists) {
      updatedTypes = currentTypes.filter(t => t !== type);
      if (updatedTypes.length === 0) updatedTypes = [type]; // Ensure at least one type
    } else {
      updatedTypes = [...currentTypes, type];
    }

    try {
      // TODO: Add API call to update channel types
    } catch (error) {
      console.error('Failed to update channel types:', error);
    }
  };

  const toggleIPTVType = async (channel: Channel, iptvType: IPTVType) => {
    if (!channel.iptvTypes) return;

    const currentTypes = channel.iptvTypes;
    const exists = currentTypes.includes(iptvType);
    
    let updatedTypes: IPTVType[];
    if (exists) {
      updatedTypes = currentTypes.filter(t => t !== iptvType);
      if (updatedTypes.length === 0) updatedTypes = [iptvType]; // Ensure at least one type
    } else {
      updatedTypes = [...currentTypes, iptvType];
    }

    try {
      // TODO: Add API call to update channel IPTV types
    } catch (error) {
      console.error('Failed to update channel IPTV types:', error);
    }
  };

  const handleStatusChange = async (channel: Channel, isActive: boolean) => {
    try {
      // TODO: Add API call to update channel status
    } catch (error) {
      console.error('Failed to update channel status:', error);
    }
  };

  const handleSubCategoryChange = async (channel: Channel, subCategory: typeof subCategories[number]) => {
    try {
      // TODO: Add API call to update channel sub-category
    } catch (error) {
      console.error('Failed to update channel sub-category:', error);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  const totalPages = Math.ceil(channels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentChannels = channels.slice(startIndex, endIndex);

  const renderEditableCell = (channel: Channel, field: string) => {
    const isEditing = editingId === channel.id && editingField === field;

    if (!isEditing) {
      return (
        <div
          className="cursor-pointer hover:bg-gray-50 p-2 rounded"
          onClick={() => startEdit(channel, field)}
        >
          {channel[field as keyof Channel]}
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="h-8"
          autoFocus
        />
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-green-600"
          onClick={handleSave}
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-red-600"
          onClick={cancelEdit}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">TV Channels</h2>
        <Button 
          className="bg-[#1a237e] hover:bg-[#1a237e]/90"
          onClick={handleCreateChannel}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Channel
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Number</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead>Sub Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>IPTV</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentChannels.map((channel) => (
              <TableRow key={channel.id}>
                <TableCell>
                  {editingId === channel.id && editingField === "icon" ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="h-8 w-20"
                        autoFocus
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-green-600"
                        onClick={handleSave}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-red-600"
                        onClick={cancelEdit}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="text-2xl cursor-pointer hover:bg-gray-50 p-2 rounded"
                      onClick={() => startEdit(channel, "icon")}
                    >
                      {channel.icon}
                    </div>
                  )}
                </TableCell>
                <TableCell>{renderEditableCell(channel, "name")}</TableCell>
                <TableCell>{renderEditableCell(channel, "channelNumber")}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {categories.map((category) => (
                      <div
                        key={category}
                        onClick={() => toggleCategory(channel, category)}
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors",
                          channel.categories?.includes(category)
                            ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        )}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {channel.categories?.includes("Add-ons") && (
                    <Select
                      value={channel.subCategory}
                      onValueChange={(value: typeof subCategories[number]) => {
                        handleSubCategoryChange(channel, value);
                      }}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select sub-category" />
                      </SelectTrigger>
                      <SelectContent>
                        {subCategories.map((subCategory) => (
                          <SelectItem key={subCategory} value={subCategory}>
                            {subCategory}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {types.map((type) => (
                      <div
                        key={type}
                        onClick={() => toggleType(channel, type)}
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors",
                          channel.types?.includes(type)
                            ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        )}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {iptvTypes.map((type) => (
                      <div
                        key={type}
                        onClick={() => toggleIPTVType(channel, type)}
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors",
                          channel.iptvTypes?.includes(type)
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        )}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={channel.isActive}
                    onCheckedChange={(checked) => handleStatusChange(channel, checked)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(endIndex, channels.length)} of{" "}
            {channels.length} channels
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
    </div>
  );
}