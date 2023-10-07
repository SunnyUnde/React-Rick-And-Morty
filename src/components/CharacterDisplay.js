import React, { useState } from "react";

const CharacterDisplay = () => {
  const [characterName, setCharacterName] = useState("");
  const [characterInfo, setCharacterInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setCharacterName(event.target.value);
  };

  const handleSearch = async () => {
    if (!characterName) {
      alert("Please enter a character name.");
      return;
    }

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${characterName}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.results.length === 0) {
        alert("Character not found.");
        return;
      }
      setCharacterInfo(data.results[0]);
    } catch (error) {
      console.error("Error fetching character data:", error);
      if (error.message == "Network response was not ok") {
        setError("Character not found. Please try some other name.");
      } else {
        setError(
          error.message ?? "An error occurred while fetching character data."
        );
      }
      setCharacterInfo(null);
    }
  };
  return (
    <div className="container">
      <h1 className="mt-4">Rick and Morty Character Info</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter character name"
          value={characterName}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary mt-2" onClick={handleSearch}>
          Search
        </button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {characterInfo && (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Character Information</h2>
            <div className="d-flex">
              <img
                src={characterInfo.image}
                alt={characterInfo.name}
                className="mr-3"
              />
              <div>
                <p>
                  <strong>Name:</strong> {characterInfo.name}
                </p>
                <p>
                  <strong>Status:</strong> {characterInfo.status}
                </p>
                <p>
                  <strong>Species:</strong> {characterInfo.species}
                </p>
                <p>
                  <strong>Gender:</strong> {characterInfo.gender}
                </p>
                <p>
                  <strong>Origin:</strong> {characterInfo.origin.name}
                </p>
                <p>
                  <strong>Location:</strong> {characterInfo.location.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterDisplay;
