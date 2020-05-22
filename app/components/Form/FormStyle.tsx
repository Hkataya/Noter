import styled from 'styled-components';

const WrapperForm = styled.form.attrs({
  className: 'w-full max-w'
})``;

const FormInput = styled.input.attrs({
  className:
    'mt-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
})``;

const FormLabel = styled.span.attrs({
  className: 'text-gray-500 font-bold'
})``;

const FormButton = styled.button.attrs({
  className:
    'shadow bg-purple-500 hover:bg-purple-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
})``;

export { WrapperForm, FormInput, FormLabel, FormButton };
