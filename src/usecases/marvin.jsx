import * as React from 'react';
import {useState} from 'react';

const Marvin = () => {

    const [state, setState] = useState({});

    React.useEffect(() => {
    }, []);

    return (
        <div className="grid wrapper">
            Marvin
        </div>
    );
};

export {Marvin}