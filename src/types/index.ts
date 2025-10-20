export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export type ToastPosition = 
  | 'top-left' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-right' 
  | 'top-center' 
  | 'bottom-center';

export interface ToastOptions {
  type?: ToastType;
  position?: ToastPosition;
  autoClose?: number | false;
  pauseOnHover?: boolean;
  draggable?: boolean;
  closeButton?: boolean;
  progressBar?: boolean;
  theme?: 'light' | 'dark' | 'colored';
  transition?: 'bounce' | 'slide' | 'zoom' | 'flip';
  icon?: React.ReactNode | false;
  className?: string;
  bodyClassName?: string;
  progressClassName?: string;
  style?: React.CSSProperties;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface ToastData extends ToastOptions {
  id: string;
  message: string | React.ReactNode;
  type: ToastType;
  createdAt: number;
  isClosing?: boolean;
}

export interface ToastContainerProps {
  position?: ToastPosition;
  autoClose?: number | false;
  pauseOnHover?: boolean;
  draggable?: boolean;
  closeButton?: boolean;
  progressBar?: boolean;
  theme?: 'light' | 'dark' | 'colored';
  transition?: 'bounce' | 'slide' | 'zoom' | 'flip';
  limit?: number;
  newestOnTop?: boolean;
  className?: string;
  style?: React.CSSProperties;
}