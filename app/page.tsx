import { listVenues } from "@/lib/data";
import { VenueCard } from "@/components/VenueCard";

export default function HomePage() {
  const list = listVenues();
  return (
    <main>
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Find tonight’s vibe</h2>
        <p className="text-sm text-neutral-400">Sample data for Boise. Replace with Supabase later.</p>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(v => <VenueCard key={v.id} v={v as any} />)}
      </div>
    </main>
  );
}
