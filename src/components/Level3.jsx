import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Level3.css';
import maderoLogo from '../asserts/madero.png';
import emailjs from '@emailjs/browser';

const Level3 = () => {
    const navigate = useNavigate();

    const [currentPuzzle, setCurrentPuzzle] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showFinalMessage, setShowFinalMessage] = useState(false);
    const [showLocationDetails, setShowLocationDetails] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [declineMessage, setDeclineMessage] = useState("");
    const [messageText, setMessageText] = useState("");

    const puzzles = [
        // {
        //     question: "🍌 O que acontece se você escorregar em uma casca de banana?",
        //     options: ["Vira Super-Homem", "Cai no chão", "Fica invisível", "Ganha superpoderes"],
        //     answer: "Cai no chão"
        // },
        {
            question: "🔥 O que é mais quente?",
            options: ["O Sol", "Um forno", "Uma sopa morna", "Uma geladeira"],
            answer: "O Sol"
        },
        // {
        //     question: "🐟 Onde os peixes moram?",
        //     options: ["No armário", "No aquário", "No deserto", "No micro-ondas"],
        //     answer: "No aquário"
        // },
        // {
        //     question: "🍞 O que acontece se você colocar pão na torradeira?",
        //     options: ["Ele desaparece", "Vira torrada", "Vira bolo", "Explode"],
        //     answer: "Vira torrada"
        // },
        {
            question: "🎈 O que acontece se você encher um balão demais?",
            options: ["Ele explode", "Vira um foguete", "Fica invisível", "Vira um carro"],
            answer: "Ele explode"
        },
        {
            question: "🚀 O que um astronauta leva pro espaço?",
            options: ["Uma geladeira", "Fones de ouvido", "Oxigênio", "Um cachorro-quente"],
            answer: "Oxigênio"
        },
        // {
        //     question: "🍫 O que derrete no sol?",
        //     options: ["Chocolate", "Pedra", "Cadeira", "Wi-Fi"],
        //     answer: "Chocolate"
        // },
        // {
        //     question: "🚪 O que você faz antes de abrir uma porta?",
        //     options: ["Empurra", "Puxa", "Gira a maçaneta", "Olha se tem um tigre do outro lado"],
        //     answer: "Gira a maçaneta"
        // }
    ];


    // Lida com respostas do puzzle
    const handleAnswer = (option) => {
        if (option === puzzles[currentPuzzle].answer) {
            setFeedbackMessage("✅ Boa! Você acertou! 🎉");
            if (currentPuzzle + 1 < puzzles.length) {
                setTimeout(() => {
                    setCurrentPuzzle(currentPuzzle + 1);
                    setFeedbackMessage("");

                }, 500);
            } else {
                setIsCompleted(true);
                setTimeout(() => setShowFinalMessage(true), 1500);
            }
        } else {
            setFeedbackMessage("❌ Hmm, tenta de novo! 😉");
            setTimeout(() => setFeedbackMessage(""), 800);
        }
    };

    // Quando clica em "Sim! 💖"
    const handleAccept = () => {
        const templateParams = {
            subject: "💖 Convite Aceito!",
            mensagem: "Que alegria! 💕 Você aceitou sair comigo! Mal posso esperar pelo nosso encontro. 🌟😊",
        };

        emailjs.send('service_j20m5yd', 'template_stnl2ta', templateParams, 'vlSXlJEJDQOfomHPD')
            .then((response) => {
                console.log('E-mail enviado com sucesso!', response.status, response.text);
            })
            .catch((err) => {
                console.error('Erro ao enviar o e-mail:', err);
            });

        // Resto do código
        setShowLocationDetails(true);
        setTimeout(() => {
            setMessageText("😄 Calma que tem mais!");
            setTimeout(() => navigate('/Final'), 2000);
        }, 5500);
    };

    const handleDecline = () => {
        const templateParams = {
            subject: "💔 Convite Recusado",
            mensagem: "Ahh, que triste! 😢 Mas quem sabe em uma próxima? 💖",
        };

        emailjs.send('service_j20m5yd', 'template_stnl2ta', templateParams, 'vlSXlJEJDQOfomHPD')
            .then((response) => {
                console.log('E-mail enviado com sucesso!', response.status, response.text);
            })
            .catch((err) => {
                console.error('Erro ao enviar o e-mail:', err);
            });

        // Resto do código
        setDeclineMessage("😭 Ahh, que paia! Mas você não tem escolha, você vai kkk");
        setTimeout(() => setShowLocationDetails(true), 1500);
        setTimeout(() => {
            setMessageText("😄 Calma que tem mais!");
            setTimeout(() => navigate('/Final'), 2000);
        }, 5500);
    };

    // Abre o Google Maps
    const handleOpenMap = () => {
        const url = 'https://www.google.com/maps/place/Madero+Boulevard+Shopping/';
        window.open(url, '_blank');
    };

    return (
        <div className="love-escape-room">
            {!isCompleted && (
                <div className="puzzle">
                    <h2>{puzzles[currentPuzzle].question}</h2>
                    <div className="options">
                        {puzzles[currentPuzzle].options.map((option, idx) => (
                            <button key={idx} onClick={() => handleAnswer(option)}>
                                {option}
                            </button>
                        ))}
                    </div>
                    {/* Mensagem de feedback */}
                    {feedbackMessage && <p className="feedback-message">{feedbackMessage}</p>}
                </div>
            )}

            {isCompleted && !showFinalMessage && (
                <div className="success-message3">
                    🎉 Legal, né! Agora vem a parte mais importante... 💖
                </div>
            )}

            {showFinalMessage && !showLocationDetails && (
                <div className="final-message">
                    💌 Quer sair comigo? 💕<br />
                    <button className="yes-button" onClick={handleAccept}>Sim! 💖</button>
                    <button className="no-button" onClick={handleDecline}>Não 😢</button>
                    {declineMessage && <p className="decline-message">{declineMessage}</p>}
                </div>
            )}

            {showLocationDetails && (
                <div className="location-details">
                    <h2>🎉 Nosso encontro será aqui! 🎉</h2>
                    <img src={maderoLogo} alt="Logo do Madero" className="location-logo" />
                    <h3>Restaurante Madero</h3>
                    <p><strong>📅 Dia:</strong> Sábado, 22 de Fevereiro</p>
                    <p><strong>⏰ Horário:</strong> 19h30</p>
                    <p><strong>📍 Endereço:</strong> R. Pacífico Mascarenhas, 134- piso 3</p>
                    <button className="map-button" onClick={handleOpenMap}>Abrir no Google Maps 📍</button>
                    {messageText && <p className="extra-message">{messageText}</p>}
                </div>
            )}
        </div>
    );
};

export default Level3;
