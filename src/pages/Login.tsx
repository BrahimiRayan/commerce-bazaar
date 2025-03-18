
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, accept any email/password
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté à votre compte",
      });
      
      // In a real app, redirect to dashboard or home page after successful login
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-24">
        <div className="container max-w-lg px-4 md:px-6">
          <div className="bg-white rounded-xl shadow-sm border p-8 animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Connexion</h1>
              <p className="text-muted-foreground">
                Accédez à votre compte pour gérer vos achats et ventes
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Mot de passe oublié?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                  Se souvenir de moi
                </Label>
              </div>
              
              <Button
                type="submit"
                className="w-full rounded-full h-11"
                disabled={isLoading}
              >
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    Ou continuer avec
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button variant="outline" className="h-11">
                  Google
                </Button>
                <Button variant="outline" className="h-11">
                  Facebook
                </Button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-sm">
                Vous n'avez pas de compte?{' '}
                <Link
                  to="/register"
                  className="text-primary font-medium hover:text-primary/80 transition-colors"
                >
                  Inscrivez-vous
                </Link>
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild variant="ghost" className="group">
              <Link to="/" className="flex items-center justify-center gap-2 text-muted-foreground">
                Retour à l'accueil
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
