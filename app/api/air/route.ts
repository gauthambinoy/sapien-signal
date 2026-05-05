import { NextResponse } from "next/server";
import type { AirQualityStation } from "@/lib/types";

export const revalidate = 600;

const CITIES = [
  { city: "Dublin", lat: 53.33, lon: -6.25 },
  { city: "London", lat: 51.51, lon: -0.13 },
  { city: "New York", lat: 40.71, lon: -74.01 },
  { city: "Tokyo", lat: 35.69, lon: 139.69 },
  { city: "Sydney", lat: -33.87, lon: 151.21 },
  { city: "Mumbai", lat: 19.08, lon: 72.88 },
];

type OpenMeteoAirResponse = {
  current?: {
    time?: string;
    pm2_5?: number;
    pm10?: number;
    european_aqi?: number;
    us_aqi?: number;
  };
  current_units?: {
    pm2_5?: string;
    pm10?: string;
    european_aqi?: string;
    us_aqi?: string;
  };
};

export async function GET() {
  try {
    const results = await Promise.allSettled(
      CITIES.map(async ({ city, lat, lon }) => {
        const res = await fetch(
          `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm2_5,pm10,european_aqi,us_aqi&timezone=auto`,
          { next: { revalidate: 600 } }
        );
        if (!res.ok) return null;
        const data = (await res.json()) as OpenMeteoAirResponse;
        const current = data.current;
        if (!current) return null;

        const station: AirQualityStation = {
          city,
          location: `${lat.toFixed(2)}, ${lon.toFixed(2)}`,
          value: current.us_aqi ?? current.european_aqi ?? current.pm2_5 ?? 0,
          parameter: current.us_aqi != null ? "us_aqi" : current.european_aqi != null ? "european_aqi" : "pm2_5",
          unit: current.us_aqi != null ? "AQI" : current.european_aqi != null ? "EAQI" : data.current_units?.pm2_5 ?? "µg/m³",
          lastUpdated: current.time || "",
        };
        return station;
      })
    );

    const stations = results
      .filter(
        (r): r is PromiseFulfilledResult<AirQualityStation | null> =>
          r.status === "fulfilled"
      )
      .map((r) => r.value)
      .filter((s): s is AirQualityStation => s !== null);

    return NextResponse.json({ stations });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Air quality fetch failed";
    return NextResponse.json({ error: msg, status: 500 }, { status: 500 });
  }
}
