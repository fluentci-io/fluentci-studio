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
  color: #5b00f9;
  background-color: #5b00f938;
  padding: 5px;
  border-radius: 5px;
  &:hover {
    border: 1px solid #5d00ff;
  }
`;

export const Title = styled.div`
  flex: 1;
`;

export const Duration = styled.div`
  font-size: 13px;
  color: #ffffffb8;
`;
