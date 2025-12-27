### Framework & Runtime

- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

## Requirements

The following software must be installed on your system to run the project:

- **Node.js**: v18.x or higher
- **pnpm**: v8.x or higher
- **PostgreSQL**: v14.x or higher

### Installing pnpm

If pnpm is not installed:

```bash
npm install -g pnpm
```

### Installation

**Clone the repository:**

```bash
git clone your_repo_git_url
cd your_repo_name
```

**Install dependencies:**

```bash
pnpm install
```

**Configure environment variables:**

Create a `.env` file in the project root directory and add required variables (see [Environment Variables](#-environment-variables) section for details).

You can use the `env.example` file as a template:

```bash
cp env.example .env
```

Then edit the `.env` file with your local database credentials.

**Start the application:**

```bash
pnpm run start:dev
```

## The application will run at **http://localhost:5200** by default.

**Happy coding!**
