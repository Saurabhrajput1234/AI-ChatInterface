import React from "react";
import "./globals.css";

export const metadata = {
  title: "AI Chat Interface - Frontend Intern Assignment",
  description: "A modern AI chat interface built with Next.js, React, TypeScript, and Tailwind CSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
} 