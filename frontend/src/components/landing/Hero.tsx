import { motion } from "framer-motion";
import Button from '@mui/material/Button';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-gray-50 to-white dark:from-zinc-900 dark:to-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight">
              Book Your Spot.<br />
              <span className="text-gray-500">Park with Ease.</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              The smart way to find and book parking spaces in your city. No more circling blocks or stressing over spots.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="bg-black text-white hover:bg-gray-800 px-8 py-6 text-lg">Create Account</Button>
              <Button variant="outlined" className="px-8 py-6 text-lg">Login</Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="relative">
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-2xl">
              <img src="https://img.freepik.com/premium-photo/car-parked-designated-spot_1375194-69289.jpg?w=2000" alt="Parking Management System" className="object-cover fill" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-xl font-bold">Smart Parking Solutions</p>
                <p>For businesses and individuals</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}