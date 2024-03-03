import { Work_Sans as Font } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const fontSans = Font({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Weather Prediction",
  description: "Developed by Aftiyan and Dedinda",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(
          "font-sans antialiased tracking-tight leading-tight bg-gray-900",
          fontSans.variable
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
