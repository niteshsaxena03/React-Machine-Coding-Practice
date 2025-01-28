import { useEffect, useState } from "react";

export const Board = () => {
  const [isXTurn, setIsXTurn] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isGameOver, setIsGameOver] = useState(false);
  const [used, setUsed] = useState([]);

  const initializeBoard = () => {
    const newBoard = Array(9).fill("");
    setBoard(newBoard);
    setUsed([]);
    setIsGameOver(false);
    setIsXTurn(true);
  };

  const resetGame = () => {
    initializeBoard();
  };
  const checkWinner = () => {
    if (board.every((cell) => cell === "")) return;
    if (used.length === board.length) {
      setIsGameOver(true);
      return;
    }

    const checkRow = () => {
      for (let row = 0; row < board.length; row += 3) {
        for (let col = row; col < row + 2; col++) {
          if (board[col] !== board[col + 1]) return false;
        }
      }
      return true;
    };

    const checkCol = () => {
      for (let col = 0; col < 3; col++) {
        for (let row = col; row < board.length; row += 3) {
          if (row + 3 < board.length && board[row] !== board[row + 3])
            return false;
        }
      }
      return true;
    };
    const checkDiagonal = () => {
      if (board[0] !== "" && board[0] === board[4] && board[0] === board[8]) {
        return true; // First diagonal winner
      }
      if (board[2] !== "" && board[2] === board[4] && board[2] === board[6]) {
        return true; // Second diagonal winner
      }
      return false;
    };
    if (checkRow() || checkCol() || checkDiagonal()) {
      setIsGameOver(true);
      return;
    }
  };

  const handleButtonClick = (index) => {
    if (used.includes(index) || isGameOver) return;
    const newBoard = [...board];
    const newUsed = [...used, index];

    for (let i = 0; i < newBoard.length; i++) {
      if (i === index) {
        if (isXTurn) newBoard[i] = "X";
        else newBoard[i] = "O";
      }
    }
    setUsed(newUsed);
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  useEffect(() => {
    initializeBoard();
  }, []);

  useEffect(() => {
    checkWinner();
  }, [board]);

  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      {isGameOver && <h3>Game Over</h3>}
      {!isGameOver && <h3>{isXTurn ? "Player X Turn" : "Player O Turn"}</h3>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          marginBottom: 10,
          gap: "5px",
        }}
      >
        {board.map((letter, index) => {
          return (
            <div
              style={{
                width: 100,
                height: 100,
                border: "1px solid black",
                marginBottom: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
              }}
              onClick={() => handleButtonClick(index)}
            >
              {letter}
            </div>
          );
        })}
      </div>

      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
};
