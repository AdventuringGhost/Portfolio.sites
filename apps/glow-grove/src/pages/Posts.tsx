import { SEO } from '../components/SEO';
import { PostCard } from '../components/PostCard';
import { posts } from '../data/posts';

export const Posts = () => {
  return (
    <>
      <SEO
        title="Posts - Glow+Grove"
        description="Expert skincare tips and advice to help you achieve your best skin."
      />
      
      <main className="p-6 space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-zinc-600">Skincare tips and expert advice for your glow journey.</p>
        </header>

        {posts.length === 0 ? (
          <p className="text-zinc-600">No posts available at the moment.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </>
  );
};









