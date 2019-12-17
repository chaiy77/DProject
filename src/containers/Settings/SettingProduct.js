import React, { useState, useEffect } from 'react';
import { Text, Flex } from 'common/components/base';
import { Tabs } from 'common/components/tab';
import { css } from '@emotion/core';
import { ProductList, ProductCreate, ProductDetail } from './Product';

const SettingProduct = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabs, setTabs] = useState([]);

  const initTabs = [
    {
      label: 'Products',
      panel: (
        <ProductList
          setActiveTabIndex={e => activeTabPanel(e)}
          createNewTab={e => createNewTab(e)}
        />
      ),
    },
    { label: 'New Product', panel: <ProductCreate /> },
  ];

  useEffect(() => {
    setTabs(initTabs);
  }, []);

  const activeTabPanel = index => {
    setTabIndex(index);
  };

  const createNewTab = title => {
    const _i = Math.floor(Math.random() * 10000);
    const newTabDetail = {
      label: _i,
      panel: <ProductDetail label={_i} closeMe={e => removeDetailtab(e)} />,
    };
    setTabs(ts => ts.concat(newTabDetail));
  };

  const removeDetailtab = label => {
    setTabs(tabs => {
      const _tabs = tabs.filter(tab => tab.label !== label);
      setTabIndex(0);
      return _tabs;
    });
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

export default SettingProduct;
