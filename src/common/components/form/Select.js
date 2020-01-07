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

const Select = ({ label, options, width, onMyInputChange }) => {
  const handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  return (
    <CreatableSelect
      isClearable
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

// const AutoCompleteStyled = styled(Autocomplete)`
//   width: ${props => props.width};
//   .MuiOutlinedInput-notchedOutline {
//     border-color: black;
//   }
//   .MuiOutlinedInput-notchedOutline {
//     top: 4px;
//     bottom: 8px;
//   }
//   .MuiAutocomplete-popper {
//     color: red;
//   }
// `;

// const testOptions = [
//   { title: '1.The Shawshank Redemption', year: 1994 },
//   { title: '1.The Godfather', year: 1972 },
//   { title: '1.The Godfather: Part II', year: 1974 },
//   { title: '1.The Dark Knight', year: 2008 },
//   { title: '1.12 Angry Men', year: 1957 },
// ];

// const Select = ({ label, options, width, onMyInputChange }) => {
//   return (
//     <AutoCompleteStyled
//       width={width}
//       freeSolo
//       options={testOptions}
//       getOptionLabel={option => option.title}
//       renderInput={params => (
//         <TextField
//           {...params}
//           label={label}
//           variant="outlined"
//           fullWidth
//           //
//           // Edit cannot use onChange with "freeSolo"
//           // https://github.com/mui-org/material-ui/issues/18113
//           inputProps={{
//             ...params.inputProps,
//             onChange: e => {
//               onMyInputChange(e, e.target.value || null);
//               params.inputProps.onChange(e);
//             },
//           }}
//         />
//       )}
//     />
//   );
// };

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
  options: [
    { value: 'test', label: 'test' },
    { value: 'test2', label: 'test2' },
  ],
  width: '350px',
  onMyInputChange: () => {},
};

export default Select;
