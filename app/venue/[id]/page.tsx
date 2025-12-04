import { notFound } from "next/navigation";
import { computeAggregates, getVenue } from "@/lib/data";
import { Stars } from "@/components/Stars";

export default function VenuePage({ params }: { params: { id: string } }) {
  const venue = getVenue(params.id);
  if (!venue) return notFound();
  const agg = computeAggregates(venue.id);

  return (
    <main className="space-y-4">
      <div className="card">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">{venue.name}</h2>
            <p className="text-sm text-neutral-400">{venue.type} • {venue.city}, {venue.state}</p>
          </div>
          {agg && (
            <div className="text-right">
              <div className="text-sm text-neutral-400">Overall vibe</div>
              <div className="text-2xl font-bold">{agg.avg.vibe.toFixed(1)}</div>
              <Stars value={agg.avg.vibe} />
            </div>
          )}
        </div>
        <div className="mt-3 flex gap-2 flex-wrap">
          {agg?.badges.map(b => <span key={b} className="badge">{b}</span>)}
        </div>
      </div>

      {agg && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="card"><div className="text-xs text-neutral-400">ID Strictness</div><div className="text-xl font-semibold">{agg.avg.idStrictness.toFixed(1)}</div></div>
          <div className="card"><div className="text-xs text-neutral-400">Crowd Age</div><div className="text-xl font-semibold">{agg.avg.crowdAge.toFixed(1)}</div></div>
          <div className="card"><div className="text-xs text-neutral-400">Music</div><div className="text-xl font-semibold">{agg.avg.music.toFixed(1)}</div></div>
          <div className="card"><div className="text-xs text-neutral-400">Dress Code</div><div className="text-xl font-semibold">{agg.avg.dressCode.toFixed(1)}</div></div>
          <div className="card"><div className="text-xs text-neutral-400">Ratings</div><div className="text-xl font-semibold">{agg.count}</div></div>
        </div>
      )}

      <div className="card">
        <h3 className="font-semibold mb-2">Recent ratings</h3>
        {!agg?.recent.length && <div className="text-sm text-neutral-400">No ratings yet.</div>}
        <ul className="space-y-3">
          {agg?.recent.map((r) => (
            <li key={r.id} className="border-b border-neutral-800 pb-3 last:border-0 last:pb-0">
              <div className="text-sm text-neutral-300 flex gap-3">
                <span className="badge">Vibe {r.scores.vibe.toFixed(1)}</span>
                <span className="badge">ID {r.scores.idStrictness.toFixed(1)}</span>
                <span className="badge">Age {r.scores.crowdAge.toFixed(1)}</span>
                <span className="badge">Music {r.scores.music.toFixed(1)}</span>
                <span className="badge">Dress {r.scores.dressCode.toFixed(1)}</span>
              </div>
              {r.comment && <p className="mt-2 text-sm text-neutral-400">{r.comment}</p>}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
