import React from 'react';
import { IconType } from 'react-icons';

interface ReactIconProps {
  icon: IconType;
  className?: string;
}

export function ReactIcon({ icon: Icon, className }: ReactIconProps) {
  return (
    <div className={className}>
      <Icon />
    </div>
  );
}
