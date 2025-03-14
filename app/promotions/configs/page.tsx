"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { UIKeyDefinition } from "@/lib/models/ui_elementType";
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
import { Plus, Trash2 } from "lucide-react";
import { useData } from "@/lib/hooks/use-data";
import { useToast } from "@/hooks/use-toast";

export default function ConfigsPage() {
  const { data: elements = [], loading } =
    useData<UIKeyDefinition>("/api/ui-elements");
  const [isOpen, setIsOpen] = useState(false);
  const [newElement, setNewElement] = useState<Partial<UIKeyDefinition>>({
    type: "text",
  });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateElement = async () => {
    if (!newElement.key || !newElement.description || !newElement.type) return;

    setIsSubmitting(true);
    try {
      console.log("newElement", newElement);
      const response = await fetch("/api/ui-elements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newElement),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create UI element");
      }

      // Close modal and reset form
      setIsOpen(false);
      setNewElement({ type: "text" });

      // Show success toast
      toast({
        title: "Success",
        description: "UI element type created successfully",
      });

      // Refresh the page to get updated data
      window.location.reload();
    } catch (error) {
      console.error("Failed to create UI element:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to create UI element type",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveElement = async (key: string) => {
    try {
      const response = await fetch(`/api/ui-elements/${key}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete UI element");
      }

      // Show success toast
      toast({
        title: "Success",
        description: "UI element type deleted successfully",
      });

      // Refresh the page to get updated data
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete UI element:", error);
      toast({
        title: "Error",
        description: "Failed to delete UI element type",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">UI Element Types</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#1a237e] hover:bg-[#1a237e]/90">
              <Plus className="h-5 w-5 mr-2" />
              Add UI Element Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New UI Element Type</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Key</label>
                <Input
                  value={newElement.key || ""}
                  onChange={(e) =>
                    setNewElement({ ...newElement, key: e.target.value })
                  }
                  placeholder="cart-header-text"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Input
                  value={newElement.description || ""}
                  onChange={(e) =>
                    setNewElement({
                      ...newElement,
                      description: e.target.value,
                    })
                  }
                  placeholder="Text displayed in the cart header"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select
                  value={newElement.type}
                  onValueChange={(value: "text" | "image") =>
                    setNewElement({ ...newElement, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleCreateElement}
                disabled={
                  !newElement.key || !newElement.description || isSubmitting
                }
                className="w-full bg-[#1a237e] hover:bg-[#1a237e]/90"
              >
                {isSubmitting ? "Creating..." : "Create UI Element Type"}
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
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="w-8"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {elements.map((element) => (
              <TableRow key={element.key}>
                <TableCell className="font-medium">{element.key}</TableCell>
                <TableCell>{element.description}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      element.type === "text"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {element.type}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveElement(element.key)}
                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
