import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

export default function SearchBar() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const navigate = useNavigate();

  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    setQuery(urlQuery);
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      // Si no hay texto, volvemos al estado base de búsqueda
      navigate('/search');
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Búsqueda en vivo: actualizamos la URL para que la página de Search
    // use el query y muestre resultados en tiempo real (con debounce en el hook).
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`, { replace: true });
    } else {
      navigate('/search', { replace: true });
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative group">
        <motion.div
          animate={{ scale: query ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2"
        >
          <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
        </motion.div>
        <Input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Buscar películas..."
          className="w-full pl-12 pr-4 py-3 glass-dark border-0 border-b-2 border-border/60 rounded-none focus-visible:ring-0 focus:border-primary focus:outline-none placeholder:text-muted-foreground text-sm md:text-base transition-all duration-300"
        />
      </div>
    </motion.form>
  );
}
