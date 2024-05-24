export interface token {
  token: string | null;
  expiresIn: number | null;
}

export interface user {
  id: number;
  fullName: string;
  username: string;
  role: role;
  createdAt: Date;
}

interface role {
  name: string;
}
