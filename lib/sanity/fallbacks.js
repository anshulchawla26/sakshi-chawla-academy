// Fallback content used when Sanity CMS is empty. Once you publish content
// in the Studio, it will automatically replace these values.

export const FALLBACKS = {
  siteSettings: {
    academyName: 'Sakshi Chawla Academy',
    tagline: 'Build Strong Concepts. Achieve Outstanding Results.',
    phone: '+91 98765 43210',
    whatsapp: '919876543210',
    email: 'info@sakshichawlaacademy.com',
    address: 'Sector 15, Chandigarh, India',
    googleMapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3428.5!2d76.7794!3d30.7333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2sChandigarh!5e0!3m2!1sen!2sin!4v0000000000000',
    socialLinks: {
      instagram: '#',
      facebook: '#',
      youtube: '#',
    },
    footerTagline:
      'Premium Mathematics & Science coaching for Class 9, Class 10 and Online Vedic Maths — trusted by parents across India and abroad.',
  },
  hero: {
    badge: 'Premium Coaching for Class 9, 10 & Online Vedic Maths',
    headingLine1: 'Build Strong Concepts.',
    headingLine2: 'Achieve Outstanding Results.',
    subheading:
      'Expert Mathematics and Science coaching with personalized attention and Online Vedic Maths classes for students across India and abroad.',
    primaryCtaLabel: 'Enquire Now',
    imageUrl:
      'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=1200&q=80',
  },
  about: {
    heading: 'About the Academy',
    intro:
      'Sakshi Chawla Academy is a premium coaching institute dedicated to transforming how students learn Mathematics and Science. We combine concept-based teaching, personalized mentoring and structured practice to help every student thrive — in exams and beyond.',
    mission:
      'To empower students with a deep, lasting understanding of Mathematics and Science — building confidence, curiosity, and academic excellence.',
    vision:
      'To be recognized as one of the most trusted coaching institutes in the region and the world-class destination for Online Vedic Maths.',
    philosophy:
      'We believe every child can excel when taught with the right method, patience and clarity. Our teaching is rooted in concept-first learning, individual attention and continuous progress tracking.',
    highlights: [
      'Concept-Based Learning',
      'Personalized Attention',
      'Small Batch Sizes',
      'Weekly Progress Reports',
    ],
    imageUrl:
      'https://images.pexels.com/photos/7972378/pexels-photo-7972378.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  teacher: {
    name: 'Sakshi Chawla',
    title: 'Founder & Head Educator',
    intro:
      'A passionate educator with a decade of experience helping students master Mathematics and Science with confidence. Known for making the toughest concepts feel effortless.',
    philosophy:
      'Teaching is not about pouring information — it is about lighting a spark. Every student learns differently, and my job is to find the path that works for each one.',
    qualifications: ['M.Sc. Mathematics', 'B.Ed.', 'Certified Vedic Maths Trainer'],
    experience: '10+ years teaching Class 9, 10 & Vedic Maths',
    achievements: [
      '1500+ students mentored',
      'Consistent 90%+ board results',
      'Trained international Vedic Maths students across 8 countries',
    ],
    youtubeUrl: '',
    photoUrl:
      'https://images.unsplash.com/photo-1590650213165-c1fef80648c4?auto=format&fit=crop&w=800&q=80',
  },
  courses: [
    {
      _id: 'fb-course-1',
      title: 'Class 9',
      shortDescription:
        'Master Mathematics & Science with concept-based teaching, weekly tests and personalized mentoring.',
      icon: 'BookOpen',
      subjects: ['Mathematics', 'Science'],
      mode: 'Online + Offline',
      gradient: 'navy',
    },
    {
      _id: 'fb-course-2',
      title: 'Class 10',
      shortDescription:
        'Board-focused Mathematics & Science preparation with exam strategies, doubt sessions and progress reports.',
      icon: 'GraduationCap',
      subjects: ['Mathematics', 'Science'],
      mode: 'Online + Offline',
      gradient: 'blend',
    },
    {
      _id: 'fb-course-3',
      title: 'Online Vedic Maths',
      shortDescription:
        'Ancient Indian math techniques taught live online — for Indian and international students of all ages.',
      icon: 'Sigma',
      subjects: ['Vedic Maths'],
      mode: 'Online (Live)',
      audience: 'Indian & International Students',
      gradient: 'orange',
    },
  ],
  whyChooseUs: [
    { _id: 'w1', title: 'Experienced Faculty', description: '10+ years of teaching expertise.', icon: 'Award' },
    { _id: 'w2', title: 'Personalized Attention', description: 'Every student is mentored individually.', icon: 'UserCheck' },
    { _id: 'w3', title: 'Small Batch Size', description: 'Focused learning with limited seats.', icon: 'Users' },
    { _id: 'w4', title: 'Concept-Based Learning', description: 'We build understanding, not just memory.', icon: 'Lightbulb' },
    { _id: 'w5', title: 'Weekly Tests', description: 'Consistent assessments to track growth.', icon: 'FileCheck' },
    { _id: 'w6', title: 'Regular Doubt Sessions', description: 'Never leave a doubt unresolved.', icon: 'MessageCircle' },
    { _id: 'w7', title: 'Parent Progress Updates', description: 'Transparent communication with parents.', icon: 'MailCheck' },
    { _id: 'w8', title: 'Interactive Learning', description: 'Engaging, discussion-driven classes.', icon: 'Sparkles' },
    { _id: 'w9', title: 'Exam-Oriented Preparation', description: 'Every strategy built around exam success.', icon: 'Target' },
    { _id: 'w10', title: 'Individual Mentoring', description: 'One-on-one guidance whenever needed.', icon: 'Heart' },
  ],
  learningSteps: [
    { _id: 'l1', title: 'Enquiry', description: 'Reach out via phone, WhatsApp or the form.', icon: 'MessageCircle' },
    { _id: 'l2', title: 'Counselling', description: 'A one-on-one session to understand goals.', icon: 'Users' },
    { _id: 'l3', title: 'Admission', description: 'Simple, transparent enrolment process.', icon: 'FileCheck' },
    { _id: 'l4', title: 'Join Batch', description: 'Begin online or offline classes.', icon: 'GraduationCap' },
    { _id: 'l5', title: 'Track Progress', description: 'Regular tests and parent updates.', icon: 'TrendingUp' },
  ],
  statistics: [
    { _id: 's1', label: 'Students Trained', value: 1500, suffix: '+', icon: 'Users' },
    { _id: 's2', label: 'Years of Experience', value: 10, suffix: '+', icon: 'Award' },
    { _id: 's3', label: 'Happy Parents', value: 1200, suffix: '+', icon: 'Heart' },
    { _id: 's4', label: 'Success Rate', value: 96, suffix: '%', icon: 'TrendingUp' },
    { _id: 's5', label: 'Google Rating', value: 4.9, suffix: '/5', icon: 'Star' },
  ],
  studentResults: [
    { _id: 'r1', name: 'Aarav Sharma', class: 'Class 10', subject: 'Mathematics', marks: '99/100', story: 'Aarav went from struggling with algebra to topping his school in mathematics within a year.', photoUrl: 'https://images.unsplash.com/photo-1519648023493-d82b5f8d7b8a?auto=format&fit=crop&w=400&q=80' },
    { _id: 'r2', name: 'Ishita Verma', class: 'Class 10', subject: 'Science', marks: '97/100', story: 'Personalized doubt sessions helped Ishita build strong scientific reasoning.', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' },
    { _id: 'r3', name: 'Rohan Mehta', class: 'Class 9', subject: 'Mathematics', marks: '96/100', story: 'Concept-first teaching turned math into Rohan\u2019s favourite subject.', photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80' },
    { _id: 'r4', name: 'Ananya Iyer', class: 'Class 10', subject: 'Mathematics', marks: '98/100', story: 'Weekly tests and mentoring gave Ananya the confidence to excel in boards.', photoUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80' },
  ],
  galleryCategories: [
    { _id: 'gc1', name: 'Offline Classes', slug: { current: 'offline' } },
    { _id: 'gc2', name: 'Online Classes', slug: { current: 'online' } },
    { _id: 'gc3', name: 'Teaching Moments', slug: { current: 'teaching' } },
    { _id: 'gc4', name: 'Student Activities', slug: { current: 'activities' } },
  ],
  galleryImages: [
    { _id: 'g1', caption: 'Concept-based classroom session', imageUrl: 'https://images.pexels.com/photos/8423011/pexels-photo-8423011.jpeg?auto=compress&cs=tinysrgb&w=1200', category: { name: 'Offline Classes', slug: { current: 'offline' } } },
    { _id: 'g2', caption: 'Interactive doubt session', imageUrl: 'https://images.pexels.com/photos/8617769/pexels-photo-8617769.jpeg?auto=compress&cs=tinysrgb&w=1200', category: { name: 'Offline Classes', slug: { current: 'offline' } } },
    { _id: 'g3', caption: 'Online Vedic Maths class', imageUrl: 'https://images.pexels.com/photos/4260481/pexels-photo-4260481.jpeg?auto=compress&cs=tinysrgb&w=1200', category: { name: 'Online Classes', slug: { current: 'online' } } },
    { _id: 'g4', caption: 'Live online learning', imageUrl: 'https://images.pexels.com/photos/4314216/pexels-photo-4314216.jpeg?auto=compress&cs=tinysrgb&w=1200', category: { name: 'Online Classes', slug: { current: 'online' } } },
    { _id: 'g5', caption: 'Teacher explaining concepts', imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80', category: { name: 'Teaching Moments', slug: { current: 'teaching' } } },
    { _id: 'g6', caption: 'Students engaged in learning', imageUrl: 'https://images.pexels.com/photos/8423069/pexels-photo-8423069.jpeg?auto=compress&cs=tinysrgb&w=1200', category: { name: 'Student Activities', slug: { current: 'activities' } } },
    { _id: 'g7', caption: 'A moment of clarity', imageUrl: 'https://images.unsplash.com/photo-1580894732930-0babd100d356?auto=format&fit=crop&w=1200&q=80', category: { name: 'Teaching Moments', slug: { current: 'teaching' } } },
    { _id: 'g8', caption: 'Classroom celebration', imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80', category: { name: 'Student Activities', slug: { current: 'activities' } } },
  ],
  testimonials: [
    { _id: 't1', parentName: 'Neha Kapoor', studentName: 'Ayaan (Class 10)', review: 'The personalized attention my son received transformed his approach to studies. His board results speak for themselves!', rating: 5, photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80' },
    { _id: 't2', parentName: 'Rajesh Malhotra', studentName: 'Diya (Class 9)', review: 'Sakshi ma\u2019am makes math feel simple. My daughter now looks forward to every class!', rating: 5, photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { _id: 't3', parentName: 'Priya Sethi', studentName: 'Vihaan (Vedic Maths)', review: 'The Vedic Maths course is world-class. My son solves problems faster than ever before.', rating: 5, photoUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80' },
  ],
  googleReviews: [
    { _id: 'gr1', reviewerName: 'Anita Sharma', review: 'Best coaching institute in the area. Highly recommended!', rating: 5, date: '2 weeks ago', photoUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80' },
    { _id: 'gr2', reviewerName: 'Vikram Singh', review: 'Excellent teachers and structured learning. My son\u2019s grades improved dramatically.', rating: 5, date: '1 month ago', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
    { _id: 'gr3', reviewerName: 'Meera Iyer', review: 'Sakshi ma\u2019am is patient, knowledgeable and genuinely cares about students.', rating: 5, date: '3 months ago', photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' },
  ],
  faqs: [
    { _id: 'f1', question: 'Which classes do you teach?', answer: 'We offer coaching for Class 9 and Class 10 (Mathematics & Science), along with Online Vedic Maths for students of all ages.' },
    { _id: 'f2', question: 'Do you provide online classes?', answer: 'Yes, we offer live online classes for Class 9, Class 10, and Online Vedic Maths — accessible from anywhere in the world.' },
    { _id: 'f3', question: 'Do you provide notes?', answer: 'Yes. Comprehensive study notes, worksheets and revision materials are provided as part of every course.' },
    { _id: 'f4', question: 'How are doubts solved?', answer: 'Regular doubt-clearing sessions are conducted weekly, plus one-on-one support whenever a student needs it.' },
    { _id: 'f5', question: 'How can I enroll?', answer: 'Simply fill the enquiry form on this page, call us, or send a WhatsApp message. We will schedule a counselling session.' },
    { _id: 'f6', question: 'Do you teach international students?', answer: 'Yes! Our Online Vedic Maths programme is designed for both Indian and international students, with flexible time zones.' },
    { _id: 'f7', question: 'Is Online Vedic Maths available?', answer: 'Yes. Our flagship Online Vedic Maths course runs live batches for Indian and international students throughout the year.' },
  ],
  seoDefaults: {
    title: 'Sakshi Chawla Academy — Premium Mathematics & Science Coaching | Online Vedic Maths',
    description:
      'Premium Maths & Science coaching for Class 9 and Class 10. Online Vedic Maths for Indian and international students. Personalized mentoring, small batches, outstanding results.',
    keywords:
      'maths tuition, science tuition, class 9 coaching, class 10 coaching, online maths classes, online science classes, online vedic maths, vedic maths for international students, best coaching institute',
  },
}
