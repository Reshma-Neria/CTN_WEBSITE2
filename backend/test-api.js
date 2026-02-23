#!/usr/bin/env node

// Quick test script to verify backend API
const API_URL = 'http://localhost:4000';

console.log('Testing CTN Backend...\n');

// Test 1: GET /
fetch(`${API_URL}/`)
  .then(res => res.text())
  .then(text => console.log('✓ GET / :', text))
  .catch(err => console.error('✗ GET / failed:', err.message));

// Test 2: GET /api/base-stations
setTimeout(() => {
  fetch(`${API_URL}/api/base-stations`)
    .then(res => res.json())
    .then(data => console.log('✓ GET /api/base-stations :', JSON.stringify(data, null, 2)))
    .catch(err => console.error('✗ GET /api/base-stations failed:', err.message));
}, 500);

// Test 3: POST /api/coverage
setTimeout(() => {
  fetch(`${API_URL}/api/coverage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lat: -13.966, lng: 33.76 })
  })
    .then(res => res.json())
    .then(data => console.log('✓ POST /api/coverage :', JSON.stringify(data, null, 2)))
    .catch(err => console.error('✗ POST /api/coverage failed:', err.message));
}, 1000);
