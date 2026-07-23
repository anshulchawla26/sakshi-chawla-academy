import { sanityClient } from './client'
import { homePageQuery } from './queries'
import { FALLBACKS } from './fallbacks'
import { imgUrl } from './image'

// Merge CMS data with fallbacks so the site always looks complete.
function hasText(v) {
  return typeof v === 'string' && v.trim().length > 0
}

// Choose CMS data if any usable items are present, otherwise fall back.
// `validate` filters out incomplete items. If nothing usable remains, we
// use the fallback list so the section on the live site never breaks.
function chooseList(cmsList, fallbackList, validate) {
  const arr = Array.isArray(cmsList) ? cmsList.filter(validate) : []
  if (arr.length > 0) return arr
  return fallbackList || []
}

export async function getHomeData() {
  let data = {}
  try {
    data = (await sanityClient.fetch(homePageQuery, {}, { next: { revalidate: 30 } })) || {}
  } catch (e) {
    console.error('[Sanity] fetch failed, using fallbacks:', e?.message)
    data = {}
  }

  const hero = data.hero || {}
  const about = data.about || {}
  const teacher = data.teacher || {}

  const courses = chooseList(data.courses, FALLBACKS.courses, (c) => hasText(c?.title))
  const whyChooseUs = chooseList(data.whyChooseUs, FALLBACKS.whyChooseUs, (w) => hasText(w?.title))
  const learningSteps = chooseList(data.learningSteps, FALLBACKS.learningSteps, (s) => hasText(s?.title))
  const statistics = chooseList(data.statistics, FALLBACKS.statistics, (s) => hasText(s?.label) && s?.value != null)
  const STUDENT_PHOTO_FALLBACK = 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80'
  const AVATAR_FALLBACK = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'

  const studentResults = chooseList(
    data.studentResults,
    FALLBACKS.studentResults,
    (r) => hasText(r?.name) && hasText(r?.marks)
  ).map((r) => ({
    ...r,
    photoUrl: (r.photoUrl && hasText(r.photoUrl)) ? r.photoUrl : (imgUrl(r.photo, '') || STUDENT_PHOTO_FALLBACK),
  }))
  const galleryCategories = chooseList(data.galleryCategories, FALLBACKS.galleryCategories, (c) => hasText(c?.name))
  const galleryImages = chooseList(
    Array.isArray(data.galleryImages)
      ? data.galleryImages.map((g) => ({
          ...g,
          imageUrl: g.imageUrl || imgUrl(g.image, ''),
          category: g.category || { name: 'General', slug: { current: 'general' } },
        }))
      : null,
    FALLBACKS.galleryImages,
    (g) => hasText(g?.imageUrl)
  )
  const testimonials = chooseList(
    data.testimonials,
    FALLBACKS.testimonials,
    (t) => hasText(t?.review) && hasText(t?.parentName)
  ).map((t) => ({
    ...t,
    photoUrl: t.photoUrl || imgUrl(t.photo, ''),
  }))
  const googleReviews = chooseList(
    data.googleReviews,
    FALLBACKS.googleReviews,
    (g) => hasText(g?.review) && hasText(g?.reviewerName)
  ).map((g) => ({
    ...g,
    photoUrl: g.photoUrl || imgUrl(g.photo, ''),
  }))
  const faqs = chooseList(data.faqs, FALLBACKS.faqs, (f) => hasText(f?.question) && hasText(f?.answer))

  return {
    siteSettings: {
      ...FALLBACKS.siteSettings,
      ...(data.siteSettings || {}),
      socialLinks: {
        ...FALLBACKS.siteSettings.socialLinks,
        ...((data.siteSettings && data.siteSettings.socialLinks) || {}),
      },
    },
    hero: {
      ...FALLBACKS.hero,
      ...hero,
      imageUrl: imgUrl(hero.image, FALLBACKS.hero.imageUrl),
    },
    about: {
      ...FALLBACKS.about,
      ...about,
      imageUrl: imgUrl(about.image, FALLBACKS.about.imageUrl),
    },
    teacher: {
      ...FALLBACKS.teacher,
      ...teacher,
      photoUrl: imgUrl(teacher.photo, FALLBACKS.teacher.photoUrl),
    },
    seoDefaults: { ...FALLBACKS.seoDefaults, ...(data.seoDefaults || {}) },
    courses,
    whyChooseUs,
    learningSteps,
    statistics,
    studentResults,
    galleryCategories,
    galleryImages,
    testimonials,
    googleReviews,
    faqs,
  }
}
