"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

function getFormDetails(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    return { email, password }
}

export async function signup(formData: FormData) {
    const supabase = await createClient();
    const { email, password } = getFormDetails(formData);

    const { error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        redirect("/login?error=" + encodeURIComponent(error.message));
    }

    revalidatePath("/", "layout");
    redirect('/');
}

export async function login(formData: FormData) {
    const supabase = await createClient();
    const { email, password } = getFormDetails(formData);

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/", "layout");
    redirect("/")
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();

    revalidatePath("/", "layout");
    redirect("/login");
}



