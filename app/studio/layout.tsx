export default function CMSLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main>
          {children}
      </main>
  );
}
