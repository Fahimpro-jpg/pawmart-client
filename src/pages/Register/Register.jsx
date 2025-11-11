import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const { signInWithGoogle, createUser, updateUserProfile } = use(AuthContext);
  const navigate = useNavigate();

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

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
    } else {
      setNameError("");
    }

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
    } else {
      setPasswordError("");
    }

    // ✅ Create user in Firebase
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log("User created:", user);
        toast.success("Registration successful 🎉");

        // Update Firebase profile
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            // Save new user to MongoDB including password
            const newUser = { name, email, image: photo, password };

            fetch('http://localhost:3000/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newUser)
            })
              .then(res => res.json())
              .then(data => {
                console.log('User saved to DB:', data);
                toast.success('User saved to database!');
                navigate('/'); // redirect to home
              })
              .catch(err => {
                console.log(err);
                toast.error("Failed to save user to DB!");
              });
          })
          .catch(error => {
            console.log(error);
            toast.error('Profile update failed!');
          });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
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

        navigate('/'); // redirect after login
      })
      .catch(error => {
        console.log(error);
        toast.error('Google sign-in failed!');
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-10">
      <div className="card-body">
        <form onSubmit={handleRegister} className="fieldset">
          <label className="label">Name</label>
          <input type="text" className="input" placeholder="Your Name" name="name" />
          {nameError && <p className="text-red-500 text-sm">{nameError}</p>}

          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Your Email" name="email" />

          <label className="label">Photo URL</label>
          <input type="text" className="input" placeholder="Enter Your Photo URL" name="image" />

          <label className="label">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="input"
            placeholder="Password"
            name="password"
          />
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

          <button
            onClick={handleToggle}
            type="button"
            className="btn btn-xs absolute top-2 right-5"
          >
            {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
          </button>

          <p>
            Already have an account?{" "}
            <Link className="link link-hover text-blue-500" to="/login">
              Login Now!
            </Link>
          </p>

          <button className="btn btn-neutral mt-4">Register</button>
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

export default Register;
