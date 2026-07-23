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
import ClientToaster from '@/components/shared/ClientToaster'

export const revalidate = 30

export default async function HomePage() {
  const data = await getHomeData()

  return (
    <EnquiryProvider>
      <ClientToaster />
      <Navbar site={data.siteSettings} />
      <main id="main" className="pb-16 md:pb-0">
        <Hero data={data.hero} site={data.siteSettings} />
        <About data={data.about} />
        <MeetTeacher data={data.teacher} />
        {data.courses?.length > 0 && <Courses courses={data.courses} />}
        {data.whyChooseUs?.length > 0 && <WhyChooseUs items={data.whyChooseUs} />}
        {data.learningSteps?.length > 0 && <LearningProcess steps={data.learningSteps} />}
        {data.statistics?.length > 0 && <Statistics stats={data.statistics} />}
        {data.studentResults?.length > 0 && <StudentResults results={data.studentResults} />}
        {data.galleryImages?.length > 0 && (
          <Gallery categories={data.galleryCategories} images={data.galleryImages} />
        )}
        {data.testimonials?.length > 0 && <Testimonials items={data.testimonials} />}
        {data.googleReviews?.length > 0 && <GoogleReviews items={data.googleReviews} />}
        {data.faqs?.length > 0 && <FAQ items={data.faqs} />}
        <Contact site={data.siteSettings} />
      </main>
      <Footer site={data.siteSettings} />
      <FloatingButtons site={data.siteSettings} />
      <MobileBottomNav site={data.siteSettings} />
    </EnquiryProvider>
  )
}
