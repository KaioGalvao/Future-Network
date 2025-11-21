import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Briefcase } from "lucide-react";

interface Professional {
  id: number;
  nome: string;
  foto: string;
  cargo: string;
  resumo: string;
  localizacao: string;
  area: string;
  habilidadesTecnicas: string[];
}

interface ProfessionalCardProps {
  professional: Professional;
  onClick: () => void;
}

export function ProfessionalCard({ professional, onClick }: ProfessionalCardProps) {
  return (
    <Card 
      onClick={onClick}
      className="group cursor-pointer overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 animate-slide-in-up"
    >
      <div className="relative h-48 overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        <img 
          src={professional.foto} 
          alt={professional.nome}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {professional.nome}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4 text-primary" />
            <span>{professional.cargo}</span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-secondary" />
            <span>{professional.localizacao}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {professional.resumo}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {professional.habilidadesTecnicas.slice(0, 3).map((skill) => (
            <Badge 
              key={skill} 
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 transition-colors"
            >
              {skill}
            </Badge>
          ))}
          {professional.habilidadesTecnicas.length > 3 && (
            <Badge 
              variant="outline"
              className="border-primary/30 text-primary"
            >
              +{professional.habilidadesTecnicas.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
