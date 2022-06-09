import { DefaultTheme, css } from 'styled-components';

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const theme: DefaultTheme = {
  color: {
    charcoalGrey: '#464052',
    black: '#000000',
    white: '#FFFFFF',
    coolGrey: '#A4A6B0',
    battleshipGrey: '#74747E',
    paleLilac: '#E8E8E8',
    charcoalGray2: '#363A42',
    purple: '#5b36ac',
  },
};

const customMediaQuery = (maxWidth: number): string =>
  `@media (max-width: ${maxWidth}px)`;

export const media = {
  custom: customMediaQuery,
  pc: customMediaQuery(1440),
  tablet: customMediaQuery(768),
  mobile: customMediaQuery(576),
};
