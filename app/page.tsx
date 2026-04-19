"use client"

import React, { Suspense, useEffect, useRef,useState } from 'react';
import {motion} from "framer-motion";
import { Canvas } from '@react-three/fiber';
import {Tooth3D} from "../components/Tooth3D"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import {MobileNav} from "@/components/MobileNav.tsx";
import SkyDentalLoading from "../components/Loader.tsx"

gsap.registerPlugin(ScrollTrigger);
import {
    ChevronRight,
    Droplets,
    MapPin,
    MessageSquare,
    Moon,
    Phone,
    ShieldCheck,
    Sparkles,
    Stethoscope,
    Timer,
} from "lucide-react";
import { FaWhatsapp,FaFacebook,FaInstagram } from "react-icons/fa"

/**
 * COMPONENTS
 */

const Button = ({
                    children,
                    variant = 'primary',
                    className = "",
                      onClick
                }: {
    children: React.ReactNode,
    variant?: 'primary' | 'secondary' | 'tertiary',
    className?: string,
    onClick?: () => void
}) => {
    const baseStyles = "px-6 py-3 rounded-xl font-display font-medium transition-all duration-300 flex items-center justify-center gap-2";

    const variants = {
        primary: "signature-gradient text-white shadow-ambient hover:opacity-90",
        secondary: "bg-surface-container-lowest ghost-border text-primary hover:bg-surface-container-low focus:bg-surface-container-high",
        tertiary: "bg-transparent text-primary hover:text-primary/70 px-4"
    };

    return (
        <button className={`${baseStyles} ${variants[variant]} ${className}`} onClick={onClick}>
            {children}
        </button>
    );
};

const Chip = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase font-sans">
    {children}
  </span>
);

const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between glass"
        >
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center bg-primary rounded-lg text-white">
                    <Sparkles className="w-5 h-5" />
                </div>
                <span className="font-display font-bold text-lg tracking-tight">Sky Dental Cabinet</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                <a href="#hero" className="hover:text-primary/60 transition-colors">Hero</a>
                <a href="#tips" className="hover:text-primary/60 transition-colors">Tips</a>
                <a href="#services" className="hover:text-primary/60 transition-colors">Services</a>
                <a href="#contact" className="hover:text-primary/60 transition-colors">Contact</a>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="primary" className="hidden sm:flex py-2 px-5 text-sm"
                        onClick={()=>{
                            window.open("https://wa.me/+237683034005", "_blank")
                        }}>
                    Book Appointment
                </Button>
                <MobileNav />
            </div>
        </motion.nav>
    );
};

const Hero = () => {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const etherealRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!headingRef.current || !paragraphRef.current || !etherealRef.current) return;

        // Split text into characters for heading and lines for paragraph
        const headingSplit = new SplitType(headingRef.current, { types: 'chars' });
        const paragraphSplit = new SplitType(paragraphRef.current, { types: 'lines' });

        const ctx = gsap.context(() => {
            // 1. Ethereal Pulse Animation: Infinite subtle glow/scale pulse
            gsap.to(etherealRef.current, {
                scale: 1.05,
                opacity: 0.8,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // 2. Heading Animation: Staggered reveal with infinite loop
            const headingTL = gsap.timeline({
                repeat: -1,
                repeatDelay: 2
            });

            headingTL.from(headingSplit.chars, {
                opacity: 0,
                y: 20,
                rotateX: -90,
                stagger: 0.03,
                duration: 0.8,
                ease: "back.out(1.7)",
            })
                .to(headingSplit.chars, {
                    opacity: 0,
                    y: -10,
                    stagger: 0.02,
                    duration: 0.5,
                    ease: "power2.inOut",
                    delay: 4
                });

            // 3. Paragraph Animation: Fade in on lines from bottom to top (bottom-up)
            gsap.from(paragraphSplit.lines, {
                opacity: 0,
                y: 30, // Entrance from bottom
                stagger: 0.1,
                duration: 1.2,
                ease: "power3.out",
                delay: 0.6
            });
        });

        return () => {
            ctx.revert();
            headingSplit.revert();
            paragraphSplit.revert();
        };
    }, []);

    return (
        <section id="hero" className="min-h-screen pt-32 pb-20 px-6 overflow-hidden relative flex items-center justify-center">
            <div className="max-w-7xl mx-auto flex flex-col items-center lg:grid lg:grid-cols-2 gap-16">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left w-full px-4 md:px-0"
                >
                    <div className="space-y-4 w-full">
            <span
                ref={etherealRef}
                className="text-label-sm font-medium tracking-widest text-primary/60 uppercase border-l-2 border-primary/20 pl-4 block w-fit mx-auto lg:mx-0"
            >
              The Ethereal Clinic
            </span>
                        <h1
                            ref={headingRef}
                            className="text-4xl sm:text-5xl md:text-7xl font-semibold leading-[1.1] tracking-tight max-w-[15ch] mx-auto lg:mx-0 break-words overflow-hidden"
                        >
                            Elevating Oral Wellness to an Art Form.
                        </h1>
                        <p
                            ref={paragraphRef}
                            className="text-base sm:text-lg text-primary/70 max-w-sm sm:max-w-md leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0 overflow-hidden"
                        >
                            Experience precision dentistry in a calming, technologically advanced environment designed for your comfort and absolute confidence.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start w-full max-w-xs sm:max-w-none mx-auto lg:mx-0">
                        <Button variant="primary" className="w-full sm:w-auto" onClick={()=>{
                            window.open("https://wa.me/237683034005", "_blank")
                        }}>Schedule a Visit</Button>
                        <Button variant="secondary" className="w-full sm:w-auto">Explore Services</Button>
                    </div>
                </motion.div>

                <div
                    className="relative h-[500px] md:h-[700px] w-full flex items-center justify-center opacity-0 lg:opacity-100"
                >
                    {/* 3D Canvas is now global for scroll animations */}

                    {/* Accent decoration */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full signature-gradient opacity-10 blur-3xl"></div>
                    <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-secondary/10 blur-3xl"></div>
                </div>
            </div>
        </section>
    );
};

const TipsSection = () => {
    const tips = [
        {
            icon: <Droplets className="w-6 h-6" />,
            title: "Hydration & pH Balance",
            desc: "Water acts as a natural cleanser. Drinking consistently throughout the day neutralizes acidic environments that lead to enamel erosion.",
            color: "bg-surface-container-high"
        },
        {
            icon: <Timer className="w-6 h-6" />,
            title: "The 30-Minute Rule",
            desc: "Wait at least thirty minutes after consuming acidic foods or beverages before brushing to prevent mechanical wear on softened enamel.",
            color: "bg-surface-container-lowest shadow-ambient"
        },
        {
            icon: <Moon className="w-6 h-6" />,
            title: "Evening Ritual Prioritization",
            desc: "Saliva production decreases during sleep. Thorough flossing and brushing before bed is critical to prevent bacterial proliferation.",
            color: "bg-surface-container-high"
        }
    ];

    return (
        <section id="tips" className="py-24 px-6 bg-surface-container-low/30">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                <motion.div
                    className="order-2 lg:order-1"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="relative rounded-2xl overflow-hidden shadow-ambient">
                        <img
                            src="https://picsum.photos/seed/doctor-smile/800/1000"
                            alt="Professional Specialist"
                            className="w-full aspect-[4/5] object-cover"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-primary/80 to-transparent text-white">
                            <p className="font-display text-xl font-medium">Dr. Mbe Sandra</p>
                            <p className="text-white/70 text-sm">Lead Aesthetic Dentist</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="order-1 lg:order-2 space-y-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="space-y-4">
                        <h2 className="text-4xl font-semibold tracking-tight">The Science of a Radiant Smile</h2>
                        <p className="text-primary/70 leading-relaxed max-w-md">
                            Our philosophy extends beyond the clinic. Maintaining optimal oral health requires daily dedication to these fundamental practices.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {tips.map((tip, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`${tip.color} p-8 rounded-2xl flex gap-6 items-start hover:scale-[1.02] transition-all duration-300 group`}
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                                    {tip.icon}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-display font-semibold text-lg">{tip.title}</h3>
                                    <p className="text-primary/60 text-sm leading-relaxed">{tip.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const ServicesGrid = () => {
    const services = [
        { title: "Precision Cleaning", tag: "Diagnostic", icon: <Sparkles /> },
        { title: "Invisalign Platinum", tag: "Aspiration", icon: <ShieldCheck /> },
        { title: "3D Digital Scanning", tag: "Technology", icon: <Timer /> },
        { title: "Porcelain Veneers", tag: "Aspiration", icon: <Sparkles /> },
        { title: "Laser Periodontics", tag: "Technology", icon: <Stethoscope /> },
        { title: "Integrative Wellness", tag: "Holistic", icon: <Droplets /> },
    ];

    return (
        <section id="services" className="py-32 px-6">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-semibold tracking-tight">Curated Specialty Services</h2>
                        <p className="text-primary/60 max-w-md">Bespoke treatments tailored to your unique anatomical needs and aesthetic aspirations.</p>
                    </div>
                    <Button variant="tertiary" className="group">
                        View All Services <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="p-10 rounded-2xl bg-surface-container-low hover:bg-surface-container-lowest transition-all duration-500 hover:shadow-ambient group relative"
                        >
                            <div className="flex justify-between items-start mb-12">
                                <div className="text-primary/40 group-hover:text-primary transition-colors duration-500">
                                    {service.icon}
                                </div>
                                {service.tag === "Aspiration" && <Chip>Premium</Chip>}
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                            <p className="text-sm text-primary/50 group-hover:text-primary/70 transition-colors duration-500">
                                Utilizing {service.tag.toLowerCase()} protocols for superior outcomes.
                            </p>

                            {/* Invisible Ghost Border Fallback */}
                            <div className="absolute inset-0 rounded-2xl ghost-border pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ContactNewsletter = () => {
    return (
        <section id="contact" className="py-32 px-6 overflow-hidden relative">
            <div className="max-w-4xl mx-auto text-center space-y-12">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">Curated Oral Wellness Insights</h2>
                    <p className="text-primary/60">Join our exclusive newsletter for advanced dental care tips, new service announcements, and clinic updates.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                    <input
                        type="email"
                        placeholder="Your Email Address"
                        className="flex-1 px-6 py-4 rounded-xl bg-surface-container-low border-b-2 border-transparent focus:border-primary focus:outline-none transition-all duration-300"
                    />
                    <Button variant="primary" className="py-4">Subscribe</Button>
                </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="py-20 px-6 border-t border-outline-variant/10 ">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="grid md:grid-cols-4 gap-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-primary" />
                            <span className="font-display font-bold text-lg tracking-tight uppercase">Sky Dental Cabinet</span>
                        </div>
                        <p className="text-xs text-primary/50 leading-relaxed uppercase tracking-wider">
                            © {new Date().getFullYear()} SKY DENTAL CABINET. ELEVATING ORAL WELLNESS THROUGH ARCHITECTURAL PRECISION.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary/40">Practice</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Accessibility</a></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary/40">Patient Care</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a href="#" className="hover:text-primary transition-colors">Emergency Care</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Patient Portal</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Financial Options</a></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary/40">Connect</h4>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">
                                <FaInstagram className="w-4 h-4" />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">
                                <FaWhatsapp className="w-4 h-4" />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">
                                <FaFacebook className="w-4 h-4" />
                            </div>
                        </div>
                        <a href="tel:+237683034005" className="flex items-center gap-3 text-sm font-medium p-4 rounded-xl bg-surface-container-low/50">
                            <Phone className="w-4 h-4 text-primary" />
                            <span>+237 683 034 005</span>
                        </a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-outline-variant/10 text-[10px] font-mono uppercase tracking-[0.2em] text-primary/30">
                    <p>© {new Date().getFullYear()} Sky Dental Cabinet. All rights reserved.</p>
                    <div className="flex gap-8">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3" />
                            <span>Tropicana face Hotel..., Yaounde</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MessageSquare className="w-3 h-3" />
                            <span>care@skydental.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default function Layout() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const handleLoad = () => setIsLoading(false);

        if (document.readyState === 'complete') {
            const timer = setTimeout(() => setIsLoading(false), 800);
            return () => clearTimeout(timer);
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, []);

    if (isLoading) {
        return  <SkyDentalLoading/>
    }

    return (
        <div className="min-h-screen selection:bg-primary/10 selection:text-primary relative">
            <div className="fixed inset-0 z-40 pointer-events-none">
                <Canvas shadows dpr={[1, 2]}
                        style={{ pointerEvents: "none" }}>
                    <Suspense fallback={null}>
                        <Tooth3D />
                    </Suspense>
                </Canvas>
            </div>

            <Navbar />
            <main className="relative z-10">
                <Hero />
                <TipsSection />
                <ServicesGrid />
                <ContactNewsletter />
            </main>
            <Footer />
        </div>
    );
}