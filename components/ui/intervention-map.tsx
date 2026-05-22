'use client'

import { useRef, useEffect, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

interface City {
  name: string
  lat: number
  lng: number
}

// Coordinates verified via geo.api.gouv.fr
const cities: City[] = [
  { name: 'Saint-Savinien', lat: 45.8819, lng: -0.6859 },
  { name: 'Saintes', lat: 45.7462, lng: -0.6456 },
  { name: 'Rochefort', lat: 45.9455, lng: -0.9745 },
  { name: "Saint-Jean-d'Angély", lat: 45.9432, lng: -0.5188 },
  { name: 'Tonnay-Charente', lat: 45.9646, lng: -0.8777 },
  { name: "Pont-l'Abbé-d'Arnoult", lat: 45.8255, lng: -0.8670 },
]

const mapStyle: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
        'https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    },
  },
  layers: [
    {
      id: 'osm',
      type: 'raster',
      source: 'osm',
      paint: {
        'raster-saturation': -0.3,
        'raster-brightness-min': 0.1,
        'raster-contrast': -0.1,
      },
    },
  ],
}

export function InterventionMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: [-0.72, 45.88],
      zoom: 7.5,
      minZoom: 7,
      maxZoom: 12,
      attributionControl: false,
      cooperativeGestures: true,
    })

    map.current.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      'top-right'
    )

    map.current.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      'bottom-right'
    )

    map.current.on('load', () => {
      setLoaded(true)
      const m = map.current!

      // Fetch real Charente-Maritime boundary
      fetch('/data/charente-maritime.geojson')
        .then((res) => res.json())
        .then((geojson) => {
          m.addSource('charente-maritime', {
            type: 'geojson',
            data: geojson,
          })

          m.addLayer({
            id: 'charente-fill',
            type: 'fill',
            source: 'charente-maritime',
            paint: {
              'fill-color': '#4e3b2c',
              'fill-opacity': 0.06,
            },
          })

          m.addLayer({
            id: 'charente-border',
            type: 'line',
            source: 'charente-maritime',
            paint: {
              'line-color': '#4e3b2c',
              'line-width': 2,
              'line-opacity': 0.4,
            },
          })
        })
        .catch(() => {
          // Silently fail if boundary can't load
        })
    })

    // Add city markers with working popups
    cities.forEach((city) => {
      const isBase = city.name === 'Saint-Savinien'
      const size = isBase ? 18 : 12

      const el = document.createElement('div')
      el.style.width = `${size}px`
      el.style.height = `${size}px`
      el.style.background = isBase ? '#4e3b2c' : '#6b5545'
      el.style.border = '2.5px solid #faf5f1'
      el.style.borderRadius = '50%'
      el.style.boxShadow = '0 2px 8px rgba(78,59,44,0.4)'
      el.style.cursor = 'pointer'

      const popup = new maplibregl.Popup({
        offset: isBase ? 14 : 10,
        closeButton: false,
        closeOnClick: false,
        className: 'intervention-popup',
      }).setHTML(
        `<div style="font-family: var(--font-dm-sans), sans-serif; padding: 4px 8px;">
          <strong style="color: #4e3b2c; font-size: 14px;">${city.name}</strong>
        </div>`
      )

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([city.lng, city.lat])
        .setPopup(popup)
        .addTo(map.current!)

      // Show popup on hover instead of click
      el.addEventListener('mouseenter', () => {
        marker.togglePopup()
      })
      el.addEventListener('mouseleave', () => {
        marker.togglePopup()
      })
    })

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [])

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gris/30">
      <div ref={mapContainer} className="h-[400px] w-full sm:h-[500px]" />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-cream">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brun/20 border-t-brun" />
        </div>
      )}
      <style jsx global>{`
        .intervention-popup .maplibregl-popup-content {
          border-radius: 10px;
          box-shadow: 0 4px 16px rgba(78, 59, 44, 0.15);
          padding: 0;
        }
        .intervention-popup .maplibregl-popup-tip {
          border-top-color: white;
        }
      `}</style>
    </div>
  )
}
