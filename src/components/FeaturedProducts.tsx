
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ProductCard, { Product } from './ProductCard';

// Sample data for featured products
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "MacBook Pro M3",
    price: 1999.99,
    description: "Le dernier MacBook Pro avec puce M3 pour des performances exceptionnelles et une autonomie incroyable.",
    category: "électronique",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    rating: { rate: 4.9, count: 452 },
    isNew: true
  },
  {
    id: 2,
    title: "AirPods Pro",
    price: 249.99,
    description: "Les AirPods Pro offrent une expérience audio immersive avec réduction active du bruit et un ajustement personnalisé.",
    category: "électronique",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YWlycG9kc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    rating: { rate: 4.8, count: 368 }
  },
  {
    id: 3,
    title: "Montre Connectée",
    price: 199.99,
    description: "Suivez votre activité physique, recevez des notifications et contrôlez votre musique depuis votre poignet.",
    category: "électronique",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    rating: { rate: 4.6, count: 215 },
    seller: { name: "TechStore", id: 1 }
  },
  {
    id: 4,
    title: "Appareil Photo Numérique",
    price: 699.99,
    description: "Capturez des moments inoubliables avec cet appareil photo numérique haute résolution et ses fonctionnalités avancées.",
    category: "électronique",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    rating: { rate: 4.7, count: 189 },
    seller: { name: "PhotoPro", id: 2 }
  }
];

interface FeaturedProductsProps {
  title?: string;
}

const FeaturedProducts = ({ title = "Produits en vedette" }: FeaturedProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from API
    const timer = setTimeout(() => {
      setProducts(SAMPLE_PRODUCTS);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <Button asChild variant="ghost" className="group">
            <Link to="/products" className="flex items-center gap-2">
              Voir tout
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-muted rounded-lg overflow-hidden shadow-sm animate-pulse">
                <div className="aspect-square bg-secondary" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-secondary rounded w-3/4" />
                  <div className="h-4 bg-secondary rounded w-full" />
                  <div className="h-4 bg-secondary rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={product.id} className={`animate-fade-in animation-delay-${index * 200}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
