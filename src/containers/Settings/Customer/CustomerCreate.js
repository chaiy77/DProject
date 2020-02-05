import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { Flex, Box, Button, Divider, Checkbox } from 'common/components/base';
import { Input, Label, Select } from 'common/components/form';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { useForm, Controller } from 'react-hook-form';
import { SAVE_CUSTOMER } from 'data/graphql/mutation';
import { GET_CUSTOMER_GROUPS } from 'data/graphql/query';
import { DISTRICTS, PROVINCES } from 'data/mock/Thailand';

// import { GET_ITEM_TYPES, GET_ITEM_GROUPS } from 'data/graphql/query';

// https://github.com/ramda/ramda/issues/1629
const isValidNumber = R.both(R.is(Number), R.complement(R.equals(NaN)));

const districts = DISTRICTS.map(dist => {
  return { value: dist.DISTRICT_NAME, label: dist.DISTRICT_NAME };
});
const provinces = PROVINCES.map(prov => {
  return { value: prov.PROVINCE_NAME, label: prov.PROVINCE_NAME };
});

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

const CustomerCreate = ({ user, customerCount }) => {
  // const [defaultID, setDefaultID] = useState('');
  const {
    register,
    handleSubmit,
    errors,
    setValue,
    reset,
    control,
  } = useForm(); // initialise the hook
  // const [itemUnit, setItemUnit] = useState([]);
  // const [packingUnitName, setPackingUnitName] = useState('');
  // const [multiplyUnit, setMultilplyUnit] = useState(0);
  const [customerID, setCustomerID] = useState('');
  const [groupOptions, setGroupOptions] = useState([]);
  const [customerGroup, setCustomerGroup] = useState('');
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState({});

  const [getCustomerGroups] = useLazyQuery(GET_CUSTOMER_GROUPS, {
    onCompleted: data => {
      console.log('customer groups list:', data);
      if (data.getCustomerGroups) {
        const myGroups = data.getCustomerGroups.groups;
        const tempGroups = myGroups.map(gr => {
          return { value: gr, label: gr };
        });
        setGroupOptions(tempGroups);
      }
    },
  });

  useEffect(() => {
    let n = customerCount + 1;
    let i = 'CS-0000' + n;
    setCustomerID(i);

    getCustomerGroups({
      variables: {
        username: user.meta.username,
      },
    });
  }, [customerCount]);

  useEffect(() => {
    setProvinceOptions(provinces);
    setDistrictOptions(districts);
  }, [districts, provinces]);

  const onCustomerGroupChange = value => {
    if (value) {
      setCustomerGroup(value);
    }
  };
  const onDistrictChange = dist => {
    if (dist) {
      setSelectedDistrict([dist]);
      const distArray = DISTRICTS.filter(dt => {
        return dt.DISTRICT_NAME === dist.value;
      });
      const province = PROVINCES.filter(pr => {
        return pr.PROVINCE_ID === distArray[0].PROVINCE_ID;
      });
      console.log(province);
      const selectedProv = [
        {
          value: province[0].PROVINCE_NAME,
          label: province[0].PROVINCE_NAME,
        },
      ];
      setSelectedProvince(selectedProv);
    }
  };
  const onProvinceChange = prov => {
    if (prov) {
      setSelectedProvince([prov]);
      const provArray = PROVINCES.filter(pr => {
        return pr.PROVINCE_NAME === prov.value;
      });
      const district = DISTRICTS.filter(dist => {
        return dist.PROVINCE_ID === provArray[0].PROVINCE_ID;
      });
      const distOptions = district.map(dist => {
        return { value: dist.DISTRICT_NAME, label: dist.DISTRICT_NAME };
      });
      setSelectedDistrict([
        {
          value: district[0].DISTRICT_NAME,
          label: district[0].DISTRICT_NAME,
        },
      ]);
      setDistrictOptions(distOptions);
    }
  };

  const [saveCustomer] = useMutation(SAVE_CUSTOMER, {
    onCompleted: data => {
      console.log(data);
    },
    onError: err => {
      console.log(' save customer error:', err);
    },
  });

  const onSaveCustomer = (data, e) => {
    console.log(data);
    console.log(selectedDistrict[0]);
    console.log(selectedProvince[0]);
    if (data.customerID && data.name) {
      console.log('do save customer');
      let inputData = {
        username: user.meta.username,
        customerID: data.customerID,
        group: customerGroup.value,
        name: data.name,
        address: data.address,
        district: selectedDistrict[0].value,
        province: selectedProvince[0].value,
        zipcode: data.zipcode,
        description: data.description,
        telNumber: data.telNumber,
        brands: data.brands ? data.brands : [],
      };
      console.log(inputData);
      saveCustomer({
        variables: {
          data: inputData,
        },
      });
      e.target.reset();
      setSelectedDistrict({});
      setSelectedProvince({});
    }
  };

  return (
    <Flex
      width={1}
      backgroundColor="gray"
      paddingY="1em"
      flexDirection="column"
    >
      <Flex width={1}>
        <Box as="form" width={1} onSubmit={handleSubmit(onSaveCustomer)}>
          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 6}>
              <Label>Customer ID</Label>
            </Box>
            <Box width={1 / 8}>
              <Input
                name="customerID"
                ref={register({ required: true })}
                defaultValue={customerID}
                placeholder="* required"
              />
            </Box>
          </Flex>
          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 6}>
              <Label>Customer Name</Label>
            </Box>
            <Box width={2 / 6}>
              <Input
                name="name"
                ref={register({ required: true })}
                placeholder="* required"
              />{' '}
              {/* register an input */}
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
                options={groupOptions}
                onMyInputChange={onCustomerGroupChange}
                selectedValue={customerGroup}
              />{' '}
              {/* register an input */}
            </Box>
            <Box marginLeft="1em">
              <Label color="hsl(0,0%,50%)">
                select type or create new, ex."ลูกค้าทั่วไป, รถร่วม,..."
              </Label>
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
              <Label>Address</Label>
            </Box>
            <Box width={2 / 6}>
              <Input name="address" ref={register} /> {/* register an input */}
            </Box>
          </Flex>
          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 6}>
              <Label>District</Label>
            </Box>
            <Box width={1 / 3}>
              <Select
                name="district"
                ref={register}
                options={districtOptions}
                onMyInputChange={onDistrictChange}
                selectedValue={selectedDistrict}
              />{' '}
              {/* register an input */}
            </Box>
          </Flex>
          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 6}>
              <Label>Province</Label>
            </Box>
            <Box width={1 / 3}>
              <Select
                name="province"
                ref={register}
                options={provinceOptions}
                selectedValue={selectedProvince}
                onMyInputChange={onProvinceChange}
              />{' '}
              {/* register an input */}
            </Box>
          </Flex>
          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 6}>
              <Label>Zip Code</Label>
            </Box>
            <Box width={1 / 6}>
              <Input name="zipcode" ref={register} /> {/* register an input */}
            </Box>
          </Flex>
          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 6}>
              <Label>Tel No.</Label>
            </Box>
            <Box width={1 / 3}>
              <Input name="telNumber" ref={register} />{' '}
              {/* register an input */}
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
CustomerCreate.propTypes = {
  customerCount: PropTypes.Number,
};

CustomerCreate.defaultProps = {
  customerCount: 0,
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(
  mapStateToProps,
  null
)(CustomerCreate);
