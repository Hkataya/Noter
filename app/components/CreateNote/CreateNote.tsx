/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useState } from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import { NoteActionCreatorType } from '../../actions/notes';
import {
  NoteType,
  VideoType,
  NoteShapeType
} from '../../reducers/entities/types';
import { InitializeForDraftEditor } from '../RichEditor/utils';

// **** Style Section **** //

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

const Button = styled.button.attrs({
  className:
    'w-full focus:outline-none px-3 py-2 bg-purple-900 text-white font-bold uppercase rounded'
})``;

const TitleInput = styled.input.attrs({
  className:
    'appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-700'
})``;

const StyledTextareaAutosize = styled(TextareaAutosize).attrs({
  className:
    'appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-700'
})``;

// **** Prop Types Section **** //

type Props = NoteActionCreatorType & {
  videoId: VideoType['id'];
  timestamp: NoteType['timestamp'];
};

// **** Component Section **** //

const CreateNote = (props: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addNoteDb, videoId, timestamp } = props;
  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    const note = {
      title,
      description,
      timestamp,
      video: videoId,
      type: NoteShapeType.note
    };
    note.description = InitializeForDraftEditor(note.description);
    if (addNoteDb) addNoteDb(note);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <Wrapper>
        <Header>
          <TitleInput
            placeholder="title"
            onChange={e => setTitle(e.target.value)}
            required
          />
        </Header>
        <Body>
          <StyledTextareaAutosize
            placeholder="descrtipion"
            maxRows={5}
            // @ts-ignore
            onChange={e => setDescription(e.target.value)}
            required
          />
        </Body>
        <ButtonWrapper>
          <Button type="submit">+</Button>
        </ButtonWrapper>
      </Wrapper>
    </form>
  );
};

export default CreateNote;
