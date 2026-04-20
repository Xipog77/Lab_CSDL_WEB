#!/bin/bash

# Docker Management Script for ClassicModels Dashboard
# Usage: ./docker.sh [start|stop|restart|logs|shell|clean]

set -e

PROJECT_NAME="classicmodels"
COMPOSE_FILE="docker-compose.yml"

case "$1" in
    start)
        echo "🚀 Starting ClassicModels Dashboard with Docker..."
        echo "📦 Building and starting MySQL database..."
        docker compose -f $COMPOSE_FILE up -d mysql

        echo "⏳ Waiting for MySQL to be ready..."
        sleep 30

        echo "🐍 Starting Django backend..."
        docker compose -f $COMPOSE_FILE up -d backend

        echo "✅ Services started successfully!"
        echo "🌐 Backend API: http://localhost:8000"
        echo "📊 MySQL Database: localhost:3306"
        echo ""
        echo "To start the frontend, run: npm start"
        ;;

    stop)
        echo "🛑 Stopping all services..."
        docker compose -f $COMPOSE_FILE down
        echo "✅ Services stopped successfully!"
        ;;

    restart)
        echo "🔄 Restarting all services..."
        docker compose -f $COMPOSE_FILE down
        docker compose -f $COMPOSE_FILE up -d
        echo "✅ Services restarted successfully!"
        ;;

    logs)
        if [ -n "$2" ]; then
            docker compose -f $COMPOSE_FILE logs -f $2
        else
            docker compose -f $COMPOSE_FILE logs -f
        fi
        ;;

    shell)
        if [ "$2" = "mysql" ]; then
            echo "🐬 Connecting to MySQL shell..."
            docker compose -f $COMPOSE_FILE exec mysql mysql -u django_user -p classicmodels
        elif [ "$2" = "backend" ]; then
            echo "🐍 Connecting to Django backend shell..."
            docker-compose -f $COMPOSE_FILE exec backend bash
        else
            echo "Usage: $0 shell [mysql|backend]"
            exit 1
        fi
        ;;

    clean)
        echo "🧹 Cleaning up Docker resources..."
        docker compose -f $COMPOSE_FILE down -v
        docker system prune -f
        echo "✅ Cleanup completed!"
        ;;

    status)
        echo "📊 Service Status:"
        docker compose -f $COMPOSE_FILE ps
        ;;

    *)
        echo "ClassicModels Docker Management Script"
        echo ""
        echo "Usage: $0 {start|stop|restart|logs|shell|clean|status}"
        echo ""
        echo "Commands:"
        echo "  start    - Start MySQL and Django backend services"
        echo "  stop     - Stop all services"
        echo "  restart  - Restart all services"
        echo "  logs     - Show logs (add service name for specific logs)"
        echo "  shell    - Connect to service shell (mysql/backend)"
        echo "  clean    - Remove containers, volumes, and prune system"
        echo "  status   - Show service status"
        echo ""
        echo "Examples:"
        echo "  $0 start"
        echo "  $0 logs mysql"
        echo "  $0 shell backend"
        echo "  $0 clean"
        ;;
esac