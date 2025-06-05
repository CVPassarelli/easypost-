interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000080] flex items-center justify-center z-50">
      <div className="bg-white  w-full lg:w-[60vw] shadow-2xl">
        <div
          className="flex px-4 py-2 font-bold justify-end
        ">
          <button onClick={onClose} className="px-3 cursor-pointer">
            X
          </button>
        </div>
        <div className="px-3 py-2">{children}</div>
      </div>
    </div>
  );
};
