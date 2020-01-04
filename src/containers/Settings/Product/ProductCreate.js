import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Flex, Box, Button, Divider } from 'common/components/base';
import { Input, Label, Select } from 'common/components/form';
import { Table } from 'common/components/table';
import { useMutation } from '@apollo/react-hooks';
import { SAVE_ITEM } from 'data/graphql/mutation';

// https://github.com/ramda/ramda/issues/1629
const isValidNumber = R.both(R.is(Number), R.complement(R.equals(NaN)));

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

const ProductCreate = ({ user }) => {
  const [productUnit, setProductUnit] = useState([]);
  const [productMainUnit, setProductMainUnit] = useState('');
  const [packingUnitName, setPackingUnitName] = useState('');
  const [multiplyUnit, setMultilplyUnit] = useState(0);
  const [productName, setProductName] = useState('');
  const [productGroup, setProductGroup] = useState('');
  const [productType, setProductType] = useState('');
  const [productDes, setProductDes] = useState('');
  const [isSaveButtonDisable, setSaveButtonDisable] = useState(true);
  const [isUnitButtonDisable, setUnitButtonDisable] = useState(true);
  const [updateUnitIndex, setUpdateUnitIndex] = useState(-1);

  useEffect(() => {
    console.log('on useEffect');
    console.log(user.code);
    if (packingUnitName && multiplyUnit) {
      setUnitButtonDisable(false);
    } else setUnitButtonDisable(true);
  }, [packingUnitName, multiplyUnit]);

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
    e.preventDefault();
    const type = e.target.value;
    setProductType(type);
    // console.log('onProductTypeChange: ', type);
  };

  const onProductGroupChange = e => {
    e.preventDefault();
    const group = e.target.value;
    setProductGroup(group);
    // console.log('onProductGroupChange: ', group);
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
      console.log(user.meta.attributes['custom:CoCode']);
      console.log(user.meta.attributes['custom:BrCode']);
      console.log('type', productType);
      saveProduct({
        variables: {
          itemData: {
            coCode: user.meta.attributes['custom:CoCode'],
            brCode: user.meta.attributes['custom:BrCode'],
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
            Product Name
          </Label>
          <Input
            width="75%"
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
          <Label width="25%" htmlFor="productgroup">
            Group
          </Label>
          <Select
            width="30%"
            id="productgroup"
            name="productgroup"
            // placeholder="สินค้า, วัถุดิบ, เครื่องจักร..."
            onMyInputChange={onProductGroupChange}
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
            width="30%"
            id="producttype"
            name="producttype"
            // placeholder="ขวด PET, ฝา PET,..."
            onMyInputChange={onProductTypeChange}
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

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(
  mapStateToProps,
  null
)(ProductCreate);
