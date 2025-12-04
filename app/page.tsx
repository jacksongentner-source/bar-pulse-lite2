'use client';

import { useState } from 'react';
import { listVenues, venues as allVenues } from "@/lib/data";
import { VenueCard } from "@/components/VenueCard";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [minAge, setMinAge] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const venues = listVenues();

  const categories = [
    { id: 'all', label: 'All Venues' },
    { id: 'cocktail', label: 'Cocktail Bars' },
    { id: 'club', label: 'Clubs' },
    { id: 'rooftop', label: 'Rooftop' },
    { id: 'beer', label: 'Beer Hall' },
    { id: 'jazz', label: 'Live Music' },
  ];

  const amenities = [
    { id: 'pool', label: '🎱 Pool Tables' },
    { id: 'dj', label: '🎧 DJ' },
    { id: 'dance', label: '💃 Dance Floor' },
    { id: 'jukebox', label: '🎵 Jukebox' },
    { id: 'mechanical', label: '🤠 Mechanical Bull' },
    { id: 'drive', label: '🏎️ Drive Bar' },
    { id: 'pulltabs', label: '🎰 Pull Tabs' },
    { id: 'livemusic', label: '🎸 Live Music' },
  ];

  const amenityMap: Record<string, string> = {
    'pool': 'Pool Tables',
    'dj': 'DJ',
    'dance': 'Dance Floor',
    'jukebox': 'Jukebox',
    'mechanical': 'Mechanical Bull',
    'drive': 'Drive Bar',
    'pulltabs': 'Pull Tabs',
    'livemusic': 'Live Music',
  };

  const toggleAmenity = (amenityId: string) => {
    if (selectedAmenities.includes(amenityId)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenityId));
    } else {
      setSelectedAmenities([...selectedAmenities, amenityId]);
    }
  };

  // Get venue details for age checking and amenities
  const venueMap = new Map(allVenues.map(v => [v.id, v]));

  const filteredVenues = venues.filter((venue: any) => {
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
      venue.type.toLowerCase().includes(selectedCategory.toLowerCase());
    
    // Check age requirement
    const venueDetails = venueMap.get(venue.id);
    const matchesAge = !minAge || (venueDetails?.minAge ? venueDetails.minAge <= parseInt(minAge) : true);
    
    // Check amenities
    const matchesAmenities = selectedAmenities.length === 0 || selectedAmenities.some(amenityId => {
      const amenityName = amenityMap[amenityId];
      return venueDetails?.amenities?.includes(amenityName);
    });
    
    return matchesSearch && matchesCategory && matchesAge && matchesAmenities;
  });

  const ageOptions = [
    { value: '', label: 'Any Age' },
    { value: '18', label: '18+' },
    { value: '21', label: '21+' },
    { value: '25', label: '25+' },
  ];

  return (
    <main className="pb-12">
      {/* Hero Section */}
      <section className="mb-12">
        <h2 className="text-4xl font-bold mb-2">Find tonight's vibe</h2>
        <p className="text-lg text-neutral-400">Discover the best bars and venues in your area</p>
      </section>

      {/* Search & Filter Section */}
      <div className="card mb-8 p-6 space-y-6">
        {/* Search Bar */}
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-300">Search Venues</label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, vibe, or type..."
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
            />
            <span className="absolute right-4 top-3 text-neutral-400">🔍</span>
          </div>
        </div>

        {/* Category & Age Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-3 text-neutral-300">Filter by Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    selectedCategory === category.id
                      ? 'bg-brand text-white shadow-lg shadow-brand/50'
                      : 'bg-neutral-900 text-neutral-300 border border-neutral-700 hover:border-brand'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 text-neutral-300">Age Requirement</label>
            <div className="flex flex-wrap gap-2">
              {ageOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setMinAge(option.value)}
                  className={`px-4 py-2 rounded-full font-medium transition ${
                    minAge === option.value
                      ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/50'
                      : 'bg-neutral-900 text-neutral-300 border border-neutral-700 hover:border-pink-500'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Amenities Filter */}
        <div>
          <label className="block text-sm font-medium mb-3 text-neutral-300">Amenities</label>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity) => (
              <button
                key={amenity.id}
                onClick={() => toggleAmenity(amenity.id)}
                className={`px-3 py-2 rounded-full font-medium transition text-sm ${
                  selectedAmenities.includes(amenity.id)
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-neutral-900 text-neutral-300 border border-neutral-700 hover:border-purple-500'
                }`}
              >
                {amenity.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-sm font-medium mb-2 text-neutral-300">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
            <option value="trending">Trending Now</option>
          </select>
        </div>
      </div>

      {/* Results Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold">
          {filteredVenues.length} venue{filteredVenues.length !== 1 ? 's' : ''} found
        </h3>
        {(searchQuery || minAge || selectedAmenities.length > 0) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setMinAge('');
              setSelectedAmenities([]);
            }}
            className="text-sm text-brand hover:text-pink-400 transition"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Venues Grid */}
      {filteredVenues.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVenues.map(v => <VenueCard key={v.id} v={v as any} />)}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <p className="text-2xl mb-2">🔎</p>
          <p className="text-neutral-400 mb-2">No venues found</p>
          <p className="text-sm text-neutral-500">Try adjusting your search or filters</p>
        </div>
      )}
    </main>
  );
}
