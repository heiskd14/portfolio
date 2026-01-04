import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X, FileDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import profilePic from "@assets/MATRIC-320_1767402764655.jpg";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownloadPDF = () => {
    window.print();
  };

  const navLinks = [
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent no-print",
        scrolled ? "bg-background/80 backdrop-blur-md border-border/50 py-4 shadow-sm" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link
          to="hero"
          smooth={true}
          duration={500}
          className="cursor-pointer flex items-center gap-3 group"
        >
          <Avatar className="w-12 h-12 border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
            <AvatarImage src={profilePic} alt="Profile" className="object-cover" />
            <AvatarFallback>KD</AvatarFallback>
          </Avatar>
          <span className="text-xl font-bold font-display tracking-tight">Portfolio</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              duration={500}
              offset={-100}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleDownloadPDF}
              title="Download as PDF"
              className="rounded-full"
              data-testid="button-download-pdf"
            >
              <FileDown className="w-5 h-5 text-primary" />
            </Button>
            <Link to="contact" smooth={true} duration={500} offset={-100}>
              <Button size="sm" className="rounded-full px-6">Hire Me</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleDownloadPDF}
            className="rounded-full"
          >
            <FileDown className="w-5 h-5 text-primary" />
          </Button>
          <button
            className="text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container px-4 py-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  offset={-100}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium py-2 border-b border-border/10 text-foreground/80 hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                 <Link to="contact" smooth={true} duration={500} onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Get in Touch</Button>
                 </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
