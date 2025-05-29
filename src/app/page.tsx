import Header from '../(components)/Header';
import Hero from '../(components)/Hero';
import Features from '../(components)/Features';
import Benefits from '../(components)/Benefits';
import WaitlistForm from '../(components)/WaitlistForm';
import Footer from '../(components)/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <Hero />
      <Features />
      <Benefits />
      <WaitlistForm />
      <Footer />
    </div>
  );
}