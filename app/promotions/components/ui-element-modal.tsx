"use client";

import { useState } from "react";
import { UIKeyDefinition, uiKeyList } from "@/lib/models/ui-keys";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useData } from "@/lib/hooks/use-data";
import { UIElement, UIElementType } from "@/lib/models/ui-element";

interface UIElementModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddUIElement: (element: UIElement) => void;
}

export function UIElementModal({
  isOpen,
  onOpenChange,
  onAddUIElement,
}: UIElementModalProps) {
  const [newUIElement, setNewUIElement] = useState<Partial<UIElement>>({
    key: "",
    txt_text: "",
    img_desktopImgUrl: "",
    img_mobileImgUrl: "",
    img_alt: "",
  });
  const [selectedKeyDefinition, setSelectedKeyDefinition] =
    useState<UIKeyDefinition | null>(null);

  const handleKeySelection = (key: string) => {
    const keyDef = uiKeyList.find((k) => k.key === key);
    setSelectedKeyDefinition(keyDef || null);
    setNewUIElement({
      ...newUIElement,
      key,
      txt_text: "",
      img_desktopImgUrl: "",
      img_mobileImgUrl: "",
      img_alt: "",
    });
  };

  const handleAddUIElement = () => {
    if (!newUIElement.key) return;
    onAddUIElement(newUIElement as UIElement);
    setNewUIElement({
      key: "",
      txt_text: "",
      img_desktopImgUrl: "",
      img_mobileImgUrl: "",
      img_alt: "",
    });
    setSelectedKeyDefinition(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Add a new UI elements</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="space-y-6 pr-4">
            <div className="space-y-4">
              <div className="space-y-4 border rounded-lg p-4">
                <div className="space-y-6">
                  <Select
                    value={newUIElement.key}
                    onValueChange={handleKeySelection}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a key" />
                    </SelectTrigger>
                    <SelectContent>
                      {uiKeyList.map((keyDef) => (
                        <SelectItem key={keyDef.key} value={keyDef.key}>
                          <div className="space-y-1">
                            <div>{keyDef.key}</div>
                            <div className="text-xs text-gray-500">
                              {keyDef.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedKeyDefinition && (
                  <div className="space-y-4">
                    {selectedKeyDefinition.type === "text" && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Text Content
                        </label>
                        <Input
                          value={newUIElement.txt_text}
                          onChange={(e) =>
                            setNewUIElement({
                              ...newUIElement,
                              txt_text: e.target.value,
                            })
                          }
                          placeholder="Enter text content"
                        />
                      </div>
                    )}

                    {selectedKeyDefinition.type === "image" && (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Desktop Image URL
                          </label>
                          <Input
                            value={newUIElement.img_desktopImgUrl}
                            onChange={(e) =>
                              setNewUIElement({
                                ...newUIElement,
                                img_desktopImgUrl: e.target.value,
                              })
                            }
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Mobile Image URL
                          </label>
                          <Input
                            value={newUIElement.img_mobileImgUrl}
                            onChange={(e) =>
                              setNewUIElement({
                                ...newUIElement,
                                img_mobileImgUrl: e.target.value,
                              })
                            }
                            placeholder="https://example.com/mobile-image.jpg"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Image Alt Text
                          </label>
                          <Input
                            value={newUIElement.img_alt}
                            onChange={(e) =>
                              setNewUIElement({
                                ...newUIElement,
                                img_alt: e.target.value,
                              })
                            }
                            placeholder="Image description"
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}

                <Button
                  onClick={handleAddUIElement}
                  disabled={
                    !newUIElement.key ||
                    (selectedKeyDefinition?.type === "text" &&
                      !newUIElement.txt_text) ||
                    (selectedKeyDefinition?.type === "image" &&
                      !newUIElement.img_desktopImgUrl)
                  }
                  className="w-full bg-[#1a237e] hover:bg-[#1a237e]/90"
                >
                  Add UI Element
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
