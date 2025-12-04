'use client';

interface FriendPost {
  id: string;
  friendName: string;
  avatar: string;
  venueName: string;
  venueType: string;
  image: string;
  caption: string;
  likes: number;
  liked: boolean;
  timestamp: string;
}

const samplePosts: FriendPost[] = [
  {
    id: '1',
    friendName: 'Sarah Chen',
    avatar: '👩',
    venueName: 'The Vault',
    venueType: 'Cocktail Bar',
    image: '🍸',
    caption: 'Best old fashioneds in the city! Great vibe tonight 🔥',
    likes: 342,
    liked: false,
    timestamp: '2h ago'
  },
  {
    id: '2',
    friendName: 'Marcus Johnson',
    avatar: '👨',
    venueName: 'Electric Avenue',
    venueType: 'Club',
    image: '🎵',
    caption: 'DJ set is absolutely killing it! Who else is here?',
    likes: 218,
    liked: false,
    timestamp: '4h ago'
  },
  {
    id: '3',
    friendName: 'Emma Rodriguez',
    avatar: '👩‍🦰',
    venueName: 'Rooftop Lounge',
    venueType: 'Rooftop Bar',
    image: '🌃',
    caption: 'Sunset views + cold drinks = perfect evening ✨',
    likes: 567,
    liked: false,
    timestamp: '6h ago'
  },
  {
    id: '4',
    friendName: 'Alex Kim',
    avatar: '👨‍🦱',
    venueName: 'The Craft House',
    venueType: 'Beer Hall',
    image: '🍺',
    caption: 'New seasonal brews just dropped. Worth trying!',
    likes: 289,
    liked: false,
    timestamp: '8h ago'
  },
  {
    id: '5',
    friendName: 'Jessica Lee',
    avatar: '👩‍🎤',
    venueName: 'Jazz Notes',
    venueType: 'Jazz Bar',
    image: '🎷',
    caption: 'Live music every Friday. This band is exceptional 🎶',
    likes: 412,
    liked: false,
    timestamp: '1d ago'
  }
];

export function FriendsActivityFeed() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {samplePosts.map((post) => (
        <div key={post.id} className="card">
          {/* Post Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{post.avatar}</div>
              <div>
                <p className="font-semibold">{post.friendName}</p>
                <p className="text-xs text-neutral-400">{post.timestamp}</p>
              </div>
            </div>
          </div>

          {/* Venue Info */}
          <div className="mb-4 pb-4 border-b border-neutral-700">
            <p className="text-sm font-medium text-neutral-300">at <span className="text-brand">{post.venueName}</span></p>
            <p className="text-xs text-neutral-500">{post.venueType}</p>
          </div>

          {/* Image/Emoji placeholder */}
          <div className="mb-4 w-full aspect-square bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg flex items-center justify-center text-6xl">
            {post.image}
          </div>

          {/* Caption */}
          <p className="text-sm mb-4 leading-relaxed">{post.caption}</p>

          {/* Engagement */}
          <div className="flex items-center gap-4 pt-4 border-t border-neutral-700">
            <button className="text-brand hover:text-pink-400 transition flex items-center gap-2 text-sm">
              <span>{post.liked ? '❤️' : '🤍'}</span>
              <span>{post.likes}</span>
            </button>
            <button className="text-neutral-400 hover:text-neutral-300 transition flex items-center gap-2 text-sm">
              <span>💬</span>
              <span>Comment</span>
            </button>
            <button className="text-neutral-400 hover:text-neutral-300 transition flex items-center gap-2 text-sm ml-auto">
              <span>📍</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
