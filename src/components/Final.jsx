import React from 'react';
import '../styles/Final.css';

function Final() {
    const handleClick = () => {
        const phoneNumber = '5533999374749'; // Substitua pelo seu número
        const message = 'Acabei de ver o site e (Daqui pra frente, escreva a mensagem que você quer enviar)'; 
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="final">
            <h2>💌 Uma mensagem especial para você 💌</h2>
            <p>Eu sei que eu não sou o melhor com palavras, mas queria muito que você soubesse o quanto é especial pra mim. Seu jeitinho doce, engraçado, essa energia leve que você espalha e esse sorriso lindo, com aquela covinha que eu acho muito linda, deixam meus dias muito mais felizes.

                Você é única, de um jeito que encanta e aquece o coração. E cada momento ao seu lado me faz querer estar ainda mais perto, aproveitando cada segundo com você. Gosto muito de você, minha gatinha, e queria que soubesse o quanto você significa pra mim. </p>
            <button onClick={handleClick}>Vamos lá, finalizar! 🎉</button>
        </div>
    );
}

export default Final;
