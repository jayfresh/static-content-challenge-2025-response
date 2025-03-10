import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const contentDirectory = path.join(process.cwd(), 'src/content');
const templatePath = path.join(process.cwd(), 'src/template.html');

export interface PageContent {
  html: string;
  title: string;
  exists: boolean;
}

export function getTemplate(): string {
  return fs.readFileSync(templatePath, 'utf8');
}

export function getPageContent(slug: string): PageContent {
  try {
    const fullPath = path.join(contentDirectory, slug, 'index.md');
    
    if (!fs.existsSync(fullPath)) {
      return { html: '', title: '', exists: false };
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const html = marked.parse(content);

    return {
      html: html.toString(),
      title: data.title || '',
      exists: true
    };
  } catch (error) {
    return { html: '', title: '', exists: false };
  }
}

export function generatePage(content: PageContent): string {
  const template = getTemplate();
  return template.replace('{{content}}', content.html);
} 