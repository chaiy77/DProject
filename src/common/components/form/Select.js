import React from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';

const Select = ({
  options,
  onMyInputChange,
  selectedValue,
  placeholder,
  width,
}) => {
  const handleChange = newValue => {
    onMyInputChange(newValue);
  };

  // const customStyles = {
  // option: (styles, { data, isDisabled, isFocused, isSelected }) => {
  //   const color = chroma(data.color);
  //   return {
  //     ...styles,
  //     backgroundColor: isDisabled ? 'red' : blue,
  //     color: '#FFF',
  //     cursor: isDisabled ? 'not-allowed' : 'default',
  //   };
  // },
  // control: styles => ({
  //   ...styles,
  //   backgroundColor: 'white',
  //   width: width ,
  // }),
  // };
  return (
    <CreatableSelect
      isClearable
      value={selectedValue}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      Width={width}
      styles={{
        control: (styles, { selectProps: { Width } }) => {
          return {
            ...styles,
            backgroundColor: 'white',
            width: Width,
          };
        },
      }}
    />
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  width: PropTypes.string,
  onMyInputChange: PropTypes.func,
  selectedValue: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  placeholder: PropTypes.string,
};

Select.defaultProps = {
  options: [
    { value: 'test', label: 'test' },
    { value: 'test2', label: 'test2' },
  ],
  width: '300px',
  onMyInputChange: () => {},
  selectedValue: [],
  placeholder: 'select or create new',
};

export default Select;
