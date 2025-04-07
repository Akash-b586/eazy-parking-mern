import { motion } from "framer-motion";
import Button from '@mui/material/Button';

export default function CTA() {
  return (
    <section className="py-20 bg-zinc-50 text-zinc-800 dark:text-white dark:bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to Transform Your Parking Experience?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-400 mb-8"
          >
            Join thousands of users who have simplified their parking with our platform
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button className="bg-white text-black hover:bg-gray-200 px-8 py-6 text-lg">Create Free Account</Button>
            <Button variant="outlined" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
              Contact Sales
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}