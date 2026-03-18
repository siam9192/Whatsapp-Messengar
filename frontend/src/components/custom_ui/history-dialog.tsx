import { X, Copy, Send, Eye, Calendar, Clock, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface HistoryDialogProps {
  open: boolean;
  onClose: () => void;
  messageItem: {
    id: string;
    message: string;
    status: string;
    date: string;
    time: string;
    recipients: number;
  };
}

export default function HistoryDialog({
  open,
  onClose,
  messageItem,
}: HistoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose} >
      <DialogContent className="w-lg rounded-2xl p-6 ">
        {/* Header */}
        <DialogHeader className="flex justify-between items-center pb-4 border-b">
          <DialogTitle className="text-lg font-semibold">
            Message Details
          </DialogTitle>
          <DialogClose asChild></DialogClose>
        </DialogHeader>

        {/* Body */}
        <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Message */}
          <div className="p-4 bg-card rounded-xl border flex flex-col gap-3">
            <p className="text-sm text-foreground whitespace-pre-wrap">
              {messageItem.message}
            </p>

            <span
              className={`text-xs px-3 py-1 rounded-full capitalize font-medium w-fit
              ${
                messageItem.status === "sent"
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : messageItem.status === "scheduled"
                    ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              {messageItem.status}
            </span>
          </div>

          {/* Meta Info */}
          <div className="flex flex-col gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <Calendar size={14} /> <span>{messageItem.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={14} /> <span>{messageItem.time}</span>
            </div>
            <div className="flex items-center gap-3">
              <Users size={14} />{" "}
              <span>{messageItem.recipients} recipients</span>
            </div>
          </div>

     
        </div>
      </DialogContent>
    </Dialog>
  );
}
