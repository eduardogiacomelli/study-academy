"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { motion } from "framer-motion";
import { 
  FileText, 
  Database, 
  Settings, 
  Shield, 
  Code2,
  BookOpen,
  Terminal,
  Folder
} from "lucide-react";

export default function ArquivosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-blue-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-500/20 rounded-xl backdrop-blur-sm">
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">Arquivos</Badge>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text">
            Arquivos
          </h1>
          
          <p className="text-2xl text-slate-300 max-w-4xl mb-8">
            Conceitos fundamentais sobre arquivos, operações e estrutura usando exemplos do projeto real
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="conceitos" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="conceitos">
              <BookOpen className="w-4 h-4 mr-2" />
              Conceitos
            </TabsTrigger>
            <TabsTrigger value="operacoes">
              <Terminal className="w-4 h-4 mr-2" />
              Operações
            </TabsTrigger>
            <TabsTrigger value="estrutura">
              <Database className="w-4 h-4 mr-2" />
              Estrutura
            </TabsTrigger>
            <TabsTrigger value="exemplos">
              <Code2 className="w-4 h-4 mr-2" />
              Exemplos Reais
            </TabsTrigger>
          </TabsList>

          <TabsContent value="conceitos" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-blue-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-400" />
                O que é um Arquivo?
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-950/30 rounded-lg border border-blue-500/20">
                  <h4 className="font-semibold mb-2 text-blue-300">Perspectiva do Usuário</h4>
                  <p className="text-slate-300 text-sm">
                    Um arquivo é uma coleção de informações relacionadas tratada como uma unidade lógica.
                    No nosso projeto, exemplos incluem:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-slate-300 ml-4">
                    <li><code className="bg-slate-900/50 px-1 rounded">package.json</code> - Configuração do projeto</li>
                    <li><code className="bg-slate-900/50 px-1 rounded">app/page.tsx</code> - Componente React</li>
                    <li><code className="bg-slate-900/50 px-1 rounded">README.md</code> - Documentação</li>
                    <li><code className="bg-slate-900/50 px-1 rounded">tsconfig.json</code> - Configuração TypeScript</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-950/30 rounded-lg border border-purple-500/20">
                  <h4 className="font-semibold mb-2 text-purple-300">Perspectiva do Sistema Operacional</h4>
                  <p className="text-slate-300 text-sm mb-2">
                    Para o SO, um arquivo é uma sequência de bytes sem estrutura pré-definida. 
                    O sistema gerencia:
                  </p>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="p-3 bg-slate-900/50 rounded">
                      <p className="text-xs text-slate-400 mb-1">Metadados</p>
                      <p className="text-sm text-slate-300">Nome, tamanho, permissões, datas</p>
                    </div>
                    <div className="p-3 bg-slate-900/50 rounded">
                      <p className="text-xs text-slate-400 mb-1">Alocação</p>
                      <p className="text-sm text-slate-300">Blocos físicos no disco</p>
                    </div>
                    <div className="p-3 bg-slate-900/50 rounded">
                      <p className="text-xs text-slate-400 mb-1">Mapeamento</p>
                      <p className="text-sm text-slate-300">Bytes lógicos → blocos físicos</p>
                    </div>
                    <div className="p-3 bg-slate-900/50 rounded">
                      <p className="text-xs text-slate-400 mb-1">Acesso</p>
                      <p className="text-sm text-slate-300">Controle de leitura/escrita</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-blue-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4">Tipos de Arquivos no Projeto</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-950/30 rounded-lg border border-green-500/20">
                  <h4 className="font-semibold mb-2 text-green-300 flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    Arquivos de Código
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li>• <code className="bg-slate-900/50 px-1 rounded">.tsx</code> - Componentes React</li>
                    <li>• <code className="bg-slate-900/50 px-1 rounded">.ts</code> - TypeScript</li>
                    <li>• <code className="bg-slate-900/50 px-1 rounded">.json</code> - Dados estruturados</li>
                    <li>• <code className="bg-slate-900/50 px-1 rounded">.css</code> - Estilos</li>
                  </ul>
                </div>

                <div className="p-4 bg-orange-950/30 rounded-lg border border-orange-500/20">
                  <h4 className="font-semibold mb-2 text-orange-300 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Arquivos de Documentação
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li>• <code className="bg-slate-900/50 px-1 rounded">.md</code> - Markdown</li>
                    <li>• <code className="bg-slate-900/50 px-1 rounded">.pdf</code> - PDFs</li>
                    <li>• <code className="bg-slate-900/50 px-1 rounded">README</code> - Documentação</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-950/30 rounded-lg border border-blue-500/20">
                  <h4 className="font-semibold mb-2 text-blue-300 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Arquivos de Configuração
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li>• <code className="bg-slate-900/50 px-1 rounded">package.json</code> - Dependências</li>
                    <li>• <code className="bg-slate-900/50 px-1 rounded">tsconfig.json</code> - TypeScript</li>
                    <li>• <code className="bg-slate-900/50 px-1 rounded">next.config.ts</code> - Next.js</li>
                    <li>• <code className="bg-slate-900/50 px-1 rounded">tailwind.config.ts</code> - Tailwind</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-950/30 rounded-lg border border-purple-500/20">
                  <h4 className="font-semibold mb-2 text-purple-300 flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Diretórios Especiais
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li>• <code className="bg-slate-900/50 px-1 rounded">app/</code> - Rotas Next.js</li>
                    <li>• <code className="bg-slate-900/50 px-1 rounded">components/</code> - Componentes</li>
                    <li>• <code className="bg-slate-900/50 px-1 rounded">node_modules/</code> - Dependências</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="operacoes" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-blue-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4">Operações sobre Arquivos</h3>
              
              <div className="space-y-4">
                {[
                  {
                    name: "Criação (create)",
                    icon: FileText,
                    description: "Cria um novo arquivo vazio no sistema de arquivos",
                    example: "touch package.json",
                    code: `// Exemplo: Criar novo arquivo
const fs = require('fs');
fs.writeFileSync('novo-arquivo.txt', '');
// ou no terminal:
// touch novo-arquivo.txt`
                  },
                  {
                    name: "Abertura (open)",
                    icon: Folder,
                    description: "Prepara arquivo para operações, verifica permissões",
                    example: "const file = fs.openSync('package.json', 'r');",
                    code: `// Exemplo: Abrir arquivo para leitura
const fs = require('fs');
const fd = fs.openSync('app/page.tsx', 'r');
// fd = file descriptor (número que identifica o arquivo aberto)
// Verifica permissões antes de abrir`
                  },
                  {
                    name: "Leitura (read)",
                    icon: BookOpen,
                    description: "Lê dados do arquivo para memória",
                    example: "const content = fs.readFileSync('package.json');",
                    code: `// Exemplo: Ler conteúdo completo
const fs = require('fs');
const content = fs.readFileSync('package.json', 'utf8');
console.log(content);

// Ou ler em chunks (para arquivos grandes)
const stream = fs.createReadStream('app/page.tsx');
stream.on('data', (chunk) => {
  console.log(chunk.toString());
});`
                  },
                  {
                    name: "Escrita (write)",
                    icon: Code2,
                    description: "Escreve dados da memória para arquivo",
                    example: "fs.writeFileSync('arquivo.txt', 'conteúdo');",
                    code: `// Exemplo: Escrever no arquivo
const fs = require('fs');
fs.writeFileSync('app/page.tsx', '// Novo conteúdo');

// Ou escrever em modo append
fs.appendFileSync('log.txt', 'Nova linha\\n');

// Ou escrever em chunks
const stream = fs.createWriteStream('output.txt');
stream.write('Dados...');`
                  },
                  {
                    name: "Reposicionamento (seek)",
                    icon: Terminal,
                    description: "Muda posição do cursor no arquivo",
                    example: "fs.seek(fd, offset, whence);",
                    code: `// Exemplo: Acesso aleatório
const fs = require('fs');
const fd = fs.openSync('arquivo.txt', 'r+');

// Ler a partir do byte 100
const buffer = Buffer.alloc(50);
fs.readSync(fd, buffer, 0, 50, 100);

// Escrever a partir do byte 200
fs.writeSync(fd, Buffer.from('novo texto'), 0, 11, 200);`
                  },
                  {
                    name: "Fechamento (close)",
                    icon: Shield,
                    description: "Finaliza acesso ao arquivo, libera recursos",
                    example: "fs.closeSync(fd);",
                    code: `// Exemplo: Fechar arquivo
const fs = require('fs');
const fd = fs.openSync('arquivo.txt', 'r');
// ... operações ...
fs.closeSync(fd); // Libera file descriptor`
                  },
                  {
                    name: "Exclusão (delete/unlink)",
                    icon: FileText,
                    description: "Remove arquivo do sistema de arquivos",
                    example: "fs.unlinkSync('arquivo.txt');",
                    code: `// Exemplo: Deletar arquivo
const fs = require('fs');
fs.unlinkSync('arquivo-temp.txt');

// Ou de forma assíncrona
fs.unlink('arquivo-temp.txt', (err) => {
  if (err) console.error(err);
  else console.log('Arquivo deletado');
});`
                  }
                ].map((op, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 bg-slate-900/50 rounded-lg border border-blue-500/20"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <op.icon className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-300 mb-1">{op.name}</h4>
                        <p className="text-sm text-slate-300 mb-2">{op.description}</p>
                        <div className="bg-slate-950/50 p-2 rounded mb-2">
                          <code className="text-xs text-blue-300">{op.example}</code>
                        </div>
                        <CodeBlock language="javascript" title={`Exemplo: ${op.name}`}>
                          {op.code}
                        </CodeBlock>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="estrutura" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-blue-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4">Estrutura Interna de Arquivos</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-950/30 rounded-lg">
                  <h4 className="font-semibold mb-3 text-blue-300">Arquivo como Sequência de Bytes</h4>
                  <p className="text-sm text-slate-300 mb-3">
                    O sistema operacional não interpreta o conteúdo do arquivo. 
                    Para o SO, <code className="bg-slate-900/50 px-1 rounded">app/page.tsx</code> é apenas uma sequência de bytes:
                  </p>
                  <CodeBlock language="text" title="Exemplo: app/page.tsx visto pelo SO">
{`Bytes: [0x22, 0x75, 0x73, 0x65, 0x20, 0x63, 0x6c, 0x69, 0x65, 0x6e, 0x74, ...]
      ↓
ASCII: " u  s  e     c  l  i  e  n  t  ..."`}
                  </CodeBlock>
                </div>

                <div className="p-4 bg-purple-950/30 rounded-lg">
                  <h4 className="font-semibold mb-3 text-purple-300">Metadados do Arquivo</h4>
                  <p className="text-sm text-slate-300 mb-3">
                    Informações sobre o arquivo (armazenadas no inode no Unix/Linux):
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-900/50 rounded">
                      <p className="text-xs text-slate-400 mb-1">Nome</p>
                      <code className="text-sm text-purple-300">app/page.tsx</code>
                    </div>
                    <div className="p-3 bg-slate-900/50 rounded">
                      <p className="text-xs text-slate-400 mb-1">Tamanho</p>
                      <code className="text-sm text-purple-300">15.234 bytes</code>
                    </div>
                    <div className="p-3 bg-slate-900/50 rounded">
                      <p className="text-xs text-slate-400 mb-1">Permissões</p>
                      <code className="text-sm text-purple-300">rw-r--r--</code>
                    </div>
                    <div className="p-3 bg-slate-900/50 rounded">
                      <p className="text-xs text-slate-400 mb-1">Proprietário</p>
                      <code className="text-sm text-purple-300">eduardo</code>
                    </div>
                    <div className="p-3 bg-slate-900/50 rounded">
                      <p className="text-xs text-slate-400 mb-1">Data Modificação</p>
                      <code className="text-sm text-purple-300">2024-12-15 14:30</code>
                    </div>
                    <div className="p-3 bg-slate-900/50 rounded">
                      <p className="text-xs text-slate-400 mb-1">Inode Number</p>
                      <code className="text-sm text-purple-300">#12345</code>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="exemplos" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-blue-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4">Exemplos Reais do Projeto</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-950/30 rounded-lg border border-green-500/20">
                  <h4 className="font-semibold mb-2 text-green-300">Exemplo 1: package.json</h4>
                  <p className="text-sm text-slate-300 mb-2">
                    <strong>Caminho absoluto:</strong> <code className="bg-slate-900/50 px-1 rounded text-green-300">/home/eduardo/study/os-db-academy/package.json</code>
                  </p>
                  <p className="text-sm text-slate-300 mb-2">
                    <strong>Caminho relativo de app/:</strong> <code className="bg-slate-900/50 px-1 rounded text-green-300">../package.json</code>
                  </p>
                  <p className="text-xs text-slate-400">
                    Este arquivo contém metadados do projeto: nome, versão, dependências, scripts.
                  </p>
                </div>

                <div className="p-4 bg-blue-950/30 rounded-lg border border-blue-500/20">
                  <h4 className="font-semibold mb-2 text-blue-300">Exemplo 2: app/page.tsx</h4>
                  <p className="text-sm text-slate-300 mb-2">
                    <strong>Caminho absoluto:</strong> <code className="bg-slate-900/50 px-1 rounded text-blue-300">/home/eduardo/study/os-db-academy/app/page.tsx</code>
                  </p>
                  <p className="text-sm text-slate-300 mb-2">
                    <strong>Caminho relativo de app/os/:</strong> <code className="bg-slate-900/50 px-1 rounded text-blue-300">../page.tsx</code>
                  </p>
                  <p className="text-xs text-slate-400">
                    Arquivo de código fonte React/TypeScript. O SO vê apenas bytes, mas o Node.js interpreta como código.
                  </p>
                </div>

                <div className="p-4 bg-purple-950/30 rounded-lg border border-purple-500/20">
                  <h4 className="font-semibold mb-2 text-purple-300">Exemplo 3: components/shared/CollapsibleNav.tsx</h4>
                  <p className="text-sm text-slate-300 mb-2">
                    <strong>Caminho absoluto:</strong> <code className="bg-slate-900/50 px-1 rounded text-purple-300">/home/eduardo/study/os-db-academy/components/shared/CollapsibleNav.tsx</code>
                  </p>
                  <p className="text-sm text-slate-300 mb-2">
                    <strong>Caminho relativo de app/os/memoria/:</strong> <code className="bg-slate-900/50 px-1 rounded text-purple-300">../../../components/shared/CollapsibleNav.tsx</code>
                  </p>
                  <p className="text-xs text-slate-400">
                    Componente compartilhado. Note como o caminho relativo sobe 3 níveis (memoria → os → app → raiz) antes de descer para components.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

