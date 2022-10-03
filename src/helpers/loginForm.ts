interface Pattern {
  value: RegExp;
  message: string;
}

interface Rule {
  required: string;
  pattern?: Pattern;
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
    },
  },
];

export default formData;
