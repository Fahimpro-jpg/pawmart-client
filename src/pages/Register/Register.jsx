import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const { signInWithGoogle, createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => setShowPassword(!showPassword);

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.image.value;

    // Name validation
    if (name.length < 5) {
      setNameError("Name should be more than 5 characters");
      toast.error("Name should be more than 5 characters");
      return;
    } else setNameError("");

    // Password validation
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    if (!uppercaseRegex.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      toast.error("Add an uppercase letter!");
      return;
    } else if (!lowercaseRegex.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
      toast.error("Add a lowercase letter!");
      return;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      toast.error("Password must be at least 6 characters long");
      return;
    } else setPasswordError("");

    // ✅ Create user in Firebase
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user)
        toast.success("Registration successful 🎉");

        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            const newUser = { name, email, image: photo, password };
            fetch('https://paw-mart-api-server.vercel.app/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newUser)
            })
              .then(res => res.json())
              .then(() => {
                toast.success('User saved to database!');
                navigate('/');
              })
              .catch(() => toast.error("Failed to save user to DB!"));
          })
          .catch(() => toast.error('Profile update failed!'));
      })
      .catch((error) => toast.error(error.message));
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

        const res = await fetch('https://paw-mart-api-server.vercel.app/users');
        const users = await res.json();
        const exists = users.find(user => user.email === newUser.email);

        if (!exists) {
          await fetch('https://paw-mart-api-server.vercel.app/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
          });
        }

        navigate('/');
      })
      .catch(() => toast.error('Google sign-in failed!'));
  };

  return (
    <div
      className="card w-full max-w-sm mx-auto mt-10 shadow-2xl transition-colors duration-500"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)"
      }}
    >
      <div className="card-body">
        <h2 className="text-center text-3xl font-semibold mb-4">
          Register Here
        </h2>

        <form onSubmit={handleRegister} className="relative space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="input w-full border rounded-lg p-2 bg-transparent dark:bg-gray-800 text-[var(--text-color)] border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[var(--btn-bg)] outline-none transition"
            />
            {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="input w-full border rounded-lg p-2 bg-transparent dark:bg-gray-800 text-[var(--text-color)] border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[var(--btn-bg)] outline-none transition"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Photo URL</label>
            <input
              type="text"
              name="image"
              placeholder="Enter Your Photo URL"
              className="input w-full border rounded-lg p-2 bg-transparent dark:bg-gray-800 text-[var(--text-color)] border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[var(--btn-bg)] outline-none transition"
            />
          </div>

          <div className="relative">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input w-full border rounded-lg p-2 bg-transparent dark:bg-gray-800 text-[var(--text-color)] border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[var(--btn-bg)] outline-none transition"
            />
            <button
              type="button"
              onClick={handleToggle}
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-300"
            >
              {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
            </button>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          <p className="text-sm">
            Already have an account?{" "}
            <Link className="text-blue-500 hover:underline" to="/login">
              Login Now!
            </Link>
          </p>

          <button
            type="submit"
            className="btn w-full mt-4 bg-[var(--btn-bg)] text-[var(--btn-text)] hover:opacity-90 transition text-white bg-black"
          >
            Register
          </button>
        </form>

        <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
      </div>
    </div>
  );
};

export default Register;
//  className="btn w-full mt-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white hover:opacity-90 transition"