import { useAuthStore } from '@/store/auth.store';
import { useUserStore } from '@/store/user.store';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('access_token');
    return Response.json({ success: true });
  } catch (error) {
    console.error('error logging out', error);
    return Response.json({ success: false }, { status: 500 });
  }
}
