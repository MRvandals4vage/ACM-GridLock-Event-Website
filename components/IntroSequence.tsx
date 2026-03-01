'use client';

import React, { useRef, useEffect, useState } from 'react';

interface IntroSequenceProps {
    onComplete: () => void;
}

const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
    const introVideoRef = useRef<HTMLVideoElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle intro video end
    useEffect(() => {
        const introVideo = introVideoRef.current;
        if (!introVideo) return;

        const handleIntroEnd = () => {
            setIsComplete(true);
            // Delay to allow fade out animation
            setTimeout(() => {
                onComplete();
            }, 400); // 400ms fade out
        };

        introVideo.addEventListener('ended', handleIntroEnd);

        return () => {
            introVideo.removeEventListener('ended', handleIntroEnd);
        };
    }, [onComplete]);

    // Play intro video when component mounts at 1.5x speed
    useEffect(() => {
        const introVideo = introVideoRef.current;
        if (introVideo) {
            // Start PC intro from 4 seconds
            if (!isMobile) {
                introVideo.currentTime = 4;
            }
            introVideo.playbackRate = 1.5; // 1.5x speed for intro
            introVideo.play().catch(err => {
                console.log('Intro autoplay prevented:', err);
            });
        }
    }, [isMobile]);

    return (
        <div
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-[400ms]"
            style={{
                opacity: isComplete ? 0 : 1,
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }}
        >
            {/* Intro Video - High Quality */}
            <video
                ref={introVideoRef}
                src={isMobile ? '/assets/animations/intro for mobile.mp4' : '/assets/animations/intro for pc.mp4'}
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
                style={{ imageRendering: 'auto' }}
            />

            {/* Skip button */}
            <button
                onClick={() => {
                    setIsComplete(true);
                    setTimeout(onComplete, 400);
                }}
                className="absolute bottom-8 right-8 px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-lg backdrop-blur-sm transition-all duration-300 font-orbitron text-sm tracking-wider"
            >
                SKIP INTRO
            </button>
        </div>
    );
};

export default IntroSequence;
