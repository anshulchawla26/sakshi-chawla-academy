import { sanityClient } from './client'
import { homePageQuery } from './queries'
import { FALLBACKS } from './fallbacks'
import { imgUrl } from './image'

// Merge CMS data with fallbacks so the site always looks complete.
function pick(cms, fb) {
  if (cms === undefined || cms === null) return fb
  if (Array.isArray(cms) && cms.length === 0) return fb
  return cms
}

// A CMS record is "usable" only when the fields we render actually have content.
// This prevents empty cards / rows from appearing on the live site when a
// draft record is created without content yet.
function hasText(v) {
  return typeof v === 'string' && v.trim().length > 0
}

export async function getHomeData() {
  let data = {}
  try {
    data = (await sanityClient.fetch(homePageQuery, {}, { next: { revalidate: 30 } })) || {}
  } catch (e) {
    console.error('[Sanity] fetch failed, using fallbacks:', e?.message)
    data = {}
  }

  const hero = pick(data.hero, {})
  const about = pick(data.about, {})
  const teacher = pick(data.teacher, {})

  const courses = (pick(data.courses, FALLBACKS.courses) || []).filter((c) => hasText(c?.title))
  const whyChooseUs = (pick(data.whyChooseUs, FALLBACKS.whyChooseUs) || []).filter((w) => hasText(w?.title))
  const learningSteps = (pick(data.learningSteps, FALLBACKS.learningSteps) || []).filter((s) => hasText(s?.title))
  const statistics = (pick(data.statistics, FALLBACKS.statistics) || []).filter((s) => hasText(s?.label) && s?.value != null)
  const studentResults = (pick(data.studentResults, FALLBACKS.studentResults) || [])
    .filter((r) => hasText(r?.name) && hasText(r?.marks))
    .map((r) => ({
      ...r,
      photoUrl: r.photoUrl || imgUrl(r.photo, 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80'),
    }))
  const galleryCategories = (pick(data.galleryCategories, FALLBACKS.galleryCategories) || []).filter((c) => hasText(c?.name))
  const galleryImages = (pick(data.galleryImages, FALLBACKS.galleryImages) || [])
    .map((g) => ({
      ...g,
      imageUrl: g.imageUrl || imgUrl(g.image, ''),
      category: g.category || { name: 'General', slug: { current: 'general' } },
    }))
    .filter((g) => hasText(g.imageUrl))
  const testimonials = (pick(data.testimonials, FALLBACKS.testimonials) || [])
    .filter((t) => hasText(t?.review) && hasText(t?.parentName))
    .map((t) => ({
      ...t,
      photoUrl: t.photoUrl || imgUrl(t.photo, 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'),
    }))
  const googleReviews = (pick(data.googleReviews, FALLBACKS.googleReviews) || [])
    .filter((g) => hasText(g?.review) && hasText(g?.reviewerName))
    .map((g) => ({
      ...g,
      photoUrl: g.photoUrl || imgUrl(g.photo, 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80'),
    }))
  const faqs = (pick(data.faqs, FALLBACKS.faqs) || []).filter((f) => hasText(f?.question) && hasText(f?.answer))

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
