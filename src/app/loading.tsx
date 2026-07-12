import JellyfishLoader from '@/components/ui/JellyfishLoader';

export default function Loading() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <JellyfishLoader size={90} />
        </div>
    );
}
