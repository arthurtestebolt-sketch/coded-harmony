import { Github, ExternalLink, AlertCircle, CheckCircle2, Info, Lightbulb } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { IconButton } from './ui/IconButton';
import { cn } from '@/lib/utils';

interface DocumentationContentProps {
  activeSection: string;
}

const Alert = ({ type, children }: { type: 'info' | 'warning' | 'success' | 'tip'; children: React.ReactNode }) => {
  const styles = {
    info: 'border-primary/30 bg-primary/5 text-primary',
    warning: 'border-yellow-500/30 bg-yellow-500/5 text-yellow-600',
    success: 'border-green-500/30 bg-green-500/5 text-green-600',
    tip: 'border-purple-500/30 bg-purple-500/5 text-purple-600',
  };

  const icons = {
    info: <Info className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    success: <CheckCircle2 className="w-5 h-5" />,
    tip: <Lightbulb className="w-5 h-5" />,
  };

  return (
    <div className={cn('flex gap-3 p-4 rounded-lg border my-4', styles[type])}>
      {icons[type]}
      <div className="text-sm">{children}</div>
    </div>
  );
};

export function DocumentationContent({ activeSection }: DocumentationContentProps) {
  const renderContent = () => {
    switch (activeSection) {
      case 'introduction':
        return (
          <div className="prose-docs">
            <h1>Introdução</h1>
            <p>
              Bem-vindo à documentação do <strong>DocuFlow</strong> — uma plataforma moderna para criar 
              aplicações web escaláveis e performáticas.
            </p>

            <div className="flex gap-3 my-6">
              <IconButton 
                icon={<Github className="w-5 h-5" />}
                label="GitHub"
                href="https://github.com"
              />
            </div>

            <Alert type="info">
              Esta documentação está em constante evolução. Contribuições são bem-vindas!
            </Alert>

            <h2>Por que DocuFlow?</h2>
            <p>
              DocuFlow foi criado para simplificar o desenvolvimento de aplicações modernas, 
              oferecendo uma experiência de desenvolvedor excepcional.
            </p>

            <ul>
              <li><strong>Performance</strong> — Otimizado para carregamento ultra-rápido</li>
              <li><strong>TypeScript</strong> — Tipagem completa para maior segurança</li>
              <li><strong>Componentes</strong> — Biblioteca rica de componentes reutilizáveis</li>
              <li><strong>Documentação</strong> — Guias detalhados e exemplos práticos</li>
            </ul>

            <h2>Recursos Principais</h2>
            <p>
              Explore os principais recursos que tornam o DocuFlow a escolha ideal para seu próximo projeto.
            </p>

            <CodeBlock 
              code={`// Exemplo de configuração
import { docuflow } from '@docuflow/core';

const app = docuflow.create({
  name: 'Meu Projeto',
  version: '1.0.0',
  plugins: ['analytics', 'seo']
});

app.start();`}
              language="typescript"
              filename="docuflow.config.ts"
            />
          </div>
        );

      case 'installation':
        return (
          <div className="prose-docs">
            <h1>Instalação</h1>
            <p>
              Siga os passos abaixo para instalar o DocuFlow em seu projeto.
            </p>

            <h2>Pré-requisitos</h2>
            <ul>
              <li>Node.js 18.0 ou superior</li>
              <li>npm, yarn ou pnpm</li>
              <li>Git (opcional)</li>
            </ul>

            <h2>Via NPM</h2>
            <CodeBlock 
              code="npm install @docuflow/core @docuflow/cli"
              language="bash"
            />

            <h2>Via Yarn</h2>
            <CodeBlock 
              code="yarn add @docuflow/core @docuflow/cli"
              language="bash"
            />

            <h2>Via PNPM</h2>
            <CodeBlock 
              code="pnpm add @docuflow/core @docuflow/cli"
              language="bash"
            />

            <Alert type="tip">
              Recomendamos usar pnpm para instalações mais rápidas e eficientes em disco.
            </Alert>

            <h2>Verificar Instalação</h2>
            <p>Após a instalação, verifique se tudo está funcionando:</p>
            <CodeBlock 
              code={`npx docuflow --version
# Output: DocuFlow CLI v2.0.0`}
              language="bash"
            />

            <Alert type="success">
              Pronto! Agora você pode começar a usar o DocuFlow em seu projeto.
            </Alert>
          </div>
        );

      case 'quick-start':
        return (
          <div className="prose-docs">
            <h1>Início Rápido</h1>
            <p>
              Crie seu primeiro projeto DocuFlow em menos de 5 minutos.
            </p>

            <h2>Criar Novo Projeto</h2>
            <CodeBlock 
              code={`# Criar novo projeto
npx create-docuflow@latest meu-projeto

# Navegar para o diretório
cd meu-projeto

# Iniciar servidor de desenvolvimento
npm run dev`}
              language="bash"
            />

            <Alert type="info">
              O comando acima cria um projeto com toda a estrutura necessária.
            </Alert>

            <h2>Estrutura do Projeto</h2>
            <CodeBlock 
              code={`meu-projeto/
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── main.tsx
├── public/
├── docuflow.config.ts
├── package.json
└── tsconfig.json`}
              language="plaintext"
              filename="Estrutura"
            />

            <h2>Próximos Passos</h2>
            <ul>
              <li>Explore a seção de <strong>Guias</strong> para aprender conceitos avançados</li>
              <li>Consulte a <strong>API Reference</strong> para detalhes técnicos</li>
              <li>Veja os <strong>Componentes</strong> disponíveis para usar em seu projeto</li>
            </ul>
          </div>
        );

      case 'configuration':
        return (
          <div className="prose-docs">
            <h1>Configuração</h1>
            <p>
              Aprenda a configurar seu projeto DocuFlow para diferentes ambientes e necessidades.
            </p>

            <h2>Arquivo de Configuração</h2>
            <p>
              O arquivo <code>docuflow.config.ts</code> é o coração da configuração do seu projeto.
            </p>

            <CodeBlock 
              code={`import { defineConfig } from '@docuflow/core';

export default defineConfig({
  // Configurações do projeto
  name: 'Meu Projeto',
  version: '1.0.0',
  
  // Plugins
  plugins: [
    'analytics',
    'seo',
    'sitemap'
  ],
  
  // Configurações de build
  build: {
    outDir: 'dist',
    minify: true,
    sourcemap: process.env.NODE_ENV !== 'production'
  },
  
  // Configurações do servidor
  server: {
    port: 3000,
    host: 'localhost',
    cors: true
  }
});`}
              language="typescript"
              filename="docuflow.config.ts"
            />

            <Alert type="warning">
              Sempre reinicie o servidor após modificar o arquivo de configuração.
            </Alert>

            <h2>Variáveis de Ambiente</h2>
            <p>
              Use arquivos <code>.env</code> para configurar variáveis de ambiente.
            </p>

            <CodeBlock 
              code={`# .env.local
DOCUFLOW_API_KEY=sua-chave-api
DOCUFLOW_DEBUG=true
DATABASE_URL=postgres://localhost:5432/mydb`}
              language="bash"
              filename=".env.local"
            />
          </div>
        );

      default:
        return (
          <div className="prose-docs">
            <h1>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace('-', ' ')}</h1>
            <p>
              Conteúdo da seção <strong>{activeSection}</strong> em desenvolvimento.
            </p>
            
            <Alert type="info">
              Esta seção está sendo elaborada. Volte em breve para mais conteúdo!
            </Alert>

            <h2>Exemplo de Código</h2>
            <CodeBlock 
              code={`// Exemplo para ${activeSection}
import { ${activeSection.replace('-', '')} } from '@docuflow/core';

const config = {
  feature: '${activeSection}',
  enabled: true
};

export default config;`}
              language="typescript"
            />

            <div className="flex gap-3 mt-6">
              <IconButton 
                icon={<Github className="w-5 h-5" />}
                label="Ver código"
                href="https://github.com"
              />
              <IconButton 
                icon={<ExternalLink className="w-5 h-5" />}
                label="Exemplo"
                href="#"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <main className="flex-1 min-h-screen p-8 lg:p-12 max-w-4xl">
      {renderContent()}
    </main>
  );
}
