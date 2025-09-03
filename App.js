import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Dashboard from "./Screens/dashboard.js";
import Login from "./Screens/Login.js";
import ResetPassword from "./Screens/changepassword.js";
import ForgotPassword from "./Screens/ForgotPassword.js";

export default function App() {
  const [user, setUser] = useState(null);          // Stores logged-in user details
  const [forgotEmail, setForgotEmail] = useState(null); // Stores email for forgot password flow

  // 1️⃣ Forgot password flow → show ForgotPassword screen
  if (forgotEmail && !user) {
    return (
      <>
        <ForgotPassword
          prefilledEmail={forgotEmail}
          onNext={(email) => {
            // Navigate to ResetPassword screen with email
            setUser({ email, isPasswordUpdated: false });
            setForgotEmail(null);
          }}
        />
        <StatusBar style="light" />
      </>
    );
  }

  // 2️⃣ Not logged in & not in forgot password flow → show Login screen
  if (!user) {
    return (
      <>
        <Login 
          onLoginSuccess={setUser} 
          onForgotPassword={() => setForgotEmail("")} // start forgot password flow 
        />
        <StatusBar style="light" />
      </>
    );
  }

  // 3️⃣ Logged in but password not updated → show ResetPassword screen
  if (!user.isPasswordUpdated) {
    return (
      <>
        <ResetPassword 
          user={user} 
          onPasswordUpdated={(updatedUser) => setUser(updatedUser)} 
        />
        <StatusBar style="light" />
      </>
    );
  }

  // 4️⃣ Logged in & password updated → show Dashboard
  return (
    <>
      <Dashboard user={user} />
      <StatusBar style="light" />
    </>
  );
}
