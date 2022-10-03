interface Rule {
  required: string;
}

interface FormDataType {
  id: string;
  name: string;
  placeholder: string;
  type: string;
  rules: Rule;
}

const formData: FormDataType[] = [
  {
    id: 'code',
    name: 'code',
    placeholder: 'Mã code',
    type: 'text',
    rules: {
      required: 'Vui lòng nhập mã code',
    },
  },
];

export default formData;
