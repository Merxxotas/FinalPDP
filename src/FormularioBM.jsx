import React, { useState } from 'react';

/**
 * Este es un componente de React que muestra un formulario con un botón para iniciar un juego y
 * establece la ID del mazo usando la API de Deck of Cards.
 * @returns Se está devolviendo un componente funcional llamado `FormularioBM`. Representa un `div` que
 * contiene un `h1` y un `button`. Cuando se hace clic en el botón, llama a la función
 * `handleStartGame` que realiza una llamada a la API para recuperar una nueva baraja de cartas y
 * establece el estado `deckId` con el valor `deck_id` de la respuesta de la API.
 */
const FormularioBM = ({ startGame }) => {
  const [deckId, setDeckId] = useState('');

  const handleStartGame = async () => {
    try {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/');
      const data = await response.json();
      setDeckId(data.deck_id);
      startGame(data.deck_id);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <h1>Registro de jugadores, Parcial Final PDP Brayan Marin Guirales JIC 2023-1</h1> 
      <button onClick={handleStartGame}>Comenzar juego</button>
    </div>
  );
};

export default FormularioBM;