import React, { useState } from "react";
import {
  Image,
  Spin,
  Button,
  Modal,
  Tooltip,
  Upload,
  UploadFile,
  message,
} from "antd";
import {
  StarFilled,
  StarOutlined,
  EditOutlined,
  DeleteOutlined,
  DownOutlined,
  CheckOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import useReview from "@/hooks/useReview";
import useUserStore from "@/store/useUserStore";
import uploadService from "@/services/uploadService";
import type { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";

interface ReviewsProps {
  productId: string;
}

const SORT_OPTIONS = [
  { value: "-createdAt", label: "Mới nhất" },
  { value: "createdAt", label: "Cũ nhất" },
  { value: "-rating", label: "Đánh giá cao" },
  { value: "rating", label: "Đánh giá thấp" },
];

const StarRating: React.FC<{
  value: number;
  onChange?: (v: number) => void;
  readonly?: boolean;
  size?: number;
}> = ({ value, onChange, readonly = false, size = 20 }) => {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`${readonly ? "cursor-default" : "cursor-pointer"} bg-transparent border-none p-0 transition-transform ${readonly ? "" : "hover:scale-110"}`}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
        >
          {display >= star ? (
            <StarFilled style={{ color: "#f59e0b", fontSize: size }} />
          ) : (
            <StarOutlined style={{ color: "#d1d5db", fontSize: size }} />
          )}
        </button>
      ))}
    </div>
  );
};

const ReviewCard: React.FC<{
  review: {
    _id: string;
    userId: { _id: string; name: string; avatar?: string };
    rating: number;
    comment: string;
    images: string[];
    createdAt: string;
  };
  isOwn: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ review, isOwn, onEdit, onDelete }) => {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const avatarSrc = review.userId.avatar
    ? review.userId.avatar.startsWith("http")
      ? review.userId.avatar
      : `http://localhost:5000${review.userId.avatar}`
    : null;

  return (
    <div className="flex gap-3 p-4! rounded-xl border border-[#e5eaf0] hover:border-[#61a678]/40 transition-all duration-200 bg-white">
      {/* Avatar */}
      <div className="shrink-0">
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={review.userId.name}
            className="w-10 h-10 rounded-full object-cover border border-[#e5eaf0]"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#61a678]/15 flex items-center justify-center text-[#61a678] font-bold text-[14px]">
            {review.userId.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[14px] font-semibold text-[#1a1a1a]">
              {review.userId.name}
            </span>
            <StarRating value={review.rating} readonly size={14} />
            <span className="text-[12px] text-[#9ca3af]">
              {formatDate(review.createdAt)}
            </span>
          </div>
          {isOwn && (
            <div className="flex items-center gap-1">
              <Tooltip title="Chỉnh sửa">
                <button
                  className="w-7 h-7 rounded-full bg-[#f3f4f6] hover:bg-[#e5e7eb] flex items-center justify-center text-[#6b7280] hover:text-[#374151] transition-colors border-none cursor-pointer"
                  onClick={() => onEdit(review._id)}
                >
                  <EditOutlined />
                </button>
              </Tooltip>
              <Tooltip title="Xóa">
                <button
                  className="w-7 h-7 rounded-full bg-[#fee2e2] hover:bg-[#fecaca] flex items-center justify-center text-[#dc2626] transition-colors border-none cursor-pointer"
                  onClick={() => onDelete(review._id)}
                >
                  <DeleteOutlined />
                </button>
              </Tooltip>
            </div>
          )}
        </div>

        {review.comment && (
          <p className="text-[13px] text-[#374151] leading-relaxed mb-2">
            {review.comment}
          </p>
        )}

        {review.images && review.images.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {review.images
              .filter((img): img is string => typeof img === "string")
              .map((img, i) => (
                <Image
                  key={i}
                  src={
                    img.startsWith("http") ? img : `http://localhost:5000${img}`
                  }
                  fallback="https://via.placeholder.com/80"
                  width={72}
                  height={72}
                  className="rounded-lg object-cover border border-[#e5eaf0]"
                  style={{ objectFit: "cover" }}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

const RatingBar: React.FC<{
  stars: number;
  count: number;
  total: number;
  onClick: () => void;
  active: boolean;
}> = ({ stars, count, total, onClick, active }) => {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <button
      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all duration-150 border-none cursor-pointer ${
        active ? "bg-[#fef3c7]" : "bg-transparent hover:bg-[#f9fafb]"
      }`}
      onClick={onClick}
    >
      <span className="text-[13px] text-[#374151] w-12 flex items-center gap-1">
        {stars}
        <StarFilled style={{ color: "#f59e0b", fontSize: 12 }} />
      </span>
      <div className="flex-1 h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#f59e0b] rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[12px] text-[#9ca3af] w-8 text-right">{count}</span>
    </button>
  );
};

const Reviews: React.FC<ReviewsProps> = ({ productId }) => {
  const user = useUserStore((s) => s.user);
  const [sortOpen, setSortOpen] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [writeMode, setWriteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const {
    reviews,
    stats,
    myReview,
    loading,
    submitting,
    hasMore,
    sortOption,
    setSortOption,
    submitReview,
    editReview,
    removeReview,
    loadMore,
    contextHolder,
  } = useReview(productId, user?._id);

  const [formImages, setFormImages] = useState<UploadFile[]>([]);

  const filteredReviews =
    ratingFilter > 0
      ? reviews.filter((r) => r.rating === ratingFilter)
      : reviews;

  const beforeUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      message.error("Chỉ chấp nhận file ảnh (JPG, PNG, GIF, WEBP)");
      return Upload.LIST_IGNORE;
    }
    if (file.size > 10 * 1024 * 1024) {
      message.error("Kích thước file phải nhỏ hơn 10MB");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const handleUploadFile = async (options: RcCustomRequestOptions) => {
    const { onSuccess, onError, file } = options;
    try {
      const fileToUpload = (file as UploadFile).originFileObj || (file as File);
      const res = await uploadService.uploadSingle(
        fileToUpload as File,
        "review",
      );

      if (res.success && res.data.url) {
        const uploadFile: UploadFile = {
          uid: (file as UploadFile).uid,
          name: res.data.originalName || res.data.key,
          status: "done",
          url: res.data.url,
          thumbUrl: res.data.url,
        };
        setFormImages((prev) => {
          const exists = prev.find((f) => f.uid === uploadFile.uid);
          if (exists) return prev;
          return [...prev, uploadFile];
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

  const handleRemoveImage = (file: UploadFile) => {
    setFormImages((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  const startWrite = () => {
    setWriteMode(true);
    setEditMode(false);
    setFormRating(5);
    setFormComment("");
    setFormImages([]);
  };

  const startEdit = (reviewId: string) => {
    const r = myReview?._id === reviewId ? myReview : null;
    if (!r) return;
    setEditMode(true);
    setEditId(reviewId);
    setWriteMode(false);
    setFormRating(r.rating);
    setFormComment(r.comment);
    const loaded: UploadFile[] = (r.images || []).map((url, i) => ({
      uid: `server-${i}`,
      name: url.split("/").pop() || `image-${i}`,
      status: "done",
      url: url.startsWith("http") ? url : `http://localhost:5000${url}`,
      thumbUrl: url.startsWith("http") ? url : `http://localhost:5000${url}`,
    }));
    setFormImages(loaded);
  };

  const cancelForm = () => {
    setWriteMode(false);
    setEditMode(false);
    setEditId("");
    setFormRating(5);
    setFormComment("");
    setFormImages([]);
  };

  const handleSubmit = async () => {
    if (!user || !productId) return;
    if (formRating === 0) return;
    const uploadedImages: string[] = formImages
      .filter((f) => f.status === "done" && f.url)
      .map((f) => f.url as string);
    if (editMode && editId) {
      const ok = await editReview(editId, {
        userId: user._id,
        productId,
        rating: formRating,
        comment: formComment,
        images: uploadedImages,
      });
      if (ok) cancelForm();
    } else {
      const ok = await submitReview({
        userId: user._id,
        productId,
        rating: formRating,
        comment: formComment,
        images: uploadedImages,
      });
      if (ok) cancelForm();
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteId) {
      await removeReview(deleteId);
      setDeleteModal(false);
      setDeleteId("");
    }
  };

  const avgRating = stats?.averageRating ?? 0;

  return (
    <>
      {contextHolder}
      <div className="w-full flex flex-col gap-6">
        {/* ─── Stats Summary ─── */}
        {stats && stats.totalReviews > 0 && (
          <div className="flex flex-col sm:flex-row gap-6 p-5 bg-[#fafafa] rounded-2xl border border-[#e5eaf0] p-2! sm:p-6!">
            {/* Average score */}

            <div className="flex flex-col items-center justify-center gap-2 sm:border-r sm:border-[#e5eaf0] sm:pr-6 shrink-0 pr-2! sm:pr-6!">
              <span className="text-[48px] font-black leading-none text-[#1a1a1a]">
                {avgRating.toFixed(1)}
              </span>
              <StarRating value={Math.round(avgRating)} readonly size={16} />
              <span className="text-[13px] text-[#6b7280]">
                {stats.totalReviews} đánh giá
              </span>
            </div>

            {/* Rating bars */}
            <div className="flex-1 flex flex-col justify-center gap-1">
              {[5, 4, 3, 2, 1].map((star) => (
                <RatingBar
                  key={star}
                  stars={star}
                  count={stats[`rating${star}` as keyof typeof stats] as number}
                  total={stats.totalReviews}
                  active={ratingFilter === star}
                  onClick={() =>
                    setRatingFilter(ratingFilter === star ? 0 : star)
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* ─── Sort and Write Review Button ─── */}
        {!writeMode && !editMode && (
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Sort dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#e5eaf0] bg-white text-[13px] font-medium text-[#374151] hover:border-[#61a678]/50 transition-colors cursor-pointer py-2! px-5! sm:py-2.5! sm:px-5!"
                onClick={() => setSortOpen((o) => !o)}
              >
                {SORT_OPTIONS.find((o) => o.value === sortOption)?.label ||
                  "Sắp xếp"}
                <DownOutlined style={{ fontSize: 10, color: "#9ca3af" }} />
              </button>
              {sortOpen && (
                <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-[#e5eaf0] rounded-xl shadow-lg z-10 overflow-hidden flex flex-col gap-2! p-1!">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      className={`w-full px-4 py-2.5 text-left text-[13px] flex items-center justify-between hover:bg-[#f9fafb] transition-colors cursor-pointer border-none ${
                        sortOption === opt.value
                          ? "text-[#61a678] font-semibold bg-[#f0fdf4]"
                          : "text-[#374151]"
                      }`}
                      onClick={() => {
                        setSortOption(opt.value);
                        setSortOpen(false);
                      }}
                    >
                      {opt.label}
                      {sortOption === opt.value && (
                        <CheckOutlined style={{ fontSize: 11 }} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user && !myReview && (
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#61a678] text-white text-[13px] font-semibold hover:bg-[#4f9c6a] transition-colors cursor-pointer border border-transparent py-2! px-5! sm:py-2.5! sm:px-5!"
                onClick={startWrite}
              >
                <StarOutlined style={{ fontSize: 14 }} />
                Viết đánh giá
              </button>
            )}
          </div>
        )}

        {/* ─── Write / Edit Review Form ─── */}
        {(writeMode || editMode) && (
          <div className="p-5! rounded-2xl border-2 border-[#61a678]/40 bg-[#f0fdf4] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-bold text-[#1a1a1a]">
                {editMode ? "Chỉnh sửa đánh giá" : "Viết đánh giá của bạn"}
              </span>
              <button
                className="text-[13px] text-[#6b7280] hover:text-[#374151] border-none bg-transparent cursor-pointer py-2! px-5! sm:py-2.5! sm:px-5!"
                onClick={cancelForm}
              >
                Hủy
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <span className="text-[13px] text-[#6b7280]">Đánh giá:</span>
              <StarRating
                value={formRating}
                onChange={setFormRating}
                size={24}
              />
            </div>

            {/* Comment */}
            <textarea
              className="w-full min-h-[100px] p-3! rounded-xl border border-[#e5eaf0] text-[13px] text-[#374151] resize-none outline-none focus:border-[#61a678]/60 transition-colors bg-white"
              placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
              value={formComment}
              onChange={(e) => setFormComment(e.target.value)}
              maxLength={1000}
            />
            <div className="text-right text-[12px] text-[#9ca3af]">
              {formComment.length}/1000
            </div>

            {/* Image upload */}
            <Upload
              multiple
              listType="picture-card"
              beforeUpload={beforeUpload}
              onRemove={handleRemoveImage}
              customRequest={handleUploadFile}
              fileList={formImages}
              className="review-upload-list"
            >
              {formImages.length >= 5 ? null : (
                <button
                  className="w-16 h-16 rounded-lg border-2 border-dashed border-[#d1d5db] flex flex-col items-center justify-center gap-1 text-[#9ca3af] hover:border-[#61a678] hover:text-[#61a678] transition-colors cursor-pointer bg-white"
                  type="button"
                >
                  <PlusOutlined style={{ fontSize: 18 }} />
                  <span className="text-[10px]">Thêm ảnh</span>
                </button>
              )}
            </Upload>

            {/* Submit */}
            <div className="flex justify-end gap-3">
              <button
                className="px-5! py-2! rounded-full border border-[#e5eaf0] text-[13px] font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors cursor-pointer bg-white"
                onClick={cancelForm}
              >
                Hủy
              </button>
              <button
                className="px-6! py-2! rounded-full bg-[#61a678] text-white text-[13px] font-semibold hover:bg-[#4f9c6a] transition-colors cursor-pointer border border-transparent disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 py-2! px-6! sm:py-2.5! sm:px-6!"
                onClick={handleSubmit}
                disabled={formRating === 0 || submitting}
              >
                {submitting && (
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{ fontSize: 14, color: "white" }}
                        spin
                      />
                    }
                  />
                )}
                {editMode ? "Lưu thay đổi" : "Gửi đánh giá"}
              </button>
            </div>
          </div>
        )}

        {/* ─── Review List ─── */}
        <div className="flex flex-col gap-3">
          {loading && reviews.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 28 }} spin />}
              />
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-12 h-12 rounded-full bg-[#f3f4f6] flex items-center justify-center">
                <StarOutlined style={{ fontSize: 20, color: "#9ca3af" }} />
              </div>
              <p className="text-[14px] text-[#9ca3af]">
                {ratingFilter > 0
                  ? "Không có đánh giá với mức sao này."
                  : "Chưa có đánh giá nào cho sản phẩm này."}
              </p>
              {!myReview && user && (
                <button
                  className="text-[13px] text-[#61a678] font-semibold border-none bg-transparent cursor-pointer hover:underline"
                  onClick={startWrite}
                >
                  Trở thành người đầu tiên đánh giá
                </button>
              )}
            </div>
          ) : (
            <>
              {filteredReviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  isOwn={user?._id === review.userId._id}
                  onEdit={startEdit}
                  onDelete={(id) => {
                    setDeleteId(id);
                    setDeleteModal(true);
                  }}
                />
              ))}

              {/* Load more */}
              {hasMore && (
                <div className="flex justify-center mt-2">
                  <Button
                    className="border-[#e5eaf0] text-[#374151] font-medium rounded-xl"
                    onClick={loadMore}
                    loading={loading}
                  >
                    Xem thêm đánh giá
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      <Modal
        title="Xóa đánh giá"
        open={deleteModal}
        onCancel={() => setDeleteModal(false)}
        onOk={handleDeleteConfirm}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        <p className="text-[14px] text-[#374151]">
          Bạn có chắc muốn xóa đánh giá này không? Hành động này không thể hoàn
          tác.
        </p>
      </Modal>
    </>
  );
};

export default Reviews;
