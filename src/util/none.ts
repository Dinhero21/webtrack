export type None = null | undefined

export function isNone (value: unknown): value is None {
  return value === null || value === undefined
}

export function valid<T> (value: T | None, error: Error): T {
  if (isNone(value)) {
    throw error
  }

  return value
}
