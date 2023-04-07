/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const PLAYERS = {
  X: 'X',
  O: 'O',
};

function App() {
  const [board, setBoard] = React.useState(
    Array(3)
      .fill('')
      .map(() => Array(3).fill('')),
  );
  const [winner, setWinner] = React.useState(null);
  const [isDraw, setIsDraw] = React.useState(false);
  const [lockBoard, setLockBoard] = React.useState(false);
  const [currentPlayer, setCurrentPlayer] = React.useState(PLAYERS.X);

  const handlePress = ({row, column}) => {
    let hasBeenUpdated;

    if (winner) {
      return;
    }
    if (!lockBoard) {
      hasBeenUpdated = updateBoard(row, column);
    }

    if (boardIsFull()) {
      setIsDraw(true);
      setLockBoard(true);
      return;
    }
    checkWinner();
    if (hasBeenUpdated) {
      switchPlayer();
    }
  };

  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer === PLAYERS.X ? PLAYERS.O : PLAYERS.X);
  };

  const checkWinner = () => {
    const hasWinner = checkRows() || checkColumns() || checkDiagonals();
    if (hasWinner) {
      setWinner(hasWinner);
    }
  };

  const checkRows = () => {
    for (let i = 0; i < 3; i++) {
      const row = board[i];
      if (row[0] === row[1] && row[1] === row[2] && row[0] !== '') {
        return row[0];
      }
    }
    return null;
  };

  const checkColumns = () => {
    for (let i = 0; i < 3; i++) {
      const column = [board[0][i], board[1][i], board[2][i]];
      if (
        column[0] === column[1] &&
        column[1] === column[2] &&
        column[0] !== ''
      ) {
        return column[0];
      }
    }
    return null;
  };

  const checkDiagonals = () => {
    const diagonal1 = [board[0][0], board[1][1], board[2][2]];
    const diagonal2 = [board[0][2], board[1][1], board[2][0]];
    if (
      (diagonal1[0] === diagonal1[1] &&
        diagonal1[1] === diagonal1[2] &&
        diagonal1[0] !== '') ||
      (diagonal2[0] === diagonal2[1] &&
        diagonal2[1] === diagonal2[2] &&
        diagonal2[0] !== '')
    ) {
      return diagonal1[0];
    }
    return null;
  };

  const updateBoard = (row, column) => {
    const newBoard = [...board];
    if (newBoard[row][column] !== '') {
      return false;
    }
    newBoard[row][column] = currentPlayer;
    setBoard(newBoard);
    return true;
  };

  const resetGame = () => {
    setBoard(
      Array(3)
        .fill('')
        .map(() => Array(3).fill('')),
    );
    setWinner(null);
    setCurrentPlayer(PLAYERS.X);
    setIsDraw(false);
    setLockBoard(false);
  };

  const boardIsFull = () => {
    return board.every(row => row.every(cell => cell !== ''));
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.board}>
        <View style={styles.gameContainer}>
          <Text style={styles.gameTitle}>Game</Text>
          <View style={styles.board}>
            {board.map((row, rowIndex) => (
              <View style={styles.row} key={rowIndex}>
                {row.map((cell, columnIndex) => (
                  <View style={styles.cell}>
                    <TouchableOpacity
                      key={columnIndex}
                      style={styles.button}
                      onPress={() =>
                        handlePress({row: rowIndex, column: columnIndex})
                      }>
                      <Text>{cell}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))}
          </View>

          <Text style={styles.turno}>{`Turno: ${currentPlayer}`}</Text>
          {winner && <Text style={styles.winner}>{`Winner: ${winner}`}</Text>}
          <View style={styles.controlPanel}>
            <TouchableOpacity onPress={resetGame}>
              <Text style={styles.controlPanelButton}>Resetear</Text>
            </TouchableOpacity>
            <View>
              {/* <Text>|</Text> */}
              {isDraw && <Text style={styles.controlPanelButton}>Empate</Text>}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    backgroundColor: '#20232A',
    width: '100%',
    display: 'flex',
    gap: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  gameTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  turno: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
  },
  controlLabel: {
    fontSize: 20,
  },
  controlPanelButton: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'purple',
    padding: 15,
    borderRadius: 100,
  },
  controlPanel: {
    display: 'flex',
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reset: {
    fontSize: 20,
  },
  winner: {
    fontSize: 50,
    color: 'purple',
  },
  board: {
    display: 'flex',
    gap: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderColor: 'white',
    color: '"white"',
    borderRadius: 10,
    borderWidth: 1,
  },
});

export default App;
