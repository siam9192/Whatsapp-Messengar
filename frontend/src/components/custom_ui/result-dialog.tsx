import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface Props {
  open: boolean;
  result: {
    successful: 8;
    failed: ["+8801700000001", "+8801700000002", "+8801700000003"];
  };

  onClose: () => void;
}

function ResultDialog({ open, result, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-lg font-semibold">
            Send Result
          </DialogTitle>
        </DialogHeader>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/40 rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground">Success</p>
              <p className="text-2xl font-bold text-primary">
                {result.successful}
              </p>
            </div>

            <div className="bg-red-200/5 rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground">Failed</p>
              <p className="text-2xl font-bold text-red-500">
                {result.failed.length}
              </p>
            </div>
          </div>

          {/* Failed List */}
          <div>
            <p className="text-sm font-medium mb-2">Failed Numbers</p>

            {result.failed.length > 0 ? (
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-1">
                {result.failed.map((i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="rounded-full px-3 py-1 text-xs"
                  >
                    {i}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No failed numbers 🎉
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ResultDialog;
