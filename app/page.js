import { getHomeData } from '@/lib/sanity/getData'
import { EnquiryProvider } from '@/components/shared/EnquiryProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingButtons from '@/components/layout/FloatingButtons'
import MobileBottomNav from '@/components/layout/MobileBottomNav'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import MeetTeacher from '@/components/sections/MeetTeacher'
import Courses from '@/components/sections/Courses'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import LearningProcess from '@/components/sections/LearningProcess'
import Statistics from '@/components/sections/Statistics'
import StudentResults from '@/components/sections/StudentResults'
import Gallery from '@/components/sections/Gallery'
import Testimonials from '@/components/sections/Testimonials'
import GoogleReviews from '@/components/sections/GoogleReviews'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import { Toaster } from 'sonner'

export const revalidate = 30

export default async function HomePage() {
  const data = await getHomeData()

  return (
    <EnquiryProvider>
      <Toaster position="top-right" richColors />
      <Navbar site={data.siteSettings} />
      <main className="pb-16 md:pb-0">
        <Hero data={data.hero} site={data.siteSettings} />
        <About data={data.about} />
        <MeetTeacher data={data.teacher} />
        <Courses courses={data.courses} />
        <WhyChooseUs items={data.whyChooseUs} />
        <LearningProcess steps={data.learningSteps} />
        <Statistics stats={data.statistics} />
        <StudentResults results={data.studentResults} />
        <Gallery categories={data.galleryCategories} images={data.galleryImages} />
        <Testimonials items={data.testimonials} />
        <GoogleReviews items={data.googleReviews} />
        <FAQ items={data.faqs} />
        <Contact site={data.siteSettings} />
      </main>
      <Footer site={data.siteSettings} />
      <FloatingButtons site={data.siteSettings} />
      <MobileBottomNav site={data.siteSettings} />
    </EnquiryProvider>
  )
}
