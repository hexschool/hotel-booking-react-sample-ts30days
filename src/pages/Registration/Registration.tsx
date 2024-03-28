import './Registration.scss';

import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { LoginLayout } from '@components';
import { RegisterForm, RegistrationStep1Form, RegistrationStep2Form, User } from '@types';
import { signup } from '../../apis/index.ts';
import { GlobalContext } from '@core';

import Step1Form from './Step1Form.tsx';
import Step2Form from './Step2Form.tsx';

const Registration = () => {
  const [ step, setStep ] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [ formData, setFormData ] = useState<RegisterForm>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    birthday: {
      year: '2000',
      month: '1',
      day: '1'
    },
    address: {
      city: '臺北市',
      county: '中正區',
      zipcode: '100',
      detail: ''
    },
    agreement: false
  });

  const nextStep = (step1Data: RegistrationStep1Form) => {
    setStep(step + 1);
    setFormData({ ...formData, ...step1Data });
  };

  const { dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const submit = (step2Data: RegistrationStep2Form) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: RegisterForm = { ...formData, ...step2Data };
    setFormData(data);

    const params: User = {
      ...data,
      birthday: `${ data.birthday.year }/${ data.birthday.month }/${ data.birthday.day }`
    };

    signup(params).then((res) => {
      dispatch({ type: 'SET_USER', payload: res });
      navigate('/');
    }).catch((err: Error) => {
      dispatch({
        type: 'SET_DIALOG',
        payload: {
          display: true,
          content: err.message,
          title: '註冊失敗',
          showReject: false,
          autoFocus: 'accept'
        }
      });
    });
  };

  return (
    <LoginLayout>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */ }
      <div className="register-container">
        <div className="field">
          <p className="title">享樂酒店，誠摯歡迎</p>
          <h1>立即註冊</h1>
        </div>
        <div className="stepper-container flex field">
          <div className={ step === 1 ? 'step active' : 'step' }>
            <div className="number title">1</div>
            <p className="title">輸入信箱及密碼</p>
          </div>
          <div className="divide"></div>
          <div className={ step === 2 ? 'step active' : 'step' }>
            <div className="number title">2</div>
            <p className="title">填寫基本資料</p>
          </div>
        </div>

        { step === 1 && (
          <Step1Form defaultValues={ formData } nextStep={ nextStep } />
        ) }

        { step === 2 && (
          <Step2Form defaultValues={ formData } submit={ submit } />
        ) }

        <div className="body">已經有會員了嗎？ <Link className="title" to="/login">立即登入</Link></div>
      </div>
    </LoginLayout>
  );
};

export default Registration;
