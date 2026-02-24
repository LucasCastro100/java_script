'use client';

import { HTMLProps } from "react";


export function Textarea({...rest}: HTMLProps<HTMLTextAreaElement>) {
    return (
        <textarea
            className="w-full h-32 p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...rest}></textarea>
    );
}