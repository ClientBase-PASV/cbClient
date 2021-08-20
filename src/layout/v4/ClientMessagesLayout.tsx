import React from 'react';

const ClientMessagesLayout = ({ children }: any) => {
  return (
    <div className="row">
      <div className="col-md-9">{children}</div>
    </div>
  );
};

export default ClientMessagesLayout;
