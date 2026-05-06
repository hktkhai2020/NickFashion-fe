import { Modal } from "antd";

const ConfirmDeleteItem = ({
  isOpen,
  setIsOpen,
  handleRemoveItem,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleRemoveItem: () => void;
}) => {
  return (
    <Modal
      width={400}
      centered
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={
        <>
          <div className="w-full  flex gap-[20px]!">
            <div
              className="w-1/2 flex justify-center items-center text-[#333f48]! font-bold text-[16px]! border border-[#333f48]! py-[12px]! rounded-md! cursor-pointer "
              onClick={() => setIsOpen(false)}
            >
              Hủy
            </div>
            <div
              className="w-1/2 flex justify-center items-center text-white! font-bold text-[16px]! bg-[#d80c0c]! py-[12px]! rounded-md! cursor-pointer "
              onClick={()=>{
                setIsOpen(false);
                handleRemoveItem();
              }}
            >
              Đồng ý
            </div>
          </div>
        </>
      }
      onOk={handleRemoveItem}
    >
      <div className="w-full flex flex-col items-center justify-center  py-[50px]!">
        <p className="text-[#74869b]!  text-[17px]!  text-center">
          Bạn có chắc chắn muốn xóa sản phẩm này không?
        </p>
      </div>
    </Modal>
  );
};
export default ConfirmDeleteItem;
