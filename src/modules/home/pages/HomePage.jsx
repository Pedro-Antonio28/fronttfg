import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Header from '@/shared/components/Header';
import Feature from '@/shared/components/Feature';
import Testimonial from '@/shared/components/Testimonial';
import Footer from '@/shared/components/Footer';
import Layout from "../../../shared/components/Layout.jsx";

import ContentArea from "../../../shared/components/ContentArea.jsx";

const HomePage = () => {
    const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 7) setGreeting('Buenas noches');
    else if (hour < 12) setGreeting('Buenos días');
    else if (hour < 18) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');
  }, []);
  return (
      <div>
      <Layout />
      </div>
  );
};

export default HomePage;
