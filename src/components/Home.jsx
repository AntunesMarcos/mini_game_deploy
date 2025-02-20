import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">
            <h1>Uma aventura especial só para você! 💕</h1>
            <button onClick={() => navigate('/level1')}>Começar a Jornada</button>
        </div>
    );
}

export default Home;
