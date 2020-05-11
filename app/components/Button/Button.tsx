import React from 'react';
import styled from 'styled-components';

// Button Styles....

const ButtonWrapper = styled.div.attrs({
  className: 'flex justify-end mt-3'
})``;

const InnerButton = styled.button.attrs({
  className:
    'px-3 py-2 bg-purple-900 text-white text-xs font-bold uppercase rounded'
})``;

type Props = {
  children: React.ReactNode;
};

const Button = (props: Props) => {
  const { children } = props;
  return (
    <ButtonWrapper>
      <InnerButton>{children}</InnerButton>
    </ButtonWrapper>
  );
};

export default Button;
