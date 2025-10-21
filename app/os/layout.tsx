"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Home, 
  MemoryStick, 
  Layers, 
  HardDrive, 
  Repeat, 
  ListTodo,
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    title: "Gerenciamento de Memória",
    icon: MemoryStick,
    items: [
      { title: "Paginação", href: "/os/memoria/paginacao" },
      { title: "Segmentação", href: "/os/memoria/segmentacao" },
      { title: "Memória Virtual", href: "/os/memoria/virtual" },
      { title: "Substituição de Páginas", href: "/os/memoria/substituicao" },
    ],
  },
  {
    title: "Exercícios",
    icon: ListTodo,
    items: [
      { title: "Exercícios de Memória", href: "/os/exercicios" },
    ],
  },
];

export default function OSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/os";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-os-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="size-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <Link href="/os">
              <h1 className="text-2xl font-bold gradient-text-os">Sistemas Operacionais</h1>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Card className="px-4 py-2">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Progresso Geral:</span>
                <div className="w-32">
                  <Progress value={15} className="h-2" />
                </div>
                <span className="text-sm font-semibold">15%</span>
              </div>
            </Card>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!isHomePage && (
          <div className="grid grid-cols-12 gap-8">
            {/* Sidebar */}
            <aside className="col-span-3">
              <Card className="p-4 sticky top-24">
                <nav className="space-y-6">
                  {navigation.map((section) => (
                    <div key={section.title}>
                      <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-os-primary">
                        <section.icon className="size-4" />
                        {section.title}
                      </div>
                      <div className="space-y-1">
                        {section.items.map((item) => {
                          const isActive = pathname === item.href;
                          return (
                            <Link key={item.href} href={item.href}>
                              <Button
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start text-sm",
                                  isActive && "bg-os-primary/10 text-os-primary font-semibold"
                                )}
                              >
                                <ChevronRight className={cn(
                                  "size-4 mr-2 transition-transform",
                                  isActive && "rotate-90"
                                )} />
                                {item.title}
                              </Button>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </nav>
              </Card>
            </aside>

            {/* Main Content */}
            <main className="col-span-9">
              {children}
            </main>
          </div>
        )}

        {isHomePage && (
          <main>
            {children}
          </main>
        )}
      </div>
    </div>
  );
}

