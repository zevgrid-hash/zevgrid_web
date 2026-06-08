
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// Removed Zap import
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";
import { businessLogin } from "../../lib/api";

import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
  LIGHT_CANVAS_GREY,
} from "../../app/assets/constants/zevgrid-colors";

// Import your local image here! Adjust the path as needed.
import brandLogo from "../../app/assets/logo.png"; 

export default function BusinessLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) return toast.error("Email and password required.");

    setIsSubmitting(true);
    try {
      const payload = await businessLogin({
        email: email.trim(),
        password,
      });

      if (payload?.success === false) {
        throw new Error(payload?.message || "Invalid business credentials.");
      }

      const authData = payload?.data ?? {};
      const token =
        authData.token ||
        authData.accessToken ||
        authData.jwt ||
        authData.data?.token ||
        authData.data?.accessToken;
      const sourceUser = authData.user || authData.business || authData.data?.user;
      const user = sourceUser
        ? {
            id: sourceUser.id,
            email: sourceUser.email,
            name: sourceUser.name,
            company: sourceUser.company,
            contact: sourceUser.contact,
            mobile: sourceUser.mobile,
          }
        : null;

      const safeAuthData = {
        token,
        role: authData.role || "BUSINESS",
        user,
      };

      localStorage.setItem("zevgrid_business_auth", JSON.stringify(safeAuthData));
      if (token) localStorage.setItem("zevgrid_business_token", token);
      localStorage.setItem("zevgrid_business_role", safeAuthData.role);
      if (user) localStorage.setItem("zevgrid_business_user", JSON.stringify(user));

      toast.success(payload?.message || "Welcome back");
      navigate("/search");
    } catch (error) {
      toast.error("Business login failed", {
        description: error.message || "Please check your credentials.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const themeStyles = {
    "--cyan": ELECTRIC_CYAN,
    "--charcoal": ENTERPRISE_CHARCOAL,
    "--charcoal-light": `${ENTERPRISE_CHARCOAL}33`,
    "--charcoal-muted": `${ENTERPRISE_CHARCOAL}99`,
    "--navy": INFRASTRUCTURE_NAVY,
    "--white": CLEAN_WHITE,
    "--grey": LIGHT_CANVAS_GREY,
  };

  return (
    <div data-testid="business-login-page" style={themeStyles} className="mx-auto max-w-md px-4 py-14 sm:px-6 text-[var(--charcoal)]">
      <div className="flex items-center gap-2">
        {/* Replaced Zap icon with your image */}
        <img 
          src={brandLogo} 
          alt="ZevGrid Logo" 
          className="h-8 w-auto object-contain rounded-md" 
        />
        <p className="font-display text-lg font-bold">Business login</p>
      </div>
      <h1 className="mt-4 font-display text-3xl font-bold">Welcome back</h1>
      <p className="mt-2 text-sm text-[var(--charcoal-muted)]">Access your saved shortlists, quotes and requirements.</p>

      <form onSubmit={submit} className="mt-8 space-y-4 rounded-xl border border-[var(--charcoal-light)] bg-[var(--white)] p-6">
        <div>
          <Label htmlFor="email">Work email</Label>
          <Input id="email" data-testid="biz-login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} className="mt-1.5 h-11 border-[var(--charcoal-light)] focus-visible:ring-[var(--cyan)]" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" data-testid="biz-login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isSubmitting} className="mt-1.5 h-11 border-[var(--charcoal-light)] focus-visible:ring-[var(--cyan)]" />
        </div>
        <Button type="submit" disabled={isSubmitting} data-testid="biz-login-submit" className="h-12 w-full rounded-md bg-[var(--cyan)] text-[var(--navy)] text-sm font-bold hover:opacity-90 transition-opacity disabled:cursor-not-allowed disabled:opacity-70">
          {isSubmitting ? "Signing in..." : "Login"}
        </Button>
        <p className="text-center text-sm text-[var(--charcoal-muted)]">
          New here?{" "}
          <Link to="/business/signup" data-testid="biz-login-signup-link" className="font-bold text-[var(--cyan)] hover:underline">
            Create account
          </Link>
        </p>
      </form>

      <div className="mt-6 rounded-lg border border-dashed border-[var(--charcoal-light)] bg-[var(--grey)] p-4 text-xs text-[var(--charcoal-muted)]">
        <p className="font-bold uppercase tracking-widest text-[var(--charcoal-muted)] opacity-80">Secure access</p>
        <p className="mt-1">Use the email and password created during business signup.</p>
      </div>
    </div>
  );
}
