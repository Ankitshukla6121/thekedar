export interface SignupForm {
    name: string,
    email: string,
    password: string,
    role: 'user' | 'contractor' | 'admin',
    terms: boolean
  }
  