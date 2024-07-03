import { FC } from "react";
import { Title, Text, Label, Section, Row, DeleteButton } from "../styles";

export type DangerZoneProps = {
  displayRepositorySection: boolean;
  isPublic: boolean;
  onChangeVisibility: () => void;
  onArchive: () => void;
  onDelete: () => void;
};

const DangerZone: FC<DangerZoneProps> = (props) => {
  const { displayRepositorySection, isPublic } = props;
  return (
    <>
      <Section style={{ marginTop: 42 }}>
        <Title>Danger Zone</Title>
        <div
          style={{
            marginTop: 20,
          }}
        >
          {displayRepositorySection && (
            <Section>
              <Row>
                <div style={{ flex: 1 }}>
                  <Label style={{ marginBottom: 4 }}>
                    Change project visibility
                  </Label>
                  <Text>
                    This project is currently {isPublic ? "public" : "private"}
                  </Text>
                </div>
                <DeleteButton>
                  {isPublic ? "Make Pipeline Private" : "Make Pipeline Public"}
                </DeleteButton>
              </Row>
            </Section>
          )}
          <Section>
            <Row>
              <div style={{ flex: 1 }}>
                <Label style={{ marginBottom: 4 }}>Archive this project</Label>
                <Text>
                  Mark this project as archived and read-only. Runs, run logs,
                  and artifacts are preserved.
                </Text>
              </div>
              <DeleteButton>Archive Pipeline</DeleteButton>
            </Row>
          </Section>
          <Section>
            <Row>
              <div style={{ flex: 1 }}>
                <Label style={{ marginBottom: 4 }}>Delete this project</Label>
                <Text>
                  Deleting this pipeline will also delete all associated runs,
                  run logs, artifacts, and history.
                </Text>
              </div>
              <DeleteButton>Delete Pipeline</DeleteButton>
            </Row>
          </Section>
        </div>
      </Section>
    </>
  );
};

export default DangerZone;
