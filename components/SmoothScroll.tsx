"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

declare global { interface Window { __lenis?: Lenis } }

export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | undefined;
    const tick = (t: number) => lenis?.raf(t * 1000);
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1, smoothWheel: true, autoRaf: false });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      let idle = 0;
      const root = document.documentElement;
      lenis.on("scroll", (l: Lenis) => {
        if (Math.abs(l.velocity) < 1.5) return;
        if (!root.classList.contains("is-scrolling")) root.classList.add("is-scrolling");
        clearTimeout(idle);
        idle = window.setTimeout(() => root.classList.remove("is-scrolling"), 140);
      });
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href")!;
        if (id.length < 2) return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        if (lenis) lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4 });
        else el.scrollIntoView();
      })
    );

    let ctx: gsap.Context | undefined;
    const splits: SplitText[] = [];
    const run = () => {
      ctx = gsap.context(() => {
        const q = <T extends Element>(s: string) => Array.from(document.querySelectorAll<T>(s));
        if (reduce) {
          q<HTMLElement>("[data-reveal],[data-fade]").forEach((el) => gsap.set(el, { autoAlpha: 1 }));
          return;
        }
        // masked line reveal with blur
        q<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
          const s = new SplitText(el, { type: "lines", mask: "lines", linesClass: "split-line" });
          splits.push(s);
          gsap.set(el, { autoAlpha: 1 });
          const immediate = el.dataset.immediate !== undefined;
          gsap.from(s.lines, {
            yPercent: 112, rotate: 2.5, duration: 1.2, ease: "expo.out", stagger: 0.09,
            delay: immediate ? Number(el.dataset.delay ?? 0.15) : 0,
            scrollTrigger: immediate ? undefined : { trigger: el, start: "top 86%", once: true },
          });
        });
        // char rise for giant words
        q<HTMLElement>('[data-reveal="chars"]').forEach((el) => {
          const s = new SplitText(el, { type: "chars", mask: "chars" });
          splits.push(s);
          gsap.set(el, { autoAlpha: 1 });
          gsap.from(s.chars, {
            yPercent: 110, duration: 1.1, ease: "expo.out", stagger: { each: 0.035, from: el.dataset.from === "center" ? "center" : "start" },
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
        // blur-in words, optionally scrubbed
        q<HTMLElement>('[data-reveal="blur"]').forEach((el) => {
          const s = new SplitText(el, { type: "words" });
          splits.push(s);
          gsap.set(el, { autoAlpha: 1 });
          if (el.dataset.scrub !== undefined) {
            gsap.fromTo(s.words, { opacity: 0.22 }, {
              opacity: 1, stagger: 0.08, ease: "none",
              scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
            });
          } else {
            gsap.from(s.words, {
              opacity: 0, y: 14, duration: 1, ease: "power3.out", stagger: 0.025,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            });
          }
        });
        q<HTMLElement>("[data-fade]").forEach((el) => {
          gsap.fromTo(el, { autoAlpha: 0, y: 28 }, {
            autoAlpha: 1, y: 0, duration: 1.1, ease: "expo.out", delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: el.dataset.immediate !== undefined ? undefined : { trigger: el, start: "top 90%", once: true },
          });
        });
        // image clip reveals with parallax
        q<HTMLElement>("[data-clip]").forEach((el) => {
          const img = el.querySelector("img");
          gsap.fromTo(el, { clipPath: "inset(18% 12% 18% 12% round 24px)" }, {
            clipPath: "inset(0% 0% 0% 0% round 20px)", ease: "expo.out", duration: 1.6,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
          if (img) gsap.fromTo(img, { scale: 1.2, yPercent: -4 }, { scale: 1.06, yPercent: 4, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
        });
      });
      ScrollTrigger.refresh();
    };
    document.fonts.ready.then(run);
    // safety net: any late layout change (fonts, images, tab content) re-measures every trigger/pin,
    // so pinned sections never start at a stale offset (the cause of "jumping" sections)
    let lastH = document.documentElement.scrollHeight, rz = 0;
    const ro = new ResizeObserver(() => { const h = document.documentElement.scrollHeight; if (Math.abs(h - lastH) < 2) return; lastH = h; clearTimeout(rz); rz = window.setTimeout(() => ScrollTrigger.refresh(), 180); });
    ro.observe(document.body);
    return () => {
      ro.disconnect(); clearTimeout(rz);
      ctx?.revert(); splits.forEach((s) => s.revert());
      if (lenis) { gsap.ticker.remove(tick); lenis.destroy(); }
    };
  }, []);
  return null;
}
