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
      primary: "#facc15", // Tailwind yellow-400
      secondary: "#1a1a1a",
    },
    domain: "adonis-project.vercel.app",
  },
  "10x": {
    name: "10X HEALTH",
    logo: "/10x-logo.svg",
    colors: {
      primary: "#aa0000", // Red #a00
      secondary: "#1a1a1a",
    },
    domain: "10xhealth.vercel.app",
  },
}

export function getTenantConfig(): TenantConfig {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID || "adonis"
  return tenantConfigs[tenantId] || tenantConfigs.adonis
}

export function getTenantId(): string {
  return process.env.NEXT_PUBLIC_TENANT_ID || "adonis"
}
