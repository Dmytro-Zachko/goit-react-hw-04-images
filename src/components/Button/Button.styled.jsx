import styled from '@emotion/styled'

export const LoadMore = styled.button`
padding: 16px;
    background-color: rgb(63, 81, 181);
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
    display: inline-block;
    color: rgb(255, 255, 255);
    border: 0px;
    border-radius: 12px;
    width: 30%;
    text-align: center;
    margin: 40px auto;
    text-decoration: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 18px;
    line-height: 24px;
    font-style: normal;
    font-weight: 500;
    min-width: 180px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;

    :hover,:focus {
  background-color: #303f9f;
}
`