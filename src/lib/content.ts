import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content');

interface ContentItem {
  title: string;
  path: string;
  children?: ContentItem[];
}

function getDirectoryContent(dir: string, basePath: string = ''): ContentItem[] {
  const items: ContentItem[] = [];
  const entries = fs.readdirSync(dir);

  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const relativePath = path.join(basePath, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const indexPath = path.join(fullPath, 'index.md');
      let title = entry.replace(/-/g, ' ');

      // Try to get title from index.md if it exists
      if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, 'utf8');
        const { data } = matter(content);
        if (data.title) {
          title = data.title;
        }
      }

      const children = getDirectoryContent(fullPath, relativePath);
      items.push({
        title: title.charAt(0).toUpperCase() + title.slice(1),
        path: relativePath,
        children: children.length > 0 ? children : undefined
      });
    }
  }

  return items.sort((a, b) => a.title.localeCompare(b.title));
}

export function getAllContent(): ContentItem[] {
  return getDirectoryContent(contentDirectory);
} 