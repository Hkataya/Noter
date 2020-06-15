import React, { useState } from 'react';
import {
  EditorState,
  RichUtils,
  DraftHandleValue,
  convertFromRaw,
  Editor
} from 'draft-js';
import { convertFromEditorStateToString, convertToEditorState } from './utils';

export default function EditorJs(props: {
  description: string;
  setDescription: (arg0: string) => void;
}) {
  const { description, setDescription } = props;
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(JSON.parse(description)))
  );
  const onChange = (e: EditorState) => {
    setDescription(convertFromEditorStateToString(e));
    setEditorState(e);
  };
  console.log('sami');
  return (
    <Editor
      // blockStyleFn={getBlockStyle}
      // customStyleMap={styleMap}
      editorState={editorState}
      handleKeyCommand={(command: string): DraftHandleValue => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          onChange(newState);
          return 'handled';
        }
        return 'not-handled';
      }}
      onChange={(e: EditorState) => {
        setDescription(convertFromEditorStateToString(e));
        setEditorState(e);
      }}
      onTab={(e: React.KeyboardEvent<{}>) => {
        const maxDepth = 4;
        onChange(RichUtils.onTab(e, editorState, maxDepth));
      }}
      spellCheck
    />
  );
}
