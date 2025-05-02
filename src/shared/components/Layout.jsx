import React from 'react';
import Header from './Header';
import ContentArea from "./ContentArea.jsx";
import Footer from './Footer';

const Layout = ({children, showFooter = true} ) => {
    return (
        <div className="min-h-screen flex flex-col">

            <Header />

            <ContentArea />

            {showFooter && (
                <Footer />
            )}
        </div>
    );
};

export default Layout;