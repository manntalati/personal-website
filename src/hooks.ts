import { useEffect, useState } from 'react';

export const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Fires once when the element first scrolls into view, then stops observing.
 *
 * `ref` is a callback ref, not an object ref: the target may mount later than the
 * component (e.g. it renders only after a fetch resolves), and a callback ref
 * re-attaches the observer whenever the node actually appears.
 */
export function useInView<T extends HTMLElement>(threshold = 0.25) {
    const [node, setNode] = useState<T | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (!node || inView) return;
        // Without IntersectionObserver, show the final state rather than nothing.
        if (typeof IntersectionObserver === 'undefined') {
            setInView(true);
            return;
        }
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    obs.disconnect();
                }
            },
            { threshold },
        );
        obs.observe(node);
        return () => obs.disconnect();
    }, [node, threshold, inView]);

    return { ref: setNode, inView };
}

/** Eases a number from 0 to `target` once `active` flips true. */
export function useCountUp(target: number, active: boolean, duration = 1100) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!active) return;
        if (prefersReducedMotion()) {
            setValue(target);
            return;
        }
        let raf = 0;
        const start = performance.now();
        const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setValue(target * (1 - Math.pow(1 - p, 3))); // easeOutCubic
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target, active, duration]);

    return value;
}
