export type LoginForm = {
  email: string;
  password: string;
};

export type RegistrationStep1Form = LoginForm & {
  confirmPassword: string;
};

export type RegistrationStep2Form = {
  name: string;
  phone: string;
  address: {
    city: string;
    county: string;
    detail: string;
    zipcode: string;
  };
  birthday: {
    year: string;
    month: string;
    day: string;
  },
  agreement: boolean;
};

export type RegisterForm = RegistrationStep1Form & RegistrationStep2Form;
