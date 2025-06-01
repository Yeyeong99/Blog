import { articles } from '@/data/articles';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const article = articles.find((article) => article.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <Link 
        href="/" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
      >
        ← Back to Home
      </Link>
      
      {article.imageUrl && (
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        
        <div className="flex gap-2 mb-6">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <time className="text-gray-500 block mb-8">{article.date}</time>

        <p className="text-xl text-gray-700 mb-8">{article.description}</p>

        {/* This is where you would typically render the full article content */}
        <div className="text-gray-800">
          <p>
            This is a placeholder for the full article content. In a real blog, 
            you would typically fetch the full content from a CMS or markdown file 
            and render it here.
          </p>
        </div>
      </div>
    </main>
  );
} 