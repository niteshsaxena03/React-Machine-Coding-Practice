import { useEffect, useState } from "react";

export const AlbumDisplay = ({ thisIndex, onGoBack, completeAlbums }) => {
  const [currentAlbum, setCurrentAlbum] = useState([]);

  const fillAlbum = () => {
    const startIndex = 50 * (thisIndex - 1);
    const endIndex = 50 * thisIndex;
    const tempAlbum = completeAlbums.slice(startIndex, endIndex);
    setCurrentAlbum(tempAlbum);
  };

  useEffect(() => {
    fillAlbum();
  }, []);
  return (
    <div>
      <h2>You are viewing Album: {thisIndex}</h2>
      <button
        style={{ border: "1px solid red", marginBottom: 20 }}
        onClick={onGoBack}
      >
        Go Back to Main Page
      </button>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
        {currentAlbum.map((album, index) => {
          return (
            <div key={index}>
              <h5>{album.title}</h5>
              <img style={{ height: 100, width: 100 }} src={album.url} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
