// File: C:\Users\hanos\nextall\frontend\src\hooks\cookies.js
'use server';

import { cookies } from 'next/headers';

export async function createCookies(name, token) {
  const OneDay = 24 * 60 * 60 * 1000;
  (await cookies()).set(name, token, { maxAge: OneDay });
}

export async function deleteCookies(name) {
  (await cookies()).delete(name);
}
