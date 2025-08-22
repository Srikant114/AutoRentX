import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

/* Related data: field placeholders */
const PLACEHOLDERS = {
  name: "e.g. John Doe",
  email: "e.g. user@example.com",
  password: "Enter your password",
};

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext();

  // "login" | "register"
  const [state, setState] = useState("login"); // default to register in your screenshot
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const getErrMsg = (err) =>
    err?.response?.data?.message || err?.message || "Request failed";

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      if (state === "register") {
        // Register
        const res = await axios.post("/api/user/register", { name, email, password });
        const ok = (res.status === 201 || res.status === 200) && res.data?.success;

        if (!ok) {
          toast.error(res.data?.message || "Registration failed");
        } else {
          // Show success, switch to login, keep modal open
          toast.success(res.data?.message || "Registration successful.");
          setState("login");
          // clear only password so they can re-enter for login
          setPassword("");
        }
      } else {
        // Login
        const res = await axios.post("/api/user/login", { email, password });
        const ok = (res.status === 200 || res.status === 201) && res.data?.success;

        if (!ok) {
          toast.error(res.data?.message || "Login failed");
        } else {
          const token = res.data?.token;
          if (token) {
            localStorage.setItem("token", token);
            setToken(token);
          }
          toast.success(res.data?.message || "Login successful.");
          setShowLogin(false);        // close modal after login
          navigate("/");              // go home (optional)
        }
      }
    } catch (err) {
      toast.error(getErrMsg(err));     // shows 409 “User already exists.” etc.
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // Overlay (clicking outside closes modal)
    <div
      onClick={() => setShowLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm bg-black/50"
    >
      {/* Modal card (click inside won't close) */}
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-[var(--color-borderColor)] bg-white text-[var(--color-text-secondary)]"
      >
        {/* Title */}
        <p className="text-2xl font-medium m-auto text-[var(--color-text-primary)]">
          <span className="text-[var(--color-primary)]">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {/* Name (only for register) */}
        {state === "register" && (
          <div className="w-full">
            <p className="text-[var(--color-text-primary)]">Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder={PLACEHOLDERS.name}
              className="border border-[var(--color-borderColor)] rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              type="text"
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="w-full">
          <p className="text-[var(--color-text-primary)]">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder={PLACEHOLDERS.email}
            className="border border-[var(--color-borderColor)] rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            type="email"
            required
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <p className="text-[var(--color-text-primary)]">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder={PLACEHOLDERS.password}
            className="border border-[var(--color-borderColor)] rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            type="password"
            required
          />
        </div>

        {/* Switch auth mode */}
        {state === "register" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-[var(--color-primary)] cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-[var(--color-primary)] cursor-pointer"
            >
              click here
            </span>
          </p>
        )}

        {/* Submit */}
        <button
          className="bg-[var(--color-primary)] hover:opacity-90 transition-all text-white w-full py-2 rounded-md cursor-pointer disabled:opacity-60"
          type="submit"
          disabled={submitting}
        >
          {submitting
            ? state === "register" ? "Creating..." : "Logging in..."
            : state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
