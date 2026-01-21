import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, language = 'bash', filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('code-block my-4 overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[hsl(var(--code-border))] bg-[hsl(var(--code-background))]">
        <div className="flex items-center gap-2">
          {/* Fake terminal dots */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          {filename && (
            <span className="ml-3 text-xs text-muted-foreground font-mono">
              {filename}
            </span>
          )}
          {!filename && language && (
            <span className="ml-3 text-xs text-muted-foreground font-mono uppercase">
              {language}
            </span>
          )}
        </div>
        
        <button
          onClick={handleCopy}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium',
            'transition-all duration-200',
            'hover:bg-primary/10 hover:text-primary',
            copied ? 'text-green-500' : 'text-muted-foreground'
          )}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="p-4 overflow-x-auto scrollbar-thin">
        <pre className="text-sm leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
