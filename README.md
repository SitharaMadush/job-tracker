# Job Application Tracker

A full-stack web application for tracking job applications, built with modern technologies and clean architecture principles. This project demonstrates proficiency in Laravel, React, TypeScript, and software design patterns.

## Key Skills Demonstrated

- **Full-Stack Development**: Laravel 12 backend with React 18 + TypeScript frontend
- **Clean Architecture**: Domain-Driven Design with separated layers (Domain, Application, Infrastructure)
- **Modern Frontend**: React with TypeScript, Inertia.js SPA, shadcn/ui component library
- **Design Patterns**: Repository Pattern, Service Layer, Dependency Injection
- **Security**: Role-Based Access Control (RBAC) with Spatie Laravel-Permission
- **DevOps**: Docker containerization with production-ready configuration

---

## Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **PHP 8.2+** | Server-side language |
| **Laravel 12** | Backend framework |
| **Inertia.js** | SPA bridge (eliminates API layer) |
| **Spatie Laravel-Permission** | RBAC & authorization |
| **Laravel Sanctum** | API authentication |
| **MySQL/MariaDB** | Database |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | Accessible component library |
| **Radix UI** | Headless UI primitives |
| **Vite** | Build tool & dev server |

### DevOps & Tooling
| Technology | Purpose |
|------------|---------|
| **Docker** | Containerization |
| **Nginx** | Production web server |
| **PHPUnit** | Backend testing |
| **Pint** | PHP code formatting |

---

## Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

```
Controller → Service → Repository → Model
```

### Layered Architecture

```
app/
├── Domain/                          # Core business logic (framework-agnostic)
│   ├── JobApplications/
│   │   └── Repositories/
│   │       └── JobApplicationRepositoryInterface.php
│   └── Users/
│       └── Repositories/
│           └── UserRepositoryInterface.php
│
├── Application/                     # Use cases & business services
│   ├── JobApplications/
│   │   └── JobApplicationService.php
│   └── Users/
│       └── UserManagementService.php
│
├── Infrastructure/                  # External implementations
│   └── Repositories/
│       ├── EloquentJobApplicationRepository.php
│       └── EloquentUserRepository.php
│
├── Http/                            # Web layer
│   ├── Controllers/
│   │   ├── Auth/                    # Authentication controllers
│   │   ├── JobApplicationController.php
│   │   ├── JobApplicationAttachmentController.php
│   │   └── UserManagementController.php
│   ├── Middleware/
│   │   └── HandleInertiaRequests.php
│   └── Requests/                    # Form request validation
│       ├── StoreJobApplicationRequest.php
│       └── UpdateJobApplicationRequest.php
│
├── Models/                          # Eloquent models
│   ├── User.php
│   ├── JobApplication.php
│   └── JobApplicationAttachment.php
│
└── Providers/
    ├── AppServiceProvider.php
    └── RepositoryServiceProvider.php  # DI bindings
```

### Frontend Structure

```
resources/js/
├── app.tsx                          # Application entry point
├── bootstrap.ts                     # Axios configuration
│
├── Pages/                           # Inertia page components
│   ├── Auth/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── ...
│   ├── Admin/
│   │   └── Users/
│   │       └── Index.tsx
│   ├── JobApplications/
│   │   └── Index.tsx
│   ├── Profile/
│   │   ├── Edit.tsx
│   │   └── Partials/
│   ├── Dashboard.tsx
│   └── Welcome.tsx
│
├── Layouts/
│   ├── AuthenticatedLayout.tsx
│   └── GuestLayout.tsx
│
├── components/
│   ├── ui/                          # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── table.tsx
│   │   └── ...
│   ├── Modal.tsx
│   ├── Dropdown.tsx
│   └── ...
│
├── lib/
│   └── utils.ts                     # Utility functions (cn, etc.)
│
└── types/
    └── index.d.ts                   # TypeScript type definitions
```

---

## Features

- **Job Application Management**: Track applications with company, position, status, dates, notes, and source
- **File Attachments**: Upload and preview JD files (images, PDFs) with modal viewer
- **Search & Filter**: Filter by status, search by company or position
- **Role-Based Access**: Admin users can manage all users; regular users manage own applications
- **Responsive UI**: Mobile-friendly design with Tailwind CSS
- **Type Safety**: Full TypeScript coverage on frontend

---

## Installation

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL/MariaDB

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/job-application-tracker.git
cd job-application-tracker

# Install dependencies
composer install
npm install

# Environment setup
cp .env.example .env
php artisan key:generate

# Configure database in .env
# DB_DATABASE=job_tracker
# DB_USERNAME=root
# DB_PASSWORD=

# Run migrations
php artisan migrate
php artisan db:seed  # optional

# Link storage
php artisan storage:link

# Start development servers
php artisan serve
npm run dev
```

### Docker (Production)

```bash
docker-compose -f docker-compose.prod.yml up -d
```

---

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/job-applications` | List all applications |
| POST | `/job-applications` | Create new application |
| PUT | `/job-applications/{id}` | Update application |
| DELETE | `/job-applications/{id}` | Delete application |
| DELETE | `/job-application-attachments/{id}` | Delete attachment |

---

## Authorization

| Role | Permissions |
|------|-------------|
| `admin` | Manage all users, view all applications |
| `user` | Manage own job applications |

---

## License

MIT License
