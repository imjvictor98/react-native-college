import styled from 'styled-components/native';

const InputTextDisabled = styled.TextInput.attrs({
  editable: false,
})`
  font-size: 15px;
  width: 100%;
  background: #fff7;
  border-radius: 10px;
  padding-top: 15;
  padding-bottom: 15;
  padding-left: 25;
  border: 1px solid #e2e8eb;
  margin-bottom: 45px;
`;
export default InputTextDisabled;
