import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { css } from '@emotion/core';
import { connect } from 'react-redux';
import { Flex, Box, Divider } from 'common/components/base';
import { Input, Label, Select } from 'common/components/form';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';

const InvoiceCreate = () => {
  const {
    register,
    handleSubmit,
    // errors,
    // setValue,
    // reset,
    // control,
  } = useForm();
  return (
    <Flex width={1} backgroundColor="gray" flexDirection="column">
      <Box as="form">
        <Box>
          <Flex flexDirection="row" padding="1em 0 0 2em" alignItems="center">
            <Box width={1 / 6}>
              <Label>Customer ID</Label>
            </Box>
            <Box width={1 / 6}>
              <Input
                name="name"
                ref={register({ required: true })}
                defaultValue={''}
                // placeholder="* required"
              />
            </Box>
          </Flex>
        </Box>
        <Box>
          <Flex marginTop="5em" justifyContent="center">
            <Divider width="95%" />
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
      </Box>
    </Flex>
  );
};

export default InvoiceCreate;
