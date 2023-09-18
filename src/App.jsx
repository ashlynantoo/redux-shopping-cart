import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  calculateTotalAndAmount,
  getCartItems,
} from "./features/cart/cartSlice";
import CartContainer from "./components/CartContainer";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";

const App = () => {
  const dispatch = useDispatch();
  const { cartItems, isLoading } = useSelector((store) => {
    return store.cart;
  });
  const { isOpen } = useSelector((store) => {
    return store.modal;
  });

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  useEffect(() => {
    dispatch(calculateTotalAndAmount());
  }, [cartItems]);

  if (isLoading) {
    return (
      <section className="loading-window">
        <div className="loading"></div>
      </section>
    );
  }

  return (
    <main>
      <Navbar />
      <CartContainer />
      {isOpen && <Modal />}
    </main>
  );
};

export default App;
