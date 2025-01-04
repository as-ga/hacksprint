import "./globals.css";
import Providers from "@/components/Providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-text">
        <Providers>
          <Header>{children}</Header>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
