import { useState, useMemo, useEffect } from "react";
import { ProfessionalCard } from "@/components/ProfessionalCard";
import { ProfessionalModal } from "@/components/ProfessionalModal";
import { SearchBar } from "@/components/SearchBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Users, Sparkles, ThumbsUp, Crown, MapPin, Briefcase } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedArea, selectedCity]);

  const totalPages = Math.ceil(filteredProfessionals.length / pageSize) || 1;
  const paginatedProfessionals = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredProfessionals.slice(start, end);
  }, [filteredProfessionals, currentPage]);

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
              {topRecommended.map((prof, idx) => (
                <Card
                  key={prof.id}
                  onClick={() => setSelectedProfessional(prof)}
                  className="group relative overflow-hidden cursor-pointer border-primary/40 bg-card/60 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-secondary/10 blur-3xl" />
                  </div>

                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={prof.foto}
                      alt={prof.nome}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <Badge className="flex items-center gap-1 bg-primary/90 text-primary-foreground">
                        <Crown className="h-3.5 w-3.5" /> Top {idx + 1}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1 shadow-sm">
                      <ThumbsUp className="h-3.5 w-3.5" /> {(recommendationCounts[prof.id] || 0)}
                    </div>
                  </div>

                  <CardContent className="space-y-3 pt-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
                          {prof.nome}
                        </h4>
                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <Briefcase className="h-4 w-4 text-primary" />
                          <span>{prof.cargo}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 text-secondary" />
                          <span>{prof.localizacao}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {prof.habilidadesTecnicas.slice(0, 4).map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/30"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {prof.habilidadesTecnicas.length > 4 && (
                        <Badge variant="outline" className="border-primary/30 text-primary">
                          +{prof.habilidadesTecnicas.length - 4}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-muted-foreground">Clique para ver o perfil</div>
                      <Button size="sm" onClick={(e) => { e.stopPropagation(); setSelectedProfessional(prof); }}>
                        Abrir perfil
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Separator className="bg-border/50" />
          </section>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProfessionals.map((professional, index) => (
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
        {filteredProfessionals.length > pageSize && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(p => Math.max(1, p - 1));
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                // Show page numbers with ellipsis logic if many pages
                if (totalPages > 7) {
                  const isFirst = pageNum === 1;
                  const isLast = pageNum === totalPages;
                  const isNearCurrent = Math.abs(pageNum - currentPage) <= 1;
                  const showDirect = isFirst || isLast || isNearCurrent || (pageNum === 2 && currentPage <= 3) || (pageNum === totalPages - 1 && currentPage >= totalPages - 2);
                  if (!showDirect) {
                    if (pageNum === 3 || pageNum === totalPages - 2) {
                      return (
                        <PaginationItem key={`ellipsis-${pageNum}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  }
                }
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href="#"
                      isActive={pageNum === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(pageNum);
                      }}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(p => Math.min(totalPages, p + 1));
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
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
