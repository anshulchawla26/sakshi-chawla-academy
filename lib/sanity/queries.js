import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]`
export const heroQuery = groq`*[_type == "hero"][0]`
export const aboutQuery = groq`*[_type == "about"][0]`
export const teacherQuery = groq`*[_type == "teacher"][0]`
export const seoDefaultsQuery = groq`*[_type == "seoDefaults"][0]`
export const coursesQuery = groq`*[_type == "course"] | order(order asc)`
export const whyChooseUsQuery = groq`*[_type == "whyChooseUsItem"] | order(order asc)`
export const learningStepsQuery = groq`*[_type == "learningStep"] | order(order asc)`
export const statisticsQuery = groq`*[_type == "statistic"] | order(order asc)`
export const studentResultsQuery = groq`*[_type == "studentResult"] | order(order asc)`
export const galleryCategoriesQuery = groq`*[_type == "galleryCategory"] | order(order asc)`
export const galleryImagesQuery = groq`*[_type == "galleryImage"] | order(order asc){ ..., "category": category->{name, slug} }`
export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc)`
export const googleReviewsQuery = groq`*[_type == "googleReview"] | order(order asc)`
export const faqsQuery = groq`*[_type == "faq"] | order(order asc)`

export const homePageQuery = groq`{
  "siteSettings": *[_type == "siteSettings"][0],
  "hero": *[_type == "hero"][0],
  "about": *[_type == "about"][0],
  "teacher": *[_type == "teacher"][0],
  "seoDefaults": *[_type == "seoDefaults"][0],
  "courses": *[_type == "course"] | order(order asc),
  "whyChooseUs": *[_type == "whyChooseUsItem"] | order(order asc),
  "learningSteps": *[_type == "learningStep"] | order(order asc),
  "statistics": *[_type == "statistic"] | order(order asc),
  "studentResults": *[_type == "studentResult"] | order(order asc),
  "galleryCategories": *[_type == "galleryCategory"] | order(order asc),
  "galleryImages": *[_type == "galleryImage"] | order(order asc){ ..., "category": category->{name, slug} },
  "testimonials": *[_type == "testimonial"] | order(order asc),
  "googleReviews": *[_type == "googleReview"] | order(order asc),
  "faqs": *[_type == "faq"] | order(order asc)
}`
