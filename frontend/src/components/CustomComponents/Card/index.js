import styled from 'styled-components';

export const Card = styled.div`

    padding: 1.5%;
    margin: 25px;
    margin-top: 50px;
    height: 150px;
    border-radius: 5%;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    background-color: ${props => props.color};
    width: max-content;
    min-width: 17%;

    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
  
`;