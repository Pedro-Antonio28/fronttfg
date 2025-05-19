import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { ThemeProvider } from '../contexts/themeContext';

const Layout = ({
  children,
  showFooter = true,
  isDirector = false,
  isTeacher = false,
  isStudent = false,
}) => {
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <ThemeProvider>
        {/* Usa el Header dinámico y pasa los props de rol */}
        <Header isDirector={isDirector} isTeacher={isTeacher} isStudent={isStudent} />

        <main className="flex-grow bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4">
          {children}
        </main>

        {showFooter && <Footer />}
      </ThemeProvider>
    </div>
  );
};

export default Layout;
