import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ArrowUp } from "lucide-react";
import NotFound from "@/pages/NotFound";
import Navbar from "./components/Navbar";
import { useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import TheProphet from "./pages/TheProphet";
import Ministries from "./pages/Ministries";
import Events from "./pages/Events";
import Testimonies from "./pages/Testimonies";
import Sermons from "./pages/Sermons";
import LiveServices from "./pages/LiveServices";
import Giving from "./pages/Giving";
import Contact from "./pages/Contact";
import Media from "./pages/Media";
import MensMinistry from "./pages/MensMinistry";
import WomensMinistry from "./pages/WomensMinistry";
import YouthMinistry from "./pages/YouthMinistry";
import ChildrensMinistry from "./pages/ChildrensMinistry";
import AnnaGroup from "./pages/AnnaGroup";

function ScrollRestoration() {
  const [location] = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.history.scrollRestoration = "manual";
    const hash = window.location.hash;

    if (hash) {
      window.requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 520);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      title="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-gold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/40 ${isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

const pageByPath = {
  "/": Home,
  "/about": About,
  "/the-prophet": TheProphet,
  "/ministries": Ministries,
  "/events": Events,
  "/testimonies": Testimonies,
  "/media": Media,
  "/sermons": Sermons,
  "/live-services": LiveServices,
  "/giving": Giving,
  "/contact": Contact,
  "/men-ministry": MensMinistry,
  "/women-ministry": WomensMinistry,
  "/youth-ministry": YouthMinistry,
  "/children-ministry": ChildrensMinistry,
  "/anna-group": AnnaGroup,
  "/404": NotFound,
} as const;

function renderPage(path: string) {
  const Page = pageByPath[path as keyof typeof pageByPath] ?? NotFound;
  return <Page />;
}

function RouteTransition() {
  const [location] = useLocation();
  const path = location.split("?")[0].split("#")[0] || "/";
  const [activePath, setActivePath] = useState(path);
  const [exitingPath, setExitingPath] = useState<string | null>(null);

  useEffect(() => {
    if (path === activePath) return;

    setExitingPath(activePath);
    setActivePath(path);
    const timer = window.setTimeout(() => setExitingPath(null), 760);
    return () => window.clearTimeout(timer);
  }, [path]);

  return (
    <div className="route-stage">
      {exitingPath && <div className="route-page route-page-exit">{renderPage(exitingPath)}</div>}
      <div className="route-page route-page-enter" key={activePath}>{renderPage(activePath)}</div>
    </div>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <ScrollRestoration />
          <Navbar />
          <ScrollToTopButton />
          <RouteTransition />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
