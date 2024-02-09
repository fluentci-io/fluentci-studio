import { FC } from "react";
import styled from "@emotion/styled";
import "@fontsource/inconsolata";

const Line = styled.div`
  line-height: 20px;
  color: #d5dbe2;
`;

const LineNumber = styled.span`
  min-width: 50px;
  text-align: right;
  padding-right: 10px;
  color: #a8adb3;
`;

const Row = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: row;
  font-family: "Inconsolata", monospace;
  color: #d5dbe2;
  &:hover {
    background-color: #160231;
  }
`;

export type LogsViewerProps = {
  logs: string[];
};

const LogsViewer: FC<LogsViewerProps> = (props) => {
  const { logs } = props;
  return (
    <div>
      {logs.map((log, index) => (
        <Row>
          <LineNumber>{index + 1}</LineNumber>
          <Line key={index}>{log}</Line>
        </Row>
      ))}
    </div>
  );
};

export default LogsViewer;
