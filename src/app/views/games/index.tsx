import { useEffect, useState } from 'react';
import { gameService } from './service';

const GameIndex = () => {
    const [movies, setmovies] = useState([]);

    useEffect(() => {
        // getGames();
    }, []);

    function getGames(): void {
        gameService.getAll().then(({ data }) => {
            console.log('data', data);
        });
    }

    return (
        <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nam
            maiores, alias architecto, hic, facere quis perferendis quas odit
            provident aspernatur obcaecati consequuntur enim maxime voluptatem
            repudiandae iusto modi nemo!
        </h1>
    );
};

export default GameIndex;
