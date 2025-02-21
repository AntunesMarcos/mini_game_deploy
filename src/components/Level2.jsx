import React, { useState } from 'react';
import '../styles/Level2.css';
import { useNavigate } from 'react-router-dom';

const Level2 = () => {
    const navigate = useNavigate();
    const phrases = [
        "Sorriso",
        "Carinho",
        "Abraco",
        "Alegria",
        "Encanto",
        "Luz do dia",
        "Doce amor",
        "Coracao",
        "Melodia",
        "Felicidade",
        "Aconchego",
        "Magia",
        "Leveza",
        "Luz do sol",
        "Pureza",
        "Ceu azul"
    ];


    const [secretPhrase, setSecretPhrase] = useState(
        phrases[Math.floor(Math.random() * phrases.length)].toUpperCase()
    );
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const maxWrong = 6;
    const [isWinner, setIsWinner] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);

    const handleGuess = (letter) => {
        if (guessedLetters.includes(letter)) return;

        const updatedGuesses = [...guessedLetters, letter];
        setGuessedLetters(updatedGuesses);

        if (!secretPhrase.includes(letter)) {
            setWrongGuesses(wrongGuesses + 1);
        }

        const hasWon = secretPhrase
            .split('')
            .every((char) => char === ' ' || updatedGuesses.includes(char));

        if (hasWon) {
            setIsWinner(true);
            setTimeout(() => {
                setSecretPhrase(
                    phrases[Math.floor(Math.random() * phrases.length)].toUpperCase()
                );
                setGuessedLetters([]);
                setWrongGuesses(0);
                setIsWinner(false);

                setCorrectCount((prev) => {
                    const newCount = prev + 1;
                    if (newCount >= 2) {
                        navigate('/Level3');
                    }
                    return newCount;
                });
            }, 2000);
        }
    };

    const isGameOver = wrongGuesses >= maxWrong;

    if(isGameOver){
        setTimeout(() =>{
                window.location.reload();
            }
        , 2000);
    }

    return (
        <div className="love-hangman">
            <h2>💘 Jogo da Forca do Amor 💘</h2>

            <div className="phrase">
                {secretPhrase.split('').map((char, idx) => (
                    <span key={idx} className="letter">
                        {char === ' ' ? ' ' : guessedLetters.includes(char) ? char : '_'}
                    </span>
                ))}
            </div>

            <div className="alphabet">
                {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').map((letter) => (
                    <button
                        key={letter}
                        onClick={() => handleGuess(letter)}
                        disabled={guessedLetters.includes(letter) || isGameOver || isWinner}
                    >
                        {letter}
                    </button>
                ))}
            </div>

            <div className="hearts">

                <div className="attempts">Tentativas restantes: {maxWrong - wrongGuesses}</div>

            </div>
            <div className="hearts">
                {[...Array(maxWrong)].map((_, idx) => (
                    <span key={idx} className="heart">
                        {idx < maxWrong - wrongGuesses ? '❤️' : '💔'}
                    </span>
                ))}
            </div>

            {isWinner && <h3 className="win-message">🎉 Parabéns! Você acertou! 💖</h3>}
            {isGameOver && <h3 className="lose-message">😭 Game Over! A frase era: {secretPhrase}</h3>}
        </div>
    );
};

export default Level2;
