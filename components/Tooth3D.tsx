import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, PerspectiveCamera, ContactShadows, useGLTF, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const MODEL_URL = "https://res.cloudinary.com/dcihzr5rr/image/upload/v1776529588/y24SRyEMrb2G0ZJSe_XP9_model_zrtbws.glb";

export const Tooth3D = () => {
    const toothRefL = useRef<THREE.Group>(null);
    const toothRefR = useRef<THREE.Group>(null);
    const idleRefL = useRef<THREE.Group>(null);
    const idleRefR = useRef<THREE.Group>(null);

    const { scene } = useGLTF(MODEL_URL);
    const { size } = useThree();

    const isMobile = size.width < 768;
    const isTablet = size.width >= 768 && size.width < 1024;

    useEffect(() => {
        if (!toothRefL.current || !toothRefR.current) return;

        // Clone the scene for the second tooth
        const scene2 = scene.clone();

        // Set initial overlapping position and scale
        const startX = isMobile ? 0 : (isTablet ? 1.5 : 2.8);
        const startY = isMobile ? -5.5 : (isTablet ? -2.5 : 0);
        const startScale = isMobile ? 5.2 : 6.2;

        [toothRefL, toothRefR].forEach(ref => {
            if (ref.current) {
                gsap.set(ref.current.position, { x: startX, y: startY, z: 0 });
                gsap.set(ref.current.scale, { x: startScale, y: startScale, z: startScale });
            }
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                endTrigger: "footer", // Journey till the end
                end: "bottom bottom",
                scrub: 1.2,
            }
        });

        // --- PHASE 1: Hero Experience (One Unified Tooth) ---
        tl.to([toothRefL.current.scale, toothRefR.current.scale], {
            x: isMobile ? 6.5 : 8.5,
            y: isMobile ? 6.5 : 8.5,
            z: isMobile ? 6.5 : 8.5,
            duration: 1,
            ease: "power2.inOut"
        });

        tl.to([toothRefL.current.position, toothRefR.current.position], {
            y: isMobile ? 1.5 : (isTablet ? 2 : 2.5),
            duration: 1,
            ease: "power2.inOut"
        }, "<");

        // --- PHASE 2: Transition to Tips (Split and Position) ---
        // At the end of Tips section, they are at the left edge
        const midX = isMobile ? -1.1 : (isTablet ? -2.2 : -4.5);
        const midY = isMobile ? -4.5 : (isTablet ? -3 : -1.8);

        tl.to([toothRefL.current.rotation, toothRefR.current.rotation], {
            y: Math.PI * 2,
            z: 0.3,
            duration: 2,
            ease: "expo.inOut"
        });

        tl.to([toothRefL.current.position, toothRefR.current.position], {
            x: midX,
            y: midY,
            duration: 2,
            ease: "expo.inOut"
        }, "<");

        tl.to([toothRefL.current.scale, toothRefR.current.scale], {
            x: isMobile ? 3.5 : (isTablet ? 3.8 : 4.2),
            y: isMobile ? 3.5 : (isTablet ? 3.8 : 4.2),
            z: isMobile ? 3.5 : (isTablet ? 3.8 : 4.2),
            duration: 1.5,
            ease: "power2.out"
        });

        // --- PHASE 3: Continuous DNA Helix Animation (Services to Footer) ---
        const exchangeSpread = isMobile ? 1.5 : (isTablet ? 3.5 : 5.8);
        const helixDepth = 2.5; // Depth to simulate 3D rotation

        // Starting the DNA journey immediately after the Tips section positioning
        // Crossover 1: R moves Front-Right, L moves Back-Left
        tl.to(toothRefR.current.position, {
            x: exchangeSpread,
            z: helixDepth,
            y: -6,
            duration: 3,
            ease: "sine.inOut"
        }, ">");
        tl.to(toothRefL.current.position, {
            x: -exchangeSpread,
            z: -helixDepth,
            y: -6,
            duration: 3,
            ease: "sine.inOut"
        }, "<");

        // Crossover 2: R moves Back-Left, L moves Front-Right (Twist 1 complete)
        tl.to(toothRefR.current.position, {
            x: -exchangeSpread,
            z: -helixDepth,
            y: -9,
            duration: 3,
            ease: "sine.inOut"
        }, ">");
        tl.to(toothRefL.current.position, {
            x: exchangeSpread,
            z: helixDepth,
            y: -9,
            duration: 3,
            ease: "sine.inOut"
        }, "<");

        // Crossover 3: R moves Front-Right, L moves Back-Left (Twist 2 complete)
        tl.to(toothRefR.current.position, {
            x: exchangeSpread,
            z: helixDepth,
            y: -12,
            duration: 3,
            ease: "sine.inOut"
        }, ">");
        tl.to(toothRefL.current.position, {
            x: -exchangeSpread,
            z: -helixDepth,
            y: -12,
            duration: 3,
            ease: "sine.inOut"
        }, "<");

        // Gradually scale them down as they approach the footer
        tl.to([toothRefL.current.scale, toothRefR.current.scale], {
            x: isMobile ? 2.8 : 3.5,
            y: isMobile ? 2.8 : 3.5,
            z: isMobile ? 2.8 : 3.5,
            duration: 9, // Spans the entire DNA journey
            ease: "power1.inOut"
        }, "<-6"); // Start when the DNA journey starts

        // Final Exit Positioning (Settling near footer)
        tl.to([toothRefL.current.position, toothRefR.current.position], {
            y: -15,
            z: 0,
            duration: 2,
            ease: "power1.in"
        });

        return () => {
            tl.kill();
        };
    }, [isMobile, isTablet, scene]);

    useFrame((state) => {
        if (idleRefL.current) idleRefL.current.rotation.y += 0.005;
        if (idleRefR.current) idleRefR.current.rotation.y += 0.005;
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, isMobile ? 8 : 7.5]} />

            <PresentationControls
                global
                snap
                rotation={[0, 0, 0]}
                polar={[-Math.PI * 0.75, Math.PI * 0.75]}
                azimuth={[-Math.PI * 0.75, Math.PI * 0.75]}
            >
                <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.15}>
                    {/* Pair of interactive teeth */}
                    <group ref={toothRefL}>
                        <group ref={idleRefL}>
                            <primitive object={scene} />
                        </group>
                    </group>

                    <group ref={toothRefR}>
                        <group ref={idleRefR}>
                            <primitive object={scene.clone()} />
                        </group>
                    </group>
                </Float>
            </PresentationControls>

            <ContactShadows
                position={[0, -3.2, 0]}
                opacity={0.4}
                scale={15}
                blur={2.8}
                far={8}
            />

            {/* Ultra-Bright Professional Lighting System */}
            <ambientLight intensity={3.5} />
            {/* Prime Key Lights - Dynamic angles for maximum visibility */}
            <directionalLight position={[0, 15, 12]} intensity={7.0} color="#ffffff" />
            <directionalLight position={[10, 10, 5]} intensity={4.5} color="#ffffff" />
            <directionalLight position={[-10, 10, 5]} intensity={4.5} color="#ffffff" />
            {/* Focal Point Spotlights */}
            <pointLight position={[0, 0, 12]} intensity={7.0} color="#ffffff" />
        </>
    );
};

useGLTF.preload(MODEL_URL);
