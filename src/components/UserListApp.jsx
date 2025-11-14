import React, { useState, useEffect } from "react";

const UserListApp = () => {
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(null);

  // Fetch users once
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Filter users automatically when userName changes
  useEffect(() => {
    const query = userName.trim().toLowerCase();

    if (!query) {
      setFilteredUsers(null);
      return;
    }

    const matches = userData.filter((u) => u.name.toLowerCase() === query);

    setFilteredUsers(matches);
  }, [userName, userData]);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">User List</h1>

      {/* Search Section */}
      <div className="flex items-center gap-3 mb-6">
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="Enter exact user name (e.g., Ervin Howell)"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <button
          onClick={() => setUserName("")}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition shadow"
        >
          Reset
        </button>
      </div>

      {/* Result Section */}
      {filteredUsers !== null ? (
        filteredUsers.length > 0 ? (
          <ul className="space-y-4">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-200"
              >
                <div>
                  <span className="font-semibold text-gray-700">Name:</span>{" "}
                  {user.name}
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Email:</span>{" "}
                  {user.email}
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Website:</span>{" "}
                  {user.website}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-red-500 font-medium mt-6">
            No user found.
          </p>
        )
      ) : (
        <p className="text-center text-gray-600 mt-6">
          Enter valid username (Ervin Howell)...
        </p>
      )}
    </div>
  );
};

export default UserListApp;
