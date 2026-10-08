import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
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

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/the-prophet"} component={TheProphet} />
      <Route path={"/ministries"} component={Ministries} />
      <Route path={"/events"} component={Events} />
      <Route path={"/testimonies"} component={Testimonies} />
      <Route path={"/media"} component={Media} />
      <Route path={"/sermons"} component={Sermons} />
      <Route path={"/live-services"} component={LiveServices} />
      <Route path={"/giving"} component={Giving} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/men-ministry"} component={MensMinistry} />
      <Route path={"/women-ministry"} component={WomensMinistry} />
      <Route path={"/youth-ministry"} component={YouthMinistry} />
      <Route path={"/children-ministry"} component={ChildrensMinistry} />
      <Route path={"/anna-group"} component={AnnaGroup} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
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
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
