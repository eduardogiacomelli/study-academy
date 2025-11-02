# 🎓 OS Academy - Plataforma Interativa de Sistemas Operacionais

> Aprenda Sistemas Operacionais através de **simuladores visuais 3D**, **exercícios gamificados** e conteúdo acadêmico validado.

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.180-black?logo=three.js)](https://threejs.org/)

---

## ✨ **Destaques**

### 🎮 **12 Simuladores Interativos**
- **Paginação 2D/3D** - Tradução de endereços com visualização em tempo real
- **TLB 3D** - Translation Lookaside Buffer com partículas animadas
- **Memória Virtual** - Demand paging, page faults e working set
- **Algoritmos de Substituição** - FIFO, LRU, Clock, Optimal + Belady
- **Segmentação** - Tabelas de segmentos e proteção de memória
- **Copy-on-Write** - Visualização do mecanismo COW
- **EAT Calculator** - Effective Access Time interativo
- **Memory Hierarchy** - Hierarquia completa de memória

### 📚 **25+ Exercícios Gamificados**
- Sistema de pontuação e progresso
- Filtros por categoria e dificuldade
- Feedback instantâneo com explicações
- Dashboard de performance

### 🎨 **UX Premium**
- Animações buttery smooth (60fps constante)
- Dark mode nativo
- Smooth scroll com Lenis
- Navegação instantânea
- Design system consistente

---

## 🚀 **Quick Start**

### Pré-requisitos
```bash
Node.js 18+ | npm ou yarn
```

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/os-academy.git
cd os-academy

# Instale dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### Build para Produção

```bash
npm run build
npm start
```

---

## 📁 **Estrutura do Projeto**

```
os-academy/
├── app/
│   ├── page.tsx                    # Landing page animada
│   ├── layout.tsx                  # Layout global + providers
│   ├── globals.css                 # Estilos globais + Tailwind
│   │
│   └── os/
│       ├── page.tsx                # Dashboard de Sistemas Operacionais
│       ├── layout.tsx              # Layout OS
│       │
│       ├── exercicios/
│       │   └── page.tsx            # 25+ exercícios gamificados
│       │
│       └── memoria/
│           ├── paginacao/          # 3 simuladores + teoria
│           ├── segmentacao/        # Simulador de segmentação
│           ├── virtual/            # 6 simuladores de memória virtual
│           └── substituicao/       # 4 algoritmos de substituição
│
├── components/
│   ├── os/                         # 12 simuladores de SO
│   │   ├── PagingSimulator.tsx
│   │   ├── PagingVisualizer3D.tsx
│   │   ├── TLBVisualizer3D.tsx
│   │   ├── SegmentationSimulator.tsx
│   │   ├── VirtualMemorySimulator.tsx
│   │   ├── PageFaultVisualizer.tsx
│   │   ├── WorkingSetVisualizer.tsx
│   │   ├── CopyOnWriteVisualizer.tsx
│   │   ├── EffectiveAccessTimeCalculator.tsx
│   │   ├── MemoryHierarchyDiagram.tsx
│   │   ├── PageReplacementComparator.tsx
│   │   └── BeladyAnomalyDemonstrator.tsx
│   │
│   ├── exercises/                  # Sistema de exercícios
│   │   ├── ExerciseCard.tsx
│   │   ├── ExerciseFilters.tsx
│   │   └── ProgressDashboard.tsx
│   │
│   ├── shared/                     # Componentes reutilizáveis
│   │   ├── SmoothScroll.tsx       # Lenis integration
│   │   ├── GlobalLoading.tsx      # Loading com prefetch
│   │   ├── CollapsibleNav.tsx     # Navegação hamburger
│   │   ├── ValidatedInput.tsx     # Input com validação visual
│   │   ├── CodeBlock.tsx
│   │   ├── ComparisonTable.tsx
│   │   ├── EducationalTooltip.tsx
│   │   └── PageLayout.tsx
│   │
│   └── ui/                         # Shadcn/ui components
│
├── data/
│   └── exercises-database.ts       # Banco de 25+ exercícios
│
└── lib/
    └── utils.ts                    # Utilidades
```

---

## 🛠️ **Stack Tecnológica**

### **Core**
- **Next.js 15.5** - App Router + RSC
- **React 19.1** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 3.4** - Styling

### **Animações**
- **Framer Motion 12** - Animações 2D
- **Lenis 1.1** - Smooth scroll
- **GSAP 3.13** - Animações avançadas (em implementação)

### **3D Graphics**
- **Three.js 0.180** - WebGL rendering
- **React Three Fiber 9.4** - React renderer para Three.js
- **@react-three/drei 10.7** - Helpers 3D

### **UI Components**
- **Shadcn/ui** - Component library
- **Radix UI** - Primitives acessíveis
- **Lucide React** - Ícones
- **Sonner** - Toasts elegantes

---

## 📚 **Conteúdo Acadêmico**

### **Baseado em:**
- **Tanenbaum** - Modern Operating Systems (Cap. 3)
- **Silberschatz** - Operating System Concepts (Cap. 9)
- **INE5611 (UFSC)** - Listas de exercícios validadas

### **Tópicos Cobertos:**
- ✅ Conceitos Básicos de Memória
- ✅ Hierarquia de Memória
- ✅ MMU e Tradução de Endereços
- ✅ Paginação (simples e multinível)
- ✅ TLB (Translation Lookaside Buffer)
- ✅ Segmentação
- ✅ Memória Virtual
- ✅ Demand Paging
- ✅ Page Faults e Page Fault Handling
- ✅ Algoritmos de Substituição (FIFO, LRU, Clock, Optimal)
- ✅ Anomalia de Belady
- ✅ Working Set e Thrashing
- ✅ Copy-on-Write
- ✅ Effective Access Time (EAT)
- ✅ Fragmentação (Interna e Externa)

---

## 🎯 **Features Principais**

### **1. Simuladores Interativos**
Cada simulador permite:
- ⚙️ Configuração de parâmetros
- ▶️ Execução passo a passo
- 📊 Visualização em tempo real
- 📈 Métricas e estatísticas
- 💡 Tooltips educacionais
- 🎨 Animações suaves (60fps)

### **2. Exercícios Gamificados**
- 🎯 25+ questões validadas
- 📊 Sistema de pontuação (590+ pts)
- 🏆 Dashboard de progresso
- 🎓 Explicações detalhadas
- 💡 Dicas contextuais
- 🔄 Feedback instantâneo

### **3. Visualizações 3D**
- 🎮 TLB com partículas animadas
- 🗂️ Tabela de páginas 3D interativa
- 🔄 Transições animadas
- 🎨 Materiais e iluminação realista
- 🖱️ Controles orbit intuitivos

---

## ⚡ **Performance**

### **Build Stats**
```
Route                          Size       First Load JS
├ /                            15.2 KB    115 KB
├ /os                          12.8 KB    113 KB
├ /os/exercicios               14.1 KB    114 KB
├ /os/memoria/paginacao        18.5 KB    119 KB
└ Total First Load JS          ~115 KB
```

### **Otimizações**
- ✅ Code splitting automático
- ✅ Static Site Generation (SSG)
- ✅ Lazy loading de componentes 3D
- ✅ Image optimization
- ✅ Bundle otimizado
- ✅ Prefetch de rotas
- ✅ 60fps em animações
- ✅ Smooth scroll nativo

---

## 🎨 **Design System**

### **Cores**
```typescript
os: {
  primary: "hsl(217, 91%, 60%)",    // Blue
  secondary: "hsl(187, 71%, 50%)",  // Cyan
}
```

### **Animações**
- Framer Motion para transições
- GPU-accelerated transforms
- Lenis para smooth scroll
- React Spring para física
- Three.js para 3D

---

## 📊 **Estatísticas**

```
📝 50+ arquivos TS/TSX
🧮 ~12,000 linhas de código
🎮 12 simuladores interativos
📚 25+ exercícios gamificados
🎨 3 visualizadores 3D
🏆 590+ pontos disponíveis
⚡ 60fps constante
✅ 0 erros TypeScript
🚀 Build: ~6.5s
```

---

## 🤝 **Contribuindo**

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

## 📝 **Roadmap**

### ✅ **Completo**
- [x] Módulo de Gerenciamento de Memória
- [x] 12 Simuladores interativos
- [x] 25+ Exercícios gamificados
- [x] Visualizações 3D
- [x] Sistema de pontuação
- [x] Dark mode

### 🚧 **Em Desenvolvimento**
- [ ] Módulo de Processos e Threads
- [ ] Escalonamento de CPU
- [ ] Sincronização e Deadlock
- [ ] Sistemas de Arquivos
- [ ] Integração com GSAP ScrollTrigger
- [ ] Animações avançadas

### 📋 **Planejado**
- [ ] Autenticação de usuários
- [ ] Salvamento de progresso em nuvem
- [ ] Leaderboard global
- [ ] Certificados de conclusão
- [ ] Modo competitivo
- [ ] Mobile app (PWA)

---

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 **Autor**

**Eduardo Giacomelli**

- GitHub: [@eduardogiacomelli](https://github.com/eduardogiacomelli)
- LinkedIn: [Eduardo Giacomelli](https://linkedin.com/in/eduardo-giacomelli)

---

## 🙏 **Agradecimentos**

- **UFSC** - Universidade Federal de Santa Catarina
- **INE5611** - Disciplina de Sistemas Operacionais
- **Prof. Eduardo Camilo Inacio** - Materiais de referência
- **Tanenbaum** - "Sistemas Operacionais Modernos"
- **Comunidade Open Source** - Por todas as bibliotecas incríveis

---

## ⭐ **Star o Projeto!**

Se este projeto te ajudou nos estudos, considere dar uma ⭐!

---

<div align="center">

**Desenvolvido com ❤️ para estudantes de Ciência da Computação**

[🚀 Deploy](https://os-academy.vercel.app) · [📚 Docs](https://github.com/eduardogiacomelli/os-academy/wiki) · [🐛 Report Bug](https://github.com/eduardogiacomelli/os-academy/issues)

</div>
