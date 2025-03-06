import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
}

export function Icon({ icon: Icon, size = 24, className }: IconProps) {
  return (
    <div className={className}>
      <Icon size={size} />
    </div>
  );
}
