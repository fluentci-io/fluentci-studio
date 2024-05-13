import { FC } from "react";
import Run from "./Run";
import { useParams } from "react-router-dom";
import { useGetRunQuery } from "../../Hooks/GraphQL";
import { useFormat } from "../../Hooks/useFormat";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const RunWithData: FC = () => {
  const { id } = useParams();
  const { formatDuration } = useFormat();
  const { data } = useGetRunQuery({
    variables: {
      id: id!,
    },
  });
  console.log(">> data", data);
  const actions =
    data?.getRun?.jobs?.map((x) => ({
      id: x.id,
      name: x.name,
      status: x.status as "RUNNING" | "SUCCESS" | "FAILURE" | "PENDING",
      duration: x.duration ? formatDuration(dayjs.duration(x.duration)) : "",
      logs: x.logs?.map((y) => y.message.split("\n")).flat(),
    })) || [];
  return <Run actions={actions} />;
};

export default RunWithData;
