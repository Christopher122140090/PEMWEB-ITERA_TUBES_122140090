#!/bin/bash
# Script to run both backend and frontend tests

echo "Running backend tests..."
export PYTHONPATH=$(pwd)/backend
pytest backend/tests

echo "Running frontend tests..."
cd wardrobe-wise
npm install
npm test -- --watchAll=false
