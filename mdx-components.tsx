import type { MDXComponents } from "mdx/types";
import Image from "next/image";

// This file allows you to provide custom React components
// to be used in MDX files. Next.js will automatically use
// this file to render MDX content.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // This overrides the default <img> element to use next/image
    // for better performance and optimization.
    img: (props) => {
      // The props from MDX for an `<img>` tag can include `width` and `height`
      // as `string | number`. The `next/image` component has stricter types.
      // Spreading `...props` directly causes a type conflict.
      // We destructure `width` and `height` out to avoid this conflict.
      const { alt = "", src = "", width, height, ...rest } = props;

      const imageWidth = typeof width === "number" ? width : 800;
      const imageHeight = typeof height === "number" ? height : 450;

      return (
        <Image
          alt={alt}
          src={src}
          width={imageWidth}
          height={imageHeight}
          className="w-full h-auto rounded-lg my-6"
          {...rest}
        />
      );
    },
  };
}
