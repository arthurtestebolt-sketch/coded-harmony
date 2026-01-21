import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  label: string;
  level: number;
}

interface TableOfContentsProps {
  activeSection: string;
}

const tocItems: Record<string, TocItem[]> = {
  introduction: [
    { id: 'intro', label: 'Introdução', level: 1 },
    { id: 'why', label: 'Por que DocuFlow?', level: 2 },
    { id: 'features', label: 'Recursos Principais', level: 2 },
  ],
  installation: [
    { id: 'prereq', label: 'Pré-requisitos', level: 2 },
    { id: 'npm', label: 'Via NPM', level: 2 },
    { id: 'yarn', label: 'Via Yarn', level: 2 },
    { id: 'pnpm', label: 'Via PNPM', level: 2 },
    { id: 'verify', label: 'Verificar Instalação', level: 2 },
  ],
  'quick-start': [
    { id: 'create', label: 'Criar Novo Projeto', level: 2 },
    { id: 'structure', label: 'Estrutura do Projeto', level: 2 },
    { id: 'next', label: 'Próximos Passos', level: 2 },
  ],
  configuration: [
    { id: 'config-file', label: 'Arquivo de Configuração', level: 2 },
    { id: 'env', label: 'Variáveis de Ambiente', level: 2 },
  ],
};

export function TableOfContents({ activeSection }: TableOfContentsProps) {
  const items = tocItems[activeSection] || [];

  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-8">
        <h4 className="text-sm font-semibold text-foreground mb-3">
          Nesta página
        </h4>
        <nav>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    'block text-sm transition-colors duration-200',
                    'text-muted-foreground hover:text-primary',
                    item.level === 1 && 'font-medium text-foreground',
                    item.level === 2 && 'pl-3 border-l-2 border-border hover:border-primary'
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Quick links */}
        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Links Rápidos
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Editar esta página
              </a>
            </li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Reportar problema
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
