import React, { useState, useEffect, FC } from 'react';
import { useForm } from 'react-hook-form';
import Spin from '../components/Spin';
import { getCurrentUser, setCurrentUser } from '../helpers/helper';
import SignUpModal from '../components/Modals/SignUpModal';
import SignInModal from '../components/Modals/SignInModal';
import RedeemCodeModal from '../components/Modals/RedeemCodeModal';
import RewardModal from '../components/Modals/RewardModal';
import { useAuth } from '../hooks/useAuth';

const apiUrl = process.env.REACT_APP_API_URL;

const IndexPage: FC = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenCodeInputModal, setOpenCodeInputModal] = useState(false);
  const [isRewardModalOpen, setRewardModal] = useState(false);
  const [isOpenSignInModal, setOpenSignInModal] = useState(false);
  const [isLoading, setLoading] = useState(null);
  const [user1, setUser] = useState(null);
  const [codes, setCodes] = useState(null);
  const [winner, setWinner] = useState(null);
  const { login, register: registerFn } = useAuth();

  // const fetchCodes = async (userId) => {
  //   const fetchCodes = await fetch(`${apiUrl}/codes-by-account?id=${userId}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   const codesResp = await fetchCodes.json();
  //   setCodes(codesResp.codes);
  // };

  // useEffect(() => {
  //   const user = getCurrentUser();

  //   const getCurrentUserApi = async () => {
  //     const id = user._id;
  //     setLoading(true);
  //     const res = await fetch(`${apiUrl}/users/${id}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     const json = await res.json();
  //     setCurrentUser(JSON.stringify(json));
  //     setUser(json);
  //     setLoading(false);

  //     if (json) {
  //       fetchCodes(id);
  //     }
  //   };

  //   if (user) {
  //     getCurrentUserApi();
  //   }
  // }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm({
    mode: 'all',
  });

  const onRegisterSubmit = handleSubmit(async (data) => {
    data.phone = data.phone.replace(/[^0-9]+/g, '');

    const finalData = JSON.parse(JSON.stringify(data));

    setLoading(true);

    try {
      await registerFn(finalData);
    } catch (err) {
      setError('phone', {
        type: 'wrong-code',
        message: err.message,
      });
    }

    setLoading(false);
    // const res = await fetch(`${apiUrl}/users`, {
    //   method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    //   body: JSON.stringify(finalData),
    // });

    // const user = await res.json();
    // setCurrentUser(JSON.stringify(user));
    // setOpenModal(false);
    // setLoading(false);
    // setUser(user);

    // fetchCodes(user._id);
  });

  const onRedeemCode = handleSubmit(async (data) => {
    data = {
      ...data,
      ...getCurrentUser(),
    };

    const finalData = JSON.parse(JSON.stringify(data));

    setLoading(true);

    const resp = await fetch(`${apiUrl}/redeem-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalData),
    });

    const jsonResponse = await resp.json();

    setLoading(false);
    if (jsonResponse.error) {
      setError('code', { type: 'wrong-code', message: jsonResponse.error });
    } else {
      setCurrentUser(JSON.stringify(jsonResponse));
      setOpenCodeInputModal(false);
      setUser(jsonResponse);
      // fetchCodes(jsonResponse._id);
    }
  });

  const onLoginSubmit = () => {};

  return (
    <div className="App">
      <div className="px-5 py-5 container mx-auto min-h-screen">
        <Spin
          setOpenSignUpModal={setOpenModal}
          setOpenRewardModal={setRewardModal}
          setOpenCodeInputModal={setOpenCodeInputModal}
          userProps={user1}
          setUser={setUser}
          // fetchCodes={fetchCodes}
          getWinner={setWinner}
        />
        <SignUpModal
          isLoading={isLoading}
          onSubmit={onRegisterSubmit}
          setOpenModal={setOpenModal}
          isOpenModal={isOpenModal}
          errors={errors}
          control={control}
          register={register}
        />
        <SignInModal
          isLoading={isLoading}
          onSubmit={onLoginSubmit}
          setOpenModal={setOpenSignInModal}
          isOpenModal={isOpenSignInModal}
          errors={errors}
          control={control}
          register={register}
        />
        <RedeemCodeModal
          isLoading={isLoading}
          onSubmit={onRedeemCode}
          setOpenModal={setOpenCodeInputModal}
          isOpenModal={isOpenCodeInputModal}
          errors={errors}
          control={control}
          register={register}
        />
        <RewardModal
          user={user1}
          winner={winner}
          setOpenModal={setRewardModal}
          isOpenModal={isRewardModalOpen}
        />
      </div>
    </div>
  );
};

export default IndexPage;
