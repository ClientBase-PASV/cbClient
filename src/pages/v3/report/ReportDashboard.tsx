import React, { useState } from 'react';
import { Button } from 'antd';

const ReportDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <h1>Reports</h1>

      <Button type="primary" onClick={() => setIsLoading(true)}>
        {isLoading ? '...Loading' : 'Get reports'}
      </Button>
    </>
  );
};

export default ReportDashboard;
