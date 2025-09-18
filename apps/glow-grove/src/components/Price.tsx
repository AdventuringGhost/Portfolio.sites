interface PriceProps {
  amount: string | number;
  className?: string;
}

export const Price = ({ amount, className = '' }: PriceProps) => {
  const formatPrice = (value: string | number): string => {
    if (typeof value === 'string') {
      // If it's already formatted as "$XX", return as is
      if (value.startsWith('$')) {
        return value;
      }
      // Otherwise, parse and format
      const numValue = parseFloat(value);
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(numValue);
    }
    
    // If it's a number, format it
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <span className={className}>
      {formatPrice(amount)}
    </span>
  );
};












