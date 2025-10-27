// lib/tenant-config.ts
// Multi-tenant configuration system

export type TenantConfig = {
  id: string;
  name: string;
  colors: {
    primary: string;
    primaryDark: string;
    accent: string;
    background: string;
  };
  pricing: {
    consultation: number;
  };
};

const tenants: Record<string, TenantConfig> = {
  adonis: {
    id: 'adonis',
    name: 'ADONIS',
    colors: {
      primary: '#FBBF24',
      primaryDark: '#F59E0B',
      accent: '#FCD34D',
      background: 'from-black via-gray-900 to-black',
    },
    pricing: {
      consultation: 199,
    },
  },
  '10x': {
    id: '10x',
    name: '10X Health',
    colors: {
      primary: '#3B82F6',
      primaryDark: '#2563EB',
      accent: '#60A5FA',
      background: 'from-blue-950 via-gray-900 to-black',
    },
    pricing: {
      consultation: 299,
    },
  },
};

export function getTenantConfig(): TenantConfig {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID || 'adonis';
  return tenants[tenantId] || tenants.adonis;
}
