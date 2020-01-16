import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Flex } from 'common/components/base';
import { Tabs } from 'common/components/tab';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_ITEMS_NAME } from 'data/graphql/query';
// import { css } from '@emotion/core';
import { ProductList, ProductCreate, ProductDetail } from './Product';

const SettingProduct = ({ user }) => {
  const tabData = [];
  const [tabIndex, setTabIndex] = useState(0);
  const [tabs, setTabs] = useState([]);
  const [productList, setQueryResult] = useState([]);

  const [getProducts] = useLazyQuery(GET_ITEMS_NAME, {
    onCompleted: data => {
      setQueryResult(data.getItemsName.items);
    },
  });

  useEffect(() => {
    getProducts({
      variables: { username: user.meta.username, count: 5 },
    });
    setTabs(initTabs());
    console.log(productList);
  }, [productList]);

  const activeTabPanel = index => {
    setTabIndex(index);
  };

  const createNewTab = title => {
    const i = Math.floor(Math.random() * 10000);
    const newTabDetail = {
      label: i,
      panel: <ProductDetail label={i} closeMe={e => removeDetailtab(e)} />,
    };
    setTabs(ts => ts.concat(newTabDetail));
  };

  const removeDetailtab = label => {
    setTabs(ts => {
      const t = ts.filter(tab => tab.label !== label);
      setTabIndex(0);
      return t;
    });
  };

  const getProductList = () => {
    console.log('getPorductlist');
    const data = { productList };
    return data.productList;
  };

  const initTabs = () => {
    let prods = [...productList];
    let ts = [
      {
        label: 'Products',
        panel: (
          <ProductList
            setActiveTabIndex={e => activeTabPanel(e)}
            createNewTab={e => createNewTab(e)}
            tabData={productList}
          />
        ),
      },
      {
        label: 'New Product',
        panel: <ProductCreate itemCount={prods.length} />,
      },
    ];
    return ts;
  };

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

export default connect(
  mapStateToProps,
  null
)(SettingProduct);
