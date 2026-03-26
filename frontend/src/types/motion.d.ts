declare module 'motion/react' {
  import * as React from 'react';
  
  export interface MotionProps extends React.HTMLAttributes<HTMLElement> {
    initial?: any;
    animate?: any;
    whileInView?: any;
    viewport?: any;
    transition?: any;
    exit?: any;
    variants?: any;
    custom?: any;
    layout?: any;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }
  
  export interface AnimatePresenceProps {
    children?: React.ReactNode;
    initial?: boolean;
    custom?: any;
    mode?: 'sync' | 'wait' | 'popLayout';
  }

  export const motion: {
    div: React.ForwardRefExoticComponent<MotionProps>;
    section: React.ForwardRefExoticComponent<MotionProps>;
    img: React.ForwardRefExoticComponent<
      MotionProps & React.ImgHTMLAttributes<HTMLImageElement>
    >;
    [key: string]: React.ForwardRefExoticComponent<MotionProps>;
  };

  export const AnimatePresence: React.FC<AnimatePresenceProps>;
}
