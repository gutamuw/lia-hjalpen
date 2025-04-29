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

export async function registerUser(
  name: string,
  age: number,
  email: string,
  password: string
) {
  const response = await fetch("http://localhost:3000/register-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Skicka JSON istället för FormData
    },
    body: JSON.stringify({
      name,
      age,
      email,
      password,
    }),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to register user");
  }
  return response.json();
}

export async function uploadAvatar(profileImage: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", profileImage); // Fältet måste heta "file" enligt din API-specifikation

  const response = await fetch("http://localhost:3000/upload/avatar", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload avatar");
  }

  const data = await response.json();
  return data.fileUrl; // Returnera URL:en för den uppladdade bilden
}
