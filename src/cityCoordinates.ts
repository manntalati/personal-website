/**
 * Stored city → map-position lookup, so you don't have to find coordinates by hand.
 * Keys are the lowercased English city name; values are [longitude, latitude].
 *
 * In content.ts you just write `name: "Chicago"` and the pin is placed from this table.
 * If a city isn't here, either add a line below, or set `coordinates` inline on that city
 * (which always overrides this table). To find a lng/lat for a new city: right-click it in
 * Google Maps — it copies "lat, lng" (note: this table is [lng, lat], so swap the order).
 */
const cityCoordinates: Record<string, [number, number]> = {
    // --- United States ---
    "chicago": [-87.63, 41.88],
    "new york": [-74.01, 40.71],
    "new york city": [-74.01, 40.71],
    "los angeles": [-118.24, 34.05],
    "san francisco": [-122.42, 37.77],
    "seattle": [-122.33, 47.61],
    "boston": [-71.06, 42.36],
    "washington": [-77.04, 38.91],
    "washington dc": [-77.04, 38.91],
    "miami": [-80.19, 25.76],
    "austin": [-97.74, 30.27],
    "las vegas": [-115.14, 36.17],
    "denver": [-104.99, 39.74],
    "san diego": [-117.16, 32.72],
    "new orleans": [-90.07, 29.95],
    "philadelphia": [-75.17, 39.95],
    "atlanta": [-84.39, 33.75],
    "houston": [-95.37, 29.76],
    "dallas": [-96.80, 32.78],
    "phoenix": [-112.07, 33.45],
    "portland": [-122.68, 45.52],
    "nashville": [-86.78, 36.16],
    "honolulu": [-157.86, 21.31],
    // California — Monterey Peninsula / Big Sur coast
    "monterey": [-121.90, 36.60],
    "carmel": [-121.92, 36.55],
    "big sur": [-121.81, 36.27],
    "seaside": [-121.85, 36.61],
    "pacifica": [-122.49, 37.61],

    // --- Canada ---
    "toronto": [-79.38, 43.65],
    "vancouver": [-123.12, 49.28],
    "montreal": [-73.57, 45.50],

    // --- Latin America ---
    "mexico city": [-99.13, 19.43],
    "cancun": [-86.85, 21.16],
    "rio de janeiro": [-43.20, -22.91],
    "sao paulo": [-46.63, -23.55],
    "buenos aires": [-58.38, -34.60],
    "lima": [-77.04, -12.05],
    "bogota": [-74.07, 4.71],
    "santiago": [-70.65, -33.45],
    "cartagena": [-75.51, 10.42],
    "punta cana": [-68.37, 18.58],

    // --- Europe ---
    "london": [-0.13, 51.51],
    "paris": [2.35, 48.86],
    "amsterdam": [4.90, 52.37],
    "berlin": [13.40, 52.52],
    "munich": [11.58, 48.14],
    "rome": [12.50, 41.90],
    "milan": [9.19, 45.46],
    "venice": [12.33, 45.44],
    "florence": [11.26, 43.77],
    "naples": [14.27, 40.85],
    "barcelona": [2.17, 41.39],
    "madrid": [-3.70, 40.42],
    "lisbon": [-9.14, 38.72],
    "porto": [-8.61, 41.15],
    "vienna": [16.37, 48.21],
    "prague": [14.42, 50.08],
    "budapest": [19.04, 47.50],
    "zurich": [8.54, 47.37],
    "geneva": [6.14, 46.20],
    "brussels": [4.35, 50.85],
    "copenhagen": [12.57, 55.68],
    "stockholm": [18.07, 59.33],
    "oslo": [10.75, 59.91],
    "helsinki": [24.94, 60.17],
    "dublin": [-6.26, 53.35],
    "edinburgh": [-3.19, 55.95],
    "reykjavik": [-21.94, 64.15],
    "athens": [23.73, 37.98],
    "santorini": [25.46, 36.39],
    "istanbul": [28.98, 41.01],
    "moscow": [37.62, 55.76],
    "saint petersburg": [30.34, 59.93],
    "warsaw": [21.01, 52.23],
    "nice": [7.27, 43.70],

    // --- Middle East & Africa ---
    "dubai": [55.27, 25.20],
    "abu dhabi": [54.37, 24.45],
    "doha": [51.53, 25.29],
    "tel aviv": [34.78, 32.08],
    "jerusalem": [35.21, 31.77],
    "amman": [35.93, 31.95],
    "cairo": [31.24, 30.04],
    "marrakech": [-7.98, 31.63],
    "cape town": [18.42, -33.92],
    "johannesburg": [28.05, -26.20],
    "nairobi": [36.82, -1.29],

    // --- Asia ---
    "tokyo": [139.69, 35.69],
    "kyoto": [135.77, 35.01],
    "osaka": [135.50, 34.69],
    "seoul": [126.98, 37.57],
    "beijing": [116.41, 39.90],
    "shanghai": [121.47, 31.23],
    "hong kong": [114.17, 22.32],
    "taipei": [121.56, 25.03],
    "bangkok": [100.50, 13.76],
    "singapore": [103.82, 1.35],
    "kuala lumpur": [101.69, 3.14],
    "bali": [115.22, -8.65],
    "jakarta": [106.85, -6.21],
    "manila": [120.98, 14.60],
    "delhi": [77.21, 28.61],
    "new delhi": [77.21, 28.61],
    "mumbai": [72.88, 19.08],
    "bangalore": [77.59, 12.97],
    "hanoi": [105.83, 21.03],
    "ho chi minh city": [106.66, 10.82],
    "siem reap": [103.86, 13.36],

    // --- Oceania ---
    "sydney": [151.21, -33.87],
    "melbourne": [144.96, -37.81],
    "auckland": [174.76, -36.85],
    "queenstown": [168.66, -45.03],
};

export default cityCoordinates;
