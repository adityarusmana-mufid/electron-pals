# Compact Widget Design

## Goal

Reduce Electron Pals into a small, movable top-screen companion.

## Window

The window becomes `300x260` pixels. It opens near the horizontal center at the top of the active display but remains a normal movable, non-resizable window. It is not always-on-top and is not position-locked.

## Layout

The header and controls shrink to reserve the visual center for the cat core. The sky panel fills the remaining space; its local background image remains left-anchored and fitted by height. The electron and cat nucleus scale down together so all orbit elements stay visible.

## Validation

The existing window-options test asserts the new dimensions. `npm test` and `npm run build` verify the changes; `npm run desktop` confirms the startup position and compact layout.
