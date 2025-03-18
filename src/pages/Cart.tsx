
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Trash2, ArrowRight, ChevronLeft, CreditCard, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/components/ProductCard';
import FeaturedProducts from '@/components/FeaturedProducts';

interface CartItem {
  product: Product;
  quantity: number;
}

// Sample cart items
const SAMPLE_CART_ITEMS: CartItem[] = [
  {
    product: {
      id: 1,
      title: "MacBook Pro M3",
      price: 1999.99,
      description: "Le dernier MacBook Pro avec puce M3 pour des performances exceptionnelles et une autonomie incroyable.",
      category: "électronique",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      rating: { rate: 4.9, count: 452 },
      isNew: true
    },
    quantity: 1
  },
  {
    product: {
      id: 2,
      title: "AirPods Pro",
      price: 249.99,
      description: "Les AirPods Pro offrent une expérience audio immersive avec réduction active du bruit et un ajustement personnalisé.",
      category: "électronique",
      image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YWlycG9kc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      rating: { rate: 4.8, count: 368 }
    },
    quantity: 2
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate fetching cart data from API or localStorage
    const timer = setTimeout(() => {
      setCartItems(SAMPLE_CART_ITEMS);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.product.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== id));
    
    toast({
      title: "Produit retiré",
      description: "Le produit a été retiré de votre panier",
    });
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'promo20') {
      setPromoApplied(true);
      setPromoDiscount(0.2); // 20% discount
      
      toast({
        title: "Code promo appliqué",
        description: "Vous bénéficiez d'une réduction de 20% sur votre commande",
      });
    } else {
      toast({
        title: "Code promo invalide",
        description: "Le code promo que vous avez saisi n'est pas valide",
        variant: "destructive",
      });
    }
  };

  const clearPromoCode = () => {
    setPromoApplied(false);
    setPromoDiscount(0);
    setPromoCode('');
    
    toast({
      title: "Code promo retiré",
      description: "Le code promo a été retiré de votre commande",
    });
  };

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const discountAmount = promoApplied ? subtotal * promoDiscount : 0;
  const shippingCost = subtotal > 100 ? 0 : 9.99;
  const total = subtotal - discountAmount + shippingCost;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-24">
        <div className="container px-4 md:px-6 pb-16">
          <div className="flex flex-col items-center justify-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Votre Panier</h1>
            <p className="text-muted-foreground">
              {cartItems.length === 0 
                ? 'Votre panier est vide' 
                : `${cartItems.length} article${cartItems.length > 1 ? 's' : ''} dans votre panier`}
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-6 animate-pulse">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                  <div className="bg-muted w-full md:w-36 h-36 rounded-md"></div>
                  <div className="flex-1 space-y-4">
                    <div className="h-5 bg-muted rounded w-2/3"></div>
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-10 bg-muted rounded w-1/3"></div>
                  </div>
                  <div className="w-24 h-8 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          ) : cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item, index) => (
                  <div 
                    key={item.product.id} 
                    className="flex flex-col md:flex-row gap-6 p-6 border rounded-lg bg-white shadow-sm animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-full md:w-36 h-36 flex-shrink-0">
                      <Link to={`/products/${item.product.id}`}>
                        <img 
                          src={item.product.image} 
                          alt={item.product.title} 
                          className="w-full h-full object-contain rounded-md"
                        />
                      </Link>
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between mb-2">
                        <Link 
                          to={`/products/${item.product.id}`}
                          className="text-lg font-medium hover:text-primary transition-colors"
                        >
                          {item.product.title}
                        </Link>
                        <button 
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          onClick={() => removeItem(item.product.id)}
                          aria-label="Supprimer"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {item.product.description}
                      </p>

                      <div className="mt-auto flex flex-wrap justify-between items-end gap-4">
                        <div className="flex items-center border rounded-md">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 rounded-none"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <div className="w-10 text-center text-sm">{item.quantity}</div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 rounded-none"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= 10}
                          >
                            +
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-medium">
                            {(item.product.price * item.quantity).toFixed(2)} €
                          </div>
                          {item.quantity > 1 && (
                            <div className="text-xs text-muted-foreground">
                              {item.product.price.toFixed(2)} € par unité
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between items-center">
                  <Button asChild variant="outline" className="group">
                    <Link to="/products" className="flex items-center gap-2">
                      <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                      Continuer les achats
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    onClick={() => setCartItems([])}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Vider le panier
                  </Button>
                </div>
              </div>

              {/* Order summary */}
              <div className="animate-fade-in animation-delay-400">
                <div className="sticky top-24 bg-white border rounded-lg shadow-sm p-6 space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Résumé de la commande
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span>{subtotal.toFixed(2)} €</span>
                    </div>
                    
                    {promoApplied && (
                      <div className="flex justify-between text-primary font-medium">
                        <span className="flex items-center gap-1">
                          Réduction (20%)
                          <button onClick={clearPromoCode} className="text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </span>
                        <span>-{discountAmount.toFixed(2)} €</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frais de livraison</span>
                      <span>
                        {shippingCost === 0 ? (
                          <span className="text-primary">Gratuit</span>
                        ) : (
                          `${shippingCost.toFixed(2)} €`
                        )}
                      </span>
                    </div>
                    
                    <div className="border-t pt-3 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{total.toFixed(2)} €</span>
                    </div>
                  </div>

                  {!promoApplied && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Vous avez un code promo?</div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Entrez votre code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="h-9"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={applyPromoCode}
                          disabled={!promoCode}
                        >
                          Appliquer
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <Button className="w-full rounded-full" size="lg">
                      Passer à la caisse
                    </Button>
                    
                    <div className="flex justify-center text-xs text-muted-foreground gap-4">
                      <div className="flex items-center gap-1">
                        <CreditCard className="h-3 w-3" />
                        Paiement sécurisé
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Livraison rapide
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t text-xs text-muted-foreground">
                    En passant votre commande, vous acceptez nos {' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      conditions générales de vente
                    </Link>
                    {' '} et notre {' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      politique de confidentialité
                    </Link>.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 space-y-6 animate-fade-in">
              <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingCart className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Votre panier est vide</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Il semble que vous n'ayez pas encore ajouté d'articles à votre panier.
                Continuez vos achats et découvrez nos produits.
              </p>
              <Button asChild size="lg" className="rounded-full px-8 mt-4 group">
                <Link to="/products" className="flex items-center gap-2">
                  Explorer les produits
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          )}

          {/* Product recommendations */}
          {cartItems.length > 0 && (
            <div className="mt-16">
              <FeaturedProducts title="Vous pourriez aussi aimer" />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
