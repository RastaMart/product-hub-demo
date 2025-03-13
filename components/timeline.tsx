"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Clock, Plus, Edit2, Lock, Calendar as CalendarIcon, ChevronRight, ChevronLeft } from "lucide-react";
import { format } from "date-fns";

interface Snapshot {
  id: string;
  date: Date;
  time: string;
  description: string;
}

export function Timeline() {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([
    {
      id: "1",
      date: new Date(2024, 2, 1),
      time: "09:00",
      description: "Spring Collection Launch"
    },
    {
      id: "2",
      date: new Date(2024, 3, 15),
      time: "14:30",
      description: "Summer Promotions"
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [description, setDescription] = useState("");
  const [editingSnapshot, setEditingSnapshot] = useState<Snapshot | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCreateSnapshot = () => {
    if (selectedDate && selectedTime) {
      const newSnapshot: Snapshot = {
        id: Date.now().toString(),
        date: selectedDate,
        time: selectedTime,
        description
      };
      setSnapshots([...snapshots, newSnapshot].sort((a, b) => b.date.getTime() - a.date.getTime()));
      setIsOpen(false);
      resetForm();
    }
  };

  const handleEditSnapshot = () => {
    if (editingSnapshot && selectedDate && selectedTime) {
      const updatedSnapshots = snapshots.map(snapshot =>
        snapshot.id === editingSnapshot.id
          ? {
              ...snapshot,
              date: selectedDate,
              time: selectedTime,
              description
            }
          : snapshot
      );
      setSnapshots(updatedSnapshots.sort((a, b) => b.date.getTime() - a.date.getTime()));
      setIsEditOpen(false);
      resetForm();
    }
  };

  const startEdit = (snapshot: Snapshot) => {
    setEditingSnapshot(snapshot);
    setSelectedDate(snapshot.date);
    setSelectedTime(snapshot.time);
    setDescription(snapshot.description);
    setIsEditOpen(true);
  };

  const resetForm = () => {
    setSelectedDate(undefined);
    setSelectedTime("12:00");
    setDescription("");
    setEditingSnapshot(null);
  };

  const isInPast = (date: Date) => {
    return new Date().getTime() > date.getTime();
  };

  return (
    <div className={`border-l bg-white transition-all duration-300 ${isCollapsed ? 'w-12' : 'w-80'}`}>
      <div className="flex h-16 items-center justify-between border-b px-6">
        {!isCollapsed && <h2 className="text-lg font-semibold text-[#1a237e]">Timeline</h2>}
        <div className="flex items-center gap-2">
          {!isCollapsed && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Plus className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Snapshot</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <Input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    />
                  </div>
                  <Input
                    placeholder="Snapshot description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Button onClick={handleCreateSnapshot} disabled={!selectedDate || !description}>
                    Create Snapshot
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-[#1a237e]"
          >
            {isCollapsed ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="relative p-6">
          <div className="absolute left-6 top-6 bottom-6 w-px bg-gray-200" />
          <div className="space-y-8">
            {snapshots.map((snapshot) => {
              const isPast = isInPast(snapshot.date);
              return (
                <div key={snapshot.id} className="relative pl-8">
                  <div className={`absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full ${
                    isPast ? 'bg-gray-400' : 'bg-[#1a237e] ring-4 ring-blue-50'
                  }`} />
                  <div className={`rounded-lg p-4 ${
                    isPast ? 'bg-gray-50' : 'bg-blue-50 border border-[#1a237e]/10'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className={`h-4 w-4 ${isPast ? 'text-gray-400' : 'text-[#1a237e]'}`} />
                        <p className={`text-sm font-medium ${isPast ? 'text-gray-600' : 'text-[#1a237e]'}`}>
                          {format(snapshot.date, "MMM d, yyyy")}
                        </p>
                      </div>
                      {isPast ? (
                        <Lock className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => startEdit(snapshot)}
                          className="hover:bg-[#1a237e]/10"
                        >
                          <Edit2 className="h-4 w-4 text-[#1a237e]" />
                        </Button>
                      )}
                    </div>
                    <p className={`text-xs mb-1 ${isPast ? 'text-gray-500' : 'text-[#1a237e]/60'}`}>
                      {snapshot.time}
                    </p>
                    <p className={`text-sm ${isPast ? 'text-gray-600' : 'text-[#1a237e]/80'}`}>
                      {snapshot.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Snapshot</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <Input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />
            </div>
            <Input
              placeholder="Snapshot description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button onClick={handleEditSnapshot} disabled={!selectedDate || !description}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}