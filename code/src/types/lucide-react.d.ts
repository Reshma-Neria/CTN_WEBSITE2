declare module 'lucide-react' {
  import { SVGProps } from 'react';
  
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
  }
  
  export const Check: React.FC<IconProps>;
  export const Zap: React.FC<IconProps>;
  export const Server: React.FC<IconProps>;
  export const ArrowRight: React.FC<IconProps>;
  export const Wifi: React.FC<IconProps>;
  export const Shield: React.FC<IconProps>;
  export const Users: React.FC<IconProps>;
  export const Target: React.FC<IconProps>;
  export const Award: React.FC<IconProps>;
  export const Globe: React.FC<IconProps>;
  export const Mail: React.FC<IconProps>;
  export const Phone: React.FC<IconProps>;
  export const MapPin: React.FC<IconProps>;
  export const Clock: React.FC<IconProps>;
  export const Send: React.FC<IconProps>;
  export const Menu: React.FC<IconProps>;
  export const X: React.FC<IconProps>;
  export const Search: React.FC<IconProps>;
  export const Facebook: React.FC<IconProps>;
  export const Twitter: React.FC<IconProps>;
  export const Instagram: React.FC<IconProps>;
  export const Linkedin: React.FC<IconProps>;
  // Add other icons as needed
}
