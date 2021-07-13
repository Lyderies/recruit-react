import { useForm, SubmitHandler, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";

// Styling
import "../styling/Form.css";

// Types
type Inputs = {
  cardNumber: number;
  cvc: number;
  expiry: number;
};

const Form = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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

  const cardExpiry = (val: string) => {
    let month = limit(val.substring(0, 2), "12");
    let year = val.substring(2, 4);

    return month + (year.length ? "/" + year : "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="formInput">
        <label>Credit Card Details</label>
        <Controller
          control={control}
          name="cardNumber"
          rules={{
            required: true,
            min: 16,
          }}
          render={({ field: { onChange, value } }) => (
            <NumberFormat
              onChange={onChange}
              value={value}
              format="#### #### #### ####"
            />
          )}
        />
        {errors.cardNumber && errors.cardNumber.type === "min" && (
          <div className="formError">Please put in a correct card number</div>
        )}
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
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Form;
