# 🎓 Guia de Animações Educativas - OS Academy

## 📚 Princípios Fundamentais

### 🎯 Objetivo das Animações Educativas

As animações **não devem ser apenas decorativas**. Elas precisam:

1. **Mostrar Mudanças de Estado**
   - Antes/Depois claramente visíveis
   - Valores que mudam devem ser destacados
   - Cores indicam significado (verde = sucesso, vermelho = erro, amarelo = aviso)

2. **Revelar Processos**
   - Passo a passo do algoritmo
   - Ordem de execução visível
   - Timing que permite compreensão

3. **Indicar Relações**
   - Conexões entre elementos
   - Causa e efeito
   - Dependências

---

## 🎬 Anime.js v4 - Sintaxe Correta

### ✅ Importação Correta (Next.js 15)

```typescript
import { animate, stagger, createScope, spring } from "animejs";
```

**Fonte:** [Anime.js Documentation](https://animejs.com/documentation/getting-started/using-with-react/)

### ✅ Sintaxe v4 (Named Exports)

```typescript
// ❌ ERRADO (v3)
import anime from "animejs";
anime({
  targets: '.element',
  translateX: 250
});

// ✅ CORRETO (v4)
import { animate } from "animejs";
animate('.element', {
  translateX: 250
});
```

### 📖 Mudanças Principais v3 → v4

| v3 | v4 | Observação |
|---|---|---|
| `anime()` | `animate()` | Função principal renomeada |
| `anime.stagger()` | `stagger()` | Named export |
| `easing: 'easeOutExpo'` | `ease: 'outExpo'` | Sintaxe simplificada |
| `complete: callback` | `onComplete: callback` | Prefixo `on` |
| `targets: '.el'` | Primeiro parâmetro | `.animate('.el', {...})` |

---

## 🎨 Padrões para Animações Educativas

### 1. **Entrada de Elementos (Stagger)**

```typescript
// Mostrar criação sequencial de segmentos na memória
animate('.segment-block', {
  translateY: ['-100%', '0%'],
  opacity: [0, 1],
  scale: [0.8, 1],
  delay: stagger(100), // 100ms entre cada
  duration: 800,
  ease: 'spring(1, 80, 10, 0)' // Bounce natural
});
```

**O que mostra:** Memória sendo preenchida gradualmente

### 2. **Mudança de Valores (Color + Transform)**

```typescript
// Mostrar atualização de valor em célula de memória
animate(`#cell-${id}`, {
  backgroundColor: [
    '#1e293b', // Cinza (vazio)
    '#3b82f6', // Azul (processando)
    '#10b981'  // Verde (completo)
  ],
  scale: [1, 1.15, 1], // Pulse
  duration: 1200,
  ease: 'inOutQuad'
});

// Atualizar texto do valor
element.textContent = newValue; // Sincronizado!
```

**O que mostra:** Célula sendo escrita com novo valor

### 3. **Movimento/Compactação**

```typescript
// Mostrar segmentos sendo movidos na compactação
animate('.segment-block', {
  translateY: [0, -20, 0], // Bounce up/down
  duration: 1000,
  delay: stagger(100),
  ease: 'inOutQuad',
  onComplete: () => {
    // Atualizar posições reais APÓS animação
    updateSegmentPositions();
  }
});
```

**O que mostra:** Processo de compactação eliminando fragmentação

### 4. **Destaque de Foco (Highlight)**

```typescript
// Mostrar qual elemento está sendo processado
animate(`#active-frame`, {
  scale: [1, 1.2, 1],
  boxShadow: [
    '0 0 0 0 rgba(59, 130, 246, 0)',
    '0 0 20px 5px rgba(59, 130, 246, 0.8)',
    '0 0 0 0 rgba(59, 130, 246, 0)'
  ],
  duration: 1500,
  loop: 3 // Repetir 3x para ênfase
});
```

**O que mostra:** Frame atualmente acessado pela CPU

### 5. **Falha/Erro (Page Fault)**

```typescript
// Mostrar page fault (tremor + vermelho)
animate(`#page-${id}`, {
  translateX: [-5, 5, -5, 5, 0], // Shake
  backgroundColor: ['#1e293b', '#ef4444', '#1e293b'],
  duration: 600,
  ease: 'inOutQuad',
  onComplete: () => {
    // Carregar do disco
    loadFromDisk(id);
  }
});
```

**O que mostra:** Page fault acontecendo + resolução

---

## 🔥 Exemplo Completo: Algoritmo de Paginação

```typescript
async function demonstratePageFaultHandling(virtualAddress: number) {
  const pageNumber = Math.floor(virtualAddress / PAGE_SIZE);
  const offset = virtualAddress % PAGE_SIZE;
  
  // 1. Highlight endereço virtual
  animate(`#virtual-addr-${virtualAddress}`, {
    scale: [1, 1.3, 1],
    backgroundColor: ['transparent', '#fbbf24', 'transparent'],
    duration: 600
  });
  
  await wait(700);
  
  // 2. Consultar TLB
  animate('#tlb', {
    opacity: [0.5, 1],
    scale: [1, 1.05, 1],
    duration: 400
  });
  
  const tlbHit = checkTLB(pageNumber);
  
  if (!tlbHit) {
    // 3. TLB Miss - mostrar vermelho
    animate('#tlb', {
      backgroundColor: ['transparent', '#ef4444', 'transparent'],
      duration: 800
    });
    
    await wait(900);
    
    // 4. Consultar Page Table
    animate(`#page-table-entry-${pageNumber}`, {
      scale: [1, 1.2, 1],
      boxShadow: ['none', '0 0 20px #3b82f6', 'none'],
      duration: 600
    });
    
    await wait(700);
    
    const present = checkPageTable(pageNumber);
    
    if (!present) {
      // 5. Page Fault! - shake + vermelho
      animate(`#page-${pageNumber}`, {
        translateX: [-10, 10, -10, 10, 0],
        backgroundColor: ['#1e293b', '#ef4444', '#1e293b'],
        duration: 800
      });
      
      // Mostrar contador de page faults incrementando
      pageFaultCount++;
      animate('#page-fault-counter', {
        scale: [1, 1.5, 1],
        color: ['#ef4444', '#dc2626', '#ef4444'],
        duration: 500
      });
      
      await wait(900);
      
      // 6. Carregar do disco (lento!)
      animate('#disk', {
        rotate: [0, 360],
        duration: 2000, // Lento!
        ease: 'linear'
      });
      
      await wait(2100);
      
      // 7. Alocar frame
      const frame = allocateFrame();
      animate(`#frame-${frame}`, {
        backgroundColor: ['#1e293b', '#10b981'],
        scale: [0.8, 1.2, 1],
        duration: 600
      });
    }
    
    // 8. Atualizar TLB
    animate('#tlb', {
      backgroundColor: ['transparent', '#10b981', 'transparent'],
      duration: 600
    });
  } else {
    // TLB Hit - verde rápido
    animate('#tlb', {
      backgroundColor: ['transparent', '#10b981', 'transparent'],
      duration: 400
    });
  }
  
  await wait(500);
  
  // 9. Acessar frame físico final
  const physicalAddr = (frameNumber * PAGE_SIZE) + offset;
  animate(`#physical-addr-${physicalAddr}`, {
    scale: [1, 1.3, 1],
    backgroundColor: ['transparent', '#10b981', 'transparent'],
    boxShadow: ['none', '0 0 30px #10b981', 'none'],
    duration: 800
  });
  
  // Mostrar métricas finais
  updateMetrics();
}

// Helper para delay
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
```

---

## 🎯 Checklist de Qualidade

### ✅ Animação Educativa BOA:

- [ ] Mostra **estado inicial** claramente
- [ ] Mostra **mudança de valores** com destaque
- [ ] **Velocidade apropriada** (nem rápida demais, nem lenta)
- [ ] **Cores significativas** (verde = ok, vermelho = erro, azul = processando)
- [ ] **Texto/Números** atualizam sincronizados
- [ ] **Ordem sequencial** clara (passo 1, 2, 3...)
- [ ] **Feedback** ao usuário (toast, highlight, shake)
- [ ] **Pausas entre etapas** para compreensão
- [ ] **Repetível** (botão "Animar Novamente")
- [ ] **Cancelável** (se muito longa)

### ❌ Animação Educativa RUIM:

- [ ] Apenas decorativa (não ensina nada)
- [ ] Muito rápida (usuário não vê)
- [ ] Muito lenta (usuário se frustra)
- [ ] Cores aleatórias (sem significado)
- [ ] Valores não atualizam (dessincronia)
- [ ] Pulam etapas importantes
- [ ] Nauseante (muita vibração/rotação)
- [ ] Sem feedback de progresso
- [ ] Não pode ser pausada/cancelada

---

## 📊 Exemplos Implementados no OS Academy

### 1. **Simulador de Segmentação** (`/os/memoria/segmentacao/simulador`)

```typescript
// Criação de segmento com entrada animada
animate(`#${newSegment.id}`, {
  translateY: ['-100%', '0%'], // Entra de cima
  opacity: [0, 1],
  scale: [0.8, 1],
  rotate: [10, 0],
  duration: 800,
  ease: 'spring(1, 80, 10, 0)' // Spring physics!
});

// Compactação mostrando movimento
animate('.segment-block', {
  translateY: [0, -20, 0], // Bounce
  duration: 1000,
  delay: stagger(100), // Sequencial!
  ease: 'inOutQuad'
});
```

**Aprendizado:** Usuário vê segmentos sendo alocados e compactados sequencialmente

### 2. **Comparativo Paginação vs Segmentação** (`/vs-paginacao`)

```typescript
// Entrada cascata de métricas
animate('.metric-row', {
  translateX: [-30, 0],
  opacity: [0, 1],
  delay: stagger(50), // 50ms entre cada
  duration: 600
});

// Highlight ao clicar
animate(`[data-aspect="${aspect}"]`, {
  scale: [1, 1.05, 1], // Pulse
  backgroundColor: ['transparent', '#f0f9ff', 'transparent'],
  duration: 600
});
```

**Aprendizado:** Usuário vê comparação organizada, pode clicar para explorar

---

## 🚀 Próximos Passos

### Animações a Implementar:

1. **Page Fault Handler Completo** (8 steps animated)
2. **TLB Lookup com Hit/Miss visual**
3. **LRU Algorithm com stack visual**
4. **Memory Compaction com before/after**
5. **Process Creation com memory allocation**
6. **Context Switch mostrando troca de page tables**

---

## 📚 Referências

- [Anime.js v4 Documentation](https://animejs.com/documentation/)
- [Using Anime.js with React](https://animejs.com/documentation/getting-started/using-with-react/)
- [Educational Animation Principles (Nielsen Norman Group)](https://www.nngroup.com/articles/animation-usability/)
- [Awwwards - Best Animated Websites](https://www.awwwards.com/websites/animation/)

---

**Última Atualização:** 2025-10-23  
**Versão:** 1.0.0  
**Autor:** OS Academy Team

