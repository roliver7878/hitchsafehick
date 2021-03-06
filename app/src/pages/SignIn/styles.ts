import styled from 'styled-components';

export const Container = styled.div`
    max-width: 400px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    padding: 30px;
    margin: 80px auto;

    h1 {
        font-size: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    form {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 10px 0px;

        a {
            text-align: center;
        }
    }
`;
