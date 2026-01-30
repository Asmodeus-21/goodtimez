import { ThemeProvider } from "@/components/ThemeProvider";
import { CreatorFanPortal } from "@/components/CreatorFanPortal";
import { DEMO_CREATORS } from "@/lib/demo-data";

export default async function CreatorPortalPage({
    params
}: {
    params: Promise<{ creatorSlug: string }>
}) {
    const { creatorSlug } = await params;

    // In demo mode, find creator by slug
    const creator = DEMO_CREATORS.find(
        c => c.displayName.toLowerCase().replace(/\s+/g, '-') === creatorSlug
    );

    if (!creator) {
        return (
            <div className="min-h-screen bg-dark-bg flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">😕</div>
                    <h1 className="text-2xl font-bold mb-2">Creator Not Found</h1>
                    <p className="text-dark-muted">
                        The creator "{creatorSlug}" doesn't exist.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <ThemeProvider creatorId={creator.id}>
            <CreatorFanPortal creator={creator} />
        </ThemeProvider>
    );
}
