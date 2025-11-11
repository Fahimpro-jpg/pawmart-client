import React, { useState, use } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const { signInWithGoogle, signInUser } = use(AuthContext);
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleToggle = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // Validation
    if (!email) {
      setEmailError("Email is required");
      toast.error("Email is required!");
      return;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      toast.error("Password is required!");
      return;
    } else {
      setPasswordError("");
    }

    try {
      // ✅ First check in MongoDB users collection
      const res = await fetch(`http://localhost:3000/users`);
      const users = await res.json();

      const existingUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!existingUser) {
        toast.error("Invalid email or password!");
        return;
      }

      // ✅ Sign in using Firebase Auth
      await signInUser(email, password);

      toast.success(`Welcome back, ${existingUser.name} 🎉`);
      navigate('/'); // Redirect to home

    } catch (err) {
      console.log(err);
      toast.error("Login failed. Please try again.");
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        toast.success('Google sign-in successful 🎉');

        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL
        };

        // Save Google user in MongoDB if not exists
        const res = await fetch('http://localhost:3000/users');
        const users = await res.json();
        const exists = users.find(user => user.email === newUser.email);

        if (!exists) {
          await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
          });
        }

        navigate('/'); // Redirect after login
      })
      .catch(error => {
        console.log(error);
        toast.error('Google sign-in failed!');
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-10">
      <div className="card-body">
        <h2 className="text-center text-3xl font-semibold">Login Here</h2>
        <form onSubmit={handleLogin} className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" name="email" />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" name="password" />
          <button
            onClick={handleToggle}
            type="button"
            className="btn btn-xs absolute top-2 right-5"
          > {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}</button>
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

          <p>
            Don't have an account?{" "}
            <Link className="link link-hover text-blue-500" to="/register">
              Register Now!
            </Link>
          </p>

          <button className="btn btn-neutral mt-4">Login</button>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black border-[#e5e5e5] mt-4"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
