import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flex } from 'common/components/base';
import { Tabs } from 'common/components/tab';
import { useQuery } from '@apollo/react-hooks';
import { LIST_CUSTOMERS } from 'data/graphql/query';
// import { css } from '@emotion/core';
import { ON_UPDATE_CUSTOMERS } from 'data/graphql/subscription';
import { CustomerCreate, CustomerDetail, CustomerList } from './Customer';

let tempCustomerList = [];

const SettingCustomer = ({ user }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabs, setTabs] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  // const { productData, loading } = useSubscription(ON_UPDATE_ITEMS);

  // const { loading, data, error, subscribeToMore } = useQuery(LIST_CUSTOMERS, {
  const { loading, data, error, subscribeToMore } = useQuery(LIST_CUSTOMERS, {
    variables: { username: user.meta.username },
  });
  // https://github.com/apollographql/react-apollo/issues/3317
  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: ON_UPDATE_CUSTOMERS,
      updateQuery: (prev, { subscriptionData }) => {
        console.log('prev:', prev);
        console.log('subData:', subscriptionData);
        if (!subscriptionData.data) {
          return prev;
        }
        tempCustomerList = tempCustomerList.concat(
          subscriptionData.data.onUpdateCustomer
        );

        setCustomerList(tempCustomerList);
      },
    });
    return () => unsubscribe();
  }, []);

  const activeTabPanel = index => {
    setTabIndex(index);
  };

  const removeDetailtab = label => {
    setTabs(ts => {
      const t = ts.filter(tab => tab.label !== label);
      setTabIndex(0);
      return t;
    });
  };

  const createNewTab = () => {
    const i = Math.floor(Math.random() * 10000);
    const newTabDetail = {
      label: i,
      panel: <CustomerDetail label={i} closeMe={e => removeDetailtab(e)} />,
    };
    setTabs(ts => ts.concat(newTabDetail));
  };

  useEffect(() => {
    // console.log('customers: ', data);
    if (data) {
      if (data.getAllCustomers.customers) {
        tempCustomerList = data.getAllCustomers.customers;
        setCustomerList(tempCustomerList);
      }
    }
  }, [data]);

  useEffect(() => {
    const cust = [...customerList];
    console.log(cust);
    const initTabs = [
      {
        label: 'Customers',
        panel: (
          <CustomerList
            setActiveTabIndex={e => activeTabPanel(e)}
            createNewTab={e => createNewTab(e)}
            tabData={customerList}
          />
        ),
      },
      {
        label: 'New Customer',
        panel: <CustomerCreate customerCount={cust.length} />,
      },
    ];
    setTabs(initTabs);
  }, [customerList]);

  if (loading) {
    return <h2> loading.....</h2>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <Flex justifyContent="column" width="100%">
      <Tabs
        tabMembers={tabs}
        tabActiveIndex={tabIndex}
        setActiveTabIndex={activeTabPanel}
      />
    </Flex>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

SettingCustomer.propTypes = {
  user: PropTypes.object,
};

SettingCustomer.defaultProps = {
  user: {},
};

export default connect(
  mapStateToProps,
  null
)(SettingCustomer);
