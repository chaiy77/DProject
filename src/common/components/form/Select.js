import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CreatableSelect from 'react-select/creatable';

// const customStyles = {
//   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
//     const color = chroma(data.color);
//     return {
//       ...styles,
//       backgroundColor: isDisabled ? 'red' : blue,
//       color: '#FFF',
//       cursor: isDisabled ? 'not-allowed' : 'default',
//     };
//   },
//   control: () => ({
//     ...styles,
//     backgroundColor: 'white',
//     width: 200,
//   }),
// };

const Select = ({ label, options, width, onMyInputChange, selectedValue }) => {
  const handleChange = (newValue, actionMeta) => {
    onMyInputChange(newValue);
  };

  return (
    <CreatableSelect
      isClearable
      value={selectedValue}
      onChange={handleChange}
      options={options}
      styles={{
        control: base => ({
          ...base,
          backgroundColor: 'white',
          width: '300px',
        }),
      }}
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
  selectedValue: PropTypes.array,
};

Select.defaultProps = {
  label: 'select...',
  options: [
    { value: 'test', label: 'test' },
    { value: 'test2', label: 'test2' },
  ],
  width: '350px',
  onMyInputChange: () => {},
  selectedValue: null,
};

export default Select;
