import { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, Code, Rocket, Settings, Zap, FileText, Package, Terminal, GitBranch } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems: MenuItem[] = [
  {
    id: 'getting-started',
    label: 'Começando',
    icon: <Rocket className="w-4 h-4" />,
    children: [
      { id: 'introduction', label: 'Introdução' },
      { id: 'installation', label: 'Instalação' },
      { id: 'quick-start', label: 'Início Rápido' },
    ]
  },
  {
    id: 'guides',
    label: 'Guias',
    icon: <BookOpen className="w-4 h-4" />,
    children: [
      { id: 'configuration', label: 'Configuração' },
      { id: 'deployment', label: 'Deploy' },
      { id: 'best-practices', label: 'Boas Práticas' },
    ]
  },
  {
    id: 'api',
    label: 'API Reference',
    icon: <Code className="w-4 h-4" />,
    children: [
      { id: 'endpoints', label: 'Endpoints' },
      { id: 'authentication', label: 'Autenticação' },
      { id: 'errors', label: 'Tratamento de Erros' },
    ]
  },
  {
    id: 'components',
    label: 'Componentes',
    icon: <Package className="w-4 h-4" />,
    children: [
      { id: 'buttons', label: 'Botões' },
      { id: 'forms', label: 'Formulários' },
      { id: 'modals', label: 'Modais' },
    ]
  },
  {
    id: 'cli',
    label: 'CLI',
    icon: <Terminal className="w-4 h-4" />,
    children: [
      { id: 'commands', label: 'Comandos' },
      { id: 'scripts', label: 'Scripts' },
    ]
  },
  {
    id: 'advanced',
    label: 'Avançado',
    icon: <Settings className="w-4 h-4" />,
    children: [
      { id: 'plugins', label: 'Plugins' },
      { id: 'customization', label: 'Customização' },
      { id: 'performance', label: 'Performance' },
    ]
  },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(['getting-started', 'guides']);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const isChildActive = (item: MenuItem) => {
    return item.children?.some(child => child.id === activeSection);
  };

  return (
    <aside className="w-64 h-screen sticky top-0 bg-sidebar border-r border-sidebar-border overflow-y-auto scrollbar-thin">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-foreground">DocuFlow</h1>
            <p className="text-xs text-muted-foreground">v2.0.0</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => toggleExpand(item.id)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2.5 rounded-lg',
                  'text-sm font-medium transition-all duration-200',
                  'hover:bg-sidebar-accent',
                  (expandedItems.includes(item.id) || isChildActive(item)) 
                    ? 'text-primary bg-primary/5' 
                    : 'text-sidebar-foreground'
                )}
              >
                <span className="flex items-center gap-3">
                  {item.icon}
                  {item.label}
                </span>
                {item.children && (
                  expandedItems.includes(item.id) 
                    ? <ChevronDown className="w-4 h-4" />
                    : <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {/* Submenu */}
              {item.children && expandedItems.includes(item.id) && (
                <ul className="mt-1 ml-4 pl-4 border-l-2 border-sidebar-border space-y-1">
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <button
                        onClick={() => onSectionChange(child.id)}
                        className={cn(
                          'w-full text-left px-3 py-2 rounded-lg text-sm',
                          'transition-all duration-200',
                          activeSection === child.id
                            ? 'bg-primary text-primary-foreground font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-sidebar-accent'
                        )}
                      >
                        {child.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border bg-sidebar">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-all duration-200"
        >
          <GitBranch className="w-4 h-4" />
          <span>Ver no GitHub</span>
        </a>
      </div>
    </aside>
  );
}
