import Page from '@/app/payments/page';
import AddUserTable from '@/app/payments/AddUser';

export const ROUTES = [
  { path: '/', component: Page },
  { path: '/add-user', component: AddUserTable }
] as const;