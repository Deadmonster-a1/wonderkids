import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...\n');

  // --- ADMIN ---
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.admin.upsert({
    where: { email: 'admin@wonderkids.com' },
    update: {},
    create: {
      email: 'admin@wonderkids.com',
      passwordHash,
      name: 'Admin',
      role: 'SUPERADMIN',
    },
  });
  console.log('✅ Admin seeded');

  // --- TEACHERS ---
  const teachers = [
    {
      name: 'Ms. Amanda Torres',
      title: 'Head of Toddler Room',
      specialization: 'Early Childhood Development',
      experience: '9 Years',
      bio: 'Amanda brings warmth and patience to our youngest learners, creating a nurturing environment where toddlers feel safe to explore.',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwzs96-ik8wV4PeWUbY1IG3fwi253uCCtLBQU4_AG5DOF2z9MsPoX-Vq4YPf6cXAOto7hZD_-6SIhUfgR_2lIW5P7Rw6csGPNWrDCHI3iKnWIIj6W1DrrcjRDjCPE22W1mIbgzSoZ2rR6MoAaghwvNUHScsD73iLgfnFNmEPvf6a8lAE0i3UAVMQqtHyw2E3rpR9mOumjAc_IyZFlPpR2Byqkj1rGLHXwHBaHNi8axGwv01nrzjXHwcji9AYo2zRlrH3CGXyGO6xY',
      iconName: 'Heart',
      colorTheme: 'primary',
      displayOrder: 0,
    },
    {
      name: 'Mr. Daniel Park',
      title: 'Preschool Lead Teacher',
      specialization: 'Creative Arts & Literacy',
      experience: '7 Years',
      bio: 'Daniel uses storytelling and creative projects to spark imagination and build early literacy skills in curious preschoolers.',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvBV0wBdr5paXmOsBIrPgDapggKbC_EHIXZK-SYUQ_KuK_aKPQp5X0I2wm1cCLqgsEj1EnXfsNCKh69zVyFPAdm2-mXAiDTq3VbvgPQiMLp0-cdxGQxY03MBcB32GabqkbAeXalHJCSN577DSA6kmTHN-fbkhMrFiS-BDZqkYcgMAkkn8wg6rUgchw8nPw_8qeIL3nlcOZh1Y0BeKhF3d1hcQykqQ_y6bT3kVXkF-itP8feMeGHe3dU3C4Lk38A6xFuzWoR0AobVk',
      iconName: 'BookOpen',
      colorTheme: 'secondary',
      displayOrder: 1,
    },
    {
      name: 'Ms. Rachel Kim',
      title: 'Kindergarten Prep Teacher',
      specialization: 'STEM & Problem Solving',
      experience: '11 Years',
      bio: 'Rachel prepares children for school with a focus on math fundamentals and logical thinking, delivered through playful, hands-on projects.',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwzs96-ik8wV4PeWUbY1IG3fwi253uCCtLBQU4_AG5DOF2z9MsPoX-Vq4YPf6cXAOto7hZD_-6SIhUfgR_2lIW5P7Rw6csGPNWrDCHI3iKnWIIj6W1DrrcjRDjCPE22W1mIbgzSoZ2rR6MoAaghwvNUHScsD73iLgfnFNmEPvf6a8lAE0i3UAVMQqtHyw2E3rpR9mOumjAc_IyZFlPpR2Byqkj1rGLHXwHBaHNi8axGwv01nrzjXHwcji9AYo2zRlrH3CGXyGO6xY',
      iconName: 'GraduationCap',
      colorTheme: 'tertiary',
      displayOrder: 2,
    },
    {
      name: 'Ms. Sofia Reyes',
      title: 'Music & Arts Specialist',
      specialization: 'Musical Development',
      experience: '6 Years',
      bio: 'Sofia integrates music, movement, and visual arts to help children express themselves and develop fine motor coordination.',
      avatarUrl: null,
      iconName: 'Music',
      colorTheme: 'primary',
      displayOrder: 3,
    },
  ];

  for (const t of teachers) {
    await prisma.teacher.create({ data: t });
  }
  console.log(`✅ ${teachers.length} teachers seeded`);

  // --- PROGRAMS ---
  const programs = [
    {
      title: 'Pre-Primary',
      gradeRange: 'Nursery – UKG',
      iconName: 'Leaf',
      description: 'A play-based, sensory-rich foundation that sparks curiosity and a love for learning. We develop early literacy, numeracy, motor skills, and social-emotional intelligence — one story, song, and discovery at a time.',
      themeConfig: { base: 'primary', bgFixed: 'bg-primary-fixed', text: 'text-primary', border: 'hover:border-primary/30' },
      displayOrder: 0,
    },
    {
      title: 'Primary School',
      gradeRange: 'Grades I – V',
      iconName: 'BookOpen',
      description: 'Strong academic foundations in Mathematics, Science, English, Hindi, and EVS — delivered through interactive lessons, project-based learning, and collaborative activities that build confidence and independent thinking.',
      themeConfig: { base: 'secondary', bgFixed: 'bg-secondary-fixed', text: 'text-secondary', border: 'hover:border-secondary/30' },
      displayOrder: 1,
    },
    {
      title: 'Middle School',
      gradeRange: 'Grades VI – VIII',
      iconName: 'FlaskConical',
      description: 'Expanding knowledge horizons with Science, Social Studies, advanced Mathematics, and language arts. Students engage in lab practicals, research projects, and interdisciplinary exploration.',
      themeConfig: { base: 'tertiary', bgFixed: 'bg-tertiary-fixed', text: 'text-tertiary', border: 'hover:border-tertiary/30' },
      displayOrder: 2,
    },
    {
      title: 'Secondary (CBSE)',
      gradeRange: 'Grades IX – X',
      iconName: 'GraduationCap',
      description: 'CBSE Board preparation with focused coaching in Science, Mathematics, Social Science, and Languages. Comprehensive exam prep, career counseling, and competitive exam foundations.',
      themeConfig: { base: 'primary', bgFixed: 'bg-primary-fixed', text: 'text-primary', border: 'hover:border-primary/30' },
      displayOrder: 3,
    },
  ];

  for (const p of programs) {
    await prisma.program.create({ data: p });
  }
  console.log(`✅ ${programs.length} programs seeded`);

  // --- FEE TIERS ---
  const feeTiers = [
    {
      tierName: 'Pre-Primary',
      grades: 'Nursery, LKG, UKG',
      monthlyFee: 3500,
      annualFee: 42000,
      isPopular: false,
      borderColor: 'border-amber-500',
      bgColor: 'bg-amber-500',
      features: ['Montessori-based learning materials', 'Daily healthy mid-day snack', 'Art & Craft supplies included', 'Quarterly medical checkups', 'Parent app access'],
      displayOrder: 0,
    },
    {
      tierName: 'Primary',
      grades: 'Grades I to V',
      monthlyFee: 4200,
      annualFee: 50400,
      isPopular: true,
      borderColor: 'border-brand-indigo',
      bgColor: 'bg-brand-indigo',
      features: ['Comprehensive CBSE curriculum', 'Computer & Science Lab access', 'Physical Education & Sports', 'Library access', 'Parent app access & tracking'],
      displayOrder: 1,
    },
    {
      tierName: 'Secondary',
      grades: 'Grades VI to X',
      monthlyFee: 5500,
      annualFee: 66000,
      isPopular: false,
      borderColor: 'border-brand-violet',
      bgColor: 'bg-brand-violet',
      features: ['Advanced CBSE Board prep', 'Dedicated Science & Computer Labs', 'Career counseling & mentorship', 'Competitive exam coaching', 'Full sports & arts program'],
      displayOrder: 2,
    },
  ];

  for (const f of feeTiers) {
    await prisma.feeTier.create({ data: f });
  }
  console.log(`✅ ${feeTiers.length} fee tiers seeded`);

  // --- TESTIMONIALS ---
  const testimonials = [
    {
      parentName: 'Priya Sharma',
      roleDesc: 'Parent of Grade 4 Student',
      content: "WonderKids has transformed my daughter's confidence. The teachers are incredibly supportive, and the balance between academics and extracurriculars is perfect.",
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
      rating: 5,
      isApproved: true,
      displayOrder: 0,
    },
    {
      parentName: 'Rahul Verma',
      roleDesc: 'Parent of UKG Student',
      content: 'The early years program is phenomenal. My son looks forward to going to school every single day. The focus on holistic development is exactly what we wanted.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
      rating: 5,
      isApproved: true,
      displayOrder: 1,
    },
    {
      parentName: 'Anjali Desai',
      roleDesc: 'Parent of Grade 8 Student',
      content: "As my child enters the middle school years, I appreciate how the school is preparing them for board exams while ensuring they don't lose their creative spark.",
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
      rating: 5,
      isApproved: true,
      displayOrder: 2,
    },
    {
      parentName: 'Vikram Singh',
      roleDesc: 'Parent of Nursery Student',
      content: "A safe, nurturing, and incredibly joyful environment. The staff's dedication to each child's well-being is highly commendable. Best decision for our child.",
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
      rating: 5,
      isApproved: true,
      displayOrder: 3,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log(`✅ ${testimonials.length} testimonials seeded`);

  // --- GALLERY ---
  const galleryItems = [
    { imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop', altText: 'Classroom', category: 'Campus', displayOrder: 0 },
    { imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop', altText: 'Teacher', category: 'Campus', displayOrder: 1 },
    { imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop', altText: 'Activity', category: 'Activities', displayOrder: 2 },
    { imageUrl: 'https://images.unsplash.com/photo-1587392977854-57a0a2f42b8f?w=600&auto=format&fit=crop', altText: 'Art', category: 'Activities', displayOrder: 3 },
    { imageUrl: 'https://images.unsplash.com/photo-1560785218-b8e78a5e66e2?w=600&auto=format&fit=crop', altText: 'Outdoor play', category: 'Sports', displayOrder: 4 },
    { imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&auto=format&fit=crop', altText: 'School event', category: 'Events', displayOrder: 5 },
    { imageUrl: 'https://images.unsplash.com/photo-1571210862729-78a52d3779a2?w=600&auto=format&fit=crop', altText: 'Painting', category: 'Activities', displayOrder: 6 },
    { imageUrl: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&auto=format&fit=crop', altText: 'Physical education', category: 'Sports', displayOrder: 7 },
    { imageUrl: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop', altText: 'Science lab', category: 'Campus', displayOrder: 8 },
    { imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop', altText: 'Sports day', category: 'Events', displayOrder: 9 },
  ];

  for (const g of galleryItems) {
    await prisma.galleryItem.create({ data: g });
  }
  console.log(`✅ ${galleryItems.length} gallery items seeded`);

  // --- FAQs ---
  const faqs = [
    {
      question: 'What is the admission process for the upcoming academic year?',
      answer: "Our admission process is straightforward. First, fill out the online inquiry form. Our admissions team will contact you to schedule a campus tour and interaction session. Following this, you'll receive an admission offer and can proceed with document submission and fee payment.",
      displayOrder: 0,
    },
    {
      question: 'Is WonderKids affiliated with a specific educational board?',
      answer: 'Yes, WonderKids is proudly affiliated with the Central Board of Secondary Education (CBSE). Our curriculum from Nursery to Grade 10 strictly adheres to the NEP 2020 guidelines, ensuring a holistic and modern educational approach.',
      displayOrder: 1,
    },
    {
      question: 'What is the student-to-teacher ratio in classrooms?',
      answer: 'We maintain a strict student-to-teacher ratio of 15:1 in Pre-Primary sections and 25:1 in Primary and Secondary grades. This ensures personalized attention and allows our educators to identify and nurture the unique strengths of every child.',
      displayOrder: 2,
    },
    {
      question: 'Does the school provide transport facilities?',
      answer: 'Yes, we have a fleet of GPS-enabled, air-conditioned school buses that cover a 15km radius around the campus. Each bus is accompanied by a trained driver and a female attendant to ensure the utmost safety of our students.',
      displayOrder: 3,
    },
    {
      question: 'How does the school handle safety and security?',
      answer: 'Student safety is our top priority. Our campus is monitored by 24/7 CCTV surveillance, and we employ a fully verified security staff. Access to the campus is strictly regulated, and all visitors must be pre-authorized. We also conduct regular fire and safety drills.',
      displayOrder: 4,
    },
    {
      question: 'What extra-curricular activities are offered?',
      answer: 'We offer a wide range of activities including swimming, basketball, football, classical and contemporary dance, vocal and instrumental music, robotics, coding, and various arts and crafts clubs. These are integrated into the regular school schedule.',
      displayOrder: 5,
    },
  ];

  for (const f of faqs) {
    await prisma.faq.create({ data: f });
  }
  console.log(`✅ ${faqs.length} FAQs seeded`);

  // --- SITE SETTINGS ---
  const settings = [
    { key: 'school_name', value: 'WonderKids', group: 'general' },
    { key: 'tagline', value: 'Nursery · Primary · Secondary', group: 'general' },
    { key: 'address', value: '123 Magic Lane, Kidsville, CA 90210', group: 'contact' },
    { key: 'phone', value: '(555) 123-4567', group: 'contact' },
    { key: 'email', value: 'hello@wonderkids.com', group: 'contact' },
    { key: 'hero_title', value: 'Where Every Child\'s Potential Blooms', group: 'homepage' },
    { key: 'hero_subtitle', value: 'Nurturing young minds from Nursery to Grade 10 with a world-class CBSE curriculum, passionate educators, and a campus designed for discovery.', group: 'homepage' },
    { key: 'stats_students', value: '1200', group: 'stats' },
    { key: 'stats_teachers', value: '65', group: 'stats' },
    { key: 'stats_years', value: '15', group: 'stats' },
    { key: 'stats_awards', value: '24', group: 'stats' },
    { key: 'google_maps_url', value: 'https://maps.google.com', group: 'contact' },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log(`✅ ${settings.length} site settings seeded`);

  console.log('\n🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
