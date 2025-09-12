export const data = {
    projects: {
        basicos: {
            stacks: ["react", "typescript", "nextjs", "tailwindcss"],
            projetos: [
                {
                    name: "Calculadora de IMC",
                    description: "Uma calculadora simples para calcular o Índice de Massa Corporal (IMC).",
                    slug: "imc",
                    url: "/projetos/imc",
                },
                {
                    name: "Calculadora",
                    description: "Uma calculadora simples para realizar cálculos básicos.",
                    slug: "calculadora",
                    url: "/projetos/calculadora",
                },
                {
                    name: "Lista de tarefas",
                    description: "Sistema de lista de tarefas.",
                    slug: "lista-de-tarefas",
                    url: "/projetos/lista-de-tarefas",
                },
            ],
        },

        intermediario: {
            stacks: ["react", "typescript", "nextjs", "tailwindcss", "storage"],
            projetos: [
                {
                    name: "Fetch - API",
                    description: "Realizando bsucas em outro sistema por meio de api utiliando AXIOS.",
                    slug: "api",
                    url: "/projetos/fetch-api",
                },
                 {
                    name: "Controle de Escolas",
                    description: "Realizando cadastro de escolas, turmas, alunos e dividindo os alunos em grupos e guardando essas informações com localStorage",
                    slug: "api",
                    url: "/projetos/controle-escolas",
                },
                {
                    name: "Ibge",
                    description: "Mostra as regioes e mostra no mapa onde fica, filtrando por regiao, estado e municipio",
                    slug: "ibge",
                    url: "/projetos/ibge",
                },
            ],
        },

        avancado: {
            stacks: ["react", "typescript", "nextjs", "tailwindcss", "mysql"],
            projetos: [
                {
                    name: "E-commerce",
                    description: "E-commerce com pagamento com STRIPE e frete com CORREIOS",
                    slug: "ecomerce",
                    url: "/projetos/loja",
                },
                {
                    name: "Apoia Dev",
                    description: "Sistema com pagamentos recorrentes com STRIPE",
                    slug: "apoia-dev",
                    url: "/projetos/apoia-dev",
                },
                {
                    name: "Plataforma de cursos",
                    description: "Sistema com pagamentos recorrentes com STRIPE, controle de usuario, matricula, acesso entre professor e aluno, e banco de dados mysql",
                    slug: "apoia-dev",
                    url: "/projetos/plataforma-cursos",
                },
            ],
        },
    },

    menuHeader: [
        { label: "Home", href: "/" },
        { label: "Projetos", href: "/projetos" },
        { label: "Contato", modal:true },
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
        { id: 1, label: "Camiseta Laravel Azul", images: ["/assets/loja/products/camiseta-laravel-azul.png"], price: 79.9, liked: false, views: 120, solds: 35, description: "Camiseta" },

        { id: 2, label: "Camiseta Laravel Branca", images: ["/assets/loja/products/camiseta-laravel-branca.png", "/assets/loja/products/camiseta-laravel-cinza.png"], price: 79.9, liked: false, views: 95, solds: 40, description: "Camiseta" },

        { id: 3, label: "Camiseta JavaScript Amarela", images: ["/assets/loja/products/camiseta-js.png"], price: 69.9, liked: true, views: 200, solds: 50, description: "Camiseta" },

        { id: 4, label: "Camiseta HTML5 Laranja", images: ["/assets/loja/products/camiseta-html.png"], price: 59.9, liked: false, views: 80, solds: 25, description: "Camiseta" },

        { id: 5, label: "Camiseta CSS3 Azul", images: ["/assets/loja/products/camiseta-css.png"], price: 59.9, liked: false, views: 60, solds: 30, description: "Camiseta" },

        { id: 6, label: "Camiseta Node Preta", images: ["/assets/loja/products/camiseta-node-preta.png"], price: 59.9, liked: false, views: 110, solds: 45, description: "Camiseta" },

        { id: 7, label: "Camiseta Node Verde", images: ["/assets/loja/products/camiseta-node.png"], price: 59.9, liked: false, views: 75, solds: 20, description: "Camiseta" },

        { id: 8, label: "Camiseta React Preta", images: ["/assets/loja/products/camiseta-react-preta.png"], price: 69.9, liked: true, views: 180, solds: 55, description: "Camiseta" },

        { id: 9, label: "Camiseta React Azul", images: ["/assets/loja/products/camiseta-react-azul.png"], price: 69.9, liked: false, views: 140, solds: 60, description: "Camiseta" },
    ],
}