import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@types/index';

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  switchPersona: (role: string) => void;
}

const DEMO_USERS: Record<string, User> = {
  broker: {
    id: 'user-1',
    name: 'Sarah Chen',
    email: 'sarah.chen@mentorbroker.com',
    role: 'broker',
    department: 'Leadership',
    phone: '(415) 555-0100',
  },
  producer: {
    id: 'user-2',
    name: 'Mike Johnson',
    email: 'mike.johnson@mentorbroker.com',
    role: 'producer',
    department: 'Sales',
    phone: '(415) 555-0101',
  },
  csr: {
    id: 'user-3',
    name: 'Emma Davis',
    email: 'emma.davis@mentorbroker.com',
    role: 'csr',
    department: 'Customer Service',
    phone: '(415) 555-0102',
  },
  claims: {
    id: 'user-4',
    name: 'Robert Martinez',
    email: 'robert.martinez@mentorbroker.com',
    role: 'claims',
    department: 'Claims',
    phone: '(415) 555-0103',
  },
  finance: {
    id: 'user-5',
    name: 'Lisa Wong',
    email: 'lisa.wong@mentorbroker.com',
    role: 'finance',
    department: 'Finance',
    phone: '(415) 555-0104',
  },
  admin: {
    id: 'user-6',
    name: 'Admin User',
    email: 'admin@mentorbroker.com',
    role: 'admin',
    department: 'IT',
    phone: '(415) 555-0105',
  },
  customer: {
    id: 'user-7',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'customer',
    phone: '(415) 555-0106',
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,
      login: (user: User) =>
        set({ currentUser: user, isAuthenticated: true }),
      logout: () =>
        set({ currentUser: null, isAuthenticated: false }),
      switchPersona: (role: string) => {
        const user = DEMO_USERS[role];
        if (user) {
          set({ currentUser: user, isAuthenticated: true });
        }
      },
    }),
    {
      name: 'mentor-auth-storage',
    }
  )
);

export const DEMO_PERSONAS = Object.keys(DEMO_USERS).map((key) => ({
  role: key,
  name: DEMO_USERS[key].name,
  title: DEMO_USERS[key].role,
}));
