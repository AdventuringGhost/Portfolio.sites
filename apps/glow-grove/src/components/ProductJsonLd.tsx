import { useEffect } from 'react';
import type { Product } from '../types';

interface ProductJsonLdProps {
  product: Product;
}

export const ProductJsonLd = ({ product }: ProductJsonLdProps) => {
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.tagline,
      "image": product.image || "https://glow-grove.com/product-placeholder.jpg",
      "brand": {
        "@type": "Brand",
        "name": "Glow+Grove"
      },
      "offers": {
        "@type": "Offer",
        "price": product.price.replace('$', ''),
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Glow+Grove"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127"
      }
    };

    // Remove existing JSON-LD script
    const existingScript = document.querySelector('script[data-product-jsonld]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new JSON-LD script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    script.setAttribute('data-product-jsonld', 'true');
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      const scriptToRemove = document.querySelector('script[data-product-jsonld]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [product]);

  return null;
};









