export const AUTH_METHODS = [
  {
    id: "GOOGLE_OAUTH",
    name: "Google",
    icon: "logos:google-icon",
  },
  {
    id: "GITHUB_OAUTH",
    name: "GitHub",
    icon: "logos:github-icon",
  },
  // {
  //   id: "CREDENTIALS",
  //   name: "Email & Password",
  //   icon: "lucide:mail",
  // },

  {
    id: "PASSKEY",
    name: "Passkey",
    icon: "lucide:key-round",
  },
] as const

export type AuthMethod = (typeof AUTH_METHODS)[number]["id"]
