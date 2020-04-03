import React, { useRef, memo } from 'react';
// import 'jodit';
// import 'jodit/build/jodit.min.css';
import JoditEditor from 'jodit-react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const config = {
  readonly: false, // all options from https://xdsoft.net/jodit/doc/
  minHeight: 500,
};

const TextEditor = props => {
  const editor = useRef(null);
  const { content, setContent } = props;

  return (
    <React.Fragment>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        // onChange={newContent => setContent(newContent)}
      />
    </React.Fragment>
  );
};

TextEditor.propTypes = {
  content: PropTypes.string,
  setContent: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TextEditor);
