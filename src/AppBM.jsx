import React, { useState } from "react";
import { Button, TextField, Grid, Typography } from "@mui/material";
import ImagesBM from "./ImagesBM";

/* Este código define un componente funcional llamado `AppBM` utilizando la sintaxis de función de
flecha. También utiliza el enlace `useState` para definir cuatro variables de estado: `deckId`,
`player1Name`, `player1Cards` y `gameStarted`. */
const AppBM = () => {
  const [deckId, setDeckId] = useState("");
  const [player1Name, setPlayer1Name] = useState("");
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

/**
 * Esta función inicia un juego barajando una baraja de cartas y sacando una carta para el jugador 1.
 */
  const startGame = async () => {
    try {
      const shuffleResponse = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      const shuffleData = await shuffleResponse.json();
      const deckId = shuffleData.deck_id;
      setDeckId(deckId);

      const player1Response = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      const player1Data = await player1Response.json();
      const player1DrawnCards = player1Data.cards;
      setPlayer1Cards(player1DrawnCards);

      setGameStarted(true);
    } catch (error) {
      console.log(error);
    }
  };

/**
 * La función verifica si una carta nueva tiene una carta coincidente con palo opuesto en las cartas
 * del jugador 1 y alerta si hay una coincidencia.
 * @returns La función `checkMatch` devuelve un valor booleano que indica si la nueva carta coincide
 * con alguna de las cartas de la matriz `player1Cards`. Si hay un partido, también muestra un mensaje
 * de alerta que indica que el jugador 1 ha ganado.
 */
  const checkMatch = (newCard) => {
    const suitsMap = {
      HEARTS: "SPADES",
      SPADES: "HEARTS",
      CLUBS: "DIAMONDS",
      DIAMONDS: "CLUBS",
    };

    const oppositeSuit = suitsMap[newCard.suit];
    const hasMatch = player1Cards.some(
      (card) => card.value === newCard.value && card.suit === oppositeSuit
    );

    if (hasMatch) {
      window.alert(`¡El jugador ${player1Name} ha ganado!`);
    }

    return hasMatch;
  };

/**
 * Esta función extrae una carta de un mazo usando una API y la agrega a la mano de un jugador si
 * cumple una determinada condición.
 * @returns No hay una declaración de devolución explícita en el fragmento de código, pero es probable
 * que la función "drawCard" se use para actualizar el estado de "player1Cards" si una nueva tarjeta
 * extraída de la API cumple una determinada condición. Si no quedan más tarjetas en la API, se muestra
 * una ventana de alerta. Si se produce un error durante la llamada a la API, se registra en la
 * consola.
 */
  const drawCard = async () => {
    try {
      const player1Response = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      const player1Data = await player1Response.json();

      if (player1Data.remaining === 0) {
        window.alert("No hay más cartas en la API");
        return;
      }

      const newCard = player1Data.cards[0];

      if (checkMatch(newCard)) {
        setPlayer1Cards((prevCards) => [...prevCards, newCard]);
      }
    } catch (error) {
      console.log(error);
    }
  };

/* La instrucción `return` devuelve el código JSX que define la interfaz de usuario del componente
`AppBM`. Incluye un elemento `div` que contiene varios componentes `Typography`, `Grid`,
`TextField`, `Button` e `ImagesBM`. La interfaz de usuario cambia según el valor de la variable de
estado `gameStarted`. Si `gameStarted` es `falso`, muestra un formulario para ingresar el nombre del
jugador y un botón para iniciar el juego. Si `gameStarted` es `true`, muestra un botón para robar
una carta, el nombre del jugador y las imágenes de las cartas en la mano del jugador. */
  return (
    <div>
      <Typography variant="h4">Juego de cartas</Typography>
      <Typography variant="h5">Brayan MArin Guirales</Typography>
      <Typography variant="h6">Politecnico JIC</Typography>
      <Typography variant="h7">2023-1</Typography>

      {!gameStarted ? (
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField
              label="Nombre del jugador 1"
              value={player1Name}
              onChange={(e) => setPlayer1Name(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={startGame}>
              Comenzar Juego
            </Button>
          </Grid>
        </Grid>
      ) : (
        <div>
          <Button variant="contained" onClick={drawCard}>
            Pedir Cartas
          </Button>
          <Typography variant="h5">{player1Name}</Typography>
          <ImagesBM cards={player1Cards} />
        </div>
      )}
    </div>
  );
};

export default AppBM;
