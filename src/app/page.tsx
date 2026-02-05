import Hero from "@/components/Hero";
import Contact from "@/components/Contact";
import Profile from "@/components/Profile";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <Profile />
      <Contact />
      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border/40">
        <p>© {new Date().getFullYear()} Mandar Joshi. All rights reserved.</p>
      </footer>
    </main>
  );
}
