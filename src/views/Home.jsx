import OrderButton from "../components/OrderButton";

const Home = () => {
  return (
    <>
      <div className="container">
        <div className="flex justify-center pb-6">
          <OrderButton />
        </div>
        <h1 className="flex justify-center text-3xl font-bold">Welcome to The Pizza Place!</h1>

      </div>
    </>
  );
}

export default Home