import Link from 'next/link';

interface ContentItem {
  title: string;
  path: string;
  children?: ContentItem[];
}

interface ContentTreeProps {
  items: ContentItem[];
  level?: number;
}

export default function ContentTree({ items, level = 0 }: ContentTreeProps) {
  return (
    <ul className={`space-y-2 ${level > 0 ? 'ml-6' : ''}`}>
      {items.map((item) => (
        <li key={item.path} className="group">
          <div className="flex items-center space-x-2">
            <Link 
              href={`/${item.path}`}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {item.title}
            </Link>
          </div>
          {item.children && (
            <div className="mt-2">
              <ContentTree items={item.children} level={level + 1} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
} 