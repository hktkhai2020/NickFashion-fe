import { PlusOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Form,
  Image,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Switch,
  Upload,
} from "antd";
import type { UploadFile } from "antd";
import { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import { ActionType } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import variantService from "@/services/variantService";
import uploadService from "@/services/uploadService";
import productService from "@/services/productService";
import colorService from "@/services/colorService";
import sizeService from "@/services/sizeService";
import { Product } from "@/types/product";
import { Color } from "@/types/color";
import { Size } from "@/types/size";
import { VariantFormValues } from "@/types/variant";
import { Variant } from "@/types/product";

const UpdateVariant = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  actionRef: React.RefObject<ActionType | null>;
  variant: Variant;
}) => {
  const { isOpen, setIsOpen, actionRef, variant } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileListImages, setFileListImages] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (isOpen) {
      const fetchRefs = async () => {
        try {
          const [prodRes, colorRes, sizeRes] = await Promise.all([
            productService.getProducts({ pageSize: 100 }),
            colorService.getColors({ pageSize: 100 }),
            sizeService.getSizes({ pageSize: 100 }),
          ]);
          if (prodRes.success) setProducts(prodRes.data);
          if (colorRes.success) setColors(colorRes.data);
          if (sizeRes.success) setSizes(sizeRes.data);
        } catch (e) {
          console.error(e);
        }
      };
      fetchRefs();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && variant) {
      const imageFiles: UploadFile[] = (variant.images || []).map(
        (url: string, index: number) => ({
          uid: `img-${variant._id}-${index}`,
          name: url,
          fileName: url,
          status: "done" as const,
          url: url,
        }),
      );

      queueMicrotask(() => {
        setFileListImages(imageFiles);
        form.setFieldsValue({
          productId:
            typeof variant.productId === "object"
              ? (variant.productId as { _id: string })._id
              : variant.productId,
          color:
            typeof variant.color === "object"
              ? (variant.color as { _id: string })._id
              : variant.color,
          size:
            typeof variant.size === "object"
              ? (variant.size as { _id: string })._id
              : variant.size,
          stock: variant.stock,
          isActive: variant.isActive,
          images: imageFiles,
        });
      });
    }
  }, [isOpen, variant, form]);

  useEffect(() => {
    if (!isOpen) {
      const imageFiles = form.getFieldValue("images");
      if (Array.isArray(imageFiles)) {
        imageFiles.forEach((file: UploadFile) => {
          if (file?.thumbUrl?.startsWith("blob:"))
            URL.revokeObjectURL(file.thumbUrl);
          if (file?.url?.startsWith("blob:")) URL.revokeObjectURL(file.url);
        });
      }
    }
    return () => {
      const imageFiles = form.getFieldValue("images");
      if (Array.isArray(imageFiles)) {
        imageFiles.forEach((file: UploadFile) => {
          if (file?.thumbUrl?.startsWith("blob:"))
            URL.revokeObjectURL(file.thumbUrl);
          if (file?.url?.startsWith("blob:")) URL.revokeObjectURL(file.url);
        });
      }
    };
  }, [isOpen, form]);

  const validateFile = (file: File): boolean => {
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    if (!file.type.startsWith("image/")) {
      message.error("Chỉ chấp nhận file ảnh (JPG, PNG, GIF, WEBP)");
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      message.error("Kích thước file phải nhỏ hơn 10MB");
      return false;
    }
    return true;
  };

  const beforeUpload = (file: File) => {
    if (!validateFile(file)) return Upload.LIST_IGNORE;
    return true;
  };

  const onRemove = (file: UploadFile) => {
    if (file.thumbUrl?.startsWith("blob:")) URL.revokeObjectURL(file.thumbUrl);
    if (file.url?.startsWith("blob:")) URL.revokeObjectURL(file.url);
    const newImages = fileListImages.filter((x) => x.uid !== file.uid);
    setFileListImages(newImages);
    form.setFieldsValue({ images: newImages });
  };

  const handleUploadFile = async (option: RcCustomRequestOptions) => {
    const { onSuccess, onError, file } = option;
    try {
      const fileToUpload = (file as UploadFile).originFileObj || (file as File);
      const res = await uploadService.uploadSingle(
        fileToUpload as File,
        "slides",
      );

      if (res.success && res.data.url) {
        const uploadFile: UploadFile = {
          uid: (file as UploadFile).uid,
          name: res.data.key,
          fileName: res.data.url,
          status: "done",
          url: res.data.url,
        };

        setFileListImages((prev) => {
          const updated = [...prev, uploadFile];
          form.setFieldsValue({ images: updated });
          return updated;
        });

        onSuccess?.(res);
        message.success("Upload ảnh thành công!");
      } else {
        throw new Error("Upload thất bại: phản hồi không hợp lệ");
      }
    } catch (err) {
      onError?.(err as Error);
      message.error((err as Error)?.message || "Upload ảnh thất bại");
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url || file.thumbUrl;
    if (!src && file.originFileObj) {
      src = URL.createObjectURL(file.originFileObj);
    }
    if (src) {
      setPreviewImage(src);
      setPreviewOpen(true);
    }
  };

  const normFile = (e: { fileList: UploadFile[] } | UploadFile[]) => {
    const fileList: UploadFile[] = Array.isArray(e) ? e : e?.fileList || [];
    return fileList.map((file) => {
      if (file.thumbUrl || file.url) return file;
      if (file.originFileObj) {
        return {
          ...file,
          thumbUrl: URL.createObjectURL(file.originFileObj),
          url: URL.createObjectURL(file.originFileObj),
        };
      }
      return file;
    });
  };

  const onFinish = async () => {
    setLoading(true);
    try {
      const values = form.getFieldsValue(true);

      const payload: VariantFormValues = {
        productId: values.productId,
        color: values.color,
        size: values.size,
        stock: values.stock ?? 0,
        images: fileListImages.map((x) => x.url || "").filter(Boolean),
        isActive: values.isActive ?? true,
      };

      const response = await variantService.updateVariant(variant._id, payload);

      if (response.success) {
        setIsOpen(false);
        form.resetFields();
        setFileListImages([]);
        setTimeout(() => {
          message.success("Cập nhật biến thể thành công");
          actionRef.current?.reload?.();
        }, 150);
      } else {
        message.error(response.message || "Cập nhật thất bại");
      }
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } } };
      message.error(
        err?.response?.data?.message || "Cập nhật biến thể thất bại",
      );
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Modal
        title="Cập nhật biến thể"
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={() => {
          setIsOpen(false);
          form.resetFields();
          setFileListImages([]);
        }}
        maskClosable={false}
        okText="Cập nhật"
        cancelText="Hủy"
        confirmLoading={loading}
        width={700}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Sản phẩm"
                name="productId"
                rules={[{ required: true, message: "Vui lòng chọn sản phẩm" }]}
              >
                <Select
                  showSearch
                  placeholder="Chọn sản phẩm"
                  optionFilterProp="label"
                  options={products.map((p) => ({
                    value: p._id,
                    label: p.name,
                  }))}
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Màu sắc"
                name="color"
                rules={[{ required: true, message: "Vui lòng chọn màu sắc" }]}
              >
                <Select placeholder="Chọn màu sắc">
                  {colors.map((c) => (
                    <Select.Option key={c._id} value={c._id}>
                      {c.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Kích thước"
                name="size"
                rules={[
                  { required: true, message: "Vui lòng chọn kích thước" },
                ]}
              >
                <Select placeholder="Chọn kích thước">
                  {sizes.map((s) => (
                    <Select.Option key={s._id} value={s._id}>
                      {s.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tồn kho"
                name="stock"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng tồn kho",
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  placeholder="0"
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Hoạt động"
                name="isActive"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Divider>Ảnh biến thể</Divider>

          <Form.Item
            label="Hình ảnh"
            name="images"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              multiple
              listType="picture-card"
              beforeUpload={beforeUpload}
              onRemove={onRemove}
              onPreview={onPreview}
              customRequest={(options) => handleUploadFile(options)}
              fileList={fileListImages}
            >
              {fileListImages.length >= 10 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <Image
        style={{ display: "none" }}
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => {
            setPreviewOpen(visible);
            if (!visible) setPreviewImage("");
          },
        }}
        src={previewImage || undefined}
      />
    </>
  );
};

export default UpdateVariant;
