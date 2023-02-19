import * as React from 'react';
import {useState} from 'react';

const WiseGuy = () => {

    const [state, setState] = useState({});

    React.useEffect(() => {
    }, []);

    return (
        <div className="grid wrapper">
            Wise guy
        </div>
    );
};

export {WiseGuy}