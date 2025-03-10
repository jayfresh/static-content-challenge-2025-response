import { getPageContent, generatePage } from '@/lib/markdown';
import fs from 'fs';
import path from 'path';

// Mock fs and path modules
jest.mock('fs');
jest.mock('path', () => ({
  ...jest.requireActual('path'),
  join: (...args: string[]) => args.join('/'),
}));

describe('Content Processing', () => {
  const mockTemplate = '<!DOCTYPE html><html><body>{{content}}</body></html>';
  const mockMarkdown = '# Test Page\nThis is a test page.';

  beforeEach(() => {
    (fs.readFileSync as jest.Mock).mockImplementation((path: string) => {
      if (path.endsWith('template.html')) {
        return mockTemplate;
      }
      if (path.endsWith('index.md')) {
        return mockMarkdown;
      }
      throw new Error('File not found');
    });
    
    (fs.existsSync as jest.Mock).mockImplementation((path: string) => {
      return path.endsWith('index.md');
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns 200-like response for valid paths', () => {
    const content = getPageContent('valid-path');
    expect(content.exists).toBe(true);
  });

  test('returns 404-like response for invalid paths', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    const content = getPageContent('invalid-path');
    expect(content.exists).toBe(false);
  });

  test('generates HTML from markdown content', () => {
    const content = getPageContent('valid-path');
    const html = generatePage(content);
    expect(html).toContain('<h1>Test Page</h1>');
    expect(html).toContain('This is a test page.');
  });
}); 