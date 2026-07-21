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
    courses: pick(data.courses, FALLBACKS.courses),
    whyChooseUs: pick(data.whyChooseUs, FALLBACKS.whyChooseUs),
    learningSteps: pick(data.learningSteps, FALLBACKS.learningSteps),
    statistics: pick(data.statistics, FALLBACKS.statistics),
    studentResults: (pick(data.studentResults, FALLBACKS.studentResults) || []).map((r) => ({
      ...r,
      photoUrl: r.photoUrl || imgUrl(r.photo, 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80'),
    })),
    galleryCategories: pick(data.galleryCategories, FALLBACKS.galleryCategories),
    galleryImages: (pick(data.galleryImages, FALLBACKS.galleryImages) || []).map((g) => ({
      ...g,
      imageUrl: g.imageUrl || imgUrl(g.image, 'https://images.pexels.com/photos/8423011/pexels-photo-8423011.jpeg'),
      category: g.category || { name: 'General', slug: { current: 'general' } },
    })),
    testimonials: (pick(data.testimonials, FALLBACKS.testimonials) || []).map((t) => ({
      ...t,
      photoUrl: t.photoUrl || imgUrl(t.photo, 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'),
    })),
    googleReviews: (pick(data.googleReviews, FALLBACKS.googleReviews) || []).map((g) => ({
      ...g,
      photoUrl: g.photoUrl || imgUrl(g.photo, 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80'),
    })),
    faqs: pick(data.faqs, FALLBACKS.faqs),
  }
}
