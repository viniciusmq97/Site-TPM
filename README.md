# Portal Multimídia

Um portal educacional para cursos de multimídia, desenvolvido com React, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **React 18** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool rápido
- **Tailwind CSS** - Framework CSS utilitário
- **Supabase** - Backend e banco de dados
- **Lucide React** - Ícones

## 📦 Como rodar

1. Clone o repositório:
```bash
git clone https://github.com/viniciusmq97/Site-TPM.git
cd Site-TPM
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env.local na raiz do projeto
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

4. Rode o projeto:
```bash
npm run dev
```

5. Abra [http://localhost:4173](http://localhost:4173) no navegador.

## 🏗️ Estrutura do projeto

```
src/
├── App.tsx              # Componente principal
├── main.tsx             # Ponto de entrada do React
├── types.ts             # Definições de tipos TypeScript
├── index.css            # Estilos globais
├── vite-env.d.ts        # Tipos do Vite
├── components/
│   └── CommentNode.tsx  # Componente de comentários
└── lib/
    └── supabaseClient.ts # Cliente Supabase
```

## 📋 Funcionalidades

- ✅ Portal com design tradicional
- ✅ Sistema de tags para categorização
- ✅ Feed de postagens (tutoriais, artigos, eventos)
- ✅ Sistema de comentários aninhados
- ✅ Login/logout simulado
- ✅ Filtragem por categorias
- ✅ Interface responsiva

## 🔧 Scripts disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build

## 📝 Arquivos importantes

- `package.json` - Dependências e scripts
- `tsconfig.json` - Configuração TypeScript
- `tailwind.config.js` - Configuração Tailwind
- `vite.config.ts` - Configuração Vite
- `.gitignore` - Arquivos ignorados pelo Git

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.