// import React, { useEffect, useState } from 'react';
// import Toast from './Toast';
// import { ToastData, ToastContainerProps } from '../types';
// import { toastManager } from '../toastManager';
// import '../styles/toast.css';

// const ToastContainer: React.FC<ToastContainerProps> = ({
//   position = 'top-right',
//   autoClose = 5000,
//   pauseOnHover = true,
//   draggable = true,
//   closeButton = true,
//   progressBar = true,
//   theme = 'colored',
//   transition = 'slide',
//   limit = 5,
//   newestOnTop = true,
//   className = '',
//   style = {},
// }) => {
//   const [toasts, setToasts] = useState<ToastData[]>([]);

//   useEffect(() => {
//     const unsubscribe = toastManager.subscribe((newToasts) => {
//       let filteredToasts = [...newToasts];
      
//       // Apply limit
//       if (limit && filteredToasts.length > limit) {
//         filteredToasts = newestOnTop 
//           ? filteredToasts.slice(0, limit)
//           : filteredToasts.slice(-limit);
//       }

//       // Apply default options
//       filteredToasts = filteredToasts.map(toast => ({
//         ...toast,
//         autoClose: toast.autoClose !== undefined ? toast.autoClose : autoClose,
//         pauseOnHover: toast.pauseOnHover !== undefined ? toast.pauseOnHover : pauseOnHover,
//         draggable: toast.draggable !== undefined ? toast.draggable : draggable,
//         closeButton: toast.closeButton !== undefined ? toast.closeButton : closeButton,
//         progressBar: toast.progressBar !== undefined ? toast.progressBar : progressBar,
//         theme: toast.theme || theme,
//         transition: toast.transition || transition,
//       }));

//       setToasts(filteredToasts);
//     });

//     return unsubscribe;
//   }, [autoClose, pauseOnHover, draggable, closeButton, progressBar, theme, transition, limit, newestOnTop]);

//   const handleClose = (id: string) => {
//     toastManager.dismiss(id);
//   };

//   const positionedToasts = toasts.filter(
//     (toast) => (toast.position || position) === position
//   );

//   if (positionedToasts.length === 0) return null;

//   const sortedToasts = newestOnTop 
//     ? [...positionedToasts].reverse() 
//     : positionedToasts;

//   return (
//     <div 
//       className={`toast-container toast-position-${position} ${className}`}
//       style={style}
//     >
//       {sortedToasts.map((toast) => (
//         <Toast key={toast.id} toast={toast} onClose={handleClose} />
//       ))}
//     </div>
//   );
// };

// export default ToastContainer;



// import React, { useEffect, useState } from 'react';
// import Toast from './Toast';
// // ToastPosition type-ti import korun
// import { ToastData, ToastContainerProps, ToastPosition } from '../types'; 
// import { toastManager } from '../toastManager';
// import '../styles/toast.css';

// // Helper function: Toast gulike tader position onujayi alada alada group korbe
// const groupToastsByPosition = (
//   toasts: ToastData[], 
//   defaultPosition: ToastPosition
// ): Record<string, ToastData[]> => {
  
//   // Shob position-er jonno khali array toiri kori
//   const groups: Record<string, ToastData[]> = {
//     'top-left': [],
//     'top-right': [],
//     'top-center': [],
//     'bottom-left': [],
//     'bottom-right': [],
//     'bottom-center': [],
//   };

//   // Prottek-ti toast-ke tar nijer group-e pathai
//   toasts.forEach((toast) => {
//     const pos = toast.position || defaultPosition; // Toast-er nijer position na thakle default-ta nebe
//     if (groups[pos]) {
//       groups[pos].push(toast);
//     }
//   });

//   return groups;
// };


// const ToastContainer: React.FC<ToastContainerProps> = ({
//   position = 'top-right', // Eti ekhon shudhu default hisebe kaaj korbe
//   autoClose = 5000,
//   pauseOnHover = true,
//   draggable = true,
//   closeButton = true,
//   progressBar = true,
//   theme = 'colored',
//   transition = 'slide',
//   limit = 5,
//   newestOnTop = true,
//   className = '',
//   style = {},
// }) => {
//   const [toasts, setToasts] = useState<ToastData[]>([]);

//   useEffect(() => {
//     const unsubscribe = toastManager.subscribe((newToasts) => {
      
//       // Apply default options
//       const updatedToasts = newToasts.map(toast => ({
//         ...toast,
//         autoClose: toast.autoClose !== undefined ? toast.autoClose : autoClose,
//         pauseOnHover: toast.pauseOnHover !== undefined ? toast.pauseOnHover : pauseOnHover,
//         draggable: toast.draggable !== undefined ? toast.draggable : draggable,
//         closeButton: toast.closeButton !== undefined ? toast.closeButton : closeButton,
//         progressBar: toast.progressBar !== undefined ? toast.progressBar : progressBar,
//         theme: toast.theme || theme,
//         transition: toast.transition || transition,
//       }));

//       setToasts(updatedToasts);
//     });

//     return unsubscribe;
//   }, [autoClose, pauseOnHover, draggable, closeButton, progressBar, theme, transition]); // limit, newestOnTop eখান aর dependency te dorkar nei

//   const handleClose = (id: string) => {
//     toastManager.dismiss(id);
//   };

//   // Shob toast-ke tader position onujayi group kori
//   const groupedToasts = groupToastsByPosition(toasts, position);

//   // Ekhon React.Fragment (<>) diye shob position-er jonno container render korbo
//   return (
//     // <>
//     //   {(Object.keys(groupedToasts) as ToastPosition[]).map((pos) => {
//     //     let positionGroup = groupedToasts[pos];
        
//     //     // Jodi ei position-e kono toast na thake, tahole render korbo na
//     //     if (positionGroup.length === 0) {
//     //       return null; 
//     //     }

//     //     // Proti position-er jonno alada vabe limit apply kori
//     //     if (limit && positionGroup.length > limit) {
//     //       positionGroup = newestOnTop 
//     //         ? positionGroup.slice(0, limit)
//     //         : positionGroup.slice(-limit);
//     //     }

//     //     // Proti position-er jonno alada vabe sort kori
//     //     const sortedToasts = newestOnTop 
//     //       ? [...positionGroup].reverse() 
//     //       : positionGroup;

//     //     // Proti position-er jonno ekti kore container div render kori
//     //     return (
//     //       <div 
//     //         key={pos}
//     //         className={`toast-container toast-position-${pos} ${className}`}
//     //         style={style}
//     //       >
//     //         {sortedToasts.map((toast) => (
//     //           <Toast key={toast.id} toast={toast} onClose={handleClose} />
//     //         ))}
//     //       </div>
//     //     );
//     //   })}
//     // </>

//     <>
//       {(Object.keys(groupedToasts) as ToastPosition[]).map((pos) => {
        
//         const positionGroup = groupedToasts[pos]; // Purono line
        
//         // Jodi ei position-e kono toast na thake, tahole render korbo na
//         if (positionGroup.length === 0) {
//           return null; 
//         }

//         // --- FIX SHURU ---

//         // 1. Prothome Limit apply kori (kake dekhabo)
//         let limitedGroup: ToastData[];
//         if (limit && positionGroup.length > limit) {
//           limitedGroup = newestOnTop
//             ? positionGroup.slice(-limit) // Notun guli nao (shesh theke)
//             : positionGroup.slice(0, limit); // Purono guli nao (prothom theke)
//         } else {
//           limitedGroup = positionGroup;
//         }

//         // 2. Ekhon Display Order thik kori (kivabe shajabo)
//         const sortedToasts = newestOnTop 
//           ? [...limitedGroup].reverse() // Notun guli upore
//           : limitedGroup; // Notun guli niche (default)

//         // --- FIX SHESH ---


//         // Proti position-er jonno ekti kore container div render kori
//         return (
//           <div 
//             key={pos}
//             className={`toast-container toast-position-${pos} ${className}`}
//             style={style}
//           >
//             {/* Ekhane 'sortedToasts' bebishar korun */}
//             {sortedToasts.map((toast) => (
//               <Toast key={toast.id} toast={toast} onClose={handleClose} />
//             ))}
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default ToastContainer;


import React, { useEffect, useState } from 'react';
import Toast from './Toast';
// ToastPosition type-ti import korun
import { ToastData, ToastContainerProps, ToastPosition } from '../types'; 
import { toastManager } from '../toastManager';
import '../styles/toast.css';

// Helper function: Toast gulike tader position onujayi alada alada group korbe
const groupToastsByPosition = (
  toasts: ToastData[], 
  defaultPosition: ToastPosition
): Record<string, ToastData[]> => {
  
  // Shob position-er jonno khali array toiri kori
  const groups: Record<string, ToastData[]> = {
    'top-left': [],
    'top-right': [],
    'top-center': [],
    'bottom-left': [],
    'bottom-right': [],
    'bottom-center': [],
  };

  // Prottek-ti toast-ke tar nijer group-e pathai
  toasts.forEach((toast) => {
    const pos = toast.position || defaultPosition; // Toast-er nijer position na thakle default-ta nebe
    if (groups[pos]) {
      groups[pos].push(toast);
    }
  });

  return groups;
};


const ToastContainer: React.FC<ToastContainerProps> = ({
  position = 'top-right', // Eti ekhon shudhu default hisebe kaaj korbe
  autoClose = 5000,
  pauseOnHover = true,
  draggable = true,
  closeButton = true,
  progressBar = true,
  theme = 'colored',
  transition = 'flip',
  limit = 5,
  newestOnTop = true,
  className = '',
  style = {},
}) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe((newToasts) => {
      
      // Apply default options
      const updatedToasts = newToasts.map(toast => ({
        ...toast,
        autoClose: toast.autoClose !== undefined ? toast.autoClose : autoClose,
        pauseOnHover: toast.pauseOnHover !== undefined ? toast.pauseOnHover : pauseOnHover,
        draggable: toast.draggable !== undefined ? toast.draggable : draggable,
        closeButton: toast.closeButton !== undefined ? toast.closeButton : closeButton,
        progressBar: toast.progressBar !== undefined ? toast.progressBar : progressBar,
        theme: toast.theme || theme,
        transition: toast.transition || transition,
      }));

      setToasts(updatedToasts);
    });

    return unsubscribe;
  }, [autoClose, pauseOnHover, draggable, closeButton, progressBar, theme, transition]); 

  const handleClose = (id: string) => {
    toastManager.dismiss(id);
  };

  // Shob toast-ke tader position onujayi group kori
  const groupedToasts = groupToastsByPosition(toasts, position);

  // Ekhon React.Fragment (<>) diye shob position-er jonno container render korbo
  return (
    <>
      {(Object.keys(groupedToasts) as ToastPosition[]).map((pos) => {
        
        const positionGroup = groupedToasts[pos]; 
        
        if (positionGroup.length === 0) {
          return null; 
        }

        // --- FIX SHURU (Limit & Sorting Logic) ---

        // 1. Prothome Limit apply kori (kake dekhabo)
        let limitedGroup: ToastData[];
        if (limit && positionGroup.length > limit) {
          limitedGroup = newestOnTop
            ? positionGroup.slice(-limit) // Notun guli nao (shesh theke)
            : positionGroup.slice(0, limit); // Purono guli nao (prothom theke)
        } else {
          limitedGroup = positionGroup;
        }

        // 2. Ekhon Display Order thik kori (kivabe shajabo)
        const sortedToasts = newestOnTop 
          ? [...limitedGroup].reverse() // Notun guli upore
          : limitedGroup; // Notun guli niche (default)

        // --- FIX SHESH ---


        // Proti position-er jonno ekti kore container div render kori
        return (
          <div 
            key={pos}
            className={`toast-container toast-position-${pos} ${className}`}
            style={style}
          >
            {sortedToasts.map((toast) => (
              <Toast key={toast.id} toast={toast} onClose={handleClose} />
            ))}
          </div>
        );
      })}
    </>
  );
};

export default ToastContainer;