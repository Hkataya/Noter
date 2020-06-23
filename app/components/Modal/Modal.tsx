import React from 'react';
import styled from 'styled-components';

const ModalBg = styled.div.attrs({
  className:
    'flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-900 z-20'
})``;

const ModalOuter = styled.div.attrs({
  className: 'bg-white rounded-lg w-1/2'
})``;

const ModalInner = styled.div.attrs({
  className: 'flex flex-col items-start p-4'
})``;

const ModalHeaderWrapper = styled.div.attrs({
  className: 'flex items-center w-full'
})``;

const ModalHeader = styled.div.attrs({
  className: 'text-gray-900 font-medium text-lg'
})``;

type Props = {
  handleClose: () => void;
  children: React.ReactNode;
  title: string;
};

const Modal = (props: Props) => {
  const { title, children, handleClose } = props;

  return (
    <ModalBg>
      <ModalOuter>
        <ModalInner>
          <ModalHeaderWrapper>
            <ModalHeader>{title}</ModalHeader>
            <svg
              role="button"
              className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              onClick={() => handleClose()}
            >
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
            </svg>
          </ModalHeaderWrapper>
          <hr />
          {children}
        </ModalInner>
      </ModalOuter>
    </ModalBg>
  );
};

export default Modal;
