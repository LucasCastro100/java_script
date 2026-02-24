'use client'
import { FaCode, FaChartLine, FaHeadset } from "react-icons/fa";
export default function HomeSite() {
    // Função para abrir o modal do Header
    const openContatoModal = () => {
        // Exemplo com btoa, caso queira passar algum dado codificado
        const encoded = btoa("contato");
        window.dispatchEvent(new CustomEvent("open-contato", { detail: encoded }));
    };

    return (
        <div className="">
            <div className="flex flex-col gap-6">
                <div className="">
                    <h2 className="font-semibold text-black mb-4 text-center text-2xl">
                        Transforme Suas Ideias em Projetos Digitais de Sucesso
                    </h2>

                    <p className="font-semibold text-black text-lg mb-4">
                        Transformamos ideias em soluções digitais de alto impacto. Desde 2024, nosso foco é entregar projetos que não apenas atendem às expectativas, mas potencializam resultados e eficiência para o seu negócio.
                    </p>

                    <p className="font-semibold text-black text-lg mb-4">
                        Cada projeto na Ideias.Dev é desenvolvido de forma personalizada, garantindo atenção a todos os detalhes, desde o planejamento inicial até a implementação final, incluindo testes rigorosos e acompanhamento pós-lançamento.
                    </p>

                    <p className="font-semibold text-black text-lg text-center">
                        Além do desenvolvimento, ofereço serviços que ajudam seu negócio a crescer online
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Desenvolvimento de Sites */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition flex flex-col items-center">
                        <FaCode className="text-blue-600 text-4xl mb-4" />
                        <h3 className="text-xl font-bold text-blue-600 mb-4 text-center">Desenvolvimento de Sites</h3>
                        <p className="text-gray-600 text-center">
                            Criação de sites e sistemas responsivos, com performance e SEO em foco.
                        </p>
                    </div>

                    {/* Web Ads */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition flex flex-col items-center">
                        <FaChartLine className="text-yellow-600 text-4xl mb-4" />
                        <h3 className="text-xl font-bold text-yellow-600 mb-4 text-center">Ads</h3>
                        <p className="text-gray-600 text-center">
                            Campanhas otimizadas para gerar mais alcance, tráfego e conversões.
                        </p>
                    </div>

                    {/* Suporte Online */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition flex flex-col items-center">
                        <FaHeadset className="text-red-600 text-4xl mb-4" />
                        <h3 className="text-xl font-bold text-red-600 mb-4 text-center">Suporte Online</h3>
                        <p className="text-gray-600 text-center">
                            Atendimento contínuo para garantir estabilidade e resolver dúvidas rapidamente.
                        </p>
                    </div>
                </div>

                {/* Botão para abrir o modal do Header */}
                <div className="flex justify-center">
                    <button
                        onClick={openContatoModal}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                        Entre em Contato
                    </button>
                </div>
            </div>
        </div>
    );
}
