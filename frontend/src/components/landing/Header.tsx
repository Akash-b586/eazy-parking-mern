import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isMobile: boolean;
}

export default function Header({ isMobile }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-black/10 border-b border-gray-200 dark:border-gray-700 shadow-md backdrop-blur-3xl transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tighter">
          EAZY<span className="text-gray-500">PARKING</span>
        </Link>

        {isMobile ? (
          <button onClick={toggleMenu} className="p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        ) : (
          <nav className="flex items-center space-x-8">
            <Link to="#features" className="text-sm font-medium hover:text-gray-600 transition-colors">Features</Link>
            <Link to="#locations" className="text-sm font-medium hover:text-gray-600 transition-colors">Locations</Link>
            <Link to="#testimonials" className="text-sm font-medium hover:text-gray-600 transition-colors">Testimonials</Link>
            <Link to="#contact" className="text-sm font-medium hover:text-gray-600 transition-colors">Contact</Link>
            <Button variant="outlined" className="ml-4">Login</Button>
            <Button className="bg-black text-white hover:bg-gray-800">Create Account</Button>
          </nav>
        )}
      </div>

      {isMobile && isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg dark:bg-zinc-900 dark:border-gray-700"
        >
          <nav className="flex flex-col py-4 px-4">
            <Link to="#features" className="py-3 text-sm font-medium hover:text-gray-600 transition-colors">Features</Link>
            <Link to="#locations" className="py-3 text-sm font-medium hover:text-gray-600 transition-colors">Locations</Link>
            <Link to="#testimonials" className="py-3 text-sm font-medium hover:text-gray-600 transition-colors">Testimonials</Link>
            <Link to="#contact" className="py-3 text-sm font-medium hover:text-gray-600 transition-colors">Contact</Link>
            <div className="flex flex-col space-y-2 mt-4">
              <Button variant="outlined" className="w-full">Login</Button>
              <button className="w-full dark:bg-white bg-black text-white dark:text-black hover:bg-gray-800">Create Account</button>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
}