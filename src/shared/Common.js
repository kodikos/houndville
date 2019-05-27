import React, { Component } from 'react';
import styled from 'styled-components';
import pawCoinImg from './paw_coin.png';

export const SceneWrapper = styled.main`
    background: #cfa7a7;
    flex: 1 1 auto;
    position: relative;

    > * {
        position: relative;
        z-index: 10;
    }
`;

export const TextBox = styled.p`
    display: inline-block;
    background: rgba(255, 255, 255, 0.8);
    border: 3px solid #333;
    border-radius: 10px;
    padding: 20px;
    position: absolute;
    top: 2vh;
    left: 5vw;
    font-size: 1.5em;
    max-width: 70%;
`;

export const Backdrop = styled.div`
    background: url('replace-me.png') no-repeat center center fixed;
    background-size: cover;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 0;
`;

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

export const ScoreBoard = (props) =>
    <Purse>
        {props.progress.map(() => <PawCoin />)}
    </Purse>;
