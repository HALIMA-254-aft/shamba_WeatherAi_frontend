// Derives weather alerts from the forecast and writes a sample SMS the way
// WeatherAI's SMS/USSD product would send one. We can't actually SEND texts
// (that endpoint needs a paid Scale plan + compliance approval), so this
// PREVIEWS the message instead — the point is to show the last-mile alerting
// idea that makes WeatherAI useful to people on feature phones.

const RAIN_MM_THRESHOLD = 10; // mm of rain in a day worth warning about
const WIND_THRESHOLD = 40; // km/h — gusty enough to flag
const RAIN_CHANCE_THRESHOLD = 70; // %

export function deriveAlerts(daily, locationLabel) {
  const alerts = [];

  for (const day of daily) {
    const when = formatDay(day.date);

    if (day.precipMm != null && day.precipMm >= RAIN_MM_THRESHOLD) {
      alerts.push({
        type: "rain",
        severity: day.precipMm >= 30 ? "high" : "medium",
        title: "Heavy rain expected",
        sms: `WeatherAI alert for ${locationLabel}: heavy rain (~${Math.round(
          day.precipMm
        )}mm) expected ${when}. Protect harvested crops and check drainage.`,
      });
    } else if (
      day.precipChance != null &&
      day.precipChance >= RAIN_CHANCE_THRESHOLD
    ) {
      alerts.push({
        type: "rain",
        severity: "medium",
        title: "High chance of rain",
        sms: `WeatherAI alert for ${locationLabel}: ${Math.round(
          day.precipChance
        )}% chance of rain ${when}. Plan field work accordingly.`,
      });
    }

    if (day.windSpeed != null && day.windSpeed >= WIND_THRESHOLD) {
      alerts.push({
        type: "wind",
        severity: "medium",
        title: "Strong winds expected",
        sms: `WeatherAI alert for ${locationLabel}: strong winds (~${Math.round(
          day.windSpeed
        )}km/h) ${when}. Secure light structures and young plants.`,
      });
    }
  }

  return alerts.slice(0, 3); // keep the preview tidy
}

function formatDay(date) {
  if (!date) return "soon";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "soon";
  return d.toLocaleDateString(undefined, { weekday: "long" });
}