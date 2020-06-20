/* eslint-disable import/no-unresolved */
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  ContentState
} from 'draft-js';

export const InitializeForDraftEditor = (text: string): string => {
  return JSON.stringify(convertToRaw(ContentState.createFromText(text)));
};

export const convertToEditorState = (text: string): EditorState => {
  return EditorState.createWithContent(convertFromRaw(JSON.parse(text)));
};

export const extractPlainText = (text: string): string => {
  return convertFromRaw(JSON.parse(text)).getPlainText();
};

export const convertFromEditorStateToString = (
  editorState: EditorState
): string => {
  return JSON.stringify(convertToRaw(editorState.getCurrentContent()));
};
