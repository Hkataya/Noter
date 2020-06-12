/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState, useRef } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import getBlockStyle from './PageContainer.css';

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
};
const RichEditorEditor = {
  borderTop: '1px solid #ddd',
  cursor: 'text',
  fontSize: '16px',
  marginTop: '10px'
};
const richEditorControls = {
  fontFamily: 'Helvetica, sans-serif',
  fontSize: '14px',
  marginBottom: '5px',
  userSelect: 'none',
  display: 'flex'
};
const spanStyle = {
  color: '#999',
  cursor: 'pointer',
  marginRight: '16px',
  padding: '2px 0',
  display: 'flex',
  flexFlow: 'row wrap'
};
const spanStyleActive = {
  color: '#5890ff',
  cursor: 'pointer',
  marginRight: '16px',
  padding: '2px 0',
  display: 'flex'
};
const RichEditorExample = (props: any) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef(null);

  const focus = () => editorRef.current.focus();
  const onChange = (e: React.SetStateAction<EditorState>) => setEditorState(e);

  const handleKeyCommand = (command: any) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
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
  useEffect(() => {
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    const contentState = editorState.getCurrentContent();
  });
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
          // blockStyleFn={getBlockStyle}
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

const StyleButton = (props: any) => {
  const { label, active, style } = props;
  const [className, setClassName] = useState('RichEditor-styleButton');
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

const BlockStyleControls = (props: { onToggle?: any; editorState?: any }) => {
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
  onToggle: any;
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

export default RichEditorExample;
