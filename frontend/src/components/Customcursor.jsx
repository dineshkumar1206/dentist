import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CustomCursor
 * ─────────────────────────────────────────────────────────────
 * Drop this component near the root of your app (e.g., App.jsx).
 * * Behavior:
 * • Default: Native OS cursor is VISIBLE. A blue dot follows it with a fluid lag.
 * • Heading Hover: Dot expands into a full dark-inverting circle behind the text.
 */
export default function CustomCursor() {
  // ── Mouse Position ──────────────────────────────────────────
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring physics (provides the signature lag feel)
  const cursorX = useSpring(mouseX, { stiffness: 350, damping: 25, mass: 0.6 });
  const cursorY = useSpring(mouseY, { stiffness: 350, damping: 25, mass: 0.6 });

  // ── States ───────────────────────────────────────────────────
  const [isHeadingHovered, setIsHeadingHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // ── Track Mouse Movements ────────────────────────────────────
  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // ── Heading Hover Detection ──────────────────────────────────
  useEffect(() => {
    const isHeading = (el) => {
      if (!el) return false;
      const tag = el.tagName?.toLowerCase();
      if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag)) return true;
      if (el.dataset?.cursor === "heading") return true;

      // Check up to 3 parent levels to catch text spans inside headings
      let parent = el.parentElement;
      for (let i = 0; i < 3; i++) {
        if (!parent) break;
        const parentTag = parent.tagName?.toLowerCase();
        if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(parentTag)) return true;
        if (parent.dataset?.cursor === "heading") return true;
        parent = parent.parentElement;
      }
      return false;
    };

    const onMouseOver = (e) => {
      setIsHeadingHovered(isHeading(e.target));
    };

    window.addEventListener("mouseover", onMouseOver);
    return () => window.removeEventListener("mouseover", onMouseOver);
  }, []);

  // ── Dynamic Dimensions & Styles ──────────────────────────────
  const size = isHeadingHovered ? 60 : 12; 
  
  // Custom blend adjustments:
  // Default tracking blue dot. On hover, it turns white combined with "difference" 
  // to perfectly mask/invert the text under it.
  const background = isHeadingHovered ? "#ffffff" : "#2072b4"; 
  const mixBlendMode = isHeadingHovered ? "difference" : "normal";

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        pointerEvents: "none", // Ensures it doesn't block clicks or mouse events
        zIndex: 9999, // Layered below the native pointer but above text
        borderRadius: "50%",
        mixBlendMode: mixBlendMode,
        width: size,
        height: size,
        background: background,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        width: { type: "spring", stiffness: 300, damping: 25 },
        height: { type: "spring", stiffness: 300, damping: 25 },
        opacity: { duration: 0.15 },
        background: { duration: 0.15 },
      }}
    />
  );
}