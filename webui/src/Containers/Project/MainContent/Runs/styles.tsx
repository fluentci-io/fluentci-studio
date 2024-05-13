import styled from "@emotion/styled";

export const RunItem = styled.div`
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 80px;
  cursor: pointer;
  border-bottom: 1px solid #1b0657;
`;

export const Branch = styled.span`
  font-size: 14px;
  color: #00e3f9;
  background-color: #00e3f92e;
  padding: 5px;
  border-radius: 5px;
  &:hover {
    border: 1px solid #00e3f9;
  }
`;

export const Title = styled.div`
  flex: 1;
  color: #ffffffbf;
  font-size: 15px;
`;

export const Duration = styled.div`
  font-size: 13px;
  color: #ffffffb8;
`;
