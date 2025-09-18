import { Card } from '@adventuringghost/ui';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="h-full hover:shadow-xl transition-all duration-300 group">
      <div className="space-y-6">
        {/* Post Image or Placeholder */}
        <div className="bg-gradient-to-br from-pastel-rose to-pastel-sky rounded-xl h-48 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-sm">Post Image</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-sunrise-pink transition-colors mb-2">
              {post.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
            <button className="btn-secondary text-sm">
              Read More
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};












