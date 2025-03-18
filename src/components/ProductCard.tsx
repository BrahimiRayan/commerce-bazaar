
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  seller?: {
    name: string;
    id: number;
  };
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Produit ajouté",
      description: `${product.title} a été ajouté au panier`,
    });
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Favori ajouté",
      description: `${product.title} a été ajouté à vos favoris`,
    });
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover-scale"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="aspect-square overflow-hidden relative">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={product.image}
          alt={product.title}
          className={`object-cover w-full h-full transition-all duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <Badge variant="default" className="bg-primary text-white">Nouveau</Badge>
          )}
          {product.seller && (
            <Badge variant="outline" className="bg-white/80 backdrop-blur-md">
              Vendeur: {product.seller.name}
            </Badge>
          )}
        </div>
        
        {/* Quick actions */}
        <div 
          className={`absolute bottom-3 right-3 flex items-center gap-2 transform transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <Button 
            size="icon" 
            variant="secondary" 
            className="h-8 w-8 rounded-full glass"
            onClick={handleFavorite}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            className="h-8 w-8 rounded-full glass"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg line-clamp-1">{product.title}</h3>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="font-medium">{product.price.toFixed(2)} €</span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span className="text-sm text-muted-foreground">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
