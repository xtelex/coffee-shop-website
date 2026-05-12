import { useState } from 'react'
import { motion } from 'framer-motion'

export default function StoreLocator() {
  const [searchLocation, setSearchLocation] = useState('')
  const [selectedStore, setSelectedStore] = useState(null)

  const stores = [
    {
      id: 1,
      name: 'Nike The Fort',
      address: 'G/F B3 Bonifacio High St., 9th Ave.',
      city: 'Taguig City, Metro Manila, 1635, PH',
      distance: '0.5 km',
      hours: 'Open • Closes at 9:00 PM',
      lat: 14.5515,
      lng: 121.0485
    },
    {
      id: 2,
      name: 'Nike Glorietta',
      address: 'Unit 227, 2nd Floor, Glorietta 3',
      city: 'Ayala Center',
      location: 'Makati City, 1224, PH',
      distance: '3.0 km',
      hours: 'Open • Closes at 9:00 PM',
      lat: 14.5495,
      lng: 121.0195
    },
    {
      id: 3,
      name: 'Nike SM Mall of Asia',
      address: 'Ground Floor, Main Mall',
      city: 'Pasay City, Metro Manila, 1300, PH',
      distance: '5.2 km',
      hours: 'Open • Closes at 10:00 PM',
      lat: 14.5355,
      lng: 120.9823
    },
    {
      id: 4,
      name: 'Nike Trinoma',
      address: 'Level 2, Trinoma Mall',
      city: 'Quezon City, Metro Manila, 1105, PH',
      distance: '7.8 km',
      hours: 'Open • Closes at 9:00 PM',
      lat: 14.6563,
      lng: 121.0321
    },
    {
      id: 5,
      name: 'Nike SM Megamall',
      address: 'Building A, 2nd Floor',
      city: 'Mandaluyong City, Metro Manila, 1550, PH',
      distance: '4.5 km',
      hours: 'Open • Closes at 9:00 PM',
      lat: 14.5846,
      lng: 121.0565
    }
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for location:', searchLocation)
  }

  return (
    <div className="min-h-screen bg-white pt-32">
      <div className="flex h-[calc(100vh-8rem)]">
        {/* Left Sidebar - Store List */}
        <div className="w-[400px] bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <h1 className="text-2xl font-bold text-black mb-6">Find a ShoesKopo Store</h1>

            {/* Search Location */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="Search Location"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition"
                />
              </div>
            </form>

            {/* Store Count and Filter */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <span className="text-sm text-gray-600">{stores.length} Stores Near You</span>
              <button className="flex items-center gap-2 text-sm font-semibold text-black hover:text-gray-600 transition">
                Filter
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              </button>
            </div>

            {/* Store List */}
            <div className="space-y-4">
              {stores.map((store) => (
                <motion.div
                  key={store.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: store.id * 0.05 }}
                  className={`p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-black transition ${
                    selectedStore?.id === store.id ? 'border-black bg-gray-50' : ''
                  }`}
                  onClick={() => setSelectedStore(store)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-black">{store.name}</h3>
                    <span className="text-sm text-gray-600">{store.distance}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{store.address}</p>
                  <p className="text-sm text-gray-600 mb-2">{store.city}</p>
                  {store.location && <p className="text-sm text-gray-600 mb-2">{store.location}</p>}
                  <p className="text-sm text-gray-900 font-medium">{store.hours}</p>
                </motion.div>
              ))}
            </div>

            {/* View All Stores Link */}
            <button className="w-full mt-6 py-3 border border-black rounded-full text-black font-semibold hover:bg-black hover:text-white transition">
              View all stores
            </button>
          </div>
        </div>

        {/* Right Side - Map */}
        <div className="flex-1 relative bg-gray-100">
          {/* Map Placeholder - In production, integrate Google Maps or Mapbox */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-blue-50">
            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition text-xl font-bold">
                +
              </button>
              <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition text-xl font-bold">
                −
              </button>
            </div>

            {/* Map Attribution */}
            <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded text-xs text-gray-600">
              Maps
            </div>

            {/* Store Markers */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Simulated store markers */}
                {stores.map((store, index) => (
                  <div
                    key={store.id}
                    className="absolute"
                    style={{
                      left: `${30 + index * 15}%`,
                      top: `${20 + index * 12}%`
                    }}
                  >
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 ${
                        selectedStore?.id === store.id 
                          ? 'bg-yellow-400 border-4 border-white shadow-lg' 
                          : 'bg-black border-2 border-white shadow-md'
                      }`}
                      onClick={() => setSelectedStore(store)}
                    >
                      <span className="text-white font-bold text-sm">{store.id}</span>
                    </div>
                    {/* Store count badge */}
                    {index === 1 && (
                      <div className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        4
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Store Info Card */}
            {selectedStore && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 left-4 bg-white rounded-lg shadow-xl p-4 max-w-xs"
              >
                <button
                  onClick={() => setSelectedStore(null)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-black"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h3 className="font-bold text-black mb-2">{selectedStore.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{selectedStore.address}</p>
                <p className="text-sm text-gray-600 mb-2">{selectedStore.city}</p>
                <p className="text-sm text-gray-900 font-medium mb-3">{selectedStore.hours}</p>
                <button className="w-full py-2 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition">
                  Get Directions
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
