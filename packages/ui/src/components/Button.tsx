import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#78C841',
          color: 'white',
          border: 'none'
        };
      case 'secondary':
        return {
          backgroundColor: '#B4E50D',
          color: '#1f2937',
          border: 'none'
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: '#78C841',
          border: '2px solid #78C841'
        };
      default:
        return {};
    }
  };

  const getHoverStyles = (variant: string) => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: '#FF9B2F' };
      case 'secondary':
        return { backgroundColor: '#FB4141', color: 'white' };
      case 'outline':
        return { backgroundColor: '#78C841', color: 'white' };
      default:
        return {};
    }
  };
  
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg'
  };
  
  const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;
  const variantStyles = getVariantStyles(variant);
  
  return (
    <button 
      className={classes} 
      style={variantStyles}
      onMouseEnter={(e) => {
        const hoverStyles = getHoverStyles(variant);
        Object.assign(e.currentTarget.style, hoverStyles);
      }}
      onMouseLeave={(e) => {
        const originalStyles = getVariantStyles(variant);
        Object.assign(e.currentTarget.style, originalStyles);
      }}
      {...props}
    >
      {children}
    </button>
  );
};
