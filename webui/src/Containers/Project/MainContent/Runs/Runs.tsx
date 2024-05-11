import { FC } from "react";
import Placeholder from "./Placeholder";
import { Run } from "../../../../Hooks/GraphQL";
import { RunItem, Branch, Title, Duration } from "./styles";
import { Link } from "react-router-dom";
import { CheckCircle } from "@styled-icons/boxicons-solid";
import { GitBranch } from "@styled-icons/boxicons-regular";

export type RunsProps = {
  data: Run[];
};

const Runs: FC<RunsProps> = (props) => {
  const { data } = props;
  return (
    <>
      {data.length === 0 && <Placeholder />}
      {data.length > 0 && (
        <div>
          {data.map((item) => (
            <Link to={`/run/${item.id}`} key={item.id}>
              <RunItem>
                <div style={{ marginRight: 15 }}>
                  <CheckCircle size={"24px"} color="#24ffa0" />
                </div>
                <div style={{ minWidth: 54 }}>{item.name}</div>
                <Title>{item.title}</Title>
                <div style={{ marginLeft: 15, flex: 1 }}>
                  <Branch>
                    <GitBranch
                      size={15}
                      color="#5d00ff"
                      style={{ marginRight: 5 }}
                    />
                    main
                  </Branch>
                </div>
                <Duration>{item.duration}s</Duration>
              </RunItem>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Runs;
