import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment } from 'react';

interface ModalComponentProps {
  title?: string;
  setModalState: (status: boolean) => void;
  isOpen: boolean;
}

const Modal: FC<ModalComponentProps> = ({
  title,
  setModalState,
  children,
  isOpen,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setModalState(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div
                  className="absolute top-5 right-5 bg-gray-300 p-3 rounded-full hover:bg-gray-400 transition-all cursor-pointer"
                  onClick={() => setModalState(false)}
                >
                  <img
                    src="https://iconape.com/wp-content/png_logo_vector/cross-2.png"
                    className="h-3 w-3"
                    alt="cross"
                  />
                </div>
                <Dialog.Title
                  as="h3"
                  className="font-bold text-2xl text-center text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
