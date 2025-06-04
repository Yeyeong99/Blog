import WriteForm from '@/components/WriteForm';

export default function WritePage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Write New Article</h1>
      <WriteForm />
    </main>
  );
} 