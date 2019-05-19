import React from 'react';
import styled from 'styled-components';

const HoundHeaderWrapper = styled.header`
background: #222;
color: #EEE;
margin-top: 0px;
padding: 20px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: baseline;
flex-flow: wrap;
`;

const HoundHeading = styled.h1`
margin: 0px;
font-size: 2.5em;
display: inline-block;
padding-right: 50px;
`;

const HoundSubHeading = styled.h2`
margin: 0px;
font-size: 1.5em;
display: inline-block;
`;

export default function (props) {
    return (
        <HoundHeaderWrapper>
            <HoundHeading>Houndville</HoundHeading>
            <HoundSubHeading>It's a dogs life...</HoundSubHeading>
        </HoundHeaderWrapper>
    );
}
