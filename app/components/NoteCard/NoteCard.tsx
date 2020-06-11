/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useState } from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';
import { NoteType } from '../../reducers/entities/types';
import { NoteActionCreatorType } from '../../actions/notes';

const Wrapper = styled.div.attrs({
  className: 'rounded-lg shadow-lg bg-white my-3'
})``;

const ExtendedWrapper = styled.div.attrs({
  className: 'rounded-lg shadow-lg bg-black my-3'
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
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded(!expanded);
    console.log('changing', expanded);
    return expanded;
  };
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
    <div>
      {(() => {
        if (editable && !expanded) {
          return (
            <Wrapper>
              <div>
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
                    onClick={onUpdateClick}
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
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/* content */}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/* header */}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                      <h3 className="text-3xl font-semibold">Title Position</h3>
                      <button
                        type="button"
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setExpanded(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/* body */}
                    <div className="relative p-6 flex-auto">
                      <p className="my-4 text-gray-600 text-lg leading-relaxed">
                        Note description Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Repellat consectetur nemo quam
                        necessitatibus laborum reiciendis adipisci ipsam animi
                        unde, esse, accusantium asperiores explicabo doloremque
                        expedita commodi, ex facilis ea possimus.
                      </p>
                    </div>
                    {/* footer */}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: 'all .15s ease' }}
                        onClick={() => setExpanded(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: 'all .15s ease' }}
                        onClick={() => setExpanded(false)}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black" />
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
          </Wrapper>
        );
      })()}
    </div>
  );
};

export default NoteCard;
