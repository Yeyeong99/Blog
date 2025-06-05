import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true }
  });
  
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.post.findUnique({
    where: { 
      slug: params.slug,
      published: true
    },
  });

  if (!post) {
    return notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <Link 
        href="/" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
      >
        ← Back to Home
      </Link>
      
      {post.imageUrl && (
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex gap-2 mb-6">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <time className="text-gray-500 block mb-8">
          {post.createdAt.toLocaleDateString()}
        </time>

        <p className="text-xl text-gray-700 mb-8">{post.description}</p>

        <div className="text-gray-800 prose" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </main>
  );
} 