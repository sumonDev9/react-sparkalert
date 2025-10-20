// import React, { useEffect, useState, useRef } from 'react';
// import { ToastData } from '../types';

// interface ToastProps {
//   toast: ToastData;
//   onClose: (id: string) => void;
// }

// const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
//   const [progress, setProgress] = useState(100);
//   const [isPaused, setIsPaused] = useState(false);
//   const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
// //   const timerRef = useRef<NodeJS.Timeout | null>(null);
// const timerRef = useRef<number | null>(null);
//   const startTimeRef = useRef<number>(Date.now());
//   const remainingTimeRef = useRef<number>(toast.autoClose || 0);

//   const icons = {
//     success: (
//       <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
//         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
//         <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     ),
//     error: (
//       <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
//         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
//         <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//       </svg>
//     ),
//     warning: (
//       <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
//         <path d="M12 2L2 20h20L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//       </svg>
//     ),
//     info: (
//       <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
//         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
//         <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//       </svg>
//     ),
//     loading: (
//       <svg className="toast-icon toast-spinner" viewBox="0 0 24 24">
//         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.4 31.4" strokeLinecap="round"/>
//       </svg>
//     ),
//   };

//   useEffect(() => {
//     if (toast.autoClose === false || toast.type === 'loading') return;

//     const duration = toast.autoClose || 3000;
//     remainingTimeRef.current = duration;
//     startTimeRef.current = Date.now();

//     const updateProgress = () => {
//       if (isPaused) return;

//       const elapsed = Date.now() - startTimeRef.current;
//       const remaining = Math.max(0, duration - elapsed);
//       remainingTimeRef.current = remaining;

//       setProgress((remaining / duration) * 100);

//       if (remaining <= 0) {
//         onClose(toast.id);
//       }
//     };

//     timerRef.current = setInterval(updateProgress, 16);

//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [toast.autoClose, toast.id, toast.type, isPaused, onClose]);

//   const handleMouseEnter = () => {
//     if (toast.pauseOnHover) {
//       setIsPaused(true);
//       startTimeRef.current = Date.now();
//     }
//   };

//   const handleMouseLeave = () => {
//     if (toast.pauseOnHover) {
//       setIsPaused(false);
//       const timeSpentPaused = Date.now() - startTimeRef.current;
//       startTimeRef.current = Date.now() - timeSpentPaused;
//     }
//   };

//   const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
//     if (!toast.draggable) return;
//     setIsDragging(true);
//     const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
//     const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
//     setDragPosition({ x: clientX, y: clientY });
//   };

//   const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
//     if (!isDragging || !toast.draggable) return;
//     const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
//     const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
//     const deltaX = clientX - dragPosition.x;
//     if (Math.abs(deltaX) > 100) {
//       onClose(toast.id);
//     }
//   };

//   const handleDragEnd = () => {
//     setIsDragging(false);
//     setDragPosition({ x: 0, y: 0 });
//   };

//   const theme = toast.theme || 'light';
//   const transition = toast.transition || 'slide';

//   return (
//     <div
//       className={`toast toast-${toast.type} toast-theme-${theme} toast-transition-${transition} ${toast.isClosing ? 'toast-closing' : ''} ${toast.className || ''}`}
//       style={toast.style}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onMouseDown={handleDragStart}
//       onMouseMove={handleDragMove}
//       onMouseUp={handleDragEnd}
//       onTouchStart={handleDragStart}
//       onTouchMove={handleDragMove}
//       onTouchEnd={handleDragEnd}
//       role="alert"
//       aria-live="polite"
//     >
//       <div className="toast-content">
//         {toast.icon !== false && (
//           <div className="toast-icon-wrapper">
//             {toast.icon || icons[toast.type]}
//           </div>
//         )}
//         <div className={`toast-body ${toast.bodyClassName || ''}`}>
//           {toast.message}
//         </div>
//         {toast.closeButton !== false && (
//           <button
//             className="toast-close-btn"
//             onClick={() => onClose(toast.id)}
//             aria-label="Close"
//           >
//             <svg viewBox="0 0 24 24" fill="none">
//               <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//             </svg>
//           </button>
//         )}
//       </div>
//       {toast.progressBar !== false && toast.autoClose !== false && toast.type !== 'loading' && (
//         <div className={`toast-progress-bar ${toast.progressClassName || ''}`}>
//           <div 
//             className="toast-progress-fill"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Toast;


// src/components/Toast.tsx

// import React, { useEffect, useState, useRef } from 'react';
// import { ToastData } from '../types';

// interface ToastProps {
//   toast: ToastData;
//   onClose: (id: string) => void;
// }

// const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
//   const [progress, setProgress] = useState(100);
//   const [isPaused, setIsPaused] = useState(false);
//   const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
  
//   const timerRef = useRef<number | null>(null);
  
//   // এই দুটি Ref আসল কাজ করবে
//   // মোট সময়কাল (Duration)
//   const durationRef = useRef<number>(toast.autoClose === false ? 0 : toast.autoClose || 3000);
//   // কত সময় বাকি আছে (Remaining Time)
//   const remainingTimeRef = useRef<number>(durationRef.current);
//   // সেগমেন্ট কখন শুরু হয়েছে (Segment Start Time)
//   const startTimeRef = useRef<number>(Date.now());

//   const icons = {
//     // ... আপনার আইকন কোড (অপরিবর্তিত)
//     success: (
//       <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
//         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
//         <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     ),
//     error: (
//       <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
//         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
//         <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//       </svg>
//     ),
//     warning: (
//       <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
//         <path d="M12 2L2 20h20L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//       </svg>
//     ),
//     info: (
//       <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
//         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
//         <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//       </svg>
//     ),
//     loading: (
//       <svg className="toast-icon toast-spinner" viewBox="0 0 24 24">
//         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.4 31.4" strokeLinecap="round"/>
//       </svg>
//     ),
//   };

//   // আপডেটেড useEffect
//   useEffect(() => {
//     if (toast.autoClose === false || toast.type === 'loading') return;


//     if (!isPaused) {
     
//       startTimeRef.current = Date.now();

//       const updateProgress = () => {
   
//         const elapsedSinceResume = Date.now() - startTimeRef.current;
        
       
//         const newRemaining = remainingTimeRef.current - elapsedSinceResume;

     
//         setProgress((newRemaining / durationRef.current) * 100);

//         if (newRemaining <= 0) {
//           onClose(toast.id);
//         }
//       };

//       timerRef.current = setInterval(updateProgress, 16);
//     }

//     // ক্লিনআপ ফাংশন
//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//     // এখন isPaused স্টেট পরিবর্তন হলেই এই ইফেক্টটি চলবে
//   }, [toast.autoClose, toast.id, toast.type, isPaused, onClose]);

//   // আপডেটেড handleMouseEnter
//   const handleMouseEnter = () => {
//     if (toast.pauseOnHover) {
//       // 1. টাইমারটি বন্ধ করুন
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
      
//       // 2. এই সেগমেন্টে কত সময় পার হয়েছে তা গণনা করুন
//       const elapsedSinceResume = Date.now() - startTimeRef.current;
      
//       // 3. নতুন বাকি সময় সেভ করুন
//       remainingTimeRef.current = remainingTimeRef.current - elapsedSinceResume;
      
//       // 4. পজড্ স্টেট সেট করুন
//       setIsPaused(true);
//     }
//   };

//   // আপডেটেড handleMouseLeave
//   const handleMouseLeave = () => {
//     if (toast.pauseOnHover) {
//       // 1. পজড্ স্টেট ফলস করুন (এতে useEffect আবার রান করবে)
//       setIsPaused(false);
//       // startTimeRef.current পরবর্তী useEffect রানে সেট হয়ে যাবে
//     }
//   };

//   const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
//     if (!toast.draggable) return;
//     setIsDragging(true);
//     const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
//     const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
//     setDragPosition({ x: clientX, y: clientY });
//   };

//   const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
//     if (!isDragging || !toast.draggable) return;
//     const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
//     const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
//     const deltaX = clientX - dragPosition.x;
//     if (Math.abs(deltaX) > 100) {
//       onClose(toast.id);
//     }
//   };

//   const handleDragEnd = () => {
//     setIsDragging(false);
//     setDragPosition({ x: 0, y: 0 });
//   };

//   const theme = toast.theme || 'light';
//   const transition = toast.transition || 'slide';

//   return (
//     <div
//       className={`toast toast-${toast.type} toast-theme-${theme} toast-transition-${transition} ${toast.isClosing ? 'toast-closing' : ''} ${toast.className || ''}`}
//       style={toast.style}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onMouseDown={handleDragStart}
//       onMouseMove={handleDragMove}
//       onMouseUp={handleDragEnd}
//       onTouchStart={handleDragStart}
//       onTouchMove={handleDragMove}
//       onTouchEnd={handleDragEnd}
//       role="alert"
//       aria-live="polite"
//     >
//       <div className="toast-content">
//         {toast.icon !== false && (
//           <div className="toast-icon-wrapper">
//             {toast.icon || icons[toast.type]}
//           </div>
//         )}
//         <div className={`toast-body ${toast.bodyClassName || ''}`}>
//           {toast.message}
//         </div>
//         {toast.closeButton !== false && (
//           <button
//             className="toast-close-btn"
//             onClick={() => onClose(toast.id)}
//             aria-label="Close"
//           >
//             <svg viewBox="0 0 24 24" fill="none">
//               <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//             </svg>
//           </button>
//         )}
//       </div>
//       {toast.progressBar !== false && toast.autoClose !== false && toast.type !== 'loading' && (
//         <div className={`toast-progress-bar ${toast.progressClassName || ''}`}>
//           <div 
//             className="toast-progress-fill"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Toast;




// src/components/Toast.tsx

// import React, { useEffect, useState, useRef } from 'react';
// import { ToastData } from '../types';

// interface ToastProps {
//   toast: ToastData;
//   onClose: (id: string) => void;
// }

// const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
//   const [progress, setProgress] = useState(100);
//   const [isPaused, setIsPaused] = useState(false);
//   const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
  
//   const timerRef = useRef<number | null>(null);
  
//   // মোট সময়কাল (Duration)
//   const durationRef = useRef<number>(toast.autoClose === false ? 0 : toast.autoClose || 3000);
//   // কত সময় বাকি আছে (Remaining Time)
//   const remainingTimeRef = useRef<number>(durationRef.current);
//   // সেগমেন্ট কখন শুরু হয়েছে (Segment Start Time)
//   const startTimeRef = useRef<number>(Date.now());

//   const icons = {
//     // ... আপনার আইকন কোড (অপরিবর্তিত)
//     success: (
//       <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
//         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
//         <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     ),
//     error: (
//       <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
//         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
//         <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//       </svg>
//     ),
//     warning: (
//       <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
//         <path d="M12 2L2 20h20L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//       </svg>
//     ),
//     info: (
//       <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
//         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
//         <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//       </svg>
//     ),
//     loading: (
//       <svg className="toast-icon toast-spinner" viewBox="0 0 24 24">
//         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.4 31.4" strokeLinecap="round"/>
//       </svg>
//     ),
//   };

//   // // আপডেটেড useEffect
//   // useEffect(() => {
//   //   if (toast.autoClose === false || toast.type === 'loading') return;

//   //   // যদি পজড্ না থাকে, টাইমার চালু করুন
//   //   if (!isPaused) {
//   //     // এই সেগমেন্টের শুরু'র সময় সেট করুন
//   //     startTimeRef.current = Date.now();

//   //     const updateProgress = () => {
//   //       // এই সেগমেন্টে কত সময় পার হয়েছে
//   //       const elapsedSinceResume = Date.now() - startTimeRef.current;
        
//   //       // নতুন বাকি সময় গণনা করুন
//   //       const newRemaining = remainingTimeRef.current - elapsedSinceResume;

//   //       // প্রোগ্রেস বার সেট করুন (নেগেটিভ ভ্যালু এড়াতে Math.max ব্যবহার করুন)
//   //       setProgress(Math.max(0, (newRemaining / durationRef.current) * 100));

//   //       if (newRemaining <= 0) {
//   //         // 1. প্রথমে টাইমারটি বন্ধ করুন
//   //         if (timerRef.current) {
//   //           clearInterval(timerRef.current);
//   //         }
          
//   //         // 2. নিশ্চিত করুন প্রোগ্রেস ০% সেট হয়েছে
//   //         setProgress(0);

//   //         // 3. সামান্য অপেক্ষা করুন (যাতে ইউজার ০% দেখতে পায়), তারপর বন্ধ করুন
//   //         setTimeout(() => {
//   //           onClose(toast.id);
//   //         }, 110); // ৫০ms দেরি
//   //       }
//   //     };

//   //     timerRef.current = setInterval(updateProgress, 16);
//   //   }

//   //   // ক্লিনআপ ফাংশন
//   //   return () => {
//   //     if (timerRef.current) {
//   //       clearInterval(timerRef.current);
//   //     }
//   //   };
//   //   // এখন isPaused স্টেট পরিবর্তন হলেই এই ইফেক্টটি চলবে
//   // }, [toast.autoClose, toast.id, toast.type, isPaused, onClose]);

// useEffect(() => {
//     if (toast.autoClose === false || toast.type === 'loading') return;

//     // *** FIX: Shurutei duration update korun ***
//     durationRef.current = toast.autoClose || 3000;

//     // *** FIX: isPaused na hole remaining time reset korun ***
//     // (Jodi 'pause' theke 'resume' na hoy, tar mane eti ekti notun
//     // update, tai remaining time purota set korte hobe)
//     if (!isPaused) {
//       remainingTimeRef.current = durationRef.current;
//     }

//     // যদি পজড্ না থাকে, টাইমার চালু করুন
//     if (!isPaused) {
//       // এই সেগমেন্টের শুরু'র সময় সেট করুন
//       startTimeRef.current = Date.now();

//       const updateProgress = () => {
//         // এই সেগমেন্টে কত সময় পার হয়েছে
//         const elapsedSinceResume = Date.now() - startTimeRef.current;
        
//         // নতুন বাকি সময় গণনা করুন
//         const newRemaining = remainingTimeRef.current - elapsedSinceResume;

//         // প্রোগ্রেস বার সেট করুন
//         setProgress(Math.max(0, (newRemaining / durationRef.current) * 100));

//         if (newRemaining <= 0) {
//           if (timerRef.current) {
//             clearInterval(timerRef.current);
//           }
//           setProgress(0);
//           setTimeout(() => {
//             onClose(toast.id);
//           }, 110); 
//         }
//       };

//       timerRef.current = setInterval(updateProgress, 16);
//     }

//     // ক্লিনআপ ফাংশন
//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, [toast.autoClose, toast.id, toast.type, isPaused, onClose]);

//   // আপডেটেড handleMouseEnter
//   const handleMouseEnter = () => {
//     if (toast.pauseOnHover) {
//       // 1. টাইমারটি বন্ধ করুন
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
      
//       // 2. এই সেগমেন্টে কত সময় পার হয়েছে তা গণনা করুন
//       const elapsedSinceResume = Date.now() - startTimeRef.current;
      
//       // 3. নতুন বাকি সময় সেভ করুন
//       remainingTimeRef.current = remainingTimeRef.current - elapsedSinceResume;
      
//       // 4. পজড্ স্টেট সেট করুন
//       setIsPaused(true);
//     }
//   };

//   // আপডেটেড handleMouseLeave
//   const handleMouseLeave = () => {
//     if (toast.pauseOnHover) {
//       // 1. পজড্ স্টেট ফলস করুন (এতে useEffect আবার রান করবে)
//       setIsPaused(false);
//       // startTimeRef.current পরবর্তী useEffect রানে সেট হয়ে যাবে
//     }
//   };

//   const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
//     if (!toast.draggable) return;
//     setIsDragging(true);
//     const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
//     const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
//     setDragPosition({ x: clientX, y: clientY });
//   };

//   const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
//     if (!isDragging || !toast.draggable) return;
//     const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
//     const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
//     const deltaX = clientX - dragPosition.x;
//     if (Math.abs(deltaX) > 100) {
//       onClose(toast.id);
//     }
//   };

//   const handleDragEnd = () => {
//     setIsDragging(false);
//     setDragPosition({ x: 0, y: 0 });
//   };

//   const theme = toast.theme || 'light';
//   const transition = toast.transition || 'slide';

//   return (
//     <div
//       className={`toast toast-${toast.type} toast-theme-${theme} toast-transition-${transition} ${toast.isClosing ? 'toast-closing' : ''} ${toast.className || ''}`}
//       style={toast.style}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onMouseDown={handleDragStart}
//       onMouseMove={handleDragMove}
//       onMouseUp={handleDragEnd}
//       onTouchStart={handleDragStart}
//       onTouchMove={handleDragMove}
//       onTouchEnd={handleDragEnd}
//       role="alert"
//       aria-live="polite"
//     >
//       <div className="toast-content">
//         {toast.icon !== false && (
//           <div className="toast-icon-wrapper">
//             {toast.icon || icons[toast.type]}
//           </div>
//         )}
//         <div className={`toast-body ${toast.bodyClassName || ''}`}>
//           {toast.message}
//         </div>
//         {toast.closeButton !== false && (
//           <button
//             className="toast-close-btn"
//             onClick={() => onClose(toast.id)}
//             aria-label="Close"
//           >
//             <svg viewBox="0 0 24 24" fill="none">
//               <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//             </svg>
//           </button>
//         )}
//       </div>
//       {toast.progressBar !== false && toast.autoClose !== false && toast.type !== 'loading' && (
//         <div className={`toast-progress-bar ${toast.progressClassName || ''}`}>
//           <div 
//             className="toast-progress-fill"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Toast;



// // src/components/Toast.tsx 01

// import React, { useEffect, useState, useRef } from 'react';
// import { ToastData } from '../types';

// interface ToastProps {
//   toast: ToastData;
//   onClose: (id: string) => void;
// }

// const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
//   const [progress, setProgress] = useState(100);
//   const [isPaused, setIsPaused] = useState(false);
//   const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
  
//   const timerRef = useRef<number | null>(null);
//   const durationRef = useRef<number>(toast.autoClose === false ? 0 : toast.autoClose || 3000);
//   const remainingTimeRef = useRef<number>(durationRef.current);
//   const startTimeRef = useRef<number>(Date.now());

//   // *** FIX: Purboborti 'paused' state track korar jonno Ref ***
//   const prevPausedRef = useRef<boolean>(isPaused);

//   const icons = {
//     success: (
//       <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
//         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
//         <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     ),
//     error: (
//       <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
//         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
//         <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//       </svg>
//     ),
//     warning: (
//       <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
//         <path d="M12 2L2 20h20L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//       </svg>
//     ),
//     info: (
//       <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
//         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
//         <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//       </svg>
//     ),
//     loading: (
//       <svg className="toast-icon toast-spinner" viewBox="0 0 24 24">
//         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.4 31.4" strokeLinecap="round"/>
//       </svg>
//     ),
//   };

//   // আপডেটেড useEffect
//   useEffect(() => {
//     // Purboborti state capture korun
//     const wasPaused = prevPausedRef.current;
//     // Notun state store korun
//     prevPausedRef.current = isPaused;

//     if (toast.autoClose === false || toast.type === 'loading') return;

//     // Duration shobshomoy update korun (update-er jonno)
//     durationRef.current = toast.autoClose || 3000;

//     // *** FIX: Ekhon amra check korbo eti 'Resume' naki 'Notun Update' ***
//     if (!isPaused) { // Jodi running state-e thake
//       if (!wasPaused) { 
//         // Jodi ageo paused na thake (mane eti notun/updated toast)
//         // Taholei shudhu remaining time reset korun
//         remainingTimeRef.current = durationRef.current;
//       }
//       // Jodi `wasPaused` true hoto, tar mane eti 'Resume' hocche.
//       // Tokhon `remainingTimeRef` reset KORA HOBE NA.
//     }

//     // --- Baki logic eki royeche ---

//     // যদি পজড্ না থাকে, টাইমার চালু করুন
//     if (!isPaused) {
//       // এই সেগমেন্টের শুরু'র সময় সেট করুন
//       startTimeRef.current = Date.now();

//       const updateProgress = () => {
//         // এই সেগমেন্টে কত সময় পার হয়েছে
//         const elapsedSinceResume = Date.now() - startTimeRef.current;
        
//         // নতুন বাকি সময় গণনা করুন
//         const newRemaining = remainingTimeRef.current - elapsedSinceResume;

//         // প্রোগ্রেস বার সেট করুন
//         setProgress(Math.max(0, (newRemaining / durationRef.current) * 100));

//         if (newRemaining <= 0) {
//           if (timerRef.current) {
//             clearInterval(timerRef.current);
//           }
//           setProgress(0);
//           setTimeout(() => {
//             onClose(toast.id);
//           }, 110); 
//         }
//       };

//       timerRef.current = setInterval(updateProgress, 16);
//     }

//     // ক্লিনআপ ফাংশন
//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//     };
//   }, [toast.autoClose, toast.id, toast.type, isPaused, onClose]);

//   // handleMouseEnter (Oporibortito)
//   const handleMouseEnter = () => {
//     if (toast.pauseOnHover) {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }
//       const elapsedSinceResume = Date.now() - startTimeRef.current;
//       remainingTimeRef.current = remainingTimeRef.current - elapsedSinceResume;
//       setIsPaused(true);
//     }
//   };

//   // handleMouseLeave (Oporibortito)
//   const handleMouseLeave = () => {
//     if (toast.pauseOnHover) {
//       setIsPaused(false);
//     }
//   };

//   const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
//     if (!toast.draggable) return;
//     setIsDragging(true);
//     const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
//     const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
//     setDragPosition({ x: clientX, y: clientY });
//   };

//   const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
//     if (!isDragging || !toast.draggable) return;
//     const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
//     const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
//     const deltaX = clientX - dragPosition.x;
//     if (Math.abs(deltaX) > 100) {
//       onClose(toast.id);
//     }
//   };

//   const handleDragEnd = () => {
//     setIsDragging(false);
//     setDragPosition({ x: 0, y: 0 });
//   };

//   const theme = toast.theme || 'light';
//   const transition = toast.transition || 'slide';

//   return (
//     <div
//       className={`toast toast-${toast.type} toast-theme-${theme} toast-transition-${transition} ${toast.isClosing ? 'toast-closing' : ''} ${toast.className || ''}`}
//       style={toast.style}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onMouseDown={handleDragStart}
//       onMouseMove={handleDragMove}
//       onMouseUp={handleDragEnd}
//       onTouchStart={handleDragStart}
//       onTouchMove={handleDragMove}
//       onTouchEnd={handleDragEnd}
//       role="alert"
//       aria-live="polite"
//     >
//       <div className="toast-content">
//         {toast.icon !== false && (
//           <div className="toast-icon-wrapper">
//             {toast.icon || icons[toast.type]}
//           </div>
//         )}
//         <div className={`toast-body ${toast.bodyClassName || ''}`}>
//           {toast.message}
//         </div>
//         {toast.closeButton !== false && (
//           <button
//             className="toast-close-btn"
//             onClick={() => onClose(toast.id)}
//             aria-label="Close"
//           >
//             <svg viewBox="0 0 24 24" fill="none">
//               <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//             </svg>
//           </button>
//         )}
//       </div>
//       {toast.progressBar !== false && toast.autoClose !== false && toast.type !== 'loading' && (
//         <div className={`toast-progress-bar ${toast.progressClassName || ''}`}>
//           <div 
//             className="toast-progress-fill"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Toast;

// ************** 03 huu *************//
import React, { useEffect, useState, useRef } from 'react';
import { ToastData } from '../types';

interface ToastProps {
  toast: ToastData;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const timerRef = useRef<number | null>(null);
  const durationRef = useRef<number>(toast.autoClose === false ? 0 : toast.autoClose || 3000);
  const remainingTimeRef = useRef<number>(durationRef.current);
  const startTimeRef = useRef<number>(Date.now());
  const prevPausedRef = useRef<boolean>(isPaused);

  const icons = {
    success: (
      <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    error: (
      <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    warning: (
      <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 20h20L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    info: (
      <svg className="toast-icon" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    loading: (
      <svg className="toast-icon toast-spinner" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.4 31.4" strokeLinecap="round"/>
      </svg>
    ),
  };

  // Updated useEffect (Sob bug fix kora)
  useEffect(() => {
    const wasPaused = prevPausedRef.current;
    prevPausedRef.current = isPaused;

    if (toast.autoClose === false || toast.type === 'loading') return;

    // FIX 1: Update-er jonno duration shobshomoy update korun
    durationRef.current = toast.autoClose || 3000;

    // FIX 2: Pause/Resume logic
    if (!isPaused) { 
      if (!wasPaused) { 
        // Eti notun toast ba update hole shudhu remaining time reset hobe
        remainingTimeRef.current = durationRef.current;
      }
      // Jodi wasPaused=true hoy, tar mane eti 'Resume' hocche, remainingTimeRef reset hobe na
    }

    if (!isPaused) {
      startTimeRef.current = Date.now();

      const updateProgress = () => {
        const elapsedSinceResume = Date.now() - startTimeRef.current;
        const newRemaining = remainingTimeRef.current - elapsedSinceResume;

        setProgress(Math.max(0, (newRemaining / durationRef.current) * 100));

        if (newRemaining <= 0) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          setProgress(0);
          setTimeout(() => {
            onClose(toast.id);
          }, 110); 
        }
      };

      timerRef.current = setInterval(updateProgress, 16);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [toast.autoClose, toast.id, toast.type, isPaused, onClose]);

  const handleMouseEnter = () => {
    if (toast.pauseOnHover) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      const elapsedSinceResume = Date.now() - startTimeRef.current;
      remainingTimeRef.current = remainingTimeRef.current - elapsedSinceResume;
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (toast.pauseOnHover) {
      setIsPaused(false);
    }
  };

  // FIX 3: Manual Close Handler
  const handleManualClose = () => {
    // Prothome timer bondho korun
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    // Tarpor toast dismiss korun
    onClose(toast.id);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!toast.draggable) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragPosition({ x: clientX, y: clientY });
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !toast.draggable) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - dragPosition.x;
    if (Math.abs(deltaX) > 100) {
      onClose(toast.id); // Draggable dismiss-e timer clear dorkar nei, manager handle korbe
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragPosition({ x: 0, y: 0 });
  };

  const theme = toast.theme || 'light';
  const transition = toast.transition || 'slide';

  return (
    <div
      className={`toast toast-${toast.type} toast-theme-${theme} toast-transition-${transition} ${toast.isClosing ? 'toast-closing' : ''} ${toast.className || ''}`}
      style={toast.style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      role="alert"
      aria-live="polite"
    >
      <div className="toast-content">
        {toast.icon !== false && (
          <div className="toast-icon-wrapper">
            {toast.icon || icons[toast.type]}
          </div>
        )}
        <div className={`toast-body ${toast.bodyClassName || ''}`}>
          {toast.message}
        </div>
        {toast.closeButton !== false && (
          <button
            className="toast-close-btn"
            onClick={handleManualClose} // <-- FIX 3 ekhane apply kora hoyeche
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>
      {toast.progressBar !== false && toast.autoClose !== false && toast.type !== 'loading' && (
        <div className={`toast-progress-bar ${toast.progressClassName || ''}`}>
          <div 
            className="toast-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default Toast;