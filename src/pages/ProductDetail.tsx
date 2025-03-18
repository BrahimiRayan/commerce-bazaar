
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  Heart, 
  ShoppingCart, 
  Share2,
  Star,
  Package,
  RefreshCw,
  Truck, 
  ShieldCheck,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  UserCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product } from '@/components/ProductCard';
import { useToast } from '@/hooks/use-toast';
import FeaturedProducts from '@/components/FeaturedProducts';

// Sample products data
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "MacBook Pro M3",
    price: 1999.99,
    description: "Le dernier MacBook Pro avec puce M3 pour des performances exceptionnelles et une autonomie incroyable. Profitez d'un écran Retina de 14 pouces, d'une puce M3 ultra-rapide, de 16 Go de RAM et de 512 Go de stockage SSD. Ce MacBook Pro est parfait pour les professionnels de la création, les développeurs et tous ceux qui ont besoin de puissance dans un format portable.",
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
  // More sample products here (same as in ProductCard.tsx)
];

// Sample reviews
const SAMPLE_REVIEWS = [
  {
    id: 1,
    user: "Marie L.",
    date: "15/04/2023",
    rating: 5,
    title: "Excellent produit, je recommande !",
    comment: "J'ai acheté ce produit il y a un mois et j'en suis très satisfaite. La qualité est au rendez-vous et les performances sont excellentes. Le rapport qualité-prix est imbattable !",
    likes: 24,
    dislikes: 2,
    isVerifiedPurchase: true
  },
  {
    id: 2,
    user: "Thomas D.",
    date: "03/03/2023",
    rating: 4,
    title: "Très bon produit malgré quelques défauts",
    comment: "Globalement satisfait de mon achat. Le produit répond à mes attentes, mais il y a quelques petits défauts de finition. La livraison a été rapide et le service client efficace.",
    likes: 15,
    dislikes: 3,
    isVerifiedPurchase: true
  },
  {
    id: 3,
    user: "Sophie M.",
    date: "21/02/2023",
    rating: 5,
    title: "Parfait !",
    comment: "Exactement ce que je cherchais. Produit conforme à la description et de très bonne qualité. Je n'hésiterai pas à recommander ce produit et ce vendeur !",
    likes: 9,
    dislikes: 0,
    isVerifiedPurchase: false
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedRating, setSelectedRating] = useState(0);
  const { toast } = useToast();

  // This would normally be fetched from an API
  const additionalImages = [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bWFjYm9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFjYm9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1hY2Jvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
  ];

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      toast({
        title: "Produit ajouté au panier",
        description: `${quantity} x ${product.title} ajouté à votre panier`,
      });
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      toast({
        title: "Produit ajouté aux favoris",
        description: `${product.title} a été ajouté à votre liste de souhaits`,
      });
    }
  };

  const handleShare = () => {
    toast({
      title: "Lien copié",
      description: "Le lien du produit a été copié dans le presse-papiers",
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate fetching data from an API
    setIsLoading(true);
    const timer = setTimeout(() => {
      const foundProduct = SAMPLE_PRODUCTS.find(p => p.id === Number(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setMainImage(foundProduct.image);
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-24">
        <div className="container px-4 md:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-foreground transition-colors">
              Produits
            </Link>
            {product && (
              <>
                <span className="mx-2">/</span>
                <span className="text-foreground truncate max-w-[200px]">{product.title}</span>
              </>
            )}
          </nav>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
              <div className="aspect-square bg-muted rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-10 bg-muted rounded w-1/2 mt-8"></div>
              </div>
            </div>
          ) : product ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Product images */}
                <div className="space-y-4 animate-fade-in">
                  <div className="aspect-square bg-white rounded-lg overflow-hidden border">
                    <img 
                      src={mainImage} 
                      alt={product.title} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex space-x-4 overflow-x-auto pb-2">
                    {additionalImages.map((image, index) => (
                      <button
                        key={index}
                        className={`relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all flex-shrink-0
                          ${image === mainImage ? 'border-primary' : 'border-transparent hover:border-muted'}`}
                        onClick={() => setMainImage(image)}
                      >
                        <img 
                          src={image} 
                          alt={`${product.title} - vue ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product info */}
                <div className="space-y-6">
                  <div className="space-y-2 animate-fade-in">
                    {product.isNew && (
                      <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                        Nouveau
                      </span>
                    )}
                    <h1 className="text-3xl font-bold">{product.title}</h1>
                    
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(product.rating.rate) 
                            ? 'text-amber-500 fill-amber-500' 
                            : i < product.rating.rate 
                              ? 'text-amber-500 fill-amber-500 opacity-50' 
                              : 'text-muted-foreground'}`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        {product.rating.rate} ({product.rating.count} avis)
                      </span>
                    </div>

                    <div className="text-2xl font-bold mt-2">
                      {product.price.toFixed(2)} €
                    </div>
                  </div>

                  <div className="border-t border-b py-6 space-y-4 animate-fade-in animation-delay-200">
                    {product.seller && (
                      <div className="flex items-center">
                        <span className="text-sm text-muted-foreground mr-2">Vendu par:</span>
                        <Link 
                          to={`/seller/${product.seller.id}`}
                          className="text-sm font-medium hover:text-primary transition-colors"
                        >
                          {product.seller.name}
                        </Link>
                      </div>
                    )}

                    <div className="space-y-2">
                      <h3 className="font-medium">Description</h3>
                      <p className="text-muted-foreground text-sm">
                        {product.description}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-primary" />
                        <span className="text-sm">En stock</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-5 w-5 text-primary" />
                        <span className="text-sm">Retours sous 30 jours</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-5 w-5 text-primary" />
                        <span className="text-sm">Livraison rapide</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                        <span className="text-sm">Garantie 2 ans</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 animate-fade-in animation-delay-400">
                    {/* Quantity selector */}
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium">Quantité:</span>
                      <div className="flex items-center border rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-10 w-10 rounded-none"
                          onClick={() => handleQuantityChange(-1)}
                          disabled={quantity <= 1}
                        >
                          -
                        </Button>
                        <div className="w-12 text-center">{quantity}</div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-10 w-10 rounded-none"
                          onClick={() => handleQuantityChange(1)}
                          disabled={quantity >= 10}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        size="lg" 
                        className="flex-1 rounded-full px-8"
                        onClick={handleAddToCart}
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Ajouter au panier
                      </Button>
                      <div className="flex gap-4">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-12 w-12 rounded-full"
                          onClick={handleAddToWishlist}
                        >
                          <Heart className="h-5 w-5" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-12 w-12 rounded-full"
                          onClick={handleShare}
                        >
                          <Share2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs section */}
              <div className="mb-16 animate-fade-in animation-delay-600">
                <Tabs defaultValue="description" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex mb-6">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="specifications">Spécifications</TabsTrigger>
                    <TabsTrigger value="reviews">Avis ({SAMPLE_REVIEWS.length})</TabsTrigger>
                  </TabsList>
                  
                  {/* Description tab */}
                  <TabsContent value="description" className="space-y-4">
                    <h3 className="text-xl font-semibold">À propos de ce produit</h3>
                    <p>
                      {product.description}
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies aliquam, 
                      nunc nisl aliquet nunc, eget aliquam nisl nunc eget nunc. Nulla euismod, nisl eget ultricies aliquam, 
                      nunc nisl aliquet nunc, eget aliquam nisl nunc eget nunc.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Caractéristique 1</li>
                      <li>Caractéristique 2</li>
                      <li>Caractéristique 3</li>
                      <li>Caractéristique 4</li>
                    </ul>
                  </TabsContent>
                  
                  {/* Specifications tab */}
                  <TabsContent value="specifications">
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b">
                            <td className="px-4 py-3 bg-muted/50 font-medium">Marque</td>
                            <td className="px-4 py-3">Apple</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 bg-muted/50 font-medium">Modèle</td>
                            <td className="px-4 py-3">MacBook Pro</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 bg-muted/50 font-medium">Année</td>
                            <td className="px-4 py-3">2023</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 bg-muted/50 font-medium">Processeur</td>
                            <td className="px-4 py-3">Apple M3</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 bg-muted/50 font-medium">Mémoire RAM</td>
                            <td className="px-4 py-3">16 Go</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 bg-muted/50 font-medium">Stockage</td>
                            <td className="px-4 py-3">512 Go SSD</td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 bg-muted/50 font-medium">Écran</td>
                            <td className="px-4 py-3">14 pouces, Retina</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 bg-muted/50 font-medium">Garantie</td>
                            <td className="px-4 py-3">2 ans</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  {/* Reviews tab */}
                  <TabsContent value="reviews" className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-6 pb-6 border-b">
                      <div className="md:w-1/3 space-y-4">
                        <h3 className="text-xl font-semibold">Avis des clients</h3>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold">{product.rating.rate}</span>
                          <span className="text-muted-foreground">sur 5</span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < Math.floor(product.rating.rate) 
                                ? 'text-amber-500 fill-amber-500' 
                                : i < product.rating.rate 
                                  ? 'text-amber-500 fill-amber-500 opacity-50' 
                                  : 'text-muted-foreground'}`}
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-2">
                            ({product.rating.count} avis)
                          </span>
                        </div>
                      </div>

                      <div className="md:w-2/3 space-y-4">
                        <h4 className="font-medium">Partagez votre avis</h4>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              className="p-1"
                              onClick={() => setSelectedRating(rating)}
                            >
                              <Star
                                className={`h-6 w-6 ${rating <= selectedRating 
                                  ? 'text-amber-500 fill-amber-500' 
                                  : 'text-muted-foreground'}`}
                              />
                            </button>
                          ))}
                        </div>
                        <Link to="/login">
                          <Button variant="outline" className="rounded-full px-6 mt-2">
                            Écrire un avis
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {SAMPLE_REVIEWS.map((review) => (
                        <div key={review.id} className="border-b pb-6">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <UserCircle className="h-10 w-10 text-muted-foreground" />
                              <div>
                                <div className="font-medium">{review.user}</div>
                                <div className="text-xs text-muted-foreground">
                                  {review.date}
                                  {review.isVerifiedPurchase && (
                                    <span className="ml-2 text-primary">Achat vérifié</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < review.rating 
                                    ? 'text-amber-500 fill-amber-500' 
                                    : 'text-muted-foreground'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <h4 className="font-medium mb-2">{review.title}</h4>
                          <p className="text-sm text-muted-foreground mb-4">{review.comment}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{review.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                              <ThumbsDown className="h-4 w-4" />
                              <span>{review.dislikes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                              <MessageCircle className="h-4 w-4" />
                              <span>Commenter</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-center">
                      <Button variant="outline">Voir plus d'avis</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Related products */}
              <FeaturedProducts title="Produits similaires" />

              {/* Back button */}
              <div className="flex justify-center mb-16">
                <Button asChild variant="outline" className="rounded-full px-6">
                  <Link to="/products" className="flex items-center gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    Retour aux produits
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
              <p className="text-muted-foreground mb-8">
                Désolé, le produit que vous recherchez n'existe pas ou a été supprimé.
              </p>
              <Button asChild className="rounded-full px-8">
                <Link to="/products">
                  Parcourir tous les produits
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
