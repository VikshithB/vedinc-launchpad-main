import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import vedinbg from '@/assets/vedinbg.png';

const navItems = ['Home', 'Course', 'Tools', 'About', 'Contact'];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // scrolling down → hide
        setShow(false);
      } else {
        // scrolling up → show
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const scrollToSection = (item: string) => {
    const sectionMap: Record<string, string> = {
      Home: 'hero',
      Course: 'verticals',
      Tools: 'tools',
      About: 'mentor',
      Contact: 'contact',
    };
    document.getElementById(sectionMap[item])?.scrollIntoView({
      behavior: 'smooth',
    });
    setOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-transparent"

      >
        <div className="w-full px-6 py-10 flex items-center justify-end gap-4">
          {/* Hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen((v) => !v)}
            className="relative"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </motion.button>

          {/* Login */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:block px-4 py-2 rounded-lg
               border border-white/20 bg-white/10
               backdrop-blur-md text-sm"
          >
            Login
          </motion.button>

          {/* Signup */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:block px-4 py-2 rounded-lg
               bg-primary text-primary-foreground text-sm"
          >
            Signup
          </motion.button>
        </div>

      </motion.nav>

      {/* Popup Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed top-[96px] right-6 z-[100] w-64
                       backdrop-blur-2xl bg-white/10
                       border border-white/20
                       rounded-2xl shadow-2xl p-6"
          >
            <div className="flex flex-col gap-4 text-sm font-medium">
              {navItems.map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ x: 4 }}
                  onClick={() => scrollToSection(item)}
                  className="text-left hover:text-primary transition-colors"
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;