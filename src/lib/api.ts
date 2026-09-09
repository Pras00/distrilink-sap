import { LoginCredentials, UserProfile } from "@/types/auth";

const DUMMY_JSON_LOGIN_URL = "https://dummyjson.com/auth/login";

export async function loginUser(credentials: LoginCredentials): Promise<UserProfile> {
  try {
    const response = await fetch(DUMMY_JSON_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.username.trim(),
        password: credentials.password,
        expiresInMins: credentials.expiresInMins || 60,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Username atau password tidak valid");
    }

    return data as UserProfile;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Terjadi kesalahan jaringan saat mencoba masuk");
  }
}
