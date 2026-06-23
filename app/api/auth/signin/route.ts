import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { token } = await req.json();

  const cookieStore = await cookies();
  cookieStore.set('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return Response.json({ success: true });
}
