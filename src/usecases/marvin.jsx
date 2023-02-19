import * as React from 'react';
import {useState} from 'react';

const Marvin = () => {

    const [state, setState] = useState({
        conversation: []
    });

    React.useEffect(() => {
    }, []);

    return (
        <div className="grid wrapper">
            <div className="cs1 ce12">
                <img src="/src/assets/marvin.png" alt=""/>
            </div>
        </div>
    );
};

export {Marvin}