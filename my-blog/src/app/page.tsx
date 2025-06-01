import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import type { Post } from '@prisma/client';

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">My Blog</h1>
        <Link 
          href="/write" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Write Article
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post: Post) => (
          <ArticleCard key={post.id} article={post} />
        ))}
      </div>
    </main>
  );
}
