declare module 'motion/react' {
  import * as React from 'react';
  
  export interface MotionProps extends React.ComponentProps<'div'> {
    initial?: any;
    animate?: any;
    whileInView?: any;
    viewport?: any;
    transition?: any;
    exit?: any;
  }
  
  export const motion: {
    div: React.ForwardRefExoticComponent<MotionProps>;
    [key: string]: React.ForwardRefExoticComponent<MotionProps>;
  };
}
