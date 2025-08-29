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
         {
            name: "E-comerce",
            description: "E-commerce com pagamento com STRIPE e frete com CORREIOS",
            slug: "ecomerce",
            // image: "/images/projects/imc.png",
            tags: ["react", "typescript", "nextjs", "tailwindcss"],
            url: "/projetos/loja"
        },
          {
            name: "Apoia Dev",
            description: "Sistema com pagamentos recorrentes com STRIPE",
            slug: "apoia-dev",
            // image: "/images/projects/imc.png",
            tags: ["react", "typescript", "nextjs", "tailwindcss"],
            url: "/projetos/apoia-dev"
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
    ],

    storeBanners: [
        { img: '/assets/loja/banners/banner-1.png', href: '/products' },
        { img: '/assets/loja/banners/banner-2.png', href: '/products' },
        { img: '/assets/loja/banners/banner-3.png', href: '/products' },
        { img: '/assets/loja/banners/banner-4.png', href: '/products' },
    ],

    products: [
        { id: 1, label: "Camiseta Laravel", image: "/assets/loja/products/camiseta-laravel-azul.png", price: 79.9, liked: false },
        { id: 2, label: "Camiseta JavaScript", image: "/assets/loja/products/camiseta-js.png", price: 69.9, liked: true },
        { id: 3, label: "Camiseta HTML5", image: "/assets/loja/products/camiseta-html.png", price: 59.9, liked: false },
        { id: 4, label: "Camiseta CSS3", image: "/assets/loja/products/camiseta-css.png", price: 59.9, liked: false }
    ]
}