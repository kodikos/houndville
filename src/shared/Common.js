import React, { Component } from 'react';
import styled from 'styled-components';

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
