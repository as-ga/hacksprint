import "./globals.css";

export const metadata = {
  title: "LearnXcel : The Smart Learning Ecosystem App",
  description:
    "LearnXcel is a platform that helps you learn and grow in a smart way.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
