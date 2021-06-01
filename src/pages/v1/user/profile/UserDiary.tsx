import React, { useEffect } from 'react';
import { get } from 'lodash';
import { connect } from 'umi';
import UserDiaryList from '@/pages/user/profile/UserDList';

const UserDiary = (props: any) => {
  const userDiary = get(props, 'userDiary', []);
  const userDiaryGetAll = get(props, 'userDiaryGetAll', '');

  useEffect(() => {
    userDiaryGetAll();
  }, []);

  return (
    <>
      <UserDiaryList items={userDiary.slice(0, 5)} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  userDiary: state.Profile.userDiary,
});

const mapDispatchToProps = (dispatch: any) => ({
  userDiaryGetAll: (payload: any) => dispatch({ type: 'Profile/userDiaryGetAll', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDiary);
