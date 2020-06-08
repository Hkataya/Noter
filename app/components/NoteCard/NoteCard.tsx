/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useState } from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import { NoteType } from '../../reducers/entities/types';
import { NoteActionCreatorType } from '../../actions/notes';

const Wrapper = styled.div.attrs({
  className: 'rounded-lg shadow-lg bg-white my-3'
})``;

const Header = styled.div.attrs({
  className: 'flex justify-between border-b border-gray-100 px-3 py-3'
})``;

const Title = styled.span.attrs({
  className: 'font-bold text-gray-700 text-sm'
})``;

const Body = styled.div.attrs({
  className: 'px-3 py-2 text-gray-600 text-sm'
})``;

const ButtonWrapper = styled.div.attrs({
  className: 'px-3 py-3 flex justify-end'
})``;

const TitleInput = styled.input.attrs({
  className:
    'appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-700'
})``;

const StyledTextareaAutosize = styled(TextareaAutosize).attrs({
  className:
    'appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-700'
})``;

type Props = NoteType &
  NoteActionCreatorType & {
    timestampVisible: boolean;
    onTimestampClick: () => void;
    onRemoveClick: () => void;
    onUpdateClick: () => void;
  };
const NoteCard = (props: Props) => {
  const {
    title,
    description,
    timestamp,
    timestampVisible,
    onTimestampClick,
    onRemoveClick,
    onUpdateClick
  } = props;
  const [editable, setEditable] = useState(false);
  const [updatedTitle, setTitle] = useState(title);
  const [updatedDescription, setDescription] = useState(description);
  const items = [
    {
      label: 'remove',
      action: onRemoveClick
    },
    {
      label: 'update',
      action: onUpdateClick
    }
  ];
  return (
    <Wrapper>
      {editable ? (
        <>
          <Header>
            <TitleInput
              onChange={e => setTitle(e.target.value)}
              value={updatedTitle}
            />
          </Header>
          <Body>
            <StyledTextareaAutosize
              // @ts-ignore
              onChange={e => setDescription(e.target.value)}
              value={updatedDescription}
            />
          </Body>
          <ButtonWrapper>
            <button
              type="button"
              className="focus:outline-none mr-5"
              onClick={() => {
                setEditable(false);
                setTitle(title);
                setDescription(description);
              }}
            >
              cancel
            </button>
            <button
              type="button"
              className="focus:outline-none px-3 py-2 bg-purple-900 text-white text-xs font-bold uppercase rounded"
              onClick={onUpdateClick}
            >
              save
            </button>
          </ButtonWrapper>
        </>
      ) : (
        <>
          <Header>
            {timestampVisible && (
              <h1>
                <button type="button" onClick={onTimestampClick}>
                  {timestamp}
                </button>
              </h1>
            )}
            <Title>{title}</Title>
            {/* more options button */}
          </Header>
          <Body>{description}</Body>
          <ButtonWrapper>
            <button
              type="button"
              className="focus:outline-none"
              onClick={() => setEditable(true)}
            >
              <i className="fas fa-pen mr-5" />
            </button>
            <button
              type="button"
              onClick={onRemoveClick}
              className="focus:outline-none"
            >
              <i className="fas fa-trash  " />
            </button>
          </ButtonWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default NoteCard;
