import React from 'react';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/v4/user/userSearch/types';
import UserRegister from '@/pages/v4/user/account/UserRegister';

interface IProps {
  User: IUserAccount;
}

function HomePage(props: IProps) {
  const isUserAuth = get(props, 'User._id');

  return (
    <>
      <div className="bg-gray-100">
        <div className="max-w-screen-lg mx-auto px-3 pt-20 pb-20">
          <header className="text-center">
            <h1 className="text-6xl text-gray-900 font-bold whitespace-pre-line leading-hero">
              Dispatching and accounting for service companies{' '}
            </h1>
            <div className="text-2xl mt-4 mb-16">
              The easiest way to manage the process of receiving and transmitting an order.
            </div>

            {!isUserAuth && (
              <div className="mt-5">
                <UserRegister />
              </div>
            )}
          </header>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  User: state.User,
});

export default connect(mapStateToProps)(HomePage);
