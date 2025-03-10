import { getAllContent } from '@/lib/content';
import ContentTree from '@/components/ContentTree';

export default function Home() {
  const content = getAllContent();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Acme Co Content</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          {content.length > 0 ? (
            <ContentTree items={content} />
          ) : (
            <p className="text-gray-500">No content found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
