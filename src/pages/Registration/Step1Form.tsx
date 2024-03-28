import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { RegistrationStep1Form } from '@types';
import { REGISTRATION_STEP1_SCHEMA } from '@constants';

type Step1FormProps = {
  nextStep: (data: RegistrationStep1Form) => void;
  defaultValues?: RegistrationStep1Form;
}

const Step1Form = ({ nextStep, defaultValues }: Step1FormProps) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<RegistrationStep1Form>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    resolver: yupResolver(REGISTRATION_STEP1_SCHEMA),
    mode: 'onChange',
    defaultValues
  });

  const OnSubmit: SubmitHandler<RegistrationStep1Form> = (data) => {
    nextStep(data);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={ handleSubmit(OnSubmit) }>
      <div className="input">
        <label className="title">電子郵件</label>
        <input
          { ...register('email') }
          type="email"
          placeholder="hello@exsample.com"
          className="body"
        />
        <p className="tiny error">{ errors.email?.message }</p>
      </div>
      <div className="input">
        <label className="title">密碼</label>
        <input
          { ...register('password') }
          type="password"
          placeholder="請輸入密碼"
          className="body"
        />
        <p className="tiny error">{ errors.password?.message }</p>
      </div>
      <div className="input">
        <label className="title">確認密碼</label>
        <input
          { ...register('confirmPassword') }
          type="password"
          placeholder="請再輸入一次密碼"
          className="body"
        />
        <p className="tiny error">{ errors.confirmPassword?.message }</p>
      </div>

      <div className="next-button">
        <button
          type="submit"
          className="button-like"
          disabled={ !isValid }
        >下一步</button>
      </div>
    </form>
  );
};

export default Step1Form;
