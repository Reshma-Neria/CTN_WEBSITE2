#!/usr/bin/env node

// Quick test script to verify backend API
const API_URL = 'http://localhost:5000';

console.log('Testing CTN Backend...\n');

// Test 1: GET /
fetch(`${API_URL}/`)
  .then((res) => res.text())
  .then((text) => console.log('OK GET /:', text))
  .catch((err) => console.error('FAIL GET /:', err.message));

// Test 2: GET /api/base-stations
setTimeout(() => {
  fetch(`${API_URL}/api/base-stations`)
    .then((res) => res.json())
    .then((data) => console.log('OK GET /api/base-stations:', JSON.stringify(data, null, 2)))
    .catch((err) => console.error('FAIL GET /api/base-stations:', err.message));
}, 500);

// Test 3: POST /api/coverage
setTimeout(() => {
  fetch(`${API_URL}/api/coverage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lat: -13.966, lng: 33.76 }),
  })
    .then((res) => res.json())
    .then((data) => console.log('OK POST /api/coverage:', JSON.stringify(data, null, 2)))
    .catch((err) => console.error('FAIL POST /api/coverage:', err.message));
}, 1000);
