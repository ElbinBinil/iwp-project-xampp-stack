async function signup(username, email, password) {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log("Signup successful:", data);
      // Redirect to login page or automatically log in the user
    } else {
      console.error("Signup failed:", data.message);
    }
  } catch (error) {
    console.error("Error during signup:", error);
  }
}

async function login(email, password) {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log("Login successful:", data);
      localStorage.setItem("token", data.token);
      // Redirect to home page or update UI to logged-in state
    } else {
      console.error("Login failed:", data.message);
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
}

export { signup, login };
