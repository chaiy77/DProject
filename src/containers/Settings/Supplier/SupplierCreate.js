import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import * as R from 'ramda';
import { Flex, Box } from 'common/components/base';
import { Input, Label, Select } from 'common/components/form';
import { useForm } from 'react-hook-form';
import { DISTRICTS, PROVINCES } from 'data/mock/Thailand';

const districts = DISTRICTS.map(dist => {
  return { value: dist.DISTRICT_NAME, label: dist.DISTRICT_NAME };
});
const provinces = PROVINCES.map(prov => {
  return { value: prov.PROVINCE_NAME, label: prov.PROVINCE_NAME };
});

const SupplierCreate = () => {
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const { register, handleSubmit } = useForm(); // initialise the hook

  useEffect(() => {
    setProvinceOptions(provinces);
    setDistrictOptions(districts);
  }, [districts, provinces]);

  const onDistrictChange = dist => {
    if (dist) {
      setSelectedDistrict([dist]);
      const distArray = DISTRICTS.filter(dt => {
        return dt.DISTRICT_NAME === dist.value;
      });
      const province = PROVINCES.filter(pr => {
        return pr.PROVINCE_ID === distArray[0].PROVINCE_ID;
      });
      const selectedProv = [
        { value: province[0].PROVINCE_NAME, label: province[0].PROVINCE_NAME },
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
        { value: district[0].DISTRICT_NAME, label: district[0].DISTRICT_NAME },
      ]);
      setDistrictOptions(distOptions);
    }
  };

  const onSubmit = data => {
    // console.log(selectedDistrict);
    // console.log(selectedProvince);
    // console.log(data);
    console.error('create customer data:', data);
  };

  return (
    <Flex
      width={1}
      backgroundColor="gray"
      paddingY="1em"
      flexDirection="column"
    >
      <Flex width={1 / 2}>
        <Box as="form" width={1} onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 3}>
              <Label>Name</Label>
            </Box>
            <Box width={2 / 3}>
              <Input name="name" ref={register} />
            </Box>
          </Flex>
          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 3}>
              <Label>Address</Label>
            </Box>
            <Box width={2 / 3}>
              <Input name="address" ref={register} />
            </Box>
          </Flex>
          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 3}>
              <Label>District</Label>
            </Box>
            <Box width={2 / 3}>
              <Select
                name="district"
                ref={register}
                options={districtOptions}
                onMyInputChange={onDistrictChange}
                selectedValue={selectedDistrict}
              />
            </Box>
          </Flex>
          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 3}>
              <Label>Province</Label>
            </Box>
            <Box width={2 / 3}>
              <Select
                name="province"
                ref={register}
                options={provinceOptions}
                selectedValue={selectedProvince}
                onMyInputChange={onProvinceChange}
              />
            </Box>
          </Flex>
          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 3}>
              <Label>Tel No.</Label>
            </Box>
            <Box width={2 / 3}>
              <Input name="tel" ref={register} />
            </Box>
          </Flex>
          <Flex padding="1em 0 0 2em">
            <Box width={1 / 5}>
              <Input type="submit" />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default SupplierCreate;
