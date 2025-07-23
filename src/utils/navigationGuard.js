// src/utils/navigationGuard.js
let isProgrammaticNavigation = false;

export function markProgrammaticNavigation() {
  isProgrammaticNavigation = true;
}

export function isAllowedNavigation() {
  return isProgrammaticNavigation;
}

export function resetNavigationFlag() {
  isProgrammaticNavigation = false;
}
