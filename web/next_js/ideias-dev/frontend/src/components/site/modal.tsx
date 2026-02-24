'use client'

import React from "react";
import { MdClose } from "react-icons/md";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
};

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative max-h-[80vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-2 border border-gray-200 rounded-md" >
                    <MdClose className="size-6"/>
                </button>
                {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
                <div>{children}</div>
            </div>
        </div>
    );
};
