import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        background: #3b9eff;
        height: 100%;
    }

    .row {
        margin-right: 0px !important;
        margin-left: 0px !important;
    }
`;
