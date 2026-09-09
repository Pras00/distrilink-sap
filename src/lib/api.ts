import { LoginCredentials, UserProfile } from "@/types/auth";

const DUMMY_JSON_LOGIN_URL = "https://dummyjson.com/auth/login";

export async function loginUser(credentials: LoginCredentials): Promise<UserProfile> {
  try {
    let resolvedUsername = credentials.username.trim();
    const isEmail = resolvedUsername.includes("@");

    // Jika pengguna memasukkan email, cari username terkait di DummyJSON
    if (isEmail) {
      try {
        const searchRes = await fetch(
          `https://dummyjson.com/users/search?q=${encodeURIComponent(resolvedUsername)}`
        );
        if (searchRes.ok) {
          const searchData = await searchRes.json();
          const matchedUser = searchData.users?.find(
            (u: { email: string; username: string }) =>
              u.email.toLowerCase() === resolvedUsername.toLowerCase()
          );
          if (matchedUser) {
            resolvedUsername = matchedUser.username;
          } else {
            throw new Error(
              "Email ini belum terdaftar di database akun. Silakan periksa kembali."
            );
          }
        }
      } catch (searchErr) {
        if (
          searchErr instanceof Error &&
          searchErr.message.includes("belum terdaftar di database")
        ) {
          throw searchErr;
        }
      }
    }

    const response = await fetch(DUMMY_JSON_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: resolvedUsername,
        password: credentials.password,
        expiresInMins: credentials.expiresInMins || 60,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.message === "Invalid credentials" || response.status === 400) {
        if (isEmail) {
          throw new Error(
            "Kata sandi untuk email tersebut tidak sesuai. Silakan periksa kembali."
          );
        }
        throw new Error(
          "Username atau kata sandi tidak sesuai. Silakan periksa kembali."
        );
      }
      throw new Error(data.message || "Username atau kata sandi tidak valid");
    }

    return data as UserProfile;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Gagal terhubung ke server. Periksa koneksi internet Anda.");
  }
}
