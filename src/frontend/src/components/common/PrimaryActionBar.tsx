import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PrimaryActionBarProps {
  children: ReactNode;
  className?: string;
}

export default function PrimaryActionBar({ children, className }: PrimaryActionBarProps) {
  return (
    <div className={cn('sticky bottom-0 left-0 right-0 border-t bg-card p-4 shadow-lg mt-6', className)}>
      <div className="container max-w-2xl mx-auto">
        {children}
      </div>
    </div>
  );
}
