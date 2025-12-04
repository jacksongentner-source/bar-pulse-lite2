import Link from "next/link";
import { Stars } from "./Stars";

type Venue = {
  id: string;
  name: string;
  type: string;
  city: string;
  state: string;
  avg: { vibe: number };
  badges: string[];
};

export function VenueCard({ v }: { v: Venue }) {
  return (
    <Link href={`/venue/${v.id}`} className="card block hover:ring-1 hover:ring-brand transition">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-lg font-semibold">{v.name}</div>
          <div className="text-xs text-neutral-400">{v.type} • {v.city}, {v.state}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-neutral-400">Vibe</div>
          <div className="text-xl font-bold">{v.avg.vibe.toFixed(1)}</div>
          <Stars value={v.avg.vibe} />
        </div>
      </div>
      <div className="mt-3 flex gap-2 flex-wrap">
        {v.badges.map((b) => (
          <span key={b} className="badge">{b}</span>
        ))}
      </div>
    </Link>
  );
}
