import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Layout from "../../../shared/components/Layout.jsx";

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
      <Layout showFooter={false} isTeacher={false} isStudent={false} isDirector={false}>

      </Layout>
  );
};

export default HomePage;
