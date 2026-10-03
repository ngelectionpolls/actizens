import { redirect } from "next/navigation";
import { NGELECTIONPOLLS_LOGIN_URL } from "@/lib/registration";

// Preserve saved /login links without showing the obsolete local sign-in flow.
export default function LoginLayout() {
  redirect(NGELECTIONPOLLS_LOGIN_URL);
}