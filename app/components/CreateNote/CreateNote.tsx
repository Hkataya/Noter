/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import { NoteActionCreatorType } from '../../actions/notes';

const Wrapper = styled.div.attrs({
  className: 'rounded-lg shadow-lg bg-white my-3'
})``;

const Header = styled.div.attrs({
  className: 'flex justify-between  px-3 py-2'
})``;

const Body = styled.div.attrs({
  className: 'px-3 py-2 text-gray-600'
})``;

const ButtonWrapper = styled.div.attrs({
  className: 'px-3 py-2'
})``;

const TitleInput = styled.input.attrs({
  className:
    'appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-700'
})``;

const StyledTextareaAutosize = styled(TextareaAutosize).attrs({
  className:
    'appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-700'
})``;

type Props = NoteActionCreatorType & {
  videoId: string;
};

const CreateNote = (props: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addNote, videoId } = props;

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    const note = {
      title,
      description
    };

    if (addNote) addNote(note, videoId);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <Wrapper>
        <Header>
          <TitleInput
            placeholder="title"
            onChange={e => setTitle(e.target.value)}
          />
        </Header>
        <Body>
          <StyledTextareaAutosize
            placeholder="descrtipion"
            onChange={e => setDescription(e.target.value)}
          />
        </Body>
        <ButtonWrapper>
          <button
            type="submit"
            className="w-full focus:outline-none px-3 py-2 bg-purple-900 text-white font-bold uppercase rounded"
          >
            +
          </button>
        </ButtonWrapper>
      </Wrapper>
    </form>
  );
};

export default CreateNote;