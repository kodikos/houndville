import React from 'react';
import styled from 'styled-components';
import pawCoinImg from './paw_coin.png';

const PawCoin = styled.img.attrs({
    src: pawCoinImg,
    alt: 'one paw coin'
})`
    width: 4em;
    height: 4em;
`;

const Purse = styled.div`
    position: absolute;
    top: 2vh;
    right: 2vh;
`;

export default (props) =>
    <Purse>
        {props.progress.map((stage) => <PawCoin key={stage} />)}
    </Purse>;
