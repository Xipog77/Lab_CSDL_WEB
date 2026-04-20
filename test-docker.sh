#!/bin/bash

# Test Script for ClassicModels Docker Setup
# Usage: ./test-docker.sh

set -e

echo "🧪 Testing ClassicModels Docker Setup"
echo "====================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

# Test 1: Check if Docker is running
echo "1. Checking Docker..."
if docker info >/dev/null 2>&1; then
    print_status 0 "Docker is running"
else
    print_status 1 "Docker is not running"
    echo "   Please start Docker first"
    exit 1
fi

# Test 2: Check if docker-compose.yml exists
echo "2. Checking docker-compose.yml..."
if [ -f "docker-compose.yml" ]; then
    print_status 0 "docker-compose.yml exists"
else
    print_status 1 "docker-compose.yml not found"
    exit 1
fi

# Test 3: Check if Dockerfile.backend exists
echo "3. Checking Dockerfile.backend..."
if [ -f "Dockerfile.backend" ]; then
    print_status 0 "Dockerfile.backend exists"
else
    print_status 1 "Dockerfile.backend not found"
    exit 1
fi

# Test 4: Check if mysqlsampledatabase.sql exists
echo "4. Checking database file..."
if [ -f "mysqlsampledatabase.sql" ]; then
    print_status 0 "mysqlsampledatabase.sql exists"
else
    print_status 1 "mysqlsampledatabase.sql not found"
    exit 1
fi

# Test 5: Check if docker.sh is executable
echo "5. Checking docker.sh script..."
if [ -x "docker.sh" ]; then
    print_status 0 "docker.sh is executable"
else
    print_status 1 "docker.sh is not executable"
    echo "   Run: chmod +x docker.sh"
fi

# Test 6: Validate docker-compose configuration
echo "6. Validating docker-compose configuration..."
if docker compose config >/dev/null 2>&1; then
    print_status 0 "docker-compose.yml is valid"
else
    print_status 1 "docker-compose.yml has errors"
fi

# Test 7: Check if ports are available
echo "7. Checking port availability..."
if lsof -i :3306 >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Port 3306 is already in use${NC}"
    echo "   MySQL port conflict - may need to stop existing MySQL service"
else
    print_status 0 "Port 3306 is available"
fi

if lsof -i :8000 >/dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Port 8000 is already in use${NC}"
    echo "   Django port conflict - may need to stop existing Django server"
else
    print_status 0 "Port 8000 is available"
fi

echo ""
echo "🎯 Test Summary:"
echo "==============="
echo "If all tests passed, you can run:"
echo "  ./docker.sh start"
echo ""
echo "Then start the frontend:"
echo "  npm install && npm start"
echo ""
echo "Access the application at:"
echo "  Frontend: http://localhost:3000"
echo "  Backend API: http://localhost:8000/api"