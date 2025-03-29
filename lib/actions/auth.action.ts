"use server";

import { auth, db } from "@/firebase/admin";
import { console } from "inspector";
import { cookies } from "next/headers";

const SESSION_EXPIRATION = 60 * 60 * 24 * 7; // 1 week

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    // check if the user already exists in the database
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return { success: false, message: "User already exists. Please sign in" };
    }

    // create a new user in the database
    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error: any) {
    console.error("Error signing up user:", error);

    // handle specific firebase auth error
    if (error.code === "auth/email-already-exists") {
      console.error("This email already exists.");
      return {
        success: false,
        message: "Email already exists. Please sign in",
      };
    }

    return { success: false, message: "Failed to sign up user" };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;
  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      console.error("No user found for email:", email);
      return {
        success: false,
        message: "No user found for email. Please create an account",
      };
    }

    await setSessionCookie(idToken);

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    console.error("Failed to sign in", error);
    return {
      success: false,
      message: "Failed to sign in to account. Please try again",
    };
  }
}

// Sign out user by clearing the session cookie
export async function signOut() {
  const cookieStore = await cookies();

  cookieStore.delete("session");
}

export async function setSessionCookie(idToken: string) {
  // create cookie store
  const cookieStore = await cookies();

  // create a session cookie
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_EXPIRATION * 1000,
  });

  // set the cookie
  cookieStore.set("session", sessionCookie, {
    path: "/",
    maxAge: SESSION_EXPIRATION,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });
}

// Get current user from session cookie
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // get user info from db
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);

    // Invalid or expired session
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
