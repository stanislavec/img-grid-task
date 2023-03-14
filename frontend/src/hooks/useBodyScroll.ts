import { useCallback, useEffect, useRef } from 'react';

const OFFSET = 300;

function useBodyScroll(onReachBottom: () => void, offsetBottom: number = OFFSET) {
  const point = useRef<number>(0);

  const handleScroll = useCallback(
    (e: Event) => {
      if (document.body.offsetHeight <= point.current && point.current !== 0) return;

      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - offsetBottom;

      if (isBottom) {
        point.current = document.body.offsetHeight || 0;
        onReachBottom();
      }
    },
    [offsetBottom, onReachBottom],
  );

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  });
}

export default useBodyScroll;
