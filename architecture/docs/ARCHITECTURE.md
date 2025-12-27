# Architecture Documentation

## Overview

This project is a modern NestJS backend application that combines **Clean Architecture** and **Layered Architecture** principles. It provides a scalable, maintainable, and testable API for your platforms.

**Author:** Vadim  
**Version:** 0.0.1  
**License:** UNLICENSED

### Clean Architecture Principles

The project is organized according to Clean Architecture principles:

- **Dependency Rule:** Inner layers do not depend on outer layers
- **Separation of Concerns:** Each layer focuses on its own responsibility
- **Testability:** Each layer can be tested independently
- **Framework Independence:** Business logic is independent of the framework

### Layered Architecture

The application consists of 5 main layers:

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (Controllers, DTOs, Interfaces)        │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│          Use Cases Layer                │
│     (Business Logic, Use Cases)         │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│          Domain Layer                   │
│    (Entities, Domain Services)          │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│       Infrastructure Layer              │
│  (Database, Security, Config, WebSocket)│
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│          Shared Layer                   │
│  (Helpers, Decorators, Filters, DTOs)   │
└─────────────────────────────────────────┘
```

## Layer Details

### 1. Presentation Layer (`src/presentation/`)

**Responsibility:** Handles HTTP requests, validates DTOs, and formats responses.

```
presentation/
├── controllers/          # HTTP endpoint handlers
├── dto/                  # Data Transfer Objects
└── interfaces/           # Controller interfaces
```

**Flow:** `HTTP Request → Controller → DTO Validation → Use Case → Response`

### 2. Use Cases Layer (`src/use-cases/`)

**Responsibility:** Implements business logic and uses domain services.

```
use-cases/
├── auth/
├── user/
├── role/
└── permission/
```

**Pattern:**

```typescript
@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(dto: CreateUserDto): Promise<UserDto> {
    // Business logic here
    return plainToInstance(UserDto, savedUser);
  }
}
```

### 3. Domain Layer (`src/domain/`)

**Responsibility:** Contains business rules and domain models.

```
domain/
└── entities/             # Domain entities (TypeORM)
```

**Entity Relationships:**

```
User ──┬── Role ─── Permission
       │
       └── Session
```

### 4. Infrastructure Layer (`src/infrastructure/`)

**Responsibility:** Interaction with the external world (database, security, configuration).

```
infrastructure/
├── config/              # Application configurations
├── database/
│   ├── typeorm/         # TypeORM configuration
│   └── repositories/    # Repository pattern implementations (e.g., SessionRepository)
├── security/jwt/         # JWT authentication
└── websocket/gateway/   # WebSocket gateways
```

**Database Repositories:**

- Repository pattern implementations that wrap TypeORM operations
- Provide clean interface for use cases to interact with database
- Example: `SessionRepository` handles session CRUD operations and complex queries
- These are infrastructure concerns because they depend on TypeORM (external framework)
- Use cases inject these repositories to access database operations

### 5. Shared Layer (`src/shared/`)

**Responsibility:** Common components used by all layers.

```
shared/
├── decorator/           # Reusable decorators
├── dto/                 # Reusable DTOs
├── filter/              # Exception filters
├── helper/              # Reusable Helper functions
├── interceptor/         # Global interceptors
└── types/               # Reusable Type definitions
```

## Module Structure

### Feature Modules (`src/app/`)

- **AuthModule:** Authentication operations
- **UserModule:** User management
- **RoleModule:** Role management
- **PermissionModule:** Permission management
- **SecurityModule:** Security services (JWT, Guards)

### Root Module (`AppModule`)

```typescript
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    SecurityModule,
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
  ],
})
export class AppModule {}
```
