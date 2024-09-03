import { Modal as AntdModal } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import { CommonComponentProps } from "../../interface";

export interface ModalRef {
  open: () => void;
  close: () => void;
}

// 使用 Omit 移除 CommonComponentProps 中的 'ref' 属性，因为 ref 是通过 forwardRef 传递的
const Modal: React.ForwardRefRenderFunction<
  ModalRef,
  Omit<CommonComponentProps, "ref">
> = (props, ref) => {
  const { children, title, onOk, onCancel, styles, ...restProps } = props;

  const [open, setOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        setOpen(true);
      },
      close: () => {
        setOpen(false);
      },
    }),
    []
  );

  return (
    <AntdModal
      title={title}
      style={styles}
      visible={open}
      onCancel={() => {
        onCancel && onCancel();
        setOpen(false);
      }}
      onOk={() => {
        onOk && onOk();
        setOpen(false); // 可能需要根据你的需求调整这里是否关闭模态框
      }}
      destroyOnClose
      {...restProps} // 传递剩余属性，但避免传递 ref
    >
      {children}
    </AntdModal>
  );
};

export default forwardRef(Modal);
