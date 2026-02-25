import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, Film, ArrowRight, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import BackNavigation from '../components/BackNavigation';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMsg(t('auth.invalidEmail'));
      return;
    }

    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMsg(error.message || t('auth.loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background simplificado compatible con el tema */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 -left-1/4 w-full h-full bg-primary/10 blur-[120px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-0 -right-1/4 w-full h-full bg-blue-500/10 blur-[120px] rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative z-10 px-4 flex flex-col items-center justify-center min-h-screen py-10 md:py-0">
        <div className="w-full max-w-md mb-6">
          <BackNavigation label={t('auth.back')} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-md"
        >
          <div className="glass border border-border/50 rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border border-primary/20 shadow-glow"
              >
                <Film className="w-8 h-8 text-primary" />
              </motion.div>
              <h1 className="text-2xl font-heading font-bold tracking-tight mb-2 text-foreground">{t('auth.welcomeBack')}</h1>
              <p className="text-muted-foreground text-sm">{t('auth.enterCredentials')}</p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="space-y-2">
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                  <Input
                    name="email"
                    type="email"
                    placeholder={t('auth.email')}
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
                  <Input
                    name="password"
                    type="password"
                    placeholder={t('auth.password')}
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="rounded border-border/50 bg-background/50 text-primary focus:ring-primary shadow-sm" />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">{t('auth.rememberMe')}</span>
                </label>
                <a href="#" className="text-primary hover:text-primary/80 transition-colors hover:underline">
                  {t('auth.forgotPassword')}
                </a>
              </div>

              <Button
                type="submit"
                variant="gradient"
                className="w-full h-11 text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-current/20 border-t-current rounded-full animate-spin" />
                    {t('auth.signingIn')}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {t('auth.signIn')}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {t('auth.noAccount')}{' '}
              <Link to="/register" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                {t('auth.signUp')}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
