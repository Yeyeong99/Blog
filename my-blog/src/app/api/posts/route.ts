import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import slugify from 'slugify';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, content, tags, imageUrl } = body;

    // Create a URL-friendly slug from the title
    const slug = slugify(title, { lower: true, strict: true });

    // Create the post
    const post = await prisma.post.create({
      data: {
        title,
        description,
        content,
        tags: Array.isArray(tags) ? tags : [],
        imageUrl,
        slug,
        published: true,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error fetching posts', details: error.message },
      { status: 500 }
    );
  }
} 