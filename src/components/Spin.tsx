import React, { useState, useEffect, useMemo, FC } from "react";
import { Wheel } from "react-custom-roulette";
import { useModal } from "../context/ModalContext";
import { getCurrentUser, setCurrentUser } from "../helpers/helper";
import useGiftCategory from "../hooks/useGiftCategory";
import RedeemCodeModal from "./Modals/RedeemCodeModal";
import SignUpModal from "./Modals/SignUpModal";

const apiUrl = process.env.REACT_APP_API_URL;

interface SpinComponentProps {
  setOpenSignUpModal(status: boolean): void;
  setOpenCodeInputModal(status: boolean): void;
  userProps?: any;
  setUser?(user: any): void;
  fetchCodes?: any;
  setOpenRewardModal(status: boolean): void;
  getWinner?: any;
  handleSpinClick?: any;
}

const Spin: FC<SpinComponentProps> = ({
  setOpenSignUpModal,
  userProps,
  setUser,
  setOpenCodeInputModal,
  fetchCodes,
  setOpenRewardModal,
  getWinner,
  handleSpinClick
}) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [winner, setWinner] = useState(null);
  const { categories = [] } = useGiftCategory();
  const { showModal } = useModal();
  const user = getCurrentUser();

  // const handleSpinClick = async () => {
  //   if (!user) {
  //     return showModal(SignUpModal);
  //     // return setOpenSignUpModal(true);
  //   }

  //   if (user && user.points === 0) {
  //     return showModal(RedeemCodeModal);
  //     // return setOpenCodeInputModal(true);
  //   }

    // if (mustSpin) return;
    // setMustSpin(true);
  // };

  const spinWithCallback = () => {

  }

  const poolData = useMemo(
    () =>
      categories.map((category) => {
        return {
          option: category.name,
        };
      }),
    [categories]
  );

  useEffect(() => {
    const getResult = async () => {
      const data = await fetch(`${apiUrl}/x?id=${userProps._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resp = await data.json();
      const winner = resp.x;

      if (resp.user) {
        setCurrentUser(JSON.stringify(resp.user));
        setUser(resp.user);
      }

      if (mustSpin) {
        setWinner(winner);
        getWinner(poolData[winner]);
      }
    };

    if (mustSpin) {
      getResult();
    }
  }, [mustSpin]);

  const onStopSpinning = () => {
    setMustSpin(false);
    setOpenRewardModal(true);
    fetchCodes(user._id);
  };

  return (
    <div className="flex flex-col justify-center items-center flex-wrap">
      {userProps && (
        <h5 className="mb-2 text-lg">
          Số lần quay hiện tại:{" "}
          <span className="font-semibold">{userProps.points}</span>
        </h5>
      )}

      <Wheel
        mustStartSpinning={mustSpin}
        data={poolData}
        prizeNumber={winner}
        backgroundColors={["#3e3e3e", "#df3428"]}
        textColors={["#ffffff"]}
        onStopSpinning={onStopSpinning}
      />
      <button
        onClick={handleSpinClick}
        className="px-5 mt-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
      >
        Quay
      </button>
    </div>
  );
};

export default Spin;
