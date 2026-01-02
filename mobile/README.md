# Asguard Mobile App

## Overview
Asguard is a decentralized vehicle recovery network powered by the community. This mobile application serves as the client for both regular users (Vehicle Owners) and "Sentinels" (Drivers who scan for stolen vehicles).

## Stack
- **Framework:** React Native (Expo)
- **Navigation:** React Navigation (Native Stack + Bottom Tabs)
- **UI/Theming:** Custom atomic design system (Typography, Button, Theme)
- **Animations:** React Native Reanimated + LayoutAnimation
- **Bluetooth:** react-native-ble-plx (Foreground scanning)
- **Storage:** WatermelonDB (Planned/Partial integration)

## Features
### 1. Home
- Status dashboard showing network activity.
- "Report Stolen" functionality with pulsing animation.
- Quick access to vehicle registration.

### 2. Vehicle Registration
- 2-step wizard to register a vehicle.
- Simulates Bluetooth bonding with a "Guardian Tag".

### 3. Driver Dashboard (Sentinel Mode)
- **Radar:** Visualizes scanning for nearby tags.
- **Map:** Dark-themed map showing "BOLO" (Be On The Look Out) alerts.
- **Wallet:** Tracks earnings from network contributions.

### 4. Account & Settings
- **Profile:** Manage personal details.
- **Subscription:** View and manage premium status.
- **Preferences:** Toggle notifications, security settings, and language.
- **Support:** Access FAQs, Contact Support, and Legal docs.

## Setup & Running
1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run on Android/iOS:**
   ```bash
   npx expo start
   ```
   *Note: For Bluetooth functionality, a physical device is recommended. The app will fall back to "Mock Mode" on simulators or if permissions are denied.*

## Permissions (Android 12+)
The app requires the following permissions for the Driver Mode:
- `BLUETOOTH_SCAN`
- `BLUETOOTH_CONNECT`
- `ACCESS_FINE_LOCATION`

These are requested automatically when starting a scan in the Driver Dashboard.

## Architecture Notes
- **Services:** `BLEService` handles Bluetooth interactions (with mock fallback). `BackgroundScanService` manages the scanning logic loop.
- **Components:** Follows Atomic Design (Atoms -> Molecules -> Organisms -> Screens).
