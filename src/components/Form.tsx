import React, { FC } from 'react';
interface FormComponentProps {
  loading: boolean;
  submit: () => any;
}

const Form: FC<FormComponentProps> = ({ children, submit, loading }) => {
  return (
    <form className="form__container form-group mt-5" onSubmit={submit}>
      {children}
      <div className="w-100 text-center">
        <button
          className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
          disabled={loading}
        >
          {loading && (
            <svg
              className="animate-spin ml-1 mr-3 h-5 w-5 text-white inline-block"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default Form;
