"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { motion } from "framer-motion";
import { 
  Shield, 
  Lock, 
  Users, 
  FileLock,
  Settings,
  BookOpen,
  Terminal,
  AlertTriangle
} from "lucide-react";

export default function ProtecaoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-indigo-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_50%)]" />
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-500/20 rounded-xl backdrop-blur-sm">
              <Shield className="w-8 h-8 text-indigo-400" />
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">Proteção de Acesso</Badge>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            Proteção de Arquivos
          </h1>
          
          <p className="text-2xl text-slate-300 max-w-4xl mb-8">
            Mecanismos de controle de acesso e segurança em sistemas de arquivos baseados em Tanenbaum
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="permissoes" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="permissoes">
              <Lock className="w-4 h-4 mr-2" />
              Permissões
            </TabsTrigger>
            <TabsTrigger value="acls">
              <Users className="w-4 h-4 mr-2" />
              ACLs
            </TabsTrigger>
            <TabsTrigger value="capabilities">
              <Shield className="w-4 h-4 mr-2" />
              Capabilities
            </TabsTrigger>
            <TabsTrigger value="implementacao">
              <Settings className="w-4 h-4 mr-2" />
              Implementação
            </TabsTrigger>
          </TabsList>

          <TabsContent value="permissoes" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-indigo-400" />
                Permissões Unix/Linux (RWX)
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-indigo-950/30 rounded-lg border border-indigo-500/20">
                  <h4 className="font-semibold mb-3 text-indigo-300">Conceito Fundamental (Tanenbaum)</h4>
                  <p className="text-slate-300 mb-4 text-sm">
                    No sistema Unix, cada arquivo possui três conjuntos de permissões correspondentes a três classes de usuários:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="p-4 bg-slate-900/50 rounded border border-indigo-500/30">
                      <h5 className="font-semibold mb-2 text-indigo-300">Owner (Proprietário)</h5>
                      <p className="text-xs text-slate-400 mb-2">O usuário que criou o arquivo</p>
                      <code className="text-sm text-indigo-300">rwx------</code>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded border border-indigo-500/30">
                      <h5 className="font-semibold mb-2 text-indigo-300">Group (Grupo)</h5>
                      <p className="text-xs text-slate-400 mb-2">Usuários membros do grupo do arquivo</p>
                      <code className="text-sm text-indigo-300">---rwx---</code>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded border border-indigo-500/30">
                      <h5 className="font-semibold mb-2 text-indigo-300">Others (Outros)</h5>
                      <p className="text-xs text-slate-400 mb-2">Todos os demais usuários do sistema</p>
                      <code className="text-sm text-indigo-300">------rwx</code>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/50 rounded border border-indigo-500/30">
                    <h5 className="font-semibold mb-2 text-indigo-300">Bits de Permissão</h5>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <p className="text-xs text-slate-400 mb-1">R (Read)</p>
                        <p className="text-sm text-slate-300">Permite ler o conteúdo do arquivo</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">W (Write)</p>
                        <p className="text-sm text-slate-300">Permite modificar o arquivo</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">X (Execute)</p>
                        <p className="text-sm text-slate-300">Permite executar o arquivo como programa</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Card className="bg-purple-950/30 border-purple-500/20 p-6">
                  <h4 className="font-semibold mb-4 text-purple-300">Exemplos Práticos</h4>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900/50 rounded">
                      <div className="flex items-center gap-3 mb-2">
                        <code className="text-purple-300 font-mono">rw-r--r--</code>
                        <Badge className="bg-green-500">644</Badge>
                      </div>
                      <p className="text-sm text-slate-300">
                        Owner pode ler e escrever. Group e Others apenas leitura. 
                        <strong className="text-purple-300"> Exemplo:</strong> arquivos de texto, imagens
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded">
                      <div className="flex items-center gap-3 mb-2">
                        <code className="text-purple-300 font-mono">rwxr-xr-x</code>
                        <Badge className="bg-green-500">755</Badge>
                      </div>
                      <p className="text-sm text-slate-300">
                        Owner pode tudo. Group e Others podem ler e executar, mas não escrever.
                        <strong className="text-purple-300"> Exemplo:</strong> executáveis, scripts
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded">
                      <div className="flex items-center gap-3 mb-2">
                        <code className="text-purple-300 font-mono">rw-------</code>
                        <Badge className="bg-red-500">600</Badge>
                      </div>
                      <p className="text-sm text-slate-300">
                        Apenas owner pode ler e escrever. Privado.
                        <strong className="text-purple-300"> Exemplo:</strong> chaves SSH, senhas
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded">
                      <div className="flex items-center gap-3 mb-2">
                        <code className="text-purple-300 font-mono">rwxrwxrwx</code>
                        <Badge className="bg-yellow-500">777</Badge>
                      </div>
                      <p className="text-sm text-slate-300">
                        Todos podem tudo. <AlertTriangle className="w-4 h-4 inline text-yellow-500" /> 
                        <strong className="text-yellow-500"> Inseguro!</strong> Evitar em produção.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-blue-950/30 border-blue-500/20 p-6">
                  <h4 className="font-semibold mb-4 text-blue-300">Comandos Unix/Linux</h4>
                  
                  <div className="space-y-3">
                    <CodeBlock language="bash" title="Ver permissões">
{`# Listar arquivos com permissões detalhadas
ls -l arquivo.txt

# Saída exemplo:
# -rw-r--r-- 1 eduardo users 1024 Dec 15 14:30 arquivo.txt
# ^^^^^^^^^^ ^^^^^^^ ^^^^^ ^^^^
# permissões owner group tamanho`}
                    </CodeBlock>

                    <CodeBlock language="bash" title="Alterar permissões (chmod)">
{`# Forma octal (mais comum)
chmod 644 arquivo.txt    # rw-r--r--
chmod 755 script.sh      # rwxr-xr-x
chmod 600 chave.key      # rw-------

# Forma simbólica
chmod u+x script.sh      # Adiciona execute para owner
chmod g-w arquivo.txt    # Remove write para group
chmod o+r arquivo.txt    # Adiciona read para others
chmod a+x script.sh      # Adiciona execute para todos (a=all)

# Combinando
chmod u+rwx,g+rx,o+r arquivo.txt`}
                    </CodeBlock>

                    <CodeBlock language="bash" title="Alterar owner e group (chown)">
{`# Alterar owner
chown eduardo arquivo.txt

# Alterar owner e group
chown eduardo:users arquivo.txt

# Recursivo (diretório)
chown -R eduardo:users /caminho/diretorio`}
                    </CodeBlock>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="acls" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-indigo-400" />
                Access Control Lists (ACLs)
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-indigo-950/30 rounded-lg border border-indigo-500/20">
                  <h4 className="font-semibold mb-3 text-indigo-300">Conceito (Tanenbaum)</h4>
                  <p className="text-slate-300 mb-4 text-sm">
                    ACLs permitem controle de acesso mais granular que permissões tradicionais. 
                    Em vez de apenas Owner/Group/Others, você pode especificar permissões para usuários e grupos específicos.
                  </p>
                  
                  <div className="p-4 bg-slate-900/50 rounded mb-4">
                    <h5 className="font-semibold mb-2 text-indigo-300">Vantagens sobre Permissões Tradicionais:</h5>
                    <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                      <li>Permite múltiplos usuários com permissões diferentes</li>
                      <li>Permite múltiplos grupos com permissões diferentes</li>
                      <li>Mais flexível para sistemas com muitos usuários</li>
                      <li>Usado em sistemas modernos (Windows NTFS, Linux ext4/xfs)</li>
                    </ul>
                  </div>
                </div>

                <Card className="bg-purple-950/30 border-purple-500/20 p-6">
                  <h4 className="font-semibold mb-4 text-purple-300">Exemplo de ACL</h4>
                  
                  <CodeBlock language="bash" title="Comandos ACL no Linux">
{`# Ver ACLs de um arquivo
getfacl arquivo.txt

# Saída exemplo:
# user::rw-
# user:alice:r--
# user:bob:rw-
# group::r--
# group:developers:rwx
# group:readers:r--
# mask::rwx
# other::r--

# Definir ACL
setfacl -m u:alice:r-- arquivo.txt
setfacl -m g:developers:rwx arquivo.txt
setfacl -m u:bob:rw- arquivo.txt

# Remover ACL específica
setfacl -x u:alice arquivo.txt

# Remover todas as ACLs
setfacl -b arquivo.txt

# ACL padrão (para novos arquivos em diretório)
setfacl -d -m u:alice:r-- /diretorio/`}
                  </CodeBlock>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="capabilities" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-indigo-400" />
                Capabilities
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-indigo-950/30 rounded-lg border border-indigo-500/20">
                  <h4 className="font-semibold mb-3 text-indigo-300">Conceito (Tanenbaum)</h4>
                  <p className="text-slate-300 mb-4 text-sm">
                    Capabilities são tokens que dão a um processo o direito de realizar uma operação específica. 
                    Em vez de verificar identidade do usuário, o sistema verifica se o processo possui a capability necessária.
                  </p>
                  
                  <div className="p-4 bg-slate-900/50 rounded mb-4">
                    <h5 className="font-semibold mb-2 text-indigo-300">Características:</h5>
                    <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                      <li>Princípio de menor privilégio: processo só tem capabilities necessárias</li>
                      <li>Capabilities podem ser herdadas ou transferidas</li>
                      <li>Mais seguro que executar tudo como root</li>
                      <li>Usado em containers Docker, Linux namespaces</li>
                    </ul>
                  </div>
                </div>

                <Card className="bg-purple-950/30 border-purple-500/20 p-6">
                  <h4 className="font-semibold mb-4 text-purple-300">Capabilities no Linux</h4>
                  
                  <CodeBlock language="bash" title="Exemplos de Capabilities">
{`# Ver capabilities de um processo
getcap /usr/bin/ping

# Saída: /usr/bin/ping = cap_net_raw+ep
# ping precisa de CAP_NET_RAW para criar sockets raw

# Definir capability
setcap cap_net_raw+ep /usr/bin/ping

# Remover capability
setcap -r /usr/bin/ping

# Capabilities comuns:
# - CAP_NET_RAW: Criar sockets raw (ping, tcpdump)
# - CAP_NET_BIND_SERVICE: Bind em portas < 1024
# - CAP_SYS_ADMIN: Operações administrativas
# - CAP_DAC_OVERRIDE: Ignorar permissões de arquivo
# - CAP_SETUID: Alterar UID do processo`}
                  </CodeBlock>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="implementacao" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-indigo-500/20 p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Settings className="w-6 h-6 text-indigo-400" />
                Implementação no Linux
              </h3>
              
              <div className="space-y-4">
                <Card className="bg-indigo-950/30 border-indigo-500/20 p-6">
                  <h4 className="font-semibold mb-4 text-indigo-300">Estrutura no Inode</h4>
                  
                  <CodeBlock language="c" title="Estrutura de Permissões no Inode (ext4)">
{`// Estrutura simplificada do inode no ext4
struct ext4_inode {
    // ... outros campos ...
    
    // Permissões (16 bits)
    __le16 i_mode;        // Tipo de arquivo + permissões
    __le32 i_uid;         // User ID do owner
    __le32 i_gid;         // Group ID
    
    // Bits de permissão (9 bits):
    // Bits 8-6: Owner (rwx)
    // Bits 5-3: Group (rwx)
    // Bits 2-0: Others (rwx)
    
    // Exemplo: 0o755 = 0b111101101
    // Owner: 111 (rwx)
    // Group: 101 (r-x)
    // Others: 101 (r-x)
};

// Verificação de permissão (simplificado)
int check_permission(struct inode *inode, int uid, int gid, int mode) {
    // Se é o owner
    if (inode->i_uid == uid) {
        return (inode->i_mode >> 6) & mode;
    }
    
    // Se está no group
    if (inode->i_gid == gid) {
        return (inode->i_mode >> 3) & mode;
    }
    
    // Others
    return inode->i_mode & mode;
}`}
                  </CodeBlock>
                </Card>

                <Card className="bg-purple-950/30 border-purple-500/20 p-6">
                  <h4 className="font-semibold mb-4 text-purple-300">Implementação de ACLs</h4>
                  
                  <p className="text-slate-300 mb-4 text-sm">
                    No Linux, ACLs são armazenadas como atributos estendidos (xattr) e podem ser consultadas 
                    através do sistema de arquivos. O ext4 e xfs suportam ACLs nativamente.
                  </p>
                  
                  <CodeBlock language="c" title="Estrutura ACL (simplificado)">
{`// Entrada de ACL
struct acl_entry {
    __le16 e_tag;      // Tipo: USER, GROUP, OTHER, etc.
    __le16 e_perm;     // Permissões: rwx
    __le32 e_id;       // ID do usuário/grupo (se aplicável)
};

// ACL completa
struct acl {
    __le32 a_version;
    __le32 a_count;    // Número de entradas
    struct acl_entry a_entries[];  // Array de entradas
};

// Verificação com ACL
int check_acl_permission(struct inode *inode, int uid, int gid, int mode) {
    // Primeiro verifica permissões tradicionais
    if (check_permission(inode, uid, gid, mode)) {
        return 1;
    }
    
    // Se não passou, verifica ACL
    struct acl *acl = get_acl(inode);
    if (!acl) return 0;
    
    // Procura entrada específica para este usuário/grupo
    for (int i = 0; i < acl->a_count; i++) {
        if (matches_entry(&acl->a_entries[i], uid, gid)) {
            return (acl->a_entries[i].e_perm & mode) == mode;
        }
    }
    
    return 0;
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

