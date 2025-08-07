import { useEffect, useState } from "react";
import { fetchUser } from "../services/apiService";

export interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
  description?: string;
  profileImage?: string;
  cvLink?: string;
  favorites: string[];
}

const UserProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await fetchUser();
      setUser(currentUser);
    };
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <h1>Användarprofil</h1>
      {user ? (
        <div>
          <img
            src={user.profileImage || "/default-avatar.png"}
            alt="Profilbild"
            width="150"
            height="150"
          />
          <h2>{user.name}</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Ålder:</strong> {user.age}
          </p>
          {user.description && (
            <p>
              <strong>Beskrivning:</strong> {user.description}
            </p>
          )}
          {user.cvLink && (
            <p>
              <strong>CV:</strong>{" "}
              <a href={user.cvLink} target="_blank" rel="noopener noreferrer">
                Visa CV
              </a>
            </p>
          )}
          <p>
            <strong>Antal favoriter:</strong> {user.favorites.length}
          </p>
        </div>
      ) : (
        <p>Laddar användardata...</p>
      )}
    </div>
  );
};

export default UserProfilePage;
