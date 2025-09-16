import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SEO } from '../components/SEO';
import { useCart } from '../contexts/CartContext';
import { Price } from '../components/Price';
import { Card, Button } from '@adventuringghost/ui';
import { ProductJsonLd } from '../components/ProductJsonLd';
import { products } from '../data/products';
import type { Product } from '../types';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === id);
      setProduct(foundProduct || null);
      setLoading(false);

      // Analytics - track individual product view
      if (foundProduct) {
        console.log('view_item', {
          item_id: foundProduct.id,
          item_name: foundProduct.name,
          price: foundProduct.price
        });
      }
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunrise-green mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <>
        <SEO
          title="Product Not Found - Glow+Grove"
          description="The product you are looking for does not exist."
        />
        <div className="text-center py-16 space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">Product Not Found</h1>
          <p className="text-lg text-gray-600">
            We couldn't find the product you're looking for.
          </p>
          <Link to="/products" className="btn-primary">
            Browse All Products
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${product.name} - Glow+Grove`}
        description={product.tagline}
      />
      <ProductJsonLd product={product} />
      
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link to="/" className="hover:text-sunrise-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link to="/products" className="hover:text-sunrise-green transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-900 font-medium">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div>
              <Card className="p-8">
                <div className="bg-gradient-to-br from-pastel-green to-pastel-lime rounded-2xl h-96 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <p className="text-gray-500">Product Image</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <p className="text-xl text-gray-600 mb-6">{product.tagline}</p>
                <div className="text-3xl font-bold text-sunrise-green mb-8">
                  <Price amount={product.price} />
                </div>
              </div>

              {/* Product Description */}
              <Card>
                <h2 className="text-xl font-semibold mb-4">About This Product</h2>
                <p className="text-gray-700 leading-relaxed">
                  Experience the gentle, effective formula that works with your skin's natural processes. 
                  This carefully crafted product combines proven ingredients with our signature approach 
                  to skincare - simple, effective, and enjoyable.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-sunrise-green rounded-full"></div>
                    <span className="text-gray-700">Gentle and non-irritating</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-sunrise-green rounded-full"></div>
                    <span className="text-gray-700">Suitable for all skin types</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-sunrise-green rounded-full"></div>
                    <span className="text-gray-700">Dermatologist tested</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-sunrise-green rounded-full"></div>
                    <span className="text-gray-700">Cruelty-free and vegan</span>
                  </div>
                </div>
              </Card>

              {/* Add to Cart Section */}
              <Card>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Quantity</span>
                    <span className="text-sm text-gray-500">1</span>
                  </div>
                  
                  <Button 
                    onClick={handleAddToCart}
                    variant="primary"
                    className="w-full text-lg py-4"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    Add to Cart
                  </Button>
                  
                  <p className="text-sm text-gray-500 text-center">
                    Free shipping on orders over $50
                  </p>
                </div>
              </Card>

              {/* Product Features */}
              <Card>
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-sunrise-green/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-sunrise-green" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Hydrating</h4>
                      <p className="text-sm text-gray-600">Deeply moisturizes skin</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-sunrise-orange/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-sunrise-orange" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Brightening</h4>
                      <p className="text-sm text-gray-600">Improves skin radiance</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-sunrise-lime/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-sunrise-lime" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Soothing</h4>
                      <p className="text-sm text-gray-600">Calms sensitive skin</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-sunrise-red/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-sunrise-red" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Protective</h4>
                      <p className="text-sm text-gray-600">Strengthens skin barrier</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Related Products */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter(p => p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    to={`/products/${relatedProduct.id}`}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300">
                      <div className="space-y-4">
                        <div className="bg-gradient-to-br from-pastel-green to-pastel-lime rounded-xl h-32 flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-sunrise-green transition-colors">
                            {relatedProduct.name}
                          </h3>
                          <p className="text-sm text-gray-600">{relatedProduct.tagline}</p>
                          <p className="text-lg font-bold text-sunrise-green mt-2">
                            <Price amount={relatedProduct.price} />
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
