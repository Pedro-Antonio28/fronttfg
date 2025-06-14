// src/shared/hooks/useNavigationBlocker.js
import { useEffect } from 'react';

export function useNavigationBlocker(message = '¿Estás seguro de que quieres salir?') {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = message;
    };

    const handlePopState = () => {
      const confirmed = window.confirm(message);
      if (!confirmed) {
        // Empuja el estado actual de nuevo para evitar que el usuario navegue atrás
        window.history.pushState(null, '', window.location.href);
      }
    };

    // Este push inicial hace que el "atrás" vuelva al mismo lugar
    window.history.pushState(null, '', window.location.href);

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [message]);
}
