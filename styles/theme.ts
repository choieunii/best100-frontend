import { DefaultTheme , css} from '@emotion/react';

export const FlexRowCenter = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const FlexRowSpaceBetween = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const FlexColCenter = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const FlexColSpaceBetween = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FlexRowStart = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const theme: DefaultTheme = {
  fontSizes: {
    xxs: '12px',
    xs: '13px',
    sm: '14px',
    base: '16px',
    md: '18px',
    lg: '24px',
  },
  colors: {
    black: '#000',
    dark: '#191a20',
    primary: '#3f4150',
    secondary: '#8c8d96',
  },
};

export default theme;