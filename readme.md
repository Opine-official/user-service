# User Service

This service is responsible for managing users in the system. It provides functionalities for creating and logging in users.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Docker (optional)

### Installing

1. Clone the repository
2. Navigate to the `user-service` directory
3. Install the dependencies with `pnpm install` (or `npm install` if you're not using pnpm)

### Running the service

To run the service, use the command `pnpm start` (or `npm start`).

## Deployment

This service is containerized using Docker, and can be built and run as a Docker container. The [main.yml](backend/user-service/.github/main.yml) file in the `.github` directory contains a GitHub Actions workflow that automatically builds a Docker image and pushes it to Docker Hub whenever changes are pushed to the `main` branch.

## Built With

- [Express](https://expressjs.com/) - The web framework used
- [Mongoose](https://mongoosejs.com/) - Used for MongoDB object modeling
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Used for password hashing

## Contributing

Currently not open for contributions.

## Authors

- Aravind Sanjeev

## License

This project is licensed under the MIT License.