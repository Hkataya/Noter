/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef, CSSProperties } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  ContentBlock,
  DraftHandleValue,
  convertFromRaw
} from 'draft-js';
import { convertFromEditorStateToString } from './utils';
// import getBlockStyle from './PageContainer.css';

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};
const RichEditorRoot = {
  background: '#fff',
  border: '1px solid #ddd',
  fontFamily: 'Georgia, serif',
  fontSize: '14px',
  padding: '15px'
} as CSSProperties;
const RichEditorEditor = {
  borderTop: '1px solid #ddd',
  cursor: 'text',
  fontSize: '16px',
  marginTop: '10px'
} as CSSProperties;
const richEditorControls = {
  fontFamily: 'Helvetica, sans-serif',
  fontSize: '14px',
  marginBottom: '5px',
  userSelect: 'none',
  display: 'flex'
} as CSSProperties;
const spanStyle = {
  color: '#999',
  cursor: 'pointer',
  marginRight: '16px',
  padding: '2px 0',
  display: 'flex',
  flexFlow: 'row wrap'
} as CSSProperties;
const spanStyleActive = {
  color: '#5890ff',
  cursor: 'pointer',
  marginRight: '16px',
  padding: '2px 0',
  display: 'flex'
} as CSSProperties;
const getBlockStyle = (block: ContentBlock) => {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return '';
  }
};

type props = {
  description: string;
  setDescription: (description: string) => void;
};

const RichEditor = (props: props) => {
  const { description, setDescription } = props;
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromRaw(JSON.parse(description)))
  );
  const editorRef = useRef(null);

  const focus = () => editorRef.current.focus();
  const onChange = (e: EditorState) => {
    setDescription(convertFromEditorStateToString(e));
    setEditorState(e);
  };

  const handleKeyCommand = (command: string): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onTab = (e: React.KeyboardEvent<{}>) => {
    const maxDepth = 4;
    onChange(RichUtils.onTab(e, editorState, maxDepth));
  };

  const toggleBlockType = (blockType: string) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  return (
    <div style={RichEditorRoot}>
      <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />
      <div style={RichEditorEditor} onClick={focus}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          onTab={onTab}
          placeholder="Tell a story..."
          ref={editorRef}
          spellCheck
        />
      </div>
    </div>
  );
};

const StyleButton = (props: {
  label: string;
  active: boolean;
  style: string;
  onToggle: (arg0: string) => void;
}) => {
  const { label, active, style } = props;
  // const [] = useState('RichEditor-styleButton');
  const onToggle = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    props.onToggle(style);
  };

  return (
    <span style={active ? spanStyleActive : spanStyle} onMouseDown={onToggle}>
      {label}
    </span>
  );
};
const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' }
];
const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' }
];

const BlockStyleControls = (props: {
  onToggle: (arg0: string) => void;
  editorState: EditorState;
}) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div style={richEditorControls}>
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const InlineStyleControls = (props: {
  editorState: { getCurrentInlineStyle: () => any };
  onToggle: (arg0: string) => void;
}) => {
  const { editorState, onToggle } = props;
  const currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div style={richEditorControls}>
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default RichEditor;
