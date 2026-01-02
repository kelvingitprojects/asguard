# Component Library

## Atoms

### Typography
Base text component that enforces theme typography.
- Props: `variant` (h1, h2, h3, body, caption), `color`, `style`.

### Button
Standard button component.
- Props: `title`, `onPress`, `variant` (primary, secondary, ghost), `loading`, `disabled`.

### Card
Container with standardized padding and border radius.
- Props: `variant` (default, elevated, outlined).

## Molecules

### VehicleCard
Displays vehicle summary (Name, Plate, Status).
- Used in: Home Screen list.

### AlertItem
Displays alert details with color coding based on type.
- Types: theft (Red), movement (Blue), maintenance (Yellow), update (Green).

## Theme
Defined in `src/theme/index.js`.
- Colors: Dark Navy background (`#0f172a`), Red Primary (`#ef4444`).
- Spacing: 8dp grid system.
