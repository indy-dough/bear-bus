import { useCallback, useEffect } from 'react';

import Events from './events';

const events = new Events();

export default function useGlobalEvent(eventName, callback) {
  useEffect(() => {
    if (!callback) {
      return;
    }

    events.on(eventName, callback);
    return () => events.off(eventName, callback);
  }, [eventName, callback]);

  return useCallback((...args) => events.emit(eventName, ...args), [eventName]);
}
