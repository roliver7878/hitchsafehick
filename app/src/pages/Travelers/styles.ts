import styled from 'styled-components';

export const Container = styled.div`
    max-width: 700px;
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
`;

export const List = styled.ul`
    list-style: none;

    li {
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        & + li {
            border-top: 1px solid #eee;
        }
    }
`;
