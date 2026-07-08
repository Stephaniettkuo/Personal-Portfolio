import Achievements from './Achievements';
import Goals from './Goals';

export default function AchievementsAndGoals() {
    return (
        <section style={{ position: 'relative', width: '100%', padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)' }}>
            <div className="flex flex-col md:flex-row" style={{ maxWidth: '1180px', margin: '0 auto', gap: 'clamp(2.5rem, 6vw, 5rem)' }}>
                <Achievements />
                <Goals />
            </div>
        </section>
    );
}
