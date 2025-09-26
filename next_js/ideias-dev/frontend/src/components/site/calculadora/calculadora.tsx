'use client';

import { ButtonCard } from "@/components/site/calculadora/buttonCardCalc";
import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaTimes, FaDivide, FaEquals } from "react-icons/fa";

const Calculadora = () => {
    const getRandom = (range: number) => Math.floor(Math.random() * range) + 1;

    const [isLoading, setIsLoading] = useState(false);
    const [number1, setNumber1] = useState<number>(() => getRandom(10));
    const [number2, setNumber2] = useState<number>(() => getRandom(10));
    const [rangeNumber, setRangeNumber] = useState<number>(10);
    const [result, setResult] = useState<number>(0);
    const [operationalResponse, setOperationalResponse] = useState<number>(0);
    const [operation, setOperation] = useState<string>('+');
    const [acertos, setAcertos] = useState<number>(0);
    const [erros, setErros] = useState<number>(0);
    const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

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
        setIsLoading(true); // ativa o loading

        const num1 = Math.floor(Math.random() * rangeNumber) + 1;
        const num2 = Math.floor(Math.random() * rangeNumber) + 1;

        setTimeout(() => {
            setNumber1(num1);
            setNumber2(num2);
            setIsLoading(false); // desativa o loading
        }, 200); // pequeno delay pra mostrar o loading
    };


    const resultOperation = () => {
        let getResult;

        switch (operation) {
            case "+":
                getResult = number1 + number2;
                break;
            case "-":
                getResult = number1 - number2;
                break;
            case "*":
                getResult = number1 * number2;
                break;
            case "/":
                getResult = number1 / number2;
                break;
            default:
                getResult = 0;
        }

        setOperationalResponse(getResult);
    };

    const checkResult = () => {
        resultOperation();

        if (operationalResponse === result) {
            setAcertos(prev => prev + 1);
            setFeedback({ message: 'Resposta correta!', type: 'success' });
            generateNumbers();
            setResult(0);
        } else {
            setErros(prev => prev + 1);
            setFeedback({ message: 'Resposta errada... Tente outra vez!', type: 'error' });
        }

        // Faz a mensagem desaparecer após 2 segundos
        setTimeout(() => setFeedback(null), 2000);
    };

    useEffect(() => {
        if (number1 !== 0 && number2 !== 0) {
            resultOperation();
        }
    }, [number1, number2]);

    return (
        <div className="">
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="text-white text-2xl font-bold animate-pulse">
                        Carregando...
                    </div>
                </div>
            )}

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
                        <input type="number" className="border border-gray-200 rounded-xl p-4 text-center font-bold text-xl lg:text-2xl w-full" value={result ?? 0} onChange={(e) => setResult(Number(e.target.value))} />
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

            {feedback && (
                <div className={`mt-4 text-center font-bold px-4 py-2 rounded-xl ${feedback.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    {feedback.message}
                </div>
            )}
        </div>
    );
}

export default Calculadora