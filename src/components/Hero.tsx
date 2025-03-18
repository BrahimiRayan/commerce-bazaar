
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden pt-32 pb-16 md:py-40">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background -z-10" />
      
      {/* Background Circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 md:space-y-12 max-w-3xl mx-auto animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/tight">
              Votre marché en ligne <span className="text-primary">moderne et élégant</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Achetez et vendez des produits en toute simplicité sur notre plateforme de commerce électronique
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button asChild size="lg" className="animate-slide-up rounded-full px-8">
              <Link to="/products">
                Explorer les produits
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="group animate-slide-up animation-delay-200 rounded-full px-8">
              <Link to="/sell" className="flex items-center gap-2">
                Commencer à vendre
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse opacity-70">
        <span className="text-sm text-muted-foreground mb-2">Découvrir</span>
        <div className="w-1 h-6 rounded-full bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
