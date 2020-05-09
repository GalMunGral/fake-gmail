import styled from "styled-components";

const Checkbox = styled.input.attrs(() => ({
  type: "checkbox",
}))`
  --size: 1rem;
  flex: 0 0 auto;
  width: var(--size);
  height: var(--size);
  margin: calc(0.5 * var(--size));
  border: 2px solid var(--light-gray);
`;

export default Checkbox;
