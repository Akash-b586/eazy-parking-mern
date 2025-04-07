import { motion } from "framer-motion";
import Button from '@mui/material/Button';

export default function UserActions() {
  return (
    <section className="py-20 bg-white dark:bg-black dark:text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get Started Today</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Three simple steps to transform your parking experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-gray-100 dark:bg-zinc-900 dark:text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold">1</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Create Account</h3>
            <p className="text-gray-500 mb-6">Sign up in less than 2 minutes and set up your profile</p>
            <Button className="bg-black text-white hover:bg-gray-800 w-full">Create Account</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center"
          >
            <div className="bg-gray-100 dark:bg-zinc-900 dark:text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold">2</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Book Slot</h3>
            <p className="text-gray-500 mb-6">Find and reserve your perfect parking spot in seconds</p>
            <Button className="bg-black text-white hover:bg-gray-800 w-full">Find Parking</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <div className="bg-gray-100 dark:bg-zinc-900 dark:text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold">3</span>
            </div>
            <h3 className="text-2xl font-bold mb-3">Make Payment</h3>
            <p className="text-gray-500 mb-6">Pay securely online or when you arrive at the location</p>
            <Button className="bg-black text-white hover:bg-gray-800 w-full">Payment Options</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}