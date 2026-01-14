# 🧳 Job Application Tracker

A modern web application to track job applications with statuses, notes, follow-ups, and attached JD screenshots/files. Built with:

- **Laravel 12** (API + backend logic)
- **Inertia.js**
- **React 19 + TypeScript**
- **Spatie Laravel Permission** (roles & permissions)
- **MySQL / MariaDB**
- **Tailwind CSS + shadcn/ui**
- **File uploads (multipart/form-data)**

## ✨ Features

✔ Track job applications with fields:  
`company_name`, `position`, `status`, `applied_at`, `follow_up_dates`, `job_url`, `source`, `location`, `notes`

✔ Upload multiple JD files (images / PDF)

✔ View attachments & preview images in modal

✔ Download attachments from preview window

✔ Filter by status + search by company/position

✔ Role-based access control using Spatie (`admin`, `user`)

✔ Admin can manage users

✔ Clean UI with React + shadcn/ui

✔ Inertia-powered SPA without maintaining a separate API

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 12 |
| Frontend | React 19 + TS (via Inertia) |
| Auth | Laravel Breeze (Inertia React) |
| RBAC | Spatie Laravel-Permission |
| Styling | Tailwind CSS + shadcn/ui |
| DB | MySQL/MariaDB |
| File Uploads | Laravel Storage |

## 🚀 Installation & Setup

### 1. Clone Repo

```bash
git clone https://github.com/yourname/job-application-tracker.git
cd job-application-tracker
```

### 2. Install Backend Dependencies

```bash
composer install
```

### 3. Environment Setup

Copy example env:

```bash
cp .env.example .env
```

Set DB credentials:

```
DB_DATABASE=job_tracker
DB_USERNAME=root
DB_PASSWORD=
```

Generate app key:

```bash
php artisan key:generate
```

### 4. Install Frontend Dependencies

```bash
npm install
```

### 5. Configure Storage

```bash
php artisan storage:link
```

### 6. Database Migration + Seed

```bash
php artisan migrate
php artisan db:seed   # optional
```

## 🔐 Authentication & Authorization

Uses Laravel Breeze + Spatie Permission.

Roles:

| Role | Capabilities |
|---|---|
| `admin` | Manage users |
| `user` | Manage own applications |

## 📁 File Uploads

Attachments stored in:

```
storage/app/public/job-attachments/{id}
```

Public via:

```
/storage/job-attachments/{id}/filename.ext
```

## 🧩 Frontend Behavior

Uses `useForm()` from Inertia for form + validation.

For PUT with files, uses:

```ts
setData("_method", "PUT");
post(route("job-applications.update", editing.id), { forceFormData: true });
```

## 📡 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/job-applications` | List applications |
| POST | `/job-applications` | Create |
| PUT/POST | `/job-applications/{id}` | Update |
| DELETE | `/job-applications/{id}` | Delete |
| DELETE | `/job-application-attachments/{id}` | Delete attachment |

## 🧱 Project Structure

```
app/
 ├── Http/
 │    ├── Controllers/
 │    ├── Requests/
 ├── Models/
resources/
 └── js/
      ├── Pages/
      ├── Components/
      └── Layouts/
```

## 🧼 Clean Architecture

Controller → Service → Repository → Model

Improves testability & separation of concerns.

## 🧪 Validation

Via Form Requests:

- StoreJobApplicationRequest
- UpdateJobApplicationRequest

## 🧑‍💻 Development

Backend:

```bash
php artisan serve
```

Frontend:

```bash
npm run dev
```

## 🧾 License

MIT License

## 👍 Contributions

PRs welcome!
