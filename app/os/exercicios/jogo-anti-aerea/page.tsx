"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { 
  Rocket,
  Target,
  Cpu,
  Code2,
  Terminal,
  FileCode,
  GitBranch,
  Calendar,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  Play,
  Download,
  ExternalLink,
  Shield,
  Zap,
  Users,
  Gamepad2
} from "lucide-react";

export default function JogoAntiAereaPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative overflow-hidden pt-24 pb-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="relative container mx-auto px-4 sm:px-6 text-center max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
              <Gamepad2 className="size-4" />
              <span className="text-sm font-medium">Projeto de Sistema Operacional</span>
            </div>
            
            <Rocket className="size-20 mx-auto mb-6 text-yellow-300" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Jogo Anti-Aérea
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Projeto prático de programação concorrente usando pthreads em C/C++
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Code2 className="size-4 mr-2" />
                C/C++
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Cpu className="size-4 mr-2" />
                pthreads
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Target className="size-4 mr-2" />
                Concorrência
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Calendar className="size-4 mr-2" />
                Entrega: 05/12/2024
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-12 max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="architecture">Arquitetura</TabsTrigger>
            <TabsTrigger value="implementation">Implementação</TabsTrigger>
            <TabsTrigger value="code">Código</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="size-6 text-blue-600" />
                  Sobre o Projeto
                </h2>
                <p className="text-muted-foreground mb-4">
                  O Jogo Anti-Aérea é um projeto acadêmico que visa demonstrar os conceitos de 
                  programação concorrente e sincronização de threads usando pthreads. O objetivo 
                  é criar um jogo de bateria antiaérea onde diferentes elementos do jogo são 
                  controlados por threads separadas.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle2 className="size-5 text-blue-600" />
                      Objetivos de Aprendizado
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Implementação de threads com pthreads</li>
                      <li>• Sincronização com mutexes e semáforos</li>
                      <li>• Comunicação entre threads</li>
                      <li>• Gerenciamento de recursos compartilhados</li>
                      <li>• Prevenção de race conditions</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertCircle className="size-5 text-purple-600" />
                      Requisitos Técnicos
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Linguagem: C ou C++</li>
                      <li>• Biblioteca: pthreads (libpthread)</li>
                      <li>• Interface: Terminal (ncurses) ou gráfica (SDL2)</li>
                      <li>• Compilador: gcc/g++ com flags -pthread</li>
                      <li>• Sistema: Linux/Unix (recomendado)</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Target className="size-6 text-yellow-600" />
                  Funcionalidades do Jogo
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Rocket className="size-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Naves Alienígenas</h4>
                        <p className="text-sm text-muted-foreground">
                          Movem-se horizontalmente na tela, cada uma em sua própria thread
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="size-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Bateria Antiaérea</h4>
                        <p className="text-sm text-muted-foreground">
                          Controlada pelo jogador, pode disparar foguetes
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Zap className="size-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Foguetes</h4>
                        <p className="text-sm text-muted-foreground">
                          Cada foguete disparado é uma thread separada
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Users className="size-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Thread de Input</h4>
                        <p className="text-sm text-muted-foreground">
                          Captura comandos do jogador de forma assíncrona
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Cpu className="size-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Thread Principal</h4>
                        <p className="text-sm text-muted-foreground">
                          Coordena todas as threads e gerencia o estado do jogo
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Gamepad2 className="size-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Sistema de Pontos</h4>
                        <p className="text-sm text-muted-foreground">
                          Pontuação compartilhada entre threads com sincronização
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Calendar className="size-6 text-blue-600" />
                  Cronograma e Entrega
                </h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="size-5 text-red-600" />
                      <span className="font-semibold">Data de Entrega: 05 de Dezembro de 2024</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Certifique-se de entregar o código-fonte completo, Makefile, documentação 
                      e um README com instruções de compilação e execução.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="text-2xl font-bold text-blue-600 mb-1">Fase 1</div>
                      <div className="text-sm font-semibold mb-2">Estrutura Base</div>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Setup do projeto</li>
                        <li>• Criação de threads</li>
                        <li>• Estruturas de dados</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="text-2xl font-bold text-purple-600 mb-1">Fase 2</div>
                      <div className="text-sm font-semibold mb-2">Sincronização</div>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Mutexes e semáforos</li>
                        <li>• Proteção de recursos</li>
                        <li>• Comunicação thread-safe</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="text-2xl font-bold text-green-600 mb-1">Fase 3</div>
                      <div className="text-sm font-semibold mb-2">Finalização</div>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Interface gráfica</li>
                        <li>• Testes e debug</li>
                        <li>• Documentação</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Architecture Tab */}
          <TabsContent value="architecture" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <GitBranch className="size-6 text-blue-600" />
                  Arquitetura de Threads
                </h2>
                <p className="text-muted-foreground mb-6">
                  O jogo utiliza múltiplas threads para gerenciar diferentes aspectos do gameplay. 
                  Cada thread tem uma responsabilidade específica e todas são coordenadas pela thread principal.
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Cpu className="size-5 text-blue-600" />
                      Thread Principal (Main Thread)
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Inicializa todas as estruturas de dados compartilhadas</li>
                      <li>• Cria e gerencia todas as outras threads</li>
                      <li>• Coordena o loop principal do jogo</li>
                      <li>• Renderiza o estado atual do jogo</li>
                      <li>• Gerencia finalização e cleanup</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Users className="size-5 text-green-600" />
                      Thread de Input (Jogador)
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Captura comandos do teclado de forma assíncrona</li>
                      <li>• Processa movimentos da bateria (esquerda/direita)</li>
                      <li>• Detecta comandos de disparo</li>
                      <li>• Comunica com thread principal via fila thread-safe</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Rocket className="size-5 text-purple-600" />
                      Threads das Naves (1 por nave)
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Cada nave alienígena tem sua própria thread</li>
                      <li>• Movimenta a nave horizontalmente na tela</li>
                      <li>• Detecta colisões com foguetes</li>
                      <li>• Remove-se quando destruída</li>
                      <li>• Atualiza estado compartilhado com mutex</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Zap className="size-5 text-orange-600" />
                      Threads dos Foguetes (1 por foguete)
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Cada foguete disparado cria uma nova thread</li>
                      <li>• Movimenta o foguete verticalmente</li>
                      <li>• Detecta colisão com naves ou saída da tela</li>
                      <li>• Remove-se quando atinge alvo ou sai da tela</li>
                      <li>• Atualiza pontuação de forma thread-safe</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="size-6 text-blue-600" />
                  Recursos Compartilhados e Sincronização
                </h2>
                
                <div className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-semibold mb-2">Estruturas de Dados Compartilhadas:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                      <li>• <code className="bg-muted px-1 rounded">game_state</code> - Estado global do jogo (pontuação, vidas, etc.)</li>
                      <li>• <code className="bg-muted px-1 rounded">naves_list</code> - Lista de naves ativas (protegida por mutex)</li>
                      <li>• <code className="bg-muted px-1 rounded">foguetes_list</code> - Lista de foguetes ativos (protegida por mutex)</li>
                      <li>• <code className="bg-muted px-1 rounded">input_queue</code> - Fila de comandos do jogador (thread-safe)</li>
                      <li>• <code className="bg-muted px-1 rounded">screen_buffer</code> - Buffer de renderização (protegido por mutex)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Mecanismos de Sincronização:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="p-3 rounded-lg bg-muted/50">
                        <h4 className="font-semibold text-sm mb-2">Mutexes (pthread_mutex_t)</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Proteção de listas (naves, foguetes)</li>
                          <li>• Acesso ao estado do jogo</li>
                          <li>• Atualização de pontuação</li>
                        </ul>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <h4 className="font-semibold text-sm mb-2">Condições (pthread_cond_t)</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Sinalização de eventos</li>
                          <li>• Notificação de colisões</li>
                          <li>• Coordenação de threads</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
                <h2 className="text-2xl font-bold mb-4">Diagrama de Arquitetura</h2>
                <div className="p-6 rounded-lg bg-background/50 border-2 border-dashed border-indigo-300 dark:border-indigo-700">
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <strong>Thread Principal</strong>
                      <div className="text-xs text-muted-foreground mt-1">Coordenação e Renderização</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-center p-3 bg-green-100 dark:bg-green-900/30 rounded">
                        <strong className="text-sm">Thread Input</strong>
                      </div>
                      <div className="text-center p-3 bg-purple-100 dark:bg-purple-900/30 rounded">
                        <strong className="text-sm">Thread Nave 1</strong>
                      </div>
                      <div className="text-center p-3 bg-orange-100 dark:bg-orange-900/30 rounded">
                        <strong className="text-sm">Thread Foguete 1</strong>
                      </div>
                      <div className="text-center p-3 bg-orange-100 dark:bg-orange-900/30 rounded">
                        <strong className="text-sm">Thread Foguete 2</strong>
                      </div>
                    </div>
                    
                    <div className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded">
                      <strong className="text-sm">Recursos Compartilhados</strong>
                      <div className="text-xs text-muted-foreground mt-1">
                        Protegidos por Mutexes
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Implementation Tab */}
          <TabsContent value="implementation" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <FileCode className="size-6 text-blue-600" />
                  Estrutura do Projeto
                </h2>
                
                <CodeBlock language="bash" title="Estrutura de Diretórios">
{`projeto-anti-aerea/
├── src/
│   ├── main.c              # Função main e thread principal
│   ├── game.h              # Definições e estruturas
│   ├── game.c              # Lógica do jogo
│   ├── threads.h           # Definições de threads
│   ├── threads.c           # Implementação das threads
│   ├── render.h            # Funções de renderização
│   ├── render.c            # Implementação de renderização
│   └── input.h             # Captura de input
│   └── input.c             # Implementação de input
├── Makefile                # Build system
├── README.md               # Documentação
└── docs/                   # Documentação adicional
    └── arquitetura.md`}
                </CodeBlock>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Terminal className="size-6 text-blue-600" />
                  Compilação e Execução
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Makefile Básico:</h3>
                    <CodeBlock language="makefile" title="Makefile">
{`CC = gcc
CFLAGS = -Wall -Wextra -std=c11 -pthread
LDFLAGS = -pthread
LIBS = -lncurses  # ou -lSDL2 para interface gráfica

TARGET = anti-aerea
SRCDIR = src
SOURCES = $(wildcard $(SRCDIR)/*.c)
OBJECTS = $(SOURCES:.c=.o)

$(TARGET): $(OBJECTS)
	$(CC) $(OBJECTS) -o $(TARGET) $(LDFLAGS) $(LIBS)

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(OBJECTS) $(TARGET)

.PHONY: clean`}
                    </CodeBlock>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Comandos:</h3>
                    <CodeBlock language="bash">
{`# Compilar
make

# Executar
./anti-aerea

# Limpar arquivos compilados
make clean`}
                    </CodeBlock>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Lightbulb className="size-6 text-blue-600" />
                  Boas Práticas e Dicas
                </h2>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                    <h3 className="font-semibold mb-2 text-green-700 dark:text-green-300">
                      ✅ O que fazer:
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Sempre proteja recursos compartilhados com mutexes</li>
                      <li>• Use timeouts em operações que podem travar (pthread_cond_timedwait)</li>
                      <li>• Implemente cleanup adequado (pthread_join) para todas as threads</li>
                      <li>• Valide inputs e estados antes de acessar recursos compartilhados</li>
                      <li>• Use valgrind para detectar memory leaks e race conditions</li>
                      <li>• Documente todas as estruturas de dados e funções</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                    <h3 className="font-semibold mb-2 text-red-700 dark:text-red-300">
                      ❌ O que evitar:
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Nunca acesse recursos compartilhados sem lock adequado</li>
                      <li>• Evite deadlocks (não mantenha múltiplos mutexes por muito tempo)</li>
                      <li>• Não use pthread_cancel sem cuidado (pode deixar recursos inconsistentes)</li>
                      <li>• Não compartilhe dados sem sincronização adequada</li>
                      <li>• Evite busy-waiting (use condições ou delays apropriados)</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Code Tab */}
          <TabsContent value="code" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Code2 className="size-6 text-blue-600" />
                  Exemplos de Código
                </h2>
                <p className="text-muted-foreground mb-6">
                  Seguem exemplos de implementação das principais funcionalidades do jogo.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Estruturas de Dados</h3>
                <CodeBlock language="c" title="game.h - Estruturas Principais">
{`#ifndef GAME_H
#define GAME_H

#include <pthread.h>
#include <stdbool.h>

#define MAX_NAVES 10
#define MAX_FOGUETES 20
#define SCREEN_WIDTH 80
#define SCREEN_HEIGHT 24

// Estrutura de uma nave
typedef struct {
    int id;
    int x, y;              // Posição
    bool ativa;            // Se ainda está no jogo
    pthread_t thread_id;   // Thread desta nave
} Nave;

// Estrutura de um foguete
typedef struct {
    int id;
    int x, y;              // Posição
    bool ativa;            // Se ainda está voando
    pthread_t thread_id;   // Thread deste foguete
} Foguete;

// Estado global do jogo
typedef struct {
    int pontuacao;
    int vidas;
    int bateria_x;         // Posição X da bateria
    bool game_over;
    
    // Listas de entidades
    Nave naves[MAX_NAVES];
    Foguete foguetes[MAX_FOGUETES];
    int num_naves;
    int num_foguetes;
    
    // Sincronização
    pthread_mutex_t mutex_naves;
    pthread_mutex_t mutex_foguetes;
    pthread_mutex_t mutex_estado;
    pthread_mutex_t mutex_screen;
    
    // Condições
    pthread_cond_t cond_input;
} GameState;

// Funções principais
void game_init(GameState* game);
void game_cleanup(GameState* game);
void* thread_nave(void* arg);
void* thread_foguete(void* arg);
void* thread_input(void* arg);

#endif`}
                </CodeBlock>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Thread de Nave</h3>
                <CodeBlock language="c" title="threads.c - Implementação da Thread de Nave">
{`#include "game.h"
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

void* thread_nave(void* arg) {
    // arg é um ponteiro para uma estrutura que contém nave e game
    typedef struct {
        Nave* nave;
        GameState* game;
    } ThreadArgs;
    
    ThreadArgs* args = (ThreadArgs*)arg;
    Nave* nave = args->nave;
    GameState* game = args->game;
    
    // Movimenta a nave da direita para a esquerda
    nave->x = SCREEN_WIDTH - 1;
    nave->y = rand() % (SCREEN_HEIGHT / 2);  // Metade superior da tela
    
    while (nave->ativa && !game->game_over) {
        // Atualiza posição
        nave->x--;
        
        // Verifica se saiu da tela
        if (nave->x < 0) {
            nave->ativa = false;
            break;
        }
        
        // Verifica colisão com foguetes
        pthread_mutex_lock(&game->mutex_foguetes);
        for (int i = 0; i < MAX_FOGUETES; i++) {
            if (game->foguetes[i].ativa &&
                game->foguetes[i].x == nave->x &&
                abs(game->foguetes[i].y - nave->y) <= 1) {
                // Colisão detectada!
                nave->ativa = false;
                game->foguetes[i].ativa = false;
                
                // Atualiza pontuação
                pthread_mutex_lock(&game->mutex_estado);
                game->pontuacao += 10;
                pthread_mutex_unlock(&game->mutex_estado);
                
                break;
            }
        }
        pthread_mutex_unlock(&game->mutex_foguetes);
        
        // Delay para controle de velocidade
        usleep(100000);  // 100ms
    }
    
    return NULL;
}`}
                </CodeBlock>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Thread de Foguete</h3>
                <CodeBlock language="c" title="threads.c - Implementação da Thread de Foguete">
{`void* thread_foguete(void* arg) {
    // arg é um ponteiro para uma estrutura que contém foguete e game
    typedef struct {
        Foguete* foguete;
        GameState* game;
    } ThreadArgs;
    
    ThreadArgs* args = (ThreadArgs*)arg;
    Foguete* foguete = args->foguete;
    GameState* game = args->game;
    
    // Inicia na posição da bateria
    foguete->x = game->bateria_x;
    foguete->y = SCREEN_HEIGHT - 1;  // Parte inferior
    
    while (foguete->ativa && !game->game_over) {
        // Move o foguete para cima
        foguete->y--;
        
        // Verifica se saiu da tela
        if (foguete->y < 0) {
            foguete->ativa = false;
            break;
        }
        
        // Verifica colisão com naves (já feito na thread da nave)
        // Apenas move
        
        // Delay para controle de velocidade
        usleep(50000);  // 50ms (mais rápido que as naves)
    }
    
    return NULL;
}`}
                </CodeBlock>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Thread de Input</h3>
                <CodeBlock language="c" title="input.c - Captura de Comandos">
{`#include "game.h"
#include <ncurses.h>
#include <unistd.h>

void* thread_input(void* arg) {
    GameState* game = (GameState*)arg;
    
    // Inicializa ncurses para input não-bloqueante
    initscr();
    cbreak();
    noecho();
    nodelay(stdscr, TRUE);
    keypad(stdscr, TRUE);
    
    while (!game->game_over) {
        int ch = getch();
        
        if (ch != ERR) {
            pthread_mutex_lock(&game->mutex_estado);
            
            switch (ch) {
                case KEY_LEFT:
                case 'a':
                case 'A':
                    if (game->bateria_x > 0)
                        game->bateria_x--;
                    break;
                    
                case KEY_RIGHT:
                case 'd':
                case 'D':
                    if (game->bateria_x < SCREEN_WIDTH - 1)
                        game->bateria_x++;
                    break;
                    
                case ' ':
                case KEY_UP:
                    // Dispara foguete
                    criar_foguete(game);
                    break;
                    
                case 'q':
                case 'Q':
                case 27:  // ESC
                    game->game_over = true;
                    break;
            }
            
            pthread_mutex_unlock(&game->mutex_estado);
            pthread_cond_signal(&game->cond_input);
        }
        
        usleep(10000);  // 10ms para não consumir CPU demais
    }
    
    endwin();
    return NULL;
}`}
                </CodeBlock>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Função Main</h3>
                <CodeBlock language="c" title="main.c - Thread Principal">
{`#include "game.h"
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <time.h>

int main() {
    GameState game;
    
    // Inicializa o jogo
    game_init(&game);
    srand(time(NULL));
    
    // Cria thread de input
    pthread_t thread_input_id;
    pthread_create(&thread_input_id, NULL, thread_input, &game);
    
    // Loop principal do jogo
    while (!game.game_over) {
        // Cria novas naves periodicamente
        if (game.num_naves < MAX_NAVES) {
            criar_nave(&game);
        }
        
        // Renderiza o estado atual
        render_game(&game);
        
        // Verifica condições de fim de jogo
        if (game.vidas <= 0) {
            game.game_over = true;
        }
        
        usleep(50000);  // 50ms
    }
    
    // Finaliza todas as threads
    finalizar_threads(&game);
    pthread_join(thread_input_id, NULL);
    
    // Cleanup
    game_cleanup(&game);
    
    printf("\\nGame Over! Pontuação final: %d\\n", game.pontuacao);
    return 0;
}`}
                </CodeBlock>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="size-6 text-blue-600" />
              Recursos Adicionais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-background/50 border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <ExternalLink className="size-4" />
                  Documentação pthreads
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Consulte a documentação oficial do Linux sobre pthreads:
                </p>
                <code className="text-xs bg-muted px-2 py-1 rounded block">
                  man pthread_create
                </code>
              </div>
              <div className="p-4 rounded-lg bg-background/50 border">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Lightbulb className="size-4" />
                  Debugging
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Use ferramentas para debugar seu código:
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• valgrind --tool=helgrind</li>
                  <li>• gdb com thread debugging</li>
                  <li>• ThreadSanitizer (TSan)</li>
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-12 mt-12 border-t">
          <a 
            href="/os/exercicios" 
            className="text-primary hover:underline flex items-center gap-2"
          >
            ← Voltar para Exercícios
          </a>
          <div className="text-sm text-muted-foreground">
            Projeto de Sistema Operacional
          </div>
        </div>
      </div>
    </div>
  );
}

