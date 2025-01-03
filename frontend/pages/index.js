import React, { useEffect, useState } from 'react';

const Home = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/data');
            const result = await response.json();
            setData(result);
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Welcome to My Next.js and Flask App</h1>
            {data ? (
                <div>
                    <h2>Data from Flask API:</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Home;