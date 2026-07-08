import Navbar               from '@/components/layout/Navbar';
import Hero                 from '@/components/sections/Hero';
import About                from '@/components/sections/About';
import Journey              from '@/components/sections/Journey';
import Projects             from '@/components/sections/Projects';
import AchievementsAndGoals from '@/components/sections/AchievementsAndGoals';
import Contact              from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <About/>
      <Journey/>
      <Projects/>
      <AchievementsAndGoals/>
      <Contact/>
    </main>
  );
}
