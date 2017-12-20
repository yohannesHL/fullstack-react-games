import React, { Component } from 'react'
import styled, {keyframes} from 'styled-components'


export const Title = styled.h3`
font-family: 'Roboto';
text-align: center;
`

export const ListItem = styled.li`
  display: inline-block;
  width:150px;
  height:150px;
  border: 1px solid #efefef;
  margin: 10px;
  overflow: hidden;
`
export const rotate = keyframes`
  0%{

  }

  100%{

    transform: scale(1.5,1.5) ;
  }
`
export const ListItemLink = styled.a`
  width:100%;
  height:100%;
  text-decoration: none;
  text-transform: capitalize;
  backface-visibility: hidden;
  line-height:12px;
  display: flex;
  flex-direction: column;
  color: #fff;

 div{
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: hsla(187, 100%, 42%, 1);
   transition: background-color 0.5s ease;
 }
  &:hover div {
    animation: ${rotate} 0.3s ease-in-out 1;
    animation-fill-mode: forwards;
    background-color: hsla(187, 100%, 12%, 1);
  }

`
export const Container = styled.div`
  background: #fcfcfc;
  border: 1px solid #f2f2f2;
  padding: 20px;
  padding-bottom: 100px;

`
export const Content = styled.ul`
  background: #f7f7f7;
  border: 1px solid #f5f5f5;
  border-radius: 5px;
`
