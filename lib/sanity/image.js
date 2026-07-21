import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './client'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source) {
  return builder.image(source)
}

export function imgUrl(source, fallback) {
  if (!source || !source.asset) return fallback || ''
  try {
    return builder.image(source).auto('format').fit('max').url()
  } catch (e) {
    return fallback || ''
  }
}
