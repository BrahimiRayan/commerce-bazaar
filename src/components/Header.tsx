
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      } transition-all duration-300 ease-in-out`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight animate-fade-in">
          Commerce<span className="text-primary">Bazaar</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground hover:text-primary transition-colors duration-300">
            Accueil
          </Link>
          <Link to="/products" className="text-foreground hover:text-primary transition-colors duration-300">
            Produits
          </Link>
          <Link to="/sell" className="text-foreground hover:text-primary transition-colors duration-300">
            Vendre
          </Link>
          <div className="relative">
            <Input
              type="search"
              placeholder="Rechercher..."
              className="w-[200px] pl-8 py-1.5 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
          </div>
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative" aria-label="Panier">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-white flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" size="icon" aria-label="Compte">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md animate-slide-down">
          <div className="container mx-auto py-4 px-4 space-y-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Rechercher..."
                className="w-full pl-8 py-1.5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-foreground hover:text-primary transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/products" 
                className="text-foreground hover:text-primary transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Produits
              </Link>
              <Link 
                to="/sell" 
                className="text-foreground hover:text-primary transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Vendre
              </Link>
              <Link 
                to="/cart" 
                className="text-foreground hover:text-primary transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Panier
              </Link>
              <Link 
                to="/login" 
                className="text-foreground hover:text-primary transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Connexion
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
