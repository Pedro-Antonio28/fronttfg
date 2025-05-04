import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({children, showFooter = true} ) => {
    useEffect(() => {
        const theme = localStorage.getItem("theme") || "light"
        if (theme === "dark") {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      }, [])
    return (
        <div className="min-h-screen flex flex-col px-4">
            <Header />
            <main className="min-h-[600px] bg-[#F6D8AE] rounded-lg  shadow-sm p-4">
                {children}
            </main>
            {showFooter && (
                <Footer />
            )}
        </div>
    );
};

export default Layout;