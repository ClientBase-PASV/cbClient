import React from 'react';
import { Link } from 'umi';

const IndustriesPage = () => {
  return (
    <div className="container pt-5">
      <h1>Industries</h1>
      <p>ClientBase keeps packed all your field service scheduling tools in one place.</p>

      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4 box-shadow">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">Locksmith</h4>
            </div>
            <div className="card-body">
              <p>
                Install, repair, and adjust locks in everything from cars to office buildings, and also offer services
                to people who are locked out or individuals who want to consult with someone about their security
                systems.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4 box-shadow">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">Plumbing</h4>
            </div>
            <div className="card-body">
              <p>
                Install, maintain, and repair pipes and fixture associated with heating, cooling, water distribution,
                and sanitation systems in residential and commercial structures.{' '}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4 box-shadow">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">HVAC</h4>
            </div>
            <div className="card-body">
              <p>
                Heating, ventilation, and air conditioning is the technology of indoor and vehicular environmental
                comfort. It's goal is to provide thermal comfort.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4 box-shadow">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">Carpet Cleaning</h4>
            </div>
            <div className="card-body">
              <p>
                You can provide an assortment of cleaning and restoration services for local commercial and residential
                customers including steam carpet cleaning.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4 box-shadow">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">Garage Door</h4>
            </div>
            <div className="card-body">
              <p>
                Install or repair doors, lubricate door tracks or wheels, or replace the springs that help doors open
                and close. Also include working on the repair of electric door openers, safety features, and other
                components.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4 box-shadow">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">Junk Removal</h4>
            </div>
            <div className="card-body">
              <p>
                When you schedule junk removal, company sends a small team of haulers to your location to carry your
                junk from wherever it is out to their truck and haul it away to dispose of it properly. And you will
                never have to worry about it again.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4 box-shadow">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">Electrical Contractor</h4>
            </div>
            <div className="card-body">
              <p>
                Install and maintain electrical power systems, conduits, cables, control panels, generators, lighting
                systems, video and data systems, and low voltage systems.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4 box-shadow">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">Appliance Repair</h4>
            </div>
            <div className="card-body">
              <p>
                Install and troubleshoot washers, ranges and other large appliances for your customers. Instruct their
                customers on how to operate the appliances properly...
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4 box-shadow">
            <div className="card-header">
              <h4 className="my-0 font-weight-normal">Service Dispatch</h4>
            </div>
            <div className="card-body">
              <p>
                Receive emergency and non-emergency calls and record significant information. Addressing problems and
                requests by transmitting information or providing solutions. Receiving and dispatching orders for
                products or deliveries.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Link className="ant-btn ant-btn-primary login-form-button" to="/user/register">
        Sign up today
      </Link>
    </div>
  );
};

export default IndustriesPage;
