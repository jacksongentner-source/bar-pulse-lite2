'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

declare global {
  interface Window {
    google: any;
  }
}

export default function MapPage() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isSignedIn) {
      router.push('/auth');
    }
  }, [isSignedIn, mounted, router]);

  useEffect(() => {
    if (!mounted || !isSignedIn) return;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API key not found. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local');
      setHasApiKey(false);
      return;
    }

    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker`;
      script.async = true;
      script.onload = () => {
        initMap();
        setMapLoaded(true);
      };
      script.onerror = () => {
        console.error('Failed to load Google Maps');
        setHasApiKey(false);
      };
      document.head.appendChild(script);
    } else {
      initMap();
      setMapLoaded(true);
    }
  }, [mounted, isSignedIn]);

  const initMap = () => {
    // Major cities with popular bar districts
    const cities = [
      { name: 'New York', lat: 40.7306, lng: -73.9352, query: 'bars near me' }, // Times Square area
      { name: 'Los Angeles', lat: 34.0522, lng: -118.2437, query: 'bars near me' },
      { name: 'Chicago', lat: 41.8781, lng: -87.6298, query: 'bars near me' },
      { name: 'Miami', lat: 25.7617, lng: -80.1918, query: 'bars near me' },
      { name: 'Las Vegas', lat: 36.1699, lng: -115.1398, query: 'bars near me' },
    ];

    // Default to NYC
    const defaultCity = cities[0];
    const mapElement = document.getElementById('bar-map');
    if (!mapElement) return;

    const map = new window.google.maps.Map(mapElement, {
      zoom: 14,
      center: { lat: defaultCity.lat, lng: defaultCity.lng },
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#1a1a2e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#1a1a2e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#a855f7' }] },
        { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#a855f7' }] },
        { featureType: 'poi', stylers: [{ visibility: 'off' }] },
        { featureType: 'poi.park', elementType: 'geometry.fill', stylers: [{ color: '#0f3e3e' }, { visibility: 'on' }] },
        { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2d1b4e' }] },
        { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#3d2b5e' }] },
        { featureType: 'road.highway', elementType: 'geometry.fill', stylers: [{ color: '#4d3b6e' }] },
        { featureType: 'water', elementType: 'geometry.fill', stylers: [{ color: '#1a0a2e' }] },
      ],
    });

    // Place Service to find bars
    const service = new window.google.maps.places.PlacesService(map);
    const markers: any[] = [];

    const searchBarRequest = {
      location: { lat: defaultCity.lat, lng: defaultCity.lng },
      radius: 2000,
      type: 'bar',
      keyword: 'bar',
    };

    service.nearbySearch(searchBarRequest, (results: any[], status: string) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        results.slice(0, 15).forEach((place: any) => {
          const marker = new window.google.maps.marker.AdvancedMarkerElement({
            position: place.geometry.location,
            map: map,
            title: place.name,
            content: createMarkerContent(place.name),
          });

          markers.push(marker);

          marker.addListener('click', () => {
            showPlaceDetails(service, place.place_id, map);
          });
        });
      }
    });
  };

  const createMarkerContent = (name: string) => {
    const div = document.createElement('div');
    div.style.cssText = `
      background: #a855f7;
      color: white;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
      box-shadow: 0 0 20px rgba(168, 85, 247, 0.8);
      border: 2px solid #ec4899;
      white-space: nowrap;
      cursor: pointer;
      transition: all 0.3s;
    `;
    div.textContent = name;

    div.addEventListener('mouseenter', () => {
      div.style.cssText += `
        background: #ec4899;
        box-shadow: 0 0 30px rgba(236, 72, 153, 1);
        transform: scale(1.1);
      `;
    });

    div.addEventListener('mouseleave', () => {
      div.style.cssText = `
        background: #a855f7;
        color: white;
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: bold;
        box-shadow: 0 0 20px rgba(168, 85, 247, 0.8);
        border: 2px solid #ec4899;
        white-space: nowrap;
        cursor: pointer;
        transition: all 0.3s;
      `;
    });

    return div;
  };

  const showPlaceDetails = (service: any, placeId: string, map: any) => {
    service.getDetails(
      {
        placeId: placeId,
        fields: ['name', 'formatted_address', 'opening_hours', 'rating', 'reviews', 'photos', 'url'],
      },
      (place: any) => {
        if (place && place.geometry && place.geometry.location) {
          map.panTo(place.geometry.location);
          map.setZoom(16);
        }
      }
    );
  };

  if (!mounted || !isSignedIn) {
    return null;
  }

  if (!hasApiKey) {
    return (
      <main className="pb-12">
        <div className="mb-4">
          <h2 className="text-3xl font-bold mb-2">Find Bars Near You</h2>
          <p className="text-neutral-400">Interactive map coming soon!</p>
        </div>
        <div className="card p-12 text-center">
          <p className="text-2xl mb-4">🗺️</p>
          <h3 className="text-xl font-semibold mb-2">Map Feature Setup Required</h3>
          <p className="text-neutral-400 mb-4">To enable the Google Maps integration:</p>
          <ol className="text-left text-neutral-400 max-w-md mx-auto space-y-2 mb-6">
            <li>1. Get a Google Maps API key from <a href="https://developers.google.com/maps" className="text-brand hover:text-pink-400" target="_blank">Google Cloud</a></li>
            <li>2. Add it to <code className="bg-neutral-900 px-2 py-1 rounded">.env.local</code>:</li>
            <li className="bg-neutral-900 p-3 rounded font-mono text-sm">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here</li>
            <li>3. Restart the development server</li>
          </ol>
          <p className="text-sm text-neutral-500">For now, use the Explore page to browse available bars!</p>
        </div>
      </main>
    );
  }

  return (
    <main className="pb-12 h-screen">
      <div className="mb-4">
        <h2 className="text-3xl font-bold mb-2">Find Bars Near You</h2>
        <p className="text-neutral-400">Explore real bars in your area on the map. Click markers for details.</p>
      </div>
      <div
        id="bar-map"
        className="w-full h-[calc(100vh-200px)] rounded-lg border-2 border-brand shadow-lg shadow-brand/30"
        style={{ minHeight: '600px' }}
      />
    </main>
  );
}
