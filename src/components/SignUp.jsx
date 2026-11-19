import { useState } from "react";
import "./SignUp.css";
import { useAuth } from "../auth/useAuth";

const SignUp = () => {
  const { signUp, authError } = useAuth();
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    fullName: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);
    try {
      await signUp(formData);
      window.location.assign("/home");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        {/* Instagram Logo Header */}
        <h1 className="instagram-logo">Instagram</h1>
        <p className="signup-subtitle">
          Sign up to see photos and videos from your friends.
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="emailOrPhone"
            placeholder="Mobile Number or Email"
            value={formData.emailOrPhone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            minLength={3}
            maxLength={30}
            autoComplete="username"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            minLength={8}
            maxLength={128}
            autoComplete="new-password"
            required
          />

          <p className="terms-text">
            People who use our service may have uploaded your contact information
            to Instagram. <a href="#">Learn More</a>
          </p>
          <p className="terms-text">
            By signing up, you agree to our <a href="#">Terms</a>,{" "}
            <a href="#">Privacy Policy</a> and <a href="#">Cookies Policy</a>.
          </p>

          <button type="submit" className="signup-btn" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Sign up"}
          </button>
        </form>

        {authError && <p className="response-message" role="alert">{authError}</p>}
        {message && <p className="response-message">{message}</p>}
      </div>

      {/* Switch to Login Box */}
      <div className="login-redirect-box">
        <p>
          Have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;