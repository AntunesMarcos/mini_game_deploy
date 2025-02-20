import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Level1.css';

function Level1() {
    const navigate = useNavigate();

    const emojis = ['💖', '🌸', '🍓', '🌟', '🐻', '🐧', '🦋', '🐢', '🍒', '🎈'];

    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };


    const [shuffledEmojis] = useState(() => shuffleArray([...emojis, ...emojis]));
    const [flipped, setFlipped] = useState(Array(shuffledEmojis.length).fill(false));
    const [matched, setMatched] = useState(Array(shuffledEmojis.length).fill(false));
    const [selected, setSelected] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [showNextLevelMessage, setShowNextLevelMessage] = useState(false);

    useEffect(() => {
        if (matched.length > 0 && matched.every(Boolean)) {
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
                navigate('/level2');
            }, 3500);
        }
    }, [matched, navigate]);

    const handleNextLevel = () => {
        setShowNextLevelMessage(true);
        setTimeout(() => {
            setShowNextLevelMessage(false);
        }, 3050);
    };

    const handleCardClick = (index) => {
        if (flipped[index] || matched[index] || selected.length === 2) return;

        const newFlipped = [...flipped];
        newFlipped[index] = true;
        setFlipped(newFlipped);

        const newSelected = [...selected, index];
        setSelected(newSelected);

        if (newSelected.length === 2) {
            const [first, second] = newSelected;
            if (shuffledEmojis[first] === shuffledEmojis[second]) {
                const newMatched = [...matched];
                newMatched[first] = true;
                newMatched[second] = true;
                setMatched(newMatched);
            } else {
                setTimeout(() => {
                    const resetFlipped = [...newFlipped];
                    resetFlipped[first] = false;
                    resetFlipped[second] = false;
                    setFlipped(resetFlipped);
                }, 800);
            }
            setTimeout(() => setSelected([]), 800);
        }
    };

    return (
        <div className="level">
            <h2>Jogo da Memória</h2>
            <div className="cards">
                {shuffledEmojis.map((emoji, index) => (
                    <div
                        key={index}
                        className={`card ${flipped[index] || matched[index] ? 'flipped' : ''}`}
                        onClick={() => handleCardClick(index)}
                    >
                        <div className="card-inner">
                            <div className="card-front">❓</div>
                            <div className="card-back">{emoji}</div>
                        </div>
                    </div>
                ))}
            </div>
            {showMessage && (
                <div className="success-message">
                    🌟💖 <strong>Uau!</strong> Você arrasou! 💖🌟 <br />
                    Você conseguiu encontrar todos os pares perfeitos, assim como eu encontrei você, minha gatinha! 🐱💘💞 <br />
                    Vamos seguir juntinhos para o próximo desafio? 🚀✨
                </div>
            )}
            {showNextLevelMessage && (
                <div className="next-level-message">
                    🎉✨ Calma! Termina esse nível primeiro depois ce pula, bê 💖🚀
                </div>
            )}

            <p>💡 Encontre todos os pares para seguir adiante! 💕</p>
            <button onClick={handleNextLevel} type="button">Próximo nível</button>
        </div>
    );
}

export default Level1;
