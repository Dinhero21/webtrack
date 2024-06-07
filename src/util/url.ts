export function isValidURL (url: unknown): url is string | URL {
  if (!(url instanceof URL || typeof url === 'string')) {
    return false
  }

  try {
    // eslint-disable-next-line no-new
    new URL(url)

    return true
  } catch {
    return false
  }
}
