
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  ArrowRight, 
  Zap, 
  Users, 
  Hospital, 
  Building2, 
  CreditCard, 
  ChevronRight,
  Menu,
  X,
  MessageSquare,
  BarChart3,
  CheckCircle2,
  ChevronLeft,
  Plus,
  Minus,
  Mail,
  Mic,
  MicOff,
  User,
  MapPin,
  Phone,
  Send,
  Cpu,
  Globe,
  Lock,
  FileCheck,
  Calendar,
  Briefcase,
  Clock,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Laptop,
  TrendingDown,
  Timer,
  PlayCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { getGeminiResponse } from './services/geminiService';
import { Message } from './types';

// Mock Data for Analytics
const analyticsData = [
  { name: '09:00', claims: 12, value: 45000 },
  { name: '10:00', claims: 19, value: 72000 },
  { name: '11:00', claims: 25, value: 128000 },
  { name: '12:00', claims: 32, value: 156000 },
  { name: '13:00', claims: 28, value: 139000 },
  { name: '14:00', claims: 35, value: 182000 },
  { name: '15:00', claims: 42, value: 210000 },
];

const pieChartData = [
  { name: 'Approved', value: 65, color: '#10b981' }, // emerald-500
  { name: 'Pending', value: 25, color: '#f59e0b' },  // amber-500
  { name: 'Rejected', value: 10, color: '#ef4444' }, // red-500
];

const featureSlides = [
  {
    title: "Hospital Cashless Management",
    desc: "Streamline admissions, pre-auth approvals, and discharges with our unified 3D dashboard. Manage bed occupancy and financial clearance in real-time.",
    bg: "from-blue-900 to-indigo-900",
    icon: Hospital
  },
  {
    title: "Rapid Turnaround Time (TAT)",
    desc: "Slash claim processing time by 70%. Our AI engine accelerates pre-authorization and final settlement, turning hours into minutes.",
    bg: "from-emerald-800 to-teal-900",
    icon: Clock
  },
  {
    title: "100% Accuracy",
    desc: "Automated document validation and medical rule engines eliminate manual errors, ensuring first-time-right submissions every time.",
    bg: "from-orange-800 to-red-900",
    icon: ShieldCheck
  },
  {
    title: "Seamless Process Flow",
    desc: "Experience total transparency. From patient intimation to TPA approval and bank settlement, track the entire lifecycle in one view.",
    bg: "from-violet-900 to-purple-900",
    icon: Zap
  },
  {
    title: "Ease of Usage",
    desc: "Zero learning curve. Our intuitive interface is designed for hospital staff and insurers, making complex workflows feel effortless.",
    bg: "from-cyan-800 to-blue-900",
    icon: Laptop
  },
  {
    title: "OPD & IPD Management",
    desc: "A single comprehensive platform that handles high-volume Out-Patient queries and complex In-Patient hospitalization cases with equal ease.",
    bg: "from-pink-800 to-rose-900",
    icon: Activity
  }
];

const stakeholdersData = [
  { 
    icon: Hospital, name: "Hospitals", color: "blue",
    desc: "Zero paperwork, faster bed turnover, and happier patients.",
    useCase: "City Care Hospital reduced discharge wait times from 4 hours to 45 minutes using our auto-approval engine."
  },
  { 
    icon: Building2, name: "Insurers", color: "indigo",
    desc: "Fraud detection at source with verified clinical data.",
    useCase: "Secure Life Insurance saved ₹2 Cr annually by detecting duplicate claims instantly via ClaimNX API."
  },
  { 
    icon: Users, name: "TPAs", color: "cyan",
    desc: "Centralized dashboard for all query management.",
    useCase: "Apex TPA processed 3x more claims with the same team size by automating routine query responses."
  },
  { 
    icon: CreditCard, name: "Finance", color: "emerald",
    desc: "Instant bill discounting and risk-free lending.",
    useCase: "FinServe provided instant operational credit to 50+ hospitals based on verified ClaimNX claim data."
  }
];

// Tour Steps Configuration
const tourSteps = [
  {
    targetId: 'hero',
    title: 'Welcome to ClaimNX',
    content: 'Start your journey here. We are revolutionizing healthcare claims with AI-driven cashless solutions.',
    position: 'bottom'
  },
  {
    targetId: 'process',
    title: 'The Process Journey',
    content: 'Visualize the entire claims lifecycle in 3D. From intimation to discharge, see how we simplify every step.',
    position: 'top'
  },
  {
    targetId: 'analytics',
    title: 'Live Analytics',
    content: 'Track real-time data, approval rates, and financial health on our interactive dashboard.',
    position: 'top'
  },
  {
    targetId: 'stakeholders',
    title: 'Our Ecosystem',
    content: 'See how we connect Hospitals, Insurers, TPAs, and Finance companies in one unified network.',
    position: 'top'
  }
];

// Helper component for scroll animations
const ScrollReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const NavItem = ({ href, children }: { href: string; children?: React.ReactNode }) => (
  <a href={href} className="text-slate-600 hover:text-blue-900 font-bold transition-all duration-300 hover:translate-y-[-2px] relative group">
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
  </a>
);

const SectionTitle = ({ subtitle, title, centered = true }: { subtitle: string; title: string; centered?: boolean }) => (
  <div className={`${centered ? 'text-center' : ''} mb-16 relative`}>
    <div className={`absolute -top-10 ${centered ? 'left-1/2 -translate-x-1/2' : 'left-0'} w-24 h-24 bg-blue-900/10 rounded-full blur-3xl`}></div>
    <span className="text-blue-900 font-extrabold tracking-widest uppercase text-xs shadow-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-100">{subtitle}</span>
    <h2 className="text-4xl md:text-5xl font-extrabold mt-4 text-slate-900 tracking-tight leading-tight">{title}</h2>
  </div>
);

const testimonials = [
  {
    quote: "ClaimNX has fundamentally changed how we handle discharges. What used to take 4 hours now happens in 40 minutes. The patients are happier, and so is our staff.",
    author: "Dr. Rajesh Mehta",
    role: "COO, City Care Hospital",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "The transparency offered by the ClaimNX portal is unmatched. We have seen a 30% reduction in fraudulent claims thanks to their verified data pipelines.",
    author: "Anjali Deshmukh",
    role: "Head of Claims, Secure Life Insurance",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
  },
  {
    quote: "Integrating with ClaimNX was the best technical decision we made this year. Their API is robust and the support team is exceptionally empathetic.",
    author: "Sandeep Varma",
    role: "Director, Apex TPA Services",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
  }
];

const faqs = [
  {
    q: "How does ClaimNX speed up the cashless approval process?",
    a: "ClaimNX digitizes all medical reports and documents at the source. By using AI-driven verification and direct API links to TPAs/Insurers, we eliminate manual data entry and courier delays, cutting approval times by up to 60%."
  },
  {
    q: "Is patient data secure on the ClaimNX portal?",
    a: "Absolutely. We are ISO 27001 certified and follow strict HIPAA-compliant data encryption standards. Patient privacy and data integrity are our highest priorities."
  },
  {
    q: "Can ClaimNX integrate with existing Hospital Management Systems (HMS)?",
    a: "Yes! Our platform is designed with a 'plug-and-play' architecture. We provide comprehensive APIs and custom connectors to ensure seamless data flow from your existing HMS to our portal."
  },
  {
    q: "What are the costs associated with joining the ClaimNX network?",
    a: "We offer flexible pricing models tailored for hospitals of all sizes, from small clinics to large multi-specialty chains. Contact our sales team for a personalized quote."
  },
  {
    q: "How does ClaimNX help in reducing claim rejections?",
    a: "Our system includes a pre-submission check that flags missing documents or inconsistent data before the claim reaches the insurer. This 'first-time-right' approach significantly lowers rejection rates."
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Join Modal State
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    org: '',
    location: ''
  });

  // Demo Modal State
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isDemoSubmitted, setIsDemoSubmitted] = useState(false);
  const [demoFormData, setDemoFormData] = useState({
    clientName: '',
    mobile: '',
    email: '',
    businessType: '',
    appointmentDate: '',
    appointmentTime: ''
  });

  // Feature Slideshow State
  const [activeSlide, setActiveSlide] = useState(0);

  // Tour State
  const [tourActive, setTourActive] = useState(false);
  const [currentTourStep, setCurrentTourStep] = useState(0);
  
  // Refs for Parallax Animation (Performance Optimization)
  const heroCardRef = useRef<HTMLDivElement>(null);
  const float1Ref = useRef<HTMLDivElement>(null);
  const float2Ref = useRef<HTMLDivElement>(null);

  // Use requestAnimationFrame for smooth scrolling without re-renders
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          if (heroCardRef.current) {
            heroCardRef.current.style.transform = `translate(-50%, calc(-50% - ${scrollY * 0.05}px)) rotateY(-10deg) rotateX(10deg)`;
          }
          
          if (float1Ref.current) {
            // Re-applying base transforms plus the parallax offset
            float1Ref.current.style.transform = `translateY(${-scrollY * 0.03}px)`;
          }

          if (float2Ref.current) {
            float2Ref.current.style.transform = `translateY(${-scrollY * 0.02}px)`;
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: 'Hello. I am your ClaimNX Assistant. We understand that medical claims can be a stressful part of an already difficult time. How can I help make your experience smoother today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isChatOpen]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Slide auto-rotation
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featureSlides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        alert("Speech recognition is not supported in this browser.");
      }
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { role: 'user', text: userInput, timestamp };
    const newMessages = [...chatMessages, userMsg];
    
    setChatMessages(newMessages);
    setUserInput('');
    setIsTyping(true);

    const response = await getGeminiResponse(userInput);
    const modelMsg: Message = { 
      role: 'model', 
      text: response, 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    
    setChatMessages([...newMessages, modelMsg]);
    setIsTyping(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending email to raulavhad@gmail.com
    console.log("Sending Join data to raulavhad@gmail.com:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsJoinModalOpen(false);
      setIsSubmitted(false);
      setFormData({ name: '', mobile: '', email: '', org: '', location: '' });
    }, 3000);
  };

  const handleDemoFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDemoFormData({ ...demoFormData, [e.target.name]: e.target.value });
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending email to raulavhad@gmail.com
    console.log("Sending Demo Request to raulavhad@gmail.com:", demoFormData);
    setIsDemoSubmitted(true);
    setTimeout(() => {
      setIsDemoModalOpen(false);
      setIsDemoSubmitted(false);
      setDemoFormData({ clientName: '', mobile: '', email: '', businessType: '', appointmentDate: '', appointmentTime: '' });
    }, 3000);
  };

  // Tour Logic
  const startTour = () => {
    setTourActive(true);
    setCurrentTourStep(0);
    scrollToSection(tourSteps[0].targetId);
  };

  const nextTourStep = () => {
    if (currentTourStep < tourSteps.length - 1) {
      const nextStep = currentTourStep + 1;
      setCurrentTourStep(nextStep);
      scrollToSection(tourSteps[nextStep].targetId);
    } else {
      setTourActive(false);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden relative">
      {/* 3D Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[100px] animate-pulse [animation-delay:2s]"></div>
      </div>

      {/* Guided Tour Overlay */}
      {tourActive && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          {/* Dark Overlay with cutout effect simulated by high z-index of target - simplified here with just a modal */}
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm pointer-events-auto transition-all duration-500"></div>
          
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4 pointer-events-auto animate-in zoom-in-95 duration-300 relative">
               {/* Arrow indicating position (simplified) */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 transform"></div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Tour Step {currentTourStep + 1}/{tourSteps.length}
                </span>
                <button onClick={() => setTourActive(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{tourSteps[currentTourStep].title}</h3>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">{tourSteps[currentTourStep].content}</p>
              
              <div className="flex justify-between items-center">
                 <button onClick={() => setTourActive(false)} className="text-sm text-slate-500 hover:text-slate-800 font-medium">
                   Skip Tour
                 </button>
                 <button 
                  onClick={nextTourStep}
                  className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-bold text-sm transition-colors flex items-center"
                 >
                   {currentTourStep === tourSteps.length - 1 ? 'Finish' : 'Next'} <ChevronRight className="w-4 h-4 ml-1" />
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Join Modal */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 perspective-1000">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300" onClick={() => !isSubmitted && setIsJoinModalOpen(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-500 transform transition-all hover:scale-[1.01] border border-white/40">
            {isSubmitted ? (
              <div className="p-12 text-center flex flex-col items-center">
                <div className="bg-green-100 p-4 rounded-full mb-6 animate-bounce shadow-lg shadow-green-200">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h3>
                <p className="text-gray-600">Your details have been securely transmitted to our team. We'll be in touch shortly.</p>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-8 text-white flex justify-between items-center shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 pattern-grid-lg opacity-20"></div>
                  <div className="flex items-center space-x-3 relative z-10">
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Join the Network</h3>
                      <p className="text-blue-100 text-xs">Transform your claims experience</p>
                    </div>
                  </div>
                  <button onClick={() => setIsJoinModalOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-all relative z-10">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <form onSubmit={handleJoinSubmit} className="p-8 space-y-5 bg-white/80 backdrop-blur-xl">
                  <div className="space-y-4">
                    {[
                      { icon: User, name: 'name', ph: 'Full Name', type: 'text' },
                      { icon: Phone, name: 'mobile', ph: 'Mobile Number', type: 'tel' },
                      { icon: Mail, name: 'email', ph: 'Email ID', type: 'email' },
                      { icon: Building2, name: 'org', ph: 'Hospital / Company Name', type: 'text' },
                      { icon: MapPin, name: 'location', ph: 'Location (City, State)', type: 'text' }
                    ].map((field, idx) => (
                      <div key={idx} className="relative group">
                        <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                        <input 
                          required
                          type={field.type}
                          name={field.name}
                          value={(formData as any)[field.name]}
                          onChange={handleFormChange}
                          placeholder={field.ph}
                          className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/50 focus:border-blue-900 transition-all text-sm shadow-inner"
                        />
                      </div>
                    ))}
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white py-4 rounded-xl font-bold shadow-[0_10px_20px_rgba(30,58,138,0.3)] hover:shadow-[0_15px_30px_rgba(30,58,138,0.4)] transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-2 mt-6"
                  >
                    <span>Submit Application</span>
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Book Demo Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 perspective-1000">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300" onClick={() => !isDemoSubmitted && setIsDemoModalOpen(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-500 transform transition-all hover:scale-[1.01] border border-white/40 max-h-[90vh] overflow-y-auto">
            {isDemoSubmitted ? (
              <div className="p-12 text-center flex flex-col items-center">
                <div className="bg-blue-100 p-4 rounded-full mb-6 animate-bounce shadow-lg shadow-blue-200">
                  <Calendar className="w-12 h-12 text-blue-900" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Demo Scheduled!</h3>
                <p className="text-gray-600">Thanks for your interest. Our team will contact you shortly to confirm the demo slot.</p>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white flex justify-between items-center shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 pattern-grid-lg opacity-20"></div>
                  <div className="flex items-center space-x-3 relative z-10">
                    <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
                      <Calendar className="w-6 h-6 text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Book a Live Demo</h3>
                      <p className="text-slate-300 text-xs">See ClaimNX in action</p>
                    </div>
                  </div>
                  <button onClick={() => setIsDemoModalOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-all relative z-10">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <form onSubmit={handleDemoSubmit} className="p-8 space-y-4 bg-white/80 backdrop-blur-xl">
                  <div className="space-y-4">
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-900 transition-colors" />
                      <input 
                        required
                        type="text"
                        name="clientName"
                        value={demoFormData.clientName}
                        onChange={handleDemoFormChange}
                        placeholder="Client Name"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/50 focus:border-blue-900 transition-all text-sm shadow-inner"
                      />
                    </div>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-900 transition-colors" />
                      <input 
                        required
                        type="tel"
                        name="mobile"
                        value={demoFormData.mobile}
                        onChange={handleDemoFormChange}
                        placeholder="Mobile Number"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/50 focus:border-blue-900 transition-all text-sm shadow-inner"
                      />
                    </div>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-900 transition-colors" />
                      <input 
                        required
                        type="email"
                        name="email"
                        value={demoFormData.email}
                        onChange={handleDemoFormChange}
                        placeholder="Email ID"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/50 focus:border-blue-900 transition-all text-sm shadow-inner"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative group">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-900 transition-colors" />
                        <input 
                          required
                          type="date"
                          name="appointmentDate"
                          value={demoFormData.appointmentDate}
                          onChange={handleDemoFormChange}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/50 focus:border-blue-900 transition-all text-sm shadow-inner text-gray-500"
                        />
                      </div>
                      <div className="relative group">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-900 transition-colors" />
                        <input 
                          required
                          type="time"
                          name="appointmentTime"
                          value={demoFormData.appointmentTime}
                          onChange={handleDemoFormChange}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/50 focus:border-blue-900 transition-all text-sm shadow-inner text-gray-500"
                        />
                      </div>
                    </div>

                    <div className="relative group">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-900 transition-colors" />
                      <select 
                        required
                        name="businessType"
                        value={demoFormData.businessType}
                        onChange={handleDemoFormChange}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/50 focus:border-blue-900 transition-all text-sm shadow-inner text-gray-700 appearance-none"
                      >
                        <option value="" disabled>Select Business Type</option>
                        <option value="Hospital">Hospital / Clinic</option>
                        <option value="Insurance">Insurance Company</option>
                        <option value="TPA">Third Party Administrator (TPA)</option>
                        <option value="Corporate">Corporate / Finance</option>
                        <option value="Other">Other</option>
                      </select>
                      <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 rotate-90 pointer-events-none" />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold shadow-[0_10px_20px_rgba(15,23,42,0.3)] hover:shadow-[0_15px_30px_rgba(15,23,42,0.4)] transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-2 mt-6"
                  >
                    <span>Schedule Demo</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center space-x-2 cursor-pointer group perspective-1000">
              <div className="bg-gradient-to-br from-blue-900 to-indigo-900 p-2.5 rounded-xl shadow-lg shadow-blue-900/30 transform transition-transform duration-500 group-hover:rotate-y-180">
                <ShieldCheck className="text-white w-7 h-7" />
              </div>
              <span className="text-3xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-900 transition-colors">
                Claim<span className="text-blue-900">NX</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8 bg-white/50 px-8 py-3 rounded-full border border-white/60 shadow-sm backdrop-blur-md">
              <NavItem href="#process">How It Works</NavItem>
              <NavItem href="#analytics">Analytics</NavItem>
              <NavItem href="#stakeholders">Partners</NavItem>
              <NavItem href="#vision">Vision</NavItem>
            </div>

            <div className="hidden md:flex space-x-4">
              <button
                onClick={startTour}
                className="text-sm font-bold text-blue-900 hover:text-blue-800 flex items-center space-x-1"
              >
                <PlayCircle className="w-4 h-4" /> <span>Take Tour</span>
              </button>
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-900 hover:text-blue-900 px-6 py-3 rounded-xl font-bold transition-all"
              >
                Book Demo
              </button>
              <button 
                onClick={() => setIsJoinModalOpen(true)}
                className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-[0_10px_20px_rgba(30,58,138,0.2)] hover:shadow-[0_15px_25px_rgba(30,58,138,0.3)] hover:-translate-y-1 active:translate-y-0"
              >
                Get Started
              </button>
            </div>

            <button className="md:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-90 transition-all" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden glass border-t border-gray-200 p-6 space-y-4 animate-in slide-in-from-top-4 duration-300 shadow-xl">
            <button onClick={() => { setIsMenuOpen(false); startTour(); }} className="block w-full text-left text-blue-900 font-bold text-lg py-2">Take Tour</button>
            <a href="#process" className="block text-gray-800 font-bold text-lg py-2">How It Works</a>
            <a href="#analytics" className="block text-gray-800 font-bold text-lg py-2">Analytics</a>
            <a href="#stakeholders" className="block text-gray-800 font-bold text-lg py-2">Partners</a>
            <button 
              onClick={() => { setIsMenuOpen(false); setIsDemoModalOpen(true); }}
              className="w-full bg-white border-2 border-slate-200 text-slate-700 px-6 py-4 rounded-xl font-bold shadow-sm mt-4"
            >
              Book Demo
            </button>
            <button 
              onClick={() => { setIsMenuOpen(false); setIsJoinModalOpen(true); }}
              className="w-full bg-blue-900 active:scale-95 text-white px-6 py-4 rounded-xl font-bold shadow-lg"
            >
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* 3D Hero Section */}
      <header id="hero" className="pt-40 pb-32 relative overflow-hidden perspective-1000">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="animate-in fade-in slide-in-from-left-10 duration-1000">
              <div className="inline-flex items-center px-5 py-2.5 bg-white/80 backdrop-blur-md text-blue-900 rounded-full text-sm font-bold mb-8 border border-blue-100 shadow-sm hover:shadow-md transition-all cursor-default transform hover:scale-105">
                <Activity className="w-4 h-4 mr-2 text-blue-900 animate-pulse" />
                Next-Gen Healthcare FinTech
              </div>
              <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8 tracking-tight">
                Healthcare <br/>
                <span className="gradient-text drop-shadow-sm">Claims Reimagined.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-lg font-medium">
                Experience the first <span className="text-blue-900 font-bold">Real-time 3D Cashless Engine</span>. 
                We bridge the gap between patient care and financial approval instantly.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <button 
                  onClick={() => setIsJoinModalOpen(true)}
                  className="group relative bg-blue-900 text-white px-10 py-5 rounded-2xl font-bold overflow-hidden shadow-[0_20px_40px_rgba(30,58,138,0.4)] transition-all hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(30,58,138,0.5)] active:translate-y-0"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative flex items-center text-lg">
                    Join the Network <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button 
                  onClick={() => setIsDemoModalOpen(true)}
                  className="group relative bg-white text-blue-900 border-2 border-blue-100 px-10 py-5 rounded-2xl font-bold overflow-hidden shadow-[0_20px_40px_rgba(255,255,255,0.4)] transition-all hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(200,200,255,0.5)] active:translate-y-0 hover:border-blue-900"
                >
                  <span className="relative flex items-center text-lg">
                    Book Demo <Calendar className="ml-2 w-5 h-5" />
                  </span>
                </button>
              </div>
            </div>

            {/* 3D Composition with Parallax and DOF */}
            <div className="relative h-[600px] w-full preserve-3d animate-float-3d hidden lg:block">
              {/* Main Card - Foreground (Sharp, Faster Parallax) */}
              <div 
                ref={heroCardRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[320px] bg-white/40 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] flex flex-col p-6 transform rotate-y-[-10deg] rotate-x-[10deg] z-20 transition-transform duration-100 ease-out"
                style={{ transform: `translate(-50%, -50%) rotateY(-10deg) rotateX(10deg)` }}
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Status</div>
                </div>
                <div className="flex-1 flex items-end justify-between space-x-2">
                  {[40, 70, 45, 90, 65, 85, 50].map((h, i) => (
                    <div key={i} className="w-full bg-gradient-to-t from-blue-800/80 to-indigo-600/80 rounded-t-lg shadow-lg" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>

              {/* Floating Elements - Middle (Slight Blur, Medium Parallax) */}
              <div 
                ref={float1Ref}
                className="absolute top-20 right-10 bg-white p-4 rounded-2xl shadow-xl flex items-center space-x-3 transform translate-z-[50px] animate-bounce [animation-duration:3s]"
              >
                <div className="bg-green-100 p-2 rounded-lg"><CheckCircle2 className="w-6 h-6 text-green-600" /></div>
                <div>
                  <div className="text-xs text-gray-400 font-bold uppercase">Claim Approved</div>
                  <div className="text-lg font-bold text-slate-900">₹ 1,25,000</div>
                </div>
              </div>

              {/* Floating Elements - Background (Blurred, Slower Parallax) */}
              <div 
                ref={float2Ref}
                className="absolute bottom-20 left-0 bg-white/80 backdrop-blur-[2px] p-4 rounded-2xl shadow-xl flex items-center space-x-3 transform translate-z-[80px] animate-bounce [animation-duration:4s] blur-[0.5px]"
              >
                <div className="bg-blue-100 p-2 rounded-lg"><Users className="w-6 h-6 text-blue-900" /></div>
                <div>
                  <div className="text-xs text-gray-400 font-bold uppercase">Active Patients</div>
                  <div className="text-lg font-bold text-slate-900">4,832</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* NEW SECTION: Feature Slideshow */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl h-[500px] md:h-[350px]">
            {/* Slides */}
            {featureSlides.map((slide, index) => (
              <div 
                key={index} 
                className={`absolute inset-0 transition-all duration-700 ease-in-out flex items-center justify-center p-8 md:p-12 ${
                  index === activeSlide ? 'opacity-100 z-10 translate-x-0' : 'opacity-0 z-0 translate-x-10'
                }`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${slide.bg} opacity-20`}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
                
                {/* Content */}
                <div className="relative z-10 w-full grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="inline-flex items-center space-x-2 mb-2">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${slide.bg} flex items-center justify-center text-white shadow-lg`}>
                        <slide.icon className="w-6 h-6" />
                      </div>
                      <span className="text-blue-300 font-bold text-sm tracking-widest uppercase pl-2">Key Advantage</span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                      {slide.title}
                    </h2>
                    
                    <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
                      {slide.desc}
                    </p>
                  </div>
                  
                  {/* Visual / Graphic Placeholder for Right Side */}
                  <div className="hidden md:flex justify-end pr-8">
                     <div className={`w-full max-w-xs h-48 rounded-3xl bg-gradient-to-br ${slide.bg} opacity-30 blur-3xl rounded-full absolute right-0 top-1/2 -translate-y-1/2`}></div>
                     <div className="relative bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl w-80 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                        <div className="flex items-center space-x-4 mb-4">
                           <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${slide.bg}`}></div>
                           <div className="h-2 w-24 bg-white/20 rounded-full"></div>
                        </div>
                        <div className="space-y-3">
                           <div className="h-2 w-full bg-white/10 rounded-full"></div>
                           <div className="h-2 w-2/3 bg-white/10 rounded-full"></div>
                           <div className="h-20 w-full bg-white/5 rounded-xl mt-4 border border-white/5"></div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
              {featureSlides.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx === activeSlide ? 'w-12 bg-blue-500' : 'w-2 bg-slate-600 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* New Section: Process Journey 3D */}
      <section id="process" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle subtitle="Seamless Flow" title="The 3D Process Journey" />
          
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-200 via-blue-900 to-blue-200 hidden md:block -translate-y-1/2"></div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { title: 'Intimation', desc: 'Hospital logs claim instantly.', icon: Hospital },
                { title: 'AI Verification', desc: 'Docs scanned & validated.', icon: Cpu },
                { title: 'Processing', desc: 'TPA/Insurer approves.', icon: FileCheck },
                { title: 'Discharge', desc: 'Cashless exit in minutes.', icon: CheckCircle2 }
              ].map((step, i) => (
                <ScrollReveal key={i} delay={i * 200}>
                  <div className="relative group perspective-1000 h-full">
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transform transition-all duration-500 group-hover:rotate-y-[15deg] group-hover:rotate-x-[10deg] group-hover:shadow-[0_30px_60px_rgba(30,58,138,0.15)] h-full flex flex-col items-center text-center z-10 relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                        <step.icon className="w-10 h-10 text-blue-900 group-hover:animate-pulse" />
                      </div>
                      <div className="absolute -top-4 bg-blue-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                        {i + 1}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                      <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* New Section: Live Analytics */}
      <section id="analytics" className="py-32 bg-slate-900 text-white relative overflow-hidden perspective-1000">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-blue-400 font-bold tracking-widest uppercase text-xs mb-4 block">Data Intelligence</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Real-Time Insight Engine</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Watch claims process in real-time. Our 3D dashboard gives hospitals and insurers a bird's eye view of financial health, bottlenecks, and approval rates.
              </p>
              
              {/* New KPI Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <div className="flex items-center space-x-2 text-slate-400 mb-2">
                    <Timer className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">Avg. Settlement</span>
                  </div>
                  <div className="text-2xl font-bold text-white">45 Mins</div>
                  <div className="text-xs text-green-400 mt-1 flex items-center">
                    <TrendingDown className="w-3 h-3 mr-1" /> -85% vs Industry
                  </div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <div className="flex items-center space-x-2 text-slate-400 mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">Rejection Rate</span>
                  </div>
                  <div className="text-2xl font-bold text-white">1.2%</div>
                  <div className="text-xs text-green-400 mt-1 flex items-center">
                    <TrendingDown className="w-3 h-3 mr-1" /> Down from 15%
                  </div>
                </div>
              </div>

              {/* Pie Chart Card */}
              <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-3xl p-6 shadow-xl w-full max-w-sm">
                <h5 className="font-bold text-sm text-slate-300 mb-4 flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Claim Status Distribution</h5>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0)" />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', fontSize: '12px' }}
                        itemStyle={{ color: '#f8fafc' }}
                      />
                      <Legend 
                        verticalAlign="middle" 
                        layout="vertical" 
                        align="right"
                        iconSize={8}
                        formatter={(value) => <span className="text-slate-300 text-xs ml-1">{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="relative transform rotate-y-[-10deg] rotate-x-[5deg] transition-transform duration-700 hover:rotate-y-0 hover:rotate-x-0">
              <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                  <h4 className="font-bold text-lg flex items-center gap-2"><Activity className="w-5 h-5 text-green-400" /> Live Transaction Volume</h4>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              {/* Decorative BG Elements behind chart */}
              <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-blue-900/20 rounded-3xl blur-2xl transform translate-z-[-50px]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholders Section (Enhanced) */}
      <section id="stakeholders" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            subtitle="The Ecosystem" 
            title="Partners in Progress"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stakeholdersData.map((item, idx) => (
              <div key={idx} className="group perspective-1000 h-full">
                <div className="bg-white p-8 rounded-3xl h-full border border-slate-100 shadow-sm transition-all duration-500 transform group-hover:rotate-x-[5deg] group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-${item.color}-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                  <div className={`w-16 h-16 rounded-2xl bg-${item.color}-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{item.desc}</p>
                  
                  {/* Real-world Use Case */}
                  <div className="bg-slate-50 p-4 rounded-xl mb-6 mt-auto border border-slate-100">
                    <p className="text-xs text-slate-600 italic">"{item.useCase}"</p>
                  </div>

                  <button 
                    onClick={() => setIsJoinModalOpen(true)}
                    className="w-full py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Connect</span> <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Carousel (Glass Effect) */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle subtitle="Impact" title="Trusted by Industry Leaders" />
          <div className="bg-white/60 backdrop-blur-xl p-10 rounded-[3rem] border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative">
            <div className="absolute -top-6 -left-6 bg-blue-900 p-4 rounded-2xl shadow-lg transform rotate-[-10deg]">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            
            <div className="text-center">
              <p className="text-2xl text-slate-700 leading-relaxed font-medium mb-10 italic relative z-10">
                "{testimonials[activeTestimonial].quote}"
              </p>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-r from-blue-900 to-indigo-900 mb-4 shadow-lg">
                  <img 
                    src={testimonials[activeTestimonial].image} 
                    alt={testimonials[activeTestimonial].author}
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                  />
                </div>
                <h5 className="font-bold text-slate-900 text-lg">{testimonials[activeTestimonial].author}</h5>
                <p className="text-blue-900 text-sm font-bold uppercase tracking-wider">
                  {testimonials[activeTestimonial].role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section (Immersive) */}
      <section id="vision" className="py-24 bg-blue-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-blue-300 font-bold tracking-widest uppercase text-xs mb-4 block">Our DNA</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8">Architects of a Trust-Based Ecosystem</h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                We believe that in the middle of a health crisis, the last thing a family should worry about is a billing technicality.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                  <h4 className="text-4xl font-extrabold mb-2">20+</h4>
                  <p className="text-blue-200 text-sm font-bold uppercase">Years Experience</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                  <h4 className="text-4xl font-extrabold mb-2">PAN</h4>
                  <p className="text-blue-200 text-sm font-bold uppercase">India Presence</p>
                </div>
              </div>
            </div>
            <div className="relative group perspective-1000">
              <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 shadow-2xl transform transition-transform duration-700 group-hover:rotate-y-[10deg] group-hover:rotate-x-[-5deg]">
                <h3 className="text-2xl font-bold mb-6">The Leadership Voice</h3>
                <p className="text-blue-50 mb-8 text-lg leading-relaxed italic">
                  "ClaimNX is our promise to every Indian citizen that technology will be their shield when they are most vulnerable."
                </p>
                <div className="flex items-center space-x-5">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg">
                    <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200" alt="Founder" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-xl">Visionary Founders</p>
                    <p className="text-blue-300 text-sm font-medium">Tech Veterans</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Help Center" title="Frequently Asked Questions" />
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                >
                  <span className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors">{faq.q}</span>
                  <div className={`transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}>
                    <div className="bg-blue-50 p-2 rounded-full">
                      {openFaq === idx ? <Minus className="w-5 h-5 text-blue-900" /> : <Plus className="w-5 h-5 text-blue-900" />}
                    </div>
                  </div>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-8 text-slate-500 leading-relaxed animate-in slide-in-from-top-2 duration-300 border-t border-slate-50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-8 group cursor-default">
                <ShieldCheck className="text-blue-500 w-10 h-10 group-hover:rotate-[360deg] transition-transform duration-700" />
                <span className="text-4xl font-extrabold tracking-tight">
                  Claim<span className="text-blue-500">NX</span>
                </span>
              </div>
              <p className="text-slate-400 max-w-sm mb-10 text-lg leading-relaxed">
                India's leading healthcare IT platform for seamless cashless processing. Technology rooted in deep empathy.
              </p>
              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-900 hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-800 hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-8 text-lg text-white">Platform</h4>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li><a href="#process" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Process Journey</a></li>
                <li><a href="#analytics" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Live Analytics</a></li>
                <li><a href="#stakeholders" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-8 text-lg text-white">Company</h4>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li><a href="#vision" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Our Vision</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Contact</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-800 flex flex-col md:row justify-between items-center text-slate-500 text-sm font-medium">
            <p>&copy; 2026 ClaimNX Technologies India. All rights reserved.</p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <Globe className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              <Lock className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button (Enhanced) */}
      <div className="fixed bottom-8 right-8 z-50">
        {!isChatOpen ? (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="group relative bg-blue-900 hover:bg-blue-800 text-white p-5 rounded-full shadow-[0_20px_40px_rgba(30,58,138,0.4)] transition-all hover:scale-110 active:scale-95 flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
            <MessageSquare className="w-7 h-7 relative z-10" />
            <span className="absolute right-full mr-4 bg-white text-blue-900 px-4 py-2 rounded-xl font-bold text-sm shadow-xl opacity-0 group-hover:opacity-100 group-hover:right-[110%] transition-all whitespace-nowrap">
              Chat with AI
            </span>
          </button>
        ) : (
          <div className="bg-white w-[90vw] sm:w-[420px] rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[600px] animate-in slide-in-from-bottom-10 duration-500">
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-5 text-white flex justify-between items-center shadow-lg relative z-10">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-bold block text-lg leading-tight">ClaimNX AI</span>
                  <span className="text-[11px] text-blue-100 font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online
                  </span>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/20 p-2 rounded-full active:scale-90 transition-all"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50 scroll-smooth">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-md border-2 ${
                    msg.role === 'user' ? 'bg-white border-slate-200' : 'bg-gradient-to-br from-blue-900 to-indigo-900 border-transparent'
                  }`}>
                    {msg.role === 'user' ? <User className="w-5 h-5 text-slate-600" /> : <Activity className="w-5 h-5 text-white" />}
                  </div>
                  <div className={`max-w-[75%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                      ? 'bg-blue-900 text-white rounded-tr-none shadow-blue-200' 
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1.5 font-bold tracking-tight uppercase opacity-70">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start space-x-3 animate-pulse">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-200 flex space-x-1.5 items-center">
                    <div className="w-2 h-2 bg-blue-900 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-900 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-blue-900 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 border-t border-slate-200 bg-white shadow-lg">
              <div className="flex items-center space-x-2 bg-slate-50 p-2 rounded-[1.5rem] border border-slate-200 focus-within:ring-2 focus-within:ring-blue-900/50 transition-all">
                <button 
                  onClick={toggleListening}
                  className={`p-3 rounded-full transition-all active:scale-90 ${
                    isListening 
                    ? 'bg-red-100 text-red-600 animate-pulse' 
                    : 'hover:bg-blue-100 text-slate-400 hover:text-blue-900'
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={isListening ? "Listening..." : "Type your message..."}
                  className="flex-1 bg-transparent text-sm focus:outline-none text-slate-800 placeholder:text-slate-400"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!userInput.trim()}
                  className="p-3 bg-blue-900 rounded-full text-white shadow-lg hover:bg-blue-800 active:scale-90 disabled:opacity-50 disabled:shadow-none transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {isListening && (
                <p className="text-[10px] text-red-500 font-bold mt-2 text-center uppercase tracking-widest animate-pulse">
                  Listening...
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
