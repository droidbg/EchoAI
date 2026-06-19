/**
 * Collision-resistant client-side ID generator.
 *
 * Combines a time component (sortable, monotonic-ish) with random entropy so
 * IDs are unique across messages, conversations and error markers created in
 * the same millisecond. Used wherever the client needs a local, throwaway id —
 * none of these ids are security-sensitive.
 *
 * @license Apache-2.0
 */
export const newId = (): string =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
