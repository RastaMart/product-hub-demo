"use client";

import { useState } from "react";
import { Promotion, UIElement } from "@/lib/models/promotion";
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
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UIElementModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPromotion: Promotion | null;
  onAddUIElement: (element: UIElement) => void;
  onRemoveUIElement: (elementKey: string) => void;
}

export function UIElementModal({
  isOpen,
  onOpenChange,
  selectedPromotion,
  onAddUIElement,
  onRemoveUIElement,
}: UIElementModalProps) {
  const [newUIElement, setNewUIElement] = useState<Partial<UIElement>>({
    key: '',
    txt_text: '',
    img_desktopImgUrl: '',
    img_mobileImgUrl: '',
    img_alt: ''
  });
  const [isNewElementFormVisible, setIsNewElementFormVisible] = useState(false);
  const [selectedKeyDefinition, setSelectedKeyDefinition] = useState<UIKeyDefinition | null>(null);

  const handleKeySelection = (key: string) => {
    const keyDef = uiKeyList.find(k => k.key === key);
    setSelectedKeyDefinition(keyDef || null);
    setNewUIElement({ 
      ...newUIElement, 
      key,
      txt_text: '',
      img_desktopImgUrl: '',
      img_mobileImgUrl: '',
      img_alt: ''
    });
  };

  const handleAddUIElement = () => {
    if (!newUIElement.key) return;
    onAddUIElement(newUIElement as UIElement);
    setNewUIElement({
      key: '',
      txt_text: '',
      img_desktopImgUrl: '',
      img_mobileImgUrl: '',
      img_alt: ''
    });
    setSelectedKeyDefinition(null);
    setIsNewElementFormVisible(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Configure UI Elements for {selectedPromotion?.name}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1">
          <div className="space-y-6 pr-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Current UI Elements</h3>
              <div className="space-y-4">
                {selectedPromotion?.ui_elements.map((element) => (
                  <div
                    key={element.key}
                    className="flex items-start justify-between p-4 rounded-lg border"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{element.key}</span>
                        <span className="text-sm text-gray-500">
                          {uiKeyList.find(k => k.key === element.key)?.description}
                        </span>
                      </div>
                      {element.txt_text && (
                        <p className="text-sm">{element.txt_text}</p>
                      )}
                      {element.img_desktopImgUrl && (
                        <p className="text-sm text-gray-500">Desktop Image: {element.img_desktopImgUrl}</p>
                      )}
                      {element.img_mobileImgUrl && (
                        <p className="text-sm text-gray-500">Mobile Image: {element.img_mobileImgUrl}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveUIElement(element.key)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Button
                variant="outline"
                onClick={() => setIsNewElementFormVisible(!isNewElementFormVisible)}
                className="w-full flex items-center justify-between"
              >
                <span>Add New UI Element</span>
                {isNewElementFormVisible ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>

              {isNewElementFormVisible && (
                <div className="space-y-4 border rounded-lg p-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Element Key</label>
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
                                <div className="text-xs text-gray-500">{keyDef.description}</div>
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
                            <label className="text-sm font-medium">Text Content</label>
                            <Input
                              value={newUIElement.txt_text}
                              onChange={(e) => setNewUIElement({ ...newUIElement, txt_text: e.target.value })}
                              placeholder="Enter text content"
                            />
                          </div>
                        )}

                        {selectedKeyDefinition.type === "image" && (
                          <>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Desktop Image URL</label>
                              <Input
                                value={newUIElement.img_desktopImgUrl}
                                onChange={(e) => setNewUIElement({ ...newUIElement, img_desktopImgUrl: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Mobile Image URL</label>
                              <Input
                                value={newUIElement.img_mobileImgUrl}
                                onChange={(e) => setNewUIElement({ ...newUIElement, img_mobileImgUrl: e.target.value })}
                                placeholder="https://example.com/mobile-image.jpg"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Image Alt Text</label>
                              <Input
                                value={newUIElement.img_alt}
                                onChange={(e) => setNewUIElement({ ...newUIElement, img_alt: e.target.value })}
                                placeholder="Image description"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    <Button
                      onClick={handleAddUIElement}
                      disabled={!newUIElement.key || (selectedKeyDefinition?.type === "text" && !newUIElement.txt_text) || (selectedKeyDefinition?.type === "image" && !newUIElement.img_desktopImgUrl)}
                      className="w-full bg-[#1a237e] hover:bg-[#1a237e]/90"
                    >
                      Add UI Element
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}