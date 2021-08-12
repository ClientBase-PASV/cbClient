import React from 'react';
import { Form, Input, Button, Collapse } from 'antd';

const { Panel } = Collapse;

const Faq = () => {
  return (
    <div className="ml-auto mr-auto w-50 mt-2">
      <h4 className="text-uppercase">Frequently asked questions</h4>

      <Collapse ghost className="mb-2 ml-n3 mb-3">
        <Panel header="Are prices listed only in U.S. dollars?" key="1">
          <p className="font-italic text-black-50 ml-4">Yes, all prices shown are in U.S. dollars.</p>
        </Panel>

        <Panel header="What if I want to change my plan?" key="2">
          <p className="font-italic text-black-50 ml-4">
            When you upgrade your plan, changes are applied immediately. When you downgrade your plan, changes are
            applied at the end of your current billing cycle.
          </p>
        </Panel>

        <Panel header="Are clients able to create their own accounts?" key="3">
          <p className="font-italic text-black-50 ml-4">No, only owner can create client account.</p>
        </Panel>

        <Panel header="How does the 14 day trial work?" key="4">
          <p className="font-italic text-black-50 ml-4">
            Trial starts from the 1st day of your subscription to the plan. Cancel within the first 14 days of your
            trial and you will not be charged.
          </p>
        </Panel>

        <Panel header="How safe is my data?" key="5">
          <p className="font-italic text-black-50 ml-4">
            Your data is safe. We take your data and its security very seriously. In fact, it is super critical to us
            that your data remains safe, and we constantly monitor and work towards closing any threats that might put
            it at risk.
          </p>
        </Panel>

        <Panel header="Do you have any cancellation fees?" key="6">
          <p className="font-italic text-black-50 ml-4">No, you can stop plan any time without cancellation fees.</p>
        </Panel>

        <Panel header="What type of payment do you accept?" key="7">
          <p className="font-italic text-black-50 ml-4">We accept credit, debit cards, PayPal, Venmo, Zelle.</p>
        </Panel>
      </Collapse>

      <Form>
        <p>Have we missed anything? Ask us a question!</p>
        <Form.Item name={'message'}>
          <Input.TextArea placeholder="Message" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Faq;
