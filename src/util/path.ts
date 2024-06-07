import { resolve, join } from 'path/posix'

export function isDotfile (file: string): boolean {
  return file.startsWith('.')
}

export function safeJoin (inputPath: string, joinPath: string): string {
  const basePath = inputPath.replace(/\/+/g, '/')
  const joinPathBase = joinPath.replace(/\/+/g, '/')

  const rootPath = resolve('/', joinPathBase)

  return join(basePath, '.' + rootPath)
}
