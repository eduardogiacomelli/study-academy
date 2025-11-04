"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { 
  Settings, 
  Database, 
  HardDrive,
  FileText,
  Layers
} from "lucide-react";

export default function ImplementacaoPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-950 text-white">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-cyan-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-cyan-500/20 rounded-xl backdrop-blur-sm">
              <Settings className="w-8 h-8 text-cyan-400" />
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">Implementação</Badge>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 text-transparent bg-clip-text">
            Implementação de Sistemas de Arquivos
          </h1>
          
          <p className="text-2xl text-slate-300 max-w-4xl mb-8">
            Estruturas de dados, algoritmos e mecanismos internos baseados em Tanenbaum
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="estrutura" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="estrutura">
              <Layers className="w-4 h-4 mr-2" />
              Estrutura
            </TabsTrigger>
            <TabsTrigger value="alocacao">
              <HardDrive className="w-4 h-4 mr-2" />
              Alocação
            </TabsTrigger>
            <TabsTrigger value="inodes">
              <Database className="w-4 h-4 mr-2" />
              i-Nodes
            </TabsTrigger>
            <TabsTrigger value="vfs">
              <FileText className="w-4 h-4 mr-2" />
              VFS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="estrutura" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Layers className="w-6 h-6 text-cyan-400" />
                Estrutura de um Sistema de Arquivos (Tanenbaum)
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-cyan-950/30 rounded-lg border border-cyan-500/20">
                  <h4 className="font-semibold mb-3 text-cyan-300">Layout Típico de um Disco</h4>
                  <p className="text-slate-300 mb-4 text-sm">
                    Segundo Tanenbaum, um sistema de arquivos Unix/Linux organiza o disco da seguinte forma:
                  </p>
                  
                  <CodeBlock language="text" title="Estrutura Textual do Disco">
{`┌─────────────────────────────────────────────────────────┐
│ MBR (Master Boot Record) - 512 bytes                    │
│ - Código de boot inicial                                 │
│ - Tabela de partições (4 entradas)                        │
├─────────────────────────────────────────────────────────┤
│ Partição 1: Sistema de Arquivos                         │
│                                                           │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Boot Block (1-2 blocos)                             │ │
│ │ - Código de boot do kernel                          │ │
│ │ - Carregado pelo MBR                                │ │
│ ├─────────────────────────────────────────────────────┤ │
│ │ Superblock (1 bloco)                                │ │
│ │ - Metadados do sistema de arquivos                 │ │
│ │ - Tamanho, número de blocos, número de inodes      │ │
│ │ - Localização de estruturas importantes            │ │
│ ├─────────────────────────────────────────────────────┤ │
│ │ Gerenciamento de Espaço Livre                      │ │
│ │ - Bitmap ou lista de blocos livres                 │ │
│ ├─────────────────────────────────────────────────────┤ │
│ │ i-Nodes                                             │ │
│ │ - Tabela de inodes (metadados dos arquivos)        │ │
│ │ - Cada inode ~256 bytes                            │ │
│ ├─────────────────────────────────────────────────────┤ │
│ │ Diretório Raiz                                      │ │
│ │ - Inode fixo (geralmente #2)                        │ │
│ │ - Contém entradas para /bin, /etc, /home, etc.     │ │
│ ├─────────────────────────────────────────────────────┤ │
│ │ Dados (Blocos de Arquivos)                         │ │
│ │ - Conteúdo real dos arquivos                        │ │
│ │ - Blocos de 1KB, 2KB, 4KB, etc.                    │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘`}
                  </CodeBlock>
                </div>

                <Card className="bg-blue-950/30 border-blue-500/20 p-6">
                  <h4 className="font-semibold mb-4 text-blue-300">Componentes Principais</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-blue-300">Master Boot Record (MBR)</h5>
                      <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                        <li>Primeiro setor do disco (512 bytes)</li>
                        <li>Contém código de boot inicial</li>
                        <li>Tabela de partições (4 entradas principais)</li>
                        <li>Indica qual partição é bootável</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-blue-300">Boot Block</h5>
                      <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                        <li>Bloco especial no início de cada partição</li>
                        <li>Contém código de boot do SO</li>
                        <li>Carregado pelo MBR ou UEFI</li>
                        <li>Inicia o kernel do sistema operacional</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-blue-300">Superblock</h5>
                      <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                        <li>Metadados críticos do sistema de arquivos</li>
                        <li>Tamanho total, blocos livres/ocupados</li>
                        <li>Localização de estruturas (inodes, bitmap)</li>
                        <li>Lido na montagem (mount)</li>
                        <li>Múltiplas cópias para redundância (ext4)</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded">
                      <h5 className="font-semibold mb-2 text-blue-300">Diretório Raiz</h5>
                      <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                        <li>Diretório raiz do sistema (&quot;/&quot;)</li>
                        <li>Inode fixo (geralmente inode #2)</li>
                        <li>Ponto de entrada para toda hierarquia</li>
                        <li>Contém entradas para subdiretórios principais</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="bg-purple-950/30 border-purple-500/20 p-6">
                  <h4 className="font-semibold mb-4 text-purple-300">Código: Superblock (ext4)</h4>
                  
                  <CodeBlock language="c" title="Estrutura do Superblock">
{`// Estrutura simplificada do superblock ext4
struct ext4_super_block {
    __le32 s_inodes_count;      // Número total de inodes
    __le32 s_blocks_count;      // Número total de blocos
    __le32 s_free_blocks_count; // Blocos livres
    __le32 s_free_inodes_count; // Inodes livres
    
    __le32 s_first_data_block;   // Primeiro bloco de dados
    __le32 s_log_block_size;    // Tamanho do bloco (log2)
    __le32 s_log_cluster_size;  // Tamanho do cluster
    
    __le32 s_blocks_per_group;  // Blocos por grupo
    __le32 s_inodes_per_group;  // Inodes por grupo
    
    __le32 s_mtime;             // Última montagem
    __le32 s_wtime;             // Última escrita
    __le16 s_mnt_count;         // Contador de montagens
    __le16 s_max_mnt_count;     // Máximo de montagens
    
    __le16 s_magic;             // Magic number (0xEF53)
    __le16 s_state;             // Estado do sistema de arquivos
    __le16 s_errors;            // Comportamento em erros
    
    // ... muitos outros campos ...
};

// Verificação de magic number
#define EXT4_SUPER_MAGIC 0xEF53

int is_ext4_superblock(struct ext4_super_block *sb) {
    return le16_to_cpu(sb->s_magic) == EXT4_SUPER_MAGIC;
}`}
                  </CodeBlock>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="alocacao" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <HardDrive className="w-6 h-6 text-cyan-400" />
                Métodos de Alocação (Tanenbaum)
              </h3>
              
              <div className="space-y-6">
                <div className="p-4 bg-cyan-950/30 rounded-lg border border-cyan-500/20">
                  <h4 className="font-semibold mb-3 text-cyan-300">1. Alocação Contígua</h4>
                  <p className="text-slate-300 mb-4 text-sm">
                    Arquivo ocupa blocos consecutivos no disco. Tabela: (nome, endereço inicial, tamanho).
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-slate-900/50 rounded">
                      <h5 className="font-semibold text-xs mb-2 text-green-300">Vantagens</h5>
                      <ul className="text-xs text-slate-300 space-y-1">
                        <li>✓ Acesso sequencial muito rápido</li>
                        <li>✓ Simples de implementar</li>
                        <li>✓ Poucos seeks necessários</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-slate-900/50 rounded">
                      <h5 className="font-semibold text-xs mb-2 text-red-300">Desvantagens</h5>
                      <ul className="text-xs text-slate-300 space-y-1">
                        <li>✗ Fragmentação externa</li>
                        <li>✗ Difícil expandir arquivo</li>
                        <li>✗ Precisa saber tamanho antecipadamente</li>
                      </ul>
                    </div>
                  </div>

                  <CodeBlock language="c" title="Estrutura de Alocação Contígua">
{`struct contiguous_file {
    char name[256];
    uint32_t start_block;  // Bloco inicial
    uint32_t size_blocks;  // Tamanho em blocos
};

// Tabela de arquivos
struct contiguous_file files[MAX_FILES];

// Ler arquivo
int read_contiguous(struct contiguous_file *file, void *buffer, 
                    uint32_t offset, uint32_t size) {
    uint32_t block = file->start_block + (offset / BLOCK_SIZE);
    uint32_t block_offset = offset % BLOCK_SIZE;
    
    // Lê blocos consecutivos
    for (uint32_t i = 0; i < size; i += BLOCK_SIZE) {
        read_block(block++, buffer + i);
    }
    return size;
}`}
                  </CodeBlock>
                </div>

                <div className="p-4 bg-purple-950/30 rounded-lg border border-purple-500/20">
                  <h4 className="font-semibold mb-3 text-purple-300">2. Lista Encadeada</h4>
                  <p className="text-slate-300 mb-4 text-sm">
                    Cada bloco contém ponteiro para próximo bloco. Tabela: (nome, endereço do primeiro bloco).
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-slate-900/50 rounded">
                      <h5 className="font-semibold text-xs mb-2 text-green-300">Vantagens</h5>
                      <ul className="text-xs text-slate-300 space-y-1">
                        <li>✓ Sem fragmentação externa</li>
                        <li>✓ Fácil expandir arquivo</li>
                        <li>✓ Não precisa saber tamanho</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-slate-900/50 rounded">
                      <h5 className="font-semibold text-xs mb-2 text-red-300">Desvantagens</h5>
                      <ul className="text-xs text-slate-300 space-y-1">
                        <li>✗ Acesso aleatório lento</li>
                        <li>✗ Overhead de espaço (ponteiros)</li>
                        <li>✗ Se ponteiro corromper, arquivo perdido</li>
                      </ul>
                    </div>
                  </div>

                  <CodeBlock language="c" title="Estrutura de Lista Encadeada">
{`// Cada bloco contém ponteiro para próximo
struct linked_block {
    uint32_t next_block;  // Ponteiro para próximo bloco (ou 0 = EOF)
    char data[BLOCK_SIZE - 4];  // Dados (tamanho do bloco - 4 bytes)
};

// Tabela de arquivos
struct linked_file {
    char name[256];
    uint32_t first_block;  // Primeiro bloco
};

// Ler arquivo (sequencial)
int read_linked(struct linked_file *file, void *buffer, uint32_t size) {
    uint32_t current = file->first_block;
    uint32_t offset = 0;
    
    while (current != 0 && offset < size) {
        struct linked_block *block = read_block(current);
        uint32_t copy_size = MIN(size - offset, BLOCK_SIZE - 4);
        memcpy(buffer + offset, block->data, copy_size);
        offset += copy_size;
        current = block->next_block;
    }
    return offset;
}`}
                  </CodeBlock>
                </div>

                <div className="p-4 bg-blue-950/30 rounded-lg border border-blue-500/20">
                  <h4 className="font-semibold mb-3 text-blue-300">3. Lista Encadeada em Memória (FAT)</h4>
                  <p className="text-slate-300 mb-4 text-sm">
                    Ponteiros mantidos em tabela na memória (File Allocation Table). Cada entrada na FAT: 
                    (próximo bloco ou EOF). Bloco 0 → Bloco 5 → Bloco 12 → EOF.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-3 bg-slate-900/50 rounded">
                      <h5 className="font-semibold text-xs mb-2 text-green-300">Vantagens</h5>
                      <ul className="text-xs text-slate-300 space-y-1">
                        <li>✓ Acesso aleatório mais rápido</li>
                        <li>✓ Sem overhead nos blocos</li>
                        <li>✓ Cache eficiente da tabela</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-slate-900/50 rounded">
                      <h5 className="font-semibold text-xs mb-2 text-red-300">Desvantagens</h5>
                      <ul className="text-xs text-slate-300 space-y-1">
                        <li>✗ Tabela FAT grande para discos grandes</li>
                        <li>✗ Consome memória RAM</li>
                        <li>✗ Se tabela corromper, todo sistema perdido</li>
                      </ul>
                    </div>
                  </div>

                  <CodeBlock language="c" title="Estrutura FAT">
{`// File Allocation Table
// Cada entrada: índice = número do bloco, valor = próximo bloco
#define FAT_EOF 0xFFFFFFFF
#define FAT_FREE 0x00000000

uint32_t fat[TOTAL_BLOCKS];  // Tabela FAT

// Tabela de arquivos
struct fat_file {
    char name[256];
    uint32_t first_block;  // Primeiro bloco
};

// Ler arquivo (acesso aleatório possível)
int read_fat(struct fat_file *file, void *buffer, 
             uint32_t offset, uint32_t size) {
    // Calcular bloco inicial
    uint32_t start_block = file->first_block;
    uint32_t blocks_to_skip = offset / BLOCK_SIZE;
    
    // Percorrer FAT até o bloco desejado
    uint32_t current = start_block;
    for (uint32_t i = 0; i < blocks_to_skip; i++) {
        if (current == FAT_EOF) return -1;
        current = fat[current];
    }
    
    // Ler blocos
    uint32_t read = 0;
    while (current != FAT_EOF && read < size) {
        read_block(current, buffer + read);
        read += BLOCK_SIZE;
        current = fat[current];
    }
    return read;
}`}
                  </CodeBlock>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="inodes" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-cyan-400" />
                i-Nodes e Tamanho Máximo de Arquivo
              </h3>
              
              <div className="space-y-4">
                <Card className="bg-cyan-950/30 border-cyan-500/20 p-6">
                  <h4 className="font-semibold mb-4 text-cyan-300">Cálculo: Tamanho Máximo</h4>
                  
                  <div className="p-4 bg-slate-900/50 rounded mb-4">
                    <p className="text-sm text-slate-300 mb-3">
                      <strong>Dados:</strong> Blocos de 4 KB, ponteiros de 64 bits (8 bytes
                    </p>
                    <p className="text-sm text-slate-300 mb-2">
                      <strong>Ponteiros por bloco:</strong> 4.096 / 8 = 512 ponteiros
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-slate-800/50 rounded">
                        <strong className="text-cyan-300">Diretos (12):</strong> 12 × 4 KB = 48 KB
                      </div>
                      <div className="p-2 bg-slate-800/50 rounded">
                        <strong className="text-cyan-300">Indireto Simples:</strong> 512 × 4 KB = 2 MB
                      </div>
                      <div className="p-2 bg-slate-800/50 rounded">
                        <strong className="text-cyan-300">Indireto Duplo:</strong> 512 × 512 × 4 KB = 1 GB
                      </div>
                      <div className="p-2 bg-slate-800/50 rounded">
                        <strong className="text-cyan-300">Indireto Triplo:</strong> 512³ × 4 KB = 512 GB
                      </div>
                      <div className="p-3 bg-cyan-900/30 rounded border border-cyan-500/30 mt-3">
                        <strong className="text-cyan-300 text-lg">Total Máximo:</strong> ~513 GB
                      </div>
                    </div>
                  </div>

                  <CodeBlock language="c" title="Estrutura de i-Node (ext4)">
{`// Estrutura simplificada do inode ext4
struct ext4_inode {
    // Metadados
    __le16 i_mode;           // Tipo + permissões
    __le16 i_uid;            // User ID (low 16 bits)
    __le16 i_gid;            // Group ID (low 16 bits)
    __le32 i_size_lo;        // Tamanho em bytes (low 32 bits)
    __le32 i_atime;          // Access time
    __le32 i_ctime;          // Change time
    __le32 i_mtime;          // Modification time
    __le32 i_dtime;          // Delete time
    __le16 i_links_count;    // Número de hard links
    __le32 i_blocks_lo;      // Número de blocos (512-byte units)
    
    // Ponteiros para blocos de dados
    __le32 i_block[EXT4_N_BLOCKS];  // 15 entradas
    
    // Estrutura dos 15 ponteiros:
    // i_block[0..11]:  Ponteiros diretos (12 blocos)
    // i_block[12]:     Ponteiro indireto simples
    // i_block[13]:     Ponteiro indireto duplo
    // i_block[14]:     Ponteiro indireto triplo
    
    __le32 i_generation;     // Generation number
    __le32 i_file_acl_lo;    // File ACL
    __le32 i_size_high;      // Tamanho (high 32 bits)
    // ... mais campos ...
};

#define EXT4_N_BLOCKS 15

// Leitura usando inode
int read_inode(struct ext4_inode *inode, void *buffer, 
               uint64_t offset, uint32_t size) {
    uint64_t block_num = offset / BLOCK_SIZE;
    uint32_t block_offset = offset % BLOCK_SIZE;
    
    // Determinar qual nível de indireção usar
    if (block_num < 12) {
        // Ponteiro direto
        uint32_t block = inode->i_block[block_num];
        read_block(block, buffer);
    } else if (block_num < 12 + 512) {
        // Indireto simples
        uint32_t indirect_block = inode->i_block[12];
        uint32_t *indirect_table = read_block(indirect_block);
        uint32_t block = indirect_table[block_num - 12];
        read_block(block, buffer);
    }
    // ... indireto duplo e triplo ...
}`}
                  </CodeBlock>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="vfs" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-cyan-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-cyan-400" />
                Virtual File System (VFS) - Linux
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-cyan-950/30 rounded-lg border border-cyan-500/20">
                  <h4 className="font-semibold mb-3 text-cyan-300">Conceito (Tanenbaum)</h4>
                  <p className="text-slate-300 mb-4 text-sm">
                    O VFS é uma camada de abstração que fornece interface unificada para múltiplos sistemas de arquivos.
                    Permite que ext4, NTFS, FAT, NFS, etc. coexistam no mesmo sistema.
                  </p>
                  
                  <CodeBlock language="text" title="Arquitetura Textual">
{`┌─────────────────────────────────────────┐
│      Aplicações (syscalls)               │
│  open(), read(), write(), close(), etc.  │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│      Virtual File System (VFS)           │
│  - Interface POSIX unificada             │
│  - Gerencia file descriptors             │
│  - Roteia para sistema de arquivos      │
└──────┬──────────────────┬────────────────┘
       │                  │
   ┌───▼───┐         ┌───▼────┐
   │ ext4  │         │  NFS   │
   │ FAT   │         │  CIFS  │
   │ NTFS  │         │  proc  │
   └───────┘         └────────┘`}
                  </CodeBlock>
                </div>

                <Card className="bg-purple-950/30 border-purple-500/20 p-6">
                  <h4 className="font-semibold mb-4 text-purple-300">Estruturas VFS</h4>
                  
                  <CodeBlock language="c" title="Estruturas Principais do VFS">
{`// Superblock do VFS (abstração)
struct super_block {
    struct file_system_type *s_type;  // Tipo de FS (ext4, fat, etc.)
    struct super_operations *s_op;     // Operações do superblock
    struct dentry *s_root;            // Diretório raiz
    void *s_fs_info;                  // Dados específicos do FS
};

// Inode do VFS (abstração)
struct inode {
    unsigned long i_ino;              // Número do inode
    umode_t i_mode;                   // Tipo + permissões
    uid_t i_uid;                      // User ID
    gid_t i_gid;                      // Group ID
    loff_t i_size;                    // Tamanho
    struct inode_operations *i_op;    // Operações do inode
    struct file_operations *i_fop;    // Operações de arquivo
    struct super_block *i_sb;         // Superblock pai
};

// Dentry (Directory Entry) - cache de nomes
struct dentry {
    struct inode *d_inode;            // Inode associado
    struct dentry *d_parent;          // Diretório pai
    struct qstr d_name;               // Nome do arquivo
    struct list_head d_subdirs;       // Subdiretórios
    struct dentry_operations *d_op;   // Operações
};

// File (arquivo aberto)
struct file {
    struct path f_path;               // Caminho
    struct inode *f_inode;            // Inode
    struct file_operations *f_op;      // Operações
    loff_t f_pos;                     // Posição (cursor)
    unsigned int f_flags;             // Flags (O_RDONLY, etc.)
    fmode_t f_mode;                   // Modo de abertura
};

// Operações de arquivo (implementadas por cada FS)
struct file_operations {
    ssize_t (*read)(struct file *, char __user *, size_t, loff_t *);
    ssize_t (*write)(struct file *, const char __user *, size_t, loff_t *);
    int (*open)(struct inode *, struct file *);
    int (*release)(struct inode *, struct file *);
    // ... muitas outras operações
};

// Fluxo: syscall → VFS → file_operations → FS específico
ssize_t sys_read(unsigned int fd, char __user *buf, size_t count) {
    struct file *file = fget(fd);  // Pega file descriptor
    if (!file) return -EBADF;
    
    // Chama operação do sistema de arquivos
    ssize_t ret = file->f_op->read(file, buf, count, &file->f_pos);
    
    fput(file);  // Libera referência
    return ret;
}`}
                  </CodeBlock>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

