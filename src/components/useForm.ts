import { useState } from "react";

type Fn = (...args: any) => any;

interface Props<T> {
  handleSubmitCallback: Fn;
  validateCallback: Fn;
  initialValues: T;
}

const useForm = <T extends {}>({
  handleSubmitCallback,
  validateCallback,
  initialValues,
}: Props<T>) => {
  const [form, setForm] = useState<T>(initialValues); //for holding initial form data
  const [errors, setErrors] = useState<any>({}); //for validtion errors
  const [success, setSuccess] = useState<Boolean>(false); //set to true if form was submitted successfully
  const [submitting, setSubmitting] = useState<Boolean>(false); //set to true when first submitting the form to disable the submit button
  //below is a function that creates a touched variable from hte initial values of a form, setting all fields to false (not touched)
  const setInitialTouched = (form: T) => {
    const touchedInitial = {};
    //if the initial values aren't populated than return an empty object.
    if (!form) return {};
    //create a new object using the keys of the form object setting alll values to false.
    Object.keys(form).forEach((value) => {
      touchedInitial[value] = false;
    });
    return touchedInitial;
  };
  const [touched, setTouched] = useState(setInitialTouched(form));
  const validate = () => {
    let e = validateCallback();
    setErrors(e);
    return e;
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((state: any) => {
      return { ...state, [name]: value };
    });
  };
  const handleBlur = (e: any) => {
    const { name } = e.target;
    setTouched((c: any) => {
      return { ...c, [name]: true };
    });
    validate();
  };
  const handleSubmit = async () => {
    setSubmitting(true);
    //set all fields to touched
    const touchedTrue = {};
    Object.keys(form).forEach((value) => {
      touchedTrue[value] = true;
    });
    setTouched(touchedTrue);
    // e.preventDefault();
    const err = validate();

    if (Object.keys(err).length === 0) {
      //if there are no errors, set submitting=false and submit form.
      setSubmitting(false);
      console.log("no errors.");
      setSuccess(await handleSubmitCallback());
    } else {
      setSubmitting(false);
      setSuccess(false);
    }
  };
  const handleReset = () => setForm(initialValues);
  return {
    handleChange,
    handleBlur,
    handleSubmit,
    setForm,
    handleReset,
    form,
    errors,
    touched,
    submitting,
    success,
  };
};
export default useForm;
