import { redirect } from "next/navigation";
import { NGELECTIONPOLLS_SIGNUP_URL } from "@/lib/registration";

// Preserve saved /register links without showing the obsolete local sign-up form.
export default function RegistrationLayout() {
  redirect(NGELECTIONPOLLS_SIGNUP_URL);
}