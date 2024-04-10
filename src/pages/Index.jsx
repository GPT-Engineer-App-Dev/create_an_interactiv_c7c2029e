import React, { useState, useEffect } from "react";
import { VStack, HStack, Button, Grid, GridItem, useToast, Box, Text, Center } from "@chakra-ui/react";

// Utility functions
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const aiMove = (squares) => {
  // Simple AI: Chooses a random available square
  const availableSquares = squares.map((square, index) => (square === null ? index : null)).filter((val) => val !== null);
  const randomIndex = Math.floor(Math.random() * availableSquares.length);
  return availableSquares[randomIndex];
};

const Index = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(squares);
  const toast = useToast();

  useEffect(() => {
    if (winner) {
      toast({
        title: `Player ${winner} has won!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else if (!squares.includes(null)) {
      toast({
        title: `It's a draw!`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [winner, squares, toast]);

  useEffect(() => {
    if (!isXNext && !winner) {
      const index = aiMove(squares);
      if (index !== undefined) {
        const newSquares = squares.slice();
        newSquares[index] = "O";
        setSquares(newSquares);
        setIsXNext(true);
      }
    }
  }, [isXNext, squares, winner]);

  const handleSquareClick = (index) => {
    if (squares[index] || winner) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <Center h="100vh">
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Tic Tac Toe
        </Text>
        <Grid templateColumns="repeat(3, 1fr)" gap={2}>
          {squares.map((square, index) => (
            <GridItem key={index} w="40px" h="40px">
              <Button size="lg" colorScheme="teal" variant={square ? "outline" : "solid"} onClick={() => handleSquareClick(index)} isDisabled={!!winner}>
                {square}
              </Button>
            </GridItem>
          ))}
        </Grid>
        <Button colorScheme="pink" onClick={handleReset}>
          Reset Game
        </Button>
      </VStack>
    </Center>
  );
};

export default Index;
