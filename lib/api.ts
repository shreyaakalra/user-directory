import { User, UsersResponse } from "./types";

const BASE_URL = "https://dummyjson.com";

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users?limit=20`);

  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status}`);
  }

  const data: UsersResponse = await res.json();
  return data.users;
}

export async function getUserById(id: string): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch user ${id}: ${res.status}`);
  }

  return res.json();
}