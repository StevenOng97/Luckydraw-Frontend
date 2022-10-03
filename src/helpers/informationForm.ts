interface Pattern {
  value: RegExp;
  message: string;
}

interface Minlength {
  value: number;
  message: string;
}

interface Rule {
  required: string;
  pattern?: Pattern;
  minLength?: Minlength;
}

interface FormDataType {
  id: string;
  name: string;
  placeholder: string;
  type: string;
  rules: Rule;
}

const emailPattern: Pattern = {
  value: new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$', 'ig'),
  message: 'Sai định dạng email',
};

const formData: FormDataType[] = [
  {
    id: 'username',
    name: 'username',
    placeholder: 'Họ tên',
    type: 'text',
    rules: {
      required: 'Hãy nhập họ tên',
    },
  },
  {
    id: 'email',
    name: 'email',
    placeholder: 'Email',
    type: 'text',
    rules: {
      required: 'Hãy nhập email',
      pattern: emailPattern,
    },
  },
  {
    id: 'password',
    name: 'password',
    placeholder: 'Mật khẩu',
    type: 'password',
    rules: {
      required: 'Hãy nhập mật khẩu',
      minLength: {
        value: 8,
        message: 'Mật khẩu chứa ít nhất 8 kí tự',
      },
    },
  },
  {
    id: 'phone',
    name: 'phone',
    placeholder: 'Số diện thoại',
    type: 'phone',
    rules: {
      required: 'Hãy nhập số điện thoại',
      minLength: {
        value: 14,
        message: 'Sai số điện thoại',
      },
    },
  },
];

export default formData;
