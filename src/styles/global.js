import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
    }

    body {
        font-family: Arial, Helvetica, sans-serif;
        text-rendering: optimizeLegibility;
    }


    html, body, #root{
        height: 100%;
    }
`;