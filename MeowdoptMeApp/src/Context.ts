import * as React from 'react';
import {createContext} from 'react';

type ScreenContextType = React.Dispatch<React.SetStateAction<boolean>> | null;
const ScreenContext = createContext<ScreenContextType>(null);

export {ScreenContext};
