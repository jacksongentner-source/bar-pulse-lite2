import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth-context";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Bar Pulse",
  description: "Find tonight’s vibe in one glance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="max-w-6xl mx-auto px-4 py-6">
            <header className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">
                <span className="text-brand">Bar</span> Pulse
              </h1>
              <Navigation />
            </header>
            {children}
            <footer className="mt-12 text-xs text-neutral-400">
              Built with Next.js — sample data only. Replace with Supabase later.
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
