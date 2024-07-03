import { FC } from "react";
import DangerZone from "./DangerZone";
import { useRecoilState } from "recoil";
import { ProjectState } from "../../../ProjectState";

const DangerZoneWithData: FC = () => {
  const [{ project }] = useRecoilState(ProjectState);
  const onChangeVisibility = () => {};

  const onArchive = () => {};

  const onDelete = () => {};

  return (
    <DangerZone
      displayRepositorySection={import.meta.env.VITE_APP_API_URL?.includes(
        "api.fluentci.io"
      )}
      isPublic={project?.isPrivate !== true}
      onChangeVisibility={onChangeVisibility}
      onArchive={onArchive}
      onDelete={onDelete}
    />
  );
};

export default DangerZoneWithData;
