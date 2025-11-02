# 🎨 10 Features Incríveis do Anime.js v4 para Usar no OS Academy

Baseado em: [Anime.js v4 Documentation](https://animejs.com/documentation/)

---

## 1. **🎯 Stagger Animations (Cascata)**

Anima elementos sequencialmente com delays automáticos.

```typescript
import { animate, stagger } from "animejs";

animate('.card', {
  translateY: [50, 0],
  opacity: [0, 1],
  delay: stagger(100), // 100ms entre cada
  duration: 800
});
```

**Onde usar:**
- Entrada de cards na grid
- Lista de exercícios
- Tabelas comparativas

---

## 2. **🌊 Spring Physics (Física Realista)**

Animações com física de mola natural.

```typescript
import { animate, spring } from "animejs";

animate('.button', {
  scale: [0.8, 1],
  rotate: [10, 0],
  ease: spring({ mass: 1, stiffness: 80, damping: 10 })
});
```

**Onde usar:**
- Criação de segmentos
- Modal dialogs
- Tooltips

---

## 3. **📊 Timeline (Sequências Complexas)**

Orquestra múltiplas animações em sequência.

```typescript
import { createTimeline } from "animejs";

const tl = createTimeline();

tl.add({
  targets: '.step-1',
  translateY: [50, 0],
  duration: 600
}).add({
  targets: '.step-2',
  opacity: [0, 1],
  duration: 400
}).add({
  targets: '.step-3',
  scale: [0, 1],
  duration: 500
});
```

**Onde usar:**
- Page Fault Handler (8 steps)
- Process Creation
- Memory Compaction

---

## 4. **🎨 Morphing (SVG Path Morph)**

Transforma um SVG em outro suavemente.

```typescript
import { animate } from "animejs";
import { morphTo } from "animejs/svg";

const morph = morphTo('.shape-1', '.shape-2');

animate('.shape-1', {
  d: morph,
  duration: 1000,
  ease: 'inOutQuad'
});
```

**Onde usar:**
- Diagramas animados
- Transição entre estados
- Visualização de algoritmos

---

## 5. **✂️ Split Text (Animar Palavras/Letras)**

Separa texto em palavras ou letras para animar individualmente.

```typescript
import { animate, stagger } from "animejs";
import { splitText } from "animejs/text";

const split = splitText('.title', {
  type: 'chars' // ou 'words', 'lines'
});

animate(split.chars, {
  translateY: [-50, 0],
  opacity: [0, 1],
  delay: stagger(30),
  duration: 600
});
```

**Onde usar:**
- Títulos de seções
- Introduções
- Highlights importantes

---

## 6. **🖱️ Draggable (Arrasta e Solta)**

Elementos que podem ser arrastados com física.

```typescript
import { createDraggable } from "animejs/draggable";

createDraggable('.memory-block', {
  container: '.memory-grid',
  snap: true,
  onDrag: (draggable) => {
    console.log('Dragging:', draggable.x, draggable.y);
  },
  onRelease: (draggable) => {
    console.log('Released at:', draggable.x, draggable.y);
  }
});
```

**Onde usar:**
- Simulador de alocação manual
- Organização de segmentos
- Page Table rearrangement

---

## 7. **📜 Scroll-triggered Animations**

Animações ativadas pelo scroll.

```typescript
import { onScroll } from "animejs/events";

onScroll({
  target: '.section',
  link: animate('.diagram', {
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 800
  }),
  threshold: [0, 0.5, 1] // 0%, 50%, 100% visível
});
```

**Onde usar:**
- Diagramas que aparecem ao scroll
- Seções de teoria
- Transições entre tópicos

---

## 8. **🎭 Function-based Values (Valores Dinâmicos)**

Gera valores diferentes para cada elemento.

```typescript
import { animate, random } from "animejs/utils";

animate('.frame', {
  translateX: () => random(-10, 10),
  translateY: () => random(-10, 10),
  rotate: () => random(-5, 5),
  delay: stagger(50),
  duration: 600
});
```

**Onde usar:**
- Simulação de thrashing
- Page faults aleatórios
- Fragmentation visualization

---

## 9. **🔄 Keyframes (Múltiplos Estados)**

Define múltiplos pontos-chave na animação.

```typescript
import { animate } from "animejs";

animate('.process', {
  translateX: [
    { value: 0, duration: 0 },
    { value: 100, duration: 500 },
    { value: 50, duration: 300 },
    { value: 150, duration: 400 }
  ],
  backgroundColor: [
    { value: '#1e293b', duration: 0 },
    { value: '#3b82f6', duration: 500 },
    { value: '#10b981', duration: 400 }
  ]
});
```

**Onde usar:**
- Estados de processo (New → Ready → Running → Terminated)
- Page lifecycle
- Memory allocation stages

---

## 10. **⚡ Animatable (Reactive Values)**

Cria valores animáveis que podem ser controlados externamente.

```typescript
import { createAnimatable } from "animejs/animatable";

const progress = createAnimatable(0);

// Animar manualmente
progress.set(100, {
  duration: 2000,
  ease: 'outCubic',
  onUpdate: (value) => {
    console.log('Progress:', value);
    updateUI(value);
  }
});
```

**Onde usar:**
- Progress bars
- Contadores (page faults, TLB hits)
- Loading indicators

---

## 🎯 Combinações Poderosas

### **Exemplo 1: Page Fault Handler Completo**

```typescript
import { createTimeline, animate, stagger } from "animejs";

async function demonstratePageFault(virtualAddr: number) {
  const tl = createTimeline();
  
  // 1. Highlight virtual address
  tl.add(animate(`#addr-${virtualAddr}`, {
    scale: [1, 1.3, 1],
    boxShadow: [
      '0 0 0 0 rgba(59, 130, 246, 0)',
      '0 0 30px 10px rgba(59, 130, 246, 0.8)',
      '0 0 0 0 rgba(59, 130, 246, 0)'
    ],
    duration: 800
  }));
  
  // 2. Check TLB
  tl.add(animate('#tlb', {
    scale: [1, 1.1, 1],
    duration: 400
  }));
  
  // 3. TLB Miss - shake + red
  tl.add(animate('#tlb', {
    translateX: [-5, 5, -5, 5, 0],
    backgroundColor: ['#1e293b', '#ef4444', '#1e293b'],
    duration: 600
  }));
  
  // 4. Access Page Table
  tl.add(animate('.page-table-row', {
    opacity: [0.5, 1],
    delay: stagger(50),
    duration: 400
  }));
  
  // 5. Page Fault!
  tl.add(animate('#page-fault-counter', {
    scale: [1, 1.5, 1],
    color: ['#ef4444', '#dc2626', '#ef4444'],
    duration: 500
  }));
  
  // 6. Load from disk (slow rotation)
  tl.add(animate('#disk', {
    rotate: [0, 360],
    duration: 2000,
    ease: 'linear'
  }));
  
  // 7. Allocate frame with bounce
  tl.add(animate(`#frame-new`, {
    scale: [0, 1.2, 1],
    backgroundColor: ['#1e293b', '#10b981'],
    duration: 600,
    ease: 'outElastic(1, 0.6)'
  }));
  
  // 8. Update TLB - success green
  tl.add(animate('#tlb', {
    backgroundColor: ['#1e293b', '#10b981', '#1e293b'],
    duration: 600
  }));
}
```

### **Exemplo 2: Memory Compaction ÉPICA**

```typescript
import { animate, stagger } from "animejs";

async function compactMemory(segments) {
  // Phase 1: Lift all segments
  await animate('.segment', {
    translateY: -60,
    scale: 0.9,
    opacity: 0.7,
    rotate: () => random(-5, 5), // Cada um com rotação diferente
    delay: stagger(60),
    duration: 700,
    ease: 'outCubic'
  });
  
  // Phase 2: Reposition (update React state)
  repositionSegments();
  
  // Phase 3: Drop with elastic bounce
  await animate('.segment', {
    translateY: [60, -15, 0],
    scale: [0.9, 1.1, 1],
    opacity: [0.7, 1],
    rotate: [() => random(-5, 5), 0],
    delay: stagger(80, { from: 'center' }),
    duration: 1000,
    ease: 'outElastic(1, 0.5)'
  });
  
  // Phase 4: Celebration particles
  createParticles();
}
```

### **Exemplo 3: Diagrama Animado (Split Screen)**

```typescript
import { createTimeline, animate } from "animejs";

function animateSplitScreen() {
  const tl = createTimeline();
  
  // Left panel slides in
  tl.add(animate('.left-panel', {
    translateX: ['-100%', '0%'],
    opacity: [0, 1],
    duration: 800,
    ease: 'outExpo'
  }));
  
  // Right panel slides in
  tl.add(animate('.right-panel', {
    translateX: ['100%', '0%'],
    opacity: [0, 1],
    duration: 800,
    ease: 'outExpo'
  }), '-=400'); // 400ms overlap
  
  // Content fades in with stagger
  tl.add(animate('.content-item', {
    translateY: [30, 0],
    opacity: [0, 1],
    delay: stagger(100),
    duration: 600
  }));
}
```

---

## 📚 Referências

1. [Anime.js v4 Official Documentation](https://animejs.com/documentation/)
2. [Anime.js Examples Showcase](https://animejs.com/examples/)
3. [Using Anime.js with React](https://animejs.com/documentation/getting-started/using-with-react/)
4. [Awwwards - Anime.js Websites](https://www.awwwards.com/websites/anime-js/)
5. [Free Frontend - Anime.js Examples](https://freefrontend.com/anime-js-examples/)

---

**Última Atualização:** 2025-10-23  
**Versão:** 1.0.0

