"use client";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { HoverBorderGradient } from "@/components/hover-border-gradient";
import { Link } from "react-router-dom";

const beams = [
    {
        initialX: 10,
        translateX: 10,
        duration: 7,
        repeatDelay: 3,
        delay: 2,
    },
    {
        initialX: 600,
        translateX: 600,
        duration: 3,
        repeatDelay: 3,
        delay: 4,
    },
    {
        initialX: 100,
        translateX: 100,
        duration: 7,
        repeatDelay: 7,
        className: "h-6",
    },
    {
        initialX: 400,
        translateX: 400,
        duration: 5,
        repeatDelay: 14,
        delay: 4,
    },
    {
        initialX: 800,
        translateX: 800,
        duration: 11,
        repeatDelay: 2,
        className: "h-20",
    },
    {
        initialX: 1000,
        translateX: 1000,
        duration: 4,
        repeatDelay: 2,
        className: "h-12",
    },
    {
        initialX: 1200,
        translateX: 1200,
        duration: 6,
        repeatDelay: 4,
        delay: 2,
        className: "h-6",
    },
];

interface HomeProps {
    className?: string;
    children?: React.ReactNode;
}

const Home: React.FC<HomeProps> = ({ className }) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={parentRef}
            className={cn(
                "h-96 md:h-[calc(100vh-56px)] bg-gradient-to-b from-gray-700 to-gray-900 dark:from-neutral-950 dark:to-neutral-800 relative flex items-center w-full justify-center overflow-hidden",
                className
            )}
        >
            {beams.map((beam, index) => (
                <CollisionMechanism
                    key={`${beam.initialX}-beam-${index}`}
                    beamOptions={beam}
                    containerRef={containerRef}
                    parentRef={parentRef}
                />
            ))}

            <div className="flex flex-col gap-10 justify-center items-center">
                <div className="flex items-center justify-center">
                    <HoverBorderGradient
                        containerClassName="rounded-full"
                        as="button"
                    >
                        <span>A Web baded Code Compiler </span>
                    </HoverBorderGradient>
                </div>
                <h2 className="relative flex-col md:flex-row z-10 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white flex items-center gap-2 md:gap-8">
                    <span>Compile</span>
                    <span className="text-white text-lg font-thin">x</span>
                    <span>Code</span>
                    <span className="text-white text-lg font-thin">x</span>
                    <span>Create</span>
                </h2>

                <div className="w-1/2 text-center leading-6 text-gray-400 text-sm">
                    A powerful online compiler platform that allows you to
                    write, compile, and test HTML, CSS, and JavaScript code
                    instantly. Build and preview web projects in real time with
                    an intuitive editor, syntax highlighting, and live error
                    detection
                </div>

                <div className="flex gap-10">
                    <button className="relative inline-flex h-12 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                            <Link to="/login">Get Started</Link>
                        </span>
                    </button>

                    <button className="relative inline-flex h-12 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        <Link to="/compiler">Go to compiler ( no login )</Link>
                        </span>
                    </button>
                </div>
            </div>
            <div
                ref={containerRef}
                className="absolute bottom-0 bg-neutral-100 w-full inset-x-0 pointer-events-none"
                style={{
                    boxShadow:
                        "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
                }}
            ></div>
        </div>
    );
};

interface CollisionMechanismProps {
    containerRef: React.RefObject<HTMLDivElement>;
    parentRef: React.RefObject<HTMLDivElement>;
    beamOptions?: {
        initialX?: number;
        translateX?: number;
        initialY?: number;
        translateY?: number;
        rotate?: number;
        className?: string;
        duration?: number;
        delay?: number;
        repeatDelay?: number;
    };
}

const CollisionMechanism: React.FC<CollisionMechanismProps> = React.forwardRef(
    ({ parentRef, containerRef, beamOptions = {} }) => {
        const beamRef = useRef<HTMLDivElement>(null);
        const [collision, setCollision] = React.useState<{
            detected: boolean;
            coordinates: { x: number; y: number } | null;
        }>({
            detected: false,
            coordinates: null,
        });
        const [beamKey, setBeamKey] = React.useState(0);
        const [cycleCollisionDetected, setCycleCollisionDetected] =
            React.useState(false);

        React.useEffect(() => {
            const checkCollision = () => {
                if (
                    beamRef.current &&
                    containerRef.current &&
                    parentRef.current &&
                    !cycleCollisionDetected
                ) {
                    const beamRect = beamRef.current.getBoundingClientRect();
                    const containerRect =
                        containerRef.current.getBoundingClientRect();
                    const parentRect =
                        parentRef.current.getBoundingClientRect();

                    if (beamRect.bottom >= containerRect.top) {
                        const relativeX =
                            beamRect.left -
                            parentRect.left +
                            beamRect.width / 2;
                        const relativeY = beamRect.bottom - parentRect.top;

                        setCollision({
                            detected: true,
                            coordinates: {
                                x: relativeX,
                                y: relativeY,
                            },
                        });
                        setCycleCollisionDetected(true);
                    }
                }
            };

            const animationInterval = setInterval(checkCollision, 50);

            return () => clearInterval(animationInterval);
        }, [cycleCollisionDetected, containerRef, parentRef]);

        React.useEffect(() => {
            if (collision.detected && collision.coordinates) {
                setTimeout(() => {
                    setCollision({ detected: false, coordinates: null });
                    setCycleCollisionDetected(false);
                }, 2000);

                setTimeout(() => {
                    setBeamKey((prevKey) => prevKey + 1);
                }, 2000);
            }
        }, [collision]);

        return (
            <>
                <motion.div
                    key={beamKey}
                    ref={beamRef}
                    animate="animate"
                    initial={{
                        translateY: beamOptions.initialY || "-200px",
                        translateX: beamOptions.initialX || "0px",
                        rotate: beamOptions.rotate || 0,
                    }}
                    variants={{
                        animate: {
                            translateY: beamOptions.translateY || "1800px",
                            translateX: beamOptions.translateX || "0px",
                            rotate: beamOptions.rotate || 0,
                        },
                    }}
                    transition={{
                        duration: beamOptions.duration || 8,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                        delay: beamOptions.delay || 0,
                        repeatDelay: beamOptions.repeatDelay || 0,
                    }}
                    className={cn(
                        "absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent",
                        beamOptions.className
                    )}
                />
                <AnimatePresence>
                    {collision.detected && collision.coordinates && (
                        <Explosion
                            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
                            style={{
                                left: `${collision.coordinates.x}px`,
                                top: `${collision.coordinates.y}px`,
                                transform: "translate(-50%, -50%)",
                            }}
                        />
                    )}
                </AnimatePresence>
            </>
        );
    }
);

CollisionMechanism.displayName = "CollisionMechanism";

type ExplosionProps = React.HTMLProps<HTMLDivElement>

const Explosion: React.FC<ExplosionProps> = ({ ...props }) => {
    const spans = Array.from({ length: 20 }, (_, index) => ({
        id: index,
        initialX: 0,
        initialY: 0,
        directionX: Math.floor(Math.random() * 80 - 40),
        directionY: Math.floor(Math.random() * -50 - 10),
    }));

    return (
        <div
            {...props}
            className={cn("absolute z-50 h-2 w-2", props.className)}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
            ></motion.div>
            {spans.map((span) => (
                <motion.span
                    key={span.id}
                    initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
                    animate={{
                        x: span.directionX,
                        y: span.directionY,
                        opacity: 0,
                    }}
                    transition={{
                        duration: Math.random() * 1.5 + 0.5,
                        ease: "easeOut",
                    }}
                    className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"
                />
            ))}
        </div>
    );
};

export default Home;
