import React from 'react';
import { Link } from 'umi';

const PricingPage = () => {
  return (
    <div className="container pt-5">
      <h1>Pricing</h1>
      <p>ClientBase keeps your clients, accounting and communication all in one place.</p>

      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4 box-shadow">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">Free</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title">FREE</h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>Up to 10 Clients</li>
                <li>Up to 3 Users</li>
                <li>1 year archive</li>
              </ul>
              <Link className="ant-btn ant-btn-primary login-form-button" to="/user/register">
                Start
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4 box-shadow">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">Pro</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title">$10/user/mo</h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>Up to 5000 Clients</li>
                <li>5 year archive</li>
                <li>Built-in chat</li>
              </ul>

              <Link className="ant-btn ant-btn-primary login-form-button" to="/user/register">
                Start 14 day trial
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4 box-shadow">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">Enterprise</h4>
            </div>

            <div className="card-body">
              <h1 className="card-title">$20/user/mo</h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>Unlimited clients</li>
                <li>Unlimited archive</li>
                <li>Built-in chat</li>
              </ul>
              <Link className="ant-btn ant-btn-primary login-form-button" to="/user/register">
                Start 14 day trial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
