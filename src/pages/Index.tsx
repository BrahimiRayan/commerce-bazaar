
import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Shield, Truck, Users } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 1, name: 'Électronique', image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60' },
    { id: 2, name: 'Mode', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60' },
    { id: 3, name: 'Maison', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGRlY29yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60' },
    { id: 4, name: 'Sport', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3BvcnR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60' },
  ];

  const features = [
    {
      icon: <ShoppingBag className="h-10 w-10 text-primary" />,
      title: 'Achetez facilement',
      description: 'Parcourez notre vaste catalogue de produits et trouvez ce que vous cherchez en quelques clics.'
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: 'Vendez vos produits',
      description: 'Devenez vendeur et proposez vos propres produits sur notre plateforme de marketplace.'
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: 'Transactions sécurisées',
      description: 'Toutes les transactions sont sécurisées et vos données sont protégées.'
    },
    {
      icon: <Truck className="h-10 w-10 text-primary" />,
      title: 'Livraison rapide',
      description: 'Recevez vos produits rapidement avec nos options de livraison efficaces.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <Hero />

        {/* Categories Section */}
        <section className="py-16 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Explorez nos catégories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Découvrez notre sélection de produits dans différentes catégories pour tous vos besoins
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Link 
                  key={category.id} 
                  to={`/categories/${category.id}`}
                  className="group relative overflow-hidden rounded-lg aspect-[4/3] shadow-sm hover-scale animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl font-medium text-white">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <FeaturedProducts />

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Pourquoi nous choisir</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                CommerceBazaar vous offre une expérience de shopping complète et sécurisée
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center text-center p-6 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="rounded-full p-2 bg-primary/10 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -z-10" />
          
          {/* Background Circles */}
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-1/3 left-1/4 w-60 h-60 bg-primary/5 rounded-full blur-3xl -z-10" />
          
          <div className="container px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Prêt à rejoindre notre communauté ?
              </h2>
              <p className="text-muted-foreground mb-8">
                Inscrivez-vous maintenant pour acheter ou vendre des produits et profiter d'une expérience e-commerce exceptionnelle.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link to="/register">
                    S'inscrire maintenant
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 group">
                  <Link to="/products" className="flex items-center gap-2">
                    Explorer les produits
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
