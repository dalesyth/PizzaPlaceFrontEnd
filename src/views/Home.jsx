import OrderButton from "../components/OrderButton";
import pizzaImage from "../assets/pexels-arthur-brognoli-3343622.jpg";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();

  // console.log("auth from Home: ", auth)
  // console.log("auth.firstName from Home: ", auth.firstName)

  return (
    <>
      <div className="container">
        <div className="flex justify-center pb-6">
          <OrderButton />
        </div>
        {/* {console.log("auth from home: ", auth)} */}
        {auth?.token ? (
          <h1 className="flex justify-center text-3xl font-bold mb-4 lg:mb-6">
            Welcome to The Pizza Place, {auth?.firstName}!
          </h1>
        ) : (
          <h1 className="flex justify-center text-3xl font-bold mb-4 lg:mb-6">
            Welcome to The Pizza Place!
          </h1>
        )}
        
        <img src={pizzaImage} alt="Pizza" />
        <div className="flex mt-4 lg:mt-8 lg:text-xl">
          <p>
            We bring you amazing wood-fired oven pizza, with only the highest
            quality ingredients. With our fresh meats, vegetables, sauces, and
            crusts, we know you will love your dining experience!
          </p>
        </div>
      </div>
    </>
  );
}

export default Home