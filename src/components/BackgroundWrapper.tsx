export default function BackgroundWrapper() {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_rgba(242,240,234,0.96)_40%,_rgba(230,227,219,1)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(50,54,62,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(50,54,62,0.04)_1px,transparent_1px)] bg-[size:72px_72px] opacity-50" />
            <div className="absolute -top-40 right-[12%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,_rgba(90,98,110,0.08),_transparent_70%)] blur-2xl" />
            <div className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-white/70 blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white/35 to-transparent" />
        </div>
    );
}
