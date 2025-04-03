import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XIcon } from "lucide-react";
import { useState } from "react";

const Modal = ({ isOpen, setIsOpen, title, children }) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      transition
      className="relative z-10 focus:outline-none transition duration-300 ease-out data-[closed]:opacity-0"
      onClose={() => setIsOpen(false)}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 duration-300 ease-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-sm bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="flex items-center justify-between">
              <DialogTitle
                as="h3"
                className="text-xl font-semibold font-montserrat text"
              >
                {title}
              </DialogTitle>
              <button onClick={() => setIsOpen(false)}>
                <XIcon className="size-5 cursor-pointer" />
              </button>
            </div>

            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
