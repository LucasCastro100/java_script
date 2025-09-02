'use client';

import { UseQueryString } from "@/hooks/use-qerySring";
import { use } from "react";

type Props = {
    groupId: string;
    item: {
        id: string;
        label: string;
    }
}

export const FilterItem = ({ groupId, item }: Props) => {
    const queryString = UseQueryString();

    const toggleFilter = (groupId: string, itemId: string) => {
        const queryGroup = queryString.get(groupId);
        let currentItems = queryGroup ? queryGroup.split("|") : [];

        if (currentItems.includes(itemId)) {
            currentItems = currentItems.filter(i => i !== itemId);
        } else {
            currentItems.push(itemId);
        }

        queryString.set(groupId, currentItems.join("|"));
    }

    const hasFilter = (groupId: string, itemId: string) => {
        let currentFilters = queryString.get(groupId)?.split("|");

        return currentFilters && currentFilters.includes(itemId) ? true : false;
    }

    return (
        <div className="flex flex-row items-center gap-4">
            <input type="checkbox" className="size-6" id={`ck-${item.id}`}  onChange={() => toggleFilter(groupId, item.id)}
            checked={hasFilter(groupId, item.id)}/>
            <label htmlFor={`ck-${item.id}`} className="text-lg text-gray-500">{item.label}</label>
        </div>
    );
}