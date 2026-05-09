import { useReducer, useEffect, useCallback } from "react";
import { notification } from "antd";
import reviewService from "@/services/reviewService";
import { Review, ReviewStats, CreateReviewPayload } from "@/types/review";

const REVIEWS_PER_PAGE = 5;

interface ReviewState {
  reviews: Review[];
  stats: ReviewStats | null;
  myReview: Review | null;
  loading: boolean;
  submitting: boolean;
  page: number;
  totalPages: number;
  sortOption: string;
}

type ReviewAction =
  | { type: "RESET" }
  | { type: "SET_REVIEWS"; reviews: Review[]; totalPages: number; page: number }
  | { type: "APPEND_REVIEWS"; reviews: Review[]; totalPages: number; page: number }
  | { type: "SET_STATS"; stats: ReviewStats }
  | { type: "SET_MY_REVIEW"; review: Review | null }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_SUBMITTING"; submitting: boolean }
  | { type: "SET_SORT"; sortOption: string };

const initialState: ReviewState = {
  reviews: [],
  stats: null,
  myReview: null,
  loading: false,
  submitting: false,
  page: 1,
  totalPages: 1,
  sortOption: "-createdAt",
};

function reviewReducer(state: ReviewState, action: ReviewAction): ReviewState {
  switch (action.type) {
    case "RESET":
      return { ...initialState, sortOption: state.sortOption };
    case "SET_REVIEWS":
      return { ...state, reviews: action.reviews, totalPages: action.totalPages, page: action.page };
    case "APPEND_REVIEWS":
      return { ...state, reviews: [...state.reviews, ...action.reviews], totalPages: action.totalPages, page: action.page };
    case "SET_STATS":
      return { ...state, stats: action.stats };
    case "SET_MY_REVIEW":
      return { ...state, myReview: action.review };
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    case "SET_SUBMITTING":
      return { ...state, submitting: action.submitting };
    case "SET_SORT":
      return { ...state, sortOption: action.sortOption, page: 1 };
    default:
      return state;
  }
}

const useReview = (productId: string, userId?: string) => {
  const [state, dispatch] = useReducer(reviewReducer, initialState);
  const [notificationApi, contextHolder] = notification.useNotification();

  const fetchStats = useCallback(async (pid: string) => {
    try {
      const res = await reviewService.getStats(pid);
      if (res.success) dispatch({ type: "SET_STATS", stats: res.data });
    } catch {
      // silently fail
    }
  }, []);

  const fetchReviews = useCallback(async (pid: string, pageNum: number, sort: string, append = false) => {
    dispatch({ type: "SET_LOADING", loading: true });
    try {
      const res = await reviewService.getReviews(pid, { page: pageNum, limit: REVIEWS_PER_PAGE, sort });
      if (res.success) {
        const action = append
          ? { type: "APPEND_REVIEWS" as const, reviews: res.reviews, totalPages: res.pagination.totalPages, page: pageNum }
          : { type: "SET_REVIEWS" as const, reviews: res.reviews, totalPages: res.pagination.totalPages, page: pageNum };
        dispatch(action);
      }
    } catch {
      // silently fail
    } finally {
      dispatch({ type: "SET_LOADING", loading: false });
    }
  }, []);

  const fetchMyReview = useCallback(async (pid: string, uid: string) => {
    try {
      const res = await reviewService.getMyReview(pid, uid);
      if (res.success) dispatch({ type: "SET_MY_REVIEW", review: res.data });
    } catch {
      // silently fail
    }
  }, []);

  // Full data load when product changes
  useEffect(() => {
    if (!productId) return;
    dispatch({ type: "RESET" });
    fetchReviews(productId, 1, state.sortOption);
    fetchStats(productId);
    if (userId) fetchMyReview(productId, userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  // Re-fetch when sort changes
  useEffect(() => {
    if (!productId) return;
    fetchReviews(productId, 1, state.sortOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.sortOption]);

  // Re-fetch my review when user changes
  useEffect(() => {
    if (!productId || !userId) return;
    fetchMyReview(productId, userId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const submitReview = async (payload: CreateReviewPayload) => {
    dispatch({ type: "SET_SUBMITTING", submitting: true });
    try {
      const res = await reviewService.createReview(payload);
      if (res.success) {
        notificationApi.success({ message: "Cảm ơn bạn đã đánh giá!", placement: "top" });
        dispatch({ type: "RESET" });
        fetchReviews(productId, 1, state.sortOption);
        fetchStats(productId);
        if (userId) fetchMyReview(productId, userId);
        return true;
      }
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Đã xảy ra lỗi";
      if (msg.includes("đã đánh giá")) {
        notificationApi.warning({ message: "Bạn đã đánh giá sản phẩm này rồi.", placement: "top" });
      } else {
        notificationApi.error({ message: msg, placement: "top" });
      }
    } finally {
      dispatch({ type: "SET_SUBMITTING", submitting: false });
    }
    return false;
  };

  const editReview = async (reviewId: string, payload: Partial<CreateReviewPayload>) => {
    dispatch({ type: "SET_SUBMITTING", submitting: true });
    try {
      const res = await reviewService.updateReview(reviewId, payload);
      if (res.success) {
        notificationApi.success({ message: "Cập nhật đánh giá thành công!", placement: "top" });
        dispatch({ type: "RESET" });
        fetchReviews(productId, 1, state.sortOption);
        fetchStats(productId);
        if (userId) fetchMyReview(productId, userId);
        return true;
      }
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Đã xảy ra lỗi";
      notificationApi.error({ message: msg, placement: "top" });
    } finally {
      dispatch({ type: "SET_SUBMITTING", submitting: false });
    }
    return false;
  };

  const removeReview = async (reviewId: string) => {
    if (!userId) return false;
    try {
      await reviewService.deleteReview(reviewId, userId);
      notificationApi.success({ message: "Xóa đánh giá thành công!", placement: "top" });
      dispatch({ type: "SET_MY_REVIEW", review: null });
      dispatch({ type: "RESET" });
      fetchReviews(productId, 1, state.sortOption);
      fetchStats(productId);
      return true;
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Đã xảy ra lỗi";
      notificationApi.error({ message: msg, placement: "top" });
    }
    return false;
  };

  const loadMore = () => {
    if (state.page < state.totalPages && !state.loading) {
      fetchReviews(productId, state.page + 1, state.sortOption, true);
    }
  };

  return {
    reviews: state.reviews,
    stats: state.stats,
    myReview: state.myReview,
    loading: state.loading,
    submitting: state.submitting,
    page: state.page,
    totalPages: state.totalPages,
    sortOption: state.sortOption,
    setSortOption: (opt: string) => dispatch({ type: "SET_SORT", sortOption: opt }),
    submitReview,
    editReview,
    removeReview,
    loadMore,
    hasMore: state.page < state.totalPages,
    contextHolder,
  };
};

export default useReview;
