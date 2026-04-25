import { PlusOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Upload,
  DatePicker,
} from "antd";
import type { UploadFile } from "antd";
import { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import { ActionType } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import productService from "@/services/productService";
import uploadService from "@/services/uploadService";
import categoryService from "@/services/categoryService";
import brandService from "@/services/brandService";
import supplierService from "@/services/supplierService";
import { Category } from "@/types/category";
import { Brand } from "@/types/brand";
import { Supplier } from "@/types/supplier";
import { ProductFormValues } from "@/types/product";
import dayjs from "dayjs";

const { TextArea } = Input;

const CreateProduct = (props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  actionRef: React.RefObject<ActionType | null>;
}) => {
  const { isOpen, setIsOpen, actionRef } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileListThumb, setFileListThumb] = useState<UploadFile[]>([]);
  const [fileListSlides, setFileListSlides] = useState<UploadFile[]>([]);
  const [isDiscounted, setIsDiscounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchRefs = async () => {
        try {
          const [catRes, brandRes, supplierRes] = await Promise.all([
            categoryService.getCategories({ pageSize: 100 }),
            brandService.getBrands({ pageSize: 100 }),
            supplierService.getSuppliers({ pageSize: 100 }),
          ]);
          if (catRes.success) setCategories(catRes.data);
          if (brandRes.success) setBrands(brandRes.data);
          if (supplierRes.success) setSuppliers(supplierRes.data);
        } catch (e) {
          console.error(e);
        }
      };
      fetchRefs();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const thumbFiles = form.getFieldValue("thumbnail");
      if (Array.isArray(thumbFiles)) {
        thumbFiles.forEach((file: UploadFile) => {
          if (file?.thumbUrl?.startsWith("blob:")) URL.revokeObjectURL(file.thumbUrl);
          if (file?.url?.startsWith("blob:")) URL.revokeObjectURL(file.url);
        });
      }
      const slideFiles = form.getFieldValue("slides");
      if (Array.isArray(slideFiles)) {
        slideFiles.forEach((file: UploadFile) => {
          if (file?.thumbUrl?.startsWith("blob:")) URL.revokeObjectURL(file.thumbUrl);
          if (file?.url?.startsWith("blob:")) URL.revokeObjectURL(file.url);
        });
      }
    }
    return () => {
      const thumbFiles = form.getFieldValue("thumbnail");
      if (Array.isArray(thumbFiles)) {
        thumbFiles.forEach((file: UploadFile) => {
          if (file?.thumbUrl?.startsWith("blob:")) URL.revokeObjectURL(file.thumbUrl);
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

  const onRemove = (file: UploadFile, type: "thumbnail" | "slides") => {
    if (file.thumbUrl?.startsWith("blob:")) URL.revokeObjectURL(file.thumbUrl);
    if (file.url?.startsWith("blob:")) URL.revokeObjectURL(file.url);
    if (type === "thumbnail") {
      setFileListThumb([]);
      form.setFieldsValue({ thumbnail: [] });
    } else {
      const newSlides = fileListSlides.filter((x) => x.uid !== file.uid);
      setFileListSlides(newSlides);
      form.setFieldsValue({ slides: newSlides });
    }
  };

  const handleUploadFile = async (
    option: RcCustomRequestOptions,
    type: "thumbnail" | "slides",
  ) => {
    const { onSuccess, onError, file } = option;
    try {
      const fileToUpload = (file as UploadFile).originFileObj || (file as File);
      const res = await uploadService.uploadSingle(fileToUpload as File, type);

      if (res.success && res.data.url) {
        const uploadFile: UploadFile = {
          uid: (file as UploadFile).uid,
          name: res.data.key,
          fileName: res.data.url,
          status: "done",
          url: res.data.url,
        };

        if (type === "thumbnail") {
          setFileListThumb((prev) => {
            const updated = [...prev, uploadFile];
            form.setFieldsValue({ thumbnail: updated });
            return updated;
          });
        } else {
          setFileListSlides((prev) => {
            const updated = [...prev, uploadFile];
            form.setFieldsValue({ slides: updated });
            return updated;
          });
        }

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
        return { ...file, thumbUrl: URL.createObjectURL(file.originFileObj), url: URL.createObjectURL(file.originFileObj) };
      }
      return file;
    });
  };

  const onFinish = async () => {
    setLoading(true);
    try {
      const values = form.getFieldsValue(true);
      console.log(fileListThumb[0]?.url);
      const payload: ProductFormValues = {
        name: values.name,
        description: values.description || "",
        category: values.category ,
        brand: values.brand || "",
        supplier: values.supplier || "",
        priceSell: values.priceSell ?? 0,
        costPrice: values.costPrice ?? 0,
        material: values.material,
        weight: values.weight,
        tags: values.tags || [],
        gender: values.gender || [],
        thumbnail: fileListThumb[0]?.url,
        slides: fileListSlides.map((x: UploadFile) => x.url || ""),
        is: {
          active: values.isActive ?? true,
          featured: values.isFeatured ?? false,
          new: values.isNew ?? true,
          bestSeller: values.isBestSeller ?? false,
          topRated: false,
          discounted: isDiscounted,
        },
        sale: isDiscounted
          ? {
              discountType: values.saleDiscountType || "percentage",
              discountValue: values.saleDiscountValue ,
              startDate: values.startDate ? dayjs(values.startDate).format("YYYY-MM-DDTHH:mm:ss") : "",
              endDate: values.endDate ? dayjs(values.endDate).format("YYYY-MM-DDTHH:mm:ss") : "",
            }
          : {
              discountType: "percentage",
              discountValue: 0,
              startDate: "",
              endDate: "",
            },
      };

      const response = await productService.createProduct(payload);

      if (response.success) {
        setIsOpen(false);
        form.resetFields();
        setFileListThumb([]);
        setFileListSlides([]);
        setIsDiscounted(false);
        setTimeout(() => {
          message.success("Tạo sản phẩm thành công");
          actionRef.current?.reload?.();
        }, 150);
      } else {
        message.error(response.message || "Tạo thất bại");
      }
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } } };
      message.error(err?.response?.data?.message || "Tạo sản phẩm thất bại");
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
        title="Tạo sản phẩm"
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={() => {
          setIsOpen(false);
          form.resetFields();
          setFileListThumb([]);
          setFileListSlides([]);
          setIsDiscounted(false);
        }}
        maskClosable={false}
        okText="Tạo mới"
        cancelText="Hủy"
        confirmLoading={loading}
        width={900}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            isActive: true,
            isNew: true,
            isFeatured: false,
            isBestSeller: false,
            saleDiscountType: "percentage",
            saleDiscountValue: 0,
          }}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}>
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="SKU">
                <Input placeholder="Auto" disabled />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Mô tả" name="description" rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}>
            <TextArea placeholder="Nhập mô tả sản phẩm" rows={3} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Danh mục" name="category" rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}>
                <Select mode="multiple" placeholder="Chọn danh mục" allowClear>
                  {categories.map((c) => (
                    <Select.Option key={c._id} value={c._id}>{c.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Thương hiệu" name="brand" rules={[{ required: true, message: "Vui lòng chọn thương hiệu" }]}>
                <Select placeholder="Chọn thương hiệu" allowClear>
                  {brands.map((b) => (
                    <Select.Option key={b._id} value={b._id}>{b.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Nhà cung cấp" name="supplier" rules={[{ required: true, message: "Vui lòng chọn nhà cung cấp" }]}>
                <Select placeholder="Chọn nhà cung cấp" allowClear>
                  {suppliers.map((s) => (
                    <Select.Option key={s._id} value={s._id}>{s.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Giá bán" name="priceSell" rules={[{ required: true, message: "Vui lòng nhập giá bán" }]}>
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  formatter={(value) => `${value ?? ""}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => Number(value?.replace(/,/g, "") || 0) as unknown as 0}
                  addonAfter="VND"
                  placeholder="0"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Giá vốn" name="costPrice" rules={[{ required: true, message: "Vui lòng nhập giá vốn" }]}>
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  formatter={(value) => `${value ?? ""}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => Number(value?.replace(/,/g, "") || 0) as unknown as 0}
                  addonAfter="VND"
                  placeholder="0"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Chất liệu" name="material">
                <Input placeholder="VD: Cotton, Da" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Cân nặng (gram)" name="weight">
                <InputNumber min={0} style={{ width: "100%" }} placeholder="0" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Tags" name="tags">
                <Select mode="tags" placeholder="Nhập tags, Enter để thêm" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Giới tính" name="gender">
                <Select mode="multiple" placeholder="Chọn giới tính">
                  <Select.Option value="man">Nam</Select.Option>
                  <Select.Option value="woman">Nữ</Select.Option>
                  <Select.Option value="boy">Bé trai</Select.Option>
                  <Select.Option value="girl">Bé gái</Select.Option>
                  <Select.Option value="unisex">Trung tính</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Divider>Ảnh sản phẩm</Divider>

          <Row gutter={16}>
            <Col xs={12} sm={12} md={12}>
              <Form.Item label="Ảnh slides" name="slides" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload
                  multiple
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  onRemove={(file) => onRemove(file, "slides")}
                  onPreview={onPreview}
                  customRequest={(options) => handleUploadFile(options, "slides")}
                  fileList={fileListSlides}
                >
                  {fileListSlides.length >= 4 ? null : uploadButton}
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={12} sm={12} md={12}>
              <Form.Item label="Ảnh đại diện" name="thumbnail" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload
                  listType="picture-card"
                  beforeUpload={beforeUpload}
                  onRemove={(file) => onRemove(file, "thumbnail")}
                  onPreview={onPreview}
                  customRequest={(options) => handleUploadFile(options, "thumbnail")}
                  fileList={fileListThumb}
                >
                  {fileListThumb.length >= 1 ? null : uploadButton}
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Divider>Cờ trạng thái</Divider>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Hoạt động" name="isActive" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Sản phẩm mới" name="isNew" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Nổi bật" name="isFeatured" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Bán chạy" name="isBestSeller" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Divider>Giảm giá</Divider>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Bật giảm giá">
                <Switch checked={isDiscounted} onChange={setIsDiscounted} />
              </Form.Item>
            </Col>
            {isDiscounted && (
              <>
                <Col span={6}>
                  <Form.Item label="Loại giảm" name="saleDiscountType">
                    <Select>
                      <Select.Option value="percentage">Phần trăm (%)</Select.Option>
                      <Select.Option value="fixed">Cố định (VND)</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Giá trị giảm" name="saleDiscountValue">
                    <InputNumber min={0} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Thời gian">
                    <Space>
                      <Form.Item name="startDate" noStyle>
                        <DatePicker showTime placeholder="Bắt đầu" />
                      </Form.Item>
                      <span>-</span>
                      <Form.Item name="endDate" noStyle>
                        <DatePicker showTime placeholder="Kết thúc" />
                      </Form.Item>
                    </Space>
                  </Form.Item>
                </Col>
              </>
            )}
          </Row>
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

export default CreateProduct;
