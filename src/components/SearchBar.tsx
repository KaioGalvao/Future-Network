import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedArea: string;
  onAreaChange: (value: string) => void;
  selectedCity: string;
  onCityChange: (value: string) => void;
}

export function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  selectedArea, 
  onAreaChange,
  selectedCity,
  onCityChange
}: SearchBarProps) {
  const areas = [
    "Todas",
    "Desenvolvimento",
    "Ciência de Dados",
    "Design",
    "DevOps",
    "Produto",
    "Segurança",
    "Inteligência Artificial"
  ];

  const cities = [
    "Todas",
    "São Paulo/SP",
    "Rio de Janeiro/RJ",
    "Belo Horizonte/MG",
    "Curitiba/PR",
    "Brasília/DF",
    "Porto Alegre/RS",
    "Florianópolis/SC",
    "Recife/PE",
    "Campinas/SP"
  ];

  return (
    <div className="glass-strong rounded-2xl p-6 space-y-4 border border-primary/20 shadow-lg shadow-primary/10">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
        <Input
          type="text"
          placeholder="Buscar profissionais ou tecnologias..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-background/50 border-primary/30 focus:border-primary transition-colors h-12"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select value={selectedArea} onValueChange={onAreaChange}>
          <SelectTrigger className="bg-background/50 border-primary/30 focus:border-primary h-12">
            <SelectValue placeholder="Área" />
          </SelectTrigger>
          <SelectContent className="glass-strong border-primary/20">
            {areas.map((area) => (
              <SelectItem key={area} value={area}>
                {area}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedCity} onValueChange={onCityChange}>
          <SelectTrigger className="bg-background/50 border-primary/30 focus:border-primary h-12">
            <SelectValue placeholder="Cidade" />
          </SelectTrigger>
          <SelectContent className="glass-strong border-primary/20">
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
