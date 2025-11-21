import { useState, useMemo } from "react";
import { ProfessionalCard } from "@/components/ProfessionalCard";
import { ProfessionalModal } from "@/components/ProfessionalModal";
import { SearchBar } from "@/components/SearchBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Users, Sparkles, ThumbsUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import professionalsData from "@/data/professionals.json";

interface Professional {
  id: number;
  nome: string;
  foto: string;
  cargo: string;
  resumo: string;
  localizacao: string;
  area: string;
  habilidadesTecnicas: string[];
  softSkills: string[];
  experiencias: Array<{
    empresa: string;
    cargo: string;
    inicio: string;
    fim: string;
    descricao: string;
  }>;
  formacao: Array<{
    curso: string;
    instituicao: string;
    ano: number;
  }>;
  projetos: Array<{
    titulo: string;
    link: string;
    descricao: string;
  }>;
  certificacoes: string[];
  idiomas: Array<{
    idioma: string;
    nivel: string;
  }>;
  areaInteresses: string[];
}

const Index = () => {
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [recommendationCounts, setRecommendationCounts] = useState<Record<number, number>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("Todas");
  const [selectedCity, setSelectedCity] = useState("Todas");

  const professionals = professionalsData as Professional[];

  const filteredProfessionals = useMemo(() => {
    return professionals.filter((prof) => {
      const matchesSearch = 
        prof.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.habilidadesTecnicas.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesArea = selectedArea === "Todas" || prof.area === selectedArea;
      const matchesCity = selectedCity === "Todas" || prof.localizacao === selectedCity;

      return matchesSearch && matchesArea && matchesCity;
    });
  }, [professionals, searchTerm, selectedArea, selectedCity]);

  const topRecommended = useMemo(() => {
    const withCounts = professionals.filter(p => (recommendationCounts[p.id] || 0) > 0);
    return withCounts.sort((a, b) => (recommendationCounts[b.id] || 0) - (recommendationCounts[a.id] || 0)).slice(0, 6);
  }, [professionals, recommendationCounts]);

  const handleRecommend = (id: number) => {
    setRecommendationCounts(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }} />
      </div>
      <header className="sticky top-0 z-50 glass-strong border-b border-primary/20 shadow-lg shadow-primary/5">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-primary">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Future Network
              </h1>
              <p className="text-sm text-muted-foreground">Conectando o futuro do trabalho</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4 py-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <Sparkles className="h-4 w-4 text-primary animate-glow-pulse" />
            <span className="text-sm font-medium text-primary">Plataforma de Conexão Profissional</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold">
            O Futuro do <span className="bg-gradient-primary bg-clip-text text-transparent">Trabalho</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conecte-se com profissionais talentosos, compartilhe conhecimento e construa o futuro juntos
          </p>
        </div>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedArea={selectedArea}
          onAreaChange={setSelectedArea}
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
        />
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            <span className="text-primary font-semibold">{filteredProfessionals.length}</span> profissionais encontrados
          </p>
        </div>
        {topRecommended.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <ThumbsUp className="h-5 w-5 text-primary" /> Mais Recomendados
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topRecommended.map(prof => (
                <div key={prof.id} className="relative">
                  <ProfessionalCard professional={prof} onClick={() => setSelectedProfessional(prof)} />
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-primary/90 text-white text-xs font-medium">
                    {(recommendationCounts[prof.id] || 0)}
                  </div>
                </div>
              ))}
            </div>
            <Separator className="bg-border/50" />
          </section>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessionals.map((professional, index) => (
            <div 
              key={professional.id} 
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ProfessionalCard
                professional={professional}
                onClick={() => setSelectedProfessional(professional)}
              />
            </div>
          ))}
        </div>
        {filteredProfessionals.length === 0 && (
          <div className="text-center py-16 space-y-4 animate-fade-in">
            <div className="inline-flex p-4 rounded-full bg-muted/50">
              <Users className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold">Nenhum profissional encontrado</h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros ou termo de busca
            </p>
          </div>
        )}
      </main>
      <ProfessionalModal
        professional={selectedProfessional}
        open={!!selectedProfessional}
        onClose={() => setSelectedProfessional(null)}
        onRecommend={handleRecommend}
        recommendCount={selectedProfessional ? (recommendationCounts[selectedProfessional.id] || 0) : undefined}
      />
      <footer className="mt-20 border-t border-primary/20 glass py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            Future Network - Conectando pessoas, competências e propósito através da tecnologia
          </p>
          <p className="text-xs mt-2">
            © 2025 Global Solution - FIAP
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
