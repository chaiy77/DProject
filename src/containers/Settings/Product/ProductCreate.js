import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Flex, Box, Button, Divider } from 'common/components/base';
import { Input, Label, Select } from 'common/components/form';
import { Table } from 'common/components/table';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { SAVE_ITEM } from 'data/graphql/mutation';
import { GET_ITEM_TYPES, GET_ITEM_GROUPS } from 'data/graphql/query';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

// https://github.com/ramda/ramda/issues/1629
const isValidNumber = R.both(R.is(Number), R.complement(R.equals(NaN)));

const testOptions = [
  { title: '1.The Shawshank Redemption', year: 1994 },
  { title: '1.The Godfather', year: 1972 },
  { title: '1.The Godfather: Part II', year: 1974 },
  { title: '1.The Dark Knight', year: 2008 },
  { title: '1.12 Angry Men', year: 1957 },
];

const tableHeaderStyle = css`
  text-align: center;
`;

// const unitTableCellStyle = ({ isValidName = true }) => css`
//   td: {
//     ${isValidName &&
//       css`
//         color: red;
//       `}
//   }
// `;

const inputStyle = ({ isNumber = true }) => css`
  ${!isNumber &&
    css`
      color: red;
      border-color: red;
    `}
`;

const ProductCreate = ({ user, itemCount }) => {
  const [defaultID, setDefaultID] = useState('');
  const [productUnit, setProductUnit] = useState([]);
  const [productMainUnit, setProductMainUnit] = useState('');
  const [packingUnitName, setPackingUnitName] = useState('');
  const [multiplyUnit, setMultilplyUnit] = useState(0);
  const [productID, setProductID] = useState('');
  const [productName, setProductName] = useState('');
  const [productGroup, setProductGroup] = useState('');
  const [productGroupOptions, setProductGroupOptions] = useState([]);
  const [productType, setProductType] = useState('');
  const [productTypeOptions, setProductTypeOptions] = useState([]);
  const [productDes, setProductDes] = useState('');
  const [isSaveButtonDisable, setSaveButtonDisable] = useState(true);
  const [isUnitButtonDisable, setUnitButtonDisable] = useState(true);
  const [updateUnitIndex, setUpdateUnitIndex] = useState(-1);

  const [getProductTypes] = useLazyQuery(GET_ITEM_TYPES, {
    onCompleted: data => {
      console.log(' get Product Types:', data);
      if (data.getItemTypes) {
        setProductTypeOptions(data.getItemTypes.itemTypes);
      }
    },
  });
  const [getProductGroups] = useLazyQuery(GET_ITEM_GROUPS, {
    onCompleted: data => {
      console.log(' get Product Groups:', data);
      if (data.getProductGroups) {
        setProductGroupOptions(data.getItemGroups.itemGroups);
      }
    },
  });

  useEffect(() => {
    let n = itemCount + 1;
    let i = 'IT-0000' + n;
    setDefaultID(i);

    getProductTypes({
      variables: {
        username: user.meta.username,
      },
    });
    getProductGroups({
      variables: {
        username: user.meta.username,
      },
    });

    if (packingUnitName && multiplyUnit) {
      setUnitButtonDisable(false);
    } else setUnitButtonDisable(true);
  }, [packingUnitName, multiplyUnit, itemCount]);

  const columns = [
    {
      id: 'No.',
      Header: () => <div css={tableHeaderStyle}>No.</div>,
      accessor: row => `${row.i}`,
    },
    {
      id: 'name',
      Header: () => <div css={tableHeaderStyle}>Unit Name</div>,
      accessor: row => `${row.name}`,
    },
    {
      id: 'multiply',
      Header: () => <div css={tableHeaderStyle}>multiply</div>,
      accessor: row => `${row.multiply}`,
    },
    {
      id: 'delete',
      Header: '',
      Cell: ({ cell }) => (
        <button onClick={() => onDeleteUnit(cell.row.original)}>delete</button>
      ),
    },
  ];

  const [saveProduct] = useMutation(SAVE_ITEM, {
    onCompleted: data => {
      console.log(data);
    },
    onError: err => {
      console.log(' save product error:', err);
    },
  });
  const onProductIDChange = e => {
    e.preventDefault();
    const id = e.target.value;
    if (id !== null && id !== '') {
      setSaveButtonDisable(false);
      setProductID(id);
    } else {
      setSaveButtonDisable(true);
    }
  };

  const onProductNameChange = e => {
    e.preventDefault();
    const name = e.target.value;
    if (name !== null && name !== '') {
      setSaveButtonDisable(false);
      setProductName(name);
    } else {
      setSaveButtonDisable(true);
    }
  };

  const onProductTypeChange = e => {
    if (e) {
      setProductType(e);
    }
  };

  const onProductGroupChange = value => {
    if (value) {
      setProductGroup(value);
    }
  };

  const onProductDesChange = e => {
    e.preventDefault();
    const des = e.target.value;
    setProductDes(des);
    // console.log('onProductDesChange: ', des);
  };

  const onProductMainUnitChange = e => {
    e.preventDefault();
    const unit = e.target.value;
    setProductMainUnit(unit);
    // console.log('onProductMainUnitChange: ', unit);
  };

  const onPackingUnitNameChange = e => {
    e.preventDefault();
    const name = e.target.value;
    setPackingUnitName(name);
  };

  const onMultiplyUnitChange = e => {
    e.preventDefault();
    const mul = parseFloat(e.target.value);
    setMultilplyUnit(`${mul}`);
  };

  const onSaveProduct = e => {
    e.preventDefault();
    console.log('onSaveProduct :');
    // checkValidInput(productUnit);

    // const productName = e.target.productname.value;
    if (productName !== '' && productName) {
      console.log('onSaveProduct :', productName);
      console.log(user.meta.username);
      console.log('type', productType);
      saveProduct({
        variables: {
          data: {
            username: user.meta.username,
            name: productName,
            type: productType,
            group: productGroup,
          },
        },
      });
    }
  };

  const onAddUnitClick = () => {
    if (isValidNumber(parseFloat(multiplyUnit))) {
      const _unit = [...productUnit];
      // console.log(_unit);
      const u = _unit.filter(unit => {
        return unit.name === packingUnitName;
      });
      if (u.length === 0) {
        // _unit.push({ name: packingUnitName, multiply: multiplyUnit });
        if (updateUnitIndex < 0) {
          setProductUnit(_u =>
            _u.concat({
              i: _unit.length + 1,
              name: packingUnitName,
              multiply: multiplyUnit,
            })
          );
        } else {
          _unit[updateUnitIndex] = {
            i: updateUnitIndex + 1,
            name: packingUnitName,
            multiply: multiplyUnit,
          };
          setProductUnit(_unit);
        }
        setPackingUnitName('');
        setMultilplyUnit(0);
        setUpdateUnitIndex(-1);
      } else {
        // alert name is existed
        console.log('name is existed');
      }
    }
  };

  const onDeleteUnit = row => {
    // console.log('onDeleteUnit with :', row);
    const _unit = [];
    productUnit.map(u => {
      if (u.name !== row.name) {
        _unit.push({ i: _unit.length + 1, name: u.name, multiply: u.multiply });
      }
    });
    setProductUnit(_unit);
  };

  return (
    <Flex
      width={1}
      backgroundColor="gray"
      paddingY="1em"
      flexDirection="column"
    >
      <Box width={1} mt={1} paddingX="2em">
        <Flex
          width={2 / 3}
          flexDirection="row"
          alignItems="center"
          marginBottom="0.8em"
        >
          <Label width="25%" htmlFor="productname">
            Product ID
          </Label>
          <Input
            width="40%"
            id="productID"
            name="productID"
            defaultValue={defaultID}
            onChange={e => onProductIDChange(e)}
          />
        </Flex>
        <Flex
          width={2 / 3}
          flexDirection="row"
          alignItems="center"
          marginBottom="0.8em"
        >
          <Label width="25%" htmlFor="productname">
            Product Name
          </Label>
          <Input
            width="40%"
            id="productname"
            name="productname"
            onChange={e => onProductNameChange(e)}
          />
        </Flex>

        <Flex
          width={2 / 3}
          flexDirection="row"
          alignItems="center"
          marginBottom="0.8em"
        >
          <Label width="25%" htmlFor="description">
            Description
          </Label>
          <Input
            width="75%"
            id="description"
            name="descriptione"
            onChange={e => onProductDesChange(e)}
          />
        </Flex>

        <Flex
          width={2 / 3}
          flexDirection="row"
          alignItems="center"
          marginBottom="0.8em"
        >
          <Label width="25%" htmlFor="producttype">
            Type
          </Label>
          <Select
            width="40%"
            id="producttype"
            name="producttype"
            label="เช่น ขวด PET, ฝา PET,..."
            onMyInputChange={onProductTypeChange}
            selectedValue={productType}
          />
        </Flex>
        <Flex
          width={2 / 3}
          flexDirection="row"
          alignItems="center"
          marginBottom="0.8em"
          style={{ postion: 'relative' }}
        >
          <Label width="25%" htmlFor="productgroup">
            Group
          </Label>

          <Select
            width="40%"
            id="productgroup"
            name="productgroup"
            label="สินค้าขายม วัตถุดิบ"
            onMyInputChange={onProductGroupChange}
            selectedValue={productGroup}
          />
        </Flex>

        <Flex width={2 / 3} marginBottom="1em">
          <Label width="25%" htmlFor="mainunit">
            Main Unit
          </Label>
          <Input
            width="30%"
            id="mainunit"
            name="mainunit"
            onChange={e => onProductMainUnitChange(e)}
          />
        </Flex>

        <Flex width={2 / 3}>
          <Label width="30%" marginTop="1em">
            {' '}
            Packing Uints
          </Label>
          <Flex flexDirection="column">
            <Flex flexDirection="row">
              <Flex alignItems="center">
                <Label width="30%">Name</Label>
                <Input
                  width="60%"
                  name="packingunitname"
                  value={packingUnitName}
                  onChange={e => onPackingUnitNameChange(e)}
                />
              </Flex>
              <Flex alignItems="center" marginLeft="1em">
                <Label width="40%">Multiply</Label>
                <Input
                  width="50%"
                  name="multiply"
                  onChange={e => onMultiplyUnitChange(e)}
                  value={multiplyUnit}
                  css={inputStyle({
                    isNumber: isValidNumber(parseInt(multiplyUnit)),
                  })}
                />
              </Flex>
              <Flex marginLeft="1em">
                <Button disabled={isUnitButtonDisable} onClick={onAddUnitClick}>
                  add
                </Button>
              </Flex>
            </Flex>
            <Flex width="50%">
              <Table
                columns={columns}
                data={productUnit}
                // getSelectedRow={onUnitTableSelect}
                // updateTableData={onProductUnitChange}
              />
            </Flex>
          </Flex>
        </Flex>

        <Divider width="90%" />

        <Flex>
          <Button
            type="submit"
            disabled={isSaveButtonDisable}
            onClick={e => onSaveProduct(e)}
          >
            Save
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

ProductCreate.propTypes = {
  itemCount: PropTypes.Number,
};

ProductCreate.defaultProps = {
  itemCount: 0,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(
  mapStateToProps,
  null
)(ProductCreate);
