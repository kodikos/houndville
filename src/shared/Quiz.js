import React, { Component } from 'react';
import styled from 'styled-components';

import { TextBox } from '../shared/Common';

const QuizBox = styled(TextBox)`
    background: rgba(142, 153, 231, 0.8);
    color: white;
`;

export const Question = styled.span``;

export const Quiz = (props) => 
    <QuizBox>
        {React.Children.map(props.children, (child) => {
            if (child.props.next) {
                return React.cloneElement(child, { onClick: (e) => {
                    e.stopPropagation();
                    props.onAnswer(child.props.next, child.props.correct);
                }});
            }
            return child;
        })}
    </QuizBox>;

export const Choice = styled.button`
    background: none;
    border: 3px solid transparent;
    font-size: inherit;
    color: inherit;
    padding: 10px;
    width: 99%;
    margin: 10px auto;
    &:hover {
        border: 3px solid white;
    }
`;
