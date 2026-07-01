const ADMIN_AUTH_KEY = 'anantabyte-admin-auth';

const envUsername = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
const envPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

export function isAdminAuthenticated() {
  return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
}

export function loginAdmin(username: string, password: string) {
  if (username === envUsername && password === envPassword) {
    localStorage.setItem(ADMIN_AUTH_KEY, 'true');
    return true;
  }

  return false;
}

export function logoutAdmin() {
  localStorage.removeItem(ADMIN_AUTH_KEY);
}
