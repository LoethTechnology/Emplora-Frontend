'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CircleQuestionMark } from 'lucide-react';

interface LogoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading: boolean;
}

export default function LogoutModal({ open, onOpenChange, onConfirm, loading }: LogoutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-xl bg-white p-6 text-center">
        <div className="w-full justify-center items-center flex">
          <CircleQuestionMark
            className="h-8 w-8 text-white bg-black rounded-full self-center"
            size={24}
          />
        </div>

        <DialogHeader className="space-y-2">
          <div className="flex flex-col items-center justify-between ">
            <DialogTitle className="text-xl font-semibold text-text-primary">Log out</DialogTitle>
            <DialogDescription className="mx-auto max-w-sm text-sm text-text-secondary">
              Are you sure you want to log out from your account?
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="mt-6 flex flex-row gap-3 w-full justify-center p-2">
          <DialogClose asChild className="w-[50%]">
            <Button variant="outline" className="px-8 py-6">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="w-[50%] bg-black text-white hover:bg-black/90 px-8 py-6"
            onClick={onConfirm}
            disabled={loading}
          >
            Proceed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
