"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const navLinks = [
    { label: "Hero",     href: "#hero" },
    { label: "Tips",     href: "#tips" },
    { label: "Services", href: "#services" },
    { label: "Contact",  href: "#contact" },
];

export const MobileNav = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Hamburger toggle — only visible on mobile */}
            <button
                className="md:hidden relative z-[60] p-2 rounded-lg hover:bg-surface-container-low transition-colors"
                onClick={() => setOpen(prev => !prev)}
                aria-label="Toggle navigation"
            >
                <AnimatePresence mode="wait" initial={false}>
                    {open ? (
                        <motion.span
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0,   opacity: 1 }}
                            exit={{   rotate:  90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.span>
                    ) : (
                        <motion.span
                            key="open"
                            initial={{ rotate:  90, opacity: 0 }}
                            animate={{ rotate: 0,   opacity: 1 }}
                            exit={{   rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Menu className="w-6 h-6" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </button>

            {/* Slide-in drawer */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 z-[45] bg-primary/10 backdrop-blur-sm md:hidden"
                            onClick={() => setOpen(false)}
                        />

                        {/* Drawer panel */}
                        <motion.div
                            key="drawer"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 320, damping: 32 }}
                            className="fixed top-0 right-0 bottom-0 z-[50] w-full glass md:hidden flex flex-col"
                        >
                            {/* Drawer header */}
                            <div className="flex items-center bg-surface gap-2 px-6 py-5 border-b border-outline-variant/10">
                                <div className="w-7 h-7 flex items-center justify-center bg-primary rounded-lg text-white">
                                    <Sparkles className="w-4 h-4" />
                                </div>
                                <span className="font-display font-bold tracking-tight">Sky Dental Cabinet</span>
                            </div>

                            {/* Nav links */}
                            <nav className="flex flex-col px-4 py-6 gap-1 flex-1 bg-surface">
                                {navLinks.map((link, i) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        initial={{ opacity: 0, x: 24 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.06 + i * 0.07, duration: 0.3, ease: "easeOut" }}
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl font-display font-medium text-sm hover:bg-surface-container-low transition-colors group"
                                    >
                                        {/* Active indicator dot */}
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors shrink-0" />
                                        {link.label}
                                    </motion.a>
                                ))}
                            </nav>

                            {/* CTA at bottom */}
                            <div className="px-6 py-6 border-t border-outline-variant/10 bg-surface">
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.36, duration: 0.3 }}
                                    className="w-full px-6 py-3 rounded-xl font-display font-medium signature-gradient text-white shadow-ambient hover:opacity-90 transition-opacity"
                                    onClick={() => {
                                            window.open("https://wa.me/+237683034005", "_blank")
                                        setOpen(false)
                                    }}
                                >
                                    Book Appointment
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};