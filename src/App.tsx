import { useState, useEffect } from 'react';

function App() {
    const [, setData] = useState('');

    async function list() {
        const endpoint = '/data-api/rest/Person';
        const response = await fetch(endpoint);
        const data = await response.json();
        setData(data);
        console.table(data.value);
    }

    const drivers = async () => {
        const endpoint = '/data-api/rest/Driver';
        const response = await fetch(endpoint);
        const data = await response.json();
        setData(data);
        console.table(data.value);
    };

    useEffect(() => {
        (async function () {
            const taco = await (await fetch(`/api/message`)).json();
            console.log('taco,', taco);
            setData(taco);
        })();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Static Web Apps Database Connections</h1>
            <blockquote>Open the console in the browser developer tools to see the API responses.</blockquote>
            <div>
                <h2>Data API</h2>
                <button id="drivers" onClick={drivers}>
                    Drivers
                </button>

                <button id="list" onClick={list}>
                    List
                </button>
                <button id="get" onClick={() => alert('Get button clicked')}>
                    Get
                </button>
                <button id="update" onClick={() => alert('Update button clicked')}>
                    Update
                </button>
                <button id="create" onClick={() => alert('Create button clicked')}>
                    Create
                </button>
                <button id="delete" onClick={() => alert('Delete button clicked')}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default App;
