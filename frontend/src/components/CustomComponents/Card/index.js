import styled from 'styled-components';

export const Card = styled.div`

    display: inline-block;
    padding: 1.5%;
    margin: 25px;
    width: 250px;
    height: 250px;
    border-radius: 5%;
    float: left;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    background-color: ${props => props.color};

    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
  
`;