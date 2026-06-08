
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import logo from "../../app/assets/logo.png";
import { adminLogin } from "../../lib/api";
import {
  ELECTRIC_CYAN,
  ENTERPRISE_CHARCOAL,
  INFRASTRUCTURE_NAVY,
  CLEAN_WHITE,
} from "../../app/assets/constants/zevgrid-colors";


export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("dhundhoo@gmail.com");
  const [password, setPassword] = useState("dhundhoo");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) return toast.error("Enter credentials.");

    setIsSubmitting(true);
    try {
      const payload = await adminLogin({
        email: email.trim(),
        password,
      });
      if (payload?.success === false) {
        throw new Error(payload?.message || "Invalid admin credentials.");
      }

      const authData = payload?.data ?? {};
      const token = authData.token;
      const user = authData.user
        ? {
            id: authData.user.id,
            email: authData.user.email,
            name: authData.user.name,
          }
        : null;

      if (!token) throw new Error("Login response did not include a token.");

      const safeAuthData = {
        token,
        role: authData.role,
        user,
      };

      localStorage.setItem("zevgrid_admin_auth", JSON.stringify(safeAuthData));
      localStorage.setItem("zevgrid_admin_token", token);
      localStorage.setItem("zevgrid_admin_role", authData.role || "");
      if (user) localStorage.setItem("zevgrid_admin_user", JSON.stringify(user));

      toast.success(payload?.message || "Admin access granted");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Admin login failed", {
        description: error.message || "Please check your credentials.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      data-testid="admin-login-page"
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: INFRASTRUCTURE_NAVY,
        padding: "0 1rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "28rem" }}>

        {/* Logo + Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
          <span
            style={{
              display: "flex",
              height: "2.25rem",
              width: "2.25rem",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0.375rem",
              backgroundColor: ELECTRIC_CYAN,
            }}
          >
            <img src={logo} alt="ZevGrid" style={{ height: "2rem", width: "auto" }} />
          </span>
          <div>
            <p style={{ fontSize: "1.125rem", fontWeight: 700, color: CLEAN_WHITE }}>
              ZevGrid<span style={{ color: ELECTRIC_CYAN }}>.</span>
            </p>
            <p
              style={{
                fontSize: "0.625rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: ELECTRIC_CYAN,
              }}
            >
              Admin Console
            </p>
          </div>
        </div>

        {/* Card */}
        <div
          style={{
            marginTop: "2rem",
            borderRadius: "0.75rem",
            border: `1px solid ${ELECTRIC_CYAN}22`,
            backgroundColor: `${ENTERPRISE_CHARCOAL}CC`,
            padding: "1.5rem",
          }}
        >
          {/* Restricted badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: ELECTRIC_CYAN }}>
            <Shield style={{ height: "1rem", width: "1rem" }} />
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              Restricted access
            </p>
          </div>

          <h1 style={{ marginTop: "0.75rem", fontSize: "1.5rem", fontWeight: 700, color: CLEAN_WHITE }}>
            Ops &amp; moderation
          </h1>
          <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#94A3B8" }}>
            Authorized ZevGrid operators only.
          </p>

          {/* Form */}
          <form onSubmit={submit} style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <Label style={{ color: "#CBD5E1" }}>Email</Label>
              <Input
                data-testid="admin-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                style={{
                  marginTop: "0.375rem",
                  height: "2.75rem",
                  border: `1px solid ${ELECTRIC_CYAN}33`,
                  backgroundColor: INFRASTRUCTURE_NAVY,
                  color: CLEAN_WHITE,
                  borderRadius: "0.5rem",
                  outline: "none",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = ELECTRIC_CYAN)}
                onBlur={(e) => (e.currentTarget.style.borderColor = `${ELECTRIC_CYAN}33`)}
              />
            </div>
            <div>
              <Label style={{ color: "#CBD5E1" }}>Password</Label>
              <Input
                data-testid="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                style={{
                  marginTop: "0.375rem",
                  height: "2.75rem",
                  border: `1px solid ${ELECTRIC_CYAN}33`,
                  backgroundColor: INFRASTRUCTURE_NAVY,
                  color: CLEAN_WHITE,
                  borderRadius: "0.5rem",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = ELECTRIC_CYAN)}
                onBlur={(e) => (e.currentTarget.style.borderColor = `${ELECTRIC_CYAN}33`)}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              data-testid="admin-login-submit"
              style={{
                height: "3rem",
                width: "100%",
                borderRadius: "0.5rem",
                backgroundColor: ELECTRIC_CYAN,
                color: ENTERPRISE_CHARCOAL,
                fontSize: "0.875rem",
                fontWeight: 700,
                border: "none",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.7 : 1,
                transition: "opacity 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) e.currentTarget.style.opacity = "0.88";
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) e.currentTarget.style.opacity = "1";
              }}
            >
              {isSubmitting ? "Signing in..." : "Enter console"}
            </Button>
          </form>

          <p style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.75rem", color: "#64748B" }}>
            Authorized credentials required
          </p>
        </div>
      </div>
    </div>
  );
}
