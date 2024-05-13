import { FC } from "react";
import Placeholder from "./Placeholder";
import { Run } from "../../../../Hooks/GraphQL";
import { RunItem, Branch, Title, Duration } from "./styles";
import { Link } from "react-router-dom";
import { CheckCircle } from "@styled-icons/boxicons-solid";
import { GitBranch } from "@styled-icons/boxicons-regular";
import { Spinner } from "baseui/spinner";
import { CloseCircle } from "@styled-icons/ionicons-sharp";
import { useFormat } from "../../../../Hooks/useFormat";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export type RunsProps = {
  data: Run[];
};

const Runs: FC<RunsProps> = (props) => {
  const { data } = props;
  const { formatDuration } = useFormat();
  return (
    <>
      {data.length === 0 && <Placeholder />}
      {data.length > 0 && (
        <div>
          {data.map((item) => (
            <Link to={`/run/${item.id}`} key={item.id}>
              <RunItem>
                {!item.status && (
                  <div style={{ marginRight: 15, width: 15, height: 15 }}></div>
                )}
                {item.status === "RUNNING" && (
                  <Spinner
                    $size={"15px"}
                    $borderWidth={"3px"}
                    style={{
                      borderRightColor: "#ffffff22",
                      borderLeftColor: "#ffffff22",
                      borderTopColor: "#ffffff22",
                      borderBottomColor: "#24ffd7",
                      marginRight: 15,
                    }}
                  />
                )}
                {item.status === "SUCCESS" && (
                  <div style={{ marginRight: 15 }}>
                    <CheckCircle size={"24px"} color="#24ffa0" />
                  </div>
                )}
                {item.status === "FAILURE" && (
                  <div style={{ marginRight: 15 }}>
                    <CloseCircle size={"24px"} color="#ff246d" />
                  </div>
                )}
                <div style={{ minWidth: 54, marginRight: 10 }}>
                  {item.name}:
                </div>
                <Title>{item.title}</Title>
                <div style={{ marginLeft: 15, flex: 1 }}>
                  {item.branch && (
                    <Branch>
                      <GitBranch
                        size={15}
                        color="#00e3f9"
                        style={{ marginRight: 5 }}
                      />
                      {item.branch}
                    </Branch>
                  )}
                </div>
                <Duration>
                  {item.duration
                    ? formatDuration(dayjs.duration(item.duration))
                    : ""}
                </Duration>
              </RunItem>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Runs;
