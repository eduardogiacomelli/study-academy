# 🎓 OS & DB Academy

> **Plataforma educacional interativa para estudo de Sistemas Operacionais e Bancos de Dados**

Uma aplicação web moderna e gamificada com simuladores interativos, visualizadores 3D e sistema completo de exercícios para aprendizado de conceitos de Sistemas Operacionais, focando em Gerenciamento de Memória.

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Deploy](https://img.shields.io/badge/deploy-Vercel-black?logo=vercel)](https://vercel.com)

---

## ✨ Features Principais

### 🎮 Sistema de Exercícios Gamificado
- **25+ exercícios** práticos cobrindo todos os conceitos fundamentais
- Sistema de **pontuação e progresso** em tempo real
- **Filtros avançados** por categoria e dificuldade
- Feedback instantâneo com **explicações detalhadas**
- **Dicas contextuais** para cada questão
- Dashboard de **estatísticas** e progresso por categoria

### 🔬 12 Simuladores Interativos
1. **VirtualMemorySimulator** - Demand Paging em ação
2. **PageFaultVisualizer** - Visualização de page faults
3. **WorkingSetVisualizer** - Working set e detecção de thrashing
4. **CopyOnWriteVisualizer** - Mecanismo COW do fork()
5. **EffectiveAccessTimeCalculator** - Cálculo de EAT interativo
6. **MemoryHierarchyDiagram** - Hierarquia completa de memória
7. **PagingSimulator** - Tradução de endereços
8. **PagingVisualizer3D** - Visualização 3D de paginação
9. **TLBVisualizer3D** - TLB com partículas animadas
10. **PageReplacementComparator** - 4 algoritmos lado a lado
11. **BeladyAnomalyDemonstrator** - Anomalia interativa
12. **SegmentationSimulator** - Segmentação completa

### 🎨 UX Premium
- **Smooth scroll** com Lenis (1.2s duration)
- **Navegação instantânea** (150ms loading)
- **Validação visual** em todos os inputs
- **Tooltips informativos** com exemplos clicáveis
- **Animações 60fps** com Framer Motion
- **Design system** consistente com Tailwind + Shadcn/ui
- **Tema dark** otimizado

### 📊 Visualizadores 3D
- **React Three Fiber** para renderização performática
- TLB com **partículas de dados** animadas
- Tabela de páginas em **3D interativa**
- Memory Hierarchy com **gradientes responsivos**

---

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18.x ou superior
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/eduardogiacomelli/study-academy.git
cd study-academy

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build para Produção

```bash
# Criar build otimizado
npm run build

# Iniciar servidor de produção
npm start
```

---

## 📚 Estrutura do Projeto

```
os-db-academy/
├── app/
│   ├── os/
│   │   ├── exercicios/          # Sistema de exercícios gamificado
│   │   └── memoria/
│   │       ├── paginacao/       # Simuladores de paginação + TLB 3D
│   │       ├── segmentacao/     # Simulador de segmentação
│   │       ├── substituicao/    # Algoritmos de substituição
│   │       └── virtual/         # 6 simuladores de memória virtual
│   ├── layout.tsx               # Layout raiz com smooth scroll
│   └── page.tsx                 # Landing page animada
├── components/
│   ├── exercises/               # Componentes de exercícios
│   │   ├── ExerciseCard.tsx    # Card gamificado com animações
│   │   ├── ExerciseFilters.tsx # Filtros funcionais
│   │   └── ProgressDashboard.tsx # Dashboard de progresso
│   ├── os/                      # 12 simuladores de SO
│   ├── shared/                  # Componentes reutilizáveis
│   │   ├── GlobalLoading.tsx   # Loading instantâneo
│   │   ├── SmoothScroll.tsx    # Lenis integration
│   │   └── ValidatedInput.tsx  # Input com validação visual
│   └── ui/                      # Shadcn/ui components
├── data/
│   └── exercises-database.ts    # Banco de dados de exercícios
└── lib/
    └── utils/                   # Utilitários e helpers
```

---

## 🎯 Conteúdo Acadêmico

### Baseado em Referências de Qualidade
- **Tanenbaum** - Sistemas Operacionais Modernos (Cap. 3 completo)
- **Silberschatz** - Fundamentos de SO (Cap. 9)
- **INE5611** - Lista de exercícios oficial (UFSC)
- Exemplos e fórmulas **validados academicamente**

### Tópicos Cobertos
- ✅ Conceitos Básicos de Memória
- ✅ Hierarquia de Memória
- ✅ MMU e Tradução de Endereços
- ✅ Paginação (completa)
- ✅ TLB (Translation Lookaside Buffer)
- ✅ Segmentação
- ✅ Memória Virtual
- ✅ Demand Paging
- ✅ Page Faults
- ✅ Algoritmos de Substituição (FIFO, LRU, Clock, Optimal)
- ✅ Anomalia de Belady
- ✅ Working Set e Thrashing
- ✅ Copy-on-Write (COW)
- ✅ Effective Access Time (EAT)
- ✅ Particionamento (Estático/Dinâmico)

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework com App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Shadcn/ui** - Component library
- **Framer Motion** - Animações premium
- **React Three Fiber** - 3D graphics
- **Lenis** - Smooth scroll

### Performance
- **Code Splitting** automático
- **Static Site Generation** (SSG)
- **Lazy Loading** de componentes 3D
- **Bundle otimizado** (~102KB shared)
- **60fps** animations
- **Build time**: ~6.5s

---

## 📈 Estatísticas do Projeto

```
📁 50+ arquivos TS/TSX
📝 ~12,000 linhas de código
🎮 12 simuladores interativos
📚 25+ exercícios gamificados
🎨 3 visualizadores 3D
🏆 430+ pontos disponíveis
⚡ 60fps constante
✅ 0 erros de build
```

---

## 🎨 Screenshots

### Landing Page
Landing page moderna com animações e gradientes.

### Simuladores Interativos
12 simuladores funcionais com feedback em tempo real.

### Sistema de Exercícios
Gamificação completa com pontos, badges e progresso.

### Visualizadores 3D
TLB, Paging e Memory Hierarchy em 3D performático.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 Roadmap

### Módulo de Sistemas Operacionais ✅
- [x] Gerenciamento de Memória completo
- [x] Sistema de exercícios gamificado
- [x] Simuladores interativos
- [x] Visualizadores 3D

### Próximas Features 🚧
- [ ] Módulo de Processos e Threads
- [ ] Módulo de Sincronização
- [ ] Módulo de Deadlocks
- [ ] Módulo de Sistemas de Arquivos
- [ ] Módulo de Bancos de Dados (SQL/NoSQL)
- [ ] Sistema de autenticação
- [ ] Salvamento de progresso em nuvem
- [ ] Leaderboard global
- [ ] Modo multiplayer competitivo

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Eduardo Giacomelli**

- GitHub: [@eduardogiacomelli](https://github.com/eduardogiacomelli)
- LinkedIn: [Eduardo Giacomelli](https://linkedin.com/in/eduardo-giacomelli)

---

## 🙏 Agradecimentos

- **UFSC** - Universidade Federal de Santa Catarina
- **INE5611** - Disciplina de Sistemas Operacionais
- **Prof. Eduardo Camilo Inacio** - Materiais de referência
- **Tanenbaum** - "Sistemas Operacionais Modernos"
- **Comunidade Open Source** - Por todas as bibliotecas incríveis

---

## ⭐ Dê uma Estrela!

Se este projeto te ajudou nos estudos, considere dar uma ⭐ no repositório!

---

<div align="center">

**Desenvolvido com ❤️ para estudantes de Ciência da Computação**

[🚀 Deploy](https://study-academy.vercel.app) · [📚 Docs](https://github.com/eduardogiacomelli/study-academy/wiki) · [🐛 Report Bug](https://github.com/eduardogiacomelli/study-academy/issues) · [✨ Request Feature](https://github.com/eduardogiacomelli/study-academy/issues)

</div>
