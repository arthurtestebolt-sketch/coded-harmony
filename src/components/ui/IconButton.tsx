import { ReactNode, useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface IconButtonProps {
  icon: ReactNode;
  label?: string;
  onClick?: () => void;
  className?: string;
  href?: string;
}

export function IconButton({ icon, label, onClick, className, href }: IconButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (buttonRef.current && isHovered) {
        const rect = buttonRef.current.getBoundingClientRect();
        setCursorPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);

  const commonProps = {
    ref: buttonRef as any,
    className: cn(
      'relative inline-flex items-center justify-center p-3 rounded-xl',
      'border border-border bg-card text-foreground',
      'transition-all duration-300 ease-out',
      'hover:border-primary hover:shadow-lg hover:shadow-primary/20',
      'focus:outline-none focus:ring-2 focus:ring-primary/50',
      'overflow-hidden group',
      isHovered && 'cursor-none',
      className
    ),
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onClick,
    'aria-label': label
  };

  const content = (
    <>
      {/* Background glow effect */}
      <div 
        className={cn(
          'absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5',
          'opacity-0 transition-opacity duration-300',
          isHovered && 'opacity-100'
        )}
      />
      
      {/* Icon that follows cursor when hovered */}
      <div
        className={cn(
          'relative z-10 transition-all duration-200',
          'text-muted-foreground group-hover:text-primary',
          isHovered && 'scale-125'
        )}
        style={isHovered ? {
          transform: `translate(${(cursorPos.x - 24) * 0.15}px, ${(cursorPos.y - 24) * 0.15}px) scale(1.25)`
        } : undefined}
      >
        {icon}
      </div>

      {/* Ripple effect on hover */}
      {isHovered && (
        <div 
          className="absolute w-32 h-32 bg-primary/10 rounded-full animate-ping"
          style={{
            left: cursorPos.x - 64,
            top: cursorPos.y - 64,
            animationDuration: '1s'
          }}
        />
      )}
    </>
  );

  if (href) {
    return (
      <a {...commonProps} href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <button {...commonProps}>{content}</button>;
}
