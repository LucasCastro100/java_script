'use client';

import { ButtonCard } from "@/components/site/buttonCardCalc";
import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaTimes, FaDivide, FaEquals } from "react-icons/fa";

const Calculadora = () => {
    const [rangeNumber, setRangeNumber] = useState<number>(10);
    const [number1, setNumber1] = useState<number | null>(0);
    const [number2, setNumber2] = useState<number | null>(0);
    const [result, setResult] = useState<number | null>(null);
    const [operation, setOperation] = useState<string | null>('+');
    const [acertos, setAcertos] = useState<number>(0);
    const [erros, setErros] = useState<number>(0);

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

    const generateNumbers = () => {
        const num1 = Math.floor(Math.random() * rangeNumber) + 1;
        const num2 = Math.floor(Math.random() * rangeNumber) + 1;
        setNumber1(num1);
        setNumber2(num2);
    };

    const checkResult = () => {
        // console.log(`${number1} ${operation} ${number2} = ${result}`);
    }

    useEffect(() => {
        generateNumbers();
    }, [rangeNumber]);

    return (
        <div className="">
            <div className="flex flex-row gap-4 items-center justify-center">
                <p className="font-bold text-xl">Acertos: {acertos}</p>
                <p className="font-bold text-xl">-</p>
                <p className="font-bold text-xl">Erros: {erros}</p>
            </div>

            <div className="flex flex-col">
                <div className="flex flex-row justify-center items-center gap-4 text-1xl mt-4">
                    <ButtonCard key="plus" onClick={() => setOperation("+")} active={operation === "+"}>
                        <FaPlus />
                    </ButtonCard>
                    <ButtonCard key="minus" onClick={() => setOperation("-")} active={operation === "-"}>
                        <FaMinus />
                    </ButtonCard>
                    <ButtonCard key="times" onClick={() => setOperation("*")} active={operation === "*"}>
                        <FaTimes />
                    </ButtonCard>
                    <ButtonCard key="divide" onClick={() => setOperation("/")} active={operation === "/"}>
                        <FaDivide />
                    </ButtonCard>
                </div>

                {/* Range */}
                <div className="flex flex-row justify-center items-center gap-4 mt-4">
                    <ButtonCard key="range-10" onClick={() => setRangeNumber(10)} active={rangeNumber === 10}>
                        <p className="font-bold text-1xl">1 - 10</p>
                    </ButtonCard>
                    <ButtonCard key="range-100" onClick={() => setRangeNumber(100)} active={rangeNumber === 100}>
                        <p className="font-bold text-1xl">1 - 100</p>
                    </ButtonCard>
                    <ButtonCard key="range-1000" onClick={() => setRangeNumber(1000)} active={rangeNumber === 1000}>
                        <p className="font-bold text-1xl">1 - 1000</p>
                    </ButtonCard>

                </div>
            </div>

            <div className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="">
                        <input
                            className="border border-gray-200 rounded-xl p-4 text-center font-bold text-xl lg:text-2xl w-full"
                            type="text"
                            value={number1 ?? 0}
                            readOnly />
                    </div>

                    <div className="flex items-center justify-center w-full">
                        {getOperation()}
                    </div>

                    <div className="">
                        <input
                            className="border border-gray-200 rounded-xl p-4 text-center font-bold text-xl lg:text-2xl w-full"
                            type="text"
                            value={number2 ?? 0}
                            readOnly />
                    </div>

                    <div className="flex items-center justify-center w-full">
                        <FaEquals />
                    </div>

                    <div className="">
                        <input type="number" className="border border-gray-200 rounded-xl p-4 text-center font-bold text-xl lg:text-2xl w-full" onChange={(e) => setResult(Number(e.target.value))} />
                    </div>
                </div>
            </div>

            <div className="flex flex-row items-center justify-center gap-4 mt-8">
                <ButtonCard key="generateNumber" onClick={() => generateNumbers()}>
                    <p className="font-bold text-1xl">Sortear</p>
                </ButtonCard>

                <ButtonCard key="ckekResult" onClick={() => checkResult()}>
                    <p className="font-bold text-1xl">Verificar</p>
                </ButtonCard>
            </div>
        </div>
    );
}

export default Calculadora