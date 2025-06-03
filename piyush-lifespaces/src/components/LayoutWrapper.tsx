'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // Check if current path is an admin page
  const isAdminPage = pathname.startsWith('/admin');

  if (isAdminPage) {
    // For admin pages, only render children without navbar/footer
    return <>{children}</>;
  }

  // For non-admin pages, render with navbar and footer
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
