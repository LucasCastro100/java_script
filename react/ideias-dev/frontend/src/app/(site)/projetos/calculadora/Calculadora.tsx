'use client';

import { useState } from "react";
import { FaPlus, FaMinus, FaTimes, FaDivide, FaEquals } from "react-icons/fa";

const Calculadora = () => {
    const [number1, setNumber1] = useState<number | null>(null);
    const [number2, setNumber2] = useState<number | null>(null);
    const [result, setResult] = useState<number | null>(null);
    const [operation, setOperation] = useState<string | null>(null);

    const getOperation = () => {
        setOperation(op);
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
            <div className="flex flex-row justify-center items-center gap-4 text-1xl">
                <div className="border border-gray-200 p-4 bg-white rounded-xl hover:bg-blue-500 hover:text-white" onClick={() => getOperation('+')}>
                    <FaPlus />
                </div>

                <div className="border border-gray-200 p-4 bg-white rounded-xl hover:bg-blue-500 hover:text-white" onClick={() => getOperation('-')}>
                    <FaMinus />
                </div>

                <div className="border border-gray-200 p-4 bg-white rounded-xl hover:bg-blue-500 hover:text-white" onClick={() => getOperation('*')}>
                    <FaTimes />
                </div>

                <div className="border border-gray-200 p-4 bg-white rounded-xl hover:bg-blue-500 hover:text-white" onClick={() => getOperation('/')}>
                    <FaDivide />
                </div>

            </div>

            <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="">
                        <input type="number" name="" id="" />
                    </div>

                    <div className="">
                        {getOperation}
                    </div>

                    <div className="">
                        <input type="number" name="" id="" />
                    </div>

                    <div className="">
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