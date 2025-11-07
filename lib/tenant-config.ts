interface TenantConfig {
  name: string
  logo: string
  colors: {
    primary: string
    secondary: string
  }
  domain: string
}

const tenantConfigs: Record<string, TenantConfig> = {
  adonis: {
    name: "ADONIS",
    logo: "/adonis-logo.svg",
    colors: {
      primary: "#FCD34D", // Yellow
      secondary: "#1a1a1a",
    },
    domain: "adonis-project.vercel.app",
  },
  athena: {
    name: "ATHENA",
    logo: "/athena-logo.svg",
    colors: {
      primary: "#9333EA", // Purple
      secondary: "#1a1a1a",
    },
    domain: "athena-project.vercel.app",
  },
}

export function getTenantConfig(): TenantConfig {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID || "adonis"
  return tenantConfigs[tenantId] || tenantConfigs.adonis
}

export function getTenantId(): string {
  return process.env.NEXT_PUBLIC_TENANT_ID || "adonis"
}
