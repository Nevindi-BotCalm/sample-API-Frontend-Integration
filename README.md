# Frontend Integration API Project

A modern React application built with TypeScript, Vite, and Tailwind CSS featuring user management, dashboard analytics, and API integration with DummyJSON.

##  Features

- **User Management System** - Complete CRUD operations for user data
- **Interactive Dashboard** - Real-time analytics and statistics
- **Data Tables** - Advanced table components with sorting, filtering, and pagination
- **API Integration** - RESTful API integration with axios and React Query
- **State Management** - Zustand for global state management with persistence
- **Notifications** - Toast notifications and real-time updates
- **Responsive Design** - Mobile-first responsive UI with Tailwind CSS
- **Type Safety** - Full TypeScript support with strict type checking
- **Code Quality** - ESLint, Prettier, and Husky for code quality assurance

##  Tech Stack

### Core Technologies
- **React 19** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework

### UI Components
- **Radix UI** - Headless UI components
- **Lucide React** - Icon library
- **Framer Motion** - Animation library
- **React Day Picker** - Date picker component

### State Management & Data Fetching
- **Zustand** - Lightweight state management
- **TanStack React Query** - Server state management
- **Axios** - HTTP client

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Commitlint** - Commit message linting
- **Lint-staged** - Pre-commit linting

##  Project Structure

```
src/
├── apis/                    # API configuration and endpoints
│   ├── axiosConfig.ts      # Axios configuration with interceptors
│   ├── cart.ts             # Cart API endpoints
│   └── user.ts             # User API endpoints
├── app/                    # Application pages
│   └── payments/           # Payment/User management pages
│       ├── AddUser.tsx     # Add user form page
│       ├── columns.tsx     # Table column definitions
│       ├── data-table.tsx  # Data table component
│       └── page.tsx        # Main user table page
├── assets/                 # Static assets
├── components/             # Reusable components
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── ActivityChart.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── DateNotification.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── RecentActivity.tsx
│   │   └── StatCard.tsx
│   ├── ui/                 # Base UI components
│   │   ├── customize-ui/   # Custom table components
│   │   └── [shadcn components] # Button, Dialog, Input, etc.
│   ├── user/               # User management components
│   │   ├── hooks/          # Custom hooks for user operations
│   │   ├── AddUserTable.tsx
│   │   ├── BulkActions.tsx
│   │   ├── columns.tsx
│   │   ├── UserForm.tsx
│   │   ├── UserTable.tsx
│   │   └── [other user components]
│   └── [shared components] # Navigation, Notifications, etc.
├── constants/              # Application constants
│   ├── navItems.constant.ts
│   └── routes.constant.ts
├── data/                   # Sample data
├── lib/                    # Utility libraries
├── libs/                   # Additional libraries
├── pages/                  # Page components
│   ├── pageA/              # Sample page A
│   ├── pageB/              # Sample page B
│   └── Dashboard.tsx       # Main dashboard page
├── store/                  # State management
│   ├── notificationStore.ts
│   └── userStore.ts
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
│   ├── functions.ts
│   ├── helpers.ts
│   └── upload.ts
├── App.tsx                 # Main application component
├── index.css               # Global styles
├── main.tsx                # Application entry point
└── vite-env.d.ts          # Vite type definitions
```

##  Key Components

### Dashboard Components
- **StatCard** - Displays key metrics with icons and trends
- **ActivityChart** - Visual representation of user and cart data
- **RecentActivity** - Shows recent user actions and updates
- **DashboardHeader** - Header with date and navigation
- **LoadingSpinner** - Loading state component

### User Management Components
- **UserTable** - Advanced data table with CRUD operations
- **UserForm** - Form for adding/editing users
- **UserDeleteDialog** - Confirmation dialog for user deletion
- **BulkActions** - Bulk operations for multiple users
- **UserNotifications** - User-specific notification system

### UI Components (Shadcn/ui)
- **Button** - Customizable button component
- **Dialog** - Modal dialog component
- **Input** - Form input component
- **Table** - Data table component
- **Select** - Dropdown select component
- **Calendar** - Date picker component

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Frontend-Integration---API-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run preview` - Preview production build

### Building
- `npm run build` - Build for production
- `npm run build:check` - Build with production mode check
- `npm run build:ts` - TypeScript compilation only

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Check code formatting
- `npm run format:write` - Format code with Prettier
- `npm run type-check` - TypeScript type checking

### Validation
- `npm run validate` - Run all checks (format, lint, build)
- `npm run validate:fix` - Fix issues and validate

### Git Hooks
- `npm run prepare` - Setup Husky git hooks
- `npm run pre-commit` - Pre-commit validation
- `npm run pre-push` - Pre-push validation

## API Integration

The application integrates with **DummyJSON API** for demo data:

### Base Configuration
```typescript
// src/apis/axiosConfig.ts
const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});
```

### Available Endpoints
- **Users API** - User data management
- **Carts API** - Shopping cart data
- **Products API** - Product information

##  State Management

### User Store (Zustand)
```typescript
interface User {
  name: string;
  email: string;
  gender: string;
  department: string;
  phone: string;
  isActive: boolean;
  startDate: string;
}
```

### Features
- **Persistent Storage** - User data persisted in localStorage
- **CRUD Operations** - Add, update, delete users
- **Notifications** - Automatic notifications for user actions

##  Styling & UI

### Tailwind CSS Configuration
- **Version**: 4.1.1
- **Design System**: Utility-first approach
- **Components**: Shadcn/ui component library
- **Icons**: Lucide React icon library
- **Animations**: Framer Motion for smooth animations

### Git Hooks (Husky)
- **Pre-commit** - Lint and format code
- **Pre-push** - Build verification
- **Commit Message** - Conventional commit format

### Deployment Platforms
- **Vercel** - Recommended for React apps
- **Netlify** - Static site hosting
- **AWS S3** - Static website hosting
- **GitHub Pages** - Free hosting option

##  Contributing

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'feat: add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add proper type definitions
- Test components thoroughly
- Follow existing code patterns



##  Support

For support and questions:
- Create an issue in the repository
- Check existing documentation
- Review component examples in the codebase

<!-- ##  Future Enhancements

- [ ] Authentication system
- [ ] Role-based access control
- [ ] Advanced filtering and search
- [ ] Export functionality
- [ ] Real-time updates with WebSocket
- [ ] Mobile app version
- [ ] Advanced analytics dashboard
- [ ] Multi-language support -->

