import React, { useState, useEffect } from 'react';
import { Flex } from 'common/components/base';
import { Tabs } from 'common/components/tab';
// import { css } from '@emotion/core';
import { SupplierList, SupplierCreate, SupplierDetail } from './Supplier';

const SettingSupplier = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabs, setTabs] = useState([]);

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
      panel: <SupplierDetail label={i} closeMe={e => removeDetailtab(e)} />,
    };
    setTabs(ts => ts.concat(newTabDetail));
  };

  const initTabs = [
    {
      label: 'Suppliers',
      panel: (
        <SupplierList
          setActiveTabIndex={e => activeTabPanel(e)}
          createNewTab={e => createNewTab(e)}
        />
      ),
    },
    { label: 'New Supplier', panel: <SupplierCreate /> },
  ];

  useEffect(() => {
    setTabs(initTabs);
  }, []);

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

export default SettingSupplier;
