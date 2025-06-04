#!/bin/sh

# Wait for the database to be ready
echo "Waiting for database to be ready..."
/app/wait-for db:5432 -t 60 -- echo "Database is ready!"

# Apply database migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Start the application
echo "Starting the application..."
exec "$@" 