import type { SymbolViewProps } from "expo-symbols";

export type AboutTopicKey = "theme" | "design" | "features" | "store";

export type AboutTopic = {
    key: AboutTopicKey;
    title: string;
    summary: string;
    icon: SymbolViewProps["name"];
    body: string[];
    items?: string[];
};

export const ABOUT_TOPICS: AboutTopic[] = [
    {
        key: "theme",
        title: "Tema",
        summary: "Claro, escuro ou seguindo o sistema.",
        icon: { ios: "circle.lefthalf.filled", android: "contrast", web: "contrast" },
        body: [
            "Escolha como o DevScope aparece. A preferência fica no Redux e é aplicada no app inteiro, inclusive em abas, cabeçalhos e menus nativos.",
        ],
    },
    {
        key: "design",
        title: "Design",
        summary: "Fonte Unbounded, tema de cores.",
        icon: { ios: "paintpalette", android: "palette", web: "palette" },
        body: [
            "Abas, barra de busca, menus e sheets são os componentes nativos de cada plataforma, através do Expo Router.",
            "Por cima deles, uma paleta própria em tons de verde com variações clara e escura, a fonte Unbounded nos títulos e ícones SF Symbols no iOS e Material Symbols no Android.",
        ],
    },
    {
        key: "features",
        title: "Funcionalidades",
        summary: "Tudo o que dá para fazer no app.",
        icon: { ios: "square.grid.2x2", android: "widgets", web: "widgets" },
        body: ["Explore desenvolvedores e projetos do GitHub:"],
        items: [
            "Buscar usuários por nome ou login, ordenando por relevância, seguidores, repositórios ou data de cadastro.",
            "Ver o perfil com avatar, e-mail, bio, seguidores, seguidos e o calendário de contribuições do último ano.",
            "Listar os repositórios ordenados por estrelas, forks, nome ou atualização.",
            "Abrir os detalhes de um repositório e acessá-lo no GitHub.",
            "Salvar perfis nos favoritos e compartilhar links.",
        ],
    },
    {
        key: "store",
        title: "Store",
        summary: "Como os dados fluem pelo Redux.",
        icon: { ios: "cylinder.split.1x2", android: "database", web: "database" },
        body: [
            "O estado é organizado por funcionalidade com Redux Toolkit. Cada slice cuida de uma parte do app:",
        ],
        items: [
            "repos: ordenação da lista de repositórios.",
            "search: ordenação dos resultados da busca.",
            "favorites: perfis salvos.",
            "settings: preferência de tema.",
            "githubApi: requisições com RTK Query, com cache, deduplicação, estados de carregamento e erro e tratamento do limite de requisições do GitHub.",
        ],
    },
];

export const findAboutTopic = (key: string) => ABOUT_TOPICS.find((topic) => topic.key === key);
