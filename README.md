# SecuritEase Weather App

A production-ready weather application built with React, TypeScript, Vite, and Three.js (via React Three Fiber). The app is installable as a Progressive Web App (PWA).

## Features

- Current weather display for a specified location
- 3-day forecast and 3-day history
- Interactive day selection
- 3D weather visuals using Three.js
- Responsive design
- PWA: installable on desktop and mobile
- Weather API response caching via Service Worker

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Setup

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd SecuritEase
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   - Copy the `.env` file or create one in the project root with the following content:

     ```env
     ENV_NAME=securitease-local
     VITE_WEATHERAPI_KEY=your_weatherapi_key
     VITE_WEATHERAPI_BASE_URL=http://api.weatherapi.com/v1
     ```

   - Replace `your_weatherapi_key` with your actual WeatherAPI key.

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   - The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Docker

Build and run with Docker:

```bash
docker build -t securitease-weather .
docker run -p 8080:8080 securitease-weather
```

Or use the provided script:

```bash
./run_local_docker.sh
```

### Local Environment Script

To install dependencies and start the dev server:

```bash
./run_local_env.sh
```

## PWA & Caching

- The app can be installed to your device from supported browsers (look for the install prompt or use the browser menu).
- Weather API responses are cached in the browser using a service worker. Open DevTools > Console to see cache hit/miss logs.

## Design Decisions

- **Vite** for fast development and PWA support
- **React Three Fiber** for 3D weather visuals
- **Native Fetch API** for WeatherStack integration (to be implemented)
- **Open styling**: add your preferred CSS framework or custom styles

## To Do

- Integrate WeatherStack API
- Implement weather data UI and interactivity
- Add tests for core features
- Polish 3D visuals and UI/UX

## License

MIT
