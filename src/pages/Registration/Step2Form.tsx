import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  AREA_OPTIONS,
  CITY_OPTIONS,
  getDayOptions,
  getMonthOptions,
  getYearOptions,
  REGISTRATION_STEP2_SCHEMA
} from '@constants';

import { RegistrationStep2Form } from '@types';

type Step2FormProps = {
  submit: (data: RegistrationStep2Form) => void;
  defaultValues?: RegistrationStep2Form;
}

const Step2Form = ({ submit, defaultValues }: Step2FormProps) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    setValue
  } = useForm<RegistrationStep2Form>({
    resolver: yupResolver(REGISTRATION_STEP2_SCHEMA),
    mode: 'onChange',
    defaultValues
  });

  const [ city ] = watch([ 'address.city' ]);
  const [ county ] = watch([ 'address.county' ]);

  useEffect(() => {
    setValue('address.county', AREA_OPTIONS[city][0].value);
  }, [ city ]);

  useEffect(() => {
    const areaOption = AREA_OPTIONS[city].find((option) => option.value === county);
    if ( areaOption ) {
      setValue('address.zipcode', areaOption.zipcode);
    }
  }, [ county ]);

  const yearOptions = getYearOptions();
  const monthOptions = getMonthOptions();
  const [ dayOptions, setDayOptions ] = useState<string[]>([]);

  const [ year ] = watch([ 'birthday.year' ]);
  const [ month ] = watch([ 'birthday.month' ]);
  const [ day ] = watch([ 'birthday.day' ]);

  useEffect(() => {
    const options = getDayOptions(year, month);
    setDayOptions(options);
    if ( !options.includes(day) ) {
      setValue('birthday.day', options[options.length - 1]);
    }
  }, [ year, month ]);

  const onSubmit = (data: RegistrationStep2Form) => {
    submit(data);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={ handleSubmit(onSubmit) }>
      <div className="input">
        <label className="title">姓名</label>
        <input
          { ...register('name') }
          type="text"
          placeholder="請輸入姓名"
          className="body"
        />
        <p className="tiny error">{ errors.name?.message }</p>
      </div>
      <div className="input">
        <label className="title">手機號碼</label>
        <input
          { ...register('phone') }
          type="phone"
          placeholder="請輸入手機號碼"
          className="body"
        />
        <p className="tiny error">{ errors.phone?.message }</p>
      </div>
      <div className="input">
        <label className="title">生日</label>
        <div className="flex">
          <div className="select-container">
            <select className="body" { ...register('birthday.year') }>
              { yearOptions.map((option, index) => (
                <option key={ index } value={ option }>{ option } 年</option>
              )) }
            </select>
          </div>
            <div className="select-container">
            <select className="body" { ...register('birthday.month') }>
              { monthOptions.map((option, index) => (
                <option key={ index } value={ option }>{ option } 月</option>
              )) }
            </select>
          </div>
            <div className="select-container">
            <select className="body" { ...register('birthday.day') }>
              { dayOptions.map((option, index) => (
                <option key={ index } value={ option }>{ option } 日</option>
              )) }
            </select>
          </div>
        </div>
      </div>
      <div className="input">
        <label className="title">地址</label>
        <div className="flex">
            <div className="select-container">
            <select className="body" { ...register('address.city') }>
              {
                CITY_OPTIONS.map((option, index) => (
                  <option key={ index } value={ option.value }>{ option.label }</option>
                ))
              }
            </select>
          </div>
            <div className="select-container">
            <select className="body" { ...register('address.county') }>
              {
                AREA_OPTIONS[city].map((option, index) => (
                  <option key={ index } value={ option.value }>{ option.label }</option>
                ))
              }
            </select>
          </div>
          <input type="hidden" { ...register('address.zipcode') } />
        </div>
        <input
          { ...register('address.detail') }
          type="text"
          placeholder="請輸入詳細地址"
          className="body"
        />
        <p className="tiny error">{ errors.address?.detail?.message }</p>
      </div>
      <div className="flex field">
        <div>
          <input type="checkbox" id="agree" { ...register('agreement') } />
          <label htmlFor="agree">我已閱讀並同意本網站個資使用規範</label>
        </div>
        <p className="tiny error">{ errors.agreement?.message }</p>
      </div>
      <div>
        <button
          type="submit"
          className="button-like"
          disabled={ !isValid }
        >完成註冊</button>
      </div>
    </form>
  );
};

export default Step2Form;
