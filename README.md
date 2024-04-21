# Go + TypeScript/JavaScript Boilerplate

This is a comprehensive boilerplate project that combines a Go backend with a TypeScript/JavaScript frontend, featuring a wide range of technologies and features for building robust and scalable applications.

## Technologies and Features

#### Backend:

- Go language
- Labstack Echo framework
- Gorm ORM (supports SQLite, PostgreSQL, MySQL)
- Swagger for API documentation
- Automated GitHub releases with GoReleaser

#### Frontend:

- TypeScript/JavaScript
- Next.js 14
- Shadcn UI + Tailwind CSS for UI
- Clerk for authentication
- Ionic Capacitor for iOS and Android native app export
- Wails for macOS, Windows, and Linux native app export
- Orval for generating types and API clients from Swagger specs

#### CI/CD:

- GitHub Actions for testing, code build checks, automated releases
- Codacy for code quality analysis
- CodeQL for security scans

#### Infrastructure:

- Fully dockerized builds with Dockerfiles and Docker Compose
- Terraform for automated EC2 instance creation and deployment

## Getting Started

### Prerequisites

- Go (latest stable version)
- Node.js (latest LTS version)
- Tmux (for running both backend and frontend together) (Optional)

### Local Development

0. Create a new repository from the [template](https://github.com/nexentra/midgard.git).

1. Clone the repository.

2. Run the setup script:

```bash
make setup
```

This command will install all dependencies and create environment variable files.

3. Configure the environment variables in the `.env` and `client/.env.local` file.

4. Start the development:

```bash
make run
```

This command will start both the backend and frontend using Tmux for the development environment. You can also run them separately:

```bash
# Start the backend
make run-server

# Start the frontend
make run-client
```

Alternatively, you can use the following commands:

```bash
# Start the backend
go run . start

# Start the frontend
cd client && yarn dev
```

You can also run `go run . help` for an overview of available commands and options from the CLI.

### Swagger and Orval API Documentation

```bash
make docs-gen
```

This command will generate the Swagger and Orval API types, documentations and client.

### Deployment

#### Binary Distribution

You can bundle the frontend and backend into a single binary for deployment, run:

```bash
make builder
```

#### Docker Image

To build the Docker image, run:

```bash
make docker-run
```

#### AWS EC2 Deployment with Terraform

To deploy the application to AWS EC2 using Terraform:

1. Ensure Terraform CLI is installed locally.

2. Make sure you have an AWS key pair named midgard in the us-east-1 region, and download the private key (midgard.pem) to the project's root directory.

3. Navigate to the Terraform directory:

```bash
cd ci/terraform-ec2
```

4. Initialize Terraform:

```bash
terraform init
```

5. Apply the Terraform configuration:

```bash
terraform apply
```

6. Destroy the Terraform configuration:

```bash
terraform destroy
```

### CI/CD

#### Configure GitHub Actions for CI/CD

1. Add these envs to your repo secrets:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= # Publishable key
CLERK_SECRET_KEY= # Secret key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

GO_RELEASER_GITHUB_TOKEN= # GitHub token
```

2. Push to `main` or `dev` branch to trigger the CI/CD pipeline.

3. Run `make release version=v0.0.1` to create a release. NOTE: the `version` argument needs to be a valid semantic version.

## Limitations

- Server-side rendering (SSR) is not supported in Next.js, as the frontend needs to be statically exported to run with native apps.
- The Wails app cannot be run in development mode; it needs to be built before running. Check the scripts/build-wails directory for various platform build scripts for Wails.

## Roadmap

- Improve folder structure and organization.
- Address current limitations.
- Add Ory Kratos and Keto for authentication and authorization.
- Integrate Grafana Labs tools for monitoring, load testing, and logging.
- Add Terraform support for other cloud platforms.
- Add Kubernetes support.
- Implement tests.
- And more!

## Contributing

Contributions are welcome! Please follow the guidelines in the [contributing guide](CONTRIBUTING.md) for details on how to contribute.

## License

This project is licensed under the [BSD 3-Clause License](LICENSE.md)

## Changelog

Check the release notes [here](https://github.com/nexentra/midgard/releases)
