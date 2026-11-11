/**
 * The OAuth providers of each auth vendor, by the id the vendor knows, with
 * the name each one shows on its button. A new vendor is a new key here.
 */
export const loginVendors = {
  supabase: {
    google: "Google",
    apple: "Apple",
    github: "GitHub",
    facebook: "Facebook",
  },
} as const;
