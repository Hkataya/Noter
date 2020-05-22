import React from 'react';
import styled from 'styled-components';
// Button Styles....

const InnerButton = styled.button.attrs({
  className:
    'px-3 py-2 bg-purple-900 text-white text-xs font-bold uppercase rounded'
})``;

type Props = {
  children: React.ReactNode;
  handleButtonClick?: () => void;
};

const Button = (props: Props) => {
  const { children, handleButtonClick } = props;
  return (
    <InnerButton
      onClick={() => {
        if (handleButtonClick) handleButtonClick();
      }}
    >
      {children}
    </InnerButton>
  );
};

export default Button;
