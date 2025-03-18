
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold tracking-tight">
              Commerce<span className="text-primary">Bazaar</span>
            </Link>
            <p className="text-muted-foreground">
              Votre destination pour acheter et vendre des produits en ligne, en toute simplicité et sécurité.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-medium mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Accueil</Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">Produits</Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted-foreground hover:text-primary transition-colors">Catégories</Link>
              </li>
              <li>
                <Link to="/sell" className="text-muted-foreground hover:text-primary transition-colors">Vendre</Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-lg font-medium mb-4">Compte</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">Connexion</Link>
              </li>
              <li>
                <Link to="/register" className="text-muted-foreground hover:text-primary transition-colors">Inscription</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">Tableau de bord</Link>
              </li>
              <li>
                <Link to="/orders" className="text-muted-foreground hover:text-primary transition-colors">Commandes</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-medium mb-4">Assistance</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">Centre d'aide</Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Conditions d'utilisation</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Politique de confidentialité</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} CommerceBazaar. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Conditions d'utilisation
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Confidentialité
              </Link>
              <Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
