import React, { useEffect, useState } from "react";
import "./homepage.css"; // Import the CSS file
import { fetchListings, fetchUser } from "../services/apiService";
import { useNavigate } from "react-router-dom";

interface Listing {
  id: number;
  title: string;
  description: string;
}
interface User {
  id: number;
  name: string;
  profileImg: string;
}

function Homepage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchListings()
      .then((data) => setListings(data))
      .catch((error) => console.error(error));

    fetchUser()
      .then((data) => setUser(data))
      .catch((error) => {
        console.error(error);
        navigate("/login"); // Omdirigera till inloggningssidan
      });
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="homepage-container wrapper">
      {/* Main Content */}
      <main className="main-content">
        <h1 className="main-title">Annonser</h1>
        <ul className="listings">
          {listings.length > 0 ? (
            listings.map((listing, key) => (
              <li key={key} className="listing-item">
                <h3>{listing.title}</h3>
                <p>{listing.description}</p>
              </li>
            ))
          ) : (
            <p>Inga annonser tillgängliga just nu.</p>
          )}
        </ul>
      </main>

      {/* Sidebar */}
      <aside className="sidebar">
        <img src={user.profileImg} alt="Profile" className="profile-img" />
        <h2 className="user-name">{user.name}</h2>
        <ul className="sidebar-links">
          <li>
            <a href="/profile">Visa profil</a>
          </li>
          <li>
            <a href="/my-listings">Mina annonser</a>
          </li>
          <li>
            <a href="/create-listing">Skapa annons</a>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Homepage;
