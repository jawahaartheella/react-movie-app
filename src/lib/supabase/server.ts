import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookieToSet) {
                    try {
                        cookieToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options)
                        });
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing user sessions. 
                        // In Next.js, Server Components can only READ cookies, not write them.
                        // This catch prevents the app from crashing. 
                    }
                }
            }
        }
    )
}