
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard, { Product } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import { Search, SlidersHorizontal, X } from 'lucide-react';

// Sample products data
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
  },
  {
    id: 5,
    title: "Enceinte Bluetooth",
    price: 129.99,
    description: "Profitez d'un son de qualité supérieure avec cette enceinte Bluetooth portable et résistante à l'eau.",
    category: "électronique",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3BlYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    rating: { rate: 4.5, count: 124 }
  },
  {
    id: 6,
    title: "Drone avec Caméra 4K",
    price: 799.99,
    description: "Filmez des vidéos aériennes spectaculaires en 4K avec ce drone facile à piloter et stable en vol.",
    category: "électronique",
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    rating: { rate: 4.4, count: 89 },
    seller: { name: "DroneZone", id: 3 }
  },
  {
    id: 7,
    title: "Veste en Cuir",
    price: 249.99,
    description: "Une veste en cuir véritable de haute qualité, parfaite pour toutes les saisons.",
    category: "mode",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGVhdGhlciUyMGphY2tldHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    rating: { rate: 4.3, count: 76 },
    seller: { name: "FashionStyle", id: 4 }
  },
  {
    id: 8,
    title: "Sneakers Premium",
    price: 159.99,
    description: "Des sneakers confortables et élégantes, parfaites pour un usage quotidien ou sportif.",
    category: "mode",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    rating: { rate: 4.6, count: 112 }
  }
];

const categories = [
  { id: "all", name: "Tous les produits" },
  { id: "électronique", name: "Électronique" },
  { id: "mode", name: "Mode" },
  { id: "maison", name: "Maison" },
  { id: "sport", name: "Sport" }
];

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [onlyNewProducts, setOnlyNewProducts] = useState(false);
  const [sortOrder, setSortOrder] = useState('featured');

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate fetching data from an API
    const timer = setTimeout(() => {
      setProducts(SAMPLE_PRODUCTS);
      setFilteredProducts(SAMPLE_PRODUCTS);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters whenever filter state changes
    let result = [...products];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        product => 
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price range
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by rating
    if (ratingFilter > 0) {
      result = result.filter(product => product.rating.rate >= ratingFilter);
    }
    
    // Filter new products
    if (onlyNewProducts) {
      result = result.filter(product => product.isNew);
    }
    
    // Apply sorting
    if (sortOrder === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'rating') {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    }
    // 'featured' sort is the default order
    
    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, priceRange, ratingFilter, onlyNewProducts, sortOrder]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange([0, 2000]);
    setRatingFilter(0);
    setOnlyNewProducts(false);
    setSortOrder('featured');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero banner */}
        <section className="bg-primary/5 py-10">
          <div className="container px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl font-bold tracking-tight mb-4">Tous nos produits</h1>
              <p className="text-muted-foreground mb-6">
                Découvrez notre sélection de produits de qualité, des articles du site et de nos vendeurs.
              </p>
              
              {/* Search bar */}
              <div className="relative max-w-md mx-auto">
                <Input
                  type="search"
                  placeholder="Rechercher un produit..."
                  className="pl-10 py-6 pr-10 rounded-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                {searchTerm && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2 top-2" 
                    onClick={() => setSearchTerm('')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              {/* Category tabs (desktop) */}
              <div className="hidden md:flex items-center space-x-2 overflow-x-auto">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className="rounded-full"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
              
              {/* Category dropdown (mobile) */}
              <div className="md:hidden w-full">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                {/* Sort dropdown */}
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Tendance</SelectItem>
                    <SelectItem value="price-asc">Prix: croissant</SelectItem>
                    <SelectItem value="price-desc">Prix: décroissant</SelectItem>
                    <SelectItem value="rating">Mieux notés</SelectItem>
                  </SelectContent>
                </Select>

                {/* Filter button */}
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtres
                </Button>
              </div>
            </div>

            {/* Advanced filters */}
            {showFilters && (
              <div className="bg-secondary/50 p-4 rounded-lg mb-8 animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Filtres avancés</h3>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Réinitialiser
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Price range */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Fourchette de prix</h4>
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        min={0}
                        max={2000}
                        step={10}
                        onValueChange={setPriceRange}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>{priceRange[0]} €</span>
                      <span>{priceRange[1]} €</span>
                    </div>
                  </div>

                  {/* Rating filter */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Note minimale</h4>
                    <Select 
                      value={ratingFilter.toString()} 
                      onValueChange={(value) => setRatingFilter(Number(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Toutes les notes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Toutes les notes</SelectItem>
                        <SelectItem value="4">4★ et plus</SelectItem>
                        <SelectItem value="3">3★ et plus</SelectItem>
                        <SelectItem value="2">2★ et plus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* New products */}
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="new-only" 
                      checked={onlyNewProducts} 
                      onCheckedChange={(checked) => 
                        setOnlyNewProducts(checked === true)
                      } 
                    />
                    <label 
                      htmlFor="new-only" 
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      Afficher uniquement les nouveaux produits
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Active filters */}
            {(searchTerm || selectedCategory !== 'all' || priceRange[0] > 0 || priceRange[1] < 2000 || ratingFilter > 0 || onlyNewProducts) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchTerm && (
                  <div className="bg-secondary rounded-full px-3 py-1 text-sm flex items-center gap-2">
                    Recherche: {searchTerm}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0" 
                      onClick={() => setSearchTerm('')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                {selectedCategory !== 'all' && (
                  <div className="bg-secondary rounded-full px-3 py-1 text-sm flex items-center gap-2">
                    Catégorie: {categories.find(c => c.id === selectedCategory)?.name}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0" 
                      onClick={() => setSelectedCategory('all')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                {(priceRange[0] > 0 || priceRange[1] < 2000) && (
                  <div className="bg-secondary rounded-full px-3 py-1 text-sm flex items-center gap-2">
                    Prix: {priceRange[0]}€ - {priceRange[1]}€
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0" 
                      onClick={() => setPriceRange([0, 2000])}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                {ratingFilter > 0 && (
                  <div className="bg-secondary rounded-full px-3 py-1 text-sm flex items-center gap-2">
                    Note: ≥ {ratingFilter}★
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0" 
                      onClick={() => setRatingFilter(0)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                {onlyNewProducts && (
                  <div className="bg-secondary rounded-full px-3 py-1 text-sm flex items-center gap-2">
                    Nouveaux produits
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 p-0" 
                      onClick={() => setOnlyNewProducts(false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-sm" 
                  onClick={resetFilters}
                >
                  Supprimer tous les filtres
                </Button>
              </div>
            )}

            {/* Products grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
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
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <div key={product.id} className={`animate-fade-in animation-delay-${index % 4 * 200}`}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">Aucun produit trouvé</h3>
                <p className="text-muted-foreground mb-6">
                  Essayez d'ajuster vos filtres ou de rechercher un autre terme.
                </p>
                <Button onClick={resetFilters}>Réinitialiser les filtres</Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
