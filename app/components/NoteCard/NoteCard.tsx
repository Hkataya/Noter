/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useState } from 'react';
import styled from 'styled-components';
import EditorJs from '../RichEditor/EditorJs';
import { NoteType } from '../../reducers/entities/types';
import { NoteActionCreatorType } from '../../actions/notes';
import ExpandedNote from './ExpandedNote';
import { extractPlainText } from '../RichEditor/utils';

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

const EditorStyle = styled.div.attrs({
  className:
    'appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-700'
})``;

const TitleInput = styled.input.attrs({
  className:
    'appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-700'
})``;

type Props = NoteType &
  NoteActionCreatorType & {
    timestampVisible: boolean;
    onTimestampClick: () => void;
    onRemoveClick: () => void;
    onUpdateClick: () => void;
    setDescription: (description: string) => void;
    setTitle: (description: string) => void;
  };
const NoteCard = (props: Props) => {
  const {
    title,
    description,
    timestamp,
    timestampVisible,
    onTimestampClick,
    onRemoveClick,
    onUpdateClick,
    setDescription,
    setTitle
  } = props;
  const [editable, setEditable] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [expanded, setExpanded] = useState(false);
  const editorOnUpdateClick = () => {
    setDescription(updatedDescription);
    setEditable(false);
    onUpdateClick();
  };

  const onChangeTitle = (e: { target: { value: string } }) => {
    setTitle(e.target.value);
    setUpdatedTitle(e.target.value);
  };
  const toggleExpand = () => {
    setExpanded(!expanded);
    return expanded;
  };

  return (
    <div>
      {(() => {
        if (editable && !expanded) {
          return (
            <Wrapper>
              <div>
                <Header>
                  <TitleInput onChange={onChangeTitle} value={updatedTitle} />
                </Header>
                <Body>
                  <EditorStyle>
                    <EditorJs
                      description={updatedDescription}
                      setDescription={setUpdatedDescription}
                    />
                  </EditorStyle>
                  <button
                    type="button"
                    className="w-full focus:outline-none px-3 py-2 bg-purple-900 text-white text-xs font-bold uppercase rounded right:0"
                    onClick={toggleExpand}
                  >
                    <i className="fa fa-palette" />
                  </button>
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
                    onClick={editorOnUpdateClick}
                  >
                    save
                  </button>
                </ButtonWrapper>
              </div>
            </Wrapper>
          );
        }
        if (expanded && editable) {
          return (
            <>
              <ExpandedNote
                title={title}
                description={updatedDescription}
                // setEditable={setEditable}
                setExpanded={setExpanded}
                onUpdateClick={editorOnUpdateClick}
                setDescription={setUpdatedDescription}
              />
            </>
          );
        }

        return (
          <Wrapper>
            <Header>
              {timestampVisible && (
                <h1>
                  <button type="button" onClick={onTimestampClick}>
                    {timestamp}
                  </button>
                </h1>
              )}
              <Title>{updatedTitle}</Title>
              {/* more options button */}
            </Header>
            <Body>{extractPlainText(updatedDescription)}</Body>
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
          </Wrapper>
        );
      })()}
    </div>
  );
};

export default NoteCard;
