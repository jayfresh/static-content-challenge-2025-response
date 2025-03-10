import { getPageContent, generatePage } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.slug.join('/');
  const content = getPageContent(slug);
  
  if (!content.exists) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: content.title || 'Acme Co',
  };
}

export default function Page({ params }: PageProps) {
  const slug = params.slug.join('/');
  const content = getPageContent(slug);

  if (!content.exists) {
    notFound();
  }

  const html = generatePage(content);

  return (
    <div 
      className="prose mx-auto py-8 px-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
} 