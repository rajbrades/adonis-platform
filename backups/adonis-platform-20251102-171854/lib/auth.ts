import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export type UserRole = 'admin' | 'provider' | 'patient';

export async function getCurrentUserRole(): Promise<UserRole | null> {
  const user = await currentUser();
  if (!user) return null;
  
  const role = user.publicMetadata?.role as UserRole | undefined;
  return role || null;
}

export async function hasRole(requiredRole: UserRole | UserRole[]): Promise<boolean> {
  const role = await getCurrentUserRole();
  if (!role) return false;
  
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(role);
  }
  
  return role === requiredRole;
}

export async function requireAdmin() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  const isAdmin = await hasRole('admin');
  
  if (!isAdmin) {
    redirect('/unauthorized');
  }
}

export async function requireProvider() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  const isProvider = await hasRole(['admin', 'provider']);
  
  if (!isProvider) {
    redirect('/unauthorized');
  }
}

export async function getCurrentUserWithRole() {
  const user = await currentUser();
  if (!user) return null;
  
  return {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.publicMetadata?.role as UserRole | undefined,
  };
}
