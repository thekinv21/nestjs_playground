### Framework & Runtime

- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[NestJS](https://nestjs.com/)** v11.0.1 - Progressive Node.js framework
- **[TypeScript](https://www.typescriptlang.org/)** v5.7.3 - Type-safe JavaScript

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

The application will run at **http://localhost:5200** by default.

````


### Code Quality

```bash
pnpm run lint           # Check code quality
pnpm run lint:fix       # Auto-fix linting issues
pnpm run format         # Format code with Prettier
pnpm run format:check    # Check code formatting
pnpm run type-check     # TypeScript type checking
````

### Utilities

```bash
pnpm run clean          # Clean dist and node_modules
```

### Git Hooks

The project uses Husky for pre-commit automatic checks:

- Lint checking
- Format checking
- Type checking

## Contributing

1. Create a branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'feat:[branchName][authorName]: Add amazing feature'`)
3. Push your branch (`git push origin feature/amazing-feature`)
4. Create a Pull Request

### Commit Message Format

Use Conventional Commits standard:

```
feat:[branchName][authorName]: add new feature
fix:[branchName][authorName]: fix bug
docs:[branchName][authorName]: documentation changes
style:[branchName][authorName]: code formatting changes
refactor:[branchName][authorName]: code refactoring
test:[branchName][authorName]: add/edit tests
chore:[branchName][authorName]: general maintenance
```

## Documentation

All documentation is located in the `docs/` folder:

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Architecture documentation

### Port Already in Use

If port 5200 is already in use, change the `APP_PORT` or `PORT` in your `.env` file.

### TypeScript Errors

1. Run `pnpm install` to ensure dependencies are installed
2. Run `pnpm run type-check` to see all type errors
3. Check `tsconfig.json` configuration

## License

This project is under UNLICENSED license - it is private property.

**Author:** Vadim

---

**Happy coding!**
