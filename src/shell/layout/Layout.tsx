interface LayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

export default function Layout({ children, showNavigation = false }: LayoutProps) {
  return (
    <div className="layout">
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
