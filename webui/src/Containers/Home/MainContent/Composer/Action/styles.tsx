import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Animated = styled.div`
  -webkit-animation: zoom-in-zoom-out 500ms; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: zoom-in-zoom-out 500ms; /* Firefox < 16 */
  -ms-animation: zoom-in-zoom-out 500ms; /* Internet Explorer */
  -o-animation: zoom-in-zoom-out 500ms; /* Opera < 12.1 */
  animation: zoom-in-zoom-out 500ms;

  @keyframes zoom-in-zoom-out {
    0% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1.5, 1.5);
    }
    100% {
      transform: scale(1, 1);
    }
  }
`;

export const Container = styled(Animated)<{ active?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  padding: 10px;
  border: 1px solid #5324ffa3;
  height: 78px;
  box-shadow: 2px 4px #5324ff20;
  padding-left: 18px;
  padding-right: 18px;
  cursor: pointer;
  ${(props) =>
    !props.active &&
    css`
      opacity: 0.5;
    `}
`;

export const ActionName = styled.div`
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PopoverButton = styled.button`
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: initial;
  border: none;
  color: #fff;
`;

export const Popover = styled.div`
  background-color: #0f0124;
  color: #fff;
`;
