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

export type ConfirmDeleteProjectModalProps = {
  isOpen: boolean;
  close: () => void;
  onDelete: () => void;
  projectSlug: string;
};

const ConfirmDeleteProjectModal: FC<ConfirmDeleteProjectModalProps> = (
  props
) => {
  const { isOpen, close, onDelete, projectSlug } = props;

  return (
    <Modal onClose={close} isOpen={isOpen} overrides={styles.Modal}>
      <ModalHeader>
        <ModalTitle>Are you sure?</ModalTitle>
      </ModalHeader>
      <ModalBody style={{ fontFamily: "Lexend" }}>
        <div>
          This action cannot be undone. If you want to proceed, please type in
          the slug of this pipeline:{" "}
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
          onClick={() => onDelete()}
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
          Delete
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmDeleteProjectModal;
