import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {FiveWhys} from "./usecases/fivewhys";

const App = () => {
    return <FiveWhys/>
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);