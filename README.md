# Global Solution

## Avatares de Profissionais
As imagens de perfil dos profissionais são geradas dinamicamente via Unsplash em `src/components/ProfessionalCard.tsx`. Um array de IDs de fotos é usado para produzir URLs estáveis de retratos profissionais:

`https://images.unsplash.com/photo-<ID>?auto=format&fit=crop&w=600&h=480&q=80&crop=faces`

Para alterar o estilo visual:
- Substitua os IDs por outros de retratos no Unsplash.
- Ajuste parâmetros (ex.: `w`, `h`, `q`) se quiser otimizar peso/qualidade.
- Para voltar a avatares ilustrados (ex.: Dicebear), troque a lógica de `imageUrl` no componente.

Recomendação de atribuição: adicionar em uma página "Sobre" ou no rodapé créditos aos fotógrafos correspondentes aos IDs usados, conforme diretrizes do Unsplash.