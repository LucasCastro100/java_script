export const data = {
    projects: [
        {
            name: "Calculadora de IMC",
            description: "Uma calculadora simples para calcular o Índice de Massa Corporal (IMC).",
            slug: "IMC",
            // image: "/images/projects/imc.png",
            tags: ["react", "typescript", "nextjs", "tailwindcss"],
            url: "/projetos/imc"
        },
        {
            name: "Calculadora",
            description: "Uma calculadora simples para ralziar calculos básicos.",
            slug: "calculadora",
            // image: "/images/projects/imc.png",
            tags: ["react", "typescript", "nextjs", "tailwindcss"],
            url: "/projetos/calculadora"
        },
    ],
    menuHeader: [
        { label: "Home", href: "/" },
        { label: "Projetos", href: "/projetos" },        
        { label: "Contato", href: "/contato" },
    ],
    imcCategories: [
        { title: "Abaixo do Peso", range: "< 18,5", color: "bg-blue-500" },
        { title: "Normal", range: "18,5 - 24,9", color: "bg-green-500" },
        { title: "Sobrepeso", range: "25 - 29,9", color: "bg-yellow-500" },
        { title: "Obesidade grau I", range: "30 - 34,9", color: "bg-orange-500" },
        { title: "Obesidade grau II", range: "35 - 39,9", color: "bg-orange-700" },
        { title: "Obesidade Mórbida", range: "≥ 40", color: "bg-red-500" },
    ]
}