
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, ArrowRight, User, Mail, Key } from 'lucide-react';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Les mots de passe ne correspondent pas",
        description: "Veuillez vérifier et réessayer",
        variant: "destructive"
      });
      return;
    }
    
    if (!acceptTerms) {
      toast({
        title: "Veuillez accepter les conditions",
        description: "Vous devez accepter les conditions générales pour créer un compte",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Compte créé avec succès",
        description: "Bienvenue sur CommerceBazaar! Vous pouvez maintenant vous connecter.",
      });
      
      // In a real app, redirect to login page or dashboard after successful registration
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-lg px-4 md:px-6">
          <div className="bg-white rounded-xl shadow-sm border p-8 animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Créer un compte</h1>
              <p className="text-muted-foreground">
                Rejoignez notre communauté pour acheter et vendre des produits
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nom complet</Label>
                <div className="relative">
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Votre nom complet"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="h-11 pl-10"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemple@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Créez un mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 pl-10 pr-10"
                  />
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
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
                <p className="text-xs text-muted-foreground">
                  Le mot de passe doit contenir au moins 8 caractères
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmer votre mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-11 pl-10 pr-10"
                  />
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(!!checked)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                  J'accepte les{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    conditions générales d'utilisation
                  </Link>
                  {' '}et la{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    politique de confidentialité
                  </Link>
                </Label>
              </div>
              
              <Button
                type="submit"
                className="w-full rounded-full h-11"
                disabled={isLoading}
              >
                {isLoading ? "Création en cours..." : "Créer un compte"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    Ou s'inscrire avec
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
                Vous avez déjà un compte?{' '}
                <Link
                  to="/login"
                  className="text-primary font-medium hover:text-primary/80 transition-colors"
                >
                  Connectez-vous
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

export default Register;
