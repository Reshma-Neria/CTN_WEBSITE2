declare module 'react-router' {
  import { ComponentType } from 'react';
  
  export interface RouterProviderProps {
    router: any;
  }
  
  export const RouterProvider: React.FC<RouterProviderProps>;
  export const createBrowserRouter: (routes: any[]) => any;
  export const Link: React.FC<{ to: string; className?: string; children?: React.ReactNode }>;
  export const useLocation: () => { pathname: string };
  export const Outlet: React.FC;
}
