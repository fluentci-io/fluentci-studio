import { FC } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "baseui/modal";
import { SIZE } from "baseui/button";
import styles, { ModalTitle } from "./styles";
import { Input } from "baseui/input";

export type ConfirmArchiveProjectModalProps = {
  isOpen: boolean;
  close: () => void;
  onArchive: () => void;
  projectSlug: string;
  isArchived: boolean;
};

const ConfirmArchiveProjectModal: FC<ConfirmArchiveProjectModalProps> = (
  props
) => {
  const { isOpen, close, onArchive, projectSlug, isArchived } = props;

  return (
    <Modal onClose={close} isOpen={isOpen} overrides={styles.Modal}>
      <ModalHeader>
        <ModalTitle>Are you sure?</ModalTitle>
      </ModalHeader>
      <ModalBody style={{ fontFamily: "Lexend" }}>
        <div>
          If you want to proceed, please type in the slug of this pipeline:{" "}
          <span style={{ fontWeight: 600, color: "#fff" }}>{projectSlug}</span>
        </div>
        <Input size="mini" overrides={styles.Input} />
      </ModalBody>
      <ModalFooter>
        <ModalButton
          kind="tertiary"
          onClick={close}
          size={SIZE.compact}
          style={{ fontFamily: "Lexend", backgroundColor: "initial" }}
        >
          Cancel
        </ModalButton>
        <ModalButton
          onClick={() => onArchive()}
          size={SIZE.compact}
          overrides={{
            BaseButton: {
              style: {
                fontFamily: "Lexend",
                backgroundColor: "#FF0000",
                ":hover": {
                  backgroundColor: "#FF0000",
                },
              },
            },
          }}
        >
          {isArchived ? "Unarchive" : "Archive"}
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmArchiveProjectModal;
