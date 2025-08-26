'use client';

import { useState } from "react";
import { FaPlus, FaMinus, FaTimes, FaDivide, FaEquals } from "react-icons/fa";

const Calculadora = () => {
    const [rangeNumber, setRangeNumber] = useState<number>(10);
    const [number1, setNumber1] = useState<number | null>(null);
    const [number2, setNumber2] = useState<number | null>(null);
    const [result, setResult] = useState<number | null>(null);
    const [operation, setOperation] = useState<string | null>('+');

    const getOperation = () => {        
        switch (operation) {
            case "+":
                return <FaPlus className="text-2xl" />;
            case "-":
                return <FaMinus className="text-2xl" />;
            case "*":
                return <FaTimes className="text-2xl" />;
            case "/":
                return <FaDivide className="text-2xl" />;
            default:
                return null;
        }
    }

    return (
        <div className="">

            <div className="flex flex-col">
            <div className="flex flex-row justify-center items-center gap-4 text-1xl">
                <div className="border border-gray-200 p-4 bg-white rounded-xl hover:bg-blue-400 hover:text-white" onClick={() => setOperation('+')}>
                    <FaPlus />
                </div>

                <div className="border border-gray-200 p-4 bg-white rounded-xl hover:bg-blue-400 hover:text-white" onClick={() => setOperation('-')}>
                    <FaMinus />
                </div>

                <div className="border border-gray-200 p-4 bg-white rounded-xl hover:bg-blue-400 hover:text-white" onClick={() => setOperation('*')}>
                    <FaTimes />
                </div>

                <div className="border border-gray-200 p-4 bg-white rounded-xl hover:bg-blue-400 hover:text-white" onClick={() => setOperation('/')}>
                    <FaDivide />
                </div>
            </div>

            <div className="flex flex-row justify-center items-center gap-4 mt-4">
                <div className="border border-gray-100 rounded-xl bg-white p-4 hover:bg-blue-400 hover:text-white"><p className="font-bold  text-1xl">1 - 10</p></div>
                <div className="border border-gray-100 rounded-xl bg-white p-4 hover:bg-blue-400 hover:text-white"><p className="font-bold  text-1xl">1 - 100</p></div>
                <div className="border border-gray-100 rounded-xl bg-white p-4 hover:bg-blue-400 hover:text-white"><p className="font-bold  text-1xl">1 - 1000</p></div>
            </div>
            

            </div>

            <div className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="">
                        <input type="number" name="" id="" />
                    </div>

                    <div className="flex items-center justify-center">
                        {getOperation()}
                    </div>

                    <div className="">
                        <input type="number" name="" id="" />
                    </div>

                    <div className="flex items-center justify-center">
                        <FaEquals/>
                    </div>

                    <div className="">
                        <input type="number" name="" id="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calculadora