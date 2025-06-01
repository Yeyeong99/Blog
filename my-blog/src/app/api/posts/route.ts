import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const post = await prisma.post.create({
      data: {
        title: json.title,
        description: json.description,
        content: json.content,
        imageUrl: json.imageUrl,
        tags: json.tags.split(',').map((tag: string) => tag.trim()),
        slug: json.title.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-'),
        published: true,
      },
    });

    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error creating post', details: error.message },
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