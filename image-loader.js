/*
 * This custom loader allows you to use next/image with static exports
 * without the default Vercel image optimization.
 */
export default function customLoader({ src }) {
  return src;
}
