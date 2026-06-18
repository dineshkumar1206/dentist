import { useRef } from 'react';

const ImageGlareHover = ({
  children,
  width = '100%',
  height = 'auto',
  borderRadius = '12px',
  glareColor = '#ffffff',
  glareOpacity = 0.4,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 600,
  playOnce = false,
  className = '',
  style = {}
}) => {
  // Convert hex color to rgba to apply opacity correctly
  const hex = glareColor.replace('#', '');
  let rgba = glareColor;
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[\dA-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  const overlayRef = useRef(null);

  const animateIn = () => {
    const el = overlayRef.current;
    if (!el) return;

    el.style.transition = 'none';
    el.style.backgroundPosition = '-100% -100%, 0 0';
    // Force a reflow so the browser registers the reset before animating
    void el.offsetHeight; 
    el.style.transition = `${transitionDuration}ms ease`;
    el.style.backgroundPosition = '100% 100%, 0 0';
  };

  const animateOut = () => {
    const el = overlayRef.current;
    if (!el) return;

    if (playOnce) {
      el.style.transition = 'none';
      el.style.backgroundPosition = '-100% -100%, 0 0';
    } else {
      el.style.transition = `${transitionDuration}ms ease`;
      el.style.backgroundPosition = '-100% -100%, 0 0';
    }
  };

  const overlayStyle = {
    position: 'absolute',
    inset: 0,
    zIndex: 10, // Ensures glare sits over the image content
    background: `linear-gradient(${glareAngle}deg,
        rgba(255,255,255,0) 40%,
        ${rgba} 50%,
        rgba(255,255,255,0) 60%)`,
    backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '-100% -100%, 0 0',
    pointerEvents: 'none'
  };

  return (
    <div
      className={`relative inline-block overflow-hidden cursor-pointer select-none ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style
      }}
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
    >
      {/* Glare Overlay */}
      <div ref={overlayRef} style={overlayStyle} />
      
      {/* Target Image or Image Component */}
      {children}
    </div>
  );
};

export default ImageGlareHover;