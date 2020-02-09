import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flex } from 'common/components/base';
import { Tabs } from 'common/components/tab';
import { useQuery } from '@apollo/react-hooks';
// import { LIST_ITEMS } from 'data/graphql/query';
// import { css } from '@emotion/core';
// import { ON_UPDATE_ITEMS } from 'data/graphql/subscription';
import { InvoiceCreate, InvoiceList, InvoiceDetail } from './Invoice';

let tempInvoiceList = [];

const SellInvoice = ({ user }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabs, setTabs] = useState([]);
  const [invoiceList, setQueryResult] = useState([]);
  // const { productData, loading } = useSubscription(ON_UPDATE_ITEMS);

  // const { loading, data, error, subscribeToMore } = useQuery(LIST_ITEMS, {
  //   variables: { username: user.meta.username, count: 5 },
  // });

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
      panel: <InvoiceDetail label={i} closeMe={e => removeDetailtab(e)} />,
    };
    setTabs(ts => ts.concat(newTabDetail));
  };

  // https://github.com/apollographql/react-apollo/issues/3317
  // useEffect(() => {
  //   const unsubscribe = subscribeToMore({
  //     document: ON_UPDATE_ITEMS,
  //     updateQuery: (prev, { subscriptionData }) => {
  //       // console.log('prev:', prev);
  //       // console.log('subData:', subscriptionData);
  //       if (!subscriptionData.data) {
  //         return prev;
  //       }
  //       tempProductList = tempProductList.concat(
  //         subscriptionData.data.onUpdateItem
  //       );

  //       setQueryResult(tempProductList);
  //       return null;
  //     },
  //   });
  //   return () => unsubscribe();
  // }, []);

  // useEffect(() => {
  //   if (data) {
  //     if (data.getAllItems.items) {
  //       // console.log('items: ', data);
  //       tempProductList = data.getAllItems.items;
  //       setQueryResult(tempProductList);
  //     }
  //   }
  // }, [data]);

  useEffect(() => {
    const invs = [...invoiceList];
    const ts = [
      {
        label: 'Invoices',
        panel: (
          <InvoiceList
            setActiveTabIndex={e => activeTabPanel(e)}
            createNewTab={e => createNewTab(e)}
            tabData={invoiceList}
          />
        ),
      },
      {
        label: 'New Invoice',
        panel: <InvoiceCreate itemCount={invs.length} />,
      },
    ];

    setTabs(ts);
  }, [invoiceList]);

  // if (loading) {
  //   return <h2> loading.....</h2>;
  // }
  // if (error) {
  //   return <h2>{error}</h2>;
  // }

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

SellInvoice.propTypes = {
  user: PropTypes.object,
};

SellInvoice.defaultProps = {
  user: {},
};

export default connect(
  mapStateToProps,
  null
)(SellInvoice);
