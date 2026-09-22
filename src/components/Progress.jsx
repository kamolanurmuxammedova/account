import React from 'react';
import { Flex, Progress as AntProgress } from 'antd';
const ProgressWidget = () => (
  <Flex gap="small" wrap>
    <AntProgress type="circle" percent={75} />
    <AntProgress type="circle" percent={70} status="exception" />
    <AntProgress type="circle" percent={100} />
  </Flex>
);
export default ProgressWidget;