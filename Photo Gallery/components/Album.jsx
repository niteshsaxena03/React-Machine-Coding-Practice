import { useEffect, useState } from "react";
import { AlbumDisplay } from "./AlbumDisplay";

export const Album = () => {
  const [allAlbums, setAllAlbums] = useState([]);
  const [listOfAlbums, setListOfAlbums] = useState([]);
  const [isViewingAlbum, setIsViewingAlbum] = useState(false);
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(1);

  const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    const result = await response.json();
    let size = result.length / 50;
    const temp = [];
    for (let i = 1; i <= size; i++) {
      temp.push(i);
    }
    setListOfAlbums(temp);
    setAllAlbums(result);
  };

  const toggleView = (albumIndex) => {
    setCurrentAlbumIndex(albumIndex);
    setIsViewingAlbum(true);
  };

  const goBack = () => {
    setIsViewingAlbum(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Gallery</h1>
      <h1>Total Albums: {listOfAlbums.length}</h1>

      {!isViewingAlbum && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            textAlign: "center",
            maxWidth: "500px",
            marginLeft: "10%",
          }}
        >
          {listOfAlbums.map((albumIndex) => {
            return (
              <div
                style={{
                  height: 100,
                  width: 100,
                  border: "1px solid black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  backgroundColor: "yellow",
                  margin: 5,
                }}
                onClick={() => toggleView(albumIndex)}
              >
                {albumIndex}
              </div>
            );
          })}
        </div>
      )}
      {isViewingAlbum && (
        <AlbumDisplay
          thisIndex={currentAlbumIndex}
          onGoBack={goBack}
          completeAlbums={allAlbums}
        />
      )}
    </div>
  );
};
