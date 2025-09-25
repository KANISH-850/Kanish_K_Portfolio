'use client';

import { motion } from 'framer-motion';

const MotionWrap = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

export default MotionWrap;
