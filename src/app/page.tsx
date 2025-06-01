import Hero from '../(components)/Hero';
import Features from '../(components)/Features';
import Benefits from '../(components)/Benefits';
import WaitlistForm from '../(components)/WaitlistForm';


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Hero />
      <Features />
      <Benefits />
      <WaitlistForm />
    </div>
  );
}