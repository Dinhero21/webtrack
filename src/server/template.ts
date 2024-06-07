import { join } from 'path'
import { readFile } from 'fs/promises'

const TEMPLATE_DIR = await readFile('template/dir.html', 'utf8')

export async function renderDir (path: string, files: string[]): Promise<string> {
  return TEMPLATE_DIR
    .replace('{{path}}', path)
    .replace(
      '{{content}}',
      files
        .map(file => `<li><a href="${join(path, file)}">${file}</a></li>`)
        .join('')
    )
}
