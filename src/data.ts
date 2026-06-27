import { 
  ServiceItem, 
  SaaSProductItem, 
  PortfolioProjectItem, 
  TestimonialItem, 
  ProcessStepItem, 
  StatItem 
} from "./types";

export const BRAND_NAME = "Amix";
export const BRAND_TAGLINE = "Building modern software that powers schools, restaurants & businesses worldwide.";
export const BRAND_POSITIONING = "We combine technical excellence with a genuine passion for helping businesses succeed in the digital world. Your digital transformation partner.";
export const MADE_IN = "India";
export const CONTACT_PHONE = "+91 92468 91902";
export const CONTACT_EMAIL = "amixsites@gmail.com";
export const CONTACT_WHATSAPP = "https://wa.me/919246891902";

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "school-erp",
    title: "School ERP Software",
    iconName: "GraduationCap",
    description: "Complete school management system with student records, attendance tracking, exam management, fee collection, and parent portal.",
    features: [
      "Student Management",
      "Attendance Tracking",
      "Exams & Report Cards",
      "Fee Management",
      "Parent Portal",
      "Staff Management"
    ],
    gradient: "from-blue-500 to-indigo-600",
    accentColor: "#3B82F6"
  },
  {
    id: "restaurant-pos",
    title: "Restaurant POS",
    iconName: "UtensilsCrossed",
    description: "Streamline operations with our all-in-one POS system featuring order management, kitchen display, and real-time analytics.",
    features: [
      "Order Management",
      "Kitchen Display",
      "Billing & Invoicing",
      "Inventory Tracking",
      "Sales Analytics",
      "Table Management"
    ],
    gradient: "from-amber-500 to-orange-600",
    accentColor: "#F59E0B"
  },
  {
    id: "banquet-management",
    title: "Banquet Management",
    iconName: "CalendarDays",
    description: "End-to-end venue management for hotels and event spaces with booking, scheduling, and payment tracking.",
    features: [
      "Venue Booking",
      "Event Scheduling",
      "Payment Tracking",
      "Customer CRM",
      "Reports & Analytics",
      "Calendar Integration"
    ],
    gradient: "from-purple-500 to-violet-600",
    accentColor: "#8B5CF6"
  },
  {
    id: "ecommerce-solutions",
    title: "E-Commerce Solutions",
    iconName: "ShoppingCart",
    description: "Custom online stores built for conversions with product management, secure payments, and marketing automation.",
    features: [
      "Online Storefront",
      "Product Management",
      "Secure Payments",
      "Inventory Sync",
      "Marketing Tools",
      "Order Fulfillment"
    ],
    gradient: "from-emerald-500 to-teal-600",
    accentColor: "#10B981"
  },
  {
    id: "business-websites",
    title: "Business Websites",
    iconName: "Globe",
    description: "High-performance corporate websites designed for lead generation, brand credibility, and SEO dominance.",
    features: [
      "Corporate Sites",
      "Lead Generation",
      "SEO Optimization",
      "Performance First",
      "Responsive Design",
      "CMS Integration"
    ],
    gradient: "from-indigo-500 to-blue-600",
    accentColor: "#6366F1"
  }
];

export const SAAS_PRODUCTS_DATA: SaaSProductItem[] = [
  {
    id: "prod-school-erp",
    title: "School ERP",
    tagline: "Complete School Management System",
    description: "An all-in-one platform for educational institutions to manage students, staff, fees, exams, and communications seamlessly.",
    modules: [
      "Student Portal",
      "Exams & Results",
      "Fee Collection",
      "Notifications",
      "Analytics",
      "Admin Panel"
    ],
    browserUrl: "school-erp.amix.app",
    imageFallback: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "prod-restaurant-pos",
    title: "Restaurant POS",
    tagline: "Smart Restaurant Operations",
    description: "Streamline your restaurant with digital ordering, kitchen management, inventory tracking, and real-time sales analytics.",
    modules: [
      "Order Dashboard",
      "Quick Billing",
      "Sales Reports",
      "Staff Management",
      "Payments",
      "Menu Config"
    ],
    browserUrl: "restaurant-pos.amix.app",
    imageFallback: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "prod-banquet-manager",
    title: "Banquet Manager",
    tagline: "Event & Venue Management",
    description: "End-to-end solution for banquet halls and event venues. Manage bookings, schedules, payments, and customer relationships.",
    modules: [
      "Booking Calendar",
      "Payment Tracking",
      "Guest Management",
      "Invoices",
      "Reports",
      "Contracts"
    ],
    browserUrl: "banquet-manager.amix.app",
    imageFallback: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop"
  }
];

export const PORTFOLIO_DATA: PortfolioProjectItem[] = [
  {
    id: "proj-cutiebox",
    title: "CutieBox",
    category: "E-Commerce / Gift Box",
    description: "A custom magazine and gift hamper e-commerce store with interactive product previews, curated collections, and a seamless checkout experience.",
    url: "https://cutiebox.vercel.app",
    tags: ["E-Commerce", "React", "Next.js", "Stripe"],
    stats: "45+ products, 120+ customers",
    imageFallback: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "proj-maisonrose",
    title: "Maison Rose",
    category: "Fashion E-Commerce",
    description: "Luxury fashion e-commerce platform featuring premium shopping experience, lookbook integration, and editorial-style product showcases.",
    url: "https://maison-rose-six.vercel.app",
    tags: ["Fashion", "E-Commerce", "Next.js", "Tailwind"],
    stats: "38+ products, 95+ customers",
    imageFallback: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "proj-shrikha",
    title: "Shrikha Organics",
    category: "Organic Products",
    description: "Organic products store with brand-focused storytelling, sustainability messaging, and a nature-inspired shopping journey.",
    url: "https://shrikha-organics.netlify.app",
    tags: ["Organic", "Brand", "React", "Netlify"],
    stats: "30+ products, 80+ customers",
    imageFallback: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop"
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Rajesh Sharma",
    role: "Principal",
    company: "Sunrise Public School",
    rating: 5,
    content: "The School ERP system transformed how we manage our institution. Attendance, exams, and fee collection are now seamless. Parents love the portal, and our staff productivity has doubled."
  },
  {
    id: "test-2",
    name: "Priya Patel",
    role: "Owner",
    company: "Spice Garden Restaurant",
    rating: 5,
    content: "Our restaurant POS has streamlined everything from order taking to kitchen display. The analytics dashboard helps us understand peak hours and optimize staffing. Highly recommended!"
  },
  {
    id: "test-3",
    name: "Amit Kumar",
    role: "Manager",
    company: "Royal Banquet Hall",
    rating: 5,
    content: "The banquet management system eliminated double bookings and manual errors. Our customers can now book online, and payment tracking is a breeze. Revenue has increased by 30%."
  },
  {
    id: "test-4",
    name: "Sneha Gupta",
    role: "Founder",
    company: "CutieBox",
    rating: 5,
    content: "Amix built our e-commerce store from scratch. The design is beautiful, checkout is smooth, and sales have grown consistently. They truly understand online retail."
  },
  {
    id: "test-5",
    name: "Vikram Mehta",
    role: "Director",
    company: "Shrikha Organics",
    rating: 5,
    content: "Our organic products store perfectly captures our brand essence. The SEO-optimized site ranks on page one for our key terms. Organic traffic has tripled since launch."
  }
];

export const STATS_DATA: StatItem[] = [
  {
    value: "25+",
    label: "Projects Completed",
    description: "Successfully delivered across industries",
    iconName: "Briefcase"
  },
  {
    value: "18+",
    label: "Clients Served",
    description: "Trusted by businesses worldwide",
    iconName: "Users"
  },
  {
    value: "5+",
    label: "Software Solutions",
    description: "Ready-to-deploy SaaS products",
    iconName: "Layers"
  },
  {
    value: "40+",
    label: "Businesses Supported",
    description: "Empowered with digital solutions",
    iconName: "Building2"
  }
];

export const PROCESS_STEPS_DATA: ProcessStepItem[] = [
  {
    step: 1,
    title: "Discovery",
    iconName: "Search",
    description: "We dive deep into your business, understand your goals, analyze competitors, and identify opportunities for digital transformation."
  },
  {
    step: 2,
    title: "Planning",
    iconName: "Lightbulb",
    description: "We create a detailed roadmap with milestones, tech stack recommendations, and a clear timeline for your project."
  },
  {
    step: 3,
    title: "Design",
    iconName: "Palette",
    description: "Our designers craft stunning, user-centric interfaces with interactive prototypes that bring your vision to life."
  },
  {
    step: 4,
    title: "Development",
    iconName: "Code2",
    description: "We build with clean, scalable code using modern frameworks. Regular demos keep you in the loop at every stage."
  },
  {
    step: 5,
    title: "Testing",
    iconName: "TestTube",
    description: "Rigorous QA ensures your product is bug-free, performant, and accessible across all devices and browsers."
  },
  {
    step: 6,
    title: "Deployment",
    iconName: "Rocket",
    description: "We launch your product with CI/CD pipelines, monitoring, and analytics setup for a smooth go-live experience."
  },
  {
    step: 7,
    title: "Support",
    iconName: "HeadphonesIcon",
    description: "Post-launch, we provide ongoing maintenance, updates, and support to ensure your software evolves with your business."
  }
];

export const TECH_STACK_DATA = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "Supabase", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Node.js", category: "Runtime" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Vercel", category: "Hosting" },
  { name: "Netlify", category: "Hosting" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Prisma", category: "ORM" },
  { name: "Stripe", category: "Payments" }
];
