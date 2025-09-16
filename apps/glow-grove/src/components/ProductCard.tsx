import { Link } from 'react-router-dom';
import { Card } from '@adventuringghost/ui';
import { useCart } from '../contexts/CartContext';
import { Price } from './Price';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link to={`/products/${product.id}`} className="group">
      <Card className="h-full hover:shadow-xl transition-all duration-300">
        <div className="space-y-6">
          {/* Product Image or Placeholder */}
          <div className="bg-gradient-to-br from-pastel-green to-pastel-lime rounded-xl h-48 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-gray-500 text-sm">Product Image</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-sunrise-green transition-colors mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm">{product.tagline}</p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-sunrise-green">
                <Price amount={product.price} />
              </span>
              <button 
                onClick={handleAddToCart}
                className="btn-primary text-sm"
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
