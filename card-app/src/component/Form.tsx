import { useForm, SubmitHandler, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";

// Styling
import "../styling/Form.css";

type Inputs = {
  cardNumber: number;
  cvc: number;
  expiry: number;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      cardNumber: 1234567891234567,
      cvc: 123,
      expiry: 0o12021,
    },
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <section>
        <input
          className="formInput cardName"
          aria-invalid={errors.cardNumber ? "true" : "false"}
          {...register("cardNumber", {
            required: true,
            minLength: 16,
            maxLength: 16,
          })}
        />
        {errors.cardNumber && (
          <span className="formError">This field is required</span>
        )}
        {errors.cardNumber &&
          errors.cardNumber.type === "minLength" &&
          "maxLength" && (
            <span className="formError">
              Please put in a correct card number
            </span>
          )}
      </section> */}
      <section>
        <label>Credit Card Details</label>
        <Controller
          control={control}
          name="cardNumber"
          render={({ field: { value } }) => (
            <NumberFormat value={value} format="#### #### #### ####" />
          )}
        />
      </section>
      <section>
        <input
          className="formInput cvc"
          aria-invalid={errors.cvc ? "true" : "false"}
          {...register("cvc", { required: true, minLength: 3, maxLength: 3 })}
        />

        {errors.cvc && (
          <span className="formError">This field is required</span>
        )}
        {errors.cvc && errors.cvc.type === "minLength" && "maxLength" && (
          <span className="formError">Please put in the correct cvc</span>
        )}
      </section>

      <section>
        <input
          className="formInput expiry"
          {...register("expiry", { required: true })}
        />

        {errors.expiry && (
          <span className="formError">This field is required</span>
        )}

        <input type="submit" />
      </section>
    </form>
  );
};

export default Form;
