import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Flex, Box, Button, Divider, Checkbox } from 'common/components/base';
import { Input, Label, Select } from 'common/components/form';
import { Table } from 'common/components/table';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { useForm, Controller } from 'react-hook-form';
import { SAVE_ITEM } from 'data/graphql/mutation';
import { GET_ITEM_TYPES, GET_ITEM_GROUPS } from 'data/graphql/query';

// https://github.com/ramda/ramda/issues/1629
const isValidNumber = R.both(R.is(Number), R.complement(R.equals(NaN)));

const tableHeaderStyle = css`
  text-align: center;
`;

// const inputStyle = ({ isNumber = true }) => css`
//   ${!isNumber &&
//     css`
//       color: red;
//       border-color: red;
//     `}
// `;

const ItemCreate = ({ user, itemCount }) => {
  // const [defaultID, setDefaultID] = useState('');
  const {
    register,
    handleSubmit,
    // errors,
    setValue,
    // reset,
    control,
  } = useForm(); // initialise the hook
  const [itemUnit, setItemUnit] = useState([]);
  const [packingUnitName, setPackingUnitName] = useState('');
  const [multiplyUnit, setMultilplyUnit] = useState(0);
  const [itemID, setItemID] = useState('');
  const [itemGroup, setItemGroup] = useState([]);
  const [itemGroupOptions, setItemGroupOptions] = useState([]);
  const [itemType, setItemType] = useState([]);
  const [itemTypeOptions, setItemTypeOptions] = useState([]);
  // const [isSaveButtonDisable, setSaveButtonDisable] = useState(true);
  const [isUnitButtonDisable, setUnitButtonDisable] = useState(true);
  const [updateUnitIndex, setUpdateUnitIndex] = useState(-1);
  const [getItemTypes] = useLazyQuery(GET_ITEM_TYPES, {
    onCompleted: data => {
      if (data.getItemTypes) {
        const myTypes = data.getItemTypes.types;
        const tempTypes = myTypes.map(tr => {
          return { value: tr, label: tr };
        });
        setItemTypeOptions(tempTypes);
      }
    },
  });
  const [getItemGroups] = useLazyQuery(GET_ITEM_GROUPS, {
    onCompleted: data => {
      if (data.getItemGroups) {
        const myGroups = data.getItemGroups.groups;
        const tempGroups = myGroups.map(gr => {
          return { value: gr, label: gr };
        });
        setItemGroupOptions(tempGroups);
      }
    },
  });

  useEffect(() => {
    const n = itemCount + 1;
    const i = `IT-0000 + ${n}`;
    setItemID(i);

    getItemTypes({
      variables: {
        username: user.meta.username,
      },
    });
    getItemGroups({
      variables: {
        username: user.meta.username,
      },
    });

    if (packingUnitName && multiplyUnit) {
      setUnitButtonDisable(false);
    } else setUnitButtonDisable(true);
  }, [packingUnitName, multiplyUnit, itemCount]);

  const [saveItem] = useMutation(SAVE_ITEM);

  // const [saveItem] = useMutation(SAVE_ITEM, {
  //   onCompleted: data => {
  //     // console.log(data);
  //   },
  //   onError: err => {
  //     // console.log(' save item error:', err);
  //   },
  // });

  const onItemTypeChange = value => {
    if (value) {
      setItemType(value);
    }
  };

  const onItemGroupChange = value => {
    if (value) {
      setItemGroup(value);
    }
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

  const onAddUnitClick = () => {
    if (isValidNumber(parseFloat(multiplyUnit))) {
      const iunit = [...itemUnit];
      // console.log(_unit);
      const u = iunit.filter(unit => {
        return unit.name === packingUnitName;
      });
      if (u.length === 0) {
        // _unit.push({ name: packingUnitName, multiply: multiplyUnit });
        if (updateUnitIndex < 0) {
          setItemUnit(iu =>
            iu.concat({
              i: iunit.length + 1,
              name: packingUnitName,
              multiply: multiplyUnit,
            })
          );
        } else {
          iunit[updateUnitIndex] = {
            i: updateUnitIndex + 1,
            name: packingUnitName,
            multiply: multiplyUnit,
          };
          setItemUnit(iunit);
        }
        setPackingUnitName('');
        setMultilplyUnit(0);
        setUpdateUnitIndex(-1);
      } else {
        // alert name is existed
        // console.log('name is existed');
      }
      setValue('packingunit', '');
      setValue('multiply', '');
    }
  };

  const onDeleteUnit = row => {
    // console.log('onDeleteUnit with :', row);
    const iunit = [];
    for (let i = 0; i < itemUnit.length; i++) {
      if (itemUnit[i].name !== row.name) {
        iunit.push({
          i: iunit.length + 1,
          name: itemUnit[i].name,
          multiply: itemUnit[i].multiply,
        });
      }
    }
    // itemUnit.map(u => {
    //   if (u.name !== row.name) {
    //     iunit.push({ i: iunit.length + 1, name: u.name, multiply: u.multiply });
    //   }
    // });
    setItemUnit(iunit);
  };

  const onSaveItem = (data, e) => {
    // console.log(data);
    // console.log(itemUnit);
    // console.log(itemType);
    const pUnit =
      itemUnit.length > 0
        ? itemUnit.map(i => {
            return { name: i.name, multiplier: i.multiply };
          })
        : [];
    // console.log(pUnit);
    if (itemType && itemGroup) {
      saveItem({
        variables: {
          data: {
            username: user.meta.username,
            id: data.id,
            name: data.name,
            type: itemType.value,
            group: itemGroup.value,
            rentable: data.rentable,
            mainUnit: data.mainunit,
            packingUnits: pUnit,
          },
        },
      });
      e.target.reset();
      setItemType([]);
      setItemGroup([]);
      setItemUnit([]);
    }
  };

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
      Cell: ({ cell }) => {
        return (
          <button type="button" onClick={() => onDeleteUnit(cell.row.original)}>
            delete
          </button>
        );
      },
    },
  ];

  return (
    <Flex
      width={1}
      backgroundColor="gray"
      paddingY="1em"
      flexDirection="column"
    >
      <Flex width={1}>
        <Box as="form" width={1} onSubmit={handleSubmit(onSaveItem)}>
          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 6}>
              <Label>Item ID</Label>
            </Box>
            <Box width={1 / 8}>
              <Input
                name="id"
                ref={register({ required: true })}
                defaultValue={itemID}
                placeholder="* required"
              />
            </Box>
          </Flex>
          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 6}>
              <Label>Item Name</Label>
            </Box>
            <Box width={2 / 6}>
              <Input
                name="name"
                ref={register({ required: true })}
                placeholder="* required"
              />
            </Box>
          </Flex>
          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 6}>
              <Label>Description</Label>
            </Box>
            <Box width={2 / 6}>
              <Input name="description" ref={register} />
            </Box>
          </Flex>
          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 6}>
              <Label>Type</Label>
            </Box>
            <Box>
              <Select
                name="type"
                options={itemTypeOptions}
                onMyInputChange={onItemTypeChange}
                selectedValue={itemType}
              />
            </Box>
            <Box marginLeft="1em">
              <Label color="hsl(0,0%,50%)">
                {'select type or create new, ex."ขวด PET, ฝา PET,..."'}
              </Label>
            </Box>
          </Flex>
          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 6}>
              <Label>Group</Label>
            </Box>
            <Box>
              <Select
                name="group"
                options={itemGroupOptions}
                onMyInputChange={onItemGroupChange}
                selectedValue={itemGroup}
              />
            </Box>
            <Box marginLeft="1em">
              <Label color="hsl(0,0%,50%)">
                {
                  'select type or create new, ex."สินค้าขาย, งานระหว่างทำ, วัตถุดิบ,..."'
                }
              </Label>
            </Box>
          </Flex>

          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 6} />
            <Box>
              <Controller
                as={<Checkbox />}
                name="rentable"
                type="checkbox"
                control={control}
                defaultValue={false}
              />
            </Box>
            <Box>
              <Label> Rentable </Label>
            </Box>
          </Flex>

          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 6}>
              <Label>Main Unit</Label>
            </Box>
            <Box width={1 / 8}>
              <Input
                name="mainunit"
                ref={register({ required: true })}
                placeholder="* required"
              />
            </Box>
          </Flex>

          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 6}>
              <Label>Packing Unit</Label>
            </Box>
            <Box width={1 / 8}>
              <Input
                name="packingunit"
                ref={register}
                onChange={onPackingUnitNameChange}
              />
            </Box>
            <Box width={1 / 8} paddingLeft="3em">
              <Label>Multiply</Label>
            </Box>
            <Box width={1 / 8}>
              <Input
                name="multiply"
                ref={register}
                onChange={onMultiplyUnitChange}
              />
            </Box>
            <Box paddingLeft="2em">
              <Button disabled={isUnitButtonDisable} onClick={onAddUnitClick}>
                ADD
              </Button>
            </Box>
          </Flex>

          <Flex flexDirection="row" padding="1em 0 0 2em">
            <Box width={1 / 6}>{''}</Box>
            <Box width="50%" marginLeft="">
              <Table
                columns={columns}
                data={itemUnit}
                // getSelectedRow={onUnitTableSelect}
                // updateTableData={onItemUnitChange}
              />
            </Box>
          </Flex>
          <Flex marginTop="5em" justifyContent="center">
            <Divider width="90%" />
          </Flex>
          <Flex padding="1em 4em 0 2em" justifyContent="flex-end">
            <Box width={1 / 5}>
              <Input type="submit" />
            </Box>
            <Box width={1 / 5}>
              <Input type="button" value="RESET" />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

ItemCreate.propTypes = {
  itemCount: PropTypes.number,
  user: PropTypes.object,
};

ItemCreate.defaultProps = {
  itemCount: 0,
  user: {},
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(
  mapStateToProps,
  null
)(ItemCreate);
