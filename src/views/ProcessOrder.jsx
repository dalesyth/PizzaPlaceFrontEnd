import { useContext, useState } from "react";
import { CartContext } from "../contexts/Cart";
import { Link, useNavigate } from "react-router-dom";
import {
  createNewOrder,
  addPizzaToOrder,
  attachToppingsToOrderedPizza,
  addSideToOrder,
} from "../api/orders";
import { guestUser } from "../api/users";
import useAuth from "../hooks/useAuth";

const ProcessOrder = () => {
  const { cartItems, clearCart, getCartTotal } = useContext(CartContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const { auth, isLoggedIn } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  const handleInput = (event, setterFunction) => {
    setterFunction(event.target.value);
  };

  const handleSubmitOrder = async () => {
    let userId;

    if (isLoggedIn()) {
      userId = auth.userId;
    } else {
      const user = await guestUser(firstName, lastName, email);

      userId = user.user_id;
    }

    const cartTotal = await getCartTotal();

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${month}-${day}-${year}`;

    const userOrder = await createNewOrder({
      user_id: userId,
      order_date: currentDate,
      order_total: cartTotal,
    });

    for (const cartItem of cartItems) {
      if (
        cartItem.pizza_id ||
        cartItem.ordered_pizza_id ||
        cartItem.title === "Custom Pizza"
      ) {
        try {
          const orderedPizza = await addPizzaToOrder({
            order_id: userOrder.order_id,
            title: cartItem.title,
            pizza_price: cartItem.price,
            quantity: cartItem.quantity,
            crust: cartItem.crustId,
            sauce: cartItem.sauceId,
          });

          const pizzaId = orderedPizza.ordered_pizza_id;

          if (Array.isArray(cartItem.toppings)) {
            for (const topping of cartItem.toppings) {
              const toppingId =
                typeof topping === "object" ? topping.toppingId : topping;
              await attachToppingsToOrderedPizza({
                topping_id: toppingId,
                pizza_id: pizzaId,
              });
            }
          } else {
            // Assuming toppings is just an array of IDs
            await attachToppingsToOrderedPizza({
              topping_id: cartItem.toppings,
              pizza_id: pizzaId,
            });
          }
        } catch (error) {
          console.error(error);
        }
      } else if (cartItem.side_option_id) {
        await addSideToOrder({
          sideId: cartItem.side_option_id,
          orderId: userOrder.order_id,
          sidePrice: cartItem.price,
        });
      }
    }

    alert("Thank you for your order!");

    clearCart();
    navigate("/cart");
  };

  {
    isLoggedIn() ? console.log("registered user") : console.log("guest user");
  }

  return (
    <>
      <div className="bg-gray-500/50 fixed top-0 left-0 w-full h-screen">
        <div className="flex justify-center items-center py-24">
          <div className="mx-auto max-w-[450px] h-100 rounded-lg bg-gray-200">
            <div className="font-bold max-w-[320px] mx-auto py-6 px-3">
              {isLoggedIn() ? (
                <>
                  <div className="text-center mb-6">
                    <h1 className="text-xl">
                      Please confirm your information, and submit order
                    </h1>
                  </div>
                  <div>
                    <p>
                      Name: {auth.firstName} {auth.lastName}
                    </p>
                  </div>
                  <div>
                    <p>Email: {auth.email}</p>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="mb-2">
                    Please enter the following information to submit your order:
                  </h1>
                  <form className="text-center mb-6" onSubmit={handleSubmit}>
                    <input
                      className="p-1 mb-2 w-full"
                      type="text"
                      value={firstName}
                      onChange={(event) => handleInput(event, setFirstName)}
                      placeholder="First Name"
                      required
                    />

                    <input
                      className="p-1 mb-2 w-full"
                      type="text"
                      value={lastName}
                      onChange={(event) => handleInput(event, setLastName)}
                      placeholder="Last Name"
                      required
                    />

                    <input
                      className="p-1 w-full"
                      type="text"
                      value={email}
                      onChange={(event) => handleInput(event, setEmail)}
                      placeholder="Email"
                      required
                    />
                  </form>
                </>
              )}

              <div className="flex flex-col text-center mt-6">
                <div>
                  <button
                    className="w-1/4 mb-2 bg-blue-400 text-white font-bold px-0.5 py-1 mt-2 rounded-lg hover:bg-blue-600 hover:font-extrabold"
                    onClick={handleSubmitOrder}
                  >
                    Submit
                  </button>
                </div>

                <Link to={`/cart`} className="float-right hover:text-blue-600">
                  Return to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;
