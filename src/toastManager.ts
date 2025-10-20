import { ToastData, ToastOptions, ToastType } from './types';

type Listener = (toasts: ToastData[]) => void;

class ToastManager {
  private toasts: ToastData[] = [];
  private listeners: Listener[] = [];

  subscribe(listener: Listener): () => void {
    this.listeners.push(listener);
    listener(this.toasts);
    
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.toasts));
  }

  private generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private addToast(message: string | React.ReactNode, type: ToastType, options?: ToastOptions): string {
    const id = this.generateId();
    
    const toast: ToastData = {
      id,
      message,
      type,
      createdAt: Date.now(),
      ...options,
    };

    this.toasts = [...this.toasts, toast];
    this.notify();

    if (options?.onOpen) {
      options.onOpen();
    }

    return id;
  }

  success(message: string | React.ReactNode, options?: ToastOptions): string {
    return this.addToast(message, 'success', options);
  }

  error(message: string | React.ReactNode, options?: ToastOptions): string {
    return this.addToast(message, 'error', options);
  }

  warning(message: string | React.ReactNode, options?: ToastOptions): string {
    return this.addToast(message, 'warning', options);
  }

  info(message: string | React.ReactNode, options?: ToastOptions): string {
    return this.addToast(message, 'info', options);
  }

  loading(message: string | React.ReactNode, options?: ToastOptions): string {
    return this.addToast(message, 'loading', { ...options, autoClose: false });
  }

  dismiss(id: string): void {
    const toast = this.toasts.find(t => t.id === id);
    
    if (toast) {
      // Mark as closing for animation
      this.toasts = this.toasts.map(t => 
        t.id === id ? { ...t, isClosing: true } : t
      );
      this.notify();

      // Remove after animation
      setTimeout(() => {
        this.toasts = this.toasts.filter(t => t.id !== id);
        this.notify();
        
        if (toast.onClose) {
          toast.onClose();
        }
      }, 350);
    }
  }

  dismissAll(): void {
    const toastIds = this.toasts.map(t => t.id);
    toastIds.forEach(id => this.dismiss(id));
  }

  update(id: string, options: Partial<ToastData>): void {
    this.toasts = this.toasts.map(toast =>
      toast.id === id ? { ...toast, ...options } : toast
    );
    this.notify();
  }

  promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string | React.ReactNode;
      success: string | React.ReactNode | ((data: T) => string | React.ReactNode);
      error: string | React.ReactNode | ((error: any) => string | React.ReactNode);
    },
    options?: ToastOptions
  ): Promise<T> {
    const id = this.loading(messages.loading, options);

    return promise
      .then((data) => {
        const successMessage = typeof messages.success === 'function' 
          ? messages.success(data) 
          : messages.success;
        
        this.update(id, {
          type: 'success',
          message: successMessage,
          autoClose: options?.autoClose !== undefined ? options.autoClose : 3000,
        });
        
        return data;
      })
      .catch((error) => {
        const errorMessage = typeof messages.error === 'function' 
          ? messages.error(error) 
          : messages.error;
        
        this.update(id, {
          type: 'error',
          message: errorMessage,
          autoClose: options?.autoClose !== undefined ? options.autoClose : 3000,
        });
        
        throw error;
      });
  }
}

export const toastManager = new ToastManager();

export const toast = {
  success: (message: string | React.ReactNode, options?: ToastOptions) => 
    toastManager.success(message, options),
  error: (message: string | React.ReactNode, options?: ToastOptions) => 
    toastManager.error(message, options),
  warning: (message: string | React.ReactNode, options?: ToastOptions) => 
    toastManager.warning(message, options),
  info: (message: string | React.ReactNode, options?: ToastOptions) => 
    toastManager.info(message, options),
  loading: (message: string | React.ReactNode, options?: ToastOptions) => 
    toastManager.loading(message, options),
  dismiss: (id: string) => toastManager.dismiss(id),
  dismissAll: () => toastManager.dismissAll(),
  update: (id: string, options: Partial<ToastData>) => 
    toastManager.update(id, options),
  promise: <T,>(
    promise: Promise<T>,
    messages: Parameters<typeof toastManager.promise>[1],
    options?: ToastOptions
  ) => toastManager.promise(promise, messages, options),
};