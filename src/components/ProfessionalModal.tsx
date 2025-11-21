import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Globe, 
  Heart,
  MessageCircle,
  ThumbsUp,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";

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

interface ProfessionalModalProps {
  professional: Professional | null;
  open: boolean;
  onClose: () => void;
  onRecommend: (id: number) => void;
  recommendCount?: number;
}

export function ProfessionalModal({ professional, open, onClose, onRecommend, recommendCount }: ProfessionalModalProps) {
  if (!professional) return null;

  const handleRecommend = () => {
    onRecommend(professional.id);
    toast.success(`Você recomendou ${professional.nome}!`, {
      description: "Recomendação enviada com sucesso"
    });
  };

  const handleMessage = () => {
    toast.success(`Mensagem enviada para ${professional.nome}!`, {
      description: "Você será notificado quando houver resposta"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] glass-strong border-primary/30 p-0 overflow-hidden">
        <div className="relative h-48 bg-gradient-primary">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <img 
            src={professional.foto} 
            alt={professional.nome}
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute bottom-6 left-6 flex items-end gap-6">
            <img 
              src={professional.foto} 
              alt={professional.nome}
              className="h-32 w-32 rounded-full border-4 border-primary shadow-lg shadow-primary/50 object-cover"
            />
            <div className="mb-2">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-foreground">
                  {professional.nome}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-2 flex items-center gap-2 text-foreground/80">
                <Briefcase className="h-4 w-4 text-primary" />
                <span>{professional.cargo}</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-foreground/80">
                <MapPin className="h-4 w-4 text-secondary" />
                <span>{professional.localizacao}</span>
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[calc(90vh-12rem)] px-6">
          <div className="space-y-6 py-6">
            <div className="flex gap-3 items-center">
              <Button 
                onClick={handleMessage}
                className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity text-white font-semibold"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Enviar Mensagem
              </Button>
              <Button 
                onClick={handleRecommend}
                variant="outline"
                className="flex-1 border-primary/30 hover:bg-primary/10"
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                Recomendar
              </Button>
              {typeof recommendCount === "number" && (
                <div className="px-3 py-2 text-xs rounded-full bg-primary/10 border border-primary/30 text-primary font-medium">
                  {recommendCount} recomendações
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Sobre</h3>
              <p className="text-muted-foreground">{professional.resumo}</p>
            </div>

            <Separator className="bg-border/50" />

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Habilidades Técnicas</h3>
              <div className="flex flex-wrap gap-2">
                {professional.habilidadesTecnicas.map((skill) => (
                  <Badge 
                    key={skill}
                    className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {professional.softSkills.map((skill) => (
                  <Badge 
                    key={skill}
                    variant="outline"
                    className="border-secondary/30 text-secondary hover:bg-secondary/10"
                  >
                    <Heart className="mr-1 h-3 w-3" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="bg-border/50" />

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Experiência Profissional
              </h3>
              <div className="space-y-4">
                {professional.experiencias.map((exp, index) => (
                  <div key={index} className="border-l-2 border-primary/30 pl-4">
                    <h4 className="font-semibold text-foreground">{exp.cargo}</h4>
                    <p className="text-sm text-primary">{exp.empresa}</p>
                    <p className="text-sm text-muted-foreground">
                      {exp.inicio} - {exp.fim}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">{exp.descricao}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-secondary" />
                Formação Acadêmica
              </h3>
              <div className="space-y-3">
                {professional.formacao.map((edu, index) => (
                  <div key={index} className="border-l-2 border-secondary/30 pl-4">
                    <h4 className="font-semibold text-foreground">{edu.curso}</h4>
                    <p className="text-sm text-secondary">{edu.instituicao}</p>
                    <p className="text-sm text-muted-foreground">{edu.ano}</p>
                  </div>
                ))}
              </div>
            </div>

            {professional.projetos.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Projetos</h3>
                <div className="space-y-3">
                  {professional.projetos.map((project, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/30 border border-border/30">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground">{project.titulo}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{project.descricao}</p>
                        </div>
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {professional.certificacoes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent" />
                  Certificações
                </h3>
                <div className="flex flex-wrap gap-2">
                  {professional.certificacoes.map((cert) => (
                    <Badge 
                      key={cert}
                      variant="outline"
                      className="border-accent/30 text-accent hover:bg-accent/10"
                    >
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Idiomas
              </h3>
              <div className="flex flex-wrap gap-2">
                {professional.idiomas.map((lang, index) => (
                  <Badge 
                    key={index}
                    variant="secondary"
                    className="bg-card border-border"
                  >
                    {lang.idioma} - {lang.nivel}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Áreas de Interesse</h3>
              <div className="flex flex-wrap gap-2">
                {professional.areaInteresses.map((interest) => (
                  <Badge 
                    key={interest}
                    className="bg-gradient-secondary text-white"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
