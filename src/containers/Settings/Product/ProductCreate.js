import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Flex, Box, Button, Divider } from 'common/components/base';
import { Input, Label, Select } from 'common/components/form';
import { Table } from 'common/components/table';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { SAVE_ITEM } from 'data/graphql/mutation';
import { GET_ITEM_TYPES, GET_ITEM_GROUPS } from 'data/graphql/query';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

// https://github.com/ramda/ramda/issues/1629
const isValidNumber = R.both(R.is(Number), R.complement(R.equals(NaN)));

const tableHeaderStyle = css`
  text-align: center;
`;

const inputStyle = ({ isNumber = true }) => css`
  ${!isNumber &&
    css`
      color: red;
      border-color: red;
    `}
`;

const ItemCreate = ({ user, itemCount }) => {
  // const [defaultID, setDefaultID] = useState('');
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const [itemUnit, setItemUnit] = useState([]);
  const [itemMainUnit, setItemMainUnit] = useState('');
  const [packingUnitName, setPackingUnitName] = useState('');
  const [multiplyUnit, setMultilplyUnit] = useState(0);
  const [itemID, setItemID] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemGroup, setItemGroup] = useState('');
  const [itemGroupOptions, setItemGroupOptions] = useState([]);
  const [itemType, setItemType] = useState('');
  const [itemTypeOptions, setItemTypeOptions] = useState([]);
  const [itemDes, setItemDes] = useState('');
  const [isSaveButtonDisable, setSaveButtonDisable] = useState(true);
  const [isUnitButtonDisable, setUnitButtonDisable] = useState(true);
  const [updateUnitIndex, setUpdateUnitIndex] = useState(-1);

  const [getItemTypes] = useLazyQuery(GET_ITEM_TYPES, {
    onCompleted: data => {
      const myTypes = data.getItemTypes.types;
      if (data.getItemTypes) {
        const tempTypes = myTypes.map(tr => {
          return { value: tr, label: tr };
        });
        console.log(tempTypes);
        setItemTypeOptions(tempTypes);
      }
    },
  });
  const [getItemGroups] = useLazyQuery(GET_ITEM_GROUPS, {
    onCompleted: data => {
      const myGroups = data.getItemGroups.groups;
      if (data.getItemGroups) {
        const tempGroups = myGroups.map(gr => {
          return { value: gr, label: gr };
        });
        console.log(tempGroups);
        setItemGroupOptions(tempGroups);
      }
    },
  });

  useEffect(() => {
    let n = itemCount + 1;
    let i = 'IT-0000' + n;
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

  const [saveItem] = useMutation(SAVE_ITEM, {
    onCompleted: data => {
      console.log(data);
    },
    onError: err => {
      console.log(' save item error:', err);
    },
  });

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
      const _unit = [...itemUnit];
      // console.log(_unit);
      const u = _unit.filter(unit => {
        return unit.name === packingUnitName;
      });
      if (u.length === 0) {
        // _unit.push({ name: packingUnitName, multiply: multiplyUnit });
        if (updateUnitIndex < 0) {
          setItemUnit(_u =>
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
          setItemUnit(_unit);
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
    itemUnit.map(u => {
      if (u.name !== row.name) {
        _unit.push({ i: _unit.length + 1, name: u.name, multiply: u.multiply });
      }
    });
    setItemUnit(_unit);
  };

  const onSaveItem = data => {
    console.log(data);
  };

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
            <Box width={2 / 6}>
              <Input name="id" ref={register} /> {/* register an input */}
            </Box>
          </Flex>
          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 6}>
              <Label>Item Name</Label>
            </Box>
            <Box width={2 / 6}>
              <Input name="name" ref={register} /> {/* register an input */}
            </Box>
          </Flex>
          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 6}>
              <Label>Description</Label>
            </Box>
            <Box width={2 / 6}>
              <Input name="description" ref={register} />{' '}
              {/* register an input */}
            </Box>
          </Flex>
          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 6}>
              <Label>Type</Label>
            </Box>
            <Box width={2 / 6}>
              <Select
                name="type"
                ref={register}
                options={itemTypeOptions}
                onMyInputChange={onItemTypeChange}
                selectedValue={itemType}
              />{' '}
              {/* register an input */}
            </Box>
            <Box width={3 / 6}>
              <Label>
                select type or create new, ex."สินค้าขาย, งานระหว่างทำ,
                วัตถุดิบ,..."{' '}
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
                ref={register}
                options={itemGroupOptions}
                onMyInputChange={onItemGroupChange}
                selectedValue={itemGroup}
              />{' '}
              {/* register an input */}
            </Box>
            <Box width={3 / 6}>
              <Label>
                select type or create new, ex."ขวด PET, ฝา PET,..."{' '}
              </Label>
            </Box>
          </Flex>

          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 6}>
              <Label>Main Unit</Label>
            </Box>
            <Box width={2 / 6}>
              <Input name="mainunit" ref={register} /> {/* register an input */}
            </Box>
          </Flex>

          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 6}>
              <Label>Packing Unit</Label>
            </Box>
            <Box width={1 / 6}>
              <Input
                name="packingunit"
                ref={register}
                onChange={onPackingUnitNameChange}
              />{' '}
              {/* register an input */}
            </Box>
            <Box width={1 / 8} paddingLeft="2em">
              <Label>Multiply</Label>
            </Box>
            <Box width={1 / 6}>
              <Input
                name="multiply"
                ref={register}
                onChange={onMultiplyUnitChange}
              />{' '}
              {/* register an input */}
            </Box>
            <Box paddingLeft="2em">
              <Button disabled={isUnitButtonDisable} onClick={onAddUnitClick}>
                ADD
              </Button>
            </Box>
          </Flex>

          <Flex>
            <Box width="50%">
              <Table
                columns={columns}
                data={itemUnit}
                // getSelectedRow={onUnitTableSelect}
                // updateTableData={onItemUnitChange}
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

//   const onItemIDChange = e => {
//     e.preventDefault();
//     const id = e.target.value;
//     if (id !== null && id !== '') {
//       setSaveButtonDisable(false);
//       setItemID(id);
//     } else {
//       setSaveButtonDisable(true);
//     }
//   };

//   const onItemNameChange = e => {
//     e.preventDefault();
//     const name = e.target.value;
//     if (name !== null && name !== '') {
//       setSaveButtonDisable(false);
//       setItemName(name);
//     } else {
//       setSaveButtonDisable(true);
//     }
//   };

// const onItemDesChange = e => {
//   e.preventDefault();
//   const des = e.target.value;
//   setItemDes(des);
//   // console.log('onItemDesChange: ', des);
// };

//   const onItemMainUnitChange = e => {
//     e.preventDefault();
//     const unit = e.target.value;
//     setItemMainUnit(unit);
//     // console.log('onItemMainUnitChange: ', unit);
//   };

//   const onPackingUnitNameChange = e => {
//     e.preventDefault();
//     const name = e.target.value;
//     setPackingUnitName(name);
//   };

//   const onMultiplyUnitChange = e => {
//     e.preventDefault();
//     const mul = parseFloat(e.target.value);
//     setMultilplyUnit(`${mul}`);
//   };

//   const onSaveItem = e => {
//     e.preventDefault();
//     console.log('onSaveItem :');
//     // checkValidInput(itemUnit);

//     // const itemName = e.target.itemname.value;
//     if (itemName !== '' && itemName) {
//       console.log('onSaveItem :', itemName);
//       console.log('onSaveItemID :', itemID);
//       console.log(user.meta.username);
//       console.log('type', itemType.value);
//       saveItem({
//         variables: {
//           data: {
//             id: itemID,
//             username: user.meta.username,
//             name: itemName,
//             type: itemType.value,
//             group: itemGroup.value,
//           },
//         },
//       });
//     }
//   };

//   const onAddUnitClick = () => {
//     if (isValidNumber(parseFloat(multiplyUnit))) {
//       const _unit = [...itemUnit];
//       // console.log(_unit);
//       const u = _unit.filter(unit => {
//         return unit.name === packingUnitName;
//       });
//       if (u.length === 0) {
//         // _unit.push({ name: packingUnitName, multiply: multiplyUnit });
//         if (updateUnitIndex < 0) {
//           setItemUnit(_u =>
//             _u.concat({
//               i: _unit.length + 1,
//               name: packingUnitName,
//               multiply: multiplyUnit,
//             })
//           );
//         } else {
//           _unit[updateUnitIndex] = {
//             i: updateUnitIndex + 1,
//             name: packingUnitName,
//             multiply: multiplyUnit,
//           };
//           setItemUnit(_unit);
//         }
//         setPackingUnitName('');
//         setMultilplyUnit(0);
//         setUpdateUnitIndex(-1);
//       } else {
//         // alert name is existed
//         console.log('name is existed');
//       }
//     }
//   };

//   const onDeleteUnit = row => {
//     // console.log('onDeleteUnit with :', row);
//     const _unit = [];
//     itemUnit.map(u => {
//       if (u.name !== row.name) {
//         _unit.push({ i: _unit.length + 1, name: u.name, multiply: u.multiply });
//       }
//     });
//     setItemUnit(_unit);
//   };

//   return (
//     <Flex
//       width={1}
//       backgroundColor="gray"
//       paddingY="1em"
//       flexDirection="column"
//     >
//       <Box width={1} mt={1} paddingX="2em">
//         <Flex
//           width={2 / 3}
//           flexDirection="row"
//           alignItems="center"
//           marginBottom="0.8em"
//         >
//           <Label width="25%" htmlFor="itemname">
//             Item ID
//           </Label>
//           <Input
//             width="40%"
//             id="itemID"
//             name="itemID"
//             defaultValue={itemID}
//             onChange={e => onItemIDChange(e)}
//           />
//         </Flex>
//         <Flex
//           width={2 / 3}
//           flexDirection="row"
//           alignItems="center"
//           marginBottom="0.8em"
//         >
//           <Label width="25%" htmlFor="itemname">
//             Item Name
//           </Label>
//           <Input
//             width="40%"
//             id="itemname"
//             name="itemname"
//             onChange={e => onItemNameChange(e)}
//           />
//         </Flex>

//         <Flex
//           width={2 / 3}
//           flexDirection="row"
//           alignItems="center"
//           marginBottom="0.8em"
//         >
//           <Label width="25%" htmlFor="description">
//             Description
//           </Label>
//           <Input
//             width="75%"
//             id="description"
//             name="descriptione"
//             onChange={e => onItemDesChange(e)}
//           />
//         </Flex>

//         <Flex
//           width={2 / 3}
//           flexDirection="row"
//           alignItems="center"
//           marginBottom="0.8em"
//         >
//           <Label width="25%" htmlFor="itemtype">
//             Type
//           </Label>
//           <Select
//             width="40%"
//             id="itemtype"
//             name="itemtype"
//             label="เช่น ขวด PET, ฝา PET,..."
//             onMyInputChange={onItemTypeChange}
//             selectedValue={itemType}
//             options={itemTypeOptions}
//           />
//         </Flex>
//         <Flex
//           width={2 / 3}
//           flexDirection="row"
//           alignItems="center"
//           marginBottom="0.8em"
//           style={{ postion: 'relative' }}
//         >
//           <Label width="25%" htmlFor="itemgroup">
//             Group
//           </Label>

//           <Select
//             width="40%"
//             id="itemgroup"
//             name="itemgroup"
//             label="สินค้าขายม วัตถุดิบ"
//             onMyInputChange={onItemGroupChange}
//             selectedValue={itemGroup}
//             options={itemTypeOptions}
//           />
//         </Flex>

//         <Flex width={2 / 3} marginBottom="1em">
//           <Label width="25%" htmlFor="mainunit">
//             Main Unit
//           </Label>
//           <Input
//             width="30%"
//             id="mainunit"
//             name="mainunit"
//             onChange={e => onItemMainUnitChange(e)}
//           />
//         </Flex>

//         <Flex width={2 / 3}>
//           <Label width="30%" marginTop="1em">
//             {' '}
//             Packing Uints
//           </Label>
//           <Flex flexDirection="column">
//             <Flex flexDirection="row">
//               <Flex alignItems="center">
//                 <Label width="30%">Name</Label>
//                 <Input
//                   width="60%"
//                   name="packingunitname"
//                   value={packingUnitName}
//                   onChange={e => onPackingUnitNameChange(e)}
//                 />
//               </Flex>
//               <Flex alignItems="center" marginLeft="1em">
//                 <Label width="40%">Multiply</Label>
//                 <Input
//                   width="50%"
//                   name="multiply"
//                   onChange={e => onMultiplyUnitChange(e)}
//                   value={multiplyUnit}
//                   css={inputStyle({
//                     isNumber: isValidNumber(parseInt(multiplyUnit)),
//                   })}
//                 />
//               </Flex>
//               <Flex marginLeft="1em">
//                 <Button disabled={isUnitButtonDisable} onClick={onAddUnitClick}>
//                   add
//                 </Button>
//               </Flex>
//             </Flex>
//             <Flex width="50%">
//               <Table
//                 columns={columns}
//                 data={itemUnit}
//                 // getSelectedRow={onUnitTableSelect}
//                 // updateTableData={onItemUnitChange}
//               />
//             </Flex>
//           </Flex>
//         </Flex>

//         <Divider width="90%" />

//         <Flex>
//           <Button
//             type="submit"
//             disabled={isSaveButtonDisable}
//             onClick={e => onSaveItem(e)}
//           >
//             Save
//           </Button>
//         </Flex>
//       </Box>
//     </Flex>
//   );
// };

ItemCreate.propTypes = {
  itemCount: PropTypes.Number,
};

ItemCreate.defaultProps = {
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
)(ItemCreate);
