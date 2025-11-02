import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { GlobalLoading } from "@/components/shared/GlobalLoading";
import { CollapsibleNav } from "@/components/shared/CollapsibleNav";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OS Academy - Plataforma Interativa de Sistemas Operacionais",
  description: "Aprenda Sistemas Operacionais através de simuladores 3D, exercícios gamificados e visualizações interativas. 12 simuladores, 25+ exercícios validados academicamente.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll />
          <GlobalLoading />
          <CollapsibleNav />
          {children}
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
