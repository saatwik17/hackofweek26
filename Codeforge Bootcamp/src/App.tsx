import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, 
  Code2, 
  Cpu, 
  Zap, 
  Users, 
  Trophy, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Menu,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { AccordionItem } from '@/components/Accordion';
import { RegistrationModal } from '@/components/RegistrationModal';

const Navbar = ({ onApply }: { onApply: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neo-white border-b-2 border-neo-black px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-8 h-8 fill-neo-yellow" />
          <span className="font-display font-bold text-2xl tracking-tighter">CODEFORGE</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 font-bold">
          <a href="#curriculum" className="hover:underline decoration-2 underline-offset-4">CURRICULUM</a>
          <a href="#instructors" className="hover:underline decoration-2 underline-offset-4">MENTORS</a>
          <a href="#pricing" className="hover:underline decoration-2 underline-offset-4">PRICING</a>
          <Button size="sm" variant="primary" onClick={onApply}>APPLY NOW</Button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-neo-white border-b-2 border-neo-black p-4 flex flex-col gap-4 shadow-xl"
        >
          <a href="#curriculum" className="font-bold text-lg" onClick={() => setIsOpen(false)}>CURRICULUM</a>
          <a href="#instructors" className="font-bold text-lg" onClick={() => setIsOpen(false)}>MENTORS</a>
          <a href="#pricing" className="font-bold text-lg" onClick={() => setIsOpen(false)}>PRICING</a>
          <Button fullWidth variant="primary" onClick={() => { setIsOpen(false); onApply(); }}>APPLY NOW</Button>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = ({ onApply }: { onApply: () => void }) => {
  return (
    <section className="pt-32 pb-20 px-4 bg-neo-white overflow-hidden relative">
      <div className="absolute top-20 right-0 w-64 h-64 bg-neo-yellow rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neo-blue rounded-full blur-3xl opacity-20 -z-10" />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block bg-neo-black text-neo-white px-4 py-1 font-mono font-bold text-sm mb-6 transform -rotate-2">
            BATCH 04 STARTING SOON
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-6">
            CODE LIKE A <span className="text-neo-blue">MACHINE.</span><br />
            CREATE LIKE AN <span className="text-neo-pink">ARTIST.</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium text-gray-600 mb-8 max-w-lg">
            The most intense, project-based web development bootcamp. 
            Zero fluff. 100% code.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="primary" className="text-xl w-full sm:w-auto" onClick={onApply}>
              START CODING <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-xl w-full sm:w-auto"
              onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
            >
              VIEW SYLLABUS
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <Card className="bg-neo-white rotate-3 z-10 relative">
            <div className="font-mono text-sm border-b-2 border-neo-black pb-2 mb-4 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-neo-pink border border-neo-black" />
              <div className="w-3 h-3 rounded-full bg-neo-yellow border border-neo-black" />
              <div className="w-3 h-3 rounded-full bg-neo-green border border-neo-black" />
            </div>
            <pre className="font-mono text-sm leading-relaxed">
              <span className="text-neo-purple">const</span> <span className="text-neo-blue">developer</span> = {'{'}
              {'\n'}  <span className="text-neo-pink">skills</span>: [<span className="text-neo-green">'React'</span>, <span className="text-neo-green">'Node'</span>, <span className="text-neo-green">'TS'</span>],
              {'\n'}  <span className="text-neo-pink">passion</span>: <span className="text-neo-purple">true</span>,
              {'\n'}  <span className="text-neo-pink">coffeeLevel</span>: <span className="text-neo-yellow">Infinity</span>
              {'\n'}{'}'};
              {'\n'}
              {'\n'}<span className="text-gray-400">// Ready to deploy?</span>
              {'\n'}<span className="text-neo-blue">developer</span>.<span className="text-neo-purple">launch</span>();
            </pre>
          </Card>
          <div className="absolute inset-0 bg-neo-black translate-x-4 translate-y-4 -z-10 border-2 border-neo-black" />
        </motion.div>
      </div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="bg-neo-yellow border-y-2 border-neo-black py-4 overflow-hidden whitespace-nowrap">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="inline-block"
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-2xl font-black mx-8 font-mono">
            ★ 100% JOB PLACEMENT ★ 500+ GRADUATES ★ REAL PROJECTS ★ NO BS
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Curriculum = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const modules: { title: string; color: "pink" | "blue" | "yellow" | "green" | "white"; content: string }[] = [
    {
      title: "MODULE 01: THE FOUNDATION",
      color: "pink",
      content: "Master HTML5 semantics, CSS3 modern layouts (Flexbox/Grid), and the basics of JavaScript. Build your first 3 responsive websites from scratch."
    },
    {
      title: "MODULE 02: JAVASCRIPT MASTERY",
      color: "blue",
      content: "Deep dive into ES6+, DOM manipulation, async programming, and APIs. Create interactive web applications and games."
    },
    {
      title: "MODULE 03: REACT ECOSYSTEM",
      color: "yellow",
      content: "Component architecture, Hooks, State Management (Redux/Zustand), and Routing. Build a full-scale Single Page Application (SPA)."
    },
    {
      title: "MODULE 04: BACKEND & DATABASE",
      color: "green",
      content: "Node.js, Express, PostgreSQL/MongoDB. Learn authentication, REST APIs, and database design. Connect your frontend to a real server."
    },
    {
      title: "MODULE 05: DEPLOYMENT & CAREER",
      color: "white",
      content: "CI/CD pipelines, Docker basics, Portfolio building, Resume reviews, and Mock Interviews. Get job-ready."
    }
  ];

  return (
    <section id="curriculum" className="py-20 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black mb-4 uppercase">The Syllabus</h2>
        <p className="text-xl font-medium">From "Hello World" to Hired.</p>
      </div>

      <div className="space-y-4">
        {modules.map((mod, idx) => (
          <AccordionItem
            key={idx}
            title={mod.title}
            color={mod.color}
            isOpen={openIndex === idx}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            <p className="text-lg leading-relaxed">{mod.content}</p>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 bg-neo-black text-neo-white text-sm font-mono font-bold">4 WEEKS</span>
              <span className="px-3 py-1 border-2 border-neo-black text-sm font-mono font-bold">3 PROJECTS</span>
            </div>
          </AccordionItem>
        ))}
      </div>
    </section>
  );
};

const Instructors = () => {
  const mentors = [
    {
      name: "ALEX CHEN",
      role: "Ex-Google Engineer",
      bio: "Full-stack wizard with 10 years of experience. Loves clean code and spicy food.",
      color: "blue"
    },
    {
      name: "SARAH JONES",
      role: "UI/UX Specialist",
      bio: "Award-winning designer turned developer. Obsessed with pixel perfection.",
      color: "pink"
    },
    {
      name: "MIKE ROSS",
      role: "DevOps Guru",
      bio: "Scalability expert. Will teach you how not to crash production on Friday.",
      color: "green"
    }
  ];

  const bgColors: Record<string, string> = {
    blue: "bg-neo-blue",
    pink: "bg-neo-pink",
    green: "bg-neo-green",
  };

  return (
    <section id="instructors" className="py-20 px-4 bg-neo-black text-neo-white border-y-2 border-neo-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-black mb-16 text-center text-neo-white uppercase">
          Learn from <span className="text-neo-yellow">Giants</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {mentors.map((mentor, idx) => (
            <Card key={idx} className="bg-neo-white text-neo-black transform hover:-translate-y-2 transition-transform duration-300">
              <div className={`w-full h-48 mb-6 border-2 border-neo-black ${bgColors[mentor.color]} flex items-center justify-center overflow-hidden`}>
                 <img 
                   src={`https://picsum.photos/seed/${mentor.name}/400/400`} 
                   alt={mentor.name}
                   className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                   referrerPolicy="no-referrer"
                 />
              </div>
              <h3 className="text-2xl font-black mb-1 uppercase">{mentor.name}</h3>
              <p className="font-mono text-sm font-bold text-neo-purple mb-4">{mentor.role}</p>
              <p className="font-medium">{mentor.bio}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = ({ onApply }: { onApply: () => void }) => {
  return (
    <section id="pricing" className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-5xl font-black mb-16 text-center uppercase">Invest in Yourself</h2>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Card className="relative">
          <h3 className="text-3xl font-black mb-2">PART-TIME</h3>
          <p className="font-mono text-gray-500 mb-6">Nights & Weekends</p>
          <div className="text-5xl font-black mb-8">₹35,000</div>
          
          <ul className="space-y-4 mb-8">
            {['24 Weeks Duration', 'Live Online Classes', 'Recorded Sessions', 'Community Access'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 font-medium">
                <CheckCircle2 className="w-6 h-6 text-neo-green fill-neo-black" />
                {item}
              </li>
            ))}
          </ul>
          
          <Button fullWidth variant="outline" onClick={onApply}>SELECT PLAN</Button>
        </Card>

        <Card color="yellow" className="relative transform md:-translate-y-4">
          <div className="absolute -top-4 right-4 bg-neo-black text-neo-white px-4 py-1 font-mono font-bold text-sm rotate-2 border-2 border-neo-white">
            MOST POPULAR
          </div>
          <h3 className="text-3xl font-black mb-2">FULL-TIME</h3>
          <p className="font-mono text-gray-800 mb-6">Immersive Bootcamp</p>
          <div className="text-5xl font-black mb-8">₹75,000</div>
          
          <ul className="space-y-4 mb-8">
            {['12 Weeks Duration', '9am - 5pm IST', '1-on-1 Mentorship', 'Job Guarantee*', 'Career Coaching'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 font-bold">
                <CheckCircle2 className="w-6 h-6 text-neo-black" />
                {item}
              </li>
            ))}
          </ul>
          
          <Button fullWidth variant="primary" className="bg-neo-black text-neo-white hover:bg-gray-800" onClick={onApply}>
            APPLY NOW
          </Button>
        </Card>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-neo-white border-t-2 border-neo-black py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <Terminal className="w-8 h-8 fill-neo-yellow" />
          <span className="font-display font-bold text-2xl tracking-tighter">CODEFORGE</span>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="p-2 border-2 border-neo-black hover:bg-neo-yellow transition-colors neo-shadow hover:translate-y-[-2px]">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="p-2 border-2 border-neo-black hover:bg-neo-pink transition-colors neo-shadow hover:translate-y-[-2px]">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="p-2 border-2 border-neo-black hover:bg-neo-blue transition-colors neo-shadow hover:translate-y-[-2px]">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        <div className="text-sm font-mono font-bold text-gray-500">
          © 2024 CODEFORGE. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neo-white text-neo-black selection:bg-neo-pink selection:text-white">
      <Navbar onApply={() => setIsModalOpen(true)} />
      <Hero onApply={() => setIsModalOpen(true)} />
      <Marquee />
      <Curriculum />
      <Instructors />
      <Pricing onApply={() => setIsModalOpen(true)} />
      <Footer />
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
