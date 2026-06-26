import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidateTag } from 'next/cache'

export function makeRevalidateHook(tag: string): {
  afterChange: CollectionAfterChangeHook
  afterDelete: CollectionAfterDeleteHook
} {
  const afterChange: CollectionAfterChangeHook = () => {
    revalidateTag(tag, {})
  }

  const afterDelete: CollectionAfterDeleteHook = () => {
    revalidateTag(tag, {})
  }

  return { afterChange, afterDelete }
}
