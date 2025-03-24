
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import AnimatedButton from "../ui/AnimatedButton";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Check if user is logged in (for demo purposes - replace with actual auth)
  const isLoggedIn = false;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "About Us", href: "/#about" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-primary"
          >
            <span className="block w-8 h-8 rounded-md bg-primary text-white flex items-center justify-center">CI</span>
            <span>ConstructInsight</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <AnimatedButton to="/dashboard" variant="default">
                Dashboard
              </AnimatedButton>
            ) : (
              <>
                <AnimatedButton to="/auth?type=login" variant="ghost">
                  Sign In
                </AnimatedButton>
                <AnimatedButton to="/auth?type=register" variant="default">
                  Sign Up
                </AnimatedButton>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white/95 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen shadow-lg" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="block py-2 text-foreground/80 hover:text-primary font-medium"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 pb-1 space-y-2">
            {isLoggedIn ? (
              <AnimatedButton
                to="/dashboard"
                variant="default"
                className="w-full"
              >
                Dashboard
              </AnimatedButton>
            ) : (
              <>
                <AnimatedButton
                  to="/auth?type=login"
                  variant="ghost"
                  className="w-full"
                >
                  Sign In
                </AnimatedButton>
                <AnimatedButton
                  to="/auth?type=register"
                  variant="default"
                  className="w-full"
                >
                  Sign Up
                </AnimatedButton>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
