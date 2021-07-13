import { useForm, SubmitHandler, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";

// Styling
import "../styling/Form.css";

// Data
import USER from "../data/UserData";

// Types
type Inputs = {
  cardNumber: number;
  cvc: number;
  expiry: number;
};

const Form = () => {
  const firstName = USER[0].firstName;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  // If data validated post to console
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  // Creates limit for expire input, Month should be no greater than 12,
  // year restricted to 2 digits
  const limit = (val: string, max: string) => {
    if (val.length === 1 && val[0] > max[0]) {
      val = "0" + val;
    }

    if (val.length === 2) {
      if (Number(val) === 0) {
        val = "01";

        //this can happen when the user pastes a number
      } else if (val > max) {
        val = max;
      }
    }

    return val;
  };

  // Adds limit to form, function will create the format for input
  const cardExpiry = (val: string) => {
    let month = limit(val.substring(0, 2), "12");
    let year = val.substring(2, 4);

    return month + (year.length ? "/" + year : "");
  };

  return (
    <div className="formTopDiv">
      <div className="title">
        <h1>Welcome {firstName}</h1>
      </div>
      <form className="formDiv" onSubmit={handleSubmit(onSubmit)}>
        <section className="formInput">
          <label className="formLabel">Credit Card Details</label>
          <Controller
            control={control}
            name="cardNumber"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <NumberFormat
                onChange={onChange}
                value={value}
                format="#### #### #### ####"
              />
            )}
          />
          {errors.cardNumber && errors.cardNumber.type === "required" && (
            <div className="formError">This is required</div>
          )}
        </section>

        <section className="formInput">
          <label>CVC</label>
          <Controller
            control={control}
            name="cvc"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <NumberFormat onChange={onChange} value={value} format="###" />
            )}
          />
          {errors.cvc && errors.cvc.type === "required" && (
            <div className="formError">This is required</div>
          )}
        </section>

        <section className="formInput">
          <label>Expiry Date</label>
          <Controller
            control={control}
            name="expiry"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <NumberFormat
                onChange={onChange}
                value={value}
                format={cardExpiry}
                placeholder="MM/YY"
                mask={["M", "M", "Y", "Y"]}
              />
            )}
          />
          {errors.expiry && errors.expiry.type === "required" && (
            <div className="formError">This is required</div>
          )}
        </section>
        <input className="formSubmit" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Form;
