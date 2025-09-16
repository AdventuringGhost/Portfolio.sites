import { useEffect } from 'react';
import { SEO } from '../components/SEO';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

export const Products = () => {
  // Analytics - track product views
  useEffect(() => {
    console.log('view_item_list', {
      items: products.map(product => ({
        item_id: product.id,
        item_name: product.name,
        price: product.price
      }))
    });
  }, []);

  return (
    <>
      <SEO
        title="Products - Glow+Grove"
        description="Discover our gentle, effective skincare products formulated for radiant, healthy skin."
      />
      
      <main className="p-6 space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-zinc-600">Gentle, effective skincare for your glow journey.</p>
        </header>

        {products.length === 0 ? (
          <p className="text-zinc-600">No products available at the moment.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </>
  );
};
