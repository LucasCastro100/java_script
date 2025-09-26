'use client';

import { useState } from "react";

const HeaderSarch = () => {
    const [seach, setSearch] = useState('');

    const handleSearchChange = (value: string) => {
        setSearch(value);

        if (value.length > 3) {
            console.log(`🔎 Buscar por: ${value}`);
        } else {
            console.log("⛔ Digite pelo menos 4 letras...");
        }
    }

    return (
        <input type="search" placeholder="O que você procura?" className="w-full border border-gray-200 rounded-sm pl-12 py-2 outline-0 bg-no-repeat bg-[16px_50%] bg-[size:24px]"
            style={{ backgroundImage: "url('/assets/loja/ui/search.png')" }}
            value={seach}
            onChange={(e) => handleSearchChange(e.target.value)} />
    );
}

export default HeaderSarch;