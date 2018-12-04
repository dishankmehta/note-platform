import styled from 'styled-components';

export const SideNav = styled.div`

    height: 90%;
    width: 100%;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #FFF;
    padding: 10% 0%;
    overflow-x: hidden;
    transition: transform 0.8s
    transform: ${props => props.show ? "translate3d(0, 0, 0)" : "translate3d(-270px, 0, 0)"};

    

    & > div {
        display: flex;
        padding-left: 2%;
        width: 100%;
        height: 6%;
        margin: 2% 0%;
        cursor: pointer;
        align-items: center;
        border-bottom: 1px solid #eeeeee;

        &:hover {
            background-color: #eeeeee;
        }

        &:nth-child(${props => props.child}) {
            background-color: #8BD7D2;
        }

        &:last-child {
            border-bottom: 0;
        }
    }

    & > div > a {
        width: 100%;
        text-align: left;
        padding-left: 8px;
        text-decoration: none;
        font-size: 18px;
        // color: #2196f3;
        color: #0052cc;
        transition: 0.1s;
        margin-left: 10px;
    }

    & > a:hover {
        color: #f1f1f1;
    }
  
`;