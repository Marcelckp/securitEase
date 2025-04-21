# Load variables from .env file
if [ -f .env ]; then
    export $(grep -E '^(ENV_NAME)=' .env | xargs)
else
    echo ".env file not found. Exiting."
    exit 1
fi

# Check if required variables are set
if [ -z "$ENV_NAME" ]; then
    echo "ENV_NAME must be set in the .env file. Exiting."
    exit 1
fi

CONTAINER_NAME="${ENV_NAME}_container"
IMAGE_NAME="${ENV_NAME}_image"

echo "Starting Docker container with the following settings:"
echo "Container Name: $CONTAINER_NAME"
echo "Image Name: $IMAGE_NAME"

# Stop and remove the container if it's already running or exists to avoid naming collisions/conflicts
if [ "$(docker ps -aq -f name=^${CONTAINER_NAME}$)" ]; then
    echo "Stopping and removing existing container: $CONTAINER_NAME"
    docker stop $CONTAINER_NAME >/dev/null 2>&1
    docker rm $CONTAINER_NAME >/dev/null 2>&1
fi

# Build the Docker image
docker build -t $IMAGE_NAME .

# Check if the image was built successfully
docker run --rm -it --name $CONTAINER_NAME -p 3000:5173 \
  -v $(pwd):/app \
  -v /app/node_modules \
  -w /app -e NODE_ENV=development $IMAGE_NAME

echo "Container started. You can access the application at http://localhost:3000"