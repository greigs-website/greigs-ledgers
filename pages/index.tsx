// pages/index.tsx
import Head from 'next/head';
import Typing from 'react-typing-effect';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-modal';
import { Linkedin, Github, Twitter, Mail, MapPin } from 'lucide-react';
import { BookOpen, Wallet, FileText, Monitor, BarChart3, Settings } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import "yet-another-react-lightbox/styles.css";
import { Calculator, PieChart, FileSpreadsheet, TrendingUp, Briefcase, } from "lucide-react";

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'resume', label: 'Resume' },
  { id: 'case-studies', label: 'case-studies' },
  { id: 'testimonials', label: 'Client Speak' },
  { id: 'contact', label: 'Contact' },
];

function SectionHeader({ title, faint }: { title: string; faint: string }) {
  return (
    <div className="relative mb-12 text-center">
      {/* faint background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-7xl sm:text-9xl font-bold text-gray-200 opacity-40 uppercase tracking-wide">
          {faint}
        </h2>
      </div>

      {/* visible header */}
      <h2 className="relative z-10 text-4xl font-bold text-black">
        {title}
      </h2>
      <div className="relative z-10 w-16 h-1 bg-teal-500 mx-auto mt-3" />
    </div>
  );
}

export default function IndexPage(): JSX.Element {
  const router = useRouter();
  const basePath = router.basePath || '';
  const imgPath = (path: string) => `${basePath}${path}`;

  const [activeSection, setActiveSection] = useState<string>('home');
  const [filter, setFilter] = useState<'All' | 'Accounting Efficiency' | 'Financial Reporting' | 'Bookkeeping'>('All');
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  // Section highlight observer
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('header[id], section[id]')
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Magnific Popup setup (kept for compatibility)
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).$) {
      const $ = (window as any).$;
      $('.popup-ajax').magnificPopup({
        type: 'ajax',
        alignTop: true,
        overflowY: 'scroll',
        closeBtnInside: true,
        removalDelay: 300,
        mainClass: 'mfp-fade',
      });
    }
  }, []);


  // filteredProjects here uses the projects inside your /public images: you can change this list or hook to data source
  const projects = [
  {
    id: 1,
    img: "/images/portfolio/project-1.jpg",
    title: "Retail Payroll Automation",
    category: "Accounting Efficiency",
    description:
      "Automated weekly payroll calculations using Excel macros and data validation. Reduced processing time by over 60% and eliminated manual data entry errors.",
    images: [
      "/images/portfolio/project-1.jpg",
      "/images/portfolio/project-1-1.jpg",
      "/images/portfolio/project-1-2.jpg",
    ],
  },
  {
    id: 2,
    img: "/images/portfolio/project-2.jpg",
    title: "Management Accounts for SME",
    category: "Financial Reporting",
    description:
      "Developed monthly management accounts for a growing retail client. Improved cash flow visibility and supported key investment decisions.",
    images: [
      "/images/portfolio/project-2.jpg",
      "/images/portfolio/project-2-1.jpg",
      "/images/portfolio/project-2-2.jpg",
    ],
  },
  {
    id: 3,
    img: "/images/portfolio/project-3.jpg",
    title: "Bookkeeping System Overhaul",
    category: "Bookkeeping",
    description:
      "Migrated a small business from manual ledgers to a cloud-based bookkeeping system. Improved accuracy and accessibility while reducing month-end reconciliation time.",
    images: [
      "/images/portfolio/project-3.jpg",
      "/images/portfolio/project-3-1.jpg",
      "/images/portfolio/project-3-2.jpg",
    ],
  },
  {
    id: 4,
    img: "/images/portfolio/project-4.jpg",
    title: "Financial Dashboard System",
    category: "Bookkeeping",
    description:
      "Designed and implemented a Power BI dashboard for financial visibility and performance tracking.",
    images: [
      "/images/portfolio/project-4.jpg",
      "/images/portfolio/project-4-1.jpg",
      "/images/portfolio/project-4-2.jpg",
    ],
  },
  {
    id: 5,
    img: "/images/portfolio/project-5.jpg",
    title: "Financial Dashboard System",
    category: "Bookkeeping",
    description:
      "Designed and implemented a Power BI dashboard for financial visibility and performance tracking.",
    images: [
      "/images/portfolio/project-5.jpg",
      "/images/portfolio/project-5-1.jpg",
      "/images/portfolio/project-5-2.jpg",
    ],
  },
  {
    id: 6,
    img: "/images/portfolio/project-6.jpg",
    title: "Financial Dashboard System",
    category: "Bookkeeping",
    description:
      "Designed and implemented a Power BI dashboard for financial visibility and performance tracking.",
    images: [
      "/images/portfolio/project-6.jpg",
      "/images/portfolio/project-6-1.jpg",
      "/images/portfolio/project-6-2.jpg",
    ],
  },
  // Add more projects here...
];

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((p) => p.category === filter);

  // ✅ Autoplay modal images (must come AFTER filteredProjects)
  useEffect(() => {
    if (!activeProject) return;

    const project = filteredProjects.find((p) => p.id === activeProject);
    if (!project || project.images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % project.images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeProject, filteredProjects]);

  // ...then your return JSX below

  return (
    <>
      <Head>
        <title>Greig's Ledgers</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet"/>

        <meta name="description" content="Professional bookkeeping, payroll, and IT support services by Greig Colliar in Perth, Scotland. Helping small businesses stay financially organized and efficient."/>
        <meta name="keywords" content="bookkeeping Perth, payroll specialist, accountant Scotland, management accounts, Xero advisor, financial reporting, Greig Colliar"/>
        <meta name="author" content="Greig Colliar" />

        {/* Open Graph (Social Sharing) */}
        <meta property="og:title" content="Greig Colliar | Bookkeeping & IT Support" />
        <meta property="og:description" content="Helping Perth businesses with bookkeeping, payroll, and IT system support."/>
        <meta property="og:image" content="/profile.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:locale" content="en_GB" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Greig Colliar | Bookkeeping & IT Support" />
        <meta name="twitter:description" content="Bookkeeping, payroll, and IT support services for small businesses in Perth, Scotland."/>
        <meta name="twitter:image" content="/profile.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Greig Colliar",
              image: "https://yourdomain.com/profile.jpg",
              url: "https://yourdomain.com",  // CHANGE THIS - along with some of the others
              telephone: "+44 0000 000000",
              email: "greigcolliar@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "",
                addressLocality: "Perth",
                addressRegion: "Scotland",
                postalCode: "",
                addressCountry: "GB",
              },
              description:
                "Bookkeeping, payroll, and IT support services in Perth, Scotland by Greig Colliar.",
              sameAs: [
                "https://www.linkedin.com/in/greigcolliar",
                "https://github.com/",
                "https://twitter.com/",
              ],
              priceRange: "££",
              areaServed: "United Kingdom",
              openingHours: "Mo-Fr 09:00-17:00",
            }),
          }}
        />

      </Head>

      <aside className="fixed top-0 left-0 h-full w-60 bg-gray-900 text-gray-100 flex flex-col items-center py-10 z-50">
        <img
          src={imgPath("/profile.jpg")}
          alt="Greig Colliar"
          className="w-40 h-40 rounded-full object-cover border-4 border-gray-800"
        />

        <div className="mt-6 text-center">
          <div className="text-xl font-semibold">Greig Colliar</div>
          <div className="text-sm text-gray-400">Bookkeeping & IT</div>
        </div>

        <nav className="mt-10 flex-1 flex flex-col justify-center items-center gap-7">
          {NAV_ITEMS.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`sidebar-link text-center text-base tracking-wide transition-colors ${
                activeSection === n.id
                  ? 'text-teal-400 font-semibold'
                  : 'text-gray-300 hover:text-teal-400'
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>


        <div className="flex gap-5 mt-6">
          <a
            href="https://www.linkedin.com/in/greigcolliar"
            className="text-gray-400 hover:text-teal-400 transition-colors"
          >
            <Linkedin size={22} />
          </a>
          <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
            <Github size={22} />
          </a>
          <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
            <Twitter size={22} />
          </a>
        </div>
      </aside>

      <main className="ml-56">
        <header
          id="home"
          className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative z-10 max-w-3xl px-6">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-white mb-4"
            >
              I’m Greig Colliar
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-gray-200 mb-6"
            >
              <Typing
                speed={100}
                eraseSpeed={50}
                eraseDelay={1400}
                text={[
                  'Bookkeeper',
                  'Payroll Specialist',
                  'IT Support Consultant',
                ]}
              />
            </motion.div>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="inline-block mt-4 px-6 py-3 bg-teal-500 text-white rounded-lg shadow"
            >
              Work with me
            </motion.a>
          </div>
        </header>

<section id="about" className="py-24 relative bg-white">
  <div className="relative max-w-6xl mx-auto px-6">
    <SectionHeader title="About Me" faint="About" />

    {/* --- About Content --- */}
    <div className="grid md:grid-cols-2 gap-11 items-start">
      {/* Left: Bio */}
      <div>
        <p className="text-2xl font-semibold text-gray-800 mb-8">
          I’m <span className="text-teal-500">Greig Colliar</span>, an Accountant & IT Technician
        </p>

        <p className="text-gray-700 mb-4 leading-relaxed">
          I am an HND accounting graduate currently studying ACCA with hands-on experience in bookkeeping and practice-based accounting. 
          I have experience in working in several accounting firms including Drummond Laurie and Dains. 
          I have supported key financial processes including bank and balance sheet reconciliations, month-end and year-end close activities, 
          and the preparation of financial reports. I currently provide freelance bookkeeping services for small businesses, managing day-to-day transactions, VAT returns, 
          and financial reporting using Sage, Xero, and Excel. I'm committed to accuracy, integrity, and continuous improvement, and I strive to deliver 
          reliable financial support that helps organisations stay compliant and make informed decisions.
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Alongside my finance background, I also have experience in IT support, helping individuals troubleshoot technical issues, building PCs from the ground up.
        </p>
      </div>

      {/* Right: Personal Info */}
      <div>
        <ul className="space-y-3 text-gray-700 text-sm pt-20"> {/* if bugged = pt-20 change to pt-2 */}
          <li className="flex justify-between">
            <span className="font-semibold text-gray-800">Name</span>
            <span>Greig Colliar</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold text-gray-800">Email</span>
            <a href="mailto:greigcolliar@gmail.com" className="text-teal-500 hover:underline">
              greigcolliar@gmail.com
            </a>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold text-gray-800">From</span>
            <span>Scotland, UK</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold text-gray-800">Services</span>
            <span>Accounting, Bookkeeping and IT Support</span>
          </li>
        </ul>

        <a
          href="/Greig-CV.pdf"
          download
          className="inline-block mt-8 px-6 py-3 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600 transition font-medium text-sm tracking-wide"
        >
          Download CV
        </a>
      </div>
    </div>

  {/* Accounting Skills + Certifications (Side by Side) */}
  <div className="grid md:grid-cols-2 gap-10 mt-12">
    {/* --- Left: Accounting Skillset --- */}
    <div>
      <h4 className="text-xl font-semibold text-gray-800 mb-6">
        <span className="text-teal-500">Accounting</span> Skillset
      </h4>
      <div className="grid sm:grid-cols-2 gap-3 text-gray-700">
        {[
          "Management Accounts",
          "Bookkeeping & Reconciliation",
          "Payroll Administration",
          "Tax Preparation",
          "Financial Reporting",
          "Budgeting & Forecasting",
        ].map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-2 bg-gray-50 rounded-md px-3 py-2 hover:bg-gray-100 transition-all duration-200"
          >
            <span className="text-sm font-medium">{skill}</span>
          </div>
        ))}
      </div>
    </div>

    {/* --- Right: Certifications --- */}
    <div>
      <h4 className="text-xl  font-semibold text-gray-800 mb-6">
        <span className="text-teal-500">Certifications</span> & Qualifications
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 items-center">
        {[
          /* { name: "AAT Level 4 Qualified", icon: "/images/certs/aat.png" }, */
          { name: "Xero Certified Advisor", icon: "/images/certs/xero.png" },
          /* { name: "QuickBooks ProAdvisor", icon: "/images/certs/quickbooks.png" }, */
          { name: "Sage 50 Specialist", icon: "/images/certs/sage.png" },
        ].map((cert, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center group transition-all duration-300"
          >
            <img
              src={imgPath(cert.icon)}
              alt={cert.name}
              className="h-12 w-auto mb-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
            <p className="text-sm font-medium text-gray-700">{cert.name}</p>
          </div>
        ))}
      </div>
    </div>
  </div>

    {/* --- Experience Stats --- */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-20 text-center">
      {[
        { label: "Years Experience", value: "3+" },
        { label: "Happy Clients", value: "5+" },
        { label: "Projects Done", value: "5+" },
        { label: "Certifications", value: "4" },
      ].map((item) => (
        <div key={item.label}>
          <h3 className="text-3xl font-bold text-teal-500">{item.value}</h3>
          <p className="text-gray-700 text-sm">{item.label}</p>
        </div>
      ))}
    </div>
  </div>
</section>


        <section id="services" className="py-20 max-w-6xl mx-auto px-6 bg-gray-50">
          <SectionHeader title="Services" faint="Services" />

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-white text-teal-500 shadow-md">
                <BookOpen size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Bookkeeping</h3>
              <p className="text-gray-600 text-sm">
                Accurate and reliable bookkeeping services to keep your financial records organized and up to date.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-white text-teal-500 shadow-md">
                <Wallet size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Payroll Management</h3>
              <p className="text-gray-600 text-sm">
                Timely and compliant payroll processing, ensuring employees are paid correctly and on schedule.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-white text-teal-500 shadow-md">
                <FileText size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Tax Preparation</h3>
              <p className="text-gray-600 text-sm">
                Assistance with tax preparation and filing, helping you stay compliant and maximize returns.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-white text-teal-500 shadow-md">
                <Monitor size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">IT Support</h3>
              <p className="text-gray-600 text-sm">
                Reliable IT troubleshooting and support to keep your systems running smoothly and securely.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-white text-teal-500 shadow-md">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Financial Reporting</h3>
              <p className="text-gray-600 text-sm">
                Clear financial reporting to help you understand your business performance and make informed decisions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full bg-white text-teal-500 shadow-md">
                <Settings size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Systems Setup</h3>
              <p className="text-gray-600 text-sm">
                Implementation and setup of accounting and IT systems tailored to your business needs.
              </p>
            </div>
          </div>
        </section>


        <section id="resume" className="py-20 relative bg-white">
          <div className="relative max-w-6xl mx-auto px-6">
            <SectionHeader title="Resume" faint="Resume" />

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-teal-600 mb-6">
                  Education
                </h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-teal-500 pl-4">
                    <h4 className="text-lg font-semibold">ACCA</h4>
                    <p className="text-gray-600">ACCA Online — 2025 ongoing </p>
                    <p className="text-gray-700 text-sm mt-1">
                      Currently working through Certified Accounting Exams - 4/13 exempt.
                    </p>
                  </div>
                  <div className="border-l-4 border-teal-500 pl-4">
                    <h4 className="text-lg font-semibold">HND Accounting</h4>
                    <p className="text-gray-600">Perth College UHI — 2024</p>
                    <p className="text-gray-700 text-sm mt-1">
                      Focused on financial reporting, management accounting, tax, and law.
                    </p>
                  </div>
                  <div className="border-l-4 border-teal-500 pl-4">
                    <h4 className="text-lg font-semibold">PDA Bookkeeping</h4>
                    <p className="text-gray-600">Perth College UHI — 2022</p>
                    <p className="text-gray-700 text-sm mt-1">
                      Specialist training in double-entry bookkeeping and payroll.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-teal-600 mb-6">
                  Experience
                </h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-teal-500 pl-4">
                    <h4 className="text-lg font-semibold">Accounts Assistant</h4>
                    <p className="text-gray-600">Campbell Dallas LLP — 2020-2021</p>
                    <p className="text-gray-700 text-sm mt-1">
                      Supported senior accountants with reconciliations, VAT returns,
                      and client bookkeeping tasks.
                    </p>
                  </div>
                  <div className="border-l-4 border-teal-500 pl-4">
                    <h4 className="text-lg font-semibold">Retail Manager</h4>
                    <p className="text-gray-600">Semi-Chem — 2015-2019</p>
                    <p className="text-gray-700 text-sm mt-1">
                      Oversaw store operations, staff payroll, and IT systems
                      management.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ---------- Portfolio (-style, React-native) ---------- */}
        <section id="case-studies" className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeader title="case-studies" faint="Work" />

            {/* Filter bar */}
            <div className="flex justify-center mb-10 gap-6">
              {["All", "Accounting Efficiency", "Financial Reporting", "Bookkeeping"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat as "All" | "Accounting Efficiency" | "Financial Reporting" | "Bookkeeping")}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    filter === cat
                      ? "bg-teal-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-teal-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Portfolio grid */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                {filteredProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setActiveProject(p.id)}
                    className="portfolio-box rounded-lg shadow-lg cursor-pointer relative overflow-hidden"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') setActiveProject(p.id); }}
                  >
                    {/* use .portfolio-img wrapper so CSS selectors apply */}
                    <div className="portfolio-img">
                      <img
                        src={imgPath(p.img)}
                        alt={p.title}
                        className="img-fluid d-block w-full"
                        draggable={false}
                      />
                    </div>

                    {/* overlay that matches your CSS classes */}
                    <div className="portfolio-overlay">
                      <div className="portfolio-overlay-details">
                        <h5 className="text-white fw-400">{p.title}</h5>
                        <span className="text-light block mt-1">{p.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

          </div>

          {/* Modal: -style project details */}
        <Modal
          isOpen={!!activeProject}
          onRequestClose={() => {
            setActiveProject(null);
            setActiveImage(0);
          }}
          contentLabel="Project Details"
          ariaHideApp={false}
          closeTimeoutMS={300}
          className="relative max-w-5xl mx-auto mt-20 bg-white rounded-lg shadow-2xl overflow-hidden outline-none"
          overlayClassName="fixed inset-0 bg-black/70 flex justify-center items-start z-50 transition-opacity duration-300"
        >
          {activeProject && (
            <>
              {/* Close button */}
              <button
                onClick={() => {
                  setActiveProject(null);
                  setActiveImage(0);
                }}
                className="absolute top-3 right-4 text-gray-500 hover:text-black text-3xl font-bold z-50"
              >
                ×
              </button>

              {/* Get current project */}
              {(() => {
                const project = filteredProjects.find((p) => p.id === activeProject);
                if (!project) return null;

                const totalImages = project.images.length;
                const currentImg = project.images[activeImage];

                return (
                  <div className="grid md:grid-cols-2 gap-0 h-[80vh] relative">
                    {/* --- Left: Image Gallery --- */}

                    <div className="relative w-full h-full overflow-hidden bg-black">
                      {project.images.map((img, index) => (
                        <img
                          key={index}
                          src={imgPath(img)}
                          alt={`${project.title} ${index + 1}`}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
                            index === activeImage ? "opacity-100" : "opacity-0"
                          }`}
                          style={{ backfaceVisibility: "hidden" }}
                        />
                      ))}

                      {/* Prev / Next buttons */}
                      {totalImages > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImage((activeImage - 1 + totalImages) % totalImages);
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-black hover:bg-gray-200 transition px-3 py-2 rounded-full shadow-md z-50"
                          >
                            ‹
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImage((activeImage + 1) % totalImages);
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-black hover:bg-gray-200 transition px-3 py-2 rounded-full shadow-md z-50"
                          >
                            ›
                          </button>
                        </>
                      )}
                    </div>

                    {/* --- Right: Project Info (-style refined layout) --- */}
                      <div className="p-12 overflow-y-auto flex flex-col justify-center bg-white text-gray-800">
                        {/* Project Title */}
                        <h2 className="text-4xl font-semibold mb-4 text-gray-900 leading-tight">
                          {project.title}
                        </h2>

                        {/* Subtle divider */}
                        <div className="w-20 h-[2px] bg-[#14b8a6] mb-8"></div>

                        {/* Description */}
                        <p className="text-[15px] leading-relaxed text-gray-700 mb-8">
                          {project.description}
                        </p>

                        {/* Details list (like ) */}
                        <ul className="space-y-3 text-[15px] mb-10">
                          <li>
                            <span className="font-semibold text-gray-900">Category:</span>{" "}
                            <span className="text-gray-700">{project.category}</span>
                          </li>
                          <li>
                            <span className="font-semibold text-gray-900">Client:</span>{" "}
                            <span className="text-gray-700">Example Client</span>
                          </li>
                          <li>
                            <span className="font-semibold text-gray-900">Project Date:</span>{" "}
                            <span className="text-gray-700">2024</span>
                          </li>
                          <li>
                            <span className="font-semibold text-gray-900">Project URL:</span>{" "}
                            <a
                              href="#"
                              className="text-[#14b8a6] hover:text-[#0d9488] underline transition-colors"
                            >
                              www.example.com
                            </a>
                          </li>
                        </ul>

                        {/* Maybe change back to project button */}
                        <div className="mt-4 text-sm text-gray-600 leading-relaxed">
                          <p className="mb-2"><strong>Outcome:</strong> Improved financial accuracy and process efficiency.</p>
                          <p><strong>Tools Used:</strong> Excel, Sage, Xero</p>
                        </div>

                      </div>


                  </div>
                );
              })()}
            </>
          )}
        </Modal>
        </section>

        <section id="testimonials" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeader title="Client Speak" faint="Testimonials" />

            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              spaceBetween={30}
              slidesPerView={2}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
              }}
              className="pb-12"
            >
              <SwiperSlide>
                <div className="bg-white p-6 rounded-lg text-center">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Client"
                    className="w-16 h-16 mx-auto rounded-full mb-4"
                  />
                  <h4 className="font-semibold text-gray-800">John Smith</h4>
                  <p className="text-sm text-gray-500 mb-3">Business Owner</p>
                  <p className="text-gray-600 text-sm">
                    Greig’s bookkeeping expertise helped us organize our accounts and
                    save valuable time each month.
                  </p>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="bg-white p-6 rounded-lg text-center">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Client"
                    className="w-16 h-16 mx-auto rounded-full mb-4"
                  />
                  <h4 className="font-semibold text-gray-800">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500 mb-3">Retail Manager</p>
                  <p className="text-gray-600 text-sm">
                    His IT support was a lifesaver — quick, professional, and effective
                    at solving complex issues.
                  </p>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="bg-white p-6 rounded-lg text-center">
                  <img
                    src="https://randomuser.me/api/portraits/men/67.jpg"
                    alt="Client"
                    className="w-16 h-16 mx-auto rounded-full mb-4"
                  />
                  <h4 className="font-semibold text-gray-800">Michael Lee</h4>
                  <p className="text-sm text-gray-500 mb-3">Entrepreneur</p>
                  <p className="text-gray-600 text-sm">
                    With Greig’s financial reporting, I can finally see where my
                    business is heading and make better decisions.
                  </p>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="bg-white p-6 rounded-lg text-center">
                  <img
                    src="https://randomuser.me/api/portraits/women/85.jpg"
                    alt="Client"
                    className="w-16 h-16 mx-auto rounded-full mb-4"
                  />
                  <h4 className="font-semibold text-gray-800">Emma Wilson</h4>
                  <p className="text-sm text-gray-500 mb-3">Freelancer</p>
                  <p className="text-gray-600 text-sm">
                    Greig handled my taxes seamlessly, letting me focus on growing my
                    freelance business without stress.
                  </p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

{/* Companies I've Worked With */}
<div className="mt-12 pt-8 border-t border-gray-100 text-center">
  <h4 className="text-xl font-semibold text-gray-800 mb-6">
    <span className="text-teal-500">Companies</span> I’ve Worked With
  </h4>

  <div className="flex flex-wrap justify-center items-center gap-x-40 gap-y-18">
    {[
      "/images/logos/McDonalds.png",
      "/images/logos/McDonalds.png",
      "/images/logos/McDonalds.png",
      "/images/logos/McDonalds.png",
      "/images/logos/McDonalds.png",
    ].map((logo, i) => (
      <div
        key={i}
        className="relative flex items-center justify-center group"
      >
        <img
          src={imgPath(logo)}
          alt={`Company logo ${i + 1}`}
          className="h-10 w-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-300"
        />
        <div className="absolute inset-0 bg-teal-500 opacity-0 group-hover:opacity-20 rounded-md transition-opacity duration-300"></div>
      </div>
    ))}
  </div>
</div>









        </section>

        <section id="contact" className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeader title="Contact" faint="Contact" />

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
                <p className="text-gray-700 mb-4">
                  I’m open to freelance work and collaborations. Whether you need
                  bookkeeping, payroll, or IT support — let’s talk.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-3">
                    <Mail className="text-teal-500" size={18} />
                    greigcolliar@gmail.com
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPin className="text-teal-500" size={18} />
                    Perth, Scotland, UK
                  </li>
                </ul>
              </div>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <textarea
                  rows={5}
                  placeholder="Your Message"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-teal-500 text-white rounded-lg shadow hover:opacity-90"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        <footer className="py-8 bg-gray-900 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Greig Colliar. All rights reserved.
        </footer>
      </main>
    </>
  );
}
