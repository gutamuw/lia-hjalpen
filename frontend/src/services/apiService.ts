export async function fetchListings() {
  const response = await fetch("http://localhost:3000/listings");
  if (!response.ok) {
    throw new Error("Failed to fetch listings");
  }
  return response.json();
}

export async function fetchUser() {
  const response = await fetch("http://localhost:3000/users/user", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
}

export async function loginUser(email: string, password: string) {
  const response = await fetch("http://localhost:3000/login-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error("Failed to login user");
  }
  return response.json();
}
