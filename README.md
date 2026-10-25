# Tidewell Swim Club

Next.js 15 (App Router) + TypeScript + CSS Modules. English and Arabic (RTL), light and dark.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

## Routes

| Route | What |
| --- | --- |
| `/` | Home: hero, skills, how it works, calendar, FAQ, footer |
| `/booking` | Step 1: swimmers |
| `/booking/summary` | Step 2: parent details, summary, confirm (redirects to step 1 if children are invalid) |

## Structure

```
src/
  app/            routes, root layout (cookies -> <html lang dir data-theme>), globals.css (tokens only)
  components/
    ui/           Button, Field, SegmentedControl, Banner, Section, Brand, Badge, icons…
    layout/       Header, ThemeSwitch, LanguageSwitch, NetworkBanner, LocaleTransition
    home/         one component per home section
    calendar/     CalendarGrid (shared), SeasonCalendar
    booking/      Stepper, ChildrenStep, ChildCard, PeriodPicker, SummaryStep…
  providers/      I18nProvider, ThemeProvider, BookingProvider (useReducer)
  hooks/          useParentForm, useStepNavigation, usePriceLabels, useOnlineStatus…
  config/         season.ts (periods, times, groups, price), routes.ts
  i18n/           en.ts is the source of truth; ar.ts must match its type
  lib/            pricing, age, calendar, validation (pure, no React)
  services/       bookings.ts (mock API call)
```

## Where to change things

- New season / price / period / group: `src/config/season.ts` and `src/lib/pricing.ts`.
- New text: add it to `en.ts`; TypeScript then forces you to add it to `ar.ts`.
- New language: add to `LOCALES` in `src/i18n/config.ts`, add a dictionary, register it in `dictionaries.ts`.
- Real back end: replace the body of `submitBooking` in `src/services/bookings.ts`.
- New booking step: add it to `BOOKING_STEPS` in `src/config/routes.ts`, create the route and a step label.
