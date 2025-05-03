import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Layout from "../../../shared/components/Layout.jsx";

const HomePage = () => {
    const [greeting, setGreeting] = useState('');
    const [conut, setconut] = useState(0)
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 7) setGreeting('Buenas noches');
    else if (hour < 12) setGreeting('Buenos días');
    else if (hour < 18) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');
  }, []);
  return (
      <Layout showFooter={false}>
        <h2>Antonio cabron {conut} veces</h2>
        <button onClick={()=>setconut(conut+1)}>+</button>
      </Layout>
  );
};

export default HomePage;
