import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const AutoCompleteStyled = styled(Autocomplete)`
  width: ${props => props.width};
  .MuiOutlinedInput-notchedOutline {
    border-color: black;
  }
  .MuiOutlinedInput-notchedOutline {
    top: 4px;
    bottom: 8px;
  }
`;

const Select = ({ label, options, width, onMyInputChange }) => {
  return (
    <AutoCompleteStyled
      width={width}
      freeSolo
      options={options}
      getOptionLabel={option => option.value}
      renderInput={params => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          fullWidth
          //
          // Edit cannot use onChange with "freeSolo"
          // https://github.com/mui-org/material-ui/issues/18113
          inputProps={{
            ...params.inputProps,
            onChange: e => {
              onMyInputChange(e, e.target.value || null);
              params.inputProps.onChange(e);
            },
          }}
        />
      )}
    />
  );
};

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  width: PropTypes.string,
  onMyInputChange: PropTypes.func,
};

Select.defaultProps = {
  label: 'select...',
  options: [],
  width: '350px',
  onMyInputChange: () => {},
};

export default Select;
