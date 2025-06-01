import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@prisma/client';

interface ArticleCardProps {
  article: Post;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/blog/${article.slug}`} className="group">
      <div className="overflow-hidden rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-lg">
        {article.imageUrl && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex gap-2">
            {article.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="mt-2 text-lg font-semibold text-gray-900">{article.title}</h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{article.description}</p>
          <time className="mt-2 block text-sm text-gray-500">
            {new Date(article.createdAt).toLocaleDateString()}
          </time>
        </div>
      </div>
    </Link>
  );
} 